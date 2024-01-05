import React, {useState} from "react";
import {StyleSheet, View, ImageBackground} from "react-native";
import {Input, Button, Icon} from "react-native-elements";
import {isEmpty} from "lodash";
import Loading from "../../components/Loading";
import * as firebase from "firebase";
import {validateEmail} from "../../utils/validations";
import {useNavigation} from "@react-navigation/native";

export default function LoginForm(props){
    const {toastRef}=props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading]=useState(false);
    const navigation=useNavigation();

    const onChange=(e, type)=>{
        setFormData({...formData, [type]: e.nativeEvent.text})
    }
    const onSubmit=()=>{
        if(isEmpty(formData.email) || isEmpty(formData.password)) {
            toastRef.current.show("Todos los campos son obligatorios...");
        }
        else if(!validateEmail(formData.email)){
            toastRef.current.show("El email no es correcto...");
        }
        else{
            setLoading(false);
            //console.log("Ok");
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).then(() => {
                //console.log("Ok");
                setLoading(true);
                navigation.navigate("account");
            }).catch(() =>{
                setLoading(false);
                toastRef.current.show("Email o contraseña incorrecta");
            });
        }
    }

    return(
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
                    >
                    </Icon>
                }
            >
            </Input>
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "password")}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.IconRight}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                    </Icon>
                }
            >
            </Input>
            <Button 
                title="Ingresar"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onSubmit}
            >
            </Button>
            <Loading isVisible={loading} text="Accesando"></Loading>
        </View>
    )
}

function defaultFormValue(){
    return {
        email:"",
        password:""
    }
}

const styles = StyleSheet.create({
    formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },

    inputForm: {
    width: "100%",
    marginTop: 20,
  },

  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },

  btnLogin: {
    backgroundColor: "#28a745",
  },

  IconRight: {
    color: "#fff",
  },
})