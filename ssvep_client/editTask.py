# -*- coding: utf-8 -*-

from PyQt5 import QtWidgets, uic, QtCore
from PyQt5.QtWidgets import QMessageBox, QInputDialog, QFileDialog
from PyQt5.QtCore import pyqtSignal
import sys, os

import pickle
import random

from MainTask import MainTask, TaskProperty

class editSubtaskWindow(QtWidgets.QMainWindow):
    subTask_signal=pyqtSignal(list)
    def __init__(self,selectItem='Cue',methodList=['None']):
        super(editSubtaskWindow, self).__init__()
        uic.loadUi('editSubtaskWindow.ui', self)
        self.setWindowTitle("Edit Task")
        #
        self.setWindowModality(QtCore.Qt.ApplicationModal)
        #
        self.taskTypeSelection=self.findChild(QtWidgets.QComboBox,'taskTypeSelection')
        selectIndex=self.taskTypeSelection.findText(selectItem)
        if not selectIndex>=0:
            selectIndex=0
        self.taskTypeSelection.setCurrentIndex(selectIndex)
        self.taskTypeSelection.currentTextChanged.connect(self.updatePropertEdit)
        self.cueGroup=self.findChild(QtWidgets.QGroupBox,'cueGroup')
        self.flashGroup=self.findChild(QtWidgets.QGroupBox,'flashGroup')
        self.breakGroup=self.findChild(QtWidgets.QGroupBox,'breakGroup')
        self.okButton=self.findChild(QtWidgets.QPushButton,'okButton')
        self.okButton.clicked.connect(self.okButtonFun)
        self.cancelButton=self.findChild(QtWidgets.QPushButton,'cancelButton')
        self.cancelButton.clicked.connect(self.cancelButtonFun)
        #
        self.cueTime=self.findChild(QtWidgets.QDoubleSpinBox,'cueTime')
        self.cueTarget=self.findChild(QtWidgets.QSpinBox,'cueTarget')
        self.cueTargetRandomButton=self.findChild(QtWidgets.QPushButton,'cueTargetRandomButton')
        self.cueTargetRandomButton.clicked.connect(self.cueTargetRandomButtonFun)
        self.flashTime=self.findChild(QtWidgets.QDoubleSpinBox,'flashTime')
        self.flashMethod=self.findChild(QtWidgets.QComboBox,'flashMethod')
        self.flashMethod.clear()
        self.flashMethod.addItems(methodList)
        self.flashMethod.setCurrentIndex(0)
        self.flashTarget=self.findChild(QtWidgets.QSpinBox,'flashTarget')
        self.flashTargetRandomButton=self.findChild(QtWidgets.QPushButton,'flashTargetRandomButton')
        self.flashTargetRandomButton.clicked.connect(self.flashTargetRandomButtonFun)
        self.breakTime=self.findChild(QtWidgets.QDoubleSpinBox,'breakTime')
        #
        self.selectedTaskType=None
        self.methodList=methodList
        #
        self.updatePropertEdit()
    def cueTargetRandomButtonFun(self):
        inputValue, ok = QInputDialog.getInt(self, 'Number of targets', 'Total number of targets:',1,1,99,1)
        if ok:
            oldValue=self.cueTarget.value()
            newValue=oldValue
            N=0
            while oldValue==newValue:
                N+=1
                if N>999:
                    break
                targetOrder=list(range(inputValue))
                random.shuffle(targetOrder)
                newValue=targetOrder[0]+1
            self.cueTarget.setValue(newValue)
    def flashTargetRandomButtonFun(self):
        inputValue, ok = QInputDialog.getInt(self, 'Number of targets', 'Total number of targets:',1,1,99,1)
        if ok:
            oldValue=self.flashTarget.value()
            newValue=oldValue
            N=0
            while oldValue==newValue:
                N+=1
                if N>999:
                    break
                targetOrder=list(range(inputValue))
                random.shuffle(targetOrder)
                newValue=targetOrder[0]+1
            self.flashTarget.setValue(newValue)
    def okButtonFun(self):
        propertyList=[]
        if self.selectedTaskType=='Cue':
            propertyList.append(TaskProperty('time',str(self.cueTime.value())))
            propertyList.append(TaskProperty('target', str(self.cueTarget.value())))
        elif self.selectedTaskType=='Flash':
            propertyList.append(TaskProperty('time',str(self.flashTime.value())))
            propertyList.append(TaskProperty('method',self.flashMethod.currentText()))
            propertyList.append(TaskProperty('target',str(self.flashTarget.value())))
        elif self.selectedTaskType=='Break':
            propertyList.append(TaskProperty('time',str(self.breakTime.value())))
        self.subTask_signal.emit([self.selectedTaskType,propertyList])
    def cancelButtonFun(self):
        self.subTask_signal.emit(['',[]])
    def updatePropertEdit(self):
        self.selectedTaskType=self.taskTypeSelection.currentText()
        if self.selectedTaskType=='Cue':
            self.cueGroup.show()
            self.flashGroup.hide()
            self.breakGroup.hide()
        elif self.selectedTaskType=='Flash':
            self.cueGroup.hide()
            self.flashGroup.show()
            self.breakGroup.hide()
        elif self.selectedTaskType=='Break':
            self.cueGroup.hide()
            self.flashGroup.hide()
            self.breakGroup.show()
            
