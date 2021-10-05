# -*- mode: python ; coding: utf-8 -*-


block_cipher = None


a = Analysis(['..\\ssvep_client.py'],
             pathex=['./release'],
             binaries=[],
             datas=[('D:\\Github\\SSVEP-web\\ssvep_client\\clientMainWindow.ui', '.'), ('D:\\Github\\SSVEP-web\\ssvep_client\\editSubtaskWindow.ui', '.'), ('D:\\Github\\SSVEP-web\\ssvep_client\\editTaskWindow.ui', '.'), ('D:\\Github\\SSVEP-web\\ssvep_client\\inputStimInfoWindow.ui', '.'), ('C:\\Program Files (x86)\\Anaconda\\envs\\ssvep_client_build\\Lib\\site-packages\\pylsl\\lib', './pylsl/lib'), ('D:\\Github\\SSVEP-web\\ssvep_client\\matlab_signal', './matlab_signal')],
             hiddenimports=[],
             hookspath=[],
             hooksconfig={},
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)

exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,  
          [],
          name='ssvep_client',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=False,
          disable_windowed_traceback=False,
          target_arch=None,
          codesign_identity=None,
          entitlements_file=None )
