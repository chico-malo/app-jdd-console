import AboutUs from '../containers/AboutUs';
import CollectMoney from '../containers/CollectMoney';
import CollectMoneyRecord from '../containers/CollectMoneyRecord';
import CollectMoneyRecordDetail from '../containers/CollectMoneyRecordDetail';
import ForgotPassword from '../containers/ForgotPassword';
import Home from '../containers/Home';
import Login from '../containers/Login';
import ModifyPassword from '../containers/ModifyPassword';
import Register from '../containers/Register';
import RegisterSecondStep from '../containers/RegisterSecondStep';
import Settings from '../containers/Settings';
import SplashScreen from '../containers/SplashScreen';

import { headerStyle, tintColor, titleStyle } from '../styles';

/**
 * @author Sean(sean.snow@live.com)
 * @date 2017/3/1
 */
const routes = {
  AboutUs,
  CollectMoney,
  CollectMoneyRecord,
  CollectMoneyRecordDetail,
  ForgotPassword,
  Home,
  Login,
  ModifyPassword,
  Register,
  RegisterSecondStep,
  Settings,
  SplashScreen
};

function setDefaultOptions(navigationOptions) {

  if (!navigationOptions) {
    return {
      header: null
    };
  }

  const options = {...navigationOptions};

  options.headerStyle = [headerStyle, navigationOptions.headerStyle];

  if (!navigationOptions.headerTitleStyle) {
    options.headerTitleStyle = titleStyle;
  }
  if (!navigationOptions.headerTintColor) {
    options.headerTintColor = tintColor;
  }

  return options;
}

function navigationOptionsProxy(navigationOptions) {
  return (props) => {
    const options = navigationOptions && navigationOptions(props);
    return setDefaultOptions(options);
  };
}

const routeConfigs = {};

Object.keys(routes).forEach(routeName => {
  const Screen = routes[routeName];
  if (typeof Screen.navigationOptions === 'function') {
    Screen.navigationOptions = navigationOptionsProxy(Screen.navigationOptions);
  } else {
    Screen.navigationOptions = setDefaultOptions(Screen.navigationOptions);
  }

  routeConfigs[routeName] = {
    screen: Screen,
    path: Screen.path
  };
});

export default routeConfigs;
