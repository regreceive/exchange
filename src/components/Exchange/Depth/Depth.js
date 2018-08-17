import React from 'react';
import { Icon } from 'antd';
import './Depth.css';
const Depth = () => {
  return (
    <div styleName="depth">
      <div styleName="hd">
        <Icon type="down" />
        <span styleName="depth-info">深度图</span>
      </div>
    </div>
  );
};
export default Depth;
