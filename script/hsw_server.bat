ECHO OFF
TITLE HSW
CLS
:MENU
ECHO.
ECHO    1 - Browser HSW [PYTHOM]  [AUTOMATE]
ECHO    2 - HSL Node    [PYTHON]  [AUTOMATE]
ECHO    3 - HSW Node    [NODE.JS] [BY HAND]
ECHO.
SET /P M=    Enter A Number:
IF %M%==1 GOTO HSW_NODE
IF %M%==2 GOTO HSL
IF %M%==3 GOTO Browser
IF %M%== GOTO return

CLS 
GOTO MENU


:return
CLS 
GOTO MENU

:Browser
CLS
cd .. && cd hsw && node index.js

:HSL
CLS
cd .. && cd hsw && python hsl.py


:HSW_NODE
CLS
cd .. && cd hsw && python index.py



PAUSE