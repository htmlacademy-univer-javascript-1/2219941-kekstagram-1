import {onPictureClick} from './big-picture.js';
import {connectFilters} from './filters.js';

const picturesPoolElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const renderPicture = (picture) => {
  const newPicture = pictureTemplateElement.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;

  newPicture.addEventListener('click', () => {
    onPictureClick(picture);
  });
  return newPicture;
};

const removePictures = () => {
  const uselessPictures = picturesPoolElement.querySelectorAll('.picture');
  uselessPictures.forEach((picture) => picturesPoolElement.removeChild(picture));
};

const renderPictures = (pictures) => {
  pictures.forEach((picture) => {
    fragment.appendChild(renderPicture(picture));
  });
  picturesPoolElement.appendChild(fragment);
  connectFilters();
};

export {renderPictures, removePictures};
