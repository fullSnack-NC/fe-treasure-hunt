import { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { getMapsByParkID } from '../utils/api';

const HuntList = ({ route, navigation }) => {
	const [maps, setMaps] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { park_id } = route.params;

	const mapImage = [
		{
			map_id: 1,
			image: require('../assets/map-images/1.jpeg'),
			static_image: require('../assets/map-images/1-static.png'),
		},
		{
			map_id: 2,
			image: require('../assets/map-images/2.jpeg'),
		},
		{
			map_id: 3,
			image: require('../assets/map-images/3.jpeg'),
		},
		{
			map_id: 4,
			image: require('../assets/map-images/4.jpeg'),
		},
		{
			map_id: 5,
			image: require('../assets/map-images/5.jpeg'),
		},
		{
			map_id: 6,
			image: require('../assets/map-images/6.jpeg'),
		},
	];

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
	return (
		<View>
			{maps.map((map) => {
				return (
					<View key={map.map_id}>
						<Text>{map.map_name}</Text>
						<Image
							source={mapImage[map.map_id - 1].image}
							style={{ height: 50, width: 150 }}
						/>
						<Text>{map.length} KM</Text>
						<Text>{map.est_comp_time} mins</Text>
						<Text>Suitable for {map.age_min} +</Text>
						<Button
							title='Select this Hunt'
							onPress={() =>
								navigation.push('GameLaunchHandover', { map_id: map.map_id })
							}
						/>
					</View>
				);
			})}
		</View>
	);
};
export default HuntList;
