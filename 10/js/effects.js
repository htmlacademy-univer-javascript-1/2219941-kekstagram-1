const DEFAULT_EFFECT_LEVEL = 100;

const imgUploadForm = document.querySelector('.img-upload__form');
const effectLevelChanger = imgUploadForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = effectLevelChanger.querySelector('.effect-level__slider');
const effectLevelValue = effectLevelChanger.querySelector('.effect-level__value');
const effectsList = imgUploadForm.querySelector('.effects__list');
const picturePreview = imgUploadForm.querySelector('.img-upload__preview');
const picture = picturePreview.querySelector('img');

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

const changeFilterString = (filterName, additionalParameter) => `${filterName}(${effectLevelValue.value}${additionalParameter})`;

const openEffect = (effectValues) => {
  effectLevelChanger.classList.remove('visually-hidden');
  Slider.MIN = effectValues.min;
  Slider.MAX = effectValues.max;
  Slider.STEP = effectValues.step;
  effectLevelSlider.noUiSlider.updateOptions(createOptions());
  effectLevelValue.value = effectValues.max;
  return changeFilterString(effectValues.filter);
};

const effects = {
  none: {
    open : () => {
      effectLevelChanger.classList.add('visually-hidden');
      picture.style.removeProperty('filter');
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
effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
effectLevelChanger.classList.add('visually-hidden');

noUiSlider.create(effectLevelSlider, createOptions());

const changeEffect = (newEffect) => {
  picture.classList.remove(`effect__preview--${currentEffect}`);
  currentEffect = newEffect;
  picture.classList.add(`effect__preview--${currentEffect}`);
  picture.style.filter = effects[currentEffect]['open']();
};

const onSliderUpdate = () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  if (currentEffect !== 'none') {
    picture.style.filter = effects[currentEffect]['update']();
  }
};

const onEffectsListClick = (evt) => {
  const target = evt.target;
  if (target.classList.contains('effects__radio') && currentEffect !== target.value) {
    changeEffect(target.value);
  }
};

const addEffectEventHandlers = () => {
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
  effectsList.addEventListener('click', onEffectsListClick);
};

const resetEffects =() => {
  changeEffect('none');
  effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
  effectLevelChanger.classList.add('visually-hidden');
};

export {addEffectEventHandlers, resetEffects};
