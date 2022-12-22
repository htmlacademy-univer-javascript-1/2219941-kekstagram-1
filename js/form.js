import {isEscape} from './util.js';
import {addHashtagValidator} from './hashtags.js';
import {addZoomHandler, removeZoomHandler, resetZoom} from './zoom.js';
import {resetEffects} from './effects.js';
import {sendRequest} from './fetch.js';
import {addUploadedPhoto} from './picture-upload.js';

const bodyElementElement = document.querySelector('body');
const imgUploadFormElement = bodyElementElement.querySelector('.img-upload__form');
const imgUploadOverlayElement = imgUploadFormElement.querySelector('.img-upload__overlay');
const imgUploadControlElement = imgUploadFormElement.querySelector('#upload-file');
const uploadCloseButtonElement = imgUploadFormElement.querySelector('#upload-cancel');
const submitButtonElement = imgUploadFormElement.querySelector('.img-upload__submit');

const successMessageElement =  bodyElementElement.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessageElement = bodyElementElement.querySelector('#error').content.querySelector('.error').cloneNode(true);
const successCloseButtonElement = successMessageElement.querySelector('.success__button');
const errorCloseButtonElement = errorMessageElement.querySelector('.error__button');

const closeUploadForm = () => {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElementElement.classList.remove('modal-open');
  removeZoomHandler();
  resetEffects();
  resetZoom();
  imgUploadFormElement.reset();
};

const openUploadForm = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElementElement.classList.add('modal-open');
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
  addUploadedPhoto();
  openUploadForm();
  uploadCloseButtonElement.addEventListener('click', onCloseUploadButtonClick);
  document.addEventListener('keydown', onDocumentEscapeKeyDown);
  addHashtagValidator();
};

const closeSuccessMessage = () => {
  successMessageElement.classList.add('hidden');
};

const closeErrorMessage = () => {
  errorMessageElement.classList.add('hidden');
  imgUploadOverlayElement.classList.remove('hidden');
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
  if (!successMessageElement.classList.contains('hidden')) {
    closeSuccessMessage();
    document.removeEventListener('click', onSuccessDocumentClick);
    document.removeEventListener('keydown', onSuccessEscapeKeyDown);
  }
};

const onErrorEscapeKeyDown = () => {
  if (!errorMessageElement.classList.contains('hidden')) {
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
  bodyElementElement.appendChild(message);
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const onSuccess = () => {
  closeUploadForm();
  document.removeEventListener('keydown', onDocumentEscapeKeyDown);
  unblockSubmitButton();

  successMessageElement.classList.remove('hidden');
  document.addEventListener('click', onSuccessDocumentClick);
  document.addEventListener('keydown', onSuccessEscapeKeyDown, {once: true});
};

const onError = () => {
  imgUploadOverlayElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentEscapeKeyDown,);
  unblockSubmitButton();

  errorMessageElement.classList.remove('hidden');
  document.addEventListener('click', onErrorDocumentClick);
  document.addEventListener('keydown', onErrorEscapeKeyDown, {once: true});
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  blockSubmitButton();
  sendRequest(onSuccess, onError, 'POST', new FormData(imgUploadFormElement));
};

const addFormEventsHandler = () => {
  imgUploadControlElement.addEventListener('change', onUploadChangeHandler);
  imgUploadFormElement.addEventListener('submit', onUploadFormSubmit);

  appendMessage(successMessageElement);
  appendMessage(errorMessageElement);
  successCloseButtonElement.addEventListener('click', onSuccessButtonClick);
  errorCloseButtonElement.addEventListener('click', onErrorButtonClick);
};

export {addFormEventsHandler};
