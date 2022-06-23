import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export const CallControlButtons = ({ onHangupPress }) => {

    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isMicOn, setIsMicOn] = useState(false);

    const toggleCamera = () => {
        setIsCameraOn(currentValue => !currentValue);
    }

    const toggleMicrophone = () => {
        setIsMicOn(currentValue => !currentValue);
    }

    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.iconButton}>
                <Icon name="flip-camera-ios" size={30} color={'white'} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={toggleCamera}>
                <Icon name={isCameraOn ? "videocam" : "videocam-off"} size={30} color={'white'} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={toggleMicrophone}>
                <Icon name={isMicOn ? "mic" : "mic-off"} size={30} color={'white'} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconCall}
                onPress={onHangupPress}
            >
                <Icon name="call-end" size={30} color={'white'} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#333333',
        padding: 20,
        paddingBottom: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute', //que se independice
        bottom: 0, //le digo que se vaya al fondo
        width: '100%',
    },
    iconButton: {
        backgroundColor: '#4a4a4a',
        padding: 14,
        borderRadius: 50
    },
    iconCall: {
        backgroundColor: 'red',
        padding: 14,
        borderRadius: 50
    },
});