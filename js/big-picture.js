import {isEscape, changeWord} from './util.js';

const MAX_COMMENTS_SHOWN = 5;

const bodyElement = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);
const commentSection = bigPicture.querySelector('.social__comments');
const commentsCountText = bigPicture.querySelector('.social__comment-count');
const commentsCount = commentsCountText.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const closeBigPicture = (loaderFunc, closingFunc) => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  commentsLoader.removeEventListener('click', loaderFunc);
  document.removeEventListener('keydown', closingFunc);
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

const alternateBigPictureData = (pictureData) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
  bigPicture.querySelector('.big-picture__img').querySelector('img').alt = pictureData.description;
  bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
  commentsCount.textContent = pictureData.comments.length.toString();
  bigPicture.querySelector('.social__caption').textContent = pictureData.description;
};

const createComment = (commentData) => {
  const comment = commentTemplate.cloneNode(true);
  const commentPicture = comment.querySelector('img');
  commentPicture.src = commentData.avatar;
  commentPicture.alt = commentData.name;
  comment.querySelector('p').textContent = commentData.message;
  return comment;
};

const createCommentsArray = (pictureData) => {
  commentSection.innerHTML = '';
  const commentsArray = [];
  for (let i = 0; i < pictureData.comments.length; i++) {
    commentsArray.push(createComment(pictureData.comments[i]));
  }
  return commentsArray;
};

const alternateCommentSection = (commentsArray) => {
  const commentsAmount = commentsArray.length;
  const commentsFragment = document.createDocumentFragment();
  const currentCommentsCount = commentSection.children.length;
  const commentsLimit = currentCommentsCount + MAX_COMMENTS_SHOWN >= commentsAmount ? commentsAmount : currentCommentsCount + MAX_COMMENTS_SHOWN;
  commentsCountText.innerHTML = `${commentsLimit} из <span class="comments-count">${commentsAmount}</span> ${changeWord('комментария', 'комментариев', commentsAmount)}`;
  commentsArray.slice(currentCommentsCount, commentsLimit).forEach((comment) => {
    commentsFragment.appendChild(comment);
  });
  commentSection.appendChild(commentsFragment);

  if (currentCommentsCount + MAX_COMMENTS_SHOWN >= commentsAmount) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const addPictureClickHandler = (picture, newPictureData) => {
  const onPictureClick = () => {
    const commentsArray = createCommentsArray(newPictureData);
    const addLoadingHandler = () => {
      alternateCommentSection(commentsArray);
    };
    const onDocumentEscapeKeyDown = (evt) => {
      if (isEscape(evt)) {
        closeBigPicture(addLoadingHandler, onDocumentEscapeKeyDown);
      }
    };
    const onCloseBigPictureButtonClick = () => {
      closeBigPicture(addLoadingHandler, onDocumentEscapeKeyDown);
    };

    openBigPicture();
    alternateBigPictureData(newPictureData);
    alternateCommentSection(commentsArray);

    commentsLoader.addEventListener('click', addLoadingHandler);
    closeBigPictureButton.addEventListener('click', onCloseBigPictureButtonClick);
    document.addEventListener('keydown', onDocumentEscapeKeyDown);
  };

  picture.addEventListener('click', onPictureClick);
};

export {addPictureClickHandler};
