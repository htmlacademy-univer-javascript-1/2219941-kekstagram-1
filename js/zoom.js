const ZOOMING_VALUE = 25;
const DEFAULT_VALUE = 100;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const RADIX = 10;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadScale = imgUploadForm.querySelector('.img-upload__scale');
const zoomValue = imgUploadScale.querySelector('.scale__control--value');
const picture = imgUploadForm.querySelector('.img-upload__preview');

const changeValue = (newValue) => {
  zoomValue.value = `${newValue}%`;
  picture.style.transform = `scale(${newValue/100})`;
}

const onZoomButtonsClick = (evt) => {
  const target = evt.target;
  if (target.tagName === 'BUTTON') {
    const currentValue = parseInt(zoomValue.value.slice(0, -1), RADIX);
    const updatedValue = target.classList.contains('scale__control--smaller') ? currentValue - ZOOMING_VALUE : currentValue + ZOOMING_VALUE;
    if (MIN_VALUE <= updatedValue && updatedValue <= MAX_VALUE) {
      changeValue(updatedValue);
    }
  }
};

const resetZoom = () => {
  changeValue(DEFAULT_VALUE);
};

const addZoomHandler = () => {
  imgUploadScale.addEventListener('click', onZoomButtonsClick);
};

const removeZoomHandler = () => {
  imgUploadScale.removeEventListener('click', onZoomButtonsClick);
};

export {addZoomHandler, removeZoomHandler, resetZoom};