class editStimInfoWindow(QtWidgets.QMainWindow):
    send_list_signal = pyqtSignal(list)
    def __init__(self,freqList=[],phaseList=[],labelList=[],numTarget=12):
        super(editStimInfoWindow, self).__init__()
        uic.loadUi('inputStimInfoWindow.ui', self)
        self.setWindowTitle("Stimulus Infomation")
        #
        self.freqList=freqList
        self.phaseList=phaseList
        self.labelList=labelList
        #
        self.infoTable=self.findChild(QtWidgets.QTableWidget,'infoTable')
        self.infoTable.itemChanged.connect(self.itemChangeCheck)
        self.infoTable.setRowCount(numTarget)
        for i in range(len(self.freqList)):
            self.infoTable.setItem(i,0,QtWidgets.QTableWidgetItem(str(self.freqList[i])))
        for i in range(len(self.phaseList)):
            self.infoTable.setItem(i,1,QtWidgets.QTableWidgetItem(str(self.phaseList[i])))
        for i in range(len(self.labelList)):
            self.infoTable.setItem(i,2,QtWidgets.QTableWidgetItem(str(self.labelList[i])))
        #
        self.clearButton=self.findChild(QtWidgets.QPushButton,'clearButton')
        self.clearButton.clicked.connect(self.clearButtonFun)
        self.cancelButton=self.findChild(QtWidgets.QPushButton,'cancelButton')
        self.cancelButton.clicked.connect(self.cancelButtonFun)
        self.okButton=self.findChild(QtWidgets.QPushButton,'okButton')
        self.okButton.clicked.connect(self.okButtonFun)
        self.changeStimNumButton=self.findChild(QtWidgets.QPushButton,'changeStimNumButton')
        self.changeStimNumButton.clicked.connect(self.changeStimNumButtonFun)
    def changeStimNumButtonFun(self):
        inputValue, ok = QInputDialog.getInt(self, 'Number of targets', 'Total number of targets:',1,1,99,1)
        if ok:
            self.infoTable.setRowCount(inputValue)
    def itemChangeCheck(self,item):
        row=item.row()
        col=item.column()
        content=item.text()
        if len(content)!=0:
            if col == 0 or col == 1:
                try:
                    content=float(content)
                except:
                    QMessageBox.warning(self, 'Enter wrong value', 'Freqeuncy or phase must be a number.')
                    content='' 
        else:
            content=''
        item.setText(str(content))
        #self.infoTable.setItem(row,col,QtWidgets.QTableWidgetItem(str(content)))
    def getTableContent(self,row,col):
        currentItem=self.infoTable.item(row,col)
        if currentItem is None:
            return ''
        else:
            return currentItem.text()
    def updateList(self):
        numTarget=self.infoTable.rowCount()
        self.freqList=[]
        self.phaseList=[]
        self.labelList=[]
        for i in range(numTarget):
            currentItem=self.getTableContent(i,0)
            if len(currentItem)!=0:
                self.freqList.append(float(currentItem))
            currentItem=self.getTableContent(i,1)
            if len(currentItem)!=0:
                self.phaseList.append(float(currentItem))
            currentItem=self.getTableContent(i,2)
            if len(currentItem)!=0:
                self.labelList.append(currentItem)
    def okButtonFun(self):
        self.updateList()
        min_len=min(len(self.freqList),len(self.phaseList),len(self.labelList))
        if len(self.freqList)==min_len and len(self.phaseList)==min_len and len(self.labelList)==min_len:
            propertyList=[]
            propertyList.append(TaskProperty('freq',self.freqList))
            propertyList.append(TaskProperty('phase',self.phaseList))
            propertyList.append(TaskProperty('label',self.labelList))
            self.send_list_signal.emit(propertyList)
        else:
            QMessageBox.warning(self, 'Table Wrong Contents', 'Please fill all table or clear table.')
    def clearButtonFun(self):
        self.infoTable.clearContents()
    def cancelButtonFun(self):
        self.close()

