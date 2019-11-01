import Test from './test';
import Select from './select';
import Option from './option';
import Scroller from './scroller';

const components = [Test, Scroller, Select, Option];

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
    Test,
    Select,
    Option,
    Scroller
};