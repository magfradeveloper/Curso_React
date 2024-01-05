import React from "react";
import {YellowBox} from "react-native";
import {LogBox} from "react-native";
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/utils/firebase";
import * as firebase from "firebase";

//YellowBox.ignoreWarnings(["Setting a timer", "expo-permissions", "It appears that you are using old version of react-navigation library"]);
LogBox.ignoreLogs(['Warning: ...']);

export default function App() {
  return <Navigation></Navigation>;
}
