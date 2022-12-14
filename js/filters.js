import {shuffleArray, debounce} from './util.js';
import {pictures} from './main.js';
import {renderPictures, removePictures} from './pictures.js';

const FILTERS_CLICK_DELAY = 500;
const RANDOM_PICTURES_COUNT = 10;

const filtersForm = document.querySelector('.img-filters');

const filterFunctions = {
  'filter-default': () => pictures.slice(),
  'filter-random': () => shuffleArray(pictures).slice(0, RANDOM_PICTURES_COUNT),
  'filter-discussed': () => pictures.slice().sort((firstPicture, secondPicture) =>
    secondPicture.comments.length - firstPicture.comments.length)
};

const onFiltersFormClick = debounce((evt) => {
  if (evt.target.tagName === 'BUTTON') {
    const targetedFilter = evt.target;
    const selectedFilter = filtersForm.querySelector('.img-filters__button--active');
    if (selectedFilter) {
      selectedFilter.classList.remove('img-filters__button--active');
    }
    targetedFilter.classList.add('img-filters__button--active');
    removePictures();
    renderPictures(filterFunctions[targetedFilter.id]());
  }
}, FILTERS_CLICK_DELAY);

const connectFilters = () => {
  filtersForm.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFiltersFormClick);
};

export {connectFilters};
