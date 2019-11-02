import Scroller from './src/main';

Scroller.install = Vue => {
    Vue.component(Scroller.name, Scroller);
};

export default Scroller;