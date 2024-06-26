// Analyzer.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CircularIconButton from './CircularIconButton';

const Analyzer = () => {
  const [imageUri, setImageUri] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleImagePicker = async (useLibrary) => {

    const options= {
        mediaTypes:
        ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.75,
    };

    if(useLibrary) {
        result = await ImagePicker.launchImageLibraryAsync(options); 
    } else {
        await ImagePicker.requestCameraPermissionsAsync(); 
        result = await ImagePicker.launchCameraAsync(options);
    }
    if (!result.canceled) {
        // console.log(result.assets[0].uri);
        setImageUri(result.assets[0].uri)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Extract Ingredients</Text>
      <View style={styles.buttonContainer}>
        <Button title="Pick Image from Gallery" onPress={()=>handleImagePicker(true)} />
        <Button title="Capture Image" onPress={()=>handleImagePicker(false)} />
      </View>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {imageUri.length!=0?
        <>
          <CircularIconButton icon="cross" color="#ff6347" onPress={() => setImageUri("")} />
          <CircularIconButton icon="tick" color="#24A0ED" />  
        </>
      :''}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  }
});

export default Analyzer;
