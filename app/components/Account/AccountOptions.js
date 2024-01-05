import React, {useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { findIndex, map } from "lodash";
import Modal from "../Modal";
import ChangeDisplayNameForm from "../Account/ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props){
    const {userInfo, toastRef, setReloadUserInfo} = props;
    //console.log(props);

    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    console.log(userInfo);

    const selectedComponent = (key) => {
        console.log(key);
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    ></ChangeDisplayNameForm>
                );
                setShowModal(true);                
                break;
                case "email":
                    setRenderComponent(
                        <ChangeEmailForm
                            email={userInfo.email}
                            setShowModal={setShowModal}
                            toastRef={toastRef}
                            setReloadUserInfo={setReloadUserInfo}
                        ></ChangeEmailForm>
                    // <Text>Cambiando el email...</Text>
                );
                setShowModal(true);                
                break;
                case "password":
                    setRenderComponent(
                        <ChangePasswordForm
                            setShowModal={setShowModal}
                            toastRef={toastRef}
                        ></ChangePasswordForm>
                );
                setShowModal(true);                
                break;
            default:
                setRenderComponent(null);
                setShowModal(false);
                break;
        }
    }

    const menuOptions=generateOptions(selectedComponent);

    return(
        <View>
            {map (menuOptions, (menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft
                        }
                    }
                    rightIcon={{
                        type:menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight
                    }}
                    containerStyle={styles.menuItem}
                    onPress={menu.onPress}
                ></ListItem>
            ))}

            {renderComponent &&
                <Modal isVisible={showModal} setIsVisible={setShowModal}>
                    {renderComponent}
                </Modal>
            }
        </View>
    )
}

function generateOptions(selectedComponent){
    return [
        {
            title:"Cambiar datos personales",
            iconType:"material-community",
            iconNameLeft:"account-circle",
            iconColorLeft:"#54b4eb",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress:() => selectedComponent("displayName")
        },
        {
            title:"Cambiar email",
            iconType:"material-community",
            iconNameLeft:"email-sync",
            iconColorLeft:"#54b4eb",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress:() => selectedComponent("email")
        },
        {
            title:"Cambiar contraseña",
            iconType:"material-community",
            iconNameLeft:"lock-reset",
            iconColorLeft:"#54b4eb",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress:() => selectedComponent("password")
        }
    ]
}

const styles=StyleSheet.create({
    menuItem:{
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
    }
})