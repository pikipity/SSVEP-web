# -*- coding: utf-8 -*-

from flask import Flask, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from os import urandom
from uuid import uuid1

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
    def addNewClient(self,userName,userID,roomID):
        newClient=client_info(userName,userID,roomID)
        self.addClient(newClient)
    def addClient(self,newClient):
        self.list.append(newClient)
    def removeClient_by_ID(self,existClientID):
        self.list = list(filter(lambda x: x.getID()!=existClientID,self.list))
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

app = Flask(__name__)
app.config['SECRET_KEY'] = urandom(24)
socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

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
        roomID=str(uuid1())
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
            emit('CreateNewSSVEPStim',userID+','+roomID)
            print('CreateNewSSVEPStim: '+userID+','+roomID)
            
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
    

if __name__ == '__main__':
    socketio.run(app)