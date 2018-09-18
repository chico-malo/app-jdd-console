import compose from './composeReducer';
import { cashier } from '../constants/ActionTypes';

import Pattern from 'web-common/utils/Pattern';

const DEFAULT_STATE = {
  processing: false,
  inQuickPaySubmit: false,
  inputMoney: '',
  realMoney: 0,
  // 当前收款的参数,用于重复发起交易
  cashierArgs: {},
  // 收款记录分页对象
  page: {
    content: [],
    number: 0,
    totalPages: 0,
    last: true
  },
  details: {
    id: 0,
    businessType: '',
    totalAmount: '',
    actionDate: {
      createAt: 0,
      updateAt: 0
    },
    status: '',
    describe: '',
    remark: '',
    paymentData: '',
    merchant: {
      merchantName: ''
    }
  },
  searchParams: {}
};

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/2
 */
export default compose((state = DEFAULT_STATE, {type, payload = {}}) => {
  switch (type) {
    case cashier.inputMoney: {
      let inputMoney = payload;
      let realMoney = Number.parseFloat(payload);
      if (payload === '') {
        realMoney = 0;
      } else if (!Pattern.currency.test(payload)) {
        inputMoney = state.inputMoney;
        realMoney = state.realMoney;
      }
      return {
        ...state,
        inputMoney,
        realMoney
      };
    }
    case cashier.startQuickPaySubmit: {
      return {
        ...state,
        inQuickPaySubmit: true
      };
    }
    case cashier.quickPaySubmitComponent: {
      return {
        ...state,
        inQuickPaySubmit: false
      };
    }
    case cashier.startCollectMoney: {
      return {
        ...state,
        processing: true
      };
    }
    case cashier.collectMoneyComplete: {
      const {success} = payload;
      return {
        ...state,
        processing: false,
        inputMoney: success ? '' : state.inputMoney,
        realMoney: success ? 0 : state.realMoney
      };
    }
    case cashier.startQuery: {
      return {
        ...state,
        processing: true,
        searchParams: payload
      };
    }
    case cashier.queryComplete: {
      const {success, message} = payload;
      let page = state.page;
      if (success) {
        // 如果查询第一页，清空数据
        if (state.searchParams && (state.searchParams.page || 0) === 0) {
          page = message;
        } else {
          page = {
            ...message,
            content: state.page.content.concat(message.content)
          };
        }
      }
      return {
        ...state,
        page,
        processing: false
      };
    }
    case cashier.getRecordComplete: {
      const {success, message} = payload;
      return {
        ...state,
        details: success ? message : state.details
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
