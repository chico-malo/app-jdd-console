import { Picker, Text, TouchableOpacity, View } from 'react-native';
import Component from 'reactnativecomponents/AbstractComponent';
import Dialog from 'reactnativecomponents/Dialog';
import { View as AnimatableView } from 'react-native-animatable';
import { Colors, getWindowSize, separatorHeight } from 'reactnativecomponents/styles';
import region from 'web-common/constants/region';


const styles = {
  container: {
    backgroundColor: 'rgba(0,0,0,.4)',
    justifyContent: 'flex-end'
  },
  pickerContainer: {
    backgroundColor: '#fff'
  },
  picker: {
    width: getWindowSize().width / 3
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 15,
    borderBottomWidth: separatorHeight,
    borderColor: Colors.separator,
    backgroundColor: Colors.underlay
  },
  title: {
    color: '#0977FF',
    fontSize: 16,
    maxHeight: 40,
    minWidth: 10
  }
};

const showAnimation = {
  animation: 'fadeIn',
  duration: 200
};
const hideAnimation = {
  animation: 'fadeOut',
  duration: 500
};

const contentShowAnimation = {
  animation: 'fadeInUpBig',
  duration: 500
};
const contentHideAnimation = {
  animation: 'fadeOutDownBig',
  duration: 500
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/26
 */
export default class Region extends Component {

  constructor(props) {
    super(props);

    const province = region[0];
    const cities = province.children;
    const city = cities[0];
    const counties = city.children;
    const county = counties[0];

    this.state = {
      visible: false,
      provinces: region,
      cities,
      counties,
      province: province.value,
      city: city.value,
      county: county.value,
      value: []
    };

  }

  handleProvinceChange(value, index) {
    const {provinces} = this.state;
    const province = provinces[index];
    const cities = province.children;
    const city = cities[0];
    const counties = city.children;
    const county = cities[0];

    this.setState({
      province: province.value,
      cities,
      counties,
      city: city.value,
      county: county.value
    });
  }

  handleCityChange(value, index) {
    const {cities} = this.state;
    const city = cities[index];
    const counties = city.children;
    const county = counties[0];

    this.setState({
      counties: counties,
      city: city.value,
      county: county.value
    });
  }

  handleCountyChange(value) {
    this.setState({county: value});
  }

  handleOpenDialog() {
    this.setState({visible: true});
  }

  handleConfirm() {
    const {form, name} = this.props;
    name && form && form.putFormValue(name, {
      province: this.state.province,
      city: this.state.city,
      county: this.state.county
    });
    this.setState({
      visible: false,
      value: [this.state.province, this.state.city, this.state.county]
    });
  }

  renderHeader() {
    return (
      < View
    style = {styles.header
  }>
  <
    Text > {''} < /Text>
    < Text
    style = {[styles.title,
    {
      fontSize: 18
    }
  ]
  }>
    {
      '省/市/县'
    }
  <
    /Text>
    < TouchableOpacity
    onPress = {this.handleConfirm
  }>
  <
    Text
    style = {styles.title
  }>
    {
      '确定'
    }
  <
    /Text>
    < /TouchableOpacity>
    < /View>
  )
    ;
  }

  render() {
    const {placeholder} = this.props;
    const {provinces, cities, counties, visible, province, city, county, value} = this.state;

    const props = visible ? contentShowAnimation : contentHideAnimation;

    return (
      < TouchableOpacity
    onPress = {this.handleOpenDialog
  }>
    {
      (value && value.length > 0) ? (
        < Text > {value.join('/')
    }<
      /Text>
    ) :
      (
      < Text > {placeholder} < /Text>
    )
    }
  <
    Dialog
    hideAnimation = {hideAnimation}
    showAnimation = {showAnimation}
    style = {styles.container
  }
    visible = {visible}
      >
      < AnimatableView
    {...
      props
    }
    style = {styles.pickerContainer
  }>
    {
      this.renderHeader()
    }
  <
    View
    style = {
    {
      flexDirection: 'row'
    }
  }>
  <
    Picker
    onValueChange = {this.handleProvinceChange
  }
    selectedValue = {province}
    style = {styles.picker
  }
  >
    {
      provinces.map(({label, value}, index) => (
        < Picker.Item
      key = {index}
      label = {label}
      value = {value}
      />
    ))
    }
  <
    /Picker>
    {
      cities && cities.length > 0 && (
      < Picker
      onValueChange = {this.handleCityChange
    }
      selectedValue = {city}
      style = {styles.picker
    }
    >
      {
        cities.map(({label, value}, index) => (
          < Picker.Item
        key = {index}
        label = {label}
        value = {value}
        />
      ))
      }
    <
      /Picker>
    )
    }
    {
      counties && counties.length > 0 && (
      < Picker
      onValueChange = {this.handleCountyChange
    }
      selectedValue = {county}
      style = {styles.picker
    }
    >
      {
        counties.map(({label, value}, index) => (
          < Picker.Item
        key = {index}
        label = {label}
        value = {value}
        />
      ))
      }
    <
      /Picker>
    )
    }
  <
    /View>
    < /AnimatableView>
    < /Dialog>
    < /TouchableOpacity>
  )
    ;

  }

}
