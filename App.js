// nav imports
import { NavigationContainer, StackActions, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Landing from './Screens/Landing';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import PersonalInfo from './Screens/PersonalInfo';

//navigation stack
const Stack = createNativeStackNavigator();
//navbar
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}