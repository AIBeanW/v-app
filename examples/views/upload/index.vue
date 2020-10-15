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
    <div class="image_crop">
      <v-image-crop :file="file"> </v-image-crop>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: "",
      file: null,
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
      this.file = file;
      return false;
    },
    uploadSuccess(res, item) {
      console.log(res, item);
      this.imgUrl = `http://localhost:8888${res.data.filePath}/${res.data.fileName}`;
    },
    error(error, file) {
      console.log(error, file);
    },
  },
};
</script>

<style lang="scss" scoped>
.image_crop {
  width: 100%;
  height: 50vh;
  border: 1px solid #ccc;
}
</style>