import React from 'react';
import List from "./components/List";
import { MediaProvider } from "./contexts/MediaContext";

const App = () => {
  return (
    <MediaProvider>
      <List/>
    </MediaProvider>
  );
};

export default App;
