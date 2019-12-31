<template>
	<div class="v-input-number">
		<button @click="decrease" class="v-button v-input-number_decrease">-</button>
		<button @click="increase" class="v-button v-input-number_increase">+</button>
		<input v-model="currentValue" class="v-input v-input-number_input" type="number" />
	</div>
</template>

<script>
export default {
	name: "v-input-number",
	data() {
		return {
			currentValue: 0
		};
	},
	props: {
		value: {
			type: Number
		},
		step: {
			type: Number,
			default: 1
		},
		max: {
			type: Number,
			default: Infinity
		},
		min: {
			type: Number,
			default: -Infinity
		}
	},
	methods: {
		decrease() {
			let changeValue = this.currentValue - this.step;
			if (this.max) {
			}
		},
		increase() {},
		setValue() {}
	},
	watch: {
		value: {
			handler(val) {
				if (this.currentValue !== val) {
					this.currentValue = Number(val) || 0;
				}
			},
			immediate: true
		}
	}
};
</script>
<style lang="scss" scoped>
.v-input-number {
	display: inline-block;
	position: relative;
	height: 30px;
	.v-input-number_input {
		width: 100px;
		text-align: center;
		border: 0.5px solid #bbb;
		border-radius: 4px;
		line-height: 29px;
	}
	.v-input-number_decrease,
	.v-input-number_increase {
		position: absolute;
		z-index: var(v-index-normal);
		top: 0.6px;
		width: 30px;
		height: 29px;
		text-align: center;
		background: #f5f7fa;
		color: #606266;
		cursor: pointer;
		font-size: 13px;
	}
	.v-input-number_decrease {
		left: 0.6px;
		border-radius: 3px 0 0 3px;
	}
	.v-input-number_increase {
		right: 0.6px;
		border-radius: 0 3px 3px 0;
	}
}
</style>