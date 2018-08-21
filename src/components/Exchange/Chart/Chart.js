import React from 'react';
import ReactEcharts from 'echarts-for-react';
import './Chart.css';
import getChartOption from './chartOption';
import { connect } from 'react-redux';

@connect(({ chartData: { depthChartData } }) => {
  return {
    depthChartData,
  };
})
class Chart extends React.Component {
  getOption = () => {
    function splitData(rawData) {
      var categoryData = [];
      var values = [];
      var volumes = [];
      for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        volumes.push([
          i,
          rawData[i][4],
          rawData[i][0] > rawData[i][1] ? 1 : -1,
        ]);
      }

      return {
        categoryData: categoryData,
        values: values,
        volumes: volumes,
      };
    }

    var data = splitData(this.props.depthChartData);

    return getChartOption(data);
  };

  render() {
    return (
      <div styleName="chart">
        <div styleName="hd">
          <dl styleName="ticker_wrap upper" id="ticker_wrap">
            <dt>
              ETH/BTC
              <span styleName="ticker_close">0.044311</span>
            </dt>
            <dd>
              <span id="tickerCny_ticker_bar">≈ 1959.13 cny</span>
            </dd>
            <dd>
              涨幅{' '}
              <span name="rate" styleName="color_up">
                +2.84%
              </span>
            </dd>
            <dd>
              高 <span name="high">0.046368</span>
            </dd>
            <dd>
              低 <span name="low">0.041000</span>
            </dd>
            <dd>
              24H量 <span name="amount">132136 ETH</span>
            </dd>
          </dl>
        </div>
        <ReactEcharts
          style={{ height: '600px', width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
          theme={'theme_name'}
          option={this.getOption()}
        />
      </div>
    );
  }
}

export default Chart;
