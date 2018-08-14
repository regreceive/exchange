import React from 'react';
import './Notice.css';
const Notice = () => {
  return (
    <div styleName="sidebar_notice">
      <div styleName="tit">
        <a href="#">公告</a>
      </div>
      <div styleName="in">
        <ul id="notice_list">
          <li data-href-id="">
            <a href="#" target="_blank" rel="noopener noreferrer">
              Hadax 2.0正式规则及第一期的具体安排
            </a>
            2018-08-13 17:22:48
          </li>
          <li data-href-id="">
            <a href="#" target="_blank" rel="noopener noreferrer">
              关于火币公链领袖投票第一轮上半轮激励发放的公告
            </a>
            2018-08-13 11:05:28
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Notice;
