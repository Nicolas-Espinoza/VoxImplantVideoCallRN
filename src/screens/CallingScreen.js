import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, PermissionsAndroid, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CallControlButtons } from "../components/CallControlButtons";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Voximplant } from 'react-native-voximplant';


const permissions = [
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.CAMERA
]



export const CallingScreen = () => {

    //instancia
    const voximplant = Voximplant.getInstance();

    const [permissionGranted, setPermissionGranted] = useState(false);
    const [callStatus, setCallStatus] = useState('');
    const [localVideoStreamId, setLocalVideoStreamId] = useState('');
    const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const { user, call: incomingCall, IsincomingCall } = route?.params;

    console.log('USUARIO', user.user_name);

    const goBack = () => {
        navigation.pop();
    }

    const call = useRef();
    const endpoint = useRef();

    useEffect(() => {
        //pedir permisos para la call Android
        const getPermisions = async () => {
            const granted = await PermissionsAndroid.requestMultiple(permissions);
            const recordAudioGranted = granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';

            const cameraGranted = granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';

            if (!cameraGranted || !recordAudioGranted) {
                Alert.alert('Sin permisos');
            } else {
                setPermissionGranted(true);
            }
        }
        if (Platform.OS === 'android') {
            getPermisions();
        } else {
            setPermissionGranted(true);
        }
    }, []);

    useEffect(() => {
        //make a call
        if (!permissionGranted) {
            return;
        }

        const callSetting = {
            sendVideo: true,
            receiveVideo: true
        }


        const makeCall = async () => {
            //call(usuario a llamar, settings);
            call.current = await voximplant.call(user.user_name, callSetting);
            subscribeToCallEvents();
        }

        const answerCall = async () => {
            subscribeToCallEvents();
            endpoint.current = call.current.getEndpoints()[0];
            subscribeToEndpointEvent();
            call.current.answer(callSetting);
        }

        const subscribeToCallEvents = () => {
            call.current.on(Voximplant.CallEvents.Failed, callEvent => {
                showError(callEvent.reason);
            });
            call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
                setCallStatus('llamando...');
            });
            call.current.on(Voximplant.CallEvents.Connected, callEvent => {
                setCallStatus('Connected');
            });
            call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
                navigation.navigate('contacts');
            });
            //set video
            call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded, callEvent => {
                setLocalVideoStreamId(callEvent.videoStream.id);
            });
            //set remote video
            call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
                endpoint.current = callEvent.endpoint;
                subscribeToEndpointEvent();
            });
        }

        const subscribeToEndpointEvent = async () => {
            endpoint.current.on(Voximplant.EndpointEvents.RemoteVideoStreamAdded, endpointEvent => {
                setRemoteVideoStreamId(endpointEvent.videoStream.id);
            });
        }

        const showError = (reason) => {
            Alert.alert("Call failed", `Reason : ${reason}`,
                [
                    {
                        text: 'Ok',
                        onPress: navigation.navigate('contacts')
                    }
                ]);
        }

        if (IsincomingCall) {
            answerCall();
        } else {
            makeCall();
        }

        return () => {
            call.current.off(Voximplant.CallEvents.Failed);
            call.current.off(Voximplant.CallEvents.ProgressToneStart);
            call.current.off(Voximplant.CallEvents.Connected);
            call.current.off(Voximplant.CallEvents.Disconnected);
        }
    }, [permissionGranted]);


    const onHangupPress = () => {
        call.current.hangup();
    }

    return (
        <View style={styles.page}>
            <View style={styles.camaraPreview}>
                <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
                    <Icon name="arrow-back-ios" color={'white'} size={35} />
                </TouchableOpacity>
                <Voximplant.VideoView
                    videoStreamId={localVideoStreamId}
                    style={styles.localVideo}
                />
                <Voximplant.VideoView
                    videoStreamId={remoteVideoStreamId}
                    style={styles.remoteVideo}
                />
                <Text style={styles.textName}>{user.user_display_name}</Text>
                <Text style={styles.textPhone}>{callStatus}</Text>
            </View>
            <CallControlButtons onHangupPress={onHangupPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    textName: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 15
    },
    camaraPreview: {
        backgroundColor: '#7b4e80',
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 10
    },
    textPhone: {
        fontSize: 20,
        color: 'white'
    },
    page: {
        height: '100%',
    },
    goBackButton: {
        position: 'absolute',
        left: 0,
        paddingLeft: 14,
        paddingTop: 12
    },
    localVideo: {
        height: 200,
        width: 150,
        // backgroundColor: '#ffff6e',
        position: 'absolute',
        right: 20,
        top: 100,
        borderRadius: 12
    },
    remoteVideo: {
        backgroundColor: '#7b4e80',
        borderRadius: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 100
    }

});