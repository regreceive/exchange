import React from 'react';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import throttle from 'lodash/throttle';

import Exchange from '../../pages/Exchange/';
import history from '../../history';
import { clearession } from '../../actions/globalActions';
import LayoutView from './LayoutView';

@connect(store => {
  return {
    translate: getTranslate(store.locale),
    currentLanguage: getActiveLanguage(store.locale).code,
  };
})
export default class extends React.Component {
  constructor() {
    super();
    this.idleTime = 0;
    this.timeoutEndSession = 90;
    this.intervalIdle = null;
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.resetTimer, { passive: true });
    document.addEventListener('touchstart', this.resetTimer, { passive: true });
    document.addEventListener('keypress', this.resetTimer, { passive: true });
    this.intervalIdle = setInterval(this.checkTimer, 10000);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.resetTimer);
    document.removeEventListener('touchstart', this.resetTimer);
    document.removeEventListener('keypress', this.resetTimer);
    clearInterval(this.intervalIdle);
  }

  checkTimer = () => {
    if (this.idleTime >= this.timeoutEndSession) {
      this.endSession();
    } else {
      this.idleTime++;
    }
  };

  resetTimer = throttle(() => {
    this.idleTime = 0;
  }, 5000);

  endSession() {
    this.props.dispatch(clearSession());
  }

  render() {
    return (
      <LayoutView
        history={history}
        exchange={Exchange}
        currentLanguage={this.props.currentLanguage}
      />
    );
  }
}
