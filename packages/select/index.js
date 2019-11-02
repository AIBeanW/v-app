import Select from './src/select';

Select.install = Vue => {
    Vue.component(Select.name, Select);
};

export default Select;