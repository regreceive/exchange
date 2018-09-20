import React from 'react';
import { connect } from 'react-redux';
import {
  getActiveLanguage,
  getTranslate,
} from 'react-localize-redux/lib/index';

import { subscribeLine } from '../../../actions/exchangeActions';
import LineView from './LineView';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    currentLanguage: getActiveLanguage(store.locale).code,
    symbol: store.exchange.configs.symbol,
  };
})
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.symbol = '';
  }

  componentWillReceiveProps(nextProps) {
    if (this.symbol !== nextProps.symbol) {
      this.symbol = nextProps.symbol;
      this.props.dispatch(subscribeLine(this.props.symbol));
    }
  }

  componentDidMount() {}

  render() {
    return (
      <LineView
        translate={this.props.translate}
        // symbol={this.props.symbol}
        currentLanguage={this.props.currentLanguage}
      />
    );
  }
}
