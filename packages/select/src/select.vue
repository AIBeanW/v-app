<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'v-select',
    mounted(){
        this.$on('setSelected', this.setSelected)
    },
    methods:{
        setSelected({a}){
            console.log('测试'+a)
        }
    }
}
</script>