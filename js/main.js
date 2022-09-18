const getRandomIntNumber = (min,max) => {
  if (min < 0 || max <= 0) {
    return -1;
  }
  return min < max ? Math.floor(Math.random() * (max - min + 1) + min)
    : Math.floor(Math.random() * (max - min + 1) + min);
};
getRandomIntNumber();

const lineLengthIsCorrect = (line, maxLength) => line.length <= maxLength;
lineLengthIsCorrect();
