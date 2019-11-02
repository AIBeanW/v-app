<template>
	<div v-VScroller="next">
		<slot />
		<p v-if="loading" class="v-loading">
			加载中...
			<span>
				<i class="iconfont icon-jiazai"></i>
			</span>
		</p>
		<p class="v-loading" v-else>暂无更多</p>
	</div>
</template>
<script>
import VScroller from "./index.js";
export default {
	name: "v-scroller",
	props: {
		loading: Boolean
	},
	directives: { VScroller },
	methods: {
		next() {
			this.$emit("next");
		}
	}
};
</script>
<style lang="scss" scoped>
.v-loading {
	display: block;
	text-align: center;
	line-height: 30px;
	font-size: 12px;
	span {
		position: relative;
		position: absolute;
		font-size: 12px;
		transition: 0.5s;
		animation: rotate 2s linear infinite;
		@keyframes rotate {
			0% {
				transform: rotate(0);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
}
</style>