// in this package, all number are in 18 decimals precision

import BigNumber from 'bignumber.js';
import constants from '../services/constants';

export function calculateMinAmount(source, rate) {
  const bigSource = new BigNumber(source);
  const bigRate = new BigNumber(rate);
  if (
    bigSource === 'NaN' ||
    bigSource === 'Infinity' ||
    acceptableTyping(source) ||
    bigRate === 'NaN' ||
    bigRate === 'Infinity' ||
    acceptableTyping(rate)
  ) {
    return '0';
  }
  return bigSource.times(bigRate).div(1000000000000000000);
}

export function calculateDest(source, rate) {
  //console.log({source, rate})
  if (isNaN(source) || source === '') {
    source = 0;
  }
  const bigSource = new BigNumber(source);
  const bigRate = new BigNumber(rate);
  if (
    bigSource === 'NaN' ||
    bigSource === 'Infinity' ||
    acceptableTyping(source) ||
    bigRate === 'NaN' ||
    bigRate === 'Infinity' ||
    acceptableTyping(rate)
  ) {
    return '0';
  }
  return bigSource.times(bigRate).div(1000000000000000000);
}

export function caculateSourceAmount(destAmount, offeredRate, precision) {
  console.log({ destAmount, offeredRate, precision });
  if (
    !destAmount ||
    !offeredRate ||
    acceptableTyping(destAmount) ||
    acceptableTyping(offeredRate)
  ) {
    return '0';
  }
  let bigOfferedRate = new BigNumber(offeredRate);

  if (bigOfferedRate.comparedTo(0) === 0) {
    return '';
  }

  const bigDest = new BigNumber(destAmount);
  bigOfferedRate = bigOfferedRate.div(1000000000000000000);
  const result = bigDest.div(bigOfferedRate);
  if (precision) {
    return result.toFixed(precision);
  } else {
    return result.toString();
  }
}

export function caculateDestAmount(sourceAmount, offeredRate, precision) {
  if (
    !sourceAmount ||
    !offeredRate ||
    acceptableTyping(sourceAmount) ||
    acceptableTyping(offeredRate)
  ) {
    return '0';
  }
  const bigSource = new BigNumber(sourceAmount);
  let bigOfferedRate = new BigNumber(offeredRate);

  bigOfferedRate = bigOfferedRate.div(1000000000000000000);
  const result = bigSource.times(bigOfferedRate);
  if (precision) {
    return result.toFixed(precision);
  } else {
    return result.toString();
  }
}

export function calculateRate(source, dest) {
  const bigSource = new BigNumber(source);
  const bigDest = new BigNumber(dest);
  if (
    bigSource === 'NaN' ||
    bigSource === 'Infinity' ||
    acceptableTyping(source) ||
    bigDest === 'NaN' ||
    bigDest === 'Infinity' ||
    acceptableTyping(dest)
  ) {
    return '0';
  }
  return bigDest.times(1000000000000000000).div(bigSource);
}

export function caculateEthBalance(token) {
  if (token.symbol.toLowerCase() === 'eth') {
    return token.balance;
  } else {
    const rateBig = new BigNumber(token.rate);
    const balanceBig = new BigNumber(token.balance);
    //var weiParam = new BigNumber(10)
    const balanceToken = balanceBig.div(Math.pow(10, token.decimal));

    const balanceEth = balanceToken.times(rateBig);
    return balanceEth.toString();
  }
}

export function shortEthBalance(tokens) {
  let shortedTokens = [];
  let removedEth = { ...tokens };
  delete removedEth[constants.ETH.symbol];
  if (tokens) {
    shortedTokens = Object.values(removedEth).sort((a, b) => {
      const balanceEthA = new BigNumber(caculateEthBalance(a));
      const balanceEthB = new BigNumber(caculateEthBalance(b));
      return balanceEthB.minus(balanceEthA);
    });
  }
  if (tokens[constants.ETH.symbol]) {
    shortedTokens.unshift(tokens[constants.ETH.symbol]);
  }
  return shortedTokens;
}

