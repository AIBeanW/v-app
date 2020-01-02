<template>
	<div class="v-input-number">
		<button
			:class="{'is-disabled': minDisabled}"
			@click="decrease"
			class="v-button v-input-number_decrease"
		>-</button>
		<button
			:class="{'is-disabled': maxDisabled}"
			@click="increase"
			class="v-button v-input-number_increase"
		>+</button>
		<input
			:disabled="disabled"
			v-model="currentValue"
			class="v-input v-input-number_input"
			type="number"
		/>
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
		},
		disabled: Boolean
	},
	methods: {
		decrease() {
			if (this.minDisabled) return;
			let changeValue = this.currentValue - this.step;
			this.setValue(changeValue);
		},
		increase() {
			if (this.maxDisabled) return;
			let changeValue = this.currentValue + this.step;
			this.setValue(changeValue);
		},
		setValue(newVal) {
			newVal = Number(newVal);
			const oldVal = this.currentValue;
			if (newVal >= this.max) newVal = this.max;
			if (newVal <= this.min) newVal = this.min;
			if (oldVal === newVal) return;
			this.userInput = null;
			this.currentValue = newVal;
			this.$emit("input", newVal);
			this.$emit("change", newVal, oldVal);
		}
	},
	created() {
		this.setValue(this.currentValue);
	},
	watch: {
		value: {
			handler(val) {
				if (this.currentValue !== val) {
					this.currentValue = Number(val) || 0;
				}
			},
			immediate: true
		},
		currentValue(val) {
			this.setValue(val);
		}
	},
	computed: {
		minDisabled() {
			return this.currentValue - this.step < this.min || this.disabled;
		},
		maxDisabled() {
			return this.currentValue + this.step > this.max || this.disabled;
		}
	}
};
</script>