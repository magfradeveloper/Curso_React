import React, {useRef} from "react";
import LoginForm from "../../components/Account/LoginForm"
import { StyleSheet, View, Text, ScrollView, Image, ImageBackground } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

export default function Login() {
  const toastRef=useRef();
  return (
 <ImageBackground source={require("../../../assets/img/fondo.jpg")} resizeMode="cover" style={styles.image}>
    <ScrollView>
      <Image
        source={require("../../../assets/img/Logo_Comercio_Web_Pie.png")}
        resizeMode="contain"
        style={styles.logo}
      ></Image>
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef}></LoginForm>
        <CreateAccount></CreateAccount>
      </View>
      <Divider style={styles.divider}></Divider>
      <Text>Social Login</Text>
      <Toast ref={toastRef} position="center" opacity={0.9}></Toast>
    </ScrollView>
    </ImageBackground>
  );
}

function CreateAccount() {
  const navigation = useNavigation();
  return (
    <Text style={styles.textRegister}>
      ¿Aun no tienes una cuenta?{" "}
      <Text
        onPress={() => navigation.navigate("register")}
        style={styles.btnRegister}
      >
        Regístrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 50,
    marginTop: 20,
  },

  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },

  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },

  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
  },

  divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
  
  image: {
    flex: 1,
    justifyContent: "center"
  }
});
