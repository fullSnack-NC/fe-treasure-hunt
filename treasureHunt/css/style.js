import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		width: '100%',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	baseBtn: {
		backgroundColor: '#7cb518',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
	},

	btnText: {
		color: '#fff',
		fontSize: 20,
		padding: 20,
	},
});

export default globalStyles;
