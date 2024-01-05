import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements"; //Importación Modal en React

export default function Loading(props) {
  const { isVisible, text } = props;
  return (
    <Overlay
      isVisible={isVisible}
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#54b4eb"></ActivityIndicator>
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#54b4eb",
    borderWidth: 2,
    borderRadius: 10,
  },

  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#54b4eb",
    textTransform: "uppercase",
    marginTop: 10,
  },
});
