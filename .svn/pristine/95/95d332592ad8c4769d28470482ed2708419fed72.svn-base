@echo off
chcp 65001

echo 选择服务器，以下为可选的服务器

echo 1、测试服
echo 2、中顺微信服

echo 输入服务器编号：

set /p server=

echo 您选择的服务器是：%server%
echo 注意小游戏的版本号一定不能跟当前线上版本相同，只是测试可以考虑使用0.0.1
echo 请输入版本号：
set /p version=
echo 您输入的版本号是：%version%


@REM node setVersionInfo.js %server% %version%
@REM node setWechatGameConfig.js %server% %version%
.\dotnet\gamePipeline.exe build_wechat_set_version %server% %version%
echo 请确认版本信息，如果版本信息正确，请按任意键继续
pause

echo 开始移除小游戏构建目录
rmdir /s/q ..\client\build\wechatgame\
echo 移除小游戏构建目录完成，开始构建小游戏

set /p cocos=<配置项_cocos路径.txt
echo 开始构建小游戏
%cocos% --path ..\client\ --build "platform=wechatgame;debug=false"
echo 构建小游戏结束，请检查是否有错误，如果没有错误，请按任意键继续

.\dotnet\gamePipeline.exe build_wechat_upload %server% %version%

echo 开始备份远程目录
xcopy ..\client\build\wechatgame\remote minigame\zswechat\%version% /S /E /Y /I
echo 备份远程目录完成，移除远程目录
rmdir /s/q ..\client\build\wechatgame\remote\
echo 开始进行资源分包
xcopy ..\client\build\wechatgame\assets\internal\index.js ..\client\build\wechatgame\subpackages\engine\assets\internal\ /Y /I
del /q ..\client\build\wechatgame\assets\internal\index.js
xcopy ..\client\build\wechatgame\assets\main\index.js ..\client\build\wechatgame\subpackages\engine\assets\main\ /Y /I
del /q ..\client\build\wechatgame\assets\main\index.js
xcopy ..\client\build\wechatgame\cocos ..\client\build\wechatgame\subpackages\engine\cocos /S /E /Y /I
rmdir /s/q ..\client\build\wechatgame\cocos
xcopy ..\client\build\wechatgame\src ..\client\build\wechatgame\subpackages\engine\src /S /E /Y /I
rmdir /s/q ..\client\build\wechatgame\src
xcopy ..\client\build\wechatgame\adapter-min.js ..\client\build\wechatgame\subpackages\engine\ /Y /I
del /q ..\client\build\wechatgame\adapter-min.js
xcopy ..\client\build\wechatgame\game.js ..\client\build\wechatgame\subpackages\engine\ /Y /I
del /q ..\client\build\wechatgame\game.js
xcopy ..\client\build\wechatgame\main.js ..\client\build\wechatgame\subpackages\engine\ /Y /I
del /q ..\client\build\wechatgame\main.js
xcopy ..\client\build\wechatgame\ccRequire.js ..\client\build\wechatgame\subpackages\engine\ /Y /I
del /q ..\client\build\wechatgame\ccRequire.js
echo 资源分包完成
echo 开始拷贝平台文件到小游戏工程目录
xcopy .\platform\zs_wechat ..\client\build\wechatgame /S /E /Y /I
echo 拷贝平台文件完成
echo 可以使用微信开发者工具打开小游戏工程了
pause