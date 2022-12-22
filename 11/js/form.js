import {isEscape} from './util.js';
import {addHashtagValidator} from './hashtags.js';
import {addZoomHandler, removeZoomHandler, resetZoom} from './zoom.js';
import {resetEffects} from './effects.js';
import {sendRequest} from './fetch.js';

const bodyElement = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadControl = imgUploadForm.querySelector('#upload-file');
const uploadCloseButton = imgUploadForm.querySelector('#upload-cancel');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const successMessage =  document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const successCloseButton = successMessage.querySelector('.success__button');
const errorCloseButton = errorMessage.querySelector('.error__button');

const closeUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  removeZoomHandler();
  resetEffects();
  resetZoom();
  imgUploadForm.reset();
};

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  addZoomHandler();
};

const onDocumentEscapeKeyDown = (evt) => {
  if (isEscape(evt) && !evt.target.classList.contains('text__description') && !evt.target.classList.contains('text__hashtags')) {
    closeUploadForm();
    document.removeEventListener('keydown', onDocumentEscapeKeyDown);
  }
};

const onCloseUploadButtonClick = () => {
  closeUploadForm();
  document.removeEventListener('keydown', onDocumentEscapeKeyDown);
};

const onUploadChangeHandler = () => {
  openUploadForm();
  uploadCloseButton.addEventListener('click', onCloseUploadButtonClick);
  document.addEventListener('keydown', onDocumentEscapeKeyDown);
  addHashtagValidator();
};

const closeSuccessMessage = () => {
  successMessage.classList.add('hidden');
};

const closeErrorMessage = () => {
  errorMessage.classList.add('hidden');
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentEscapeKeyDown);
};

const onSuccessDocumentClick = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closeSuccessMessage();
    document.removeEventListener('click', onSuccessDocumentClick);
  }
};

const onErrorDocumentClick = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closeErrorMessage();
    document.removeEventListener('click', onErrorDocumentClick);
  }
};

const onSuccessEscapeKeyDown = () => {
  if (!successMessage.classList.contains('hidden')) {
    closeSuccessMessage();
    document.removeEventListener('click', onSuccessDocumentClick);
    document.removeEventListener('keydown', onSuccessEscapeKeyDown);
  }
};

const onErrorEscapeKeyDown = () => {
  if (!errorMessage.classList.contains('hidden')) {
    closeErrorMessage();
    document.removeEventListener('click', onErrorDocumentClick);
    document.removeEventListener('keydown', onErrorEscapeKeyDown);
  }
};

const onSuccessButtonClick = () => {
  closeSuccessMessage();
  document.removeEventListener('click', onSuccessDocumentClick);
  document.removeEventListener('keydown', onSuccessEscapeKeyDown);
};

const onErrorButtonClick = () => {
  closeErrorMessage();
  document.removeEventListener('click', onErrorDocumentClick);
  document.removeEventListener('keydown', onErrorEscapeKeyDown);
};

const appendMessage = (message) => {
  message.classList.add('hidden');
  bodyElement.appendChild(message);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onSuccess = () => {
  closeUploadForm();
  document.removeEventListener('keydown', onDocumentEscapeKeyDown);
  unblockSubmitButton();

  successMessage.classList.remove('hidden');
  document.addEventListener('click', onSuccessDocumentClick);
  document.addEventListener('keydown', onSuccessEscapeKeyDown, {once: true});
};

const onError = () => {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentEscapeKeyDown,);
  unblockSubmitButton();

  errorMessage.classList.remove('hidden');
  document.addEventListener('click', onErrorDocumentClick);
  document.addEventListener('keydown', onErrorEscapeKeyDown, {once: true});
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  blockSubmitButton();
  sendRequest(onSuccess, onError, 'POST', new FormData(imgUploadForm));
};

const addFormEventsHandler = () => {
  imgUploadControl.addEventListener('change', onUploadChangeHandler);
  imgUploadForm.addEventListener('submit', onUploadFormSubmit);

  appendMessage(successMessage);
  appendMessage(errorMessage);
  successCloseButton.addEventListener('click', onSuccessButtonClick);
  errorCloseButton.addEventListener('click', onErrorButtonClick);
};

export {addFormEventsHandler};
