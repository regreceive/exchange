const dayTime = 60 * 60 * 24 * 1000;
const periodMatch = /^(\d{1,2})(min|hour|day|week|mon|year)$/;
const vnum = 2554477;

const getMillisecond = period => {
  let number = 0;
  let millisecond = 0;

  const matches = period.match(periodMatch);
  if (matches) {
    number = matches[1];
    type = matches[2];
  }

  switch (type) {
    case 'min':
      millisecond = number * 60 * 1000;
      break;
    case 'hour':
      millisecond = number * 60 * 60 * 1000;
      break;
    case 'day':
      millisecond = number * dayTime;
      break;
    case 'week':
      millisecond = number * dayTime * 7;
      break;
    case 'mon':
      millisecond = number * dayTime * 30;
      break;
    case 'year':
      millisecond = number * dayTime * 365;
      break;
    default:
      millisecond = 0;
  }

  return millisecond;
};

function getRandomNum(integer, decimal = 0) {
  const randomNum =
    Math.pow(10, integer) + Math.random() * Math.pow(10, integer);
  return randomNum.toFixed(decimal) * 1;
}

function getMockData(params) {
  const { step, length, type, delta, endTime } = params;
  const t = [];
  const c = [];
  const o = [];
  const h = [];
  const l = [];
  const v = [];

  for (let i = 0; i < length; i++) {
    const num = getRandomNum(2, 2);
    h.push(num);
    l.push(num - getRandomNum(1));
    o.push(num - getRandomNum(1));
    c.push(num - getRandomNum(1));
    v.push(vnum - getRandomNum(6));

    if (type === 'prev') {
      const time = Math.floor((endTime - step * (i + 1)) / 1000);
      t.unshift(time);
    } else if (type === 'next') {
      const time = Math.floor(
        (endTime + step * (delta + i + 1)) / 1000,
      );
      t.push(time);
    }
  }

  return {
    t,
    c,
    o,
    h,
    l,
    v,
  };
}

module.exports = {
  getMillisecond,
  getMockData,
};
