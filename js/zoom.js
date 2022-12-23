const ZOOMING_VALUE = 25;
const DEFAULT_VALUE = 100;
const RADIX = 10;

const BorderValues = {
  MIN_VALUE: 25,
  MAX_VALUE: 100
};

const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadScaleElement = imgUploadFormElement.querySelector('.img-upload__scale');
const zoomValueElement = imgUploadScaleElement.querySelector('.scale__control--value');
const pictureElement = imgUploadFormElement.querySelector('.img-upload__preview').querySelector('img');

const changeValue = (newValue) => {
  zoomValueElement.value = `${newValue}%`;
  pictureElement.style.transform = `scale(${newValue/100})`;
};

const onZoomButtonsClick = (evt) => {
  const target = evt.target;
  if (target.tagName === 'BUTTON') {
    const currentValue = parseInt(zoomValueElement.value.slice(0, -1), RADIX);
    const updatedValue = target.classList.contains('scale__control--smaller') ? currentValue - ZOOMING_VALUE : currentValue + ZOOMING_VALUE;
    if (BorderValues.MIN_VALUE <= updatedValue && updatedValue <= BorderValues.MAX_VALUE) {
      changeValue(updatedValue);
    }
  }
};

const resetZoom = () => {
  changeValue(DEFAULT_VALUE);
};

const addZoomHandler = () => {
  imgUploadScaleElement.addEventListener('click', onZoomButtonsClick);
};

const removeZoomHandler = () => {
  imgUploadScaleElement.removeEventListener('click', onZoomButtonsClick);
};

export {addZoomHandler, removeZoomHandler, resetZoom};
