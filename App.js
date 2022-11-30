import * as React from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import moment from "moment";

export default function App() {
  const [pin, setPin] = React.useState({
    latitude: 37.4604956,
    longitude: 127.1650932,
  });
  var currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setTimeout(() => {
        alert("WARNING!");
      }, 10000);
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.4604956,
          longitude: 127.1650932,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          console.log(
            "onUserLocationChange",
            e.nativeEvent.coordinate,
            currentDate
          );
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        <Marker
          coordinate={pin}
          title="test title"
          description="test description"
          pinColor="gold"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            console.log("Drag End", e.nativeEvent.coordinate);

            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>I am here!!</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={100} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
