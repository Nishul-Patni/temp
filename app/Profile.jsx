import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { AUTH } from '../firebaseConfig'; // Adjust the path as needed
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';

const Profile = () => {
  const handleLogout = () => {
    signOut(AUTH).then(() => {
      router.dismissAll();
      router.replace("/Login", { reset: true });
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
