@echo off
chcp 65001

echo 选择服务器，以下为可选的服务器

echo 1、测试服
echo 2、正式服

echo 输入服务器编号：

set /p server=

echo 您选择的服务器是：%server%
echo 从服务器获取推荐版本号

REM 运行命令并将输出保存到临时文件
.\dotnet\gamePipeline.exe recommand_native_version %server% > temp20231023.txt

REM 从临时文件中获取最后一行并将其保存到变量
for /f "usebackq tokens=*" %%a in ("temp20231023.txt") do (
  set version=%%a
)

REM 显示变量中的结果
echo 打包推荐版本号：%version%

REM 删除临时文件
del temp20231023.txt

.\dotnet\gamePipeline.exe build_android_set_version %server% %version%
echo 请确认版本信息，如果版本信息正确，请按任意键继续
pause

rmdir /s/q ..\client\build\jsb-link\assets\
rmdir /s/q ..\client\build\jsb-link\src\

set /p cocos=<配置项_cocos路径.txt
echo 开始构建安卓资源
%cocos% --path ..\client\ --build "platform=android;debug=false"
echo 构建安卓资源结束，请检查是否有错误，如果没有错误，请按任意键继续

echo 修正mainjs
.\dotnet\gamePipeline.exe build_set_android_mainjs %server% %version%

echo 开始备份文件
md native\release\%version%

xcopy ..\client\build\jsb-link\assets native\release\%version%\assets /S /E /Y /I
xcopy ..\client\build\jsb-link\src native\release\%version%\src /S /E /Y /I
xcopy "..\client\build\jsb-link\js backups (useful for debugging)" native\release\%version%\jsbackup /S /E /Y /I
echo 备份完成


echo 开始上传到cdn
.\dotnet\gamePipeline.exe build_android_upload %server% %version%
echo 上传到cdn结束，如果没有报错，请按任意键继续

pause