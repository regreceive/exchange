import React from 'react';
import ReactEcharts from 'echarts-for-react';
import './Chart.css';
import { rawData } from '../../../mockData';

class Chart extends React.Component {
  getOption = () => {
    var upColor = '#00da3c';
    var downColor = '#ec0000';

    function splitData(rawData) {
      var categoryData = [];
      var values = [];
      var volumes = [];
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
      }

      return {
        categoryData: categoryData,
        values: values,
        volumes: volumes,
      };
    }

    function calculateMA(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data.values[i - j][1];
        }
        result.push(+(sum / dayCount).toFixed(3));
      }
      return result;
    }

    var data = splitData(JSON.parse(JSON.stringify(rawData)));

    return {
      legend: {
        bottom: 10,
        left: 'center',
        data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        padding: 10,
        textStyle: {},
        position: function(pos, params, el, elRect, size) {
          var obj = { top: 10 };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
          return obj;
        },
        // extraCssText: 'width: 170px'
      },
      axisPointer: {
        link: { xAxisIndex: 'all' },
        label: {},
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: false,
          },
          brush: {
            type: ['lineX', 'clear'],
          },
        },
      },
      brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
          colorAlpha: 0.1,
        },
      },
      visualMap: {
        show: false,
        seriesIndex: 5,
        dimension: 2,
        pieces: [
          {
            value: 1,
            color: downColor,
          },
          {
            value: -1,
            color: upColor,
          },
        ],
      },
      grid: [
        {
          left: '10%',
          right: '8%',
          height: '70%',
        },
        {
          left: '10%',
          right: '8%',
          top: '63%',
          height: '20%',
        },
      ],
      xAxis: [
        {
          type: 'category',
          data: data.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#21202D',
            },
          },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100,
          },
        },
        {
          type: 'category',
          gridIndex: 1,
          data: data.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax',
        },
      ],
      yAxis: [
        {
          scale: true,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#21202D',
            },
          },
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 98,
          end: 100,
        },
        {
          show: false,
          xAxisIndex: [0, 1],
          type: 'slider',
          top: '85%',
          start: 98,
          end: 100,
        },
      ],
      series: [
        {
          name: 'Dow-Jones index',
          type: 'candlestick',
          data: data.values,
          itemStyle: {
            normal: {
              color: upColor,
              color0: downColor,
              borderColor: null,
              borderColor0: null,
            },
          },
          tooltip: {
            formatter: function(param) {
              param = param[0];
              return [
                'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                'Open: ' + param.data[0] + '<br/>',
                'Close: ' + param.data[1] + '<br/>',
                'Lowest: ' + param.data[2] + '<br/>',
                'Highest: ' + param.data[3] + '<br/>',
              ].join('');
            },
          },
        },
        {
          name: 'MA5',
          type: 'line',
          data: calculateMA(5, data),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: { opacity: 0.5 },
          },
        },
        {
          name: 'MA10',
          type: 'line',
          data: calculateMA(10, data),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: { opacity: 0.5 },
          },
        },
        {
          name: 'MA20',
          type: 'line',
          data: calculateMA(20, data),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: { opacity: 0.5 },
          },
        },
        {
          name: 'MA30',
          type: 'line',
          data: calculateMA(30, data),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: { opacity: 0.5 },
          },
        },
        {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data.volumes,
        },
      ],
    };
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
        <div style={{ height: 500 }}>
          <ReactEcharts notMerge={true} lazyUpdate={true} theme={'theme_name'} option={this.getOption()} />
        </div>
      </div>
    );
  }
}

export default Chart;
