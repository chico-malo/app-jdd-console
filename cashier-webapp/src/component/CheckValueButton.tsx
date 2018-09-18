import * as React from 'react';
import { lang } from 'common/locale';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
export default connect(({sms}) => ({
  countdown: sms.countdown
}))(({countdown, onClick}: any = {}) => (
  <Button disabled={countdown !== 0}
          onClick={onClick}
  >
    {countdown === 0 ? lang.getCheckValue : countdown}
  </Button>
));
