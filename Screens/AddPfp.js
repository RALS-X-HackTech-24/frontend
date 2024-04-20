//universal imports; use these in every screen...
import { View, Text, StyleSheet, Alert, Image, ImageBackground, TextInput, ScrollView, TouchableOpacity, Switch, Dropdown } from "react-native";
import * as Colors from '../Components/Colors'
import { useState, useEffect } from "react";
import { Button } from "../Components/Button";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import { uploadImage } from "../Components/ImageCloudStorage";
import { createUser } from "../Components/FunctionCalls";


export default function OnboardingInfo({navigation, route}) {
  const { email, uid, dob, name, phone, livingLength, city} = route.params

  const [pfp, setPfp] = useState(null)
  const [bio, setBio] = useState('')
  const [role, setRole] = useState('')


  async function pickImage() {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!res.cancelled) {
      setPfp(res.assets[0].uri)
    }
  }

  function renderPfp() {
    if(pfp) {
      return(
        <TouchableOpacity onPress={() => pickImage()}>
          <Image source={{uri: pfp}} style={{width: 100, height: 100, borderRadius: 50, marginTop: 10}}></Image>
        </TouchableOpacity>
      )
    }
    else {
      return(
        <TouchableOpacity onPress={() => pickImage()}>
          <ImageBackground source={require('../assets/pfpPlaceholder.png')} style={{width: 100, height: 100, borderRadius: 100, marginTop: 10}} imageStyle={{borderRadius: 100}}>
            <FontAwesomeIcon icon={faCamera} size={27} color={Colors.blue} style={{alignSelf: 'flex-end', marginTop: '65%'}}/>
          </ImageBackground>
        </TouchableOpacity>
      )
    }
  }

  async function proceed() {
    let url = ""
    if(pfp != null) {
      url = await uploadImage(pfp, uid)
    } else {
      url = "https://firebasestorage.googleapis.com/v0/b/chack24-4a090.appspot.com/o/images%2FpfpPlaceholder-1.png?alt=media&token=b861d442-2e14-4bd4-9572-d2b8c482e7bc"
    }

    let user = {
      uid: uid,
      name: name,
      phone: phone,
      email: email,
      bio: bio,
      dob: dob,
      livingLength: livingLength,
      pfp: url,
      managedCampaigns: [],
      investedCampaigns: [],
      city: city,
      occupation: role,
    }

    let res = await createUser(user)

    if(res.status == 200) {
      navigation.navigate("Home", {screen: "Home", params: {uid: res.uid}})
    } else {
      Alert.alert("Error", "Something went wrong. Please try again.")
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>What's your story?</Text>

      <View style={{width: '100%', alignItems: 'center', marginTop: '15%'}}>
        {
          renderPfp()
        }
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '7%'}}>
        <TextInput value={bio} onChangeText={text => setBio(text)} placeholder="Insert short bio here" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '7%'}}>
        <TextInput value={role} onChangeText={text => setRole(text)} placeholder="Insert role here" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <Button title="Continue" onPress={() => proceed()} backgroundColor={Colors.primary} width={"80%"} height={60} marginLeft={'10%'} color={"#fff"} marginTop={'18%'}></Button>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: 24,
    color: Colors.primary,
    marginTop: '20%',
    marginLeft: '10%',
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 20,
    color: Colors.secondary,
    marginTop: '5%',
    marginLeft: '10%',
    fontWeight: '600'
  },
  dropdown: {
    marginTop: 100,
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  }
})
