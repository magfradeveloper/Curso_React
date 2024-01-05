import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text } from "react-native";
import {Icon} from "react-native-elements";
import {firebaseApp} from "../../utils/firebase";
import firebase from "firebase/app";

export default function Negocios(props) {
  const {navigation}=props;
  const [login, setLogin] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      // console.log(userInfo);
      !userInfo ? setLogin(false) : setLogin(true);
      setUser(userInfo);
    });
  }, [])

  // console.log(login);
  
  // if(login!==null){
  //   const usercred=firebase.auth().currentUser;
  //   if(usercred.email==="xoscarmagallon@hotmail.com")
  //     muestra=true;
  //   else
  //    muestra=false;
  // }

  return (
    <View style={styles.viewBody}>
      <Text>Negocios...</Text>
      {user && (
        <Icon
        reverse
        type="material-community"
        name="plus"
        color="#28a745"
        containerStyle={styles.btnContainer}
        onPress={() => 
          navigation.navigate("add-negocio")
        }
      >
      </Icon>
      )}
    </View>
  );
}

const styles=StyleSheet.create({
  viewBody:{
    flex: 1,
    backgroundColor:"#fff",
  },

  btnContainer:{
    position:"absolute",
    bottom:10,
    right:10,
    shadowColor:"#000",
    shadowOffset:{
      width:2,
      height:2
    },
    shadowOpacity:0.5
  }
})
