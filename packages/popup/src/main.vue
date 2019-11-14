<template>
	<div v-if="showOverlay" @click="close" class="v-popup" :class="{'v-popup_show': showPopup}">
		<div :class="`v-popup_${position}`" @click.stop class="v-popup_container">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: "v-popup",
	data() {
		return {
			showOverlay: false,
			showPopup: false
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
				return ["bottom", "top", "left", "right"].indexOf(value) !== -1;
			}
		}
	},
	methods: {
		close() {
			this.$emit("input", false);
		}
	},
	watch: {
		value: {
			handler(val) {
				if (val) {
					this.showOverlay = val;
					setTimeout(() => {
						this.showPopup = val;
					}, 1);
				} else {
					this.showPopup = val;
					setTimeout(() => {
						this.showOverlay = val;
					}, 200);
				}
			},
			immediate: true
		}
	}
};
</script>