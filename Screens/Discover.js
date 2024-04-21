import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from '../Components/Button';
import { useEffect, useState } from 'react';
import { getCampaigns, getUser } from '../Components/FunctionCalls';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faChevronDown, faLocationPin, faMagnifyingGlass, faSliders, faUser, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faStar} from '@fortawesome/free-regular-svg-icons';
import { useIsFocused } from '@react-navigation/native';


import * as Colors from '../Components/Colors'


export default function Discover( {navigation, route} ) {
  const { uid } = route.params

  const [campaigns, setCampaigns] = useState([])
  const [user, setUser] = useState({name: null, email: null, uid: null, campaigns: [], city: "city"})

  const isFocusedDiscover = useIsFocused()

  useEffect(() => {
    if(isFocusedDiscover) {
      async function fetchData() {
        console.log("fetching data..")

        let campaignsRes = await getCampaigns()
        setCampaigns(campaignsRes)
  
        let userRes = await getUser(uid)
        setUser(userRes)
      }
      fetchData()
    }
  }, [isFocusedDiscover])

  return (
    <View style={styles.container}>
      <ScrollView style={{width: '100%', alignSelf: 'center'}}>
      
      <Text style={{marginTop: '18%', marginLeft: '5%', fontSize: 25, fontWeight: 'bold'}}>{user.name}</Text>

      <View style={{flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop: '3%', alignItems: 'center'}}>
        <FontAwesomeIcon icon={faLocationPin} color={Colors.secondaryDark} size={15}></FontAwesomeIcon>
        <Text style={{color: Colors.secondaryDark, marginLeft: '2%', fontSize: 15}}>{user.city}</Text>
        <View style={{marginLeft: '7%'}}></View>
        <FontAwesomeIcon icon={faChevronDown} color={Colors.secondaryDark} size={12}></FontAwesomeIcon>
        <View style={{flex: 1}}></View>
        <TouchableOpacity style={styles.button}onPress={() => navigation.navigate("UserProfile", {uid: user.uid, email: user.email})}>
          <FontAwesomeIcon icon={faUser} color={Colors.secondaryDark} size={20}></FontAwesomeIcon>
        </TouchableOpacity>
        <View style={{marginLeft: '5%'}}></View>
        <FontAwesomeIcon icon={faBell} color={Colors.secondaryDark} size={20}></FontAwesomeIcon>

      </View>

      <View style={{width: '90%', flexDirection: 'row', alignItems: 'center', marginTop: '5%', justifyContent: 'space-between', alignSelf: 'center'}}>
        <View style={{width: '83%', height: 30, backgroundColor: '#fff', borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: '5%', shadowColor: '#000', shadowOpacity: 0.35, shadowOffset: {width: 1, height: 3}}}>
          <FontAwesomeIcon icon={faMagnifyingGlass} color={Colors.secondaryDark} size={15}></FontAwesomeIcon>
        </View>

        <FontAwesomeIcon icon={faSliders} size={20} color={Colors.secondaryDark}></FontAwesomeIcon>
      </View>

        {
          campaigns.map((campaign, index) => {
            return (
              <TouchableOpacity key={index} style={{width: '90%', marginLeft: '5%', height: 375, backgroundColor: Colors.white, borderRadius: 5, marginBottom: 0, marginTop: '5%', paddingHorizontal: '5%', shadowColor: '#000', shadowOpacity: 0.35, shadowOffset: {width: 1, height: 3}}} onPress={() => navigation.navigate("Campaign", {user: user, campaign: campaign})} activeOpacity={0.9}>
                <Image source={{uri: campaign.images[0]}} style={{width: '100%', height: '60%', marginTop: '5%'}}></Image>

                <Text style={{fontSize: 14, color: Colors.secondaryDark, marginTop: '4%'}}>Goal: <Text style={{color: "#000"}}>${(campaign.goal/100).toFixed(2)}</Text></Text>

                <View style={{width: '80%', height: 3, backgroundColor: '#C7C7C7', marginTop: '2%', borderRadius: 5}}>
                  <View style={{width: campaign.raised/campaign.goal*100+"%", height: 3, backgroundColor: Colors.primary}}></View>
                </View>

                <Text style={{fontSize: 17, marginTop: '4%'}}>{campaign.name}</Text>
                <Text style={{fontSize: 14, marginTop: '1%'}}>{campaign.location}</Text>
              
                
                <View style={{flexDirection: 'row', marginTop: '5%', justifyContent: 'space-between', alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesomeIcon icon={faChevronUp} color={Colors.primaryDark} style={{}}></FontAwesomeIcon>
                  <Text style={{marginLeft: '10%', color: Colors.primaryDark}}>{campaign.likes}</Text>
                  </View>

                  <FontAwesomeIcon icon={faStar} color={Colors.primaryDark} style={{}} ></FontAwesomeIcon>
                </View>

              </TouchableOpacity>
            )
          })
        }

        <View style={{marginTop: '20%'}}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
