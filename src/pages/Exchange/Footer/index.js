import React from 'react';
import logo from '../assets/logo.svg';
import './Footer.css';
const Footer = () => {
  return (
    <div styleName="footer">
      <div styleName="foot-wrap">
        <dl>
          <dt>
            <img src={logo} alt="" />
          </dt>
          <dd>
            <p>全球领先的数字资产交易平台</p>
          </dd>
          <dd>
            <div />
          </dd>
          <dd styleName="copyright">© 2013-2018 Huobi Global</dd>
        </dl>
        <dl>
          <dt>
            <h2>服务</h2>
          </dt>
          <dd>
            <a href="https://www.huobi.cn" target="_blank">
              火币资讯
            </a>
          </dd>
          <dd>
            <a href="https://www.huobipool.com/#!/community?lang=zh-cn" target="_blank">
              火币矿池
            </a>
          </dd>
          <dd>
            <a href="/zh-cn/topic/eco/" target="_blank">
              火币生态
            </a>
          </dd>
          <dd>
            <a href="/zh-cn/capital/" target="_blank">
              火币资本
            </a>
          </dd>
          <dd>
            <a href="/zh-cn/institution/" target="_blank">
              机构账户
            </a>
          </dd>
        </dl>
      </div>
    </div>
  );
};
export default Footer;
