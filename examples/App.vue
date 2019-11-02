<template>
	<div id="app">
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
