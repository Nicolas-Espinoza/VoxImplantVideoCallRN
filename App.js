import React from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { CallingScreen } from './src/screens/CallingScreen';
import { CallScreen } from './src/screens/CallScreen';
import { ContactScreen } from './src/screens/ContactScreen';
import { IncomingCallScreen } from './src/screens/IncomingCallScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigation/navigatorContainer';


const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'light-content'} />
      <Navigation />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    // borderColor: 'red',
    // borderWidth: 2,
    flex: 1,
    backgroundColor: 'white'
  },

});

export default App;