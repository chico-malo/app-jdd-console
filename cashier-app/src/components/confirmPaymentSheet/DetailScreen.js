import Component from 'reactnativecomponents/AbstractComponent';
import { Text, View } from 'react-native';
import { lang } from '../../locale';
import * as styles from './styles';
import List from '../List';
import Button from '../Button';
import HeaderCloseButton from './HeaderCloseButton';
import accounting from 'accounting';

/**
 * 支付详情页面
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/10/27
 */
export default class DetailScreen extends Component {

  static navigationOptions = ({screenProps: {onCancel}}) => ({
    title: lang.confirmPayment,
    headerLeft: < HeaderCloseButton
  onPress = {onCancel}
/>,
  headerStyle: styles.header
,
  headerBackTitle: ' '
}
)
;


handlePayment()
{
  const {onPayment, selectModePayment} = this.props.screenProps;
  onPayment({
    modePayment: selectModePayment.type,
    paymentData: selectModePayment.id
  });
}

handleItemPress()
{
  this.props.navigation.navigate('ModePayment');
}

render()
{
  const {totalAmount, describe, selectModePayment} = this.props.screenProps;
  const data = [{
    disabled: true,
    rightArrow: ( < View / >
),
  header: describe.label,
    footer
:
  describe.value
}]
  ;
  if (selectModePayment) {
    data.push({
      header: lang.modePayment,
      footer: selectModePayment.body
    });
  }

  return (
    < View
  style = {styles.bg
}>
<
  Text
  style = {styles.totalAmount
}>
  {
    accounting.formatMoney(totalAmount, '￥')
  }
<
  /Text>
  < List
  data = {data}
  footerTextStyle = {styles.footerTextStyle
}
  headerTextStyle = {styles.headerTextStyle
}
  onItemPress = {this.handleItemPress
}
  />
  < View
  style = {
  {
    flex: 1
  }
}
  />
  < Button
  containerStyle = {styles.paymentNow
}
  onPress = {this.handlePayment
}
>
  {
    lang.paymentNow
  }
<
  /Button>
  < /View>
)
  ;
}
}
