import { backgroundColor, isIphoneX, main } from './index';

/**
 * @author Sean(sean.snow@live.com)
 * @date 2017/2/28
 */
export default {
  container: {
    flex: 1,
    backgroundColor,
    paddingTop: isIphoneX ? 22 : 0
  },
  form: {
    backgroundColor: '#FFF'
  },
  forgotPassword: {
    justifyContent: 'flex-end',
    marginTop: 10,
    marginRight: 15
  },
  btn: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  },
  loginBtn: {
    backgroundColor: main
  },
  input: {
    borderWidth: 0,
    marginLeft: -10
  }
};