export function shortASCEthBalance(tokens) {
  let shortedTokens = [];
  let removedEth = { ...tokens };
  delete removedEth[constants.ETH.symbol];
  if (tokens) {
    shortedTokens = Object.values(removedEth).sort((a, b) => {
      const balanceEthA = new BigNumber(caculateEthBalance(a));
      const balanceEthB = new BigNumber(caculateEthBalance(b));
      return balanceEthA.minus(balanceEthB);
    });
  }
  if (tokens[constants.ETH.symbol]) {
    shortedTokens.unshift(tokens[constants.ETH.symbol]);
  }
  return shortedTokens;
}

function acceptableTyping(number) {
  // ends with a dot
  // if (number.length > 0 && number[number.length - 1] == ".") {
  //   return true
  // }

  // zero suffixed with real number
  // if (number.length > 0 && number[number.length - 1] == "0") {
  //   for (var i = 0; i < number.length; i++) {
  //     if (number[i] == ".") {
  //       return true
  //     }
  //   }
  // }
  return false;
}

export function toTWei(number, decimal = 18) {
  //console.log({number, decimal})
  const bigNumber = new BigNumber(number.toString());
  if (bigNumber === 'NaN' || bigNumber === 'Infinity') {
    return number;
  } else if (acceptableTyping(number)) {
    return number;
  } else {
    return bigNumber.times(Math.pow(10, decimal)).toFixed(0);
  }
}

export function gweiToWei(number) {
  if (number === '' || isNaN(number)) {
    return '0';
  }
  const bigNumber = new BigNumber(number.toString());
  if (bigNumber === 'NaN' || bigNumber === 'Infinity') {
    return number;
  } else if (acceptableTyping(number)) {
    return number;
  } else {
    return bigNumber.times(1000000000).toString();
  }
}

export function gweiToEth(number) {
  if (number === '' || isNaN(number)) {
    return '0';
  }
  const bigNumber = new BigNumber(number.toString());
  if (bigNumber === 'NaN' || bigNumber === 'Infinity') {
    return number;
  } else if (acceptableTyping(number)) {
    return number;
  } else {
    return bigNumber.div(1000000000).toString();
  }
}

export function weiToGwei(number) {
  const bigNumber = new BigNumber(number);
  if (bigNumber === 'NaN' || bigNumber === 'Infinity') {
    return number;
  } else if (acceptableTyping(number)) {
    return number;
  } else {
    return bigNumber.div(1000000000).toString();
  }
}

export function toT(number, decimal, round) {
  const bigNumber = new BigNumber(number.toString());
  let result;
  if (bigNumber === 'NaN' || bigNumber === 'Infinity') {
    return number;
  } else if (acceptableTyping(number)) {
    return number;
  }
  if (decimal) {
    result = bigNumber.div(Math.pow(10, decimal));
  } else {
    result = bigNumber.div(1000000000000000000);
  }
  if (round) {
    return result.toFixed(round);
  } else {
    return result.toString();
  }
}

export function convertSellRate(rate) {
  const bigNumber = new BigNumber(rate.toString());
  const result = bigNumber.div(Math.pow(10, 18));
  return result.toString();
}

export function convertBuyRate(rate) {
  const bigNumber = new BigNumber(rate.toString());
  let result = bigNumber.div(Math.pow(10, 18));
  const zero = new BigNumber(0);
  if (result.comparedTo(zero) !== 0) {
    const oneNumber = new BigNumber(1);
    result = oneNumber.div(result);
    return result.toString();
  } else {
    return 0;
  }
}

export function pairID(source, dest) {
  return source.address + '-' + dest.address;
}

export function numberToHex(number) {
  return '0x' + new BigNumber(number).toString(16);
}

export function numberToHexAddress(number) {
  const hex = new BigNumber(number).toString(16);
  if (hex.length > 40) {
    return '0x' + Array(41).join('0');
  } else {
    return '0x' + Array(40 - hex.length + 1).join('0') + hex.toLowerCase();
  }
}

export function biggestNumber() {
  const initNumber = new BigNumber(2);
  return '0x' + initNumber.pow(255).toString(16);
}

export function biggestNumberDecimal() {
  const initNumber = new BigNumber(10);
  return initNumber.pow(30).toString(10);
}

export function hexToNumber(hex) {
  return new BigNumber(hex).toNumber();
}

export function hexToBigNumber(hex) {
  return new BigNumber(hex);
}

