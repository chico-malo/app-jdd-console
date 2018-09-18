/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/6/20
 */
import * as React from 'react';
import Loadable from 'react-loadable'
import LinearProgress from '@material-ui/core/LinearProgress';

export interface Props {
}

export class Loading extends React.Component<Props, any> {
  timer;
  state = {
    completed: 0,
    buffer: 10,
  };
  progress = () => {
    const {completed} = this.state;
    if (completed > 100) {
      this.setState({completed: 0, buffer: 10});
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      this.setState({completed: completed + diff, buffer: completed + diff + diff2});
    }
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const {completed, buffer} = this.state;
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
      }}>
        <LinearProgress variant="buffer" value={completed} valueBuffer={buffer}/>
        <br/>
        <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer}/>
      </div>
    );
  }
}

export const LoadableHome = Loadable({
  loader: () => import('../container/App'),
  loading() {
    return <Loading/>
  }
});
