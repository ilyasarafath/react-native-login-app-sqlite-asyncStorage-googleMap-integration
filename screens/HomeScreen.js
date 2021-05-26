// import React from 'react';
import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, StatusBar ,Image,Dimensions,TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LocalDB } from '../database/schema';
const HomeScreen = ({navigation}) => {

  setTimeout(() => {
    navigation.navigate("Login");
  }, 2000);

  const theme = useTheme();

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
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <Image 
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
  
      <TouchableOpacity 
          style={styles.btn} 
          onPress={() => navigation.navigate("Login")}>
          <Text style={styles.btntext}>Get Started</Text>
        </TouchableOpacity>
       
      </View>
    );
};

export default HomeScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  logo: {
    width: height_logo,
    height: height_logo
},
btn: {
  backgroundColor: '#00FA9A',
  padding: 10,
  marginTop:10,
  width: '45%',
  justifyContent: 'center',
  alignItems: 'center',
},
btntxt: {
  fontSize: 25,
  textAlign: 'center',
  fontWeight: 'bold',
},
});
