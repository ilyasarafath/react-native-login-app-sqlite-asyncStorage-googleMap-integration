
import { StyleSheet, View } from 'react-native';  
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';  
import Geolocation from "react-native-geolocation-service";
import React, { useState, useEffect } from 'react';

function MapScreen({ navigation }) {
    return (
      <View style={styles.MainContainer}>  
  
      <MapView  
        style={styles.mapStyle}  
        showsUserLocation={true}  
        zoomEnabled={true}  
        zoomControlEnabled={true}  
        initialRegion={{  
          latitude: 28.579660,   
          longitude: 77.321110,  
          latitudeDelta: 0.0922,  
          longitudeDelta: 0.0421,  
        }}>  

        <Marker  
          coordinate={{ latitude: 28.579660, longitude: 77.321110 }}  
          title={"JavaTpoint"}  
          description={"Java Training Institute"}  
        />  
      </MapView>  
        
    </View>  
    );
    }

    export default MapScreen;

    const styles = StyleSheet.create({  
      MainContainer: {  
        position: 'absolute',  
        top: 0,  
        left: 0,  
        right: 0,  
        bottom: 0,  
        alignItems: 'center',  
        justifyContent: 'flex-end',  
      },  
      mapStyle: {  
        position: 'absolute',  
        top: 0,  
        left: 0,  
        right: 0,  
        bottom: 0,  
      },  
    });  