import { View, Text, Button } from "react-native";

const GameLaunchHandover = ({ navigation }) => {
  return (
    <View>
      <Text>GameLaunchHandover</Text>
      <Text>
        OK Ranger - let's GO! Look at the picture. Look at the map. Find the
        landmarks.
      </Text>
      <Button
        title="Start Gameplay"
        onPress={() => navigation.push("GamePage")}
      />
    </View>
  );
};
export default GameLaunchHandover;
