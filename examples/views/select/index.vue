<template>
	<div>
		<ol>
			<li>
				<p>标准的</p>
				<v-select v-model="value2">
					<v-option v-for="(item,index) in values2" :value="item.value" :label="item.label" :key="index"></v-option>
				</v-select>
			</li>
			<li>
				<p>多选的</p>
				<v-select :search="true" multiple v-model="multipleValue">
					<v-option v-for="(item,index) in values2" :value="item.value" :label="item.label" :key="index"></v-option>
				</v-select>
			</li>
			<li>
				<p>远程加载的</p>
				<p>remoteMethod 加载更多（适用于分页功能） 参数page 当前页码</p>
				<v-select :remoteMethod="remoteMethod" v-model="value2">
					<v-option  value="2" label="选项2"></v-option>
				</v-select>
			</li>
		</ol>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value2: "2",
			multipleValue: [],
			value: ["beijing2", "十3"],
			values: [],
			values2: [
				{
					value: "2",
					label: "二"
				},
				{
					value: "3",
					label: "3"
				},
				{
					value: "4",
					label: "4"
				}
			],
			index: 0
		};
	},
	methods: {
		async remoteMethod({ page, query } = {}) {
			return new Promise(res => {
				console.log(query)
				setTimeout(() => {
					let arr = [];
					for (var i = 0; i < 20; i++) {
						arr.push({
							value: "" + (page * 20 + i),
							label: "选项" + (page * 20 + i)
						});
					}
					res({
						options: arr,
						more: page < 4
					});
				}, 1000);
			});
		}
	}
};
</script>