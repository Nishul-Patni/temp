import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';
import RadioButton from './Components/RadioButton';

const AvatarSelector = () => {
  const [formState, setFormState] = useState({
    name: '',
    selectedAvatar: 0,
    allergy: '',
    allergies: [],
    gender: 'male',
  });

  const handleGenderSelect = (value) => {
    setFormState((prevState) => ({ ...prevState, gender: value }));
  };

  const addAllergy = () => {
    if (formState.allergy.trim()) {
      setFormState((prevState) => ({
        ...prevState,
        allergies: [...prevState.allergies, prevState.allergy],
        allergy: '',
      }));
    }
  };

  const removeAllergy = (index) => {
    setFormState((prevState) => ({
      ...prevState,
      allergies: prevState.allergies.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (name, value) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Import images from the assets folder
  const avatars = [
    require('../assets/avatar1.jpg'),
    require('../assets/avatar2.jpg'),
    require('../assets/avatar3.jpg'),
    require('../assets/avatar4.jpg'),
    require('../assets/avatar5.jpg'),
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What we can call you</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Nickname"
        value={formState.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />

      <Text style={styles.title}>Select Gender</Text>
      <View style={styles.radioContainer}>
        <RadioButton label="Male" value="male" selected={formState.gender} onSelect={handleGenderSelect} />
        <RadioButton label="Female" value="female" selected={formState.gender} onSelect={handleGenderSelect} />
        <RadioButton label="Other" value="other" selected={formState.gender} onSelect={handleGenderSelect} />
      </View>

      <Text style={styles.title}>Choose an Avatar</Text>
      <View style={styles.avatarContainer}>
        {avatars.map((avatar, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.avatar,
              formState.selectedAvatar === index && styles.selectedAvatar,
            ]}
            onPress={() => handleInputChange('selectedAvatar', index)}
          >
            <Image source={avatar} style={styles.avatarImage} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>You can add your Allergies</Text>
      <View style={styles.allergyInputContainer}>
        <TextInput
          style={{ ...styles.input, ...styles.allergyInput }}
          placeholder="Allergy"
          value={formState.allergy}
          onChangeText={(value) => handleInputChange('allergy', value)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addAllergy}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.allergyContainer}>
        {formState.allergies.map((item, index) => (
          <View key={index} style={styles.allergyItem}>
            <Text style={styles.allergyText}>{item}</Text>
            <TouchableOpacity onPress={() => removeAllergy(index)}>
              <Text style={styles.removeButton}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  radioContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  selectedAvatar: {
    borderColor: '#007bff',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  allergyInputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  allergyInput: {
    width: '80%',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '18%',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  allergyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  allergyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  allergyText: {
    fontSize: 16,
    marginRight: 10,
  },
  removeButton: {
    color: '#ff0000',
    fontSize: 20,
  },
});

export default AvatarSelector;
