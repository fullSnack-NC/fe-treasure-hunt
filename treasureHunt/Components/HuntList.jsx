import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, Vibration } from "react-native";
import { Audio } from "expo-av";
import { getMapsByParkID } from "../utils/api";

const HuntList = ({ route, navigation }) => {
  const [maps, setMaps] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { park_id } = route.params;
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      // placeholder sound for testing
      require("../assets/sounds/Found-yay.wav")
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

  useEffect(() => {
    getMapsByParkID(park_id)
      .then((data) => {
        setMaps(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.log(err.response.data);
        setError({ err });
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Text>Maps Loading...</Text>;
  }

  if (error) {
    return <Text>Parks not found</Text>;
  }
  //   gameLaunchGo = () =>
  //     navigation.push("GameLaunchHandover", { map_id: map.map_id });
  //   vibeGo = () => Vibration.vibrate(duration);
  //   gameLaunchBundle = () => {
  //     this.gameLaunchGo();
  //     this.vibeGo();
  //     playSound();
  //   };
  return (
    <View>
      {maps.map((map) => {
        return (
          <View key={map.map_id}>
            <Image
              // placeholder image, need to see why img url not coming from APO
              source={require("../assets/map-images/RoundhayLake-1080x720.jpeg")}
              style={{ width: 180, height: 120 }}
            />
            <Text>{map.map_name}</Text>
            <Text>{map.length} KM</Text>
            <Text>{map.est_comp_time} mins</Text>
            <Text>Suitable for {map.age_min} +</Text>
            <Button
              title="Select this Hunt"
              onPress={() =>
                navigation.push("GameLaunchHandover", { map_id: map.map_id })
              }
              //   onPress={() => this.gameLaunchBundle()}
            />
          </View>
        );
      })}
    </View>
  );
};
export default HuntList;
