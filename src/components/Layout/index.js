import React from 'react';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import throttle from 'lodash/throttle';

import Exchange from '../../pages/Exchange/';
import constant from '../../services/constants';

import history from '../../history';
import { clearSession, changeLanguage } from '../../actions/globalActions';
import { openInfoModal } from '../../actions/utilActions';
import LayoutView from './LayoutView';

import Language from 'lang/index';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    locale: store.locale,
    currentLanguage: getActiveLanguage(store.locale).code,
  };
})
export default class extends React.Component {
  constructor() {
    super();
    this.idleTime = 0;
    this.timeoutEndSession = constant.IDLE_TIME_OUT / 10; // x10 seconds
    this.intervalIdle = null;
  }

  componentWillMount() {
    document.onload = this.resetTimer;
    document.onmousemove = this.resetTimer;
    document.onmousedown = this.resetTimer; // touchscreen presses
    document.ontouchstart = this.resetTimer;
    document.onclick = this.resetTimer; // touchpad clicks
    document.onscroll = this.resetTimer; // scrolling with arrow keys
    document.onkeypress = this.resetTimer;

    // this.intervalIdle = setInterval(this.checkTimmer.bind(this), 10000);
  }

  checkTimmer() {
    if (!this.props.account.account) return;
    if (this.props.utils.infoModal && this.props.utils.infoModal.open) return;
    if (this.idleTime >= this.timeoutEndSession) {
      const timeOut = constant.IDLE_TIME_OUT / 60;
      const titleModal = this.props.translate('error.time_out') || 'Time out';
      const contentModal =
        this.props.translate('error.clear_data_timeout', { time: timeOut }) ||
        `We've cleared all your data because your session is timed out ${timeOut} minutes`;
      this.props.dispatch(openInfoModal(titleModal, contentModal));
      this.endSession();
    } else {
      this.idleTime++;
    }
  }

  resetTimer = throttle(this.doResetTimer.bind(this), 5000);

  doResetTimer() {
    this.idleTime = 0;
  }

  endSession() {
    this.props.dispatch(clearSession());
  }

  setActiveLanguage = language => {
    this.props.dispatch(
      changeLanguage(this.props.ethereumNode, language, this.props.locale),
    );
  };

  render() {
    return (
      <LayoutView
        history={history}
        exchange={Exchange}
        supportedLanguages={Language.supportLanguage}
        setActiveLanguage={this.setActiveLanguage}
        currentLanguage={this.props.currentLanguage}
      />
    );
  }
}
