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

  render() {
    return <GridView />;
  }
}
