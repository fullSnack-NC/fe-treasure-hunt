import { View, Text } from "react-native";
import LocationCard from "./LocationCard";
const Locations = ({ navigation }) => {
  return (
    <View>
      <LocationCard navigation={navigation} />
      <LocationCard navigation={navigation} />
      <LocationCard navigation={navigation} />
      <Text>Locations</Text>
    </View>
  );
};
export default Locations;
