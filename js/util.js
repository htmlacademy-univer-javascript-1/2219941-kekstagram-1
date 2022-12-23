const DIVIDER_TO_GET_UNITS = 10;
const DEFAULT_TIMEOUT_DELAY = 500;

const isEscape = (evt) => evt.key === 'Escape';

const changeWord = (firstForm, secondForm, marker) => {
  if (marker % DIVIDER_TO_GET_UNITS === 1) {
    return firstForm;
  }
  return secondForm;
};

const debounce = (callback, timeoutDelay = DEFAULT_TIMEOUT_DELAY) => {
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
  for (let firstElement = array.length - 1; firstElement > 0; firstElement--) {
    const secondElement = Math.floor(Math.random() * (firstElement + 1));
    [array[firstElement], array[secondElement]] = [array[secondElement], array[firstElement]];
  }
  return array;
};

export {isEscape, changeWord, debounce, throttle, shuffleArray};
