import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux/lib/index';

import DepthView from './DepthView';
import { subscribeDepth } from '../../../actions/exchangeActions';

const option = {
  tooltip: {
    confine: true,
    trigger: 'axis',
    axisPointer: { type: 'line', lineStyle: { color: 'rgba(0, 0, 0, 0)' } },
    backgroundColor: 'rgb(38, 42, 66)',
    padding: 10,
    extraCssText:
      'box-shadow: 0 0 5px 0 rgba(0, 0, 0, .3); border-radius: 4px;',
    transitionDuration: 0,
    formatter([{ value }]) {
      return (
        '<div class="tooltip">' +
        `<span>委托价</span> ${value[0]}` +
        '<br />' +
        `<span>累计</span> ${value[1]}` +
        '</div>'
      );
    },
    position(pt, params, dom, rect) {},
  },
  grid: {
    top: '30px',
    bottom: '20px',
    left: '30px',
    right: '30px',
  },
  xAxis: {
    type: 'value',
    axisLine: {
      onZero: false,
    },
    axisLabel: {
      showMinLabel: false, // 不显示最小刻度
      showMaxLabel: false,
    },
    min: 'dataMin', // 折线从数据最小值显示
    max: 'dataMax',
    splitLine: { show: false },
  },
  yAxis: [
    {
      type: 'value',
      position: 'right',
      axisLine: {
        onZero: false,
      },
      axisLabel: {
        showMaxLabel: false,
      },
      splitLine: { show: false },
    },
  ],
  series: [
    {
      type: 'line',
      symbol: 'circle',
      showSymbol: false,
      sampling: 'average',
      itemStyle: {
        color: 'rgb(12, 152, 247)',
        borderWidth: 8,
        borderColor: 'rgba(12, 152, 247, 0.3)',
      },
      lineStyle: { normal: { color: '#243235' } },
      areaStyle: { color: '#243235' },
      data: [],
    },
    {
      type: 'line',
      symbol: 'circle',
      showSymbol: false,
      symbolSize: 8,
      hoverAnimation: false,
      cursor: 'normal',
      sampling: 'average',
      itemStyle: {
        color: 'rgb(12, 152, 247)',
        borderWidth: 8,
        borderColor: 'rgba(12, 152, 247, 0.3)',
      },
      lineStyle: { normal: { color: '#392332' } },
      areaStyle: { color: '#392332' },
      data: [],
    },
  ],
};

function getOption({ bids, asks }) {
  option.series[0].data = bids;
  option.series[1].data = asks;
  return option;
}

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    depth: store.exchange.depth,
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
      this.props.dispatch(subscribeDepth(this.symbol));
    }
  }

  render() {
    return (
      <DepthView
        translate={this.props.translate}
        depth={getOption(this.props.depth)}
        symbol={this.props.symbol}
      />
    );
  }
}
