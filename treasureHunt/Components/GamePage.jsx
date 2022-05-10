import { View, Text } from 'react-native';
import CurrentWaypoint from './CurrentWaypoint';

const GamePage = ({ navigation, route }) => {
	const { map_id } = route.params;
	console.log(map_id, 'gamepage mapid');
	return (
		<View>
			<CurrentWaypoint navigation={navigation} />
		</View>
	);
};
export default GamePage;
