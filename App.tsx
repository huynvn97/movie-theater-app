import React, {useEffect} from 'react';

import RootNavigation from './src/navigation/RootNavigation';
import {Provider} from 'react-redux';
import {httpClient, init, stateManagerStore} from 'movie-theater-sdk';
import {API_BASE_URL} from './src/utils/constants';

/**
 * * Config SDK
 */
init({baseURL: API_BASE_URL});
httpClient.interceptors.request.use(config => {
  // TODO: in real project, we should get token from storage
  // TODO: in real project, BASE_URL should be from .env
  config.headers.Authorization =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTgyYzUwNWQ4MzI0MDQxN2Q0NzY2MzhmNmQ0NjY3NyIsIm5iZiI6MTczMTk0NzM3NC4wMjU5NjA0LCJzdWIiOiI2NzNiNmIwMjZhMDJhMjRkN2IyMWFmMzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Sx54NFz2JLToJ23OouVM9kco8vcUXz9ElgHwHr5vZos';
  return config;
});

function App(): React.JSX.Element {
  return (
    <Provider store={stateManagerStore}>
      <RootNavigation />
    </Provider>
  );
}

export default App;
