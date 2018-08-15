import React from 'react';
import './Order.css';
const Order = () => {
  return (
    <div styleName="Order">
      <div styleName="head">
        <p>
          最新价
          <span id="tickerClose">280.41</span>
          <em styleName="uppercase" lazyfill="<%=quote%>">
            usdt
          </em>
          <span>≈ 1953.05 cny</span>
        </p>
      </div>
    </div>
  );
};
export default Order;
