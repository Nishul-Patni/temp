// app/_layout.jsx
import { Stack, router } from 'expo-router';
import { useContext, useEffect } from 'react';
import { AuthProvider, AuthContext } from './Context/AuthProvider'; // Adjust the path as needed
import Loading from './Loading'; // Adjust the path as needed

const LayoutContent = () => {
  const { user, initializing } = useContext(AuthContext);

  useEffect(() => {
    console.log(user, initializing)
    if (!initializing) {
      if (user) {
        router.replace('/');
      } else {
        router.replace('/Login');
      }
    }
  }, [initializing, user]);

  if (initializing) return <Loading />;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="Signup" options={{ headerShown: false }} />
      <Stack.Screen name="AddDetails" options={{ title: 'Details' }} />
      <Stack.Screen name="Profile" options={{ title: 'Profile' }} />
    </Stack>
  );
};

export default function Layout() {
  return (
    <AuthProvider>
      <LayoutContent />
    </AuthProvider>
  );
}
