import {isEscape} from './util.js';
import {createCommentsArray, alternateCommentSection} from './comments.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = bodyElement.querySelector('.big-picture');
const closeBigPictureButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const commentsCountTextElement = bigPictureElement.querySelector('.social__comment-count');
const commentsCountNumberElement = commentsCountTextElement.querySelector('.comments-count');
const commentsLoadingButtonElement = bigPictureElement.querySelector('.comments-loader');

const closeBigPicture = (loadingFunction, closingFunction) => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  commentsLoadingButtonElement.removeEventListener('click', loadingFunction);
  document.removeEventListener('keydown', closingFunction);
};

const openBigPicture = () => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

const alternateBigPictureData = (pictureData) => {
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').alt = pictureData.description;
  bigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
  commentsCountNumberElement.textContent = pictureData.comments.length.toString();
  bigPictureElement.querySelector('.social__caption').textContent = pictureData.description;
};

const onPictureClick = (pictureData) => {
  const commentsArray = createCommentsArray(pictureData);
  const onLoadingButton = () => {
    alternateCommentSection(commentsArray);
  };
  const onDocumentEscapeKeyDown = (evt) => {
    if (isEscape(evt)) {
      closeBigPicture(onLoadingButton, onDocumentEscapeKeyDown);
    }
  };
  const onCloseBigPictureButtonClick = () => {
    closeBigPicture(onLoadingButton, onDocumentEscapeKeyDown);
  };

  openBigPicture();
  alternateBigPictureData(pictureData);
  alternateCommentSection(commentsArray);
  commentsLoadingButtonElement.addEventListener('click', onLoadingButton);
  closeBigPictureButtonElement.addEventListener('click', onCloseBigPictureButtonClick);
  document.addEventListener('keydown', onDocumentEscapeKeyDown);
};

export {onPictureClick};
