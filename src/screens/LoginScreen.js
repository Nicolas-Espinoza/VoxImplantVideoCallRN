import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

import { Voximplant } from 'react-native-voximplant';
import { ACC_NAME, APP_NAME } from '../../src/constants';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //iniciar instancia
    const voximplant = Voximplant.getInstance();
    const navigation = useNavigation();

    //revisar el estado de la conexion
    useEffect(() => {
        const connect = async () => {
            const status = await voximplant.getClientState();
            //Si el estado es desconectado (usando varible de entorno ya del sdk)
            //logged_in
            //console.log('probando la variable de entorno', voximplant.ClientState.DISCONNECTED);
            if (status === 'disconnected') {
                console.log('conectando usuario');
                await voximplant.connect();
            } else if (status === 'logged_in') {
                redirectHome();
            }
        }
        //ejecutamos la funcion
        connect();
    }, []);

    const SignIn = async () => {
        //username@appname.accname.voximplant.com
        //try sirve para possible unhandled promise rejection
        console.log(username);
        try {
            const fqUserName = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
            await voximplant.login(fqUserName, password);

            //luego de loguearnos redireccionamos a la home
            redirectHome();
        } catch (e) {
            console.log(JSON.stringify(e, null, 3));
            Alert.alert(e.name, `Error code: ${e.code}`);
        }

    }

    const redirectHome = () => {
        //reset evita volver a la pantalla de logueo
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'contacts'
                }
            ]
        });
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="usuario"
                onChangeText={setUsername}
                style={styles.input}
                placeholderTextColor={'lightgray'}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="contraseña"
                onChangeText={setPassword}
                style={styles.input}
                placeholderTextColor={'lightgray'}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={SignIn}>
                <Text>Iniciar Sesion</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'stretch',
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        color: 'black',
    },
    button: {
        backgroundColor: 'dodgerblue',
        padding: 10,
        marginVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
    }
});