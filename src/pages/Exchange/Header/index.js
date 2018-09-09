import React from 'react';

import './Header.css';
import Logo from '../assets/logo.svg';

const Index = () => {
  return (
    <div styleName="container">
      <h1 styleName="head-logo">
        <a href="/">
          <Logo />
        </a>
      </h1>
      <ul styleName="head-nav">
        <li>
          <a href="#">法币交易</a>
        </li>
        <li styleName="head-padding" />
        <li styleName="head-user">
          <a href="#">登录</a>
        </li>
        <li styleName="head-user">
          <a href="#">注册</a>
        </li>
      </ul>
    </div>
  );
};

export default Index;
