<template>
    <div @click="selectOptionClick">
        <slot></slot>
    </div>
</template>

<script>
import Emitter from "@/mixins/emitter.js"
export default {
    name: 'v-option',
    mixins: [Emitter],
    methods:{
        selectOptionClick(){
            this.dispatch('v-select', 'setSelected', {
                a: 1
            })
        }
    }
}
</script>