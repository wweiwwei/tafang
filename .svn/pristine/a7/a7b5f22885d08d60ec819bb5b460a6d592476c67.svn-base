@echo off
chcp 65001

echo 选择服务器，以下为可选的服务器

echo 1、测试服

echo 输入服务器编号：

set /p server=

echo 您选择的服务器是：%server%
echo 注意小游戏的版本号一定不能跟当前线上版本相同，只是测试可以考虑使用0.0.1
echo 请输入版本号：
set /p version=
echo 您输入的版本号是：%version%


node setVersionInfo.js %server% %version%
node setWechatGameConfig.js %server% %version%
echo 请确认版本信息，如果版本信息正确，请按任意键继续
pause

echo 开始移除小游戏构建目录
rmdir /s/q ..\client\build\wechatgame\
echo 移除小游戏构建目录完成，开始构建小游戏

set /p cocos=<配置项_cocos路径.txt
echo 开始构建小游戏
%cocos% --path ..\client\ --build "platform=wechatgame;debug=false"
echo 构建小游戏结束，请检查是否有错误，如果没有错误，请按任意键继续

node handleWechatGame.js %server% %version%
echo 开始备份远程目录
xcopy ..\client\build\wechatgame\remote minigame\zswechat\%version% /S /E /Y /I
echo 备份远程目录完成，移除远程目录
rmdir /s/q ..\client\build\wechatgame\remote\
echo 开始拷贝平台文件到小游戏工程目录
xcopy .\platform\zs_wechat ..\client\build\wechatgame /S /E /Y /I
echo 拷贝平台文件完成
echo 可以使用微信开发者工具打开小游戏工程了
pause