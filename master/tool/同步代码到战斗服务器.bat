@echo off
set source_folder=..\client\assets\script\game\battleLogic
set destination_folder=..\tower_server_battle\src\game\battleLogic

:: 删除目标文件夹及其内容
rd /S /Q "%destination_folder%" 2>nul

:: 创建目标文件夹
mkdir "%destination_folder%" 2>nul

:: 递归拷贝文件
xcopy "%source_folder%\*.ts" "%destination_folder%" /S /Y

:: 遍历目标文件夹中的所有文件并插入行
for /R "%destination_folder%" %%f in (*.ts) do (
    (
        echo. & echo // @ts-nocheck & type "%%f"
    ) > "%%f.tmp"
    move /Y "%%f.tmp" "%%f" >nul
)

pause
