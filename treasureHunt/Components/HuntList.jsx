import { useEffect, useState } from 'react';
import {
	View,
	Text,
	Button,
	Image,
	StyleSheet,
	ImageBackground,
	Dimensions,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
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
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/view-images/background-noLamp.png')}
				resizeMode='contain'
				style={styles.image}
				imageStyle={styles.image_imageStyle}
			>
				<>
					<ScrollView style={[styles.cardList]}>
						{maps.map((map) => {
							return (
								<TouchableOpacity
									key={map.map_id}
									onPress={() =>
										navigation.push('GameLaunchHandover', {
											map_id: map.map_id,
										})
									}
								>
									<View
										key={map.map_id}
										style={[cardStyles.container, styles.materialCard51]}
									>
										<Image
											source={mapImage[map.map_id - 1].image}
											style={cardStyles.cardItemImagePlace}
										/>
										<View style={cardStyles.bodyContent}>
											<Text style={cardStyles.titleStyle}>{map.map_name}</Text>
											<Text style={cardStyles.subtitleStyle}>
												{map.length} KM {map.est_comp_time} mins Suitable for{' '}
												{map.age_min} +
											</Text>
										</View>
									</View>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</>
			</ImageBackground>
		</View>
	);
};

const cardStyles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#CCC',
		flexWrap: 'nowrap',
		backgroundColor: '#FFF',
		shadowColor: '#000',
		shadowOffset: {
			width: -2,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3,
		overflow: 'hidden',
	},
	cardItemImagePlace: {
		backgroundColor: '#ccc',
		flex: 1,
		minHeight: 210,
	},
	bodyContent: {
		padding: 16,
		paddingTop: 24,
		justifyContent: 'center',
		backgroundColor: 'rgba(124,168,91,1)',
	},
	titleStyle: {
		fontSize: 24,
		color: 'rgba(255,255,255,1)',
		paddingBottom: 12,
	},
	subtitleStyle: {
		fontSize: 14,
		color: 'rgba(255,255,255,1)',
		lineHeight: 16,
		opacity: 0.5,
	},
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: 580,
		height: 847,
		marginTop: -35,
		marginLeft: -111,
	},
	image_imageStyle: {},

	materialCard51: {
		height: 350,
		width: 359,
		backgroundColor: 'rgba(124,168,91,1)',
		borderRadius: 20,
		marginLeft: 119,
		marginBottom: 10,
	},
});
export default HuntList;
