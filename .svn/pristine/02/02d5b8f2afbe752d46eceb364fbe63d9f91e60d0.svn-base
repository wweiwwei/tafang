@echo off
chcp 65001


.\dotnet\gamePipeline.exe build_h5_set_version 1 0.0.1
set /p cocos=<配置项_cocos路径.txt
echo 开始构建网页版
%cocos% --path ..\client\ --build "platform=web-mobile;debug=false"

.\lib\ali\ossutil64 -c .\lib\ali\config.txt cp -r -f ..\client\build\web-mobile oss://xunlugames/test/rth5
echo 上传完成，可以开始测试了
echo 项目地址如下
echo https://cdn.handsome.fun/test/rth5/index.html
pause