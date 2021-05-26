import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, TouchableOpacity, StatusBar } from 'react-native';
import { LocalDB } from '../database/schema';
import { AuthContext } from '../components/context';

const LoginScreen = ({navigation}) => {

  const { signIn } = React.useContext(AuthContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginHandle = async () => {  
      try{
        if (!username) {
          alert('Please fill Email');
          return;
        }
        if (!password) {
          alert('Please fill Password');
          return;
        }
        // signIn();
        LocalDB.transaction((tx) => {
          tx.executeSql(
              "SELECT * FROM Users WHERE  username = ? AND password = ?",
              [username, password],
              (tx, results) => {
                  var len = results.rows.length;
                  if (len > 0) {
                    signIn();
                  }
                  else{
                    alert("User Not found! Please check username and password");
                  }
              }
          )
      })
  }
    catch(e){
      console.log(e);
    }
  }

    return (
      <View style={styles.container}>
      <StatusBar 
        backgroundColor="#9e2dd6"
        barStyle="light-content"
      />
      <Text style={styles.welcome}>Welcome to LocateMe</Text>
      <Text style={styles.logintext}>Login to continue!</Text>
      <TextInput 
          placeholder="Username" 
          value={username}
          style={styles.input}
          autoCapitalize = 'none'
          onChangeText={setUsername}

      />
      <TextInput 
          placeholder="Password" 
          style={styles.input} 
          value={password}
          secureTextEntry 
          autoCapitalize = 'none'
          onChangeText={setPassword}
          
          />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
        <TouchableOpacity style={styles.btn} onPress={() => {
            loginHandle();
        }    
          }
          >
          <Text style={styles.btntext}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => {
            // alert("register pressed")
            navigation.navigate('Register')
          }    
          }>
          <Text style={styles.btntext}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style= {{margin: 5}}>
      </View>
    </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e2dd6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcome: {
    fontSize: 30,
    justifyContent: 'center',
    margin: 10,
    textAlign: 'center',
    fontFamily: "sans-serif-medium",
    fontWeight: 'bold',
    color: '#fff',
  },

  logintext: {
    fontSize: 30,
    justifyContent: 'center',
    margin: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: "sans-serif-condensed",
    color: '#fff',
  },

  input: {
    backgroundColor:'#fff',
    margin: 15,
    width: '90%',
    padding: 10, 
  },

  btntxt: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  btn: {
    backgroundColor: '#6495ED',
    padding: 10,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

});
