import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { Button } from '../Components/Button';
import { View, Text, StyleSheet, Alert, Image, ImageBackground, TextInput, ScrollView } from "react-native";
import Timeline from 'react-native-timeline-flatlist'
import * as Colors from '../Components/Colors'

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
    marginTop:100,
  },
  image:{
    width: 130,
    height: 130,
    borderRadius: 5,
  },
  textDescription: {
    color: Colors.secondaryDark,
    fontSize: 11,
  }
});
