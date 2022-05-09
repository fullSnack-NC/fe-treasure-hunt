import { getMapsByParkID } from "../utils/api";
import { View, Text, Button } from "react-native";

console.log(getMapsByParkID(1), "<<<");

// age_min: 5;
// est_comp_time: 30;
// length: "1.6";
// map_id: 1;
// map_name: "Roundhay Loop";
// park_id: 1;

const HuntCard = ({ navigation }) => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMapsByParkID()
      .then(({ parks }) => {
        setLocations(parks);
        setIsLoading(false);
        setError(null);
        console.log(parks);
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
    <View>
      {/* <View>Cover image from route/</View>
			<View>Map route</View> */}
      <Text>Amount of stops on route</Text>
      <Text>Length KM</Text>
      <Text>Estimated completion time?</Text>
      <Text>Difficulty/age range?</Text>
      <Text>Buggy friendly/Wheelchair accessible?</Text>
      <Button
        title="Select this Hunt"
        onPress={() => navigation.push("GameLaunchHandover")}
      />
    </View>
  );
};
export default HuntCard;
