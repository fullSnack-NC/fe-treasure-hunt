import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const currentWaypointStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageStack: {
		width: screenWidth,
		height: screenHeight,
	},
	image: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
	},
	clueImage: {
		display: 'flex',
		position: 'absolute',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '97%',
		borderColor: '#fff',
		borderWidth: 2,
		marginTop: 50,
		paddingTop: 20,
		borderWidth: 2,
		borderRadius: 25,
	},
	clueSwipe: {
		display: 'flex',
		position: 'absolute',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: screenWidth - 20,
		height: screenHeight - 30,
		paddingBottom: 30,
		paddingLeft: 10,
		paddingRight: 10,
		marginLeft: 10,
		bottom: 50,
	},
	mapView: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		marginTop: 50,
		marginBottom: 30,
		position: 'relative',
		width: screenWidth - 40,
		borderWidth: 2,
		borderColor: 'white',
		borderRadius: 25,
	},
	mapData: {
		flex: 1,
		alignItems: 'center',
		top: 10,
	},
	acornContainer: {
		position: 'absolute',
		bottom: 50,
		right: 20,
		flexDirection: 'column-reverse',
	},
	acorn: {
		height: 40,
		width: 40,
		marginTop: 5,
	},
	smallTxt: {
		fontSize: 20,
		fontWeight: '600',
		lineHeight: 20,
		color: '#fff',
	},
	mapBtn: {
		bottom: -100,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	clueSwipeInstruction: {
		position: 'absolute',
		bottom: 20,
		fontSize: 22,
		padding: 20,
		color: '#ffffff',
		fontWeight: '500',
		backgroundColor: '#867957',
		opacity: 0.9,
	},
	mapSwipeBtn: {
		bottom: 25,
	},
	clueSwipeBtn: {
		bottom: -80,
	},
});

export default currentWaypointStyles;
