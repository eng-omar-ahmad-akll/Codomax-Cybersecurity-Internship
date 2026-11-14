@echo off
echo [*] Initializing Git repository and pushing to GitHub...
git init
git config user.name "eng-omar-ahmad-akll"
git config user.email "eng.omar3akll@gmail.com"
git add .
git commit -m "Add complete Module 01 and Module 02 Cybersecurity reports and lab records"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/eng-omar-ahmad-akll/Codomax-Cybersecurity-Internship.git
git push -u origin main --force
echo [+] Successfully pushed all files to https://github.com/eng-omar-ahmad-akll/Codomax-Cybersecurity-Internship
pause
