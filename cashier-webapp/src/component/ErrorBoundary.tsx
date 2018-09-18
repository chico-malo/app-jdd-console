/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/6/4
 */
import * as React from 'react';
import Component from 'veigar/AbstractComponent';
import ErrorPage from '../container/ErrorPage';

export default class ErrorBoundary extends Component<any> {
  constructor(props, content) {
    super(props, content);
    this.state = {hasError: false};
  }

  /**
   * 错误日志
   * @param error
   * @param info
   */
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({hasError: true});
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  /**
   * 内容渲染
   * @returns {*}
   */
  renderChildren() {
    return (
      <div className="errorBackground"/>
    );
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorPage/>
      );
    }
    return this.props.children;
  }
}
