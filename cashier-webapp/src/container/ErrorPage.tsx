/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/5/17
 */
import * as React from 'react';
import AbstractComponent from 'veigar/AbstractComponent';
import { getActions } from 'common/core/store';
import Grid from '@material-ui/core/Grid';

export interface Props {
}

class ErrorPage extends AbstractComponent<Props> {
  render() {
    return (
      <Grid container
            direction="column"
            justify="flex-end"
            style={{minHeight: '100vh'}}
      >
        <img src={require('../assets/404.png')}
             style={{
               width: '100%'
             }}
             onClick={() => getActions().navigator.back()}
        />
      </Grid>
    )
  }
}

export default ErrorPage;
