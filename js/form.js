import {isEscape} from './util.js';
import {addHashtagValidator} from './hashtags.js';
import {addZoomHandler, removeZoomHandler, resetZoom} from './zoom.js';
import {resetEffects} from './effects.js';

const bodyElement = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCloseButton = imgUploadForm.querySelector('#upload-cancel');
const imgUploadControl = imgUploadForm.querySelector('#upload-file');

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

const addUploadFormHandler = () => {
  imgUploadControl.addEventListener('change', onUploadChangeHandler);
};

export {addUploadFormHandler};
