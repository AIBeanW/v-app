<template>
	<div class="v-select">
		<div @click="isShowOption = true" class="v-select_selection">
			<input
				class="v-input"
				v-if="!multiple || multiple && selected.length<=0"
				readonly
				:placeholder="placeholder"
				v-model="selected.currentLabel"
				type="text"
			/>
			<div class="v-select_tag" v-else>
				<span class="v-select_tag_checked" v-for="(option, index) in selected" :key="index">
					<span class="v-select_tag_checked_text">{{option.currentLabel}}</span>
					<i @click.stop="deleteOption(option)" class="v-select_tag_checked_delete">x</i>
				</span>
			</div>
		</div>
		<popup :bodyNode="true" v-model="isShowOption">
			<ul @click.stop class="v-select_dropdown">
				<li class="v-select_dropdown_title">
					<h3 class="v-select_dropdown_title_text">{{placeholder}}</h3>
					<i @click="isShowOption = false" class="v-select_dropdown_title_close">x</i>
				</li>
				<v-scroller class="v-select_dropdown_scroller" :loading="more" @next="handleNext">
					<slot></slot>
				</v-scroller>
			</ul>
		</popup>
	</div>
</template>

<script>
import popup from "~/popup/index";
export default {
	name: "v-select",
	data() {
		return {
			// 是否还有更多
			more: this.remoteMethod ? true : false,
			// 是否弹出选项列表
			isShowOption: false,
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
		},
		remoteMethod: Function
	},
	methods: {
		handleNext() {
			if (this.remoteMethod && this.more) {
				this.remoteMethod(more => {
					this.more = more;
				});
			}
		},
		deleteOption(option) {
			let index = this.value.indexOf(option.value);
			if (index > -1) {
				let values = JSON.parse(JSON.stringify(this.value || []));
				values.splice(index, 1);
				this.$emit("input", values);
				this.$emit("change", values);
			}
		},
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
				let selected = [];
				if (Array.isArray(this.value)) {
					this.value.forEach(value => {
						selected.push(this.getOption(value));
					});
				}
				this.selected = selected;
			} else {
				this.selected = this.getOption(this.value);
			}
		},
		handleOptionSelect(option) {
			if (this.multiple) {
				let values = JSON.parse(JSON.stringify(this.value || []));
				let optionIndex = values.indexOf(option.value);
				if (optionIndex > -1) {
					values.splice(optionIndex, 1);
				} else {
					values.push(option.value);
				}
				this.$emit("input", values);
				this.$emit("change", values);
			} else {
				this.$emit("input", option.value);
				this.$emit("change", option.value);
				this.isShowOption = false;
			}
		}
	},
	created() {
		if (this.multiple && !Array.isArray(this.value)) {
			this.$emit("input", []);
		}
	},
	mounted() {
		this.$on("handleOptionSelect", this.handleOptionSelect);
		this.setSelected();
	},
	watch: {
		value() {
			this.setSelected();
		},
		cachedOptions() {
			this.setSelected();
		}
	},
	components: {
		popup
	}
};
</script>