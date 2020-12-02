import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/app';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const firebaseConfig = {
    apiKey: "AIzaSyBJkgJx3TVuiXePkpkibGTUidmIbDF82lI",
    authDomain: "cookit-714f6.firebaseapp.com",
    databaseURL: "https://cookit-714f6.firebaseio.com",
    projectId: "cookit-714f6",
    storageBucket: "cookit-714f6.appspot.com",
    messagingSenderId: "195744665965",
    appId: "1:195744665965:web:f23eda55ee447a978aca64",
    measurementId: "G-PVVKQWPRCL",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
