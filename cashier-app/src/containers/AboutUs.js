import Component from 'reactnativecomponents/AbstractComponent';
import { Image, Linking, Platform, Text, View } from 'react-native';

import List from '../components/List';

import logo from '../assets/images/logo.png';

import { lang, title } from '../locale';
import { getLabel } from '../../config';

const items = [{
  body: lang.feedback
}];

if (Platform.OS === 'ios') {
  items.push({
    body: lang.toScore
  });
}

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/7
 */
class AboutUs extends Component {

  static navigationOptions = {
    headerTitle: title.aboutUs
  };

  handlePress(row) {
    if (row.route) {
      actions.navigator.navigate(row.route);
    } else if (row.body === lang.toScore) {
      if (Platform.OS === 'ios') {
        // Linking.openURL('itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=1223889085');
      }
    }
  }

  render() {
    return (
      < View
    style = {styles.container
  }>
  <
    View
    style = {styles.header
  }>
  <
    Image
    source = {logo}
    style = {styles.logo
  }
    />
    < Text
    style = {styles.versionText
  }>
    {
      `${title.app} ${device.versionName}-${getLabel()}`
    }
  <
    /Text>
    < /View>
    < List
    data = {items}
    onItemPress = {this.handlePress
  }
    />
    < View
    style = {styles.footer
  }>
  <
    Text
    style = {styles.rights
  }>
    {
      '️© 2017-2018 Shangfudata.com. All rights reserved.'
    }
  <
    /Text>
    < /View>
    < /View>
  )
    ;
  }

}

export default AboutUs;
