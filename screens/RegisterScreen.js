import SQLite from 'react-native-sqlite-storage';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';

import { LocalDB } from '../database/schema';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

useEffect(() => {
    createTable();
}, []);

const createTable = () => {
  LocalDB.transaction((tx) => {
      tx.executeSql(
          "CREATE TABLE IF NOT EXISTS "
          + "Users "
          + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);"
      )
  });
}

 const setData = async () => {
  if (!username) {
    alert('Please fill Username');
    return;
  }
  if (username.length < 3) {
    alert('Username should be at least minimum 3 characters ');
    return;
  }
  if (!password) {
    alert('Please fill Password');
    return;
  }
  if(password.length < 6){
    alert('Password should be at least minimum 6 characters ');
    return;
  }
  if(!confirmPassword){
    alert('Please fill Confirm Password');
    return;
  }
  if(password !== confirmPassword){
    alert('Password is not matching');
    return;
  } 
  else {
      try {      
        //Checking if username is already registered or not
        LocalDB.transaction((tx) => {
          tx.executeSql(
              "SELECT * FROM Users WHERE  username = ?",
              [username],
              (tx, results) => {
                  var len = results.rows.length;
                  if (len > 0) {
                    alert("Username is already registered");
                  }
                  else{
                      //Inserting user details to SQLite 
                       LocalDB.transaction(async (tx) => {
                        await tx.executeSql(
                            "INSERT INTO Users (username, password) VALUES (?,?)",
                            [username, password]
                        );
                      })

                      Alert.alert(
                        "",
                        "Succussfully Registered",
                        [
                          {
                            text: "OK",
                            onPress: () => navigation.navigate('Login')
                          },
                        ]
                      );

                  }
              }
          )
      })   
      } catch (error) {
          console.log(error);
      }
  }
}

    return (
      <View style={styles.container}>
      <StatusBar 
        backgroundColor="#00BFFF"
        barStyle="light-content"
      />
      <Text style={styles.welcome}>Register</Text>
      <TextInput 
          placeholder="Username" 
          style={styles.input}
          value={username}
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
           <TextInput 
          placeholder="Confirm Password" 
          style={styles.input} 
          value={confirmPassword}
          secureTextEntry 
          autoCapitalize = 'none'
          onChangeText={setConfirmPassword}
          />
      <View style={{flexDirection: 'row', justifyContent: 'center', width: '90%'}}>
        <TouchableOpacity 
          style={styles.btn}       
         onPress={() => {
            // alert("login pressed");
              setData();
              }    
          }
          >
          <Text style={styles.btntext}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style= {{margin: 5}}>
      </View>
    </View>
    );
};

export default RegisterScreen;

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
