import {
  View,
  Text,
  Button,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

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
  image2: {
    flexDirection: 'column',
    height: '40%',
    left: -60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image3: {
    top: 300,
    left: 50,
    width: 300,
    height: 315,
    position: 'absolute',
  },
  imageStack: {
    width: width,
    height: height,
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    backgroundColor: 'blue',
    position: 'absolute',
    // marginTop: 300,
    zIndex: 3,
    elevation: 3,
  },
  handoverTextContainer: {
    backgroundColor: '#7CA85B',
    width: '70%',
    flex: 0.25,
    marginLeft: '15%',
    marginTop: '20%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
  },
  handoverText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
});

const GameLaunchHandover = ({ navigation, route }) => {
  const { map_id } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.imageStack}>
        <ImageBackground
          source={require('../assets/view-images/background.png')}
          resizeMode='contain'
          style={styles.image}
        ></ImageBackground>
        <Image
          source={require('../assets/HandoverSplash.png')}
          resizeMode='contain'
          style={styles.image3}
        ></Image>

        <View style={styles.handoverTextContainer}>
          <Text style={styles.handoverText}>
            OK park ranger! Click the button below to see the first picture
            clue. It's where the hunt starts. Then swipe right on it to see the
            map to start.
          </Text>
        </View>
        <Button
          style={styles.button}
          title='Click to get first clue'
          onPress={() => navigation.push('CurrentWaypoint', { map_id: map_id })}
        />
      </View>
    </View>
  );
};
export default GameLaunchHandover;
