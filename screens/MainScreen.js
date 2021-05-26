import React from 'react';
import { View, Text, StyleSheet ,SafeAreaView,Dimensions,TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';
import{ AuthContext } from '../components/context';

const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();
  const { signOut} = React.useContext(AuthContext);

  const logoutHandle = async () => {
    signOut();
  }

    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.containerMain}>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => navigation.navigate("Map")}>
          <Text style={styles.btntext}>Open Map</Text>
        </TouchableOpacity>
        <View style={styles.bottomView}>
        <TouchableOpacity 
          onPress={() =>
            logoutHandle()  
           }>
          <Text style={styles.textStyle}>Logout</Text>
        </TouchableOpacity>
          
        </View>
      </View>
    </SafeAreaView>
    
      
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
btn: {
  backgroundColor: '#00FA9A',
  padding: 10,
  width: '30%',
  alignItems: 'center',
},
btntxt: {
  fontSize: 25,
  textAlign: 'center',
  fontWeight: 'bold',
},
containerMain: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
bottomView: {
  width: '100%',
  height: 50,
  backgroundColor: '#EE5407',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute', 
  bottom: 0, 
},
textStyle: {
  color: '#fff',
  fontSize: 18,
}
});