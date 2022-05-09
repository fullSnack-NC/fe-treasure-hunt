import { View, Text } from 'react-native';
import CurrentWaypoint from './CurrentWaypoint';

const GamePage = ({ navigation }) => {
  return (
		<View>
			<CurrentWaypoint navigation={navigation} />
		</View>
	);
};
export default GamePage;
