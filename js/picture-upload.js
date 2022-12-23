const acceptableExtensions = ['jpg', 'jpeg', 'png'];

const imgUploadFormElement = document.querySelector('.img-upload__form');
const pictureChooserElement = imgUploadFormElement.querySelector('#upload-file');
const picturePreviewElement = imgUploadFormElement.querySelector('.img-upload__preview').querySelector('img');
const effectsPreviewElement = imgUploadFormElement.querySelectorAll('.effects__preview');

const addUploadedPhoto = () => {
  const userPicture = pictureChooserElement.files[0];
  const pictureName = userPicture.name.toLowerCase();
  if (acceptableExtensions.some((extension) => pictureName.endsWith(extension))) {
    const pictureURL = URL.createObjectURL(userPicture);
    picturePreviewElement.src = pictureURL;
    effectsPreviewElement.forEach((preview) => {
      preview.style.backgroundImage = `url(${pictureURL})`;
    });
  }
};

export {addUploadedPhoto};
