import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import ProcessScreen from '../screens/ProcessScreen';
import ResultScreen from '../screens/ResultScreen';

const AppNagivator = createStackNavigator({
  Home: {
    screen: HomeScreen, navigationOptions: {
      header: null,
    }
  },

  Camera: {
    screen: CameraScreen, navigationOptions: {
      header: null,
    }
  },

  Process: {
    screen: ProcessScreen, navigationOptions: {
      header: null,
    }
  },

  Result: {
    screen: ResultScreen, navigationOptions: {
      header: null,
    }
  },

})

export default createAppContainer(AppNagivator);
