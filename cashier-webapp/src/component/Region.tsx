/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/4/23
 */
import * as React from 'react';
import region from 'web-common/constants/region';
import AbstractFormItem from 'veigar/Form/AbstractFormItem';
import field from 'veigar/Form/field';
import { lang } from 'common/locale';
import { WithStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';


export interface Props {
  classes?: string,
  region: object,
  children: object,
  isOpen: any,
  isClose: any
}

type PropsWithStyles = Props & WithStyles<'container' | 'formControl'>

@field
export default class Region extends AbstractFormItem<PropsWithStyles, any> {

  state;

  constructor(props, context) {
    super(props, context);
    const province = region[0];
    const cities: any = province.children;
    const city = cities[0];
    const counties = city.children;

    this.state = {
      open: false,
      provinces: region,
      cities,
      counties,

      province: 0,
      city: 0,
      county: 0
    };
  }

  handleProvinceChange({target: {value}}) {
    const {provinces} = this.state;
    const province = provinces[value];
    const cities = province.children;
    const city = cities[0];
    const counties = city.children;
    this.setState({
      cities,
      counties,

      province: value,
      city: 0,
      county: 0
    });
  }

  handleCityChange({target: {value}}) {
    const {cities} = this.state;
    const city = cities[value];
    const counties = city.children;

    this.setState({
      counties: counties,

      city: value,
      county: 0
    });
  }

  handleCountyChange({target: {value}}) {
    this.setState({county: value});
  }

  handleOpen() {
    this.setState({open: !this.state.open});
  }

  render() {
    const {...props} = this.props;
    const {provinces, cities, counties, province, city, county} = this.state;
    return (
      <div>
        <Input {...props}
               value={`${Object.values(this.getValue()).join('/')}`}
               onClick={this.handleOpen}
        />
        <Dialog disableBackdropClick
                disableEscapeKeyDown
                fullWidth
                open={this.state.open}
        >
          <DialogTitle style={{padding: 15}}>{'地区选择'}</DialogTitle>
          <DialogContent style={{padding: '0 15px 15px 15px'}}>
            <Grid container
                  justify="space-between"
            >
              <Select value={province}
                      onChange={this.handleProvinceChange}
              >
                {provinces.map((value, index) => (
                  <MenuItem key={index}
                            value={index}
                  >
                    {value.label}
                  </MenuItem>
                ))}
              </Select>
              {cities && cities.length > 0 && (
                <Select value={city}
                        onChange={this.handleCityChange}
                >
                  {cities.map((value, index) => (
                    <MenuItem key={index}
                              value={index}
                    >
                      {value.label}
                    </MenuItem>
                  ))
                  }
                </Select>
              )}
              {counties && counties.length > 0 && (
                <Select value={county}
                        onChange={this.handleCountyChange}
                >
                  {counties.map((value, index) => (
                    <MenuItem key={index}
                              value={index}
                    >
                      {value.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleOpen} color="primary">
              {lang.ok}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  getValue(): any {
    const {
      provinces, province,
      cities, city,
      counties, county
    } = this.state;
    return {
      province: provinces[province].value,
      city: cities[city].value,
      county: counties[county].value
    }
  }

  setValue(value: any): void {
  }

  valid(): boolean {
    return true;
  }
}
