import Test from './test';
import Select from './select';
import Option from './option';

const components = [Test, Select, Option];

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
    Option
};