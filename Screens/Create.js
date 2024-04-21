import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, TextInput, ScrollView } from 'react-native';
import { Button } from '../Components/Button';
import * as Colors from '../Components/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { uploadImage } from "../Components/ImageCloudStorage";
import { faArrowUpFromBracket, faUpload } from '@fortawesome/free-solid-svg-icons';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

export default function Create( {navigation, route} ) {
  const [img, setImg] = useState(null)

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [goal, setGoal] = useState('')
  const [expiry, setExpiry] = useState('')
  
  async function pickImage() {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!res.cancelled) {
      setImg(res.assets[0].uri)
    }
  }

  function renderPfp() {
    if(img) {
      return(
        <TouchableOpacity onPress={() => pickImage()}>
          <Image source={{uri: img}} style={{borderRadius: 5, width: '90%', height: Dimensions.get('screen').height*0.25, alignSelf: 'center', marginTop: '10%'}}></Image>
        </TouchableOpacity>
      )
    }
    else {
      return(
        <TouchableOpacity onPress={() => pickImage()} activeOpacity={0.9} style={{borderRadius: 5, width: '90%', height: '25%', backgroundColor: Colors.gray, alignSelf: 'center', marginTop: '10%', justifyContent: 'center', alignItems: 'center'}}>
          <FontAwesomeIcon icon={faArrowUpFromBracket} size={40} color={Colors.primaryDark}/>
          <Text style={{fontSize: 14, color: Colors.primary, fontWeight: '600', marginTop: '4%'}}>Upload a Photo</Text>
        </TouchableOpacity>
      )
    }
  }


  return (
    <View style={styles.container}>
      <ScrollView style={{width: '100%', alignSelf: 'center'}} showsVerticalScrollIndicator={false}>
      <Text style={{marginTop: '17%', fontSize: 20, color: Colors.primaryDark, fontWeight: '600', alignSelf: 'center'}}>Make a Change</Text>

      {renderPfp()}

      <View style={{width: '80%', marginLeft: '10%', marginTop: '15%'}}>
        <Text style={{fontSize: 15}}>Name</Text>
        <TextInput value={name} onChangeText={text => setName(text)} placeholder="What's your campaign called?" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '12%'}}>
        <Text style={{fontSize: 15}}>Location</Text>
        <TextInput value={location} onChangeText={text => setLocation(text)} placeholder="City, State" placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        <View style={{width: '100%', backgroundColor: Colors.secondaryDark, height: 1, marginTop: 5}}></View>
      </View>

      <View style={{width: '80%', marginLeft: '10%', marginTop: '12%'}}>
        <Text style={{fontSize: 15}}>Description</Text>
        <View style={{width: '100%', paddingHorizontal: 15, paddingVertical: 5, height: 220, borderRadius: 10, backgroundColor: Colors.gray, marginTop: '4%'}}>
          <TextInput multiline value={location} onChangeText={text => setDescription(text)} placeholder="Tell your story..." placeholderTextColor={Colors.secondaryDark} style={{width: '100%', color: Colors.primaryDark, marginTop: '5%', fontSize: 14}}></TextInput>
        </View>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
