<template>
</template>

<script>
import popup from "~/popup/index";
export default {
	data() {
		return {
		};
	},
	props: {
		placeholder: {
			type: String
		},
		more: {
			type: Boolean
		},
		handleNext: Function
	},
	mounted() {
		if (this.$el) {
			document.body.appendChild(this.$el);
		}
	},
	components: {
		popup
	}
};
</script>