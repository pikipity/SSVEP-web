# -*- coding: utf-8 -*-

from flask import Flask, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from os import urandom
#from uuid import uuid1
import logging
#import eventlet

class client_info:
    def __init__(self,userName,userID,roomID):
        self.userName=userName
        self.userID=userID
        self.roomID=roomID
        self.state=-1
    def getName(self):
        return self.userName
    def getID(self):
        return self.userID
    def getRoom(self):
        return self.roomID
    def getState(self):
        return self.state
    def setState(self,inputState):
        self.state=inputState
    
class client_list:
    def __init__(self):
        self.list=[]
        self.RoomNumList = []
    def addNewClient(self,userName,userID,roomID):
        newClient=client_info(userName,userID,roomID)
        self.addClient(newClient)
    def addClient(self,newClient):
        self.list.append(newClient)
    def removeClient_by_ID(self,existClientID):
        existClientFlag, existClient = clientList.checkClient_by_ID(existClientID)
        roomID=[]
        for i in range(len(existClient)):
            roomID.append(existClient[i].getRoom())
        self.list = list(filter(lambda x: x.getID()!=existClientID,self.list))
        for i in range(len(roomID)):
            existRoom, existRoomClient = clientList.checkClient_by_room(roomID[i])
            if not existRoom:
                self.deletRoom(roomID[i])
    def checkClient_by_ID(self,existClientID):
        clientInList = list(filter(lambda x: x.getID()==existClientID,self.list))
        if len(clientInList)==0:
            return False, clientInList
        else:
            return True, clientInList
    def checkClient_by_room(self,existRoom):
        clientInList = list(filter(lambda x: x.getRoom()==existRoom,self.list))
        if len(clientInList)==0:
            return False, clientInList
        else:
            return True, clientInList
    def createNewRoom(self):
        if(len(self.RoomNumList)==0):
            newRoomNum=0
        else:
            for i in range(max(self.RoomNumList)+2):
                if i not in self.RoomNumList:
                    break
            newRoomNum = i
        self.RoomNumList.append(newRoomNum)
        self.RoomNumList.sort()
        return newRoomNum
    def deletRoom(self,roomNum):
        roomNum=int(roomNum)
        self.RoomNumList = list(filter(lambda x: x!=roomNum,self.RoomNumList))
    def getList(self):
        return self.list

app = Flask(__name__)
app.config['SECRET_KEY'] = urandom(24)
socketio = SocketIO(app)
#eventlet.monkey_patch()
#socketio = SocketIO(app, async_mode='eventlet')#
#eventlet.sleep(1)
#global worker
#https://stackoverflow.com/questions/44371041/python-socketio-and-flask-how-to-stop-a-loop-in-a-background-thread
socketio.init_app(app, cors_allowed_origins="*")

log = logging.getLogger('werkzeug')
log.setLevel(logging.DEBUG)

clientList = client_list()

analysis_name='ssvepanalysis'
stim_name='ssvepstim'

# event for all:
#   Error
#   changeGameState
#   getroommate_res
#   message (list all client)
#   changeGameStateRes (mainly for ssvep analysis, send by ssvep stim)
#   message (disconnection notation, mainly for ssvep analysis)


# event for ssvep analysis:
#   CreateNewSSVEPAnalysis

# event for ssvep stim:
#   CreateNewSSVEPStim
#   ssvepResponse

@app.route('/')
def index():
    return 'Test'

@socketio.on('connect')
def connect_fun():
    print(request.sid+' connect')
    
@socketio.on('disconnect')
def disconnect_fun():
    userID = ''+request.sid
    existClientFlag, existClient = clientList.checkClient_by_ID(userID)
    if existClientFlag:
        for i in range(len(existClient)):
            emit('message',request.sid+' disconnected',to=existClient[i].getRoom())
            print(request.sid+' in room '+existClient[i].getRoom()+' disconnected')
        clientList.removeClient_by_ID(userID)
    else:
        print(request.sid+' disconnected')
    
@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)
    
