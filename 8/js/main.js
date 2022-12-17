import {generatedPictures} from './data.js';
import {renderPictures} from './pictures.js';
import {addUploadFormHandler} from './form.js';

renderPictures(generatedPictures);
addUploadFormHandler();
