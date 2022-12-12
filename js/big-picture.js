import {isEscape} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('.social__comment').cloneNode(true);
const commentSection = document.querySelector('.social__comments');

const alternateBigPictureData = (pictureData) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
  bigPicture.querySelector('.big-picture__img').querySelector('img').alt = pictureData.description;
  bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
  bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length;
  bigPicture.querySelector('.social__caption').textContent = pictureData.description;
};

const createCommentsView = (pictureData) => {
  commentSection.innerHTML = '';
  const commentFragment = document.createDocumentFragment();
  for (let i = 0; i < pictureData.comments.length; i++) {
    const comment = commentTemplate.cloneNode(true);
    const commentPicture = comment.querySelector('img');
    commentPicture.src = pictureData.comments[i].avatar;
    commentPicture.alt = pictureData.comments[i].name;
    comment.querySelector('p').textContent = pictureData.comments[i].message;
    commentFragment.appendChild(comment);
  }
  return commentFragment;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const onCloseBigPictureButtonClick = () => {
  closeBigPicture();
};

const onDocumentEscapeKeyDown = (evt) => {
  if (isEscape(evt)) {
    closeBigPicture();
    document.removeEventListener('keydown', onDocumentEscapeKeyDown);
  }
};

const addPictureClickHandler = (picture, newPictureData) => {
  picture.addEventListener('click', () => {
    openBigPicture();
    alternateBigPictureData(newPictureData);
    commentSection.appendChild(createCommentsView(newPictureData));
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    closeBigPictureButton.addEventListener('click', onCloseBigPictureButtonClick);
    document.addEventListener('keydown', onDocumentEscapeKeyDown);
  });
};

export {addPictureClickHandler};
