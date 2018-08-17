import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Icon } from 'antd';
import './Depth.css';

class Depth extends React.Component {
  getOption = () => {
    return {
      tooltip: {
        confine: true,
        trigger: 'axis',
        axisPointer: { type: 'line', lineStyle: { color: 'rgba(0, 0, 0, 0)' } },
        backgroundColor: '#355475',
        textStyle: { color: '#fff', fontSize: '14px' },
        extraCssText: 'box-shadow: 0 0 16px 0 rgba(0, 0, 0, .2);border-radius: 4px;',
        formatter: function(params) {
          var res = '<div><p>委托价：' + params[0].name + '</p></div>';
          for (var i = 0; i < params.length; i++) {
            if (params[i].data) {
              res += '<p>' + params[i].seriesName + ':' + params[i].data + '</p>';
            }
          }
          return res;
        },
      },
      xAxis: {
        type: 'category',
        // axisLine: { show: false },
        // axisTick: { show: false },
        // axisLabel: { show: false },
        boundaryGap: false,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
      yAxis: [
        {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: '买单',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          showSymbol: false,
          symbolSize: 3,
          sampling: 'average',
          itemStyle: { normal: { color: '#4cc453' } },
          lineStyle: { normal: { color: '#243235' } },
          areaStyle: { color: '#243235' },
          data: [10, 9, 8, 5, 1, 0],
        },
        {
          name: '卖单',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          showSymbol: false,
          symbolSize: 3,
          sampling: 'average',
          itemStyle: { normal: { color: '#e94c4c' } },
          lineStyle: { normal: { color: '#392332' } },
          areaStyle: { color: '#392332' },
          data: [undefined, undefined, undefined, undefined, undefined, 0, 2, 3, 6, 8, 10],
        },
      ],
    };
  };

  render() {
    return (
      <div styleName="depth">
        <div styleName="hd">
          <Icon type="down" />
          <span styleName="depth-info">深度图</span>
        </div>
        <ReactEcharts option={this.getOption()} styleName="depth-echart" />
      </div>
    );
  }
}

export default Depth;
