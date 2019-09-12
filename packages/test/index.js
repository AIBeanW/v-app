import Test from './src/main';

Test.install = Vue => {
    Vue.component(Test.name, Test);
};

export default Test;