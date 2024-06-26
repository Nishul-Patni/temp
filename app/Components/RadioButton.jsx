// components/RadioButton.js
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const RadioButton = ({ label, value, selected, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(value)} style={styles.container}>
      <View style={styles.radioCircle}>
        {selected === value && <View style={styles.selectedRb} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent : "center",
    marginBottom: 10,
    // borderColor : "red",
    // borderWidth : 10,
    width : "33%",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2c9dd1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2c9dd1',
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default RadioButton;
