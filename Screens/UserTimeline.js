import { StatusBar } from 'expo-status-bar';
import { Component, useEffect } from 'react';
import { Button } from '../Components/Button';
import { View, Text, StyleSheet, Alert, Image, ImageBackground, TextInput, ScrollView } from "react-native";
import Timeline from 'react-native-timeline-flatlist'
import * as Colors from '../Components/Colors'
import { getUser } from '../Components/FunctionCalls';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

export default class Example extends Component {

  constructor(){
    super()
    this.data = [
      {time: '03/24', title: 'Sam Kirk Mural', description: 'Mural complete, thank you everyone for contributing!', imageUrl: "https://firebasestorage.googleapis.com/v0/b/chack24-4a090.appspot.com/o/mural2.png?alt=media&token=fc0a91bd-78dd-4c57-a4e3-5bcc5c45a1f5"},
      {time: '01/24', title: 'Sam Kirk Mural', description: 'Painting begins, volunteers join in. Meet at public square on February 3rd.', imageUrl: "https://firebasestorage.googleapis.com/v0/b/chack24-4a090.appspot.com/o/mural2.png?alt=media&token=fc0a91bd-78dd-4c57-a4e3-5bcc5c45a1f5"},
      {time: '12/23', title: '3rd Street Garden', description: 'Garden finished, thank you for contributing!', imageUrl: "https://firebasestorage.googleapis.com/v0/b/chack24-4a090.appspot.com/o/publicgarden.png?alt=media&token=f0f921f0-c876-42ee-b7be-fbbb9de35840"},
      {time: '10/23', title: '3rd Street Garden', description: 'Initial sketches for the mural unveiled at local community center.', imageUrl: "https://firebasestorage.googleapis.com/v0/b/chack24-4a090.appspot.com/o/mural2.png?alt=media&token=fc0a91bd-78dd-4c57-a4e3-5bcc5c45a1f5"},
      {time: '02/23', title: 'Sam Kirk Mural', description: 'Fundraising goal reached! The project will begin shortly.', imageUrl: "https://firebasestorage.googleapis.com/v0/b/chack24-4a090.appspot.com/o/publicgarden.png?alt=media&token=f0f921f0-c876-42ee-b7be-fbbb9de35840"}
    ]
    this.state = { investedCampaigns: [{amount: 0}] }
    this.state = { name: "first last" }
  }

  componentDidMount() {
    const { route } = this.props;
    const { uid } = route.params;

    getUser(uid).then((user) => {
      console.log("meow")
      this.setState({ name: user.name });
      this.setState({ investedCampaigns: user.investedCampaigns });
    })
    /*
    async function fetchData() {
      console.log(uid)
      user = await getUser(uid)
      console.log(user.name)
      //update the state with the user data
      this.setState({ name: user.name });
      this.setState({ investedCampaigns: user.investedCampaigns });
    }

    fetchData()
    */
  }

  renderDetail(rowData, sectionID, rowID) {
    const img = <Image source={{uri: rowData.imageUrl}} style={styles.image} marginBottom={10}/>

    const body = <View>
                  <Text style={[styles.title]} marginBottom={5}>{rowData.title} </Text>
                  <Text style={[styles.textDescription]} width={120}>{rowData.description}</Text>
                </View>
    return (
      <View style={{flex:1, alignItems:'center'}}>
        {img}
        {body}
      </View>
    )
  }

