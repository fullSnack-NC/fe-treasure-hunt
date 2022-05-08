import { View, Text, Button, Image, StyleSheet, Vibration } from "react-native";

const VibrationPattern = () => {
  const duration = 5000;
  const pattern = [1000, 2000, 1000, 2000];
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeImage: {
    flex: 1,
    width: "80%",
  },
  button: {
    width: "70%",
    backgroundColor: "blue",
  },
});

const Welcome = ({ navigation }) => {
  const duration = 1000;
  navigateGo = () => navigation.navigate("GamePage");
  vibeGo = () => Vibration.vibrate(duration);
  navigateBundle = () => {
    this.navigateGo();
    this.vibeGo();
  };

  locationGo = () => navigation.navigate("Locations");
  vibeGo = () => Vibration.vibrate(duration);
  locationBundle = () => {
    this.locationGo();
    this.vibeGo();
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to Treasure Hunt</Text>
      <Image
        style={styles.welcomeImage}
        source={require("../assets/welcome.png")}
        resizeMode="contain"
      />
      <Text>
        This is a game for young families to help children understand the world
        around them using maps
      </Text>
      <Button
        style={styles.button}
        title="Locations"
        onPress={() => this.locationBundle()}
      />
      <Button
        style={styles.button}
        title="Go to game page"
        onPress={() => this.navigateBundle()}
      />
    </View>
  );
};
export default Welcome;
