# -*- coding: utf-8 -*-

import socketio
import time

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

sio = socketio.Client()

state_clock=clockClass()

connect_flag=False
server_path='http://127.0.0.1:5001/'

roomStr=''
idStr=''
currentGameState = -1
nextGameState = 0

roommateList=[]

@sio.on('connect')
def connect_fun():
    print('Connect')
    
@sio.on('disconnect')
def disconnect_fun():
    global connect_flag, roomStr, idStr
    connect_flag=False
    roomStr=''
    idStr=''
    print('Disconnect')
    
@sio.on('message')
def handle_message(data):
    global roommateList
    print('received message: '+data)
    disconnect_key=' disconnected'
    if data.find(disconnect_key)>=0:
        disconnect_id=data[:data.find(disconnect_key)]
        if disconnect_id in roommateList:
            roommateList.remove(disconnect_id)
        if len(roommateList)==0:
            sio.disconnect()
            
@sio.on('stim_joinroom')
def handle_stim_joinroom(data):
    global roommateList
    print(data+' joint room')
    roommateList.append(data)
    
@sio.on('Error')
def handle_error(data):
    print('Error: '+data)
    sio.disconnect()
    
@sio.on('changeGameStateRes')
def handle_changeGameStateRes(data):
    global nextGameState
    nextGameState=int(data)
    print('change state to '+data+' OK!!')
    
@sio.on('getroommate_res')
def handle_getroommate_res(data):
    print(data)
    roomate_key='roommate: '
    if data.find(roomate_key)>=0:
        roomateStr=data[data.find(roomate_key)+len(roomate_key):]
        roomateStr=roomateStr.split(',')
        for i in range(len(roomateStr)):
            roommateList.append(roomateStr[i])
      
@sio.on('CreateNewSSVEPAnalysis')
def handle_createSuccess(data):
    global connect_flag, roomStr, idStr
    datasplit=data.split(',')
    idStr=datasplit[0]
    roomStr=datasplit[1]
    connect_flag=True
    print('CreateNewSSVEPAnalysis: '+data)
    
def main_task():
    global connect_flag, roomStr, idStr, sio, currentGameState, nextGameState
    sio.emit('addNewSSVEPAnalysis','ssvepanalysis,0')
    sio.sleep(1)
    sio.emit('getroommate','')
    sio.sleep(1)
    sio.emit('changeGameState','101') # synchronize?
    while 1:
        if nextGameState!=currentGameState:
            currentGameState=nextGameState
            if currentGameState==0:
                print('Start Scene')
            elif currentGameState==1:
                print('Cue')
                state_clock.startClock(1, 2)
                # sio.sleep(1)
                # sio.emit('changeGameState','2')
            elif currentGameState==2:
                print('Flash')
                state_clock.startClock(6, 3)
                # sio.sleep(6)
                # sio.emit('changeGameState','3')
            elif currentGameState==3:
                print('Rest')
                state_clock.startClock(1, 4)
                # sio.sleep(1)
                # sio.emit('changeGameState','4')
            elif currentGameState==4:
                print('End')
            elif currentGameState==5:
                print('Wait for stim enter room')
            elif currentGameState==100:
                pass #ask to 100?
            elif currentGameState==101:
                state_clock.startClock(1, 102)
                #sio.emit('changeGameState','102')
            elif currentGameState==102:
                state_clock.startClock(3, 1)
                # sio.sleep(3)
                # sio.emit('changeGameState','1')
            elif currentGameState==103:
                state_clock.startClock(3, 1)
                # sio.sleep(3)
                # sio.emit('changeGameState','1')
            elif currentGameState==104:
                pass
            else:
                print('Error state')
                sio.disconnect()
        else:
            if not connect_flag:
                break
            else:
                clock_ouput, clock_output_time=state_clock.runClock()
                if clock_ouput>=0:
                    print('Time: '+str(clock_output_time)+' s')
                    sio.emit('changeGameState',str(clock_ouput))
                    #nextGameState=clock_ouput
    print('Finish')

sio.connect(server_path)            
task=sio.start_background_task(main_task)
    
    
