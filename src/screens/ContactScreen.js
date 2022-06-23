import React, { useEffect, useState } from "react"
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Dumcontacts from '../assets/data/contacts.json';
import { useNavigation } from '@react-navigation/native';
import { Voximplant } from 'react-native-voximplant';


export const ContactScreen = () => {

    const [search, setSearch] = useState('');
    const [filteredContact, setFilteredContacts] = useState(Dumcontacts);
    const navigation = useNavigation();

    const voximplant = Voximplant.getInstance();

    useEffect(() => {
        const newContact = Dumcontacts.filter(contact =>
            contact.user_display_name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredContacts(newContact);
    }, [search]);

    useEffect(() => {
        voximplant.on(Voximplant.ClientEvents.IncomingCall, (IncomingCallEvent) => {
            navigation.navigate('calling', { call: IncomingCallEvent.call });
        });

        return () => {
            voximplant.off(Voximplant.ClientEvents.IncomingCall);
        }
    }, []);


    const callUser = (user) => {
        navigation.navigate('calling', { user });
    }

    console.log(search)
    return (
        <View style={styles.page}>
            <TextInput
                placeholder="Buscar..."
                placeholderTextColor={'white'}
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                data={filteredContact}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => callUser(item)}>
                            <Text style={styles.contactName}>{item.user_display_name}</Text>
                        </TouchableOpacity>
                    )
                }}
                ItemSeparatorComponent={() => {
                    return <View style={styles.separator} />
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: 15,
        backgroundColor: 'white',
        flex: 1
    },
    contactName: {
        color: 'black',
        fontSize: 16,
        marginVertical: 15,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#f0f0f0'
    },
    searchInput: {
        backgroundColor: 'lightgray',
        padding: 12,
        borderRadius: 20,
        color: 'black',
        borderColor: 'gray',
        borderWidth: 1
    }
});