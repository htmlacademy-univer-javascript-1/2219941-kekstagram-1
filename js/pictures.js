import {onPictureClick} from './big-picture.js';

const picturesPool = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const renderPicture = (picture) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;

  newPicture.addEventListener('click', () => {
    onPictureClick(picture);
  });
  return newPicture;
};

const removePictures = () => {
  const uselessPictures = picturesPool.querySelectorAll('.picture');
  uselessPictures.forEach((picture) => picturesPool.removeChild(picture));
};

const renderPictures = (pictures) => {
  pictures.forEach((picture) => {
    fragment.appendChild(renderPicture(picture));
  });
  picturesPool.appendChild(fragment);
};

export {renderPictures, removePictures};
