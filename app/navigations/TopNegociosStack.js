import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopNegocios from "../screens/TopNegocios";

const Stack = createStackNavigator();

export default function TopNegociosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="top"
        component={TopNegocios}
        options={{ title: "Top 10" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
