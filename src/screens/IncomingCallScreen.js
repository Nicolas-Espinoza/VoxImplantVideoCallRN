import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import bg from '../assets/img/ios_bg.png';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useRoute, useNavigation } from '@react-navigation/native';
import { Voximplant } from "react-native-voximplant";

export const IncomingCallScreen = () => {

    const [caller, setCaller] = useState('');
    const route = useRoute();
    const { call } = route.params;

    const navigation = useNavigation();

    const onDecline = () => {
        call.decline();
    }

    const onAccept = () => {
        navigation.navigate('calling', {
            call,
            IsincomingCall: true
        });
    }

    useEffect(() => {
        setCaller(call.getEndpoint()[0].displayName());

        call.on(Voximplant.CallEvents.Disconnected, callEvent => {
            navigation.navigate('contacts');
        });

        return () => {
            call.off(Voximplant.CallEvents.Disconnected);
        }
    }, []);


    return (
        <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
            <Text style={styles.textName}>{caller}</Text>
            <Text style={styles.textPhone}>video llamada...</Text>
            {/**Iconos */}
            <View style={[styles.row, { marginTop: 'auto' }]}>
                <View style={styles.iconsContainer}>
                    <Icon name="access-alarm" size={30} color={'white'} />
                    <Text style={styles.iconText}>Recordar</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <Icon name="message" size={30} color={'white'} />
                    <Text style={styles.iconText}>Mensaje</Text>
                </View>
            </View>

            {/**iconos cancelar aceptars */}
            {/**call y call-end clear close */}
            <View style={styles.row}>
                <TouchableOpacity style={styles.iconsContainer} onPress={onAccept}>
                    <View style={[styles.buttonCircle, { backgroundColor: '#2e7bff' }]}>
                        <Icon name="check" size={40} color={'white'} />
                    </View>
                    <Text style={styles.iconText}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconsContainer} onPress={onDecline}>
                    <View style={styles.buttonCircle}>
                        <Icon name="clear" size={40} color={'white'} />
                    </View>
                    <Text style={styles.iconText}>Rechazar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>

    )
}
//1:37

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        paddingBottom: 15
    },
    textPhone: {
        fontSize: 20,
        color: 'white'
    },
    textName: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 100,
        marginBottom: 15
    },
    iconsContainer: {
        alignItems: 'center',
        marginVertical: 22
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    iconText: {
        color: 'white',
        marginTop: 12
    },
    buttonCircle: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 50,
        margin: 10
    }
});