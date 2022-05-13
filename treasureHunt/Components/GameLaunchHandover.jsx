import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { Audio } from "expo-av";
import { getParks } from "../utils/api";

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
    position: "absolute",
    marginLeft: "14%",
    marginTop: 275,
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

  useEffect(() => {
    getParks()
      .then(({ parks }) => {
        setLocations(parks);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.log(err.response.data);
        setError({ err });
        setIsLoading(false);
      });
  }, []);

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
          <Text style={styles.handoverText}>
            OK park ranger! Click the button below to see the first picture
            clue. It's where the hunt starts. Then swipe right on it to see the
            map to start.
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => touchGo(map_id)}>
          <Image source={require("../assets/view-images/cluebutton.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default GameLaunchHandover;
