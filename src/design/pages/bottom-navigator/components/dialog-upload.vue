<template>
    <el-dialog ref="dialog" :closeOnClickModal="false" :width="'800'" close-on-press-escape v-model="showDialog">
        <div class="content" v-loading="loading" element-loading-text="上传中">
            <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
                <el-tab-pane label="系统图标" :name="1">
                    <div class="font-size-14 margin-bottom-15 flex-start">
                        说明：选中效果会根据皮肤主题色自动变更
                    </div>
                    <div class="icon-container">
                        <div v-for="(item, index) in localIconList" :key="index"
                            class="margin-right-20 margin-bottom-20">
                            <div class="center margin-bottom-24" @click="() => clickItem(index)">
                                <el-image style="width: 40px; height: 40px" :src="item.iconPath"
                                    class="margin-right-6" />
                                <el-image style="width: 40px; height: 40px" :src="item.selectedIconPath" />
                            </div>
                            <div>{{ item.text }}</div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="自定义上传" :name="2"></el-tab-pane>
            </el-tabs>
            <input type="file" ref="imageInput" style="display: none" @change="uploadImage" />
        </div>
    </el-dialog>
</template>
<script lang="tsx" setup>
import axios from 'axios';
import { ref, defineExpose, reactive, defineEmits } from 'vue'
import request from "@/design/http";
import { ElMessage } from "element-plus";

const emit = defineEmits(['postImage',])

const imageInput = ref<any>(null);

const loading = ref<boolean>(false);
const showDialog = ref<boolean>(false);
const activeName = ref<any>(1);
const config = ref<any>({});

// TODO 删除 mock 假数据
const localIconList = reactive([{
    iconPath: require('@/assets/wxapp-icon/test.png'),
    selectedIconPath: require('@/assets/wxapp-icon/test.png'),
    text: '首页',
}, {
    iconPath: require('@/assets/wxapp-icon/test.png'),
    selectedIconPath: require('@/assets/wxapp-icon/test.png'),
    text: '我的',
}, {
    iconPath: require('@/assets/wxapp-icon/test.png'),
    selectedIconPath: require('@/assets/wxapp-icon/test.png'),
    text: '商城',
},])

// 打开弹窗
function open(data: unknown) {
    showDialog.value = true
    config.value = data
}

// 关闭弹窗
function close() {
    showDialog.value = false
    activeName.value = 1
    config.value = {}
}

// 本地上传
async function clickItem(i) {
    const selectedIconPath = localIconList[i].selectedIconPath
    const iconPath = localIconList[i].iconPath
    const fileSelect = await getLocalImageAsFile(selectedIconPath)
    const fileunSelect = await getLocalImageAsFile(iconPath)
    const response = await Promise.all([uploadAPI(fileSelect), uploadAPI(fileunSelect)]);
    const isSuccess = response.every((item: any) => item.fileUrl)
    if (!isSuccess) return
    emit('postImage', { ...config.value, localImage: response })
    ElMessage.success('上传成功')
    close()
}

// tab 切换事件
function handleClick(e) {
    if (e.paneName !== 2) return
    imageInput.value && imageInput.value.click();
}

// 获取本地图片
async function getLocalImageAsFile(imagePath) {
    try {
        const response = await axios.get(imagePath, {
            responseType: 'blob', // 指定响应类型为blob
        })
        if (response.status === 200) {
            // 使用 Blob 创建 File 对象
            const file = new File([response.data], 'image.png', { type: 'image/png' });
            return file
        }
    } catch (error) {
        console.error('获取图片文件失败:', error);
        throw error;
    }
}

// 自定义图片上传
async function uploadImage(event) {
    const files = event.target.files;
    if (files.length === 0) {
        ElMessage.error('没有选择文件')
        return;
    }
    // 读取第一个文件（假设用户只选择一个文件）
    const file = files[0];
    if (!file.type.match('image/*')) {
        ElMessage.error('请选择一个图片文件')
        return;
    }
    // 调用上传API函数
    try {
        const response = await uploadAPI(file);
        // console.log('上传成功', response);
        emit('postImage', { ...config.value, customImage: response })
        ElMessage.success('上传成功')
        close()
    } catch (error) {
        console.log("error", error);

        ElMessage.error('上传失败')
    }
}

// 上传API
function uploadAPI(dataFile) {
    // console.log("file", dataFile);

    const file = dataFile
    const formDatas = new FormData()
    formDatas.append('file', file)
    return new Promise((resolve, reject) => {
        loading.value = true
        request
            .post<any, any>({
                url: `/oss-api/oss/b/objectUpload`,
                data: formDatas,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
                // console.log('res: ', res)
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            }).finally(() => {
                loading.value = false

            })
    })
}

defineExpose({
    open,
    close
})

</script>
<style lang="scss" scoped>
.content {
    height: 500px;
}

.icon-container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
</style>