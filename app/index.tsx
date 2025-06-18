import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignInScreen() {
  const router = useRouter();

  const handleLogin = async () => {
    // TODO: Appwrite login logic here
    const isAuthenticated = true;

    if (isAuthenticated) {
      router.replace('/tabs'); 
    }
  };

  return (
    <View>
      <Text>Sign In</Text>
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}
