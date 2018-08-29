import React from 'react';
import { connect } from 'react-redux';

import { setSymbol, subscribeLatest } from '../../actions/exchangeActions';
import GridView from './Grid/GridView';

@connect()
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.symbol = '';
  }

  componentWillReceiveProps(nextProps) {
    const symbol = nextProps.match.params.symbol;

    if (this.symbol !== symbol) {
      this.symbol = symbol;
      this.props.dispatch(setSymbol(symbol));
      this.props.dispatch(subscribeLatest(symbol));
    }
  }

  // 作为暴露为route的入口组件，会收到多次props更新，已经提取了有用的route的参数到redux中，所以不需要重复渲染
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <GridView />;
  }
}
