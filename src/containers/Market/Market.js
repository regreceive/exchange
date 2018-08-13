import React from 'react';
import { connect } from 'react-redux';

import { getTranslate } from 'react-localize-redux';
import * as marketActions from '../../actions/marketActions';

@connect(store => {
  let searchWord = store.market.configs.searchWord;
  if (typeof searchWord === 'undefined') searchWord = '';

  const currency = store.market.configs.currency.focus;
  const originalTokens = store.market.tokens;
  const sortedTokens = store.market.sortedTokens;
  let listTokens = [];
  const sortKey = store.market.configs.sortKey;
  const sortType = store.market.configs.sortType;

  if (sortedTokens.length > 0) {
    listTokens = sortedTokens;
  } else {
    Object.keys(originalTokens).forEach(key => {
      if (key !== '' && !key.toLowerCase().includes(searchWord.toLowerCase())) return;
      listTokens.push(key);
    });
    if (sortKey === 'market') {
      listTokens.sort(compareString(currency));
    } else if (sortKey !== '') {
      listTokens.sort(compareNum(originalTokens, currency, sortKey));
    }

    if (sortType[sortKey] && sortType[sortKey] === '-sort-desc') {
      listTokens.reverse();
    }
  }

  function compareString(currency) {
    return function(tokenA, tokenB) {
      const marketA = tokenA + currency;
      const marketB = tokenB + currency;
      if (marketA < marketB) return -1;
      if (marketA > marketB) return 1;
      return 0;
    };
  }

  function compareNum(originalTokens, currency, sortKey) {
    return function(tokenA, tokenB) {
      return originalTokens[tokenA][currency][sortKey] - originalTokens[tokenB][currency][sortKey];
    };
  }

  const tokens = listTokens.reduce(function(newOb, key) {
    newOb[key] = originalTokens[key];
    return newOb;
  }, {});

  const data = [];
  Object.keys(tokens).forEach(key => {
    if (key === 'ETH') return;
    let item = tokens[key];
    item.market = key + ' / ' + currency;
    item = { ...item, ...item[currency] };
    data.push(item);
  });

  return {
    translate: getTranslate(store.locale),
    listTokens: listTokens,
    data: data,
    currency: currency,
    tokens: tokens,
    originalTokens: originalTokens,
    searchWord: searchWord,
    sortType: sortType,
  };
})
export default class Market extends React.Component {
  getMoreData = () => {
    this.props.dispatch(marketActions.getMoreData(this.props.listTokens));
  };

  render() {
    console.log(123);
    return <div>123</div>;
  }
}
