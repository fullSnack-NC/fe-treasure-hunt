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

const CurrentWaypoint = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const apiKey = REACT_APP_MAPS_API_KEY;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

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
            // backgroundColor: 'tomato',
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
        // pointerEvents='none'
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
            initialRegion={{
              latitude: 53.83767, // Needs setting to dynamic value. If set to dynamic value, first time app launched it fails.
              longitude: -1.495378, // Needs setting to dynamic value. If set to dynamic value, first time app launched it fails.
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            // onRegionChange, onRegionChangeComplete: Not working: should listen for GPX location change (https://dev.to/cecheverri4/google-maps-geolocation-and-unit-test-on-react-native-4eim)

            // onRegionChange={() => {
            //   setLocation({
            //     latitude: location.coords.latitude,
            //     longitude: location.coords.longitude,
            //   });
            // }}
            // onRegionChangeComplete={() => {
            //   setLocation({
            //     latitude: location.coords.latitude,
            //     longitude: location.coords.longitude,
            //   });
            // }}
            showsUserLocation={true}
            scrollEnabled={false}
            minZoomLevel={17} // default => 0
            maxZoomLevel={17} // default => 20
            rotateEnabled={true}
            mapType='satellite'
          />
        )}
        {
          // <Marker /> not working - should show a place marker example, that could be used for a waypoint
          /* <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title='this is a marker'
          description='this is a marker example'
        /> */
        }
      </View>
    </ScrollView>
  );
};
export default CurrentWaypoint;
