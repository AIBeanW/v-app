import Popup from './src/main';

Popup.install = Vue => {
    Vue.component(Popup.name, Popup);
};

export default Popup;