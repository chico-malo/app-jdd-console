import Component from 'reactnativecomponents/AbstractComponent';
import { connect } from 'react-redux';
import { SectionList, Text, TouchableHighlight, View } from 'react-native';
import moment from 'moment';

import { isQuickPay } from 'web-common/utils/BusinessUtils';
import quickPay from 'web-common/components/svg/quickPay';
import aliPay from 'web-common/components/svg/aliPay';
import weChatPay from 'web-common/components/svg/weChatPay';
import CollectMoneyStatus from 'web-common/constants/CollectMoneyStatus';
import Common from 'web-common/constants/Common';

import SeparatorComponent from '../components/SeparatorComponent';

import { lang, title } from '../locale';
import * as styles from '../styles/CollectMoneyRecord.styles';
import { iconColor } from '../styles';

const Status = {
  [CollectMoneyStatus.waitPayment]: {
    text: lang.waitPayment,
    style: styles.waitPayment
  },
  [CollectMoneyStatus.processing]: {
    text: lang.processing,
    style: styles.waitPayment
  },
  [CollectMoneyStatus.success]: {
    text: lang.collectMoneySuccess,
    style: styles.paymentComplete
  },
  [CollectMoneyStatus.cancelled]: {
    text: lang.cancelled,
    style: styles.cancelled
  },
  [CollectMoneyStatus.failure]: {
    text: lang.failure,
    style: styles.cancelled
  }
};

/**
 * 收款记录页面
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/7
 */
class CollectMoneyRecord extends Component {

  static navigationOptions = {
    headerTitle: title.collectMoneyRecord
  };

  constructor(props) {
    super(props);
    const {page} = this.props;
    if (page.content.length === 0) {
      this.handleSearch();
    }
  }

  handleRowPress(order) {
    return () => {
      actions.navigator.navigate({
        routeName: routeNames.CollectMoneyRecordDetail,
        params: {
          orderId: order.id
        }
      });
    };
  }

  handleSearch(searchParams = {}) {
    actions.cashier.startQuery(searchParams);
  }

  handleLoadMore() {
    const {
      page: {
        number,
        last
      },
      searchParams,
      processing
    } = this.props;
    if (processing) {
      console.log('正在加载下一页...');
      return;
    }
    if (last) {
      console.log('已经是最后一页了');
      return;
    }
    searchParams.page = number + 1;
    this.handleSearch(searchParams);
  }

  getIcon(businessType) {
    const props = {
      width: 43,
      height: 43
    };
    if (isQuickPay(businessType)) {
      return quickPay({...props, fill: iconColor.quickPay});
    } else if (businessType.startsWith('AliPay')) {
      return aliPay({...props, fill: iconColor.aliPay});
    } else if (businessType.startsWith('WeChat')) {
      return weChatPay({...props, fill: iconColor.weChatPay});
    }
    return null;
  }

  renderItem({item: row, index}) {
    const status = Status[row.status];
    return (
      < TouchableHighlight
    key = {index}
    onPress = {this.handleRowPress(row)
  }
    style = {
    {
      backgroundColor: '#FFF'
    }
  }
  >
  <
    View
    style = {styles.item
  }>
  <
    View
    style = {[styles.itemIcon]} >
      {this.getIcon(row.businessType)
  }
  <
    /View>
    < View
    style = {styles.itemContent
  }>
  <
    View
    style = {styles.itemContentItem
  }>
  <
    Text
    style = {styles.amount
  }>
    {
      `+${row.totalAmount}`
    }
  <
    /Text>
    < Text
    style = {status.style
  }>
    {
      status.text
    }
  <
    /Text>
    < /View>
    < View
    style = {styles.itemContentItem
  }>
  <
    Text
    style = {styles.desc
  }>
    {
      moment(row.actionDate.createAt).format(Common.dateTimeFormat)
    }
  <
    /Text>
    < Text
    style = {styles.desc
  }>
    {
      row.describe
    }
  <
    /Text>
    < /View>
    < /View>
    < /View>
    < /TouchableHighlight>
  )
    ;
  }

  renderSectionHeader({section}) {
    return
  <
    Text
    style = {styles.section
  }>
    {
      section.key
    }
    {
      lang.month
    }
  <
    /Text>;
  }

  render() {
    const {
      page: {
        content
      },
      processing
    } = this.props;

    const sections = [];
    const sectionIndex = {};
    const now = moment();

    content.forEach((order) => {
      order.key = order.id;
      const {createAt} = order.actionDate;
      const createAtDate = moment(createAt);
      let mapKey;
      if (now.format('M') === createAtDate.format('M')) {
        mapKey = lang.this;
      } else {
        mapKey = createAtDate.format('M');
      }
      const index = sectionIndex[mapKey];
      if (index) {
        const {data} = sections[index];
        data.push(order);
      } else {
        sections.push({
          key: mapKey,
          data: [order]
        });
        sectionIndex[mapKey] = `${sections.length - 1}`;
      }
    });
    return (
      < View
    style = {styles.container
  }>
  <
    SectionList
    ItemSeparatorComponent = {SeparatorComponent}
    onEndReached = {this.handleLoadMore
  }
    onRefresh = {this.handleSearch
  }
    refreshing = {processing}
    renderItem = {this.renderItem
  }
    renderSectionHeader = {this.renderSectionHeader
  }
    sections = {sections}
    />
    < /View>
  )
    ;
  }

}

export default connect(({cashier}) => ({
  searchParams: cashier.searchParams,
  processing: cashier.processing,
  page: cashier.page
}))(CollectMoneyRecord);
