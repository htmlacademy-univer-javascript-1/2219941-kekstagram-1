const DIVIDER_TO_GET_UNITS = 10;

const checkLineLength = (line, maxLength) => line.length <= maxLength;

const isEscape = (evt) => evt.key === 'Escape';

const changeWord = (firstForm, secondForm, marker) => {
  if (marker % DIVIDER_TO_GET_UNITS === 1) {
    return firstForm;
  }
  return secondForm;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export {checkLineLength, isEscape, changeWord, debounce, throttle, shuffleArray};
