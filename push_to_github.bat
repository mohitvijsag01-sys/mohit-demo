@echo off
echo ========================================================
echo        PUSHING SAR CAR TO GITHUB REPOSITORY
echo        https://github.com/mohitvijsag01-sys/mohit-demo.git
echo ========================================================
echo.
git remote set-url origin https://github.com/mohitvijsag01-sys/mohit-demo.git
git branch -M main
git push -u origin main
echo.
echo ========================================================
pause

