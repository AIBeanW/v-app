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
		}
	]
})
