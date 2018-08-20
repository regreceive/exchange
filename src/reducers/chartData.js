import { INIT_DEPTH_DATA, DEPTH_DATA_ADD } from '../actions';

export default (
  state = {
    depthChartData: [],
  },
  { payload, type },
) => {
  switch (type) {
    case INIT_DEPTH_DATA:
      return {
        ...state,
        depthChartData: payload,
      };
    case DEPTH_DATA_ADD:
      return {
        ...state,
        depthChartData: [...state.depthChartData, ...payload],
      };
  }
  return state;
};
