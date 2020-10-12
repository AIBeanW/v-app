<template>
  <div id="app">
    <h3>请使用手机模式进行预览</h3>
    <br />
    <ul class="components clearfix">
      <li v-for="(component, index) in components" :key="index">
        <router-link :to="component.path">{{ component.name }}</router-link>
      </li>
    </ul>
    <router-view></router-view>
    <div class="footer">
      <a href="https://github.com/AIBeanW/v-app">代码仓库</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      components: [
        {
          name: "select",
          path: "/select",
        },
        {
          name: "popup",
          path: "/popup",
        },
        {
          name: "inputNumber",
          path: "/inputNumber",
        },
        {
          name: "upload",
          path: "/upload",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "@/styles/index.scss";
#app {
  position: relative;
  min-height: 100vh;
	padding: 20px;
	padding-bottom: 45px;
  box-sizing: border-box;
  .components {
    margin-bottom: 50px;
    padding: 0;
    list-style: none;
    li {
      float: left;
      margin-right: 15px;
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
		left: 0;
    width: 100%;
    // transform: translateY(-100%);
    padding: 10px 20px;
    border-top: 1px solid #ccc;
    box-sizing: border-box;
  }
}

.clearfix {
  zoom: 1;
}

.clearfix:after {
  content: ".";
  width: 0;
  height: 0;
  visibility: hidden;
  display: block;
  clear: both;
  overflow: hidden;
}
</style>
