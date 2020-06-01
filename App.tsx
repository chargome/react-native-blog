import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import * as routes from './constants/Routes';
import IndexScreen from './src/screens/IndexScreen';
import ShowScreen from './src/screens/ShowScreen';
import EditScreen from './src/screens/EditScreen';
import CreateScreen from './src/screens/CreateScreen';
import { BlogProvider } from './src/context/BlogContext';

const navigator = createStackNavigator({
  [routes.INDEX_ROUTE]: IndexScreen,
  [routes.SHOW_ROUTE]: ShowScreen,
  [routes.EDIT_ROUTE]: EditScreen,
  [routes.CREATE_ROUTE]: CreateScreen,
}, {
  initialRouteName: routes.INDEX_ROUTE,
  defaultNavigationOptions: {
    title: 'My\'s Blog',
  },
});

const AppContainer = createAppContainer(navigator);

const App = () => (
  <BlogProvider>
    <AppContainer />
  </BlogProvider>
);

export default App;
