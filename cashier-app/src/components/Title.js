import { Text, View } from 'react-native';
import { fontColor, subtitleFontSize, titleFontSize, titleSubtitleSpacing } from '../styles';

const styles = {
  container: {
    flexDirection: 'column'
  },
  title: {
    color: fontColor,
    fontSize: titleFontSize
  },
  subtitle: {
    color: '#7E848E',
    fontSize: subtitleFontSize,
    marginTop: titleSubtitleSpacing
  }
};


/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2017/12/28
 */
export default ({title, subtitle, style, titleStyle, subtitleStyle}) => (
  < View
style = {[styles.container, style
]
}>
<
Text
style = {[styles.title, titleStyle
]
}>
{
  title
}
<
/Text>
< Text
style = {[styles.subtitle, subtitleStyle
]
}>
{
  subtitle
}
<
/Text>
< /View>
)
;
