const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const HASHTAG_RE = /^#[a-zа-яё0-9]{1,19}$/i;

const imgUploadFormElement = document.querySelector('.img-upload__form');
const inputHashtagsElement = imgUploadFormElement.querySelector('.text__hashtags');
const submitButtonElement = imgUploadFormElement.querySelector('.img-upload__submit');

const pristine = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'hashtag__error',
  successClass: 'hashtag__success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'hashtags__error-text'
});

let errorMessageText = '';

const setErrorMessage = () => errorMessageText;

const validateHashtag = (value) => {
  errorMessageText = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const hashtags = inputText.split(/\s+/);
  if (!hashtags) {
    return true;
  }

  const rules = [
    {
      check: hashtags.every((hashtag) => hashtag[0] === '#'),
      error: 'Хэш-тег должен начинаться с символа #'
    },
    {
      check: hashtags.every((hashtag) => hashtag.length !== 1),
      error: 'Хэш-тег не может состоять только из одной решётки'
    },
    {
      check: hashtags.every((hashtag) => hashtag.indexOf('#', 1) === -1),
      error: 'Хэш-теги должны разделяться пробелами'
    },
    {
      check: hashtags.every((hashtag, index) => hashtag.indexOf(hashtag, index + 1) === -1),
      error: 'Один и тот же хэш-тег не может быть использован дважды'
    },
    {
      check: hashtags.every((hashtag) => hashtag.length <= MAX_SYMBOLS),
      error: `Максимальная длина одного хэш-тега не должна превышать ${MAX_SYMBOLS} символов, включая решётку`
    },
    {
      check: hashtags.length <= MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`
    },
    {
      check: hashtags.every((hashtag) => HASHTAG_RE.test(hashtag)),
      error: 'Хэш-тег содержит недопустимые символы'
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

pristine.addValidator(inputHashtagsElement, validateHashtag, setErrorMessage);

const makeHashtagValidation = () => {
  pristine.validate();
};

const onHashtagInput = () => {
  submitButtonElement.disabled = !pristine.validate();
};

const addHashtagValidator = () => {
  inputHashtagsElement.addEventListener('input', onHashtagInput);
};

export {addHashtagValidator, makeHashtagValidation};
