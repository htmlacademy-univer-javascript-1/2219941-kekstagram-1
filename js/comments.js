import {changeWord} from './util.js';

const MAX_COMMENTS_SHOWN = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentTemplateElement = bigPictureElement.querySelector('.social__comment').cloneNode(true);
const commentSectionElement = bigPictureElement.querySelector('.social__comments');
const commentsCountTextElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoadingButtonElement = bigPictureElement.querySelector('.comments-loader');

const createComment = (commentData) => {
  const comment = commentTemplateElement.cloneNode(true);
  const commentPicture = comment.querySelector('img');
  commentPicture.src = commentData.avatar;
  commentPicture.alt = commentData.name;
  comment.querySelector('p').textContent = commentData.message;
  return comment;
};

const createCommentsArray = (pictureData) => {
  commentSectionElement.innerHTML = '';
  const newComments = [];
  for (let i = 0; i < pictureData.comments.length; i++) {
    newComments.push(createComment(pictureData.comments[i]));
  }
  return newComments;
};

const alternateCommentSection = (commentsArray) => {
  const commentsAmount = commentsArray.length;
  const commentsFragment = document.createDocumentFragment();
  const currentCommentsCount = commentSectionElement.children.length;
  const commentsLimit = currentCommentsCount + MAX_COMMENTS_SHOWN >= commentsAmount ? commentsAmount : currentCommentsCount + MAX_COMMENTS_SHOWN;
  commentsCountTextElement.innerHTML = `${commentsLimit} из <span class="comments-count">${commentsAmount}</span> ${changeWord('комментария', 'комментариев', commentsAmount)}`;
  commentsArray.slice(currentCommentsCount, commentsLimit).forEach((comment) => {
    commentsFragment.appendChild(comment);
  });
  commentSectionElement.appendChild(commentsFragment);

  if (currentCommentsCount + MAX_COMMENTS_SHOWN >= commentsAmount) {
    commentsLoadingButtonElement.classList.add('hidden');
  } else {
    commentsLoadingButtonElement.classList.remove('hidden');
  }
};

export {alternateCommentSection, createCommentsArray};
