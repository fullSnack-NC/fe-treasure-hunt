import { View, Text, Button } from "react-native";

const CurrentWaypoint = ({ navigation }) => {
  return (
    <View>
      <Button title="Found" onPress={() => navigation.push("Certificate")} />
      <Button
        title="Can't find (skip)"
        onPress={() => navigation.push("Certificate")}
      />
    </View>
  );
};

export default CurrentWaypoint;
