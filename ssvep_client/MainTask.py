# -*- coding: utf-8 -*-

class TaskProperty:
    def __init__(self,name,value):
        self.name=name
        self.value=value
        self.classValue='Property'

class SubTask:
    def __init__(self,index,name,propertyList):
        self.name=name
        self.value=index
        self.classValue='SubTask'
        self.propertyList=propertyList
    def searchProperty(self,propertyName):
        propertyValue=None
        for taskProperty in self.propertyList:
            if taskProperty.name==propertyName:
                propertyValue=taskProperty.value
                break
        return propertyValue

class MainTask:
    def __init__(self,name):
        self.name=name
        self.value=''
        self.classValue='MainTask'
        self.taskList=[]
        self.propertyList=[]
    def searchProperty(self,propertyName):
        propertyValue=None
        for taskProperty in self.propertyList:
            if taskProperty.name==propertyName:
                propertyValue=taskProperty.value
                break
        return propertyValue
    def addNewSubtask(self,newSubtaskName,newSubtaskProperty):
        newSubtask=SubTask(len(self.taskList),newSubtaskName,newSubtaskProperty)
        self.taskList.append(newSubtask)
        self.updateTaskValue()
    def upSubtask(self,index):
        if index>0:
            self.taskList.insert(index-1,self.taskList.pop(index))
            index=index-1
            self.updateTaskValue()
        return index
    def downSubtask(self,index):
        if index<len(self.taskList)-1:
            self.taskList.insert(index+1,self.taskList.pop(index))
            index=index+1
            self.updateTaskValue()
        return index
    def removeSubtask(self,index):
        self.taskList.pop(index)
        self.updateTaskValue()
    def editSubTask(self,index,newSubtaskName,newSubtaskProperty):
        self.taskList.pop(index)
        newSubtask=SubTask(len(self.taskList),newSubtaskName,newSubtaskProperty)
        self.taskList.insert(index,newSubtask)
        self.updateTaskValue()
    def updateTaskValue(self):
        for i in range(len(self.taskList)):
            self.taskList[i].value=i
    def checkTimeInList(self):
        deletFlag=False
        i=-1
        N=0
        while True:
            N+=1
            if N>9999:
                break
            if i==len(self.taskList)-1 or len(self.taskList)==0:
                break
            for i in range(len(self.taskList)):
                subTask=self.taskList[i]
                timeValue=subTask.searchProperty('time')
                if timeValue is not None:
                    if float(timeValue)==0:
                        self.removeSubtask(i)
                        deletFlag=True
                        break
        return deletFlag
    def clear(self):
        self.taskList=[]
    def display(self):
        self.updateTaskValue()
        displayStr='Task Name: '+self.name+'\n'
        headspace='      '
        for subtask in self.taskList:
            index=subtask.value
            name=subtask.name
            if name=='Cue':
                time=''
                target=''
                for taskproperty in subtask.propertyList:
                    if taskproperty.name=='time':
                        time=taskproperty.value
                    elif taskproperty.name=='target':
                        target=taskproperty.value
                displayStr=displayStr+headspace+'%i. %s at target %s with %s s\n' % (index,name,target,time)    
            elif name=='Flash':
                time=''
                target=''
                method=''
                for taskproperty in subtask.propertyList:
                    if taskproperty.name=='time':
                        time=taskproperty.value
                    elif taskproperty.name=='target':
                        target=taskproperty.value
                    elif taskproperty.name=='method':
                        method=taskproperty.value
                if method=='None':
                    displayStr=displayStr+headspace+'%i. %s at target %s with %s s without classification\n' % (index,name,target,time)
                else:
                    displayStr=displayStr+headspace+'%i. %s at target %s with %s s with %s method\n' % (index,name,target,time,method)
            else:
                time=''
                for taskproperty in subtask.propertyList:
                    if taskproperty.name=='time':
                        time=taskproperty.value
                        break
                displayStr=displayStr+headspace+'%i. %s with %s s\n' % (index,name,time)
        return displayStr
        