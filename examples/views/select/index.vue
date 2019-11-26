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
				<v-select multiple v-model="multipleValue">
					<v-option v-for="(item,index) in values2" :value="item.value" :label="item.label" :key="index"></v-option>
				</v-select>
			</li>
			<li>
				<p>远程加载的</p>
				<p>remoteMethod 是否加载更多（适用于分页功能） 参数 callback(Boolean) true 代表还有数据 false代表加载完毕</p>
				<v-select :remoteMethod="remoteMethod" multiple v-model="value">
					<v-option v-for="(item,index) in values" :value="item.value" :label="item.label" :key="index"></v-option>
				</v-select>
			</li>
		</ol>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value2: "beijing",
			multipleValue: [],
			value: ["beijing2", "十3"],
			values: [],
			values2: [
				{
					value: "beijing",
					label: "北京"
				},
				{
					value: "shanghai",
					label: "上海"
				},
				{
					value: "chongqing",
					label: "重庆"
				}
			],
			index: 0
		};
	},
	methods: {
		remoteMethod(callback) {
			this.values.push(
				...[
					{
						value: "beijing" + this.index,
						label: "北京" + this.index
					},
					{
						value: "shanghai" + this.index,
						label: "上海" + this.index
					},
					{
						value: "一" + this.index,
						label: "一一" + this.index
					},
					{
						value: "二" + this.index,
						label: "二" + this.index
					},
					{
						value: "三" + this.index,
						label: "三三" + this.index
					},
					{
						value: "四" + this.index,
						label: "四四" + this.index
					},
					{
						value: "五" + this.index,
						label: "五五" + this.index
					},
					{
						value: "六" + this.index,
						label: "六六" + this.index
					},
					{
						value: "七" + this.index,
						label: "七" + this.index
					},
					{
						value: "八" + this.index,
						label: "八八" + this.index
					},
					{
						value: "九" + this.index,
						label: "九九" + this.index
					},
					{
						value: "十" + this.index,
						label: "十十" + this.index
					}
				]
			);
			this.index++;
			if (this.index > 3) {
				callback(false);
				return;
			}
			callback(true);
		}
	}
};
</script>