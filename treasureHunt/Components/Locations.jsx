import { getParks } from "../utils/api";
import React, { useEffect, useState, Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Dimensions, ScrollView, TouchableOpacity, Vibration } from 'react-native';
import { Audio } from 'expo-av';
const { width, height } = Dimensions.get('window');

const Locations = ({ navigation }) => {
	const [locations, setLocations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [sound, setSound] = React.useState();
	async function playSound() {
		const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/power-up.wav'));
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
		return <Text>Parks Loading...</Text>;
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
						{/* <Image
						source={require('../assets/view-images/park-life-logo.png')}
						resizeMode='contain'
						style={styles.image2}
					></Image> */}

						{locations.map((location) => {
							const park_id = location.park_id;
							const amenities = JSON.parse(location.amenities);

							return (
								<TouchableOpacity key={park_id} onPress={() => touchGo(park_id)}>
									{/* <TouchableOpacity
									key={park_id}
                  onPress={() =>
                  {
                    // touchGo
										setTimeout(() => {
											navigation.push('HuntList', { park_id: park_id });
										}, 1000)}
									}
								> */}
									<View style={[cardStyles.container, styles.materialCardWithImageAndTitle]}>
										<View style={cardStyles.cardBody}>
											<View style={cardStyles.bodyContent}>
												<Text style={cardStyles.titleStyle}>{location.park_name}</Text>
												<Text style={cardStyles.subtitleStyle}>
													{amenities.accessible ? <Text>🦽</Text> : null}
													{amenities.lake ? <Text>💧</Text> : null}
													{amenities.wildlife ? <Text> 🦔</Text> : null}
													{amenities.toilet ? <Text> 🚻</Text> : null}
													{amenities.food ? <Text> 🍦</Text> : null}
												</Text>
											</View>
											<Image style={cardStyles.cardItemImagePlace} source={parkImage[park_id - 1].image}></Image>
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
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
	},
	image_imageStyle: {},
	// image2: {
	// 	flexDirection: 'column',
	// 	height: '40%',
	// 	left: -60,
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// },
	cardList: {
		margin: 10,
		marginTop: 20,

		// flexDirection: 'column',
	},
	materialCardWithImageAndTitle: {
		marginBottom: 10,
		width: width - 20,

		// left: 30,
	},
	image2Stack: {
		width: 359,
		height: 318,
		marginTop: 57,
		marginLeft: 79,
	},
	loremIpsum4: {
		fontFamily: 'roboto-regular',
		color: '#121212',
		marginTop: 228,
		marginLeft: 246,
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
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		width: 357,
		top: 1,
		height: 150,
	},
	bodyContent: {
		padding: 16,
		paddingTop: 24,
		flex: 1,
	},
	titleStyle: {
		fontSize: 24,
		fontWeight: '600',
		color: '#fff',
		paddingBottom: 12,
	},
	subtitleStyle: {
		fontSize: 20,
		color: '#000',
		lineHeight: 16,
		opacity: 1,
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
