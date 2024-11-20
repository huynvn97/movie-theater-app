import React from 'react';

import RootNavigation from './src/navigation/RootNavigation';
import {Provider} from 'react-redux';
import {httpClient, init, stateManagerStore} from 'movie-theater-sdk';
import {API_BASE_URL} from './src/utils/constants';
import Toast from 'react-native-toast-message';

/**
 * * Config SDK
 */
init({
  baseURL: API_BASE_URL,
  // TODO: Need to handle login and save to secure storage
  appToken:
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTgyYzUwNWQ4MzI0MDQxN2Q0NzY2MzhmNmQ0NjY3NyIsIm5iZiI6MTczMTk0NzM3NC4wMjU5NjA0LCJzdWIiOiI2NzNiNmIwMjZhMDJhMjRkN2IyMWFmMzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Sx54NFz2JLToJ23OouVM9kco8vcUXz9ElgHwHr5vZos',
});

/**
 * * Custom sdk client to show error
 */
httpClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      //TODO: Handle Logout
    }

    // * Show error
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.response.data.status_message,
    });
  },
);

function App(): React.JSX.Element {
  return (
    <>
      <Provider store={stateManagerStore}>
        <RootNavigation />
      </Provider>
      <Toast />
    </>
  );
}

export default App;
