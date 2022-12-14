import {checkLineLength} from './util.js';

const MAX_SYMBOLS = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const inputDesc = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelectorAll('.img-upload__submit');

let errorMessageText = 'Некорректный формат комментария';

const errorMessage = () => errorMessageText;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'description__error',
  successClass: 'description__success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'description__error-text'
});

const descHandler = (value) => {
  errorMessageText = '';

  if (!value) {
    return true;
  }

  const rules = [
    {
      check: checkLineLength(value, MAX_SYMBOLS),
      error: 'Длина комментария не должна превышать 140 символов'
    }
  ];

  return rules.every((rule) => {
    const isValid = rule.check;
    if (!isValid) {
      errorMessageText = rule.error;
    }
    return isValid;
  });
};

pristine.addValidator(inputDesc, descHandler, errorMessage);

const onDescriptionInput = () => {
  submitButton.disabled = !pristine.validate();
};

const addDescValidator = () => {
  inputDesc.addEventListener('input', onDescriptionInput);
};

export {addDescValidator};
