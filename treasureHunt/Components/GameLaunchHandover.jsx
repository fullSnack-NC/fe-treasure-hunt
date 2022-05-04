import { View, Text, Button } from "react-native";

const GameLaunchHandover = ({ navigation }) => {
  return (
    <View>
      <Text>GameLaunchHandover</Text>
      <Button
        title="Start Gameplay"
        onPress={() => navigation.push("GamePage")}
      />
    </View>
  );
};
export default GameLaunchHandover;
