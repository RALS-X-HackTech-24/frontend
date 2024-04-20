import { StatusBar } from 'expo-status-bar';
import * as Colors from '../Components/Colors'

import { View, Text, StyleSheet, Alert, Image, ImageBackground, TextInput, ScrollView } from "react-native";
import { Button } from '../Components/Button';

export default function Landing( {navigation, route} ) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/landing.png')} style={{height:"100%",width:"100%", alignItems:"center"}} >
        <Text style={styles.title}>Test</Text>
        <Text style={styles.subtitle}>Come together.</Text>
        <Button title="Sign Up" width={'65%'} height={50} marginTop={250} onPress={() => navigation.navigate("SignUp")}></Button> 
        <Text marginTop={35} style={{fontSize:20}} onPress={() => navigation.navigate("Login")}> or <Text style={{fontWeight:"bold", color: Colors.primary, fontSize:20}}>login</Text> to your community</Text>
      </ImageBackground>
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
  title: {
    fontSize: 50,
    //bold text
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: '50%',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 600,
    color: Colors.secondary,
    marginTop: 10,
  }
});
