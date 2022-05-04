import { View, Text } from 'react-native';
import CurrentWaypoint from './CurrentWaypoint';

const GamePage = ({ navigation }) => {
  return (
    <View>
      <Text>GamePage</Text>
      <Text>Map View</Text>
      <CurrentWaypoint navigation={navigation} />
    </View>
  );
};
export default GamePage;
