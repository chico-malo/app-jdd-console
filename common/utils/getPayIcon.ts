/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/5
 */
import aliPay from 'web-common/components/svg/aliPay';
import quickPay from 'web-common/components/svg/quickPay';
import weChatPay from 'web-common/components/svg/weChatPay';
import unionPay from 'web-common/components/svg/unionPay';
import unionCloudPay from 'web-common/components/svg/unionCloudPay';
import { isAliPay, isQuickPay, isUnionPay, isUnionScanPay, isWeChatPay } from 'web-common/utils/BusinessUtils';

import { iconColor } from '../styles';

export function getPayIcon(businessType) {
  const props = {
    width: 43,
    height: 43
  };
  if (isQuickPay(businessType)) {
    return quickPay({...props, fill: iconColor.quickPay});
  } else if (isAliPay(businessType)) {
    return aliPay({...props, fill: iconColor.aliPay});
  } else if (isWeChatPay(businessType)) {
    return weChatPay({...props, fill: iconColor.weChatPay});
  } else if (isUnionPay(businessType)) {
    return unionPay({...props, fill: iconColor.unionPay});
  } else if (isUnionScanPay(businessType)) {
    return unionCloudPay({...props, fill: iconColor.unionPay});
  }
  return null;
}
