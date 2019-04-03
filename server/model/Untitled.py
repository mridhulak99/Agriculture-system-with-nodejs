
# coding: utf-8

# In[2]:


from keras.models import load_model
import cv2
import numpy as np

from flask import Flask
import pickle
app = Flask(__name__)
import time
from flask import request
import base64
from PIL import Image
import io

model = load_model('tarp.h5')

model.compile(loss='binary_crossentropy',
              optimizer='rmsprop',
              metrics=['accuracy'])

img = cv2.imread('t1.jpg')
img = cv2.resize(img,(64,64))
img = np.reshape(img,[1,64,64,3])
classes = model.predict_classes(img)
if classes==4:
    print('This image is of class red ')
elif classes==0:
    print('This image is of class m ')
elif classes==1:
    print('This image is of class s ')
elif classes==2:
    print('This image is of class p ')
elif classes==3:
    print('This image is of class t ')




@app.route("/", methods=["GET",'POST'])
def index():
    print(request)
    #return "asd"
    name = request.get_json()['name']
    #image = name['name']
    #print(str(name)+"\n\n\n\n")
    imgdata = base64.b64decode(name)
    filename = 'some_image.jpg'
    with open(filename, 'wb') as f:
        f.write(imgdata)
    #result = face.detect_face(filename)
    img = cv2.imread(filename)
    img = cv2.resize(img,(64,64))
    img = np.reshape(img,[1,64,64,3])

    classes = model.predict_classes(img)
    if classes==4:
        print('This image is of class red ')
    elif classes==0:
        print('This image is of class m ')
    elif classes==1:
        print('This image is of class s ')
    elif classes==2:
        print('This image is of class p ')
    elif classes==3:
         print('This image is of class t ')
    print(str(classes))
    return str(classes)
app.run(host='0.0.0.0',port=5003,threaded=True)


    
#print (classes)

