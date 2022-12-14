import {isEscape} from './util.js';
import {addHashtagValidator} from './hashtags.js';
import {addDescValidator} from './image-desc.js';

const bodyElement = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadCloseButton = imgUploadForm.querySelector('#upload-cancel');
const imgUploadControl = imgUploadForm.querySelector('#upload-file');

const closeUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imgUploadForm.reset();
};

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
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
  addDescValidator();
  addHashtagValidator();
};

const addUploadFormHandler = () => {
  imgUploadControl.addEventListener('change', onUploadChangeHandler);
};

export {addUploadFormHandler};
