import React from 'react';
import { connect } from 'react-redux';
import {
  getActiveLanguage,
  getTranslate,
} from 'react-localize-redux/lib/index';

import { subscribeKLine } from '../../../actions/exchangeActions';
import KLineView from './KLineView';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    currentLanguage: getActiveLanguage(store.locale).code,
    symbol: store.exchange.configs.symbol,
    latest: store.exchange.latest,
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
      this.props.dispatch(subscribeKLine(this.symbol));
    }
  }

  componentDidMount() {}

  render() {
    return (
      <KLineView
        translate={this.props.translate}
        // symbol={this.props.symbol}
        currentLanguage={this.props.currentLanguage}
        latest={this.props.latest}
      />
    );
  }
}
