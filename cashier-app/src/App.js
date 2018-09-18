import Component from 'reactnativecomponents/AbstractComponent';
import { AppRegistry, Linking, StatusBar, Text, View } from 'react-native';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import Dialog from 'reactnativecomponents/Dialog';


import { connect, Provider } from 'react-redux';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';

import codePush from 'react-native-code-push';

import NativeUpdateDialog from './components/NativeUpdateDialog';

import { create as createAppStore } from './core/store';
import routes from './core/routes.config';

import { main } from './styles';

const AppNavigator = StackNavigator(routes);

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('SplashScreen'));

function navReducer(state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
}

// redux store
const store = createAppStore({nav: navReducer});

const addListener = createReduxBoundAddListener('root');

/**
 * APP 程序入口
 * @author Sean(sean.snow@live.com)
 * @date 2017/2/28
 */
@codePush({
  checkFrequency: codePush.CheckFrequency.MANUAL
})
@connect(({nav, root}) => ({
  nav,
  inUpdate: root.inUpdate,
  updateProgress: root.updateProgress,
  nativeUpdate: root.nativeUpdate,
  downloadUrl: root.downloadUrl
}))
class Application extends Component {

  constructor(props) {
    super(props);
    actions.root.startApp();
  }

  componentWillUnmount() {
    actions.root.stopApp();
  }

  handleDownload() {
    const {downloadUrl} = this.props;
    Linking.openURL(downloadUrl);
  }

  render() {
    const {dispatch, nav, inUpdate, updateProgress, nativeUpdate} = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
      addListener
    });

    return (
      < View
    style = {
    {
      flex: 1
    }
  }>
  <
    StatusBar
    backgroundColor = {main}
    barStyle = "light-content"
      / >
      < AppNavigator
    navigation = {navigation}
    />
    < Dialog
    children = {lang.updateProgress(updateProgress)
  }
    loadingDialog
    visible = {inUpdate}
    />
    < NativeUpdateDialog
    visible = {nativeUpdate}
    />
    < /View>
  )
    ;
  }
}

AppRegistry.registerComponent('cashier', () => () => (
  < Provider
store = {store} >
  < Application / >
  < /Provider>
))
;
