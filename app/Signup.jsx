import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AUTH } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserDocument } from './Services/UserService';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 6;
    const isConfirmPasswordValid = confirmPassword === password;

    setIsValid(isEmailValid && isPasswordValid && isConfirmPasswordValid);
  }, [email, password, confirmPassword]);

  const handleSignup = async () => {
    setError(''); // Reset error state
    setLoading(true); // Set loading to true before making the request
    try {
      const response = await createUserWithEmailAndPassword(AUTH, email, password);
      console.log("This data is from signup \n\n")
      // createUserDocument(response.user)
      // Navigate to the login page or home page after successful signup

      router.replace("/AddDetails");
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('./assets/logo.png')} style={styles.logo} /> */}
      <Text h3 style={styles.header}>Create Account</Text>
      <Input
        placeholder="Email"
        leftIcon={<Icon name="envelope" style={{ marginRight: 10 }} size={24} color="black" />}
        value={email}
        onChangeText={setEmail}
        containerStyle={styles.inputContainer}
        errorMessage={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email ? "Invalid email address" : ""}
      />
      <Input
        placeholder="Password"
        leftIcon={<Icon name="lock" style={{ marginRight: 10 }} size={24} color="black" />}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.inputContainer}
        errorMessage={password.length < 6 && password ? "Password must be at least 6 characters" : ""}
      />
      <Input
        placeholder="Confirm Password"
        leftIcon={<Icon name="lock" style={{ marginRight: 10 }} size={24} color="black" />}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        containerStyle={styles.inputContainer}
        errorMessage={confirmPassword !== password && confirmPassword ? "Passwords do not match" : ""}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button
        disabled={!isValid || loading}
        title={loading ? "Loading..." : "Sign Up"}
        buttonStyle={styles.button}
        onPress={handleSignup}
        loading={loading} // Show loading indicator
      />
      <View style={styles.footer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.replace("/Login")}>
          <Text style={styles.link}> Login</Text>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  header: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28a745',
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

export default Signup;
