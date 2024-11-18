import React from 'react';

import RootNavigation from './src/navigation/RootNavigation';
import {Provider} from 'react-redux';
import {stateManagerStore} from 'movie-theater-sdk';

function App(): React.JSX.Element {
  return (
    <Provider store={stateManagerStore}>
      <RootNavigation />
    </Provider>
  );
}

export default App;
