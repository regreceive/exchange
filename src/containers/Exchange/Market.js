import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';

import { changeSearchWord, changeCoin } from '../../actions/marketActions';
import MarketView from '../../components/Exchange/Market/MarketView';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    tokens: store.tokens,
  };
})
export default class Layout extends React.Component {
  searchHandle = evt => {
    this.props.dispatch(changeSearchWord(evt.target.value));
  };

  changeCoin = value => () => {
    this.props.dispatch(changeCoin(value));
  };

  render() {
    return (
      <MarketView
        translate={this.props.translate}
        searchHandle={this.searchHandle}
        changeCoin={this.changeCoin}
        tokens={this.props.tokens}
      />
    );
  }
}
