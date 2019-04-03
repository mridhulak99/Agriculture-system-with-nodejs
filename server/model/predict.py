from keras.models import load_model
import cv2
import numpy as np

model = load_model('tarp.h5')

model.compile(loss='binary_crossentropy',
              optimizer='rmsprop',
              metrics=['accuracy'])

img = cv2.imread('t3.jpg')
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
    
print (classes)
