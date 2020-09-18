<template>
    <div>
        <v-upload
            :success="uploadSuccess"
            :error="error"
        >
        
            <span>
            +
            </span>
        </v-upload>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods:{
        uploadSuccess(){

        },
        error(error){

        },

    }
};
</script>

<style lang="scss" scoped>
</style>