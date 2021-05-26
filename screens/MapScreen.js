import React, { useState, useEffect } from 'react'
import { StyleSheet, View, PermissionsAndroid } from 'react-native'
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';

const MapScreen = () => {

  const [mapWidth, setMapWidth] = useState('99%')
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState(0);
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState(0);
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

  // Update map style to force a re-render to make sure the geolocation button appears
  const updateMapStyle = () => {
    setMapWidth('100%')
  }

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);


  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        //getting the Longitude
        const currentLongitude = position.coords.longitude;
        
        //getting the Latitude
        const currentLatitude = position.coords.latitude;

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  }


  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        
        setLocationStatus('You are Here');
        console.log(position);

        //getting the Longitude     
        const currentLongitude = position.coords.longitude;

        //getting the Latitude 
        const currentLatitude = position.coords.latitude;

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  return (
    <View style={styles.container}>

      <MapView
        provider={PROVIDER_GOOGLE}
        mapType='standard'
        customMapStyle={googleMapStyle}
        style={[styles.map, { width: mapWidth }]}
        showsUserLocation={true}
        showsMyLocationButton={true}
        // zoomEnabled={true}  
        zoomControlEnabled={true}
        showsCompass={true}
        onMapReady={() => {
          getOneTimeLocation()
          updateMapStyle()
        }}
        // 
      >
        <Marker  
          coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}  
          title={"You are here"}  
          description={""}  
        />

      </MapView>
    </View>
  )
}

const googleMapStyle = [{
  featureType: "administrative",
  elementType: "geometry",
  stylers: [{
    visibility: "off"
  }]
}]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    height: '100%'
  }
})

export default MapScreen
