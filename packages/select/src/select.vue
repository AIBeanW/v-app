<template>
    <div class="v-select">
        <div @click="isShowOption = true" class="v-select_selection">
            <input
                class="v-input"
                v-if="!multiple || multiple && selected.length<=0"
                readonly
                :placeholder="placeholder"
                v-model="selected.currentLabel"
                type="text"
            />
            <div class="v-select_tag" v-else>
                <span class="v-select_tag_checked" v-for="(option, index) in selected" :key="index">
                    <span class="v-select_tag_checked_text">{{option.currentLabel}}</span>
                    <i @click.stop="deleteOption(option)" class="v-select_tag_checked_delete">x</i>
                </span>
            </div>
        </div>
        <popup :bodyNode="bodyNode" v-model="isShowOption">
            <ul @click.stop class="v-select_dropdown">
                <li :class="{'v-select_dropdown_search': search}" class="v-select_dropdown_hearder">
                    <div class="v-select_dropdown_hearder_title">
                        <h3 class="v-select_dropdown_hearder_title_text">{{placeholder}}</h3>
                        <i
                            @click="isShowOption = false"
                            class="v-select_dropdown_hearder_title_close vIcon v-shanchu"
                        ></i>
                    </div>
                    <div v-if="search" class="v-select_dropdown_hearder_search">
                        <input
                            v-model="remoteResults.query"
                            @keyup.enter="handleSearch"
                            @input="handleSearchInput"
                            placeholder="搜索内容"
                            class="v-input v-select_dropdown_hearder_search_input"
                            type="text"
                        />
                        <i
                            @click="handleSearch"
                            class="v-select_dropdown_hearder_search_btn vIcon v-chaxun"
                        ></i>
                    </div>
                </li>
                <div class="v-select_dropdown">
                    <!-- 非远程加载的 -->
                    <div v-show="!remoteMethod" class="v-select_dropdown_selected">
                        <slot></slot>
                    </div>
                    <v-scroller
                        v-if="remoteMethod && this.isShowOption"
                        class="v-select_dropdown_scroller"
                        :loading="loading"
                        @next="loadingOptions"
                    >
                        <v-option
                            v-for="(el,index) in remoteResults.options"
                            :key="index"
                            :value="el.value"
                            :label="el.label"
                        ></v-option>
                    </v-scroller>
                </div>
            </ul>
        </popup>
    </div>
</template>

<script>
import popup from "~/popup/index";
import vOption from "./option";
export default {
    name: "v-select",
    data() {
        return {
            // 是否弹出选项列表
            isShowOption: false,
            // 当前选中
            selected: this.multiple ? [] : {},
            // 缓存的选项
            cachedOptions: [],
            // 远程加载的页码
            remoteResults: {
                options: [],
                more: true,
                page: 0,
                query: ""
            },
            loading: false,
            query: ""
        };
    },
    provide() {
        return {
            select: this
        };
    },
    props: {
        value: {
            required: true
        },
        placeholder: {
            type: String,
            default: "请选择"
        },
        multiple: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        remoteMethod: Function,
        bodyNode: {
            type: Boolean,
            default: true
        },
        search: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleSearchInput() {
            this.query = this.remoteResults.query;
        },
        // 点击搜索
        handleSearch() {
            this.remoteResults.page = 0;
            this.remoteResults.options = [];
            this.remoteResults.more = true;
            if (this.remoteMethod) {
                this.loadingOptions();
            } else {
                this.query = this.remoteResults.query;
            }
        },
        // TODO: 如果这里一页加载数据过少导致没出现滚动条 则会出现已加载完毕的情况
        // 远程加载
        async loadingOptions() {
            if (
                this.remoteMethod && // 是远程加载
                this.isShowOption && // 弹出框已经打开
                !this.loading && // 不在加载中
                this.remoteResults.more // 还有更多数据
            ) {
                this.loading = true;
                let remoteResults = await this.remoteMethod({
                    page: this.remoteResults.page,
                    query: this.remoteResults.query
                });
                this.remoteResults.page++;
                this.remoteResults.options = [
                    ...this.remoteResults.options,
                    ...remoteResults.options
                ];
                this.remoteResults.more = remoteResults.more;
                this.loading = false;
            }
        },
        // 删除 多选选项
        deleteOption(option) {
            let index = this.value.indexOf(option.value);
            if (index > -1) {
                let values = JSON.parse(JSON.stringify(this.value || []));
                values.splice(index, 1);
                this.$emit("input", values);
                this.$emit("change", values);
            }
        },
        getOption(value) {
            let option = this.cachedOptions.find(e => e.value === value);
            if (option) return option;
            return {
                value: value,
                currentLabel: value,
                label: value
            };
        },
        setSelected() {
            if (this.multiple) {
                let selected = [];
                if (Array.isArray(this.value)) {
                    this.value.forEach(value => {
                        selected.push(this.getOption(value));
                    });
                }
                this.selected = selected;
            } else {
                this.selected = this.getOption(this.value);
            }
        },
        handleOptionSelect(option) {
            if (this.multiple) {
                let values = JSON.parse(JSON.stringify(this.value || []));
                let optionIndex = values.indexOf(option.value);
                if (optionIndex > -1) {
                    values.splice(optionIndex, 1);
                } else {
                    values.push(option.value);
                }
                this.$emit("input", values);
                this.$emit(
                    "change",
                    values,
                    values.map(value => {
                        return {
                            value: value,
                            label: this.getOption(value).currentLabel
                        };
                    })
                );
            } else {
                this.$emit("input", option.value);
                this.$emit("change", option.value, {
                    value: option.value,
                    label: option.currentLabel
                });
                this.isShowOption = false;
            }
        }
    },
    created() {
        if (this.multiple && !Array.isArray(this.value)) {
            this.$emit("input", []);
        }
    },
    mounted() {
        this.$on("handleOptionSelect", this.handleOptionSelect);
        this.setSelected();
    },
    watch: {
        value() {
            this.setSelected();
        },
        cachedOptions() {
            this.setSelected();
        },
        isShowOption() {
            // 是远程加载
            if (this.remoteMethod) {
                this.remoteResults.page = 0;
                this.remoteResults.options = [];
                this.remoteResults.more = true;
                this.remoteResults.query = "";
            } else {
                this.query = "";
            }
        }
    },
    components: {
        popup,
        vOption
    }
};
</script>