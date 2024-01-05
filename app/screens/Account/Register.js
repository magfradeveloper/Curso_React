import React, {useRef} from "react";
import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import RegisterForm from "../../components/Account/RegisterForm";

export default function Register() {
  const toastRef=useRef();

  return (
    <KeyboardAwareScrollView>
      <View>
        <Image
          source={require("../../../assets/img/Logo_Comercio_Web_Pie.png")}
          resizeMode="contain"
          style={styles.logo}
        ></Image>
        <View style={styles.viewForm}>
          <RegisterForm toastRef={toastRef}></RegisterForm>
        </View>
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} duration={5000}></Toast>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 50,
    marginTop: 20,
  },

  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