@socketio.on('addNewSSVEPStim')
def addNewSSVEPStim(Data):
    # Data format: userName or userName,roomID
    Data = Data.split(',')
    if len(Data)==1:
        Data=Data[0]
        userID = ''+request.sid
        userName = stim_name#Data
        # check whether this is a new client
        existClientFlag, existClient = clientList.checkClient_by_ID(userID)
        if not existClientFlag:
            # Create new client
            roomID=str(clientList.createNewRoom())
            clientList.addNewClient(userName,userID,roomID)
            join_room(roomID)
            emit('CreateNewSSVEPStim',userID+','+roomID)
            emit('stim_joinroom',userID,to=roomID)
            print('CreateNewSSVEPStim: '+userID+', room '+roomID)
        else:
            # ignore
            emit('Error', 'Error: Client exist')
            print('Error: Client exist')
    elif len(Data)==2:
        userID = ''+request.sid
        userName = stim_name
        roomID = Data[1]
        existClientFlag, existClient = clientList.checkClient_by_ID(userID)
        existRoom, existRoomClient = clientList.checkClient_by_room(roomID)
        if not existRoom:
            emit('Error','Error: Room does not exist')
            print('Error: Room does not exist')
        else:
            if existClientFlag:
                emit('Error','Error: Client exist')
                print('Error: Client exist')
            else:
                clientList.addNewClient(userName,userID,roomID)
                join_room(roomID)
                emit('CreateNewSSVEPStim',userID+','+roomID)
                emit('stim_joinroom',userID,to=roomID)
                print('CreateNewSSVEPStim: '+userID+', room '+roomID)
    else:
        emit('Error', 'Error: Too much inputs')
        print('Error: Too much inputs')
        

@socketio.on('addNewSSVEPAnalysis')
def addNewSSVEPAnalysis(Data):
    # Data format: userName or userName,roomID
    Data = Data.split(',')
    if len(Data)==1:
        Data=Data[0]
        userID = ''+request.sid
        userName = analysis_name#Data
        existClientFlag, existClient = clientList.checkClient_by_ID(userID)
        if not existClientFlag:
            roomID=str(clientList.createNewRoom())
            clientList.addNewClient(userName,userID,roomID)
            join_room(roomID)
            emit('CreateNewSSVEPAnalysis',userID+','+roomID)
            emit('analysis_joinroom',userID,to=roomID)
            print('CreateNewSSVEPAnalysis: '+userID+', room '+roomID)
        else:
            emit('Error', 'Error: Client exist')
            print('Error: Client exist')
    elif len(Data)==2:
        userID = ''+request.sid
        userName = analysis_name#Data[0]
        roomID = Data[1]
        # check whether this is a new client
        existClientFlag, existClient = clientList.checkClient_by_ID(userID)
        # check whether room exists
        existRoom, existRoomClient = clientList.checkClient_by_room(roomID)
        if not existRoom:
            emit('Error','Error: Room does not exist')
            print('Error: Room does not exist')
        else:
            if existClientFlag:
                emit('Error','Error: Client exist')
                print('Error: Client exist')
            else:
                clientList.addNewClient(userName,userID,roomID)
                join_room(roomID)
                emit('CreateNewSSVEPAnalysis',userID+','+roomID)
                emit('analysis_joinroom',userID,to=roomID)
                print('CreateNewSSVEPAnalysis: '+userID+', room '+roomID)
    else:
        emit('Error', 'Error: Too much inputs')
        print('Error: Too much inputs')
            
@socketio.on('SSVEPResponse')
def receiveSSVEPResponse(Data):
    # Data format: response
    # check room id
    userID = ''+request.sid
    existClientFlag, existClient = clientList.checkClient_by_ID(userID)
    if not existClientFlag:
        emit('Error','Error: Client doest not exist')
        print('Error: Client doest not exist')
    elif len(existClient)>1:
        emit('Error','Error: Too many same client')
        print('Error: Too many same client')
    else:
        existClient = existClient[0]
        roomID = existClient.getRoom()
        emit('ssvepResponse',Data,to=roomID)
        print(userID+' in Room '+roomID+' ssvep response to '+Data)
        
@socketio.on('changeGameState')
def changeGameState(Data):
    # Data format: gamestate
    userID = ''+request.sid
    existClientFlag, existClient = clientList.checkClient_by_ID(userID)
    if not existClientFlag:
        emit('Error','Error: Client doest not exist')
        print('Error: Client doest not exist')
    elif len(existClient)>1:
        emit('Error','Error: Too many same client')
        print('Error: Too many same client')
    else:
        existClient = existClient[0]
        roomID = existClient.getRoom()
        emit('changeGameState',Data,to=roomID)
        print(userID+' in Room '+roomID+' change state to '+Data)
        
@socketio.on('changeGameStateRes')
def changeGameStateRes(Data):
    # Data format: gamestate
    userID = ''+request.sid
    existClientFlag, existClient = clientList.checkClient_by_ID(userID)
    if not existClientFlag:
        emit('Error','Error: Client doest not exist')
        print('Error: Client doest not exist')
    elif len(existClient)>1:
        emit('Error','Error: Too many same client')
        print('Error: Too many same client')
    else:
        existClient = existClient[0]
        roomID = existClient.getRoom()
        for i in range(len(clientList.list)):
            if clientList.list[i].getID()==userID:
                clientList.list[i].setState(int(Data))
                break
        emit('changeGameStateRes',Data,to=roomID)
        print(userID+' in Room '+roomID+' change state to '+Data+' OK!!')
        
