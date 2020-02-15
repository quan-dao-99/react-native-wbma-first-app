import React, { useContext } from 'react';
import { View } from 'native-base';
import List from "../components/List";
import { MediaContext } from "../contexts/MediaContext";
import { deleteFile, getAllMedia } from "../hooks/APIHooks";

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const Home = (props) => {
  const {navigation} = props;
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();
  setMedia(data);

  const deleteFileAndRefresh = async (fileId) => {
    const deleteResponse = await deleteFile(fileId);
    if (deleteResponse.message.includes('deleted')) {
      const response = await fetch(apiUrl + 'media/all');
      const json = await response.json();
      const result = await Promise.all(json.files.map(async (item) => {
        const response = await fetch(apiUrl + 'media/' + item.file_id);
        return await response.json();
      }));
      console.log(result);
      setMedia(result);
      navigation.push('Home');
    }
  };

  return (
    <View>
      <List navigation={navigation} media={media} delete={deleteFileAndRefresh} mode='all'/>
    </View>
  );
};

export default Home;
