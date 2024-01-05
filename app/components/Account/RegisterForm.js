import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../../components/Loading";
import { validateEmail } from "../../utils/validations";
import {size, isEmpty} from "lodash";
import * as firebase from "firebase";
import {useNavigation} from "@react-navigation/native";

export default function RegisterForm(props) {
  console.log(props);
  const {toastRef}=props;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setshowRepeatPassword] = useState(false);
  const [formData, setformData] = useState(defaultFormValue);
  const [loading, setLoading]=useState(false);
  const navigation=useNavigation();

  const onSubmit = () => {
    if(isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repeatPassword)){
      //console.log("Todos los campos son obligatorios...");
      toastRef.current.show("Todos los campos son obligatorios...");
    }
    else if(!validateEmail(formData.email)){
       //console.log("The email is not valid!");
       toastRef.current.show("The email is not valid!");
    }else if(formData.password!==formData.repeatPassword){
      //console.log("Las contraseñas no coinciden...")
      toastRef.current.show("Las contraseñas no coinciden...");
    }else if(size(formData.password)<6){
      //console.log("Las contraseñas deben tener como mínimo 6 caracteres");
      toastRef.current.show("Las contraseñas deben tener como mínimo 6 caracteres");
    }
    else {
      //console.log("ok");
      setLoading(true);
      firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(response=>{
        console.log(response);
        setLoading(false);
        navigation.navigate("account");
      }).catch(err=>{
        //console.log(err);
        setLoading(false);
        toastRef.current.show("Error al crear usuario...");
      });
    }

    console.log(formData);

    console.log(validateEmail(formData.email));
  };

  const onChange = (e, type) => {
    //console.log(type);
    //console.log(e.nativeEvent.text);
    //setformData({ [type]: e.nativeEvent.text });
    setformData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.IconRight}
          ></Icon>
        }
      ></Input>
      <Input
        placeholder="Nombre(s)"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon
            type="material-community"
            name="account"
            iconStyle={styles.IconRight}
          ></Icon>
        }
      ></Input>
      <Input
        placeholder="Apellido Paterno"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon
            type="material-community"
            name="account"
            iconStyle={styles.IconRight}
          ></Icon>
        }
      ></Input>
      <Input
        placeholder="Apellido Materno"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon
            type="material-community"
            name="account"
            iconStyle={styles.IconRight}
          ></Icon>
        }
      ></Input>
      <Input
        placeholder="Teléfono (opcional)"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon
            type="material-community"
            name="phone"
            iconStyle={styles.IconRight}
          ></Icon>
        }
      ></Input>
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "password")}
        password={true}
        secureTextEntry={showRepeatPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.IconRight}
            onPress={() => setshowRepeatPassword(!showRepeatPassword)}
          ></Icon>
        }
      ></Input>
      <Input
        placeholder="Repetir Contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "repeatPassword")}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.IconRight}
            onPress={() => setShowPassword(!showPassword)}
          ></Icon>
        }
      ></Input>
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      ></Button>
      <Loading isVisible={loading} text="Creando cuenta"></Loading>
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  IconRight: {
    color: "#c1c1c1",
  },

  inputForm: {
    width: "100%",
    marginTop: 20,
  },

  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },

  btnRegister: {
    backgroundColor: "#28a745",
  },
});
