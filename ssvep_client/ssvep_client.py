# -*- coding: utf-8 -*-
import socketio
import time

from PyQt5 import QtWidgets, uic
from PyQt5.QtWidgets import QMessageBox, QFileDialog
from PyQt5.QtCore import pyqtSignal
import sys, os

from pylsl import StreamInfo, StreamOutlet, StreamInlet

import pickle
import subprocess

from clockClass import clockClass
from editTask import editTaskWindow
        
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
    changeTrial_signal = pyqtSignal(str)
    def _handle_changeTrial_fun(self,data):
        self.changeTrial_signal.emit(data)
    leaveRoom_signal = pyqtSignal(str)
    def _handle_leaveRoom_fun(self,data):
        self.leaveRoom_signal.emit(data)
    SSVEPResponse_signal = pyqtSignal(str)
    def _handle_SSVEPResponse_fun(self,data):
        self.SSVEPResponse_signal.emit(data)
        
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
        self.sio.on('changeTrial',self._handle_changeTrial_fun)
        self.changeTrial_signal.connect(self.changeTrial_fun)
        self.sio.on('leaveRoom',self._handle_leaveRoom_fun)
        self.leaveRoom_signal.connect(self.leaveRoom_fun)
        self.sio.on('SSVEPResponse',self._handle_SSVEPResponse_fun)
        self.SSVEPResponse_signal.connect(self.SSVEPResponse_fun)
        #
        self.marker_info = StreamInfo('MarkerStream','Markers',1,0,'string','id_MarkerStream')
        self.response_info = StreamInfo('ResponseStream', 'Responses',1, 0, 'string', 'id_ResponseStream')
        self.marker_sender = StreamOutlet(self.marker_info)
        self.response_receiver = StreamInlet(self.response_info)
        self.marker_string=['start_trial','end_trial','end_all','start_all']
        #
        self.currentTask = None
        self.taskValue={'Cue':1,'Flash':2,'Break':3}
        self.state_clock=clockClass()
        self.connect_flag=False
        self.taskContinue_flag=False
        self.server_path=''
        self.roomStr=''
        self.idStr=''
        self.consoleOutputText=''
        self.currentGameState = 0
        self.nextGameState = -1
        self.forceChangeState=False
        self.mainPath=os.getcwd()
        self.matlabPath=os.path.join(self.mainPath,'matlab_signal')
        #
        self.idDisplay = self.findChild(QtWidgets.QLineEdit, 'idStr')
        self.roomDisplay = self.findChild(QtWidgets.QLineEdit, 'roomStr')
        self.connectFlagDisplay = self.findChild(QtWidgets.QLineEdit, 'connectFlag')
        self.consoleOutput = self.findChild(QtWidgets.QPlainTextEdit,'consoleOutput')
        self.consoleDisplay_signal.connect(self.updateConsoleOutput)
        #
        self.connectServerFlag = self.findChild(QtWidgets.QLineEdit, 'connectServerFlag')
        self.connectServerFlag.setText('Disconnected')
        self.serverPathDisplay = self.findChild(QtWidgets.QLineEdit, 'serverPathStr')
        self.connectButton = self.findChild(QtWidgets.QPushButton, 'connectButton')
        self.connectButton.clicked.connect(self.connectButtonFun)
        self.disconnectButton = self.findChild(QtWidgets.QPushButton, 'disconnectButton')
        self.disconnectButton.clicked.connect(self.disconnectButtonFun)
        #
        self.autoCreateRoom = self.findChild(QtWidgets.QPushButton, 'autoCreateRoomButton')
        self.autoCreateRoom.clicked.connect(self.autoCreateRoomFun)
        self.roomIDEntryDisplay = self.findChild(QtWidgets.QLineEdit, 'roomIDEntry')
        self.enterRoomButton = self.findChild(QtWidgets.QPushButton, 'enterRoomButton')
        self.enterRoomButton.clicked.connect(self.enterRoomButtonFun)
        self.leaveRoomButton = self.findChild(QtWidgets.QPushButton, 'leaveRoomButton')
        self.leaveRoomButton.clicked.connect(self.leaveRoomButtonFun)
        #
        self.loadTaskButon = self.findChild(QtWidgets.QPushButton, 'loadTaskButton')
        self.loadTaskButton.clicked.connect(self.loadTaskButtonFun)
        self.startTaskButton = self.findChild(QtWidgets.QPushButton, 'startTaskButton')
        self.startTaskButton.clicked.connect(self.startTaskButtonFun)
        self.scheduleTaskButton = self.findChild(QtWidgets.QPushButton, 'scheduleTaskButton')
        self.scheduleTaskButton.clicked.connect(self.scheduleTaskButtonFun)
        self.stopTaskButton = self.findChild(QtWidgets.QPushButton, 'stopTaskButton')
        self.stopTaskButton.clicked.connect(self.stopTaskButtonFun)
        self.taskDisplay = self.findChild(QtWidgets.QLineEdit, 'taskDisplay')
        #
        self.updateStateDisplay()
        self.consoleDisplay_signal.emit('')
        #
        self.show()
        
    def closeEvent(self, event):
        self.sio.disconnect()
        self.marker_info.__del__()
        self.response_info.__del__()
        self.marker_sender.__del__()
        self.response_receiver.__del__()
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
        if self.currentTask is not None:
            self.taskDisplay.setText(self.currentTask.name)
        else:
            self.taskDisplay.setText('')
        
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
        self.connectServerFlag.setText('Connected')
        self.consoleDisplay_signal.emit('Connect at '+self.sio.connection_url+'\n---- Start AT '+localtime+' ----\n')
        
    def disconnect_fun(self):
        self.connect_flag=False
        self.roomStr=''
        self.idStr=''
        self.connectServerFlag.setText('Disconnected')
        localtime = time.asctime( time.localtime(time.time()) )
        self.consoleDisplay_signal.emit('\n---- End AT '+localtime+' ----\nDisconnect at '+self.sio.connection_url)
        self.updateStateDisplay()
        # if self.currentGameState>0 and self.currentGameState<999:
        #     try:
        #         self.sio.emit('changeGameState',str(104))
        #     except:
        #         pass     
            # self.nextGameState=104
            
    def leaveRoom_fun(self,data):
        self.connect_flag=False
        self.roomStr=''
        self.idStr=''
        self.consoleDisplay_signal.emit(data)
        self.updateStateDisplay()
        # if self.currentGameState>0 and self.currentGameState<999:
        #     try:
        #         self.sio.emit('changeGameState',str(104))
        #     except:
        #         pass     
            # self.nextGameState=104
            
    def message_fun(self,data):
        self.consoleDisplay_signal.emit('Message: '+data)
        
    def error_fun(self,data):
        self.consoleDisplay_signal.emit(data)
        #self.sio.disconnect()
        
    def changeGameStateRes_fun(self,data):
        self.nextGameState=int(data)
        self.forceChangeState=True
        self.consoleDisplay_signal.emit('change state to '+data)
    
    def SSVEPResponse_fun(self,data):
        self.consoleDisplay_signal.emit('SSVEP response is '+data)
        
    def changeTrial_fun(self,data):
        self.consoleDisplay_signal.emit('change trial to '+data)
        
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
        self.roomIDEntryDisplay.setText('')
        if len(roomID)==0:
            self.consoleDisplay_signal.emit('Please enter stimulus room ID')
        else:
            try:
                self.sio.emit('addNewSSVEPAnalysis','ssvepanalysis,'+roomID)
            except:
                self.consoleDisplay_signal.emit('Please connect to server first')
                
    def leaveRoomButtonFun(self):
        try:
            self.sio.emit('leaveRoom','')
        except:
            self.consoleDisplay_signal.emit('Please connect to server first')
            
    def startTaskButtonFun(self):
        if self.currentTask is None:
            self.consoleDisplay_signal.emit('Please schedule a task')
        else:
            if self.connect_flag:
                self.consoleDisplay_signal.emit('Start Task')
                self.taskContinue_flag=True
                self.sio.start_background_task(self.main_task)
            else:
                self.consoleDisplay_signal.emit('Please connect to stimulus first')
            
    def stopTaskButtonFun(self):
        self.taskContinue_flag=False
        
    def clearn_response_receiver(self):
        sample='init'
        while sample is not None:
            sample, timestamp = self.response_receiver.pull_sample(0)
        
            
    def main_task(self):
        self.sio.emit('AskSynchronization','')
        self.currentGameState = 0
        self.nextGameState = -100
        task_step=-1
        task_list=self.currentTask.taskList
        currentTask=None
        nextTask=None
        self.clearn_response_receiver()
        freq_list=str(self.currentTask.searchProperty('freq'))
        phase_list=str(self.currentTask.searchProperty('phase'))
        label_list=str(self.currentTask.searchProperty('label'))
        label_list='{'+label_list[1:len(label_list)-1]+'}'
        matlab_command='matlab -nodesktop -nosplash -r "cd '+self.matlabPath+';'+'main_loop(1,250,'+freq_list+','+phase_list+','+label_list+',\'cca\');quit;"'
        subprocess.run(matlab_command) # start matlab here
        sample = None
        while sample != 'OK':
            sample, timestamp = self.response_receiver.pull_sample(0)
            if sample is not None:
                sample=sample[0]
        self.clearn_response_receiver()
        # wait_N=5
        # while wait_N>0:
        #     self.consoleDisplay_signal.emit('Wait '+str(wait_N))
        #     time.sleep(1)
        #     wait_N=wait_N-1
        # self.marker_sender.push_sample([self.marker_string[3]])
        while self.taskContinue_flag:
            if self.nextGameState!=self.currentGameState or self.forceChangeState:
                if self.currentGameState==-100 and (not self.nextGameState==101) and (not self.nextGameState==100):
                    self.nextGameState=-100
                    self.sio.emit('changeGameState',str(100))
                self.currentGameState=self.nextGameState
                self.forceChangeState=False
                self.consoleDisplay_signal.emit('current state: '+str(self.currentGameState))
                if self.currentGameState==-100:
                    self.consoleDisplay_signal.emit('wait for synchronization')
                elif self.currentGameState==0:
                    break
                elif self.currentGameState==1 or self.currentGameState==2 or self.currentGameState==3:
                    if self.currentGameState==2:
                        self.marker_sender.push_sample([self.marker_string[0]])
                    task_step=task_step+1
                    currentTask=task_list[task_step]
                    currentTask_time=float(currentTask.searchProperty('time'))
                    if (task_step+1)==len(task_list):
                        nextState=4
                    else:
                        nextTask=task_list[task_step+1]
                        nextState=self.taskValue[nextTask.name]
                        nextTask_target=nextTask.searchProperty('target')
                        if nextTask_target is not None:
                            self.sio.emit('changeTrial',nextTask_target)
                    self.state_clock.startClock(currentTask_time, nextState)
                    # self.consoleDisplay_signal.emit('Cue')
                    # self.state_clock.startClock(1, 2)
                    # sio.sleep(1)
                    # sio.emit('changeGameState','2')
                # elif self.currentGameState==2:
                #     self.consoleDisplay_signal.emit('Flash')
                #     self.state_clock.startClock(6, 3)
                    # sio.sleep(6)
                    # sio.emit('changeGameState','3')
                # elif self.currentGameState==3:
                #     self.consoleDisplay_signal.emit('Rest')
                #     self.state_clock.startClock(1, 4)
                    # sio.sleep(1)
                    # sio.emit('changeGameState','4')
                elif self.currentGameState==4:
                    self.consoleDisplay_signal.emit('End')
                elif self.currentGameState==5:
                    self.consoleDisplay_signal.emit('Wait for stim enter room')
                elif self.currentGameState==100:
                    task_step=-1
                    task_list=self.currentTask.taskList
                    currentTask=None
                    nextTask=None
                elif self.currentGameState==101:
                    self.state_clock.startClock(1, 102)
                    #sio.emit('changeGameState','102')
                elif self.currentGameState==102 or self.currentGameState==103:
                    task_step=-1
                    task_list=self.currentTask.taskList
                    currentTask=None
                    nextTask=None
                    #
                    if (task_step+1)==len(task_list):
                        nextState=4
                    else:
                        nextTask=task_list[task_step+1]
                        nextState=self.taskValue[nextTask.name]
                        nextTask_target=nextTask.searchProperty('target')
                        if nextTask_target is not None:
                            self.sio.emit('changeTrial',nextTask_target)
                    self.state_clock.startClock(3, nextState)
                    # sio.sleep(3)
                    # sio.emit('changeGameState','1')
                # elif self.currentGameState==103:
                    # self.state_clock.startClock(3, 1)
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
                        if self.currentGameState==2:
                            self.marker_sender.push_sample([self.marker_string[1]])
                        #self.consoleDisplay_signal.emit('Time: '+str(clock_output_time)+' s')
                        self.sio.emit('changeGameState',str(clock_ouput))
                        #nextGameState=clock_ouput
                    else:
                         if self.currentGameState==2:
                            sample, timestamp = self.response_receiver.pull_sample(0)
                            if sample is not None:
                                if type(sample)==type([]):
                                    sample=sample[0]
                                self.sio.emit('SSVEPResponse',sample)
                                clock_ouput = self.state_clock.targetState
                                self.marker_sender.push_sample([self.marker_string[1]])
                                self.sio.emit('changeGameState',str(clock_ouput))
        if self.connect_flag:
            self.sio.emit('changeGameState',str(100))
        self.taskContinue_flag=False
        self.marker_sender.push_sample([self.marker_string[2]])
        self.consoleDisplay_signal.emit('Task Finish')
        
    def scheduleTaskButtonFun(self):
        #self.consoleDisplay_signal.emit('Schedule Task')
        if self.taskContinue_flag:
            self.consoleDisplay_signal.emit('Please stop task first')
        else:
            self.editTaskWindow=editTaskWindow(self.currentTask)
            self.editTaskWindow.send_currentTask_signal.connect(self.renewTask)
            self.editTaskWindow.show()
    def renewTask(self,newTask):
        deletFlag=newTask.checkTimeInList()
        if deletFlag:
            self.consoleDisplay_signal.emit('Tasks with time = 0 have been deleted.')
        if len(newTask.taskList)==0:
            self.currentTask=None
            self.consoleDisplay_signal.emit('New task is empty')
        else:
            self.currentTask=newTask
            self.consoleDisplay_signal.emit('schedule a new task: \n'+self.currentTask.display())
        self.updateStateDisplay()
        self.editTaskWindow.close()
    def loadTaskButtonFun(self):
        if self.taskContinue_flag:
            self.consoleDisplay_signal.emit('Please stop task first')
        else:
            fileName_choose, fileType = QFileDialog.getOpenFileName(self,'Select stored task file',os.getcwd(),'*.BrainTask')
            try:
                with open(fileName_choose,'rb') as f:
                    storeTask=pickle.load(f)
                newTask=storeTask
                deletFlag=newTask.checkTimeInList()
                if deletFlag:
                    self.consoleDisplay_signal.emit('Tasks with time = 0 have been deleted.')
                if len(newTask.taskList)==0:
                    self.currentTask=None
                    self.consoleDisplay_signal.emit('New task is empty')
                else:
                    self.currentTask=newTask
                    self.consoleDisplay_signal.emit('schedule a new task: \n'+self.currentTask.display())
                self.updateStateDisplay()
            except:
                pass
        
        
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