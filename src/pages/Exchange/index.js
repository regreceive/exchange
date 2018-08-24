import React from 'react';
import { connect } from 'react-redux';

import { setCoin, subscribeLatest } from '../../actions/exchangeActions';
import GridView from './Grid/GridView';

@connect()
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.coin = '';
  }

  componentWillReceiveProps(nextProps) {
    const coin = nextProps.match.params.coin;

    if (this.coin !== coin) {
      this.coin = coin;
      this.props.dispatch(setCoin(coin));
      this.props.dispatch(subscribeLatest(coin));
    }
  }

  render() {
    return <GridView />;
  }
}
