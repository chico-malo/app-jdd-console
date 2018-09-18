/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/4/25
 */

/**
 * 判断是否在威信浏览器中使用
 * @author Sean(sean.snow@live.com) createAt 18-2-11
 */
export function isWeChatBrowser() {
  return navigator.userAgent.includes('MicroMessenger');
}

/**
 * 判断是否是在支付宝中使用
 */
export function isAliPayBrowser() {
  return navigator.userAgent.includes('Alipay');
}

/**
 * 判断IPhoneX方法
 * @returns {boolean}
 */
export function isIPhoneX() {
  if (navigator.userAgent.match(/(iPhone)/)) {
    if ((screen.availHeight == 812) && (screen.availWidth == 375)) {
      return true;
    }
  }
  return false;
}
