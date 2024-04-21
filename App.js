// nav imports
import { NavigationContainer, StackActions, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Landing from './Screens/Landing';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import PersonalInfo from './Screens/PersonalInfo';
import AddPfp from './Screens/AddPfp';
import UserTimeline from './Screens/UserTimeline'

import Discover from './Screens/Discover';
import Timeline from './Screens/Timeline';
import Create from './Screens/Create';

import Campaign from './Screens/Campaign';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCompass, faMessage, faTimeline, faComments, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import * as Colors from './Components/Colors';
import { View } from 'react-native';

//navigation stack
const Stack = createNativeStackNavigator();
//navbar
const Tab = createBottomTabNavigator();

function NavBar() {
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Discover') {
            iconName = faCompass;
          } else if (route.name === 'Create') {
            iconName = faPlusCircle;
          } else if (route.name === 'Timeline') {
            iconName = faTimeline;
          }
          return(
            <View>
              <FontAwesomeIcon style={{alignSelf: 'center'}} icon={iconName} color={focused ? Colors.primary : Colors.secondaryDark} size={30}></FontAwesomeIcon>
              {
                focused
                ?
                <View style={{marginTop: '5%', width: 40, backgroundColor: Colors.primary, height: 3}}/>
                :
                <View style={{marginTop: '5%', height: 3}}/>
              }
            </View>
          )
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 10,
        }
      })}
    >
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Create" component={Create} />
      <Tab.Screen name="Timeline" component={Timeline} />
    </Tab.Navigator>
  
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
        <Stack.Screen name="AddPfp" component={AddPfp} />
        <Stack.Screen name="Navbar" component={NavBar} />
        <Stack.Screen name="Campaign" component={Campaign} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}