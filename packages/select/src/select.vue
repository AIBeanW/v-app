<template>
	<div class="v-select">
		<div class="v-select_input">
			<div>
				<span :class="value ? 'v-select_value' : 'v-select_placeholder'">{{value ? selected.currentLabel : placeholder}}</span>
			</div>
		</div>
		<ul class="v-select_dropdown">
			<slot></slot>
		</ul>
	</div>
</template>

<script>
export default {
	name: "v-select",
	data() {
		return {
			// 当前选中
			selected: this.multiple ? [] : {},
			// 缓存的选项
			cachedOptions: []
		};
	},
	provide() {
		return {
			select: this
		};
	},
	props: {
		value: {
			required: true
		},
		placeholder: {
			type: String,
			default: "请选择..."
		},
		multiple: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	mounted() {
		this.$on("handleOptionSelect", this.handleOptionSelect);
		this.setSelected();
	},
	methods: {
		getOption(value) {
			let option = this.cachedOptions.find(e => e.value === value);
			if (option) return option;
			return {
				value: value,
				currentLabel: value,
				label: value
			};
		},
		setSelected() {
			if (this.multiple) {
			} else {
				this.selected = this.getOption(this.value);
			}
		},
		handleOptionSelect(option) {
			if (this.multiple) {
			} else {
				this.$emit("input", option.value);
				this.emitChange(option.value);
			}
		},
		emitChange(val) {
			this.$emit("change", val);
		}
	},
	watch: {
		value() {
			this.setSelected();
		}
	}
};
</script>

<style lang="scss" scoped>
.v-select {
	display: inline-block;
	width: 100%;
	box-sizing: border-box;
	color: #495060;
	font-size: 14px;
	.v-select_input {
		display: block;
		width: 100%;
		height: 32px;
		box-sizing: border-box;
		border: 1px solid #dddeee;
		border-radius: 4px;
		.v-select_value,
		.v-select_placeholder {
			display: block;
			height: 30px;
			line-height: 30px;
			box-sizing: border-box;
			padding-left: 8px;
			padding-right: 24px;
			font-size: 12px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.v-select_value {
		}
		.v-select_placeholder {
			color: #bbbec4;
		}
	}
	.v-select_dropdown {
		list-style: none;
		padding: 0;
	}
}
</style>