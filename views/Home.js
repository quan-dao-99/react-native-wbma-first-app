import React from 'react';
import { View } from 'react-native';
import List from "../components/List";

const Home = (props) => {
  const {navigation} = props;
  return (
    <View>
      <List navigation={navigation}/>
    </View>
  );
};

export default Home;
