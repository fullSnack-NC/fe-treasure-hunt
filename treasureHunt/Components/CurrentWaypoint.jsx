import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Vibrations,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { REACT_APP_MAPS_API_KEY } from '@env';
import { TouchableOpacity } from 'react-native-gesture-handler';
import globalStyles from '../css/style';
import { getWaypointByMapID } from '../utils/api';
import { Audio } from 'expo-av';
const geolib = require('geolib');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStack: {
    width: screenWidth,
    height: screenHeight,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
  },
  clueImage: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderColor: '#867957',
    borderWidth: 2,
  },
  clueSwipe: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: screenWidth - 20,
    height: screenHeight - 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
  },
  mapView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 72,
    marginBottom: 30,
    paddingBottom: 90,
    paddingTop: 70,
    position: 'relative',
    width: screenWidth - 40,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 25,
  },
  mapData: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth - 20,
    height: screenHeight - 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
  },
  mapData2: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth - 20,
    height: screenHeight - 40,
    paddingTop: 90,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
  },
  mapSwipeSection: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    left: 0,
    bottom: 50,
    zIndex: 999,
  },
  acornContainer: {
    position: 'absolute',
    bottom: 110,
    right: 35,
    flexDirection: 'column-reverse',
  },
  acorn: {
    height: 40,
    width: 40,
    marginTop: 5,
    borderRadius: 10,
  },
  smallTxt: {
    fontSize: 20,
    fontWeight: '400',
    paddingLeft: 10,
    lineHeight: 20,
    color: '#fff',
  },
  mapBtn: {
    display: 'flex',
    margin: 10,
    left: 10,
    bottom: 10,
    borderRadius: 10,
    width: 150,
    position: 'relative',
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  woodenBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBtnText: {
    display: 'flex',
    position: 'absolute',
    padding: 'auto',
    margin: 'auto',
    fontWeight: '700',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 15,
    color: '#fff',
  },
  clueSwipeInstruction: {
    fontSize: 22,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    color: '#ffffff',
    fontWeight: '500',
    backgroundColor: '#867957',
    opacity: 0.9,
  },
  mapSwipeInstruction: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    fontSize: 24,
    paddingBottom: 40,
  },
});

