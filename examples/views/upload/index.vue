<template>
  <div>
    <v-upload
      :url="`http://localhost:8888/api/upload`"
      :success="uploadSuccess"
      :error="error"
      :beforeUpload="beforeUpload"
    >
      <span> + </span>
    </v-upload>
    <img :src="imgUrl" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: "",
    };
  },
  methods: {
    test() {
      return new Promise((res) => {
        setTimeout(() => {
          res();
        }, 3000);
      });
    },
    beforeUpload(file) {
      return true;
    },
    uploadSuccess(res, item) {
        console.log(res)
      this.imgUrl = `http://localhost:8888${res.data.filePath}/${res.data.fileName}`;
    },
    error(error, file) {
      console.log(error);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>