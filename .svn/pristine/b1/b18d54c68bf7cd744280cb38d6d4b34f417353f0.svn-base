@echo off
chcp 65001

echo 选择服务器，以下为可选的服务器

echo 1、测试服

echo 输入服务器编号：

set /p server=

echo 您选择的服务器是：%server%
echo 请输入版本号：
set /p version=
echo 您输入的版本号是：%version%
node setVersionInfo.js %server% %version%
echo 请确认版本信息，如果版本信息正确，请按任意键继续
pause

rmdir /s/q ..\client\build\jsb-link\assets\
rmdir /s/q ..\client\build\jsb-link\src\

set /p cocos=<配置项_cocos路径.txt
echo 开始构建安卓资源
%cocos% --path ..\client\ --build "platform=android;debug=false"
echo 构建安卓资源结束，请检查是否有错误，如果没有错误，请按任意键继续
pause


echo 开始拷贝文件
md native\release\%version%

xcopy ..\client\build\jsb-link\assets native\release\%version%\assets /S /E /Y /I
xcopy ..\client\build\jsb-link\src native\release\%version%\src /S /E /Y /I
echo 文件拷贝完成，请检查是否有错误，如果没有错误，请按任意键继续
pause

node generatePack.js %server% %version%

echo 是否将该版本通知到服务器，确定通知输入y
set /p isNotice=
if "%isNotice%"=="y" (
    echo 开始通知服务器
    cd ../tool
    node pipeLine.js noticeClientVersion %server% %version%
    echo 通知服务器结束，如果没有报错，请按任意键继续
    pause
)

pause