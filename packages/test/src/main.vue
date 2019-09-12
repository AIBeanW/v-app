<template>
    <div>
        我的是组件  {{title}}
    </div>
</template>

<script>
export default {
    name: 'v-test',
    props: {
        title: {
            type: String,
            default: '不填默认值就是傻子一个'
        }
    }
}
</script>