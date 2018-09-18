import { title } from 'common/locale';
// import App from '../container/App';
import BankCard from '../container/BankCard';
import BankCardProfile from '../container/BankCardProfile';
import CollectMoney from '../container/CollectMoney';
import CollectMoneyRecord from '../container/CollectMoneyRecord';
import CollectMoneyRecordDetail from '../container/CollectMoneyRecordDetail';
import ForgotPassword from '../container/ForgotPassword';
import Home from '../container/Home';
import Login from '../container/Login';
import { LoadableHome } from '../component/Loading';
import MerchantSettlement from '../container/MerchantSettlement';
import Register from '../container/Register';
import RegisterSecondStep from '../container/RegisterSecondStep';
import MerchantService from '../container/MerchantService';
import MerchantBusiness from '../container/MerchantBusiness';
import MerchantBusinessProfile from '../container/MerchantBusinessProfile';

export default [{
  path: '/',
  component: LoadableHome
}, {
  path: '/BankCard',
  component: BankCard,
  title: title.bankCard
}, {
  path: '/BankCardProfile',
  component: BankCardProfile,
  title: title.BankCardProfile
}, {
  path: '/CollectMoney',
  component: CollectMoney,
  title: title.collectMoney
}, {
  path: '/CollectMoneyRecord',
  component: CollectMoneyRecord,
  title: title.collectMoneyRecord
}, {
  path: '/CollectMoneyRecordDetail',
  component: CollectMoneyRecordDetail,
  title: title.collectMoneyRecordDetail
}, {
  path: '/ForgotPassword',
  component: ForgotPassword,
  title: title.modifyPassword
}, {
  path: '/Home',
  component: Home,
  title: title.app,
}, {
  path: '/Login',
  component: Login,
  title: title.login
}, {
  path: '/MerchantSettlement',
  component: MerchantSettlement,
  title: title.updateSettle
}, {
  path: '/MerchantService',
  component: MerchantService,
  title: title.merchantService
}, {
  path: '/MerchantBusiness',
  component: MerchantBusiness,
  title: title.merchantBusiness
}, {
  path: '/MerchantBusinessProfile',
  component: MerchantBusinessProfile,
  title: title.merchantBusiness
}, {
  path: '/Register',
  component: Register,
  title: title.register
}, {
  path: '/RegisterSecondStep',
  component: RegisterSecondStep,
  title: title.registerSecondStep
}];
