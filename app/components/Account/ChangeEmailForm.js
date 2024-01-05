import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Input, Button} from "react-native-elements";
import * as firebase from "firebase";
import {validateEmail} from "../../utils/validations";
import {reauthenticate} from "../../utils/api";

export default function ChangeEmailForm(props){
    const{email, setShowModal, toastRef, setReloadUserInfo}=props;
    const [formData, setFormData] = useState({defaultValue});
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        setErrors({});
        if(!formData.email || email===formData.email){
            setErrors({
                email:"*El email no es diferente al actual"
            })
        }
        else if(!validateEmail(formData.email)){
            setErrors({
                email:"*El email no es válido"
            })
        } else if(!formData.password){
            setErrors({
                email:"*Ingrese el password"
            })
        }
        else{
            setIsLoading(true);
            //console.log("OK...");
            reauthenticate(formData.password).then(response => {
                firebase.auth().currentUser.updateEmail(formData.email).then(()=>{
                    setIsLoading(false);
                    setReloadUserInfo(true);
                    toastRef.current.show("Email actualizado correctamente.");
                    setShowModal(false);
                }).catch(() => {
                    setErrors({
                        email:"No se pudo llevar a cabo la actualización del email."
                    })
                    setIsLoading(false);
                });
                //console.log(response);
            }).catch(() => {
                setIsLoading(false);
                setErrors({
                    password:"La contraseña no es correcta..."
                })
            })
        }
    }

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    return(
        <View style={styles.view}>
            <Input
                placeholder="Correo electrónico"
                containerStyle={styles.input}
                defaultValue={email || ""}
                rightIcon={{
                    type:"material-community",
                    name:"email-sync",
                    color:"#54b4eb"
                }}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errors.email}
            ></Input>
            <Input
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type:"material-community",
                    name:showPassword ? "eye-off-outline" : "eye-outline",
                    color:"#54b4eb",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errors.password}
            >
            </Input>
            <Button
                title="Actualizar Email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            >
            </Button>
        </View>
    )
}

function defaultValue(){
    return{
        email:"",
        password:""
    }
}

const styles=StyleSheet.create({
    view:{
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10
    },

    input:{
        marginBottom:10
    },

    btnContainer:{
        marginTop:20,
        width:"95%"
    },

    btn:{
        backgroundColor: "#28a745"
    }
})

