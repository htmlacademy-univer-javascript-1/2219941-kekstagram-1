import {generatedPictures} from './data.js';
import {renderPictures} from './pictures.js';
import {addUploadFormHandler} from './form.js';
import {addEffectEventHandlers} from './effects.js';

renderPictures(generatedPictures);
addUploadFormHandler();
addEffectEventHandlers();
