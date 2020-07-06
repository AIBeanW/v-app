<template>
    <li
        @click="selectOptionClick"
        class="v-select_list_item"
        :class="{
			'selected': isSelected
		}"
        v-if="select.query === '' || this.select.remoteMethod || currentLabel.indexOf(select.query) !== -1 "
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
        let index = this.select.cachedOptions.findIndex(
            e => e.value === this.value
        );
        if (index !== -1) {
            this.select.cachedOptions[index] = this;
            return;
        }
        this.select.cachedOptions.push(this);
    },
    beforeDestroy() {
        let index = this.select.cachedOptions.indexOf(this);
        // 如果是远程加载的不删除当前选中的this 否则会出现title丢失的情况
        if (this.select.remoteMethod && this.isSelected) return;
        if (index > -1) {
            this.select.cachedOptions.splice(index, 1);
        }
    }
};
</script>