import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/select',
			component: resolve => require(['./views/select/index.vue'], resolve)
		},
		{
			path: '/popup',
			component: resolve => require(['./views/popup/index.vue'], resolve)
		},
		{
			path: '/inputNumber',
			component: resolve => require(['./views/inputNumber/index.vue'], resolve)
		},
		{
			path: '/upload',
			component: resolve => require(['./views/upload/index.vue'], resolve)
		}
	]
})
