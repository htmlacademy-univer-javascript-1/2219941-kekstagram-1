const getRandomIntNumber = (min,max) => {
  min = min < 0 ? Math.abs(min) : min;
  max = max < 0 ? Math.abs(max) : max;
  return min < max ? Math.floor(Math.random() * (max - min + 1) + min)
    : Math.floor(Math.random() * (max - min + 1) + min);
};

const checkLineLength = (line, maxLength) => line.length <= maxLength;

export {getRandomIntNumber, checkLineLength};