class editTaskWindow(QtWidgets.QMainWindow):
    send_currentTask_signal = pyqtSignal(MainTask)
    def __init__(self,existTask=None):
        super(editTaskWindow, self).__init__()
        uic.loadUi('editTaskWindow.ui', self)
        self.setWindowTitle("Schedule Task")
        #
        if existTask is None:
            self.currentTask=MainTask('DefaultTask')
            self.currentTask.propertyList=[]
            self.currentTask.propertyList.append(TaskProperty('freq',[]))
            self.currentTask.propertyList.append(TaskProperty('phase',[]))
            self.currentTask.propertyList.append(TaskProperty('label',[]))
        else:
            self.currentTask=existTask
        self.selectIndex=None
        self.methodList=['None','cca']
        #
        self.taskDisplay=self.findChild(QtWidgets.QTreeWidget, 'taskDisplay')
        self.taskDisplay.clicked.connect(self.selectTreeItem)
        self.addTaskButton=self.findChild(QtWidgets.QPushButton,'addTaskButton')
        self.addTaskButton.clicked.connect(self.addTaskButtonFun)
        self.deleteTaskButton=self.findChild(QtWidgets.QPushButton,'deleteTaskButton')
        self.deleteTaskButton.clicked.connect(self.deleteTaskButtonFun)
        self.upTaskButton=self.findChild(QtWidgets.QPushButton,'upTaskButton')
        self.upTaskButton.clicked.connect(self.upTaskButtonFun)
        self.downTaskButton=self.findChild(QtWidgets.QPushButton,'downTaskButton')
        self.downTaskButton.clicked.connect(self.downTaskButtonFun)
        self.editTaskButton=self.findChild(QtWidgets.QPushButton,'editTaskButton')
        self.editTaskButton.clicked.connect(self.editTaskButtonFun)
        self.clearAllButton=self.findChild(QtWidgets.QPushButton,'clearAllButton')
        self.clearAllButton.clicked.connect(self.clearAllButtonFun)
        #
        self.renameTaskButton=self.findChild(QtWidgets.QPushButton,'renameTaskButton')
        self.renameTaskButton.clicked.connect(self.renameTaskButtonFun)
        self.trainTaskButton=self.findChild(QtWidgets.QPushButton,'trainTaskButton')
        self.trainTaskButton.clicked.connect(self.trainTaskButtonFun)
        self.testTaskButton=self.findChild(QtWidgets.QPushButton,'testTaskButton')
        self.testTaskButton.clicked.connect(self.testTaskButtonFun)
        self.okButton=self.findChild(QtWidgets.QPushButton,'okButton')
        self.okButton.clicked.connect(self.okButtonFun)
        self.saveTaskButton=self.findChild(QtWidgets.QPushButton,'saveTaskButton')
        self.saveTaskButton.clicked.connect(self.saveTaskButtonFun)
        self.editStimInfoButton=self.findChild(QtWidgets.QPushButton,'editStimInfoButton')
        self.editStimInfoButton.clicked.connect(self.editStimInfoButtonFun)
        #
        self.updateTaskDisplay()
    def editStimInfoButtonFun(self):
        freqList=self.currentTask.searchProperty('freq')
        if freqList is None:
            freqList=[]
        phaseList=self.currentTask.searchProperty('phase')
        if phaseList is None:
            phaseList=[]
        labelList=self.currentTask.searchProperty('label')
        if labelList is None:
            labelList=[]
        numTarget=max(len(freqList),len(phaseList),len(labelList))
        if numTarget<=0:
            inputValue, ok = QInputDialog.getInt(self, 'Number of targets', 'Total number of targets:',1,1,99,1)
            if ok:
                numTarget=inputValue
            else:
                numTarget=0
        if numTarget>0:
            self.editStimInfoWindow=editStimInfoWindow(freqList,phaseList,labelList,numTarget)
            self.editStimInfoWindow.send_list_signal.connect(self.updateMainTaskProperty)
            self.editStimInfoWindow.show()
    def updateMainTaskProperty(self,propertyList):
        self.currentTask.propertyList=propertyList
        self.editStimInfoWindow.close()
        self.updateTaskDisplay()
    def renameTaskButtonFun(self):
        text, ok = QInputDialog.getText(self, 'Rename Task', 'Enter task name:')
        if ok and (not text==''):
            self.currentTask.name=text
            self.updateTaskDisplay()
    def okButtonFun(self):
        self.send_currentTask_signal.emit(self.currentTask)
    def saveTaskButtonFun(self):
        fileName_choose, fileType = QFileDialog.getSaveFileName(self,'Save task',os.getcwd(),'*.BrainTask')
        try:
            storeTask=self.currentTask
            with open(fileName_choose, 'wb') as f:
                pickle.dump(storeTask,f)
        except:
            pass
    def trainTaskButtonFun(self):
        inputValue, ok = QInputDialog.getInt(self, 'Number of targets', 'Total number of targets:',1,1,99,1)
        if ok:
            targetOrder=list(range(inputValue))
            reply = QMessageBox.question(self, 'Random Order', 'Do you need random flash targets?', 
                                                QMessageBox.Yes | QMessageBox.No | QMessageBox.Cancel, QMessageBox.No)
            if reply == QMessageBox.Yes:
                    random.shuffle(targetOrder)
            if reply != QMessageBox.Cancel:
                self.currentTask.clear()
                for i in range(inputValue):
                    # cue
                    taskName='Cue'
                    propertyList=[]
                    propertyList.append(TaskProperty('time',str(1)))
                    propertyList.append(TaskProperty('target', str(targetOrder[i]+1)))
                    self.currentTask.addNewSubtask(taskName,propertyList)
                    # flash
                    taskName='Flash'
                    propertyList=[]
                    propertyList.append(TaskProperty('time',str(6)))
                    propertyList.append(TaskProperty('method','None'))
                    propertyList.append(TaskProperty('target',str(targetOrder[i]+1)))
                    self.currentTask.addNewSubtask(taskName,propertyList)
                    # break
                    taskName='Break'
                    propertyList=[]
                    propertyList.append(TaskProperty('time',str(1)))
                    self.currentTask.addNewSubtask(taskName,propertyList)
                self.updateTaskDisplay()
    def testTaskButtonFun(self):
        numTarget, ok = QInputDialog.getInt(self, 'Number of targets', 'Total number of targets:',1,1,99,1)
        if ok:
            inputValue, ok = QInputDialog.getItem(self, 'Classification method', 'Select a classification method:', self.methodList,0,False)
            if ok:
                self.currentTask.clear()
                for i in range(numTarget):
                    # break
                    taskName='Break'
                    propertyList=[]
                    propertyList.append(TaskProperty('time',str(1)))
                    self.currentTask.addNewSubtask(taskName,propertyList)
                    # flash
                    taskName='Flash'
                    propertyList=[]
                    propertyList.append(TaskProperty('time',str(6)))
                    propertyList.append(TaskProperty('method',inputValue))
                    propertyList.append(TaskProperty('target',str(i+1)))
                    self.currentTask.addNewSubtask(taskName,propertyList)
                # break
                taskName='Break'
                propertyList=[]
                propertyList.append(TaskProperty('time',str(1)))
                self.currentTask.addNewSubtask(taskName,propertyList)
                self.updateTaskDisplay()
    def addTaskButtonFun(self):
        self.editSubtaskWindow=editSubtaskWindow(methodList=self.methodList)
        self.editSubtaskWindow.subTask_signal.connect(self.addSubtask)
        self.editSubtaskWindow.show()
    def addSubtask(self,newSubTask):
        if not newSubTask[0]=='':
            self.currentTask.addNewSubtask(newSubTask[0],newSubTask[1])
        self.editSubtaskWindow.close()
        self.updateTaskDisplay()
    def editTaskButtonFun(self):
        if self.selectIndex is not None:
            item=self.taskDisplay.currentItem()
            self.editSubtaskWindow_edit=editSubtaskWindow(item.text(0),methodList=self.methodList)
            self.editSubtaskWindow_edit.subTask_signal.connect(self.editSubtask)
            self.editSubtaskWindow_edit.show()
    def editSubtask(self,newSubTask):
        if not newSubTask[0]=='':
            self.currentTask.editSubTask(self.selectIndex,newSubTask[0],newSubTask[1])
        self.editSubtaskWindow_edit.close()
        self.updateTaskDisplay()
    def deleteTaskButtonFun(self):
        if self.selectIndex is not None:
            self.currentTask.removeSubtask(self.selectIndex)
            self.selectIndex=None
            self.updateTaskDisplay()
    def clearAllButtonFun(self):
        self.currentTask.clear()
        self.selectIndex=None
        self.updateTaskDisplay()
    def upTaskButtonFun(self):
        if self.selectIndex is not None:
            self.selectIndex=self.currentTask.upSubtask(self.selectIndex)
            self.updateTaskDisplay()
    def downTaskButtonFun(self):
        if self.selectIndex is not None:
            self.selectIndex=self.currentTask.downSubtask(self.selectIndex)
            self.updateTaskDisplay()
    def updateTaskDisplay(self):
        self.taskDisplay.clear()
        #
        root=QtWidgets.QTreeWidgetItem(self.taskDisplay)
        root.setText(0,self.currentTask.name)
        root.setText(1,self.currentTask.value)
        root.setText(2,self.currentTask.classValue)
        #
        if len(self.currentTask.taskList)==0 and len(self.currentTask.propertyList)==0:
            child=QtWidgets.QTreeWidgetItem(root)
            child.setText(0,'')
            child.setText(1,'')
            child.setText(2,'')
        else:
            if len(self.currentTask.propertyList)!=0:
                for propertyItem in self.currentTask.propertyList:
                    propertyChild=QtWidgets.QTreeWidgetItem(root)
                    propertyChild.setText(0,propertyItem.name)
                    propertyChild.setText(1,str(propertyItem.value))
                    propertyChild.setText(2,propertyItem.classValue)
            if len(self.currentTask.taskList)!=0:
                for subTask in self.currentTask.taskList:
                    child=QtWidgets.QTreeWidgetItem(root)
                    child.setText(0,subTask.name)
                    child.setText(1,str(subTask.value))
                    child.setText(2,subTask.classValue)
                    for propertyItem in subTask.propertyList:
                        propertyChild=QtWidgets.QTreeWidgetItem(child)
                        propertyChild.setText(0,propertyItem.name)
                        propertyChild.setText(1,propertyItem.value)
                        propertyChild.setText(2,propertyItem.classValue)
        #
        self.taskDisplay.addTopLevelItem(root)
        self.taskDisplay.expandAll()
        #
        if self.selectIndex is not None:
            for item in self.taskDisplay.findItems(str(self.selectIndex),QtCore.Qt.MatchRecursive,1):
                if item.text(2)=='SubTask':
                    self.taskDisplay.setCurrentItem(item)
        
    def selectTreeItem(self):
        item=self.taskDisplay.currentItem()
        if item.text(2)=='MainTask':
            self.selectIndex=None
        elif item.text(2)=='Property':
            self.selectIndex=int(item.parent().text(1))
        elif item.text(2)=='SubTask':
            self.selectIndex=int(item.text(1))
        else:
            self.selectIndex=None
        self.updateTaskDisplay()
        
if __name__=='__main__':
    app = QtWidgets.QApplication(sys.argv)
    window = editTaskWindow()
    window.show()
    app.exec_()