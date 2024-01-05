import React, {useState} from "react";
import {StyleSheet, View, ScrollView, Alert, Dimensions} from "react-native";
import {Icon, Avatar, Button, Image, Input} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function AddNegocioForm(props){
    const {toastRef, setIsLoading, navigation} = props;
    const [negocioName, setNegocioName] = useState("");
    const [negocioAddress, setNegocioAddress] = useState("");
    const [negocioPhone, setNegocioPhone] = useState("");
    const [negocioCity, setNegocioCity] = useState("");
    const [negocioState, setNegocioState] = useState("");
    const [negocioDescription, setNegocioDescription] = useState("");
    const [imageSelected, setImageSelected] = useState([]);

    const addNegocio=()=>{
        console.log("Esta es una prueba");
        console.log(imageSelected);
    }

    return(
        <ScrollView style={styles.scrollView}>
            <FormAdd
                setNegocioName={negocioName}
                setNegocioAddress={negocioAddress}
                setNegocioPhone={negocioPhone}
                setNegocioCity={negocioCity}
                setNegocioState={negocioState}
                setNegocioDescription={negocioDescription}
            ></FormAdd>
            <UploadImage toastRef={toastRef} imageSelected={imageSelected} setImageSelected={setImageSelected}></UploadImage>
            <Button
                title="Crear negocio"
                onPress={addNegocio}
                buttonStyle={styles.addNegocio}
            >
            </Button>
        </ScrollView>
    )
}

function FormAdd(props){
    const{setNegocioName, setNegocioAddress, setNegocioPhone, setNegocioCity, setNegocioState, setNegocioDescription}=props;

    return(
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del negocio"
                containerStyle={styles.input}
                onChange={e => setNegocioName(e.nativeEvent.text)}
            >
            </Input>
            <Input
                placeholder="Dirección"
                containerStyle={styles.input}
                onChange={e => setNegocioAddress(e.nativeEvent.text)}
            >
            </Input>
            <Input
                placeholder="Teléfono"
                containerStyle={styles.input}
                onChange={e => setNegocioPhone(e.nativeEvent.text)}
            >
            </Input>
             <Input
                placeholder="Ciudad"
                containerStyle={styles.input}
                onChange={e => setNegocioCity(e.nativeEvent.text)}
            >
            </Input>
             <Input
                placeholder="Estado"
                containerStyle={styles.input}
                onChange={e => setNegocioState(e.nativeEvent.text)}
            >
            </Input>
            <Input
                placeholder="Descripción del negocio"
                multiline={true}
                containerStyle={styles.input}
                inputContainerStyle={styles.textArea}
                onChange={e => setNegocioDescription(e.nativeEvent.text)}
            >
            </Input>
        </View>
    )
}

function UploadImage(props){
    const {toastRef, imageSelected, setImageSelected}=props;
    const imageSelect= async ()=>{
        const resultPermissions=await Permissions.askAsync(
            Permissions.CAMERA
        )

        if(resultPermissions==="denied"){
            toastRef.current.show("Es necesario aceptar los permisos para añadir una foto", 3000);
        }
        else{
            //Abrimos la galería
            const result=await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect: [4,3]
            })

            if(result.cancelled){
                toastRef.current.show("No se ha cargado ninguna foto...", 3000);
            }
            else{
                setImageSelected([...imageSelected, result.uri]);
            }
        }
    }

    return (
        <View
            style={styles.viewImages}
        >
            <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={imageSelect}
            >
            </Icon>
        </View>
    )
}

const styles=StyleSheet.create({
    scrollView:{
        height:"100%",
    },

    viewForm:{
        marginLeft:10,
        marginRight:10
    },

    input:{
        marginBottom:10,
    },

    textArea:{
        height:100,
        width:"100%",
        padding: 0,
        margin:0
    },

    addNegocio:{
        margin:20
    }, 

    viewImages: {
        flexDirection:"row",
        marginLeft:20,
        marginRight:20,
        marginTop:30
    },

    containerIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"
    }
})
