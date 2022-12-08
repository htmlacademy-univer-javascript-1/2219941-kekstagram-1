import {getRandomIntNumber} from './util.js';

const DESCRIPTIONS = [
  'What a great time!',
  'I love and miss my cat...',
  'slay !!!!',
  'i was so happy at that moment',
  'my favourite movie is Shrek 2 :) and yours?',
  'I wish I was reading more books tbh.',
  'Почему все посты в этой соцсети на английском?'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Людмила Васильева',
  'REAL Elon Musk',
  'Нене',
  'анонимчик',
  'Кекс (не фейк аккаунт)',
  'Барсик'
];

const FIRST_ARRAY_INDEX = 0;
const FIRST_ID = 1;
const ARRAY_ID_FIXER = 1;
const POSTS_NUMBER = 25;
const AVATARS_NUMBER = 6;
const COMMENTERS_NUMBER = 1000;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

const idArrays = {
  'profileIdList': Array.from({length: POSTS_NUMBER}, (_, i) => i + FIRST_ID),
  'photoIdList': Array.from({length: POSTS_NUMBER}, (_, i) => i + FIRST_ID)
};

const getUniqueId = (idListName) => {
  const indexOfNumber = getRandomIntNumber(1, idArrays[idListName].length);
  const result = idArrays[idListName][indexOfNumber - ARRAY_ID_FIXER];
  idArrays[idListName].splice(indexOfNumber - ARRAY_ID_FIXER, 1);
  return result;
};

const createComment = () => ({
  id: getRandomIntNumber(FIRST_ID, COMMENTERS_NUMBER),
  avatar: `img/avatar-${getRandomIntNumber(FIRST_ID, AVATARS_NUMBER)}.svg`,
  message: COMMENTS[getRandomIntNumber(FIRST_ARRAY_INDEX, COMMENTS.length - ARRAY_ID_FIXER)],
  name: NAMES[getRandomIntNumber(FIRST_ARRAY_INDEX, NAMES.length - ARRAY_ID_FIXER)]
});

const createPicture = () => ({
  id: getUniqueId('profileIdList'),
  url: `photos/${getUniqueId('photoIdList')}.jpg`,
  description: DESCRIPTIONS[getRandomIntNumber(FIRST_ARRAY_INDEX, DESCRIPTIONS.length - ARRAY_ID_FIXER)],
  likes: getRandomIntNumber(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandomIntNumber(1, NAMES.length)}, createComment)
});

const generatedPictures = Array.from({length: POSTS_NUMBER}, createPicture);
console.log(generatedPictures);

export {generatedPictures};
