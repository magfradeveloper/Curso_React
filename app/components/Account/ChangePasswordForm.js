import React, {useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import {Input, Button} from "react-native-elements";
import {size} from "lodash";
import * as firebase from "firebase";
import {reauthenticate} from "../../utils/api";

export default function ChangePasswordForm(props){
    const {setShowModal}=props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValue());
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e, type) => {
        // console.log(e.nativeEvent.text);
        // console.log(type);
        setFormData({...formData, [type]:e.nativeEvent.text});
    };

    const onSubmit = async () => {
        let isSetErrors=true;
        let errorsTemp={};
        setErrors({});

        console.log(formData);

        if(!formData.password || !formData.newPassword || !formData.repeatNewPassword){
            errorsTemp={
                password:!formData.password ? "*Ingrese la contraseña." : "",
                newPassword:!formData.newPassword ? "*Ingrese la contraseña." : "",
                repeatNewPassword:!formData.repeatNewPassword ? "*Ingrese la contraseña." : "",
            };
        }
        else if(formData.newPassword !== formData.repeatNewPassword) {
            errorsTemp={
                newPassword:"*Las contraseñas son diferentes",
                repeatNewPassword:"*Las contraseñas son diferentes",
            };
        }
        else if(size(formData.newPassword)<6) {
            errorsTemp={
                newPassword:"*La contraseña de debe de tener mínimo 6 caracteres",
                repeatNewPassword:"*La contraseña de debe de tener mínimo 6 caracteres",
            };
        } else{
            setIsLoading(true);
            await reauthenticate(formData.password).then(async () => {
                //console.log("OK...");
                await firebase.auth().currentUser.updatePassword(formData.newPassword).then(() => {
                    isSetErrors=false;
                    setIsLoading(false);
                    setShowModal(false);
                    firebase.auth().signOut();
                }).catch(() => {
                    errorsTemp={
                        other:"Error al actualizar la contraseña"
                    }
                });
            }).catch(() => {
                errorsTemp={
                    password:"*La contraseña no es correcta..."
                }
                setIsLoading(false);
            });
        }
        isSetErrors && setErrors(errorsTemp);
    };

    return (
        <View style={styles.view}>
            {/* <Text>Password</Text> */}
            <Input
                placeholder="Contraseña actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type:"material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color:"#54b4eb",
                    onPress:() => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errors.password}
            ></Input>
            <Input
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type:"material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color:"#54b4eb",
                    onPress:() => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, "newPassword")}
                errorMessage={errors.newPassword}
            ></Input>
            <Input
                placeholder="Repetir nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type:"material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color:"#54b4eb",
                    onPress:() => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, "repeatNewPassword")}
                errorMessage={errors.repeatNewPassword}
            ></Input>
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            ></Button>
            <Text>{errors.other}</Text>
        </View>
    )
}

function defaultValue(){
    return {
        password:"",
        newPassword:"",
        repeatNewPassword:""
    }
}

const styles=StyleSheet.create({
    view:{
        alignItems:"center",
        paddingTop: 10,
        paddingBottom:10
    },

    input:{
        marginBottom: 10,
    },

    btnContainer:{
        marginTop:20,
        width:"95%"
    },

    btn: {
        backgroundColor: "#28a745"
    }
});