import React from 'react';
import { View } from 'native-base';
import List from "../components/List";
import { getCurrentUserFiles } from "../hooks/APIHooks";

const MyFiles = (props) => {
  const {navigation} = props;
  const [userFiles] = getCurrentUserFiles();

  return (
    <View>
      <List navigation={navigation} media={userFiles}/>
    </View>
  );
};

export default MyFiles;
