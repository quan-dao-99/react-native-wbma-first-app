import React from 'react';
import { Image, Text, View } from "react-native";

const Header = () => {
  return (<View>
    <Image style={{width: 400, height: 200}}
           source={{uri: 'https://www.sortra.com/wp-content/uploads/2017/03/homeless-cat-riga001.jpg'}}/>
    <Text style={{position: 'absolute', color: 'white', top: 20, left: 20, fontSize: 20, fontWeight: 'bold'}}>
      Homeless cats
    </Text>
  </View>)
};

export default Header;
