// IconButton.js

import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CircularIconButton = ({ icon, color }) => {
    useEffect(() => {
        console.log(color)
        styles.button.backgroundColor = color;
    })
    

  const iconName = icon === 'cross' ? 'times' : 'check';
  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={24} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};
const styles= StyleSheet.create({
    button: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default CircularIconButton;
