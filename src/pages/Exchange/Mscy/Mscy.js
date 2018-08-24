import React from 'react';
import { Icon } from 'antd';
import './Mscy.css';
const Mscy = () => {
  return (
    <div styleName="coin_detail">
      <div styleName="mod">
        <div styleName="mod_hd">
          <span styleName="mod_show_btn">
            <Icon type="down" />
            <span styleName="mod_detail">币种资料</span>
          </span>
          <a href="#">了解更多</a>
        </div>
        <div styleName="mod_bg">
          <div styleName="left">
            <h3>
              <span>eth</span>{' '}
              <span style={{ color: '#fff', fontSize: 14 }}>
                以太坊（Ethereum
              </span>
            </h3>
            <div styleName="in">
              <span>简介</span>
              <p>
                以太坊（Ethereum）是下一代密码学账本，可以支持众多的高级功能，包括用户发行货币，智能协议，去中心化的交易和设立去中心化自治组织(DAOs)或去中心化自治公司（DACs）。以太坊并不是把每一单个类型的功能作为特性来特别支持，相反，以太坊包括一个内置的图灵完备的脚本语言，允许通过被称为“合同”的机制来为自己想实现的特性写代码。一个合同就像一个自动的代理，每当接收到一笔交易，合同就会运行特定的一段代码，这段代码能修改合同内部的数据存储或者发送交易。
              </p>
            </div>
          </div>
          <div styleName="right">
            <ul>
              <li>
                <span>发行时间</span> <p> 2014-07-24</p>
              </li>
              <li>
                <span>发行总量</span> <p>9631.15 万</p>
              </li>
              <li>
                <span>流通总量</span> <p>9631.15 万</p>
              </li>
              <li>
                <span>众筹价格</span> <p>$0.31 </p>
              </li>
              <li>
                <span>白皮书</span>
                <p>
                  <a
                    href="https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper
                  </a>
                </p>
              </li>
              <li>
                <span>官网</span>
                <p>
                  <a
                    href="https://www.ethereum.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.ethereum.org/
                  </a>
                </p>
              </li>
              <li>
                <span>区块查询</span>
                <p>
                  <a
                    href="https://etherscan.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://etherscan.io/
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mscy;
