import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import LoginScreen from '../component/LoginScreen';
import RegistrationScreen from '../component/RegistrationScreen';



import { useDispatch} from 'react-redux';
import { authStateChangeUser } from '../redux/auth/authOperations';
import { useAuth } from '../redux/auth/authSelectors';
import Home from '../component/Home/Home';



const Stack = createNativeStackNavigator();

const Main = () => {

    const { userId } = useAuth();
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(authStateChangeUser());
    }, []);


  if(!userId){
    return (   
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
        <Stack.Screen   name="Login" options={{headerShown: false,}} component={LoginScreen}/>
        <Stack.Screen   name="Registration" options={{headerShown: false,}} component={RegistrationScreen}/>
        
            </Stack.Navigator>
      </NavigationContainer>
    )
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator >
           <Stack.Screen   name="Home" options={{headerShown: false,}} component={Home}/>
       </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default Main