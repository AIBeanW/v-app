<template>
	<div>
		设置step属性可以控制步长，接受一个Number。
		<br />disabled属性接受一个Boolean，设置为true即可禁用整个组件
		<br />min和max时，默认最小值为 0。
		<div>
			<v-input-number v-model="value" />
		</div>
		{{value}}
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: 1
		};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
</style>