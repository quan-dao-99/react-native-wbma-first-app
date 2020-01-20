import React from 'react';
import List from "./components/List";
import { MediaProvider } from "./contexts/MediaContext";
import Header from './components/Header';

const App = () => {
  return (
    <MediaProvider>
      <Header/>
      <List/>
    </MediaProvider>
  );
};

export default App;
