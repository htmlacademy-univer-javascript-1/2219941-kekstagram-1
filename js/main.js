import {renderPictures} from './pictures.js';
import {addFormEventsHandler} from './form.js';
import {addEffectEventHandlers} from './effects.js';
import {sendRequest} from './fetch.js';

let pictures = [];

const onSuccess = (data) => {
  pictures = data.slice();
  renderPictures(pictures);
  addFormEventsHandler();
  addEffectEventHandlers();
};

const onFail = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.left = '0';
  messageAlert.style.top = '0';
  messageAlert.style.right = '0';
  messageAlert.style.height = '50px';
  messageAlert.style.padding = '15px 3px';
  messageAlert.style.fontSize = '30px';
  messageAlert.style.textAlign = 'center';
  messageAlert.style.backgroundColor = '#C22400';
  messageAlert.style.color = 'white';
  messageAlert.textContent = 'Произошла ошибка при загрузке фотографий';

  document.body.append(messageAlert);
};

sendRequest(onSuccess, onFail, 'GET');

export {pictures};
