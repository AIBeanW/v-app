<template>
  <div class="image-crop">
    <img ref="img" class="image-crop_img" />
    <div ref="operationScroll" class="image-crop_operation_container"></div>
  </div>
</template>

<script>
import { getScrollEventTarget } from "@/utils/util.js";
export default {
  name: "v-image-crop",
  data() {
    return {
      containerInformation: {
        width: 0,
        height: 0,
      },
    };
  },
  props: {
    file: File,
  },
  methods: {
    // 获取图片信息
    getImageInformation(file) {
      return new Promise((res) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (theFile) {
          let image = new Image();
          image.src = theFile.target.result;
          image.onload = function () {
            res({
              width: this.width,
              height: this.height,
              result: theFile.target.result,
            });
          };
        };
      });
    },
    // 获取操作区的宽高
    getContainerInformation() {
      this.containerInformation.width = this.$el.offsetWidth;
      this.containerInformation.height = this.$el.offsetHeight;
    },
    async init() {
      if (this.file) {
        this.getContainerInformation();
        let imageInformation = await this.getImageInformation(this.file);
        if (imageInformation.width > imageInformation.height) {
          this.$refs.img.style.height = "100%";
        } else {
          this.$refs.img.style.width = "100%";
        }
        this.$refs.img.src = imageInformation.result;
        this.listenerTouch();
      }
    },
    listenerTouch() {
      let position = {
        X: 0,
        Y: 0,
      };
      let operationScroll = this.$refs.operationScroll,
        touchstart = (e) => {
          if (e.touches[0]) {
            position.X = e.touches[0].clientX;
            position.Y = e.touches[0].clientY;
          }
        },
        touchend = (e) => {
          this.$refs.img.style.top = this.$refs.img.offsetTop + 'px';
          this.$refs.img.style.left= this.$refs.img.offsetLeft + 'px';
          this.$refs.img.style.marginTop= '0px';
          this.$refs.img.style.marginLeft= '0px';
        },
        touchmove = (e) => {
          if (e.touches[0]) {
            this.$refs.img.style.marginLeft = e.touches[0].clientX - position.X + 'px';
            this.$refs.img.style.marginTop = e.touches[0].clientY - position.Y + 'px';
          }
        },
        // 屏蔽父级的滚动功能
        scrollEventTarget = getScrollEventTarget(this.$el),
        scrollEventTargetData = {
          overflowY: scrollEventTarget.style.overflowY,
          overflowX: scrollEventTarget.style.overflowX,
        };
      scrollEventTarget.style.overflowY = "hidden";
      scrollEventTarget.style.overflowX = "hidden";

      operationScroll.addEventListener("touchstart", touchstart);
      operationScroll.addEventListener("touchend", touchend);
      operationScroll.addEventListener("touchmove", touchmove);
      this.$once("hook:beforeDestroy", () => {
        // 销毁滚动
        operationScroll.removeEventListener("touchstart", touchstart);
        operationScroll.removeEventListener("touchend", touchend);
        operationScroll.removeEventListener("touchmove", touchmove);
        scrollEventTarget.style.overflowY = scrollEventTargetData.overflowY;
        scrollEventTarget.style.overflowX = scrollEventTargetData.overflowX;
      });
    },
    imgScroll() {},
  },
  mounted() {
    window.addEventListener("resize", this.init);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", this.init);
    });
  },
  watch: {
    file(file) {
      this.init();
    },
  },
};
</script>

<style lang="scss" scoped>
.image-crop {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .image-crop_img {
    position: absolute;
    top: 0;
    left: 0;
  }
  .image-crop_operation_container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // pointer-events: none;
    background: rgba($color: #000000, $alpha: 0.5);
  }
}
</style>

