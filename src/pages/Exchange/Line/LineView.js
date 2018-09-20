import React from 'react';

import './LineView.css';

export default class extends React.Component {
  static defaultProps = {
    symbol: 'AAPL',
    interval: 'D',
    containerId: 'tv_chart_container',
    datafeedUrl: 'https://demo_feed.tradingview.com',
    libraryPath: '/charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  tvWidget = null;
  componentDidMount() {
    const widgetOptions = {
      symbol: this.props.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
        this.props.datafeedUrl,
      ),
      interval: this.props.interval,
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,

      locale: this.props.currentLanguage,
      disabled_features: [],
      enabled_features: ['study_templates'],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: this.props.studiesOverrides,
      theme: 'Dark',
    };

    const tvWidget = new window.TradingView.widget(widgetOptions);
    this.tvWidget = tvWidget;
  }

  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="header">
          <dl styleName="ticker">
            <dt>
              ETH/BTC
              <span styleName="close">0.044311</span>
            </dt>
            <dd>
              <span>≈ 1959.13 cny</span>
            </dd>
            <dd>
              涨幅
              <span styleName="color_up">+2.84%</span>
            </dd>
            <dd>
              高 <span>0.046368</span>
            </dd>
            <dd>
              低 <span>0.041000</span>
            </dd>
            <dd>
              24H量 <span>132136 ETH</span>
            </dd>
          </dl>
        </div>
        <div id={this.props.containerId} styleName="chart-container" />
      </div>
    );
  }
}
