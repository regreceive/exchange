import React from 'react';
// import { Tabs, Input, Row, Col } from 'antd';
import './LeftSide.css';
// const TabPane = Tabs.TabPane;
// const Search = Input.Search;

const LeftSide = () => {
  return (
    <div styleName="drawer">
      <strong>市场</strong>
      <div styleName="search_wrap">
        <input id="search_keyword" maxLength="7" value="" />
      </div>
      <div styleName="coin_filter">
        <span styleName="cur" action="userfilter" data-filter-key="usdt">
          usdt
        </span>
        <span action="userfilter" data-filter-key="btc">
          btc
        </span>
        <span action="userfilter" data-filter-key="eth">
          eth
        </span>
        <span action="userfilter" data-filter-key="ht">
          ht
        </span>
        {/* <b action="showmarked">
          <i styleName="hb_icon_marked" />
          自选
        </b> */}
      </div>
      <div styleName="coin_table">
        <dl styleName="coin_thead">
          <dt />
          <dd>
            <div styleName="coin_unit">
              <div>
                <span action="usersort" data-sort-key="coin">
                  币种
                </span>
                <span action="usersort" data-sort-key="price">
                  <span id="new_price" data-text="最新价">
                    最新价(CNY)
                  </span>
                </span>
                <span action="usersort" data-sort-key="rate">
                  涨幅
                </span>
              </div>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  );
};
export default LeftSide;
