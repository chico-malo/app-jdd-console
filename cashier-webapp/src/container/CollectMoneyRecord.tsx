import * as React from 'react';
import Component from 'veigar/AbstractComponent';
import { connect } from 'react-redux';
import * as moment from 'moment';
import List from 'veigar/List';

import Common from 'web-common/constants/Common';

import CollectMoneyStatus, { CollectMoneyStatusText } from 'common/constants/CollectMoneyStatus';
import { getPayIcon } from 'common/utils/getPayIcon';
import { lang } from 'common/locale';
import { getActions } from 'common/core/store';

import * as styles from '../styles/CollectMoneyRecord.styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

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

console.log(Status);

/**
 * 收款记录页面
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/7
 */
@connect(({cashier}) => ({
  searchParams: cashier.searchParams,
  processing: cashier.processing,
  page: cashier.page
}))
export default class CollectMoneyRecord extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleSearch();
  }

  handleSearch(searchParams = {}) {
    getActions().cashier.startQuery(searchParams);
  }

  handleLoadMore() {
    const {listLoading, page} = this.props;
    const {last, number} = page;
    if (listLoading || last) {
      return;
    }
    this.handleSearch({
      ...this.props.searchParams,
      page: number + 1
    });
  }

  /**
   * 跳转收款详情
   * @param id 当前收款id
   * @returns {() => any}
   */
  handleClick(id) {
    return () => getActions().navigator.navigate({
      routeName: `CollectMoneyRecordDetail`,
      params: id
    })
  }

  /**
   * 渲染记录
   * @param {any} item 当前数据记录
   * @returns {any}
   */
  renderItem({item}) {
    const status = CollectMoneyStatusText[item.status];
    let statusStyle = {
      color: '#333'
    };
    // 成功
    if (item.status === CollectMoneyStatus.success) {
      statusStyle = {
        color: '#29bb43'
      }
    }
    // 失败
    if (item.status === CollectMoneyStatus.failure) {
      statusStyle = {
        color: '#ff3636'
      }
    }
    // 处理中
    if (item.status === CollectMoneyStatus.processing) {
      statusStyle = {
        color: '#e8ad00'
      }
    }
    return (
      <Grid>
        <ListItem button
                  onClick={this.handleClick(item.id)}
        >
          {getPayIcon(item.businessType)}
          <ListItemText primary={item.merchant.merchantName}
                        secondary={moment(item.actionDate.createAt).format(Common.dateTimeFormat)}
          />
          <Grid style={{
            textAlign: 'right'
          }}>
            <p style={{fontSize: '1.2rem'}}>{`+${item.totalAmount}`}</p>
            <p style={statusStyle}>{status}</p>
          </Grid>
        </ListItem>
        <Divider inset
                 component="p"
        />
      </Grid>
    );
  }

  /**
   * list低栏组件
   * @returns {any}
   */
  renderFooter() {
    const {page, processing} = this.props;
    const {last} = page;
    // 判断是否是最后一页，是否需要加载
    if (last) {
      return <p style={styles.footer}>{'已经到底了'}</p>;
    }
    if (processing) {
      return (
        <div style={styles.footer}>
          <CircularProgress size={20}/>
          {'正在加载中...'}
        </div>
      );
    }
    return null;
  }

  render() {
    const {page} = this.props;
    return (
      <List data={page.content}
            renderItem={this.renderItem}
            renderFooter={this.renderFooter}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={50}
            useBodyScroll
      />
    );
  }
}
