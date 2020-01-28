import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import AuthLoading from "../views/AuthLoading";
import Login from "../views/Login";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home',
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Profile',
      },
    },
  },
  {
    initialRouteName: 'Home',
  }
);

TabNavigator.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName;

  return {
    headerTitle,
  };
};

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        headerMode: 'none', // this will hide the header
      },
    },
    Single: {
      screen: Single,
    },
    Logout: {
      screen: Login,
    },
  },
);

const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: StackNavigator,
    Auth: Login,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(Navigator);
