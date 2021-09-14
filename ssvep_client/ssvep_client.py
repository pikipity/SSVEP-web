# -*- coding: utf-8 -*-
import socketio
import time

from PyQt5 import QtWidgets, uic
from PyQt5.QtWidgets import QMessageBox
from PyQt5.QtCore import pyqtSignal
import sys

class clockClass:
    def __init__(self):
        self.switch = False
        self.startTime = -1
        self.currentTime = 0
        self.endTime = 0
        self.targetState = -1
    def startClock(self,endTime,targetState):
        self.switch = True
        self.startTime = time.time()
        self.currentTime = self.startTime
        self.endTime = endTime
        self.targetState = targetState
    def runClock(self):
        targetState = -1
        diff_time = self.currentTime-self.startTime
        if self.switch:
            self.currentTime = time.time()
            diff_time = self.currentTime-self.startTime
            if diff_time>=self.endTime:
                targetState = self.targetState
                self.stopClock()
        return targetState, diff_time
    def stopClock(self):
        self.switch = False
        self.startTime = -1
        self.currentTime = 0
        self.endTime = 0
        self.targetState = -1
        
class Ui(QtWidgets.QMainWindow):
    connect_signal = pyqtSignal()
    def _handle_connect_fun(self):
        self.connect_signal.emit()
    disconnect_signal = pyqtSignal()
    def _handle_disconnect_fun(self):
        self.disconnect_signal.emit()
    error_signal = pyqtSignal(str)
    def _handle_error_fun(self,data):
        self.error_signal.emit(data)
    changeGameStateRes_signal = pyqtSignal(str)
    def _handle_changeGameStateRes_fun(self,data):
        self.changeGameStateRes_signal.emit(data)
    CreateNewSSVEPAnalysis_signal = pyqtSignal(str)
    def _handle_CreateNewSSVEPAnalysis_fun(self,data):
        self.CreateNewSSVEPAnalysis_signal.emit(data)
    message_signal = pyqtSignal(str)
    def _handle_message_fun(self,data):
        self.message_signal.emit(data)
    synchronizationRes_signal = pyqtSignal(str)
    def _handle_synchronizationRes_fun(self,data):
        self.synchronizationRes_signal.emit(data)
    consoleDisplay_signal = pyqtSignal(str)
    
    def __init__(self):
        super(Ui, self).__init__()
        uic.loadUi('clientMainWindow.ui', self)
        #
        self.sio = socketio.Client()
        self.sio.on('connect',self._handle_connect_fun)
        self.connect_signal.connect(self.connect_fun)
        self.sio.on('disconnect',self._handle_disconnect_fun)
        self.disconnect_signal.connect(self.disconnect_fun)
        self.sio.on('Error',self._handle_error_fun)
        self.error_signal.connect(self.error_fun)
        self.sio.on('changeGameStateRes',self._handle_changeGameStateRes_fun)
        self.changeGameStateRes_signal.connect(self.changeGameStateRes_fun)
        self.sio.on('CreateNewSSVEPAnalysis',self._handle_CreateNewSSVEPAnalysis_fun)
        self.CreateNewSSVEPAnalysis_signal.connect(self.CreateNewSSVEPAnalysis_fun)
        self.sio.on('message',self._handle_message_fun)
        self.message_signal.connect(self.message_fun)
        self.sio.on('synchronizationRes',self._handle_synchronizationRes_fun)
        self.synchronizationRes_signal.connect(self.synchronizationRes_fun)
        #
        self.state_clock=clockClass()
        self.connect_flag=False
        self.server_path=''
        self.roomStr=''
        self.idStr=''
        self.consoleOutputText=''
        self.currentGameState = -1
        self.nextGameState = -1
        #
        self.idDisplay = self.findChild(QtWidgets.QLineEdit, 'idStr')
        self.roomDisplay = self.findChild(QtWidgets.QLineEdit, 'roomStr')
        self.connectFlagDisplay = self.findChild(QtWidgets.QLineEdit, 'connectFlag')
        self.consoleOutput = self.findChild(QtWidgets.QPlainTextEdit,'consoleOutput')
        self.consoleDisplay_signal.connect(self.updateConsoleOutput)
        self.serverPathDisplay = self.findChild(QtWidgets.QLineEdit, 'serverPathStr')
        self.connectButton = self.findChild(QtWidgets.QPushButton, 'connectButton')
        self.connectButton.clicked.connect(self.connectButtonFun)
        self.disconnectButton = self.findChild(QtWidgets.QPushButton, 'disconnectButton')
        self.disconnectButton.clicked.connect(self.disconnectButtonFun)
        self.autoCreateRoom = self.findChild(QtWidgets.QPushButton, 'autoCreateRoomButton')
        self.autoCreateRoom.clicked.connect(self.autoCreateRoomFun)
        self.roomIDEntryDisplay = self.findChild(QtWidgets.QLineEdit, 'roomIDEntry')
        self.enterRoomButton = self.findChild(QtWidgets.QPushButton, 'enterRoomButton')
        self.enterRoomButton.clicked.connect(self.enterRoomButtonFun)
        self.startTaskButton = self.findChild(QtWidgets.QPushButton, 'startTaskButton')
        self.startTaskButton.clicked.connect(self.startTaskButtonFun)
        self.scheduleTaskButton = self.findChild(QtWidgets.QPushButton, 'scheduleTaskButton')
        self.scheduleTaskButton.clicked.connect(self.scheduleTaskButtonFun)
        #
        self.updateStateDisplay()
        self.consoleDisplay_signal.emit('')
        self.show()
        
    def closeEvent(self, event):
        try:
            self.sio.emit('changeGameState',str(0))
        except:
            pass
        finally:
            self.sio.disconnect()
            event.accept()
