<template>
	<li
		@click="selectOptionClick"
		class="v-select_list_item"
		:class="{
        'selected': isSelected
      }"
	>
		<slot>{{ currentLabel }}</slot>
	</li>
</template>

<script>
import Emitter from "@/mixins/emitter.js";
export default {
	name: "v-option",
	mixins: [Emitter],
	inject: ["select"],
	props: {
		value: {
			type: [String, Number],
			required: true
		},
		label: {
			type: [String, Number]
		},
		disabled: {
			type: Boolean,
			default: false
		},
		selected: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		selectOptionClick() {
			this.dispatch("v-select", "handleOptionSelect", this);
		}
	},
	mounted() {},
	computed: {
		isSelected() {
			if (this.select.multiple) {
				return this.select.value.includes(this.value);
			} else {
				return this.value === this.select.value;
			}
		},
		currentLabel() {
			return this.label || this.value;
		}
	},
	created() {
		this.select.cachedOptions.push(this);
	},
	beforeDestroy() {
		let index = this.select.cachedOptions.indexOf(this);
		if (index > -1) {
			this.select.cachedOptions.splice(index, 1);
		}
	}
};
</script>