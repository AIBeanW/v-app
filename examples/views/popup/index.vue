<template>
	<div>
		<button
			class="btn"
			v-for="(el,index) in positions"
			:key="index"
			@click="showPopUp(el)"
		>{{el.name}}</button>
		<ul class="test">
			<li v-for="el in 50" :key="el">{{el}}</li>
		</ul>
		<v-popup v-model="value" :position="currerntPosition">
			<ul class="popup">
				<li v-for="el in 20" :key="el">{{el}}</li>
			</ul>
		</v-popup>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: false,
			currerntPosition: "bottom",
			positions: [
				{
					name: "顶部",
					tag: "top"
				},
				{
					name: "右侧",
					tag: "right"
				},
				{
					name: "底部",
					tag: "bottom"
				},
				{
					name: "左侧",
					tag: "left"
				},
				{
					name: "中间",
					tag: "middle"
				}
			]
		};
	},
	methods: {
		showPopUp(el) {
			this.currerntPosition = el.tag;
			this.value = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.btn {
	display: block;
	margin-bottom: 15px;
	padding: 6px;
}
.popup {
	width: 50vw;
	height: 200px;
	overflow: auto;
}
</style>