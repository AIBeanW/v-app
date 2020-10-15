import ImageCrop from './src/main';
ImageCrop.install = Vue => {
    Vue.component(ImageCrop.name, ImageCrop);
};

export default ImageCrop;