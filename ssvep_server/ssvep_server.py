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
    def getName(self):
        return self.userName
    def getID(self):
        return self.userID
    def getRoom(self):
        return self.roomID
    
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

@app.route('/')
def index():
    return 'Test'

@socketio.on('connect')
def connect_fun():
    print(request.sid+' Connect')
    
@socketio.on('disconnect')
def disconnect_fun():
    userID = ''+request.sid
    existClientFlag, existClient = clientList.checkClient_by_ID(userID)
    if existClientFlag:
        clientList.removeClient_by_ID(userID)
    print(request.sid+'disconnected')
    
@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)
    
@socketio.on('addNewSSVEPStim')
def addNewSSVEPStim(Data):
    # Data format: userName
    userID = ''+request.sid
    userName = Data
    # check whether this is a new client
    existClientFlag, existClient = clientList.checkClient_by_ID(userID)
    if not existClientFlag:
        # Create new client
        roomID=str(clientList.createNewRoom())
        clientList.addNewClient(userName,userID,roomID)
        join_room(roomID)
        emit('CreateNewSSVEPStim',userID+','+roomID)
        print('CreateNewSSVEPStim: '+userID+','+roomID)
    else:
        # ignore
        emit('Error', 'Error: Client exist')
        print('Error: Client exist')
        

@socketio.on('addNewSSVEPAnalysis')
def addNewSSVEPAnalysis(Data):
    # Data format: userName,roomID
    userID = ''+request.sid
    Data = Data.split(',')
    userName = Data[0]
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
            print('CreateNewSSVEPAnalysis: '+userID+','+roomID)
            
@socketio.on('SSVEPResponse')
def receiveSSVEPResponse(Data):
    # Data format: response
    # check room id
    userID = ''+request.sid
    existClientFlag, existClient = clientList.checkClient_by_ID(userID)
    if not existClientFlag:
        emit('Error','Error: Client doest not exist')
    elif len(existClient)>1:
        emit('Error','Error: Too many same client')
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
    elif len(existClient)>1:
        emit('Error','Error: Too many same client')
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
    elif len(existClient)>1:
        emit('Error','Error: Too many same client')
    else:
        existClient = existClient[0]
        roomID = existClient.getRoom()
        emit('changeGameStateRes',Data,to=roomID)
        print(userID+' in Room '+roomID+' change state to '+Data+' OK!!')
        
@socketio.on('listallclient')
def listAllClient(Data):
    FullList = clientList.getList()
    for i in range(len(FullList)):
        emit('message',str(i)+': '+FullList[i].getName()+', '+FullList[i].getID()+', '+FullList[i].getRoom())
    
    

if __name__ == '__main__':
    socketio.run(app,host='127.0.0.1',port=5001)
