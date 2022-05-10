import { View, Text, Button } from "react-native";

const GameLaunchHandover = ({ navigation, route }) => {
	const { map_id } = route.params;
	return (
		<View>
			<Text>GameLaunchHandover</Text>
			<Button title='Start Gameplay' onPress={() => navigation.push('CurrentWaypoint', { map_id: map_id })} />
		</View>
	);
};
export default GameLaunchHandover;
