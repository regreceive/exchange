import React from 'react';
import { Button } from 'antd';
import './LeftSide.css';

const LeftSide = () => {
  return (
    <div styleName="drawer">
      <strong>市场</strong>
      <div styleName="search_wrap">
        <Button>123</Button>
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
        <div styleName="coin_list">
          <dl>
            <dt />
            <dd>
              <div styleName="coin_unit">
                <div>
                  <span>
                    <em>btc</em>
                  </span>
                  <span>42004.10</span>
                  <span>-4.93%</span>
                </div>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};
export default LeftSide;
