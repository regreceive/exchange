import { INIT_DEPTH_DATA, DEPTH_DATA_ADD } from '../actions';

export function initDepthChart(payload) {
  return {
    type: INIT_DEPTH_DATA,
    payload,
  };
}

export default {
  initDepthChart,
};
