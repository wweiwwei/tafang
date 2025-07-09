chcp 936
echo off

@REM REM 获取当前日期和时间的各个部分
for /F "tokens=1-7 delims=/:. " %%a in ("%date% %time%") do (
    set "year=%%a"
    set "month=%%b"
    set "day=%%c"
    set "hour=%%e"
    set "minute=%%f"
    set "second=%%g"
)

REM 构建时间字符串
set "timestamp=%year%%month%%day%%hour%%minute%%second%"

echo %timestamp%

dotnet build --configuration Release
xcopy .\bin\Release\net8.0 ..\runtime\plugin\server_game_module\%timestamp% /S /E /Y /I
curl http://127.0.0.1:9401/test/debugreload?version=%timestamp%