const CurrentWaypoint = ({ navigation }) => {
  const [CurrentWaypoint_id, setCurrentWaypoint_id] = useState(0);
  const [sound, setSound] = React.useState();
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/waypoint-beep.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const durationA = 900;
  const durationB = 700;
  const durationC = 500;
  const durationD = 300;
  const durationE = 200;
  const durationF = 100;

  const waypointPositions = [
    {
      wayPoint_id: 1,
      latitude: 53.838172,
      longitude: -1.503277,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      imgPath: require('../assets/waypoint-images/1_1.png'),
    },
    {
      wayPoint_id: 2,
      latitude: 53.837907,
      longitude: -1.499438,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      imgPath: require('../assets/waypoint-images/1_2.png'),
    },
    {
      wayPoint_id: 3,
      latitude: 53.83561,
      longitude: -1.497038,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      imgPath: require('../assets/waypoint-images/1_3.png'),
    },
    {
      wayPoint_id: 4,
      latitude: 53.837088,
      longitude: -1.495215,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      imgPath: require('../assets/waypoint-images/1_4.png'),
    },
    {
      wayPoint_id: 5,
      latitude: 53.839485,
      longitude: -1.497238,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      image: require('../assets/waypoint-images/1_5.png'),
    },
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [currentWaypointMarker, setcurrentWaypointMarker] = useState(
    waypointPositions[0]
  );
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [region, setRegion] = useState({
    latitude: 53.839277,
    longitude: -1.496882,
    latitudeDelta: 0.003922,
    longitudeDelta: 0.003421,
  });
  const [acorns, setAcorns] = useState(0);
  const [acornImgs, setAcornImgs] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const apiKey = REACT_APP_MAPS_API_KEY;
  const distance = geolib.getDistance(
    {
      latitude: location.latitude,
      longitude: location.longitude,
    },
    {
      latitude: currentWaypointMarker.latitude,
      longitude: currentWaypointMarker.longitude,
    }
  );
  const [backgroundColor, setBackgroundColor] = useState('#B3EAF2');
  const [distanceMsg, setDistanceMsg] = useState('');

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

    if (300 < distance && distance <= 500) {
      setBackgroundColor('#0662CE');
      setDistanceMsg('You’re freezing cold...brrrrrr');
      // vibeGo(durationF);
      // vibeGo(durationF);
      // playSound();
    } else if (200 < distance && distance <= 300) {
      setBackgroundColor('#3781D7');
      setDistanceMsg('You’re cold');
      vibeGo(durationE);
      vibeGo(durationE);
      playSound();
      playSound();
    } else if (150 < distance && distance <= 200) {
      setBackgroundColor('#B3EAF2');
      setDistanceMsg("You're warm");
      vibeGo(durationD);
      vibeGo(durationD);
      playSound();
      playSound();
      playSound();
    } else if (80 < distance && distance <= 150) {
      setBackgroundColor('#FFC899');
      setDistanceMsg('It’s toasty warm');
      vibeGo(durationC);
      vibeGo(durationC);
      playSound();
      playSound();
      playSound();
      playSound();
    } else if (40 < distance && distance <= 80) {
      setBackgroundColor('#FFAD66');
      setDistanceMsg('You’re quite hot now');
      vibeGo(durationB);
      vibeGo(durationB);
      playSound();
      playSound();
      playSound();
      playSound();
      playSound();
    } else if (0 <= distance && distance < 40) {
      setBackgroundColor('#FF9232');
      setDistanceMsg('You’re red hot!');
      vibeGo(durationA);
      vibeGo(durationA);
      playSound();
      playSound();
      playSound();
      playSound();
      playSound();
      playSound();
    } else if (0 === distance) {
      setBackgroundColor('#FF7700');
      setDistanceMsg('Scorching! You have arrived!');
      vibeGo(durationA);
      vibeGo(durationA);
      vibeGo(durationA);
      playSound();
      playSound();
      playSound();
      playSound();
      playSound();
      playSound();
      playSound();
    }

    const timer = setTimeout(() => {
      getLocation();
    }, 2000);

    return () => clearTimeout(timer);
  }, [location, region, distance]);

  // useEffect(() => {
  // 	getWaypointByMapID(map_id)
  // 		.then((data) => {
  // 			setWaypoints(data);
  // 			setIsLoading(false);
  // 			setErrorMsg(null);
  // 		})
  // 		.catch((err) => {
  // 			console.log(err.response.data);
  // 			setErrorMsg({ err });
  // 			setIsLoading(false);
  // 		});
  // }, []);

  const incrementAcorn = () => {
    const acorn = (
      <Image
        key={CurrentWaypoint_id}
        style={styles.acorn}
        source={require('../assets/acorn.png')}
      />
    );
    setAcorns((currAcorns) => currAcorns + 1);
    setAcornImgs((currAcorns) => {
      const existingAcorns = [...currAcorns];
      return [existingAcorns, acorn];
    });
  };
  const handlePress = () => {
    let newID = CurrentWaypoint_id + 1;
    incrementAcorn();
    if (newID >= waypointPositions.length) {
      setTimeout(() => {
        navigation.navigate('Certificate');
      }, 2000);
      return;
    }
    setCurrentWaypoint_id(newID);
    setcurrentWaypointMarker(waypointPositions[newID]);
  };
  let text = 'Waiting..';

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <ScrollView horizontal={true} pagingEnabled={true}>
      <View
        style={[
          globalStyles.container,
          {
            flex: 1,
            width: screenWidth,
            height: screenHeight,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <View style={styles.imageStack}>
          <ImageBackground
            source={require('../assets/fullSnack-background-clear.png')}
            resizeMode='contain'
            style={styles.image}
          ></ImageBackground>
          <View style={styles.clueSwipe}>
            <Image
              source={waypointPositions[CurrentWaypoint_id].imgPath}
              resizeMode='cover'
              style={styles.clueImage}
            />
            <Text style={styles.clueSwipeInstruction}>
              Can you find this place? Swipe right for the map ➡️
            </Text>
          </View>
        </View>
      </View>

      <View
        // pointerEvents='none'
        style={{
          paddinngVertical: 0,
          flex: 1,
          flexDirection: 'column',
          // marginTop: 20,
          height: screenHeight,
          width: screenWidth,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundColor,
        }}
      >
        <ImageBackground
          source={require('../assets/fullSnack-background-clear.png')}
          resizeMode='contain'
          style={styles.image}
        ></ImageBackground>
        {location && (
          <View>
            <MapView
              style={styles.mapView}
              provider={PROVIDER_GOOGLE}
              apiKey={apiKey}
              region={region}
              showsUserLocation={true}
              scrollEnabled={true}
              rotateEnabled={true}
              mapType='satellite'
            >
              <Marker
                coordinate={currentWaypointMarker}
                image={require('../assets/squirrel.png')}
              />
              <View style={styles.mapData}>
                <Text
                  style={{
                    // marginTop: 20,
                    color: '#fff',
                    fontSize: 60,
                    fontWeight: '600',
                    paddingLeft: 10,
                    textAlign: 'left',
                  }}
                >
                  {distance}
                  <Text style={styles.smallTxt}>m</Text>
                </Text>
                <View style={styles.mapData2}>
                  <Text style={styles.smallTxt}>{distanceMsg}</Text>
                </View>
                <View style={styles.acornContainer}>{acornImgs}</View>
              </View>
              <View>
                {distance < 40 && (
                  <TouchableOpacity
                    style={[styles.mapBtn]}
                    onPress={() => handlePress()}
                  >
                    <View style={styles.woodenBtn}>
                      <Image
                        source={require('../assets/view-images/wooden-button-small.png')}
                      />
                      <Text style={styles.mapBtnText}>Found this place</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </MapView>
          </View>
        )}
        <View style={styles.mapSwipeSection}>
          <Text style={styles.mapSwipeInstruction}>
            ⬅️ Swipe left to see clue
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default CurrentWaypoint;
