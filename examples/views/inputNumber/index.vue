<template>
	<div>
		<div>
			可添加min和max
			<br />
			<v-input-number v-model="value" :min="0" :max="6" />
		</div>
		<div>
			disabled属性接受一个Boolean，设置为true即可禁用整个组件
			<br />
			<v-input-number disabled v-model="value" :min="0" :max="6" />
		</div>
		<div>
			设置step属性可以控制步长，接受一个Number。
			<br />
			<v-input-number v-model="value" :min="0" :max="6" />
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