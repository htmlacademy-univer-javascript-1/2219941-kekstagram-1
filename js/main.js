const descriptions = [
  'What a great time!',
  'I love and miss my cat...',
  'slay !!!!',
  'i was so happy at that moment',
  'my favourite movie is Shrek 2 :) and yours?',
  'I wish I was reading more books tbh.',
  'Почему все посты в этой соцсети на английском?'
];

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Людмила Васильева',
  'REAL Elon Musk',
  'Нене',
  'анонимчик',
  'Кекс (не фейк аккаунт)',
  'Барсик'
];


const FIRSTARRAYINDEX = 0;
const FIRSTID = 1;
const ARRAYIDFIXER = 1;
const postsNumber = 25;
const commentersNumber = 1000;
const avatarsNumber = 6;
const minLikes = 15;
const maxLikes = 200;

const idArrays = {
  'profileIdList': Array.from({length: postsNumber}, (_, i) => i + FIRSTID),
  'photoIdList': Array.from({length: postsNumber}, (_, i) => i + FIRSTID)
};

const getRandomIntNumber = (min,max) => {
  min = min < 0 ? Math.abs(min) : min;
  max = max < 0 ? Math.abs(max) : max;
  return min < max ? Math.floor(Math.random() * (max - min + 1) + min)
    : Math.floor(Math.random() * (max - min + 1) + min);
};

const checkLineLength = (line, maxLength) => line.length <= maxLength;
checkLineLength('cool line', postsNumber);

const getUniqueId = (idListName) => {
  const indexOfNumber = getRandomIntNumber(1, idArrays[idListName].length);
  const result = idArrays[idListName][indexOfNumber - ARRAYIDFIXER];
  idArrays[idListName].splice(indexOfNumber - ARRAYIDFIXER, 1);
  return result;
};

const createComment = () => ({
  id: getRandomIntNumber(FIRSTID, commentersNumber),
  avatar: `img/avatar-${getRandomIntNumber(FIRSTID, avatarsNumber)}.svg`,
  message: comments[getRandomIntNumber(FIRSTARRAYINDEX, comments.length - ARRAYIDFIXER)],
  name: names[getRandomIntNumber(FIRSTARRAYINDEX, names.length - ARRAYIDFIXER)]
});

const createPicture = () => ({
  id: getUniqueId('profileIdList'),
  url: `photos/${getUniqueId('photoIdList')}.jpg`,
  description: descriptions[getRandomIntNumber(FIRSTARRAYINDEX, descriptions.length - ARRAYIDFIXER)],
  likes: getRandomIntNumber(minLikes, maxLikes),
  comments: Array.from({length: getRandomIntNumber(1, names.length)}, createComment)
});

const differentPictures = Array.from({length: postsNumber}, createPicture);
differentPictures.reverse();
