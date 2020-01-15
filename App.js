import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import List from "./components/List";
import { MediaProvider } from "./contexts/MediaContext";

const App = () => {
  return (
    <MediaProvider>
      <List/>
    </MediaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
