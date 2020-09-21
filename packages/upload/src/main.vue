<template>
    <div class="v-upload" @click="changeInput">
        <input
            :multiple="multiple"
            class="v-upload_input"
            ref="file"
            @change="inputChange($event)"
            type="file"
        />
        <slot></slot>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "v-upload",
    data() {
        return {};
    },
    props: {
        url: String,
        format: {
            type: Array,
            default: () => [],
        },
        maxSize: {
            type: Number,
            default: 200000000,
        },
        headers: {
            type: Object,
            default: () => {
                return {};
            },
        },
        data: {
            type: Object,
            default: () => {
                return {};
            },
        },
        multiple: {
            type: Boolean,
            default: true,
        },
        // 上传之前
        beforeUpload: {
            type: Function,
            default: () => true,
        },
        // 上传中 进度
        uploading: {
            type: Function,
            default: () => {},
        },
        success: {
            type: Function,
            default: () => {},
        },
        error: {
            type: Function,
            default: () => {},
        },
    },
    methods: {
        // 触发input事件
        changeInput() {
            if (!this.url) {
                this.error({
                    message: "请填写上传地址~",
                });
                return;
            }
            let evt = new MouseEvent("click", {
                bubbles: false,
                cancelable: true,
                view: window,
            });
            this.$refs.file.dispatchEvent(evt);
        },
        // 匹配类型
        upload(item) {
            let reader = new FileReader();
            reader.readAsDataURL(item);
            let _this = this;
            reader.onload = function () {
                let formdata = new FormData();
                // 设置除文件之外的参数
                for (let name in _this.data) {
                    formdata.append(name, _this.data[name]);
                }
                // 设置文件
                formdata.append("fileSelect", item);
                _this.headers["Content-Type"] =
                    "application/x-www-form-urlencoded";

                axios({
                    url: _this.url,
                    method: "post",
                    headers: _this.headers,
                    data: formdata,
                    onUploadProgress: (progressEvent) => {
                        _this.uploading(progressEvent, item);
                    },
                })
                    .then((res) => {
                        _this.success(res, item);
                    })
                    .catch((error) => {
                        _this.error(
                            {
                                message: error.message,
                            },
                            item
                        );
                    });
            };
        },
        // 获取到上传的文件 并且验证是否可以上传
        async inputChange(event) {
            let uploadFiles = event.target.files;
            for (let i = 0; i < uploadFiles.length; i++) {
                // 上传限制大小
                if (uploadFiles[i].size > this.maxSize) {
                    this.error(
                        {
                            message: "附件超出最大上传限制~",
                        },
                        uploadFiles[i]
                    );
                    continue;
                }
                // 类型是否匹配
                if (
                    this.format &&
                    this.format.length &&
                    this.format.find(
                        (el) => uploadFiles[i].type.indexOf(el) !== -1
                    ) === undefined
                ) {
                    this.error(
                        {
                            message: "该类型不支持上传~",
                        },
                        uploadFiles[i]
                    );
                    continue;
                }
                try {
                    let isUpload = await this.beforeUpload(uploadFiles[i]);
                    isUpload === false ? "" : this.upload(uploadFiles[i]);
                } catch (error) {
                    this.error(
                        {
                            message: error.message,
                        },
                        uploadFiles[i]
                    );
                }
            }
        },
    },
};
</script>