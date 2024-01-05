import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
    const {
        userInfo: {uid, photoURL, displayName, email},
        toastRef,
        setLoading,
        setLoadingText
    }=props;
    //const {photoURL}=userInfo;
    const changeAvatar= async () => {
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
        const resultPermissionsCamera=resultPermissions.permissions.camera.status;

        if(resultPermissionsCamera === "denied"){
            toastRef.current.show("Es necesario aceptar de la galería...");
        }
        else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect:[4,3]
            })
            //console.log(result);

            if(result.cancelled){
                toastRef.current.show("Has cerrado la selección de imágenes...");
            } else {
                uploadImage(result.uri).then(() => {
                    //console.log("Imagen subida");
                    updatePhotoUrl();
                }).catch(() => {
                    toastRef.current.show("Ha ocurrido un error al subir la imagen...");
                });
            }
        }

        //console.log(resultPermissionsCamera);
        //console.log("Change Avatar...");
    }

    const uploadImage=async(uri) => {
        setLoadingText("Actualizando foto");
        setLoading(true);
        //console.log(uri);
        const response = await fetch(uri);
        //console.log(JSON.stringify(response));
        const blob=await response.blob();
        //console.log(JSON.stringify(blob));
        const ref=firebase.storage().ref().child(`avatar/${uid}`);
        return ref.put(blob);
    }

    const updatePhotoUrl=()=>{
        firebase.storage().ref(`avatar/${uid}`).getDownloadURL().then(async(response) => {
            //console.log(response);
            const update = {
                photoURL:response
            };
            await firebase.auth().currentUser.updateProfile(update);
            setLoading(false);
        }).catch(() => {
           toastRef.current.show("Ha ocurrido un error al actualizar la foto..."); 
           setLoading(false);
        });
    }

    console.log(photoURL);
    console.log(displayName);
    console.log(email);
    return(
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={
                    photoURL ? {uri:photoURL}:require('../../../assets/img/avatar-default.jpg')
                }
            >
            </Avatar>
            <View>
                <Text style={styles.displayName}>{displayName?displayName:"Anónimo"}</Text>
                <Text>{email?email:"Social Login"}</Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    viewUserInfo:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#f2f2f2",
        paddingTop:30,
        paddingBottom:30
    },

    userInfoAvatar:{
        marginRight: 20
    },

    displayName:{
        fontWeight:"bold",
        paddingBottom: 5
    }
});