@socketio.on('listallclient')
def listAllClient(Data):
    FullList = clientList.getList()
    for i in range(len(FullList)):
        emit('message',str(i)+': '+FullList[i].getName()+', '+FullList[i].getID()+', room '+FullList[i].getRoom())
        print(str(i)+': '+FullList[i].getName()+', '+FullList[i].getID()+', room '+FullList[i].getRoom())
        
@socketio.on('getroommate')
def getRoomMate(Data):
    roommateList=[]
    userID = ''+request.sid
    existClientFlag, existClient = clientList.checkClient_by_ID(userID)
    if not existClientFlag:
        emit('Error','Error: Client doest not exist')
        print('Error: Client doest not exist')
    elif len(existClient)>1:
        emit('Error','Error: Too many same client')
        print('Error: Too many same client')
    else:
        existClient = existClient[0]
        username=existClient.getName()
        roomID = existClient.getRoom()
        existRoom, existRoomClient = clientList.checkClient_by_room(roomID)
        if not existRoom:
            emit('Error','Error: Room does not exist')
            print('Error: Room does not exist')
        else:
            if username==analysis_name:
                for i in range(len(existRoomClient)):
                    if existRoomClient[i].getName()==stim_name:
                        roommateList.append(existRoomClient[i].getID())
                emit('getroommate_res','roommate: '+','.join(roommateList))
                print(userID+' '+analysis_name+' roommate: '+','.join(roommateList))
            elif username==stim_name:
                for i in range(len(existRoomClient)):
                    if existRoomClient[i].getName()==analysis_name:
                        roommateList.append(existRoomClient[i].getID())
                emit('getroommate_res','roommate: '+','.join(roommateList))
                print(userID+' '+stim_name+' roommate: '+','.join(roommateList))
                
@socketio.on('AskSynchronization')
def askSynchronization(Data):
    userID = ''+request.sid
    existClientFlag, existClient = clientList.checkClient_by_ID(userID)
    if not existClientFlag:
        emit('Error','Error: Client doest not exist')
        print('Error: Client doest not exist')
    elif len(existClient)>1:
        emit('Error','Error: Too many same client')
        print('Error: Too many same client')
    else:
        existClient = existClient[0]
        roomID = existClient.getRoom()
        existRoom, existRoomClient = clientList.checkClient_by_room(roomID)
        if not existRoom:
            emit('Error','Error: Room does not exist')
            print('Error: Room does not exist')
        else:
            for i in range(len(existRoomClient)):
                if not existRoomClient[i].getID()==userID:        
                    existRoomClient=existRoomClient[i]
                    roommate_state=existRoomClient.getState()
                    emit('synchronizationRes',str(roommate_state))
                    print(userID+' roommate state: '+str(roommate_state))
                    break
                
@socketio.on('changeTrial')
def changeTrial(Data):
    userID = ''+request.sid
    existClientFlag, existClient = clientList.checkClient_by_ID(userID)
    if not existClientFlag:
        emit('Error','Error: Client doest not exist')
        print('Error: Client doest not exist')
    elif len(existClient)>1:
        emit('Error','Error: Too many same client')
        print('Error: Too many same client')
    else:
        existClient = existClient[0]
        roomID = existClient.getRoom()
        emit('changeTrial',Data,to=roomID)
        print(userID+' in Room '+roomID+' change trial to '+Data)
        
@socketio.on('leaveRoom')
def leaveRoom(Data):
    userID = ''+request.sid
    existClientFlag, existClient = clientList.checkClient_by_ID(userID)
    if not existClientFlag:
        emit('Error','Error: Client doest not exist')
        print('Error: Client doest not exist')
    elif len(existClient)>1:
        emit('Error','Error: Too many same client')
        print('Error: Too many same client')
    else:
        existClient = existClient[0]
        roomID = existClient.getRoom()
        existRoom, existRoomClient = clientList.checkClient_by_room(roomID)
        if not existRoom:
            emit('Error','Error: Room does not exist')
            print('Error: Room does not exist')
        else:
            emit('leaveRoom',userID+' leaves room '+roomID,to=roomID)
            print(userID+' leaves room '+roomID)
            leave_room(roomID)
            clientList.removeClient_by_ID(userID)

if __name__ == '__main__':
    socketio.run(app,host='127.0.0.1',port=5001)
