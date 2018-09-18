import 'babel-polyfill';
import 'rxjs';

import create from 'reactnativecomponents/SvgIcon/create';
import zhCN from 'moment/locale/zh-cn';
import accounting from 'accounting';
import moment from 'moment/moment';
import { resErrMsg } from './src/locale';
import { setErrMsg } from 'web-common/utils/getErrMsg';

global.createSvgComponent = create;

// moment language
moment.updateLocale('zh-cn', zhCN);
// 想用错误信息
setErrMsg(resErrMsg);
// 货币格式化
accounting.settings.currency.symbol = '￥';

// 使用require 的目标是保证global.createSvgComponent = create;先赋值
require('./src/App');
