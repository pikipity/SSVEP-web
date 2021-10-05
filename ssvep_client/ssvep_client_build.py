import PyInstaller.__main__

PyInstaller.__main__.run([
    'ssvep_client.py',
    '--workpath=./release/build',
    '--distpath=./release/dist',
    '--specpath=./release',
    '-w',
    '--onefile',
    '--noconfirm',
    '--clean',
    '--add-data=D:\Github\SSVEP-web\ssvep_client\clientMainWindow.ui;.',
    '--add-data=D:\Github\SSVEP-web\ssvep_client\editSubtaskWindow.ui;.',
    '--add-data=D:\Github\SSVEP-web\ssvep_client\editTaskWindow.ui;.',
    '--add-data=D:\Github\SSVEP-web\ssvep_client\inputStimInfoWindow.ui;.',
    '--add-data=C:\Program Files (x86)\Anaconda\envs\ssvep_client_build\Lib\site-packages\pylsl\lib;./pylsl/lib',
    '--add-data=D:\Github\SSVEP-web\ssvep_client\matlab_signal;./matlab_signal'
])