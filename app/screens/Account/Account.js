import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as firebase from "firebase";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import Loading from "../../components/Loading";

export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);

      //Equivale a la siguiente sentencia if
      /*if(!user){
        setLogin(false);
      }
      else{
        setLogin(true);
      }*/
    });
  }, []);

  if (login === null)
    return <Loading isVisible={true} text="Cargando"></Loading>;

  return login ? <UserLogged></UserLogged> : <UserGuest></UserGuest>;
}