  render() {
    //'rgb(45,156,219)'
    return (
      <View style={styles.container}>
        <Text style={styles.subHeader}>Hey {this.state.name}, let's</Text>
        <Text style={styles.header}>View Your Impact</Text>

        <ScrollView>

        <View style={{width: '95%', marginLeft: '5%', marginTop: '10%', height: 155}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            
            <View style={{height: 150, width: 150, backgroundColor: Colors.white, borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowColor: Colors.gold, shadowOpacity: 0.6, shadowOffset: {width: 1, height: 3}}}>
              <View style={{flexDirection: 'row', marginLeft: '-10%', alignItems: 'center'}}>
                <FontAwesomeIcon icon={faMedal} size={20} color={Colors.gold}></FontAwesomeIcon>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.primaryDark, marginLeft: '4%'}}>3</Text>
              </View>
              <Text style={{fontSize: 16, fontWeight: '600', color: Colors.secondaryDark, marginTop: '7%'}}>Campaigns</Text>
              <Text style={{fontSize: 16, fontWeight: '600', color: Colors.secondaryDark}}>Backed</Text>
            </View>

            <View style={{marginLeft: 50, height: 150, width: 150, backgroundColor: Colors.white, borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowColor: Colors.broze, shadowOpacity: 0.6, shadowOffset: {width: 1, height: 3}}}>
              <View style={{flexDirection: 'row', marginLeft: '-10%', alignItems: 'center'}}>
                <FontAwesomeIcon icon={faMedal} size={20} color={Colors.broze}></FontAwesomeIcon>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.primaryDark, marginLeft: '4%'}}>$250</Text>
              </View>
              <Text style={{fontSize: 16, fontWeight: '600', color: Colors.secondaryDark, marginTop: '7%'}}>Dollars</Text>
              <Text style={{fontSize: 16, fontWeight: '600', color: Colors.secondaryDark}}>Invested</Text>
            </View>

            <View style={{marginLeft: 50, height: 150, width: 150, backgroundColor: Colors.white, borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowColor: Colors.silver, shadowOpacity: 0.6, shadowOffset: {width: 1, height: 3}}}>
              <View style={{flexDirection: 'row', marginLeft: '-10%', alignItems: 'center'}}>
                <FontAwesomeIcon icon={faMedal} size={20} color={Colors.silver}></FontAwesomeIcon>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.primaryDark, marginLeft: '4%'}}>7</Text>
              </View>
              <Text style={{fontSize: 16, fontWeight: '600', color: Colors.secondaryDark, marginTop: '7%'}}>Created</Text>
              <Text style={{fontSize: 16, fontWeight: '600', color: Colors.secondaryDark}}>Campaigns</Text>
            </View>

            <View style={{marginLeft: 50, height: 150, width: 150, backgroundColor: Colors.white, borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowColor: Colors.gold, shadowOpacity: 0.6, shadowOffset: {width: 1, height: 3}}}>
              <View style={{flexDirection: 'row', marginLeft: '-10%', alignItems: 'center'}}>
                <FontAwesomeIcon icon={faMedal} size={20} color={Colors.gold}></FontAwesomeIcon>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.primaryDark, marginLeft: '4%'}}>$570</Text>
              </View>
              <Text style={{fontSize: 16, fontWeight: '600', color: Colors.secondaryDark, marginTop: '7%'}}>Raised Total</Text>
              <Text style={{fontSize: 16, fontWeight: '600', color: Colors.secondaryDark}}>For Community</Text>
            </View>

          </ScrollView>
        </View>

        <Timeline 
          showsVerticalScrollIndicator={false}
          style={styles.list}
          circleSize={15}
          circleColor={Colors.primary}
          lineColor={Colors.secondary}
          data={this.data}
          timeStyle={{textAlign: 'center', color:Colors.primaryDark, padding:5, borderRadius:13}}
          detailContainerStyle={{marginBottom: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: "#fff", borderRadius: 5}}
          columnFormat='two-column'
          renderDetail={this.renderDetail}
        />
        </ScrollView>
      </View>
    );
  }
}



// export default function UserTimeline( {navigation, route} ) {
//   let data = [
//     {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
//       {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
//       {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
//       {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
//       {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
//   ]
//   return (
//     <View style={styles.container}>
//       <Timeline
//         data = {data}
//       />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 20,
		paddingTop:5,
		backgroundColor:'#F6F6F6'
  },
  descriptionContainer: {
    flexDirection: "column",
  },
  title:{
    fontSize: 14,
    fontWeight: 600,
  },
  list: {
    flex: 1,
    marginTop:70,
  },
  image:{
    width: 130,
    height: 130,
    borderRadius: 5,
  },
  textDescription: {
    color: Colors.secondaryDark,
    fontSize: 11,
  },
  header: {
    fontSize: 27,
    color: Colors.primaryDark,
    marginTop: '2%',
    marginLeft: '5%',
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 20,
    color: Colors.secondaryDark,
    marginTop: '20%',
    marginLeft: '5%',
    fontWeight: '600'
  }
});
