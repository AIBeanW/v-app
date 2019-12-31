// TODO: 引入不好  晚点单独打包文件
import '@/styles/index.scss';

import Select from './select';
import Option from './option';
import Scroller from './scroller';
import Popup from './popup';
import InputNumber from './input-number';


const components = [
    Scroller,
    Select,
    Option,
    Popup,
    InputNumber
];

const install = function (Vue) {
    if (install.installed) return;
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    Select,
    Option,
    Scroller
};