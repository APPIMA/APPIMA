/* eslint-disable react/no-array-index-key */
import { View, StyleSheet, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Notifications from 'expo-notifications';
import Device from 'expo-device';
import PropTypes from "prop-types";
import Lectura from "./Lectura";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Lecturas({ sensores, id }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={styles.deviceContainer}>
      <Lectura
        key={`${id}_1`}
        lectura={sensores[0].lectura}
        name={sensores[0].name}
      />
      <Lectura
        key={`${id}_2`}
        lectura={sensores[1].lectura}
        name={sensores[1].name}
      />
      <Lectura
        key={`${id}_3`}
        lectura={sensores[2].lectura}
        name={sensores[2].name}
      />
      <Lectura
        key={`${id}_4`}
        lectura={sensores[3].lectura}
        name={sensores[3].name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  deviceContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: 12,
    paddingLeft: 12,
  },
});

Lecturas.propTypes = {
  id: PropTypes.number.isRequired,
  sensores: PropTypes.array.isRequired,
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return token;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}