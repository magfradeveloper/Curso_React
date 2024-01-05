import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Input, Button} from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayNameFrom(props){
    const {displayName, setShowModal, toastRef, setReloadUserInfo}=props;
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        setError(null);
        if(!newDisplayName){
            setError("Ingrese el nuevo nombre...");
        }else if(displayName===newDisplayName){
            setError("El nombre es igual al actual...");
        }else{
            //console.log("OK...");
            setIsLoading(true);
            const update={
                displayName: newDisplayName
            };
            firebase.auth().currentUser.updateProfile(update).then(() => {
                console.log("OK");
                setShowModal(false);
                setReloadUserInfo(true);
                setIsLoading(false);
            }).catch(() => {
                setError("Error al actualizar el nombre...");
                setShowModal(false);
                setIsLoading(false);
            });
        }
        // console.log(newDisplayName);
    }

    return(
        <View style={styles.view}>
            {/* <Text>Holaaa</Text> */}
            <Input
                placeholder='Nombre y apellidos'
                containerStyle={styles.input}
                rightIcon={{
                    type:"material-community",
                    name:"account-circle",
                    color:"#54b4eb"
                }}
                defaultValue={displayName || ""}
                onChange={e=>setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            ></Input>
            <Button
                title="Actualizar Nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            >
            </Button>
        </View>        
    )
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
});