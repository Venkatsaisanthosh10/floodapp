<!-- This is the Prompt file that works after installing all the packages in the frontend and backend-->
# Development Server Automation
## Prerequisites
- Python 3.x
- Node.js
- npm

## Setup

### Windows (start.bat)
````batch
// filepath: start.bat
@echo off
start cmd /k "python manage.py runserver 5173"
start cmd /k "npm run dev"