import {addPictureClickHandler} from './big-picture.js';

const picturesPool = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const renderPicture = (picture) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;

  addPictureClickHandler(newPicture, picture);
  return newPicture;
};

const renderPictures = (pictures) => {
  pictures.forEach((picture) => {
    fragment.appendChild(renderPicture(picture));
  });
  picturesPool.appendChild(fragment);
};

export {renderPictures};
