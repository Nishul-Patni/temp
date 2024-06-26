import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AUTH } from "../firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = async () => {
    setError('');
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      setLoading(true); // Set loading to true before making the request
      try {
        const response = await signInWithEmailAndPassword(AUTH, email, password);
        console.log(response);
        // Navigate to the home screen after successful login
        router.replace("/");
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after the request is completed
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.header}>Welcome Back!</Text>
      <Input
        placeholder="Email"
        leftIcon={<Icon name="envelope" style={{ marginRight: 10 }} size={24} color="black" />}
        value={email}
        onChangeText={setEmail}
        errorMessage={emailError}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Password"
        leftIcon={<Icon name="lock" style={{ marginRight: 10 }} size={24} color="black" />}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        errorMessage={passwordError}
        containerStyle={styles.inputContainer}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button
        title={loading ? "Loading..." : "Login"}
        buttonStyle={styles.button}
        onPress={validate}
        disabled={loading}
        loading={loading} // Show loading indicator
      />
      <View style={styles.footer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.replace("/Signup")}>
          <Text style={styles.link}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    width: 200,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  link: {
    color: '#007bff',
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default Login;
