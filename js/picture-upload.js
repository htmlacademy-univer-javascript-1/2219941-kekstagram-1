const ACCEPTABLE_EXTENSIONS = ['jpg', 'jpeg', 'png'];

const pictureChooser = document.querySelector('#upload-file');
const picturePreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const addUploadedPhoto = () => {
  const userPicture = pictureChooser.files[0];
  const pictureName = userPicture.name.toLowerCase();
  if (ACCEPTABLE_EXTENSIONS.some((extension) => pictureName.endsWith(extension))) {
    const pictureURL = URL.createObjectURL(userPicture);
    picturePreview.src = pictureURL;
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url(${pictureURL})`;
    });
  }
};

export {addUploadedPhoto};
