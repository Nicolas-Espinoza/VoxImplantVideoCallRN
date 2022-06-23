import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { CallControlButtons } from "../components/CallControlButtons";

export const CallScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.camaraPreview}>
                <View style={styles.smallCameraPreview} />
            </View>
            <CallControlButtons />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camaraPreview: {
        backgroundColor: '#7b4e80',
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    smallCameraPreview: {
        height: 200,
        width: 150,
        backgroundColor: '#ffff6e',
        position: 'absolute',
        right: 20,
        top: 100,
        borderRadius: 12
    }
});