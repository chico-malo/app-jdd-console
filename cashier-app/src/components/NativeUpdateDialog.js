import { Text, View } from 'react-native';
import Button from 'reactnativecomponents/Button';
import Dialog from 'reactnativecomponents/Dialog';

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
export default ({visible} = {}) => (
  < Dialog
style = {
{
  flex: 1,
    justifyContent
:
  'center',
    backgroundColor
:
  'rgba(0,0,0,.4)'
}
}
visible = {visible}
  >
  < View
style = {
{
  borderRadius: 10,
    padding
:
  20,
    backgroundColor
:
  'rgba(0,0,0,0.7)',
    margin
:
  15
}
}
>
<
Text
style = {
{
  color: '#FFF',
    marginBottom
:
  20,
    fontSize
:
  17
}
}
>
{
  '发现新版本,请点击立即下载打开浏览器下载并安装新版本.'
}
<
/Text>
< Button
containerStyle = {
{
  backgroundColor: 'transparent'
}
}
onPress = {this.handleDownload
}
type = "primary"
  >
  {lang.mandatoryContinueButtonLabel
}
<
/Button>
< /View>
< /Dialog>
)
;
