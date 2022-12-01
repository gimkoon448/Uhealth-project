import * as React from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import moment from "moment";

export default function App() {
  var location1 = 37.2859248;
  var location2 = 127.0594288;
  var count = 0;

  const [pin, setPin] = React.useState({
    latitude: 37.2859248,
    longitude: 127.0594288,
  });
  var currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

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
      var fnum1 = await Location.getCurrentPositionAsync({});

      function alerting(a, b) {
        var a2 = a;
        var b2 = b;
        for (var i = 0; i < 1; i++) {
          if (location1 !== a2 && location2 !== b2) {
          } else {
            setTimeout(() => {
              alert("stop");
            }, 3000);
            location1 = a2;
            location2 = b2;
          }
        }
      }
      // if (count >= 0) {
      //   setTimeout(() => {
      //     alert("danger");
      //   }, 3000);
      // }
      alerting(location.coords.latitude, location.coords.longitude);
      setTimeout(() => {
        alerting(location.coords.latitude, location.coords.longitude);
      }, 3000);
      setTimeout(() => {
        alerting(location.coords.latitude, location.coords.longitude);
      }, 3000);
      setTimeout(() => {
        alerting(location.coords.latitude, location.coords.longitude);
      }, 3000);
      setTimeout(() => {
        alerting(location.coords.latitude, location.coords.longitude);
      }, 3000);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.2859248,
          longitude: 127.0594288,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.0005,
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
            <Text>This is a Callout</Text>
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
