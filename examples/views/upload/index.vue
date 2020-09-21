<template>
    <div>
        <v-upload
            :url="`http://localhost:8888/api/upload`"
            :success="uploadSuccess"
            :error="error"
            :beforeUpload="beforeUpload"
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
        test(){
            return new Promise(res=>{
              setTimeout(() => {
                  res()
              }, 3000);  
            })
        },
        beforeUpload(file){
            return false
        },
        uploadSuccess(){

        },
        error(error, file){
            console.log(error)
        },

    }
};
</script>

<style lang="scss" scoped>
</style>