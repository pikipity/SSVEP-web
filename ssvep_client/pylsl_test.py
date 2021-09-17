# -*- coding: utf-8 -*-
import random
import time

from pylsl import StreamInfo, StreamOutlet


info = StreamInfo('MyMarkerStream', 'Markers', 1, 0, 'string', 'myuidw43536')

# next make an outlet
outlet = StreamOutlet(info)

time.sleep(5)

print("now sending markers...")
markernames = ['Test', 'Blah', 'Marker', 'XXX', 'Testtest', 'Test-1-2-3']
N=0
while True:
    # N+=1
    # if N>10:
    #     break
    # pick a sample to send an wait for a bit
    send_text=random.choice(markernames)
    outlet.push_sample([send_text])
    print(send_text)
    time.sleep(1)
outlet.__del__()
info.__del__()
