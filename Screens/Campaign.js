import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Linking } from 'react-native';
import { Button } from '../Components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import * as Colors from '../Components/Colors';
import { useEffect, useState } from 'react';
import { getCheckoutLink, getUser } from '../Components/FunctionCalls';

export default function Campaign( {navigation, route} ) {
  const { user, campaign } = route.params
  
  const [organizer, setOrganizer] = useState({name: null, occupation: null, livingLength: null, campaigns: [], pfp: "https://firebasestorage.googleapis.com/v0/b/chack24-4a090.appspot.com/o/images%2FpfpPlaceholder-1.png?alt=media&token=b861d442-2e14-4bd4-9572-d2b8c482e7bc"})
  
  const[amount, setAmount] = useState(null)

  useEffect(() => {
    async function fetchData() {
      let res = await getUser(campaign.organizer)
      console.log(res)
      setOrganizer(res)
    }
    fetchData()
  }, [])

  async function contribute() {
    let checkoutRes = await getCheckoutLink(parseInt(amount)*100, campaign.id, user.uid)
    let url = checkoutRes.url

    navigation.goBack()
    Linking.openURL(url)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{width: '100%', alignSelf: 'center'}} showsVerticalScrollIndicator={false}>
        
      <FontAwesomeIcon icon={faChevronLeft} size={20} style={{marginLeft: '5%', marginTop: '15%'}}></FontAwesomeIcon>

      <Text style={{fontSize: 20, fontWeight: '600', alignSelf: 'center', marginTop: '2%'}}>{campaign.name}</Text>

      <View style={{padding: 5, marginTop: '10%', width: '90%', backgroundColor: Colors.white, shadowColor: '#000', shadowOpacity: 0.35, shadowOffset: {width: 1, height: 3}, alignSelf: 'center'}}>
        <Image source={{uri: campaign.images[0]}} style={{width: '100%', height: 250, alignSelf: 'center'}}></Image>
      </View>

      <View style={{width: '90%', height: 5, backgroundColor: '#C7C7C7', marginTop: '7%', borderRadius: 5, marginLeft: '5%'}}>
        <View style={{width: campaign.raised/campaign.goal*100+"%", height: 5, backgroundColor: Colors.primary}}></View>
      </View>

      <View style={{flexDirection: 'row', marginLeft: '5%', width: '90%', marginTop: '2%'}}>
        <Text style={{fontSize: 14, fontWeight: '600'}}>Goal: ${((campaign.goal)/100).toFixed(2)}</Text>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={{fontSize: 14, fontWeight: '600'}}>{Math.round(campaign.raised / campaign.goal * 100)}%</Text>
        </View>
      </View>

      <View>
      </View>

      <View style={{flexDirection: 'row', marginLeft: '5%', justifyContent: 'space-between', width: '90%', alignItems: 'center', marginTop: '10%'}}>
        <View style={{flexDirection: 'column'}}>
        <Text style={{fontSize: 16, fontWeight: '600', color: Colors.primaryDark, alignself: 'left', marginTop: '5%'}}>{organizer.name}</Text>
        <Text style={{fontSize: 14, color: Colors.secondaryDark, alignself: 'left', marginTop: '2%'}}>{organizer.occupation}</Text>
        <Text style={{fontSize: 14, color: Colors.secondaryDark, alignself: 'left', marginTop: '2%'}}>{campaign.location.split(',')[0]} resident for {organizer.livingLength}</Text>
        </View>
        
        <Image source={{uri: organizer.pfp}} style={{height: 70, width: 70, borderRadius: 70}}></Image>
      </View>
      
      <View style={{marginLeft: '5%', width: '90%'}}>
        <Text style={{fontSize: 14, color: Colors.primaryDark, marginTop: '10%'}}>{campaign.description}</Text> 
      </View>

      <View style={{marginLeft: '5%', width: '90%'}}>
        <Text style={{fontSize: 20, fontWeight: '600', color: Colors.primaryDark, marginTop: '12%'}}>Contribution Amount</Text>
        <Text style={{fontSize: 18, fontWeight: '400', color: Colors.secondaryDark, marginTop: '2%'}}>This project still needs ${((campaign.goal-campaign.raised)/100).toFixed(2)}</Text>
      </View>
      
      <View style={{borderBottomWidth: 1, borderBottomColor: Colors.primaryDark, paddingBottom: 2, width: '30%', alignSelf: 'center', marginTop: '10%'}}>
        <TextInput style={{alignSelf: 'center', fontSize: 22, fontWeight: '600'}} value={amount} onChangeText={text => setAmount(text)} placeholder='$0.00' placeholderTextColor={Colors.secondaryDark}></TextInput>
      </View>

      <View style={{alignItems: 'center', marginTop: '15%'}}>
        <Button width={'65%'} marginBottom={'20%'}  height={50} style={{fontSize: 18, fontWeight: '400', color: Colors.white}} title="CONTRIBUTE" onPress={() => contribute()}></Button>
      </View>

      </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
});
