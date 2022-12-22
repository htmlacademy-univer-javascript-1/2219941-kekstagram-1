const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const HASHTAG_RE = /^#[a-zа-яё0-9]{1,19}$/i;

const imgUploadForm = document.querySelector('.img-upload__form');
const inputHashtags = imgUploadForm.querySelector('.text__hashtags');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'hashtag__error',
  successClass: 'hashtag__success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'hashtags__error-text'
});

let errorMessageText = 'Хэштег некорректного формата';

const errorMessage = () => errorMessageText;

const hashtagHandler = (value) => {
  errorMessageText = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const hashtagsArray = inputText.split(/\s+/);
  if (!hashtagsArray) {
    return true;
  }

  const rules = [
    {
      check: hashtagsArray.every((hashtag) => hashtag[0] === '#'),
      error: 'Хэш-тег должен начинаться с символа #'
    },
    {
      check: hashtagsArray.every((hashtag) => hashtag.length !== 1),
      error: 'Хэш-тег не может состоять только из одной решётки'
    },
    {
      check: hashtagsArray.every((hashtag) => hashtag.indexOf('#', 1) === -1),
      error: 'Хэш-теги должны разделяться пробелами'
    },
    {
      check: hashtagsArray.every((hashtag, index) => hashtag.indexOf(hashtag, index + 1) === -1),
      error: 'Один и тот же хэш-тег не может быть использован дважды'
    },
    {
      check: hashtagsArray.every((hashtag) => hashtag.length <= MAX_SYMBOLS),
      error: `Максимальная длина одного хэш-тега не должна превышать ${MAX_SYMBOLS} символов, включая решётку`
    },
    {
      check: hashtagsArray.length <= MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`
    },
    {
      check: hashtagsArray.every((hashtag) => HASHTAG_RE.test(hashtag)),
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

pristine.addValidator(inputHashtags, hashtagHandler, errorMessage);

const onHashtagInput = () => {
  submitButton.disabled = !pristine.validate();
};

const addHashtagValidator = () => {
  inputHashtags.addEventListener('input', onHashtagInput);
};

export {addHashtagValidator};