#         reply = QMessageBox.question(self, 'Window Close', 'Are you sure you want to close the window?', QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
# 		if reply == QMessageBox.Yes:
#             try:
#                 self.sio.emit('changeGameState',str(0))
#             self.sio.disconnect()
# 			event.accept()
# 			print('Window closed')
# 		else:
# 			event.ignore()
        
    def updateStateDisplay(self):
        self.idDisplay.setText(self.idStr)
        self.roomDisplay.setText(self.roomStr)
        self.connectFlagDisplay.setText(str(self.connect_flag))
        
    def updateConsoleOutput(self,newIn=''):
        if not len(newIn)==0:
            self.consoleOutputText=newIn+'\n'+self.consoleOutputText
            self.consoleOutput.setPlainText(self.consoleOutputText)
        
    def connectButtonFun(self):
        self.server_path=self.serverPathDisplay.text()
        try:
            self.sio.connect(self.server_path)
        except:
            self.consoleDisplay_signal.emit('Connection Error')
        
    def disconnectButtonFun(self):
        self.sio.disconnect()
        
    def connect_fun(self):
        localtime = time.asctime( time.localtime(time.time()) )
        self.consoleDisplay_signal.emit('Connect\n---- Start AT '+localtime+' ----\n')
        
    def disconnect_fun(self):
        self.connect_flag=False
        self.roomStr=''
        self.idStr=''
        localtime = time.asctime( time.localtime(time.time()) )
        self.consoleDisplay_signal.emit('\n---- End AT '+localtime+' ----\nDisconnect')
        self.updateStateDisplay()
        if self.currentGameState>0 and self.currentGameState<999:
            self.nextGameState=104
            
    def message_fun(self,data):
        self.consoleDisplay_signal.emit('Message: '+data)
        
    def error_fun(self,data):
        self.consoleDisplay_signal.emit(data)
        #self.sio.disconnect()
        
    def changeGameStateRes_fun(self,data):
        self.nextGameState=int(data)
        self.consoleDisplay_signal.emit('change state to '+data)
        
    def CreateNewSSVEPAnalysis_fun(self,data):
        datasplit=data.split(',')
        self.idStr=datasplit[0]
        self.roomStr=datasplit[1]
        self.connect_flag=True
        self.consoleDisplay_signal.emit('CreateNewSSVEPAnalysis: '+data)
        self.updateStateDisplay()
        
    def synchronizationRes_fun(self,data):
        self.consoleDisplay_signal.emit('roommate state: '+data)
        self.nextGameState=int(data)
        
    def autoCreateRoomFun(self):
        try:
            self.sio.emit('addNewSSVEPAnalysis','ssvepanalysis')
        except:
            self.consoleDisplay_signal.emit('Please connect to server first')
            
    def enterRoomButtonFun(self):
        roomID = self.roomIDEntryDisplay.text()
        if len(roomID)==0:
            self.consoleDisplay_signal.emit('Please enter stimulus room ID')
        else:
            try:
                self.sio.emit('addNewSSVEPAnalysis','ssvepanalysis,'+roomID)
            except:
                self.consoleDisplay_signal.emit('Please connect to server first')
            
    def startTaskButtonFun(self):
        if self.connect_flag:
            self.consoleDisplay_signal.emit('Start Task')
            self.sio.start_background_task(self.main_task)
        else:
            self.consoleDisplay_signal.emit('Please connect to stimulus first')
            
    def main_task(self):
        self.sio.emit('AskSynchronization','')
        while 1:
            if self.nextGameState!=self.currentGameState:
                self.currentGameState=self.nextGameState
                self.consoleDisplay_signal.emit('current state: '+str(self.currentGameState))
                if self.currentGameState==0:
                    self.consoleDisplay_signal.emit('Start Scene')
                elif self.currentGameState==1:
                    self.consoleDisplay_signal.emit('Cue')
                    self.state_clock.startClock(1, 2)
                    # sio.sleep(1)
                    # sio.emit('changeGameState','2')
                elif self.currentGameState==2:
                    self.consoleDisplay_signal.emit('Flash')
                    self.state_clock.startClock(6, 3)
                    # sio.sleep(6)
                    # sio.emit('changeGameState','3')
                elif self.currentGameState==3:
                    self.consoleDisplay_signal.emit('Rest')
                    self.state_clock.startClock(1, 4)
                    # sio.sleep(1)
                    # sio.emit('changeGameState','4')
                elif self.currentGameState==4:
                    self.consoleDisplay_signal.emit('End')
                elif self.currentGameState==5:
                    self.consoleDisplay_signal.emit('Wait for stim enter room')
                elif self.currentGameState==100:
                    pass
                elif self.currentGameState==101:
                    self.state_clock.startClock(1, 102)
                    #sio.emit('changeGameState','102')
                elif self.currentGameState==102:
                    self.state_clock.startClock(3, 1)
                    # sio.sleep(3)
                    # sio.emit('changeGameState','1')
                elif self.currentGameState==103:
                    self.state_clock.startClock(3, 1)
                    # sio.sleep(3)
                    # sio.emit('changeGameState','1')
                elif self.currentGameState==104:
                    self.consoleDisplay_signal.emit('Error state')
                    self.state_clock.stopClock()
                elif self.currentGameState==999:
                    self.consoleDisplay_signal.emit('Error state')
                    self.state_clock.stopClock()
                else:
                    self.consoleDisplay_signal.emit('Error state')
                    self.state_clock.stopClock()
            else:
                if not self.connect_flag:
                    break
                else:
                    clock_ouput, clock_output_time=self.state_clock.runClock()
                    if clock_ouput>=0:
                        #self.consoleDisplay_signal.emit('Time: '+str(clock_output_time)+' s')
                        self.sio.emit('changeGameState',str(clock_ouput))
                        #nextGameState=clock_ouput
        self.consoleDisplay_signal.emit('Task Finish')
        
    def scheduleTaskButtonFun(self):
        self.consoleDisplay_signal.emit('Schedule Task')
        
        
# sio = socketio.Client()

# @sio.on('connect')
# def connect_fun():
#     global window
#     window.updateConsoleOutput('Connect')
    
# @sio.on('disconnect')
# def disconnect_fun():
#     global window
#     window.updateConsoleOutput('Disconnect')
        
app = QtWidgets.QApplication(sys.argv)
window = Ui()
app.exec_()