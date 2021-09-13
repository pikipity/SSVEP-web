# -*- coding: utf-8 -*-
import socketio
import time

from PyQt5 import QtWidgets, uic
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
    def __init__(self):
        super(Ui, self).__init__()
        uic.loadUi('clientMainWindow.ui', self)
        #
        self.idDisplay = self.findChild(QtWidgets.QLineEdit, 'idStr')
        #self.idDisplay.setText('None')
        self.roomDisplay = self.findChild(QtWidgets.QLineEdit, 'roomStr')
        #self.roomDisplay.setText('None')
        self.connectFlagDisplay = self.findChild(QtWidgets.QLineEdit, 'connectFlag')
        #self.connectFlagDisplay.setText('None')
        self.consoleOutput = self.findChild(QtWidgets.QPlainTextEdit,'consoleOutput')
        #self.consoleOutput.setPlainText('')
        #
        self.show()
        
app = QtWidgets.QApplication(sys.argv)
window = Ui()
app.exec_()