export function toEther(number) {
  const bigNumber = new BigNumber(number);
  if (bigNumber === 'NaN' || bigNumber === 'Infinity') {
    return '0';
  } else {
    return bigNumber.dividedBy(1000000000000000000).toString();
  }
}

export function errorName(message) {
  const parts = message.split('. ');
  if (parts.length > 0) {
    return parts[0];
  } else {
    return message;
  }
}

export function stringEtherToBigNumber(number, decimal) {
  const param = new BigNumber(10).pow(decimal ? decimal : 18);
  return new BigNumber(number).times(param);
}
export function stringToBigNumber(number) {
  return new BigNumber(number);
}

export function stringToHex(number, decimal) {
  if (number === '' || isNaN(number)) return '0x0';
  const param = new BigNumber(10).pow(decimal ? decimal : 18);
  let bigNumber = new BigNumber(number).times(param);
  bigNumber = new BigNumber(bigNumber.toFixed(0));
  return '0x' + bigNumber.toString(16);
}

export function roundingNumber(number) {
  const MAX_DIGIS = 7;
  const SIZE = 3;
  number = +number;
  let numberStr = number.toString();
  if (isNaN(number) || number <= 0) number = 0;
  if (number < 1e-7) number = 0;
  if (('' + Math.floor(number)).length >= MAX_DIGIS) {
    return Math.floor(number).toLocaleString();
  }

  let count_0 = 0;
  for (let j of numberStr) {
    if (j === '.') continue;
    if (j === 0) count_0++;
    else break;
  }

  let minDisplay = MAX_DIGIS - count_0 < 4 ? 4 : MAX_DIGIS - count_0;

  let precision = number.toPrecision(
      number < 1 && number > 0 ? minDisplay : MAX_DIGIS,
    ),
    arr = precision.split('.'),
    intPart = arr[0],
    i = intPart.length % SIZE || SIZE,
    result = intPart.substr(0, i);

  for (; i < intPart.length; i += SIZE) {
    result += ',' + intPart.substr(i, SIZE);
  }
  if (arr[1]) {
    result += '.' + arr[1];
  }
  return result;
}

// export function displayRate(number){
//   return roundingNumber(number
// }

export function toPrimitiveNumber(x) {
  const bigNum = new BigNumber(x);
  return bigNum.toString(10);
}

export function caculateTokenEpsilon(rate, decimal, symbol) {
  let tokenRate = rate;
  if (symbol === 'ETH') {
    tokenRate = new BigNumber(10).pow(18);
  }
  const epsilon = new BigNumber(constants.EPSILON);
  const ts = epsilon.times(Math.pow(10, decimal));
  return ts.div(tokenRate);
}

export function getDifferentAmount(
  sourceAmount,
  prevAmount,
  sourceDecimal,
  minRate,
  sourceTokenSymbol,
) {
  if (sourceAmount === '' || isNaN(sourceAmount)) sourceAmount = 0;
  if (sourceTokenSymbol === 'ETH') {
    return Math.abs(sourceAmount - prevAmount);
  } else {
    const valueChange = Math.abs(sourceAmount - prevAmount);
    let rate = new BigNumber(minRate);
    const rateWeight = new BigNumber(10).pow(18);
    rate = rate.div(rateWeight);

    let value = new BigNumber(valueChange + '');
    value = value.multipliedBy(rate);

    return value.toNumber();
  }
}

export function compareTwoNumber(num1, num2) {
  const num1Big = new BigNumber(num1.toString());
  const num2Big = new BigNumber(num2.toString());
  return num1Big.comparedTo(num2Big);
}

export function compareRate(minRate, expectedRate) {
  if (minRate === '' || isNaN(minRate)) return -1;
  if (expectedRate === '' || isNaN(expectedRate)) return -1;

  let minRateBig = new BigNumber(minRate);
  const rateWeight = Math.pow(10, 18);
  minRateBig = minRateBig.times(rateWeight);

  const expectedRateBig = new BigNumber(expectedRate);
  return minRateBig.comparedTo(expectedRateBig);
}

