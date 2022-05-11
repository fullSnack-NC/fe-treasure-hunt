import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
  Vibration,
  TouchableOpacity,
} from "react-native";

import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
  },
  image2: {
    flexDirection: "column",
    height: "40%",
    left: -60,
    justifyContent: "center",
    alignItems: "center",
  },
  image3: {
    top: 300,
    left: 50,
    width: 300,
    height: 315,
    position: "absolute",
  },
  imageStack: {
    width: width,
    height: height,
  },
  button: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    backgroundColor: "blue",
    position: "absolute",
    // marginTop: 300,
    zIndex: 3,
    elevation: 3,
  },
  handoverTextContainer: {
    backgroundColor: "#7CA85B",
    width: "70%",
    flex: 0.25,
    marginLeft: "15%",
    marginTop: "20%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 20,
  },
  handoverText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});

const GameLaunchHandover = ({ navigation, route }) => {
  const { map_id } = route.params;
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sound, setSound] = React.useState();
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/game-start.wav")
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

  const duration = 1000;

  const vibeGo = () => Vibration.vibrate(duration);
  const touchGo = (map_id) => {
    vibeGo();
    playSound();
    setTimeout(() => {
      navigation.push("CurrentWaypoint", { map_id: map_id });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageStack}>
        <ImageBackground
          source={require("../assets/view-images/background.png")}
          resizeMode="contain"
          style={styles.image}
        ></ImageBackground>
        <Image
          source={require("../assets/HandoverSplash.png")}
          resizeMode="contain"
          style={styles.image3}
        ></Image>
        <View style={styles.handoverTextContainer}>
          <TouchableOpacity
            title="Click to get first clue"
            onPress={() => touchGo(map_id)}
            s
          >
            <Text style={styles.handoverText}>
              OK park ranger! Click here to see the first picture clue. It's
              where the hunt starts. Then swipe right on it to see the map to
              start.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default GameLaunchHandover;
