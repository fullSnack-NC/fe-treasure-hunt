import { View, Text } from 'react-native';
import HuntCard from './HuntCard';

const HuntList = ({ navigation }) => {
	return (
		<View>
			<Text>Hunt list</Text>
			<HuntCard />
			<HuntCard />
			<HuntCard />
			{/* onClick > setJourney -> GameLaunchHandover> */}
		</View>
	);
};
export default HuntList;