export function calculatePercentRate(minRate, expectedRate) {
  if (minRate === '' || isNaN(minRate)) return 0;
  if (expectedRate === '' || isNaN(expectedRate)) return 0;
  if (+expectedRate === 0) return 0;

  let minRateBig = new BigNumber(minRate);
  const rateWeight = new BigNumber(10).pow(20);
  minRateBig = minRateBig.times(rateWeight);

  const percent = minRateBig.dividedBy(expectedRate);

  const fullNumber = new BigNumber(100);

  const remainPercent = fullNumber.minus(percent);

  const remainPercentStr = remainPercent.toFixed(1);

  return parseFloat(remainPercentStr);
}

export function calculateGasFee(gasPrice, gasUsed) {
  const computedGasPrice = stringToBigNumber(gweiToEth(gasPrice));
  const totalGas = computedGasPrice.multipliedBy(gasUsed);
  return roundingNumber(totalGas.toString());
}

export function findNetworkName(networkId) {
  switch (networkId) {
    case 0:
      return 'Olympic Network';
    case 1:
      return 'Mainnet';
    case 2:
      return 'Morden Network';
    case 3:
      return 'Ropsten Network';
    case 4:
      return 'Rinkeby Network';
    case 42:
      return 'Kovan Network';
    default:
      return null;
  }
}

export function sliceErrorMsg(err) {
  if (err.length > 70) {
    err = err.slice(0, 70) + '...';
  }
  return err;
}

export function calculatePercent(numerator, denumerator) {
  if (denumerator === 0) return 0;
  const percent = (numerator / denumerator - 1) * 100;
  return Math.round(percent * 10) / 10;
}

export function formatNumber(number) {
  const format = {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
  };
  BigNumber.config({ FORMAT: format });
  const numberFormat = new BigNumber(number.toString());
  return numberFormat.toFormat();
}

export function caculatorPercentageToRate(number, total) {
  if (new BigNumber(total) !== 0) {
    return (
      (new BigNumber(number) / new BigNumber(total)) * 100000000000000000000
    );
  }
  return 0;
}

export function caculatorRateToPercentage(number, total) {
  if (new BigNumber(total) !== 0) {
    return (
      (new BigNumber(number) * new BigNumber(total)) / 100000000000000000000
    );
  }
  return 0;
}

export function estimateSlippagerate(expectedRate) {
  const bigNumber = new BigNumber(expectedRate.toString());
  const result = bigNumber.div(1000000000000000000).times(0.97);
  return result.toString();
}

export function getMinrate(rate, minRate) {
  if (isNaN(rate) || rate === '') {
    rate = 0;
  }
  if (isNaN(minRate) || minRate === '') {
    minRate = 0;
  }
  rate = rate.toString();
  minRate = minRate.toString();

  if (minRate === '0') {
    const bigNumber = new BigNumber(rate);
    const result = bigNumber.div(1000000000000000000).times(0.97);
    return result.toString();
  } else {
    return minRate;
  }
}

export function calculateMinSource(
  sourceTokenSymbol,
  sourceAmount,
  decimal,
  rateSell,
) {
  console.log({ sourceAmount, decimal, rateSell });
  if (sourceAmount === '' || isNaN(sourceAmount)) sourceAmount = 0;

  const minSourceAllow = new BigNumber(
    getSourceAmountZero(sourceTokenSymbol, decimal, rateSell),
  );

  let sourceAmountBig = new BigNumber(sourceAmount.toString());
  sourceAmountBig = sourceAmountBig.times(Math.pow(10, decimal));

  if (minSourceAllow.comparedTo(sourceAmountBig) === 1) {
    return '0x' + minSourceAllow.toString(16);
  } else {
    const sourceAmountDecimal = sourceAmountBig.toFixed(0);
    const sourceAmountHex = new BigNumber(sourceAmountDecimal);
    return '0x' + sourceAmountHex.toString(16);
  }
}

export function getSourceAmountZero(sourceTokenSymbol, decimal, rateSell) {
  const epsilon = constants.EPSILON;
  const minETHAllow = new BigNumber(epsilon.toString());

  if (sourceTokenSymbol === 'ETH') {
    return minETHAllow.toFixed(0);
  }
  const rate = new BigNumber(rateSell);
  if (rate.comparedTo(0) === 0) {
    return '0';
  }
  const minSourceAllow = minETHAllow.div(rate).times(Math.pow(10, decimal));
  return minSourceAllow.toFixed(0);
}

export function toHex(number) {
  const bigNumber = new BigNumber(number);
  return '0x' + bigNumber.toString(16);
}
