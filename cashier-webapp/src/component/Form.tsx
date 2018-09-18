/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/4/26
 */
import * as React from 'react';
import Component from 'veigar/AbstractComponent';
import { StyleRulesCallback, Theme, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';

export interface Props {
  classes?: string,
  fields: any
}

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    paddingTop: '2%',
    paddingBottom: '2%',
    marginTop: theme.spacing.unit * 5,
    background: '#FFF'
  },
  form: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '2%',
    paddingBottom: '2%'
  },
  input: {
    flex: 1,
    color: '#333'
  }
});

type PropsWithStyles = Props & WithStyles<'root' | 'form' | 'input'>

class Form extends Component<PropsWithStyles, ''> {
  /**
   * 渲染表单
   * @param fields
   * @returns {any}
   */
  renderItem(fields) {
    const {classes, inputChange} = this.props;
    return fields.map((value, index) => {
      const {name, error, autoFocus, type, placeholder, helperText, labelIcon, ...other} = value;
      return (
        <Grid alignItems="flex-end"
              className={classes.form}
              container
              item
              key={index}
              justify="center"
        >
          <Grid item
                className={classes.input}
          >
            <TextField {...other}
                       id={name}
                       name={name}
                       fullWidth
                       error={error}
                       autoFocus={autoFocus}
                       required
                       type={type}
                       placeholder={placeholder}
                       helperText={helperText}
                       onChange={inputChange}
                       InputProps={{
                         startAdornment: (
                           <InputAdornment position="start">
                             {labelIcon}
                           </InputAdornment>
                         ),
                       }}
            />
          </Grid>
          {value.after && (
            <Grid item>
              {value.after}
            </Grid>
          )}
        </Grid>
      )
    })
  }

  render() {
    const {classes, fields} = this.props;
    return (
      <FormControl className={classes.root}
                   fullWidth
                   margin="normal"
      >
        {
          this.renderItem(fields)
        }
      </FormControl>
    );
  }
}

export default withStyles(styles)(Form as any);
