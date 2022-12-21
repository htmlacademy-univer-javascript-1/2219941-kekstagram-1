const DIVIDER_TO_GET_UNITS = 10;

const checkLineLength = (line, maxLength) => line.length <= maxLength;

const isEscape = (evt) => evt.key === 'Escape';

const changeWord = (firstForm, secondForm, marker) => {
  if (marker % DIVIDER_TO_GET_UNITS === 1) {
    return firstForm;
  }
  return secondForm;
};

export {checkLineLength, isEscape, changeWord};
