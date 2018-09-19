import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import { Icon } from 'antd';

import './DepthView.css';

export default class extends React.Component {
  echartsReact = React.createRef();
  echartsInstance = null;

  componentWillReceiveProps(nextProps) {
    this.echartsInstance.setOption(nextProps.depth);
  }

  componentDidMount() {
    this.echartsInstance = this.echartsReact.current.getEchartsInstance();
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="header">
          <Icon type="down" />
          <span>深度图</span>
        </div>
        <ReactEchartsCore
          ref={this.echartsReact}
          echarts={echarts}
          style={{ height: '100%' }}
          option={this.props.depth}
        />
      </div>
    );
  }
}
