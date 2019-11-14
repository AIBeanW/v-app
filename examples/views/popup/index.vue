<template>
	<div>
		<button @click="value = true">弹出 {{value}}</button>
		<v-popup v-model="value" position="right">
			<ul>
                <li v-for="el in 20" :key="el">
                    {{el}}
                </li>
            </ul>
		</v-popup>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: true
		};
	}
};
</script>

<style lang="scss" scoped>
    ul{
        width: 50vw;
    }
</style>