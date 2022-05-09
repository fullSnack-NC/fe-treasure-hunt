import {
  View,
  Text,
  Image,
  ScrollView,
  AppRegistry,
  Dimensions,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { REACT_APP_MAPS_API_KEY } from '@env';
import { TouchableOpacity } from 'react-native-gesture-handler';
import globalStyles from '../css/style';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CurrentWaypoint = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.003922,
    longitudeDelta: 0.003421,
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const apiKey = REACT_APP_MAPS_API_KEY;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const waypointPosition = {
    // needs to be dynamically updated to next waypoint
    latitude: 53.839277,
    longitude: -1.496882,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    };
    const getLocation = async () => {
      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.003922,
        longitudeDelta: 0.003421,
      });
    };

    const timer = setTimeout(() => {
      getLocation();
    }, 2000);

    return () => clearTimeout(timer);
  }, [location, region]);

  let text = 'Waiting..';

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <ScrollView horizontal={true} pagingEnabled={true}>
      <View>
        <Image
          source={require('../assets/waypoint-images/Waypoint_1_Roundhay_Park.png')}
          resizeMode='contain'
          style={{
            flex: 1,
            height: '90%',
            width: screenWidth,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <TouchableOpacity style={globalStyles.baseBtn}>
          <Text style={globalStyles.btnText}>Found </Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.baseBtn}>
          <Text style={globalStyles.btnText}>Find the next treasure</Text>
        </TouchableOpacity>
      </View>
      <View
        pointerEvents='none'
        style={{
          flex: 1,
          height: screenHeight,
          width: screenWidth,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'blue',
        }}
      >
        {location && (
          <MapView
            style={{
              height: screenHeight - 40,
              width: screenWidth - 40,
            }}
            provider={PROVIDER_GOOGLE}
            apiKey={apiKey}
            region={region}
            showsUserLocation={true}
            scrollEnabled={false}
            rotateEnabled={true}
            mapType='satellite'
          >
            <Marker coordinate={waypointPosition} />
          </MapView>
        )}
      </View>
    </ScrollView>
  );
};
export default CurrentWaypoint;
