import io from 'socket.io-client';
import { store } from '../store';
import { initDepthChart } from '../actions/chartData';

let socket = io();

socket.on('connect', () => {
  console.log(`成功连接ws服务器`);
});

socket.on('disconnect', () => {
  console.log('ws服务器失去连接');
});

socket.on('chart:depth', ({ action, msg, data }) => {
  store.dispatch(initDepthChart(data));
});

export default socket;
window.socket = socket;
