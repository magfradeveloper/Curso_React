import React, {useState, useEffect, useRef} from "react";
import {StyleSheet, View, Text} from "react-native";
import * as firebase from "firebase";
import {Button} from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [reloadUserInfo, setReloadUserInfo] = useState(false);
  const toastRef=useRef();

  useEffect(() => {
    (async () => {
      const user=await firebase.auth().currentUser;
      setUserInfo(user);
      //console.log(user);
    })()
    setReloadUserInfo(false);
  }, [reloadUserInfo])

  return (
    <View style={styles.viewUserInfo}>
      {userInfo && <InfoUser userInfo={userInfo} toastRef={toastRef} setLoading={setLoading} setLoadingText={setLoadingText}></InfoUser>}
      <AccountOptions userInfo={userInfo} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo}></AccountOptions>
      <Button 
        title="Cerrar sesión" 
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={()=>firebase.auth().signOut()}
      >
      </Button>
      <Toast ref={toastRef} opacity={0.9} position="bottom"></Toast>
      <Loading Text={loadingText} isVisible={loading}></Loading>
    </View>
  );
}

const styles=StyleSheet.create({
  viewUserInfo:{
    minHeight:"100%",
    backgroundColor:"#f2f2f2",
  },

  btnCloseSession:{
    marginTop:30,
    borderRadius:0,
    backgroundColor:"#fff",
    borderTopWidth:1,
    borderTopColor:"#e3e3e3",
    borderBottomWidth:1,
    borderBottomColor:"#e3e3e3",
    paddingTop:10,
    paddingBottom:10
  },

  btnCloseSessionText:{
    color:"#28a745"
  }
})
