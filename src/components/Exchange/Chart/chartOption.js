var upColor1 = '#00da3c';
var downColor1 = '#ec0000';
var upColor = '#589065';
var downColor = '#ae4e54';
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

export default data => ({
  tooltip: {
    trigger: 'axis',
    transitionDuration: 0,
    axisPointer: {
      type: 'cross',
    },
    backgroundColor: 'transparent',
    position: [50, 0],
    formatter(parmas) {
      // let [baseData, MA5, MA10, MA20, MA30] = parmas;
      let [, open, close, lowest, highest] = parmas.find(
        item => item.seriesName === 'main',
      ).data;
      return `开= ${open} 高= ${highest} 低=${lowest} 收=${close}`;
    },
  },
  axisPointer: {
    link: { xAxisIndex: 'all' },
    label: {},
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
        color: downColor1,
      },
      {
        value: -1,
        color: upColor1,
      },
    ],
  },
  grid: [
    {
      left: '10%',
      right: '8%',
      height: '50%',
    },
    {
      left: '10%',
      right: '8%',
      top: '63%',
      height: '16%',
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
      minValueSpan: 14,
    },
  ],
  series: [
    {
      name: 'main',
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
    },
    {
      name: 'MA5',
      type: 'line',
      data: calculateMA(5, data),
      smooth: true,
      showSymbol: false,
      symbol: 'none',
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
      symbol: 'none',
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
      symbol: 'none',
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
      symbol: 'none',
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
});
