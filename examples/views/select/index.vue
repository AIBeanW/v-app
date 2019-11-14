<template>
	<div>
		<ol>
			<li>
				<p>标准的</p>
				<v-select v-model="value">
					<v-option v-for="(item,index) in values" :value="item" :label="item+index" :key="index"></v-option>
				</v-select>
			</li>
			<li>
				<p>多选的</p>
				<v-select multiple v-model="multipleValue">
					<v-option v-for="(item,index) in values" :value="item" :label="item+index" :key="index"></v-option>
				</v-select>
			</li>
			<li>
				<p>远程加载的</p>
				<p>remoteMethod 是否加载更多（适用于分页功能） 参数 callback(Boolean) true 代表还有数据 false代表加载完毕</p>
				<v-select :remoteMethod="remoteMethod" v-model="value">
					<v-option v-for="(item,index) in values" :value="item" :label="item+index" :key="index"></v-option>
				</v-select>
			</li>
		</ol>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: "beijing",
			multipleValue: [],
			values: [
				"北京",
				"天津",
				"上海",
				"重庆",
				"新疆",
				"西藏",
				"宁夏",
				"内蒙古",
				"广西",
				"黑龙江",
				"吉林",
				"辽宁",
				"河北",
				"山东",
				"江苏",
				"安徽",
				"浙江",
				"福建",
				"广东海南云南贵州",
				"四川",
				"湖南",
				"湖北",
				"河南",
				"山西陕西",
				"甘肃",
				"青海",
				"江西",
				"台湾",
				"香港",
				"澳门"
			]
		};
	},
	methods: {
		remoteMethod(callback) {
			this.values.push(
				...[
					"天津",
					"上海",
					"重庆",
					"新疆",
					"西藏",
					"宁夏",
					"内蒙古",
					"广西",
					"黑龙江",
					"吉林",
					"辽宁",
					"河北",
					"山东",
					"江苏",
					"安徽",
					"浙江",
					"福建",
					"广东海南云南贵州",
					"四川",
					"湖南",
					"湖北",
					"河南",
					"山西陕西",
					"甘肃",
					"青海",
					"江西",
					"台湾"
				]
			);
			callback(false);
		}
	}
};
</script>