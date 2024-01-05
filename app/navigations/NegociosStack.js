import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Negocios from "../screens/Bussiness/Negocios";
import AddNegocio from "../screens/Bussiness/AddNegocio";

const Stack = createStackNavigator();

export default function NegociosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="negocios"
        component={Negocios}
        options={{ title: "Negocios" }}
      ></Stack.Screen>
      <Stack.Screen
        name="add-negocio"
        component={AddNegocio}
        options={{ title: "Nuevo negocio" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
