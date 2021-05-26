/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//  import 'react-native-gesture-handler';

 import * as React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import AsyncStorage from '@react-native-async-storage/async-storage';

import MainScreen from './screens/MainScreen';
import MapScreen from './screens/MapScreen';
import RootStackScreen from './screens/RootStackScreen';


import { AuthContext } from './components/context';
import { 
  ActivityIndicator, View ,StyleSheet,
} from 'react-native';

const Stack = createStackNavigator();

const App = () => {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };


  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async() => {
      const userToken = "1";
      
      try {
         await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
     
      dispatch({ type: 'LOGIN', id: null, token: userToken });
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken');
       
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {

    }
  }), []);

  React.useLayoutEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

 
  if(loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
        { loginState.userToken !== null ? (
        <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />   
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
  )
     :
    <RootStackScreen/>
  }
    </NavigationContainer>
     </AuthContext.Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
