import React from 'react';
import RootNavigation from './navigation/RootNavigation';
import { Provider } from 'react-redux'
import store from './store'
import { DefaultTheme ,Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#37c4ad',
    accent: '#37c4ad',
  },
};


export default function App() {

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <RootNavigation />
      </PaperProvider>
    </Provider>
  );
}
