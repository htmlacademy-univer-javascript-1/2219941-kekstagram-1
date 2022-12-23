import {throttle, debounce} from './util.js';

const DEFAULT_EFFECT_LEVEL = 100;
const SLIDER_UPDATE_DELAY = 100;
const EFFECT_CHANGE_DELAY = 200;

const imgUploadFormElement = document.querySelector('.img-upload__form');
const effectLevelChangerElement = imgUploadFormElement.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = effectLevelChangerElement.querySelector('.effect-level__slider');
const effectLevelValueElement = effectLevelChangerElement.querySelector('.effect-level__value');
const effectsListElement = imgUploadFormElement.querySelector('.effects__list');
const picturePreviewElement = imgUploadFormElement.querySelector('.img-upload__preview');
const pictureElement = picturePreviewElement.querySelector('img');

const Slider = {
  MIN: 0,
  MAX: 100,
  STEP: 1
};

const createOptions = () => ({
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  step: Slider.STEP,
  connect: 'lower'
});

noUiSlider.create(effectLevelSliderElement, createOptions());

const changeFilterString = (filterName, additionalParameter) => `${filterName}(${effectLevelValueElement.value}${additionalParameter})`;

const openEffect = (effectValues) => {
  effectLevelChangerElement.classList.remove('visually-hidden');
  Slider.MIN = effectValues.min;
  Slider.MAX = effectValues.max;
  Slider.STEP = effectValues.step;
  effectLevelSliderElement.noUiSlider.updateOptions(createOptions());
  effectLevelValueElement.value = effectValues.max;
  return changeFilterString(effectValues.filter);
};

const effects = {
  none: {
    open : () => {
      effectLevelChangerElement.classList.add('visually-hidden');
      pictureElement.style.removeProperty('filter');
      return 'none';
    }
  },
  chrome: {
    open: () => openEffect({
      min: 0,
      max: 1,
      step: 0.1,
      filter: 'grayscale'
    }),
    update: () => changeFilterString('grayscale', '')
  },
  sepia: {
    open: () => openEffect({
      min: 0,
      max: 1,
      step: 0.1,
      filter: 'sepia'
    }),
    update: () => changeFilterString('sepia', '')
  },
  marvin: {
    open: () => openEffect({
      min: 0,
      max: 100,
      step: 1,
      filter: 'invert'
    }),
    update: () => changeFilterString('invert', '%')
  },
  phobos: {
    open: () => openEffect({
      min: 0,
      max: 3,
      step: 0.1,
      filter: 'blur'
    }),
    update: () => changeFilterString('blur', 'px')
  },
  heat: {
    open: () => openEffect({
      min: 1,
      max: 3,
      step: 0.1,
      filter: 'brightness'
    }),
    update: () => changeFilterString('brightness', '')
  }
};

let currentEffect = 'none';
effectLevelValueElement.value = DEFAULT_EFFECT_LEVEL;
effectLevelChangerElement.classList.add('visually-hidden');

const changeEffect = (newEffect) => {
  pictureElement.classList.remove(`effect__preview--${currentEffect}`);
  currentEffect = newEffect;
  pictureElement.classList.add(`effect__preview--${currentEffect}`);
  pictureElement.style.filter = effects[currentEffect]['open']();
};

const onSliderUpdate = throttle(() => {
  effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
  if (currentEffect !== 'none') {
    pictureElement.style.filter = effects[currentEffect]['update']();
  }
}, SLIDER_UPDATE_DELAY);

const onEffectsListClick = debounce((evt) => {
  const target = evt.target;
  if (target.classList.contains('effects__radio') && currentEffect !== target.value) {
    changeEffect(target.value);
  }
}, EFFECT_CHANGE_DELAY);

const addEffectEventHandlers = () => {
  effectLevelSliderElement.noUiSlider.on('update', onSliderUpdate);
  effectsListElement.addEventListener('click', onEffectsListClick);
};

const resetEffects =() => {
  changeEffect('none');
  effectLevelValueElement.value = DEFAULT_EFFECT_LEVEL;
  effectLevelChangerElement.classList.add('visually-hidden');
};

export {addEffectEventHandlers, resetEffects};
