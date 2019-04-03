# -*- coding: utf-8 -*-
"""



"""

# Importing the Keras libraries and packages
from keras.models import Sequential
from keras.layers import Convolution2D
from keras.layers import MaxPooling2D
from keras.layers import Flatten
from keras.layers import Dense #to add fully connected layer to ANN

# Initialising the CNN
classifier = Sequential() #object of class sequential.


# Step 1 - Convolution
classifier.add(Convolution2D(32, (3, 3), input_shape = (64, 64, 3), activation = 'relu'))
classifier.add(MaxPooling2D(pool_size = (4, 4)))#(32-no of filters/feature map, no of rows & col of feature detector matrix,I_shape=3-no of channel
#colour image, 64*64 format for image converstion, )

# Step 2 - Pooling

# to reduce no. of nodes in ffrom keras.models import Sequentiallattening, 2,2 to size the mat that slides over.
# Adding a second convolutional layer
#classifier.add(Convolution2D(32, 3, 3, activation = 'relu'))
#classifier.add(MaxPooling2D(pool_size = (2, 2)))
#classifier.add(Convolution2D(32, (3, 3), activation = 'relu'))
classifier.add(Convolution2D(64, (3, 3),activation = 'relu'))
classifier.add(MaxPooling2D(pool_size = (2, 2)))




# Step 3 - Flattening
classifier.add(Flatten())

classifier.add(Dense(activation = "relu", units=128))  #rectifier A FN for input/hidden layer.
#classifier.add(Dense(activation = "relu", units=192))
#classifier.add(Dense(activation = "relu", units=128))   #rectifier A FN for input/hidden layer.
#classifier.add(Dense(activation = "relu", units=128))
#classifier.add(Dense(activation = "relu", units=128))
#classifier.add(Dense(activation = "relu", units=128))  #rectifier A FN for input/hidden layer.
#classifier.add(Dense(activation = "relu", units=192))   #rectifier A FN for input/hidden layer.
#classifier.add(Dense(activation = "relu", units=256))   #rectifier A FN for input/hidden layer.
#classifier.add(Dense(activation = "relu", units=64))
#classifier.add(Dense(activation = "relu", units=128))
#classifier.add(Dense(activation = "relu", units=128))  #rectifier A FN for input/hidden layer.

classifier.add(Dense(activation = "softmax", units=5)) #softmax for more than 1 output category

#compiling CNN
classifier.compile(optimizer = 'adam', loss = 'categorical_crossentropy', metrics = ['accuracy'] )
#"adam" stochastic gradient descent algorithm

#image preprocessing step

from keras.preprocessing.image import ImageDataGenerator

train_datagen = ImageDataGenerator(
        rescale=1./255,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True)

test_datagen = ImageDataGenerator(rescale=1./255)

training_set = train_datagen.flow_from_directory(
        'dataset/training_set',
        target_size=(64, 64),
        batch_size=32,
        class_mode='categorical')

test_set = test_datagen.flow_from_directory(
        'dataset/test_set',
        target_size=(64, 64),
        batch_size=32,
        class_mode='categorical')
#batch size & number of epocs modified from 32 to 300 and 50 to 25
classifier.fit_generator(
        training_set,
        steps_per_epoch=62,
        epochs=25,
        validation_data=test_set,
        validation_steps=30)
classifier.save("tarp.h5")




