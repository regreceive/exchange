import React from 'react';
import { connect } from 'react-redux';

import * as exchange from '../../actions/exchangeActions';
import * as user from '../../actions/userActions';
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
      this.props.dispatch(user.getUserdata());
      this.props.dispatch(exchange.setSymbol(symbol));
      this.props.dispatch(exchange.subscribeLatest(symbol));
    }
  }

  // 已经提取了route的参数到redux中，所以不需要重复渲染
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <GridView />;
  }
}
