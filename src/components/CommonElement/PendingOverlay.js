import React from 'react';

const PendingOverlay = props => {
  return props.isEnable ? <div id="waiting" class="pending" /> : '';
};
export default PendingOverlay;
