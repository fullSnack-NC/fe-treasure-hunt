import { getParks } from '../utils/api';
import React, { useEffect, useState, Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ImageBackground,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	Vibration,
} from 'react-native';
import { Audio } from 'expo-av';
const { width, height } = Dimensions.get('window');

const Locations = ({ navigation }) => {
	const [locations, setLocations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [sound, setSound] = React.useState();

	async function playSound() {
		const { sound } = await Audio.Sound.createAsync(
			require('../assets/sounds/power-up.wav')
		);
		setSound(sound);
		await sound.playAsync();
	}

	React.useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	const duration = 1000;

	const parkImage = [
		{
			park_id: 1,
			image: require('../assets/park-images/1.jpeg'),
		},
		{
			park_id: 2,
			image: require('../assets/park-images/2.jpeg'),
		},
		{
			park_id: 3,
			image: require('../assets/park-images/3.jpeg'),
		},
		{
			park_id: 4,
			image: require('../assets/park-images/4.jpeg'),
		},
		{
			park_id: 5,
			image: require('../assets/park-images/5.jpeg'),
		},
	];
	const vibeGo = () => Vibration.vibrate(duration);
	const touchGo = (park_id) => {
		vibeGo();
		playSound();
		setTimeout(() => {
			navigation.push('HuntList', { park_id: park_id });
		}, 1000);
	};

	useEffect(() => {
		getParks()
			.then(({ parks }) => {
				setLocations(parks);
				// setIsLoading(false);
				setError(null);
			})
			.catch((err) => {
				console.log(err.response.data);
				setError({ err });
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		<ImageBackground
			style={styles.bgImage}
			source={require('../assets/view-images/background-noLamp.png')}
			resizeMode='cover'
		>
			<Text style={styles.smallTxt}>Parks Loading...</Text>
			<Text>Parks Loading...</Text>;
		</ImageBackground>;
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
						{locations.map((location) => {
							const park_id = location.park_id;
							const amenities = JSON.parse(location.amenities);

							return (
								<TouchableOpacity
									key={park_id}
									onPress={() => touchGo(park_id)}
								>
									<View
										style={[
											cardStyles.container,
											styles.materialCardWithImageAndTitle,
										]}
									>
										<View style={cardStyles.cardBody}>
											<Image
												style={cardStyles.cardItemImagePlace}
												source={parkImage[park_id - 1].image}
											></Image>
											<View style={cardStyles.bodyContent}>
												<Text style={cardStyles.titleStyle}>
													{location.park_name}
												</Text>
												<View style={cardStyles.subtitleStyle}>
													{amenities.accessible ? (
														<Text style={{ fontSize: 30 }}>????</Text>
													) : null}
													{amenities.lake ? (
														<Text style={{ fontSize: 30 }}>????</Text>
													) : null}
													{amenities.wildlife ? (
														<Text style={{ fontSize: 30 }}> ????</Text>
													) : null}
													{amenities.toilet ? (
														<Text style={{ fontSize: 30 }}> ????</Text>
													) : null}
													{amenities.food ? (
														<Text style={{ fontSize: 30 }}> ????</Text>
													) : null}
												</View>
											</View>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
	},
	bgImage: {
		width: '100%',
		height: '100%',
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image_imageStyle: {},
	cardList: {
		margin: 10,
		marginTop: 20,
	},
	materialCardWithImageAndTitle: {
		marginBottom: 10,
		width: width - 20,
	},
	smallTxt: {
		fontSize: 20,
		fontWeight: '600',
		lineHeight: 20,
		color: '#3781D7',
	},
});

const cardStyles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 23,
		borderColor: '#CCC',
		flexWrap: 'nowrap',
		backgroundColor: 'rgba(124,168,91,1)',
		shadowColor: '#000',
		top: 10,
		shadowOffset: {
			width: -2,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3,
		overflow: 'hidden',
		opacity: 0.9,
	},
	cardBody: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: 357,
		top: 1,
		height: 150,
	},
	bodyContent: {
		paddingRight: 20,
		paddingTop: 24,
		paddingBottom: 20,
		flex: 1,
	},
	titleStyle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#fff',
		paddingBottom: 12,
	},
	subtitleStyle: {
		color: '#000',
		lineHeight: 16,
		opacity: 1,
		position: 'absolute',
		bottom: 20,
		width: '100%',
		paddingTop: 15,
		borderTopWidth: 1,
		borderColor: '#fff',
		flexDirection: 'row',
	},
	cardItemImagePlace: {
		backgroundColor: '#ccc',
		height: 117,
		width: 159,
		margin: 16,
		borderRadius: 19,
	},
});

export default Locations;
