import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImagePicker = ({onCaptureImage, defImage, style = {}}) => {

  const [image,setImage] = useState(defImage);

  const imageOptions = {
    mediaType: 'photo',
    maxWidth: 600,
    maxHeight: 600,
    quality: 0.6
  }

  const openCamera = async () => {
    await launchCamera(imageOptions, (data)=>{
      if (data && data.assets) {
        setImage(data.assets[0].uri);
        if (onCaptureImage) {
          onCaptureImage(data.assets[0]);
        }
      } else {
        if (onCaptureImage) {
          onCaptureImage(null);
        }
      }
    });
  }

  const openGallery = async () => {
    await launchImageLibrary(imageOptions, (data)=>{
      if (data && data.assets) {
        setImage(data.assets[0].uri);
        if (onCaptureImage) {
          onCaptureImage(data.assets[0]);
        }
      } else {
        if (onCaptureImage) {
          onCaptureImage(null);
        }
      }
    });
  }

  const removeImage = () => {
    setImage(null);
    if (onCaptureImage) {
      onCaptureImage(null);
    }
  }

  return (
    <View style={{height: 250}}>
      {
        image ?

          <Image
            style={[styles.fileInput,style]}
            source={{uri: image}}/>
          :
          <View style={[styles.fileInput,{borderStyle: 'dashed'},style]}>
            <TouchableOpacity
              style={styles.border}
              onPress={openCamera}>
              <Text style={styles.browseText}>Open Camera</Text>
            </TouchableOpacity>

            <View style={{height: 5}}></View>

            <TouchableOpacity
              style={styles.border}
              onPress={openGallery}>
              <Text style={styles.browseText}>Open Gallery</Text>
            </TouchableOpacity>

          </View>
      }

      {
        image ?
          <TouchableOpacity
            onPress={removeImage}
            style={styles.removeButton}>
            <Text style={styles.removeText}>REMOVE</Text>
          </TouchableOpacity>
          : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  fileInput: {
    borderRadius: 200,
    borderWidth: 1,
    height: 150,
    width: 150,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  browseText: {
    color: 'black',
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: '3%',
    width: 110,
    textAlign: 'center'
  },
  removeText: {
    color: 'white',
    padding: '3%',
    textAlign: 'center'
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    marginTop: '5%',
    justifyContent: 'center'
  },
  border: {
    borderColor: 'darkblue',
    borderWidth: 1,
    borderRadius: 5
  }
})

export default ImagePicker;
