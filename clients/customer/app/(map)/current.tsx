import React from "react";
import MapContainer from "../../components/MapContainer";
import { Details, Marker, Region } from "react-native-maps";
import { XStack, Button, YStack, Text } from "tamagui";
import { MapPin, X } from "@tamagui/lucide-icons";
import { Card, Spinner } from "tamagui";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getAddressByLatLng } from "../../services/googleapis/geocode";

export default function CurrentPage() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState("");
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const address = await getAddressByLatLng(
        location.coords.latitude,
        location.coords.longitude
      );
      setAddress(address.results[0].formatted_address);
      setLocation(location);
    })();
  }, []);
  const onRegionChangeComplete = (region: Region, details: Details) => {
    console.log(region);
    console.log(details);
  };

  if (!location) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  const renderBottom = () => {
    return (
      <XStack position="absolute" bottom={0} left={0} right={0}>
        <YStack flex={1} p="$2">
          <Card
            flex={1}
            mb="$2"
            justifyContent="center"
            alignItems="center"
            py="$3"
            px="$4"
          >
            <XStack>
              <MapPin size="$1" />
              <Text ml="$2">{address}</Text>
            </XStack>
          </Card>
          <Button mb={insets.bottom + 8}>Confirm Destination</Button>
        </YStack>
      </XStack>
    );
  };

  return (
    <MapContainer
      renderBottom={renderBottom}
      onRegionChangeComplete={onRegionChangeComplete}
      initialRegion={{
        latitude: location?.coords.latitude || 0,
        longitude: location?.coords.longitude || 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{
          latitude: location?.coords.latitude || 0,
          longitude: location?.coords.longitude || 0,
        }}
      />
    </MapContainer>
  );
}