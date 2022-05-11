import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Vibrations,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { REACT_APP_MAPS_API_KEY } from "@env";
import { TouchableOpacity } from "react-native-gesture-handler";
import globalStyles from "../css/style";
import { getWaypointByMapID } from "../utils/api";
import { Audio } from "expo-av";
const geolib = require("geolib");

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    //width: '100%',
    //height: '100%',
    flex: 1,
  },
  imageStack: {
    width: width,
    height: height,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
  },
  button: {
    position: "absolute",
    left: 0,
    bottom: 50,
    zIndex: 999,
  },
  acornContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "column-reverse",
  },
  acorn: {
    height: 40,
    width: 40,
    marginTop: 5,
    borderRadius: 10,
  },
  smallTxt: {
    fontSize: 20,
    fontWeight: "400",
    paddingLeft: 10,
    lineHeight: 20,
    color: "#fff",
  },
});

const CurrentWaypoint = ({ navigation }) => {
  const [CurrentWaypoint_id, setCurrentWaypoint_id] = useState(0);
  const [sound, setSound] = React.useState();
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/waypoint-beep.wav")
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
      imgPath: require("../assets/waypoint-images/1_1.png"),
    },
    {
      wayPoint_id: 2,
      latitude: 53.837907,
      longitude: -1.499438,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      imgPath: require("../assets/waypoint-images/1_2.png"),
    },
    {
      wayPoint_id: 3,
      latitude: 53.83561,
      longitude: -1.497038,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      imgPath: require("../assets/waypoint-images/1_3.png"),
    },
    {
      wayPoint_id: 4,
      latitude: 53.837088,
      longitude: -1.495215,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      imgPath: require("../assets/waypoint-images/1_4.png"),
    },
    {
      wayPoint_id: 5,
      latitude: 53.839485,
      longitude: -1.497238,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      image: require("../assets/waypoint-images/1_5.png"),
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
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
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
  const [backgroundColor, setBackgroundColor] = useState("#B3EAF2");
  const [distanceMsg, setDistanceMsg] = useState("");

  useEffect(() => {
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
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
      //setBackgroundColor('#2B4279');
      setBackgroundColor("#0662CE");
      setDistanceMsg("You’re freezing cold…brrrrrr");
      vibeGo(durationF);
      vibeGo(durationF);
      playSound();
    } else if (200 < distance && distance <= 300) {
      //setBackgroundColor('#65428C');
      setBackgroundColor("#3781D7");
      setDistanceMsg("You’re cold");
      vibeGo(durationE);
      vibeGo(durationE);
      playSound();
      playSound();
    } else if (150 < distance && distance <= 200) {
      //setBackgroundColor('#A1378B');
      setBackgroundColor("#B3EAF2");
      setDistanceMsg("You're warm");
      vibeGo(durationD);
      vibeGo(durationD);
      playSound();
      playSound();
      playSound();
    } else if (80 < distance && distance <= 150) {
      //setBackgroundColor('#D42374');
      setBackgroundColor("#FFC899");
      setDistanceMsg("It’s toasty warm");
      vibeGo(durationC);
      vibeGo(durationC);
      playSound();
      playSound();
      playSound();
      playSound();
    } else if (40 < distance && distance <= 80) {
      //setBackgroundColor('#F62B4C');
      setBackgroundColor("#FFAD66");
      setDistanceMsg("You’re quite hot… be careful you don’t burn");
      vibeGo(durationB);
      vibeGo(durationB);
      playSound();
      playSound();
      playSound();
      playSound();
      playSound();
    } else if (0 <= distance && distance < 40) {
      //setBackgroundColor('#FF5800');
      setBackgroundColor("#FF9232");
      setDistanceMsg("You’re red hot!");
      vibeGo(durationA);
      vibeGo(durationA);
      playSound();
      playSound();
      playSound();
      playSound();
      playSound();
      playSound();
    } else if (0 === distance) {
      // setBackgroundColor('#FF5800');
      setBackgroundColor("#FF7700");
      setDistanceMsg("Scorching! You have arrived!");
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
        source={require("../assets/acorn.png")}
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
        navigation.navigate("Certificate");
      }, 2000);
      return;
    }
    setCurrentWaypoint_id(newID);
    setcurrentWaypointMarker(waypointPositions[newID]);
  };
  let text = "Waiting..";

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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <View style={styles.imageStack}>
          <ImageBackground
            source={require("../assets/fullSnack-background-clear.png")}
            resizeMode="contain"
            style={styles.image}
          ></ImageBackground>
          <Image
            source={waypointPositions[CurrentWaypoint_id].imgPath}
            resizeMode="cover"
            style={{
              flex: 1,
              margin: 20,
              height: screenHeight,
              width: screenWidth - 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              borderColor: "#867957",
              borderWidth: 2,
            }}
          />
          <Text style={{}}>Swipe right for the map</Text>
          {/* <TouchableOpacity style={[globalStyles.baseBtn]}>
					<Text style={globalStyles.btnText}>Find the next treasure</Text>
				</TouchableOpacity> */}
        </View>
      </View>

      <View
        // pointerEvents='none'
        style={{
          paddingVerticle: 50,
          flex: 1,
          flexDirection: "column",
          height: screenHeight,
          width: screenWidth,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: backgroundColor,
        }}
      >
        <ImageBackground
          source={require("../assets/fullSnack-background-clear.png")}
          resizeMode="contain"
          style={styles.image}
        ></ImageBackground>
        {location && (
          <MapView
            style={{
              position: "relative",
              height: screenHeight - 100,
              width: screenWidth - 50,
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 25,
              // justifyContent: 'center',
              alignItems: "center",
              flexDirection: "column",
            }}
            provider={PROVIDER_GOOGLE}
            apiKey={apiKey}
            region={region}
            showsUserLocation={true}
            scrollEnabled={true}
            rotateEnabled={true}
            mapType="satellite"
          >
            <Marker coordinate={currentWaypointMarker} />
            <Text
              style={{
                // marginTop: 20,
                color: "#fff",
                fontSize: 60,
                fontWeight: "600",
                paddingLeft: 10,
                textAlign: "left",
              }}
            >
              {distance}
              <Text style={styles.smallTxt}>m</Text>
            </Text>
            <Text style={styles.smallTxt}>{distanceMsg}</Text>
            <View style={styles.acornContainer}>{acornImgs}</View>
          </MapView>
        )}
        {distance < 40 && (
          <TouchableOpacity
            style={[
              globalStyles.baseBtn,
              // {
              // 	flex: 1,
              // 	position: 'absolute',
              // 	left: '-40%',
              // 	bottom: 0,
              // 	width: '80%',
              // 	height: 50,
              // 	zIndex: 10,
              // },
            ]}
            onPress={() => handlePress()}
          >
            <Text style={globalStyles.btnText}>Found</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};
export default CurrentWaypoint;
