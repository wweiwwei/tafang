@echo off
chcp 65001

echo 选择服务器，以下为可选的服务器

echo 1、测试服

echo 输入服务器编号：

set /p server=

echo 您选择的服务器是：%server%
   
echo 开始发行打表
cd ../tool
node pipeLine.js makeClientTableRelease %server%
echo 发行打表结束，如果没有报错，请按任意键继续
cd ../pack
pause