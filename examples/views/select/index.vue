<template>
	<div>
		<v-select v-model="value">
			<v-option v-for="(item,index) in ['beijing', 'shanhai', 'qingdao']" :value="item" :label="item+index" :key="index"></v-option>
		</v-select>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: '2222'
		}
	},	
}
</script>