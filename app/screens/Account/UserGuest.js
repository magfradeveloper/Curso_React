import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/user-guest.jpg")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <Text style={styles.title}>Consulta tu perfil</Text>
      <Text style={styles.description}>
        Cómo describirias a tu negocio, busca a los mejores negocios de la
        región, visita, califica y comparte
      </Text>
      <View style={styles.viewBtn}>
        <Button
          title="Ver Perfil"
          buttonStyle={styles.btnStyle}
          containerStyle={styles.containerStyle}
          onPress={() => navigation.navigate("login")}
        ></Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },

  image: {
    height: 300,
    width: "100%",
    marginBottom: 40,
  },

  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },

  description: {
    textAlign: "center",
    marginBottom: 20,
  },

  viewBtn: {
    flex: 1,
    alignItems: "center",
  },

  btnStyle: {
    backgroundColor: "#00a680",
  },

  btnContainer: {
    width: "70%",
  },
});
