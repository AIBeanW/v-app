<template>
	<div @click="destroyPopper" class="v-popup" :class="{'v-popup_show': showPopup}">
		<div :class="`v-popup_${position}`" @click.stop class="v-popup_container">
			<slot />
		</div>
	</div>
</template>

<script>
import { getScrollEventTarget } from "@/utils/util.js";
export default {
	name: "v-popup",
	data() {
		return {
			showPopup: false,
			bottomScroll: []
		};
	},
	props: {
		value: {
			type: Boolean,
			required: false
		},
		position: {
			type: String,
			default: "bottom",
			validator: function(value) {
				return (
					["bottom", "top", "left", "right", "middle"].indexOf(
						value
					) !== -1
				);
			}
		},
		bodyNode: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		destroyPopper() {
			if (this.showPopup) {
				this.showPopup = false;
				setTimeout(() => {
					if (this.bodyNode) {
						this.$el.remove();
					} else {
						this.$el.style.display = "none";
					}
					this.handlerBottomRoll("auto");
					this.$emit("input", false);
				}, 200);
			}
		},
		handlerBottomRoll(type) {
			if (type == "hidden") {
				let scrollEventTarget = getScrollEventTarget(this.$el);
				scrollEventTarget.style.overflowY = type;
				this.bottomScroll.push(scrollEventTarget);
			} else {
				this.bottomScroll.forEach(e => {
					e.style.overflowY = type;
				});
				this.bottomScroll = [];
			}
		},
		createPopper() {
			if (this.bodyNode) {
				document.body.appendChild(this.$el);
			}
			this.$el.style.display = "block";
			this.handlerBottomRoll("hidden");
			this.showPopup = true;
		}
	},
	destroyed() {
		this.destroyPopper();
	},
	watch: {
		value: {
			handler(val) {
				this.$nextTick(() => {
					val ? this.createPopper() : this.destroyPopper();
				});
			},
			immediate: true
		}
	}
};
</script>