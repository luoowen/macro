import {
    createAppContainer,
  } from 'react-navigation';
  import { createStackNavigator } from 'react-navigation-stack';
  import Login from './Components/Login';
  import Camera from './Components/Camera';
  import Home from './Components/Home';
  import ViewPicture from './Components/ViewPicture';
  import Info from './Components/Info';
  
  const RootStack = createStackNavigator(
    {
      Login: {
        screen: Login,
      },
      Camera: {
        screen: Camera,
      },
      Home: {
        screen: Home,
      },
      ViewPicture: {
        screen: ViewPicture,
      },
      Info: {
        screen: Info,
      },
    },
    {
      initialRouteName: 'Camera'
    }
  );
  
  const RootNavigator = createAppContainer(RootStack);
  
  export default RootNavigator;