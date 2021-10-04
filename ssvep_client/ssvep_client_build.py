import PyInstaller.__main__

PyInstaller.__main__.run([
    'ssvep_client.py',
    '--noupx',
    '--noconfirm',
    '--clean',
    '--specpath=./release/build',
    '--workpath=./release/build',
    '--distpath=./release/bin',
    '--add-data=inputStimInfoWindow.ui;.',
    '--add-data=editTaskWindow.ui;.',
    '--add-data=editSubtaskWindow.ui;.',
    '--add-data=clientMainWindow.ui;.',
    '--hidden-import=PyQt5.QtWidgets',
    '--paths=D:\\Github\\SSVEP-web\\ssvep_client;C:\\Program Files (x86)\\Anaconda\\envs\\ssvep_client_build\\Lib\\site-packages\\PyQt5\\Qt\\qsci\\api\\python'
])