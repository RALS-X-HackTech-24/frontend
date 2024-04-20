import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../Components/Button';

export default function Landing( {navigation, route} ) {
  return (
    <View style={styles.container}>
      <Text>Landing Page</Text>
      <Button title="Sign Up" width={'65%'} height={50} marginTop={150} onPress={() => navigation.navigate("SignUp")}></Button>
      <Button title="Login" width={'65%'} height={50} marginTop={30} onPress={() => navigation.navigate("Login")}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
