# -*- coding: utf-8 -*-

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