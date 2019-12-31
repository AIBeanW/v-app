<template>
	<div id="app">
		github地址:<a href="https://github.com/AIBeanW/v-app">https://github.com/AIBeanW/v-app</a>
		<h3>
			请使用手机模式进行预览
		</h3>
		<br>
		<ul class="components clearfix">
			<li v-for="(component, index) in components" :key="index">
				<router-link :to="component.path">{{component.name}}</router-link>
			</li>
		</ul>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	data() {
		return {
			components: [
				{
					name: "select",
					path: "/select"
				},
				{
					name: "popup",
					path: "/popup"
				},
				{
					name: "inputNumber",
					path: "/inputNumber"
				}
			]
		};
	}
};
</script>

<style lang="scss">
@import "@/styles/index.scss";
#app {
	padding: 20px;
	.components {
		margin-bottom: 50px;
		padding: 0;
		list-style: none;
		li {
			float: left;
			margin-right: 15px;
		}
	}
}

.clearfix {
	zoom: 1;
}

.clearfix:after {
	content: ".";
	width: 0;
	height: 0;
	visibility: hidden;
	display: block;
	clear: both;
	overflow: hidden;
}
</style>
