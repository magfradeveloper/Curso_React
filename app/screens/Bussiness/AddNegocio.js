import React, {useState, useRef} from "react";
import {StyleSheet, View} from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddNegocioForm from "../../components/Negocios/AddNegocioForm";

export default function AddNegocio(props){
    const {navigation}=props;
    const [isLoading, setIsLoading] = useState(false);
    const toastRef=useRef();

    return(
        <View>
            <AddNegocioForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
            ></AddNegocioForm>
            <Toast ref={toastRef} position="center" opacity={0.9}></Toast>
            <Loading isVisible={isLoading} Text="Creando Negocio"></Loading>
        </View>
    );
}

const styles=StyleSheet.create({

})