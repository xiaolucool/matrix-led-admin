<template>
    <div class="settings">
        <el-card class="card">
            <template #header>
                <span>系统设置</span>
            </template>
            <div class="count">预约人数：{{ reserveCount }}</div>
            <div class="total">用户总数：{{ userCount }}</div>
            <div class="member">会员数量：{{ vipCount }}</div>
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="注册设置">
                    <el-select v-model="form.isRegister" placeholder="请选择">
                        <el-option label="开启注册" :value="1" />
                        <el-option label="开启预约" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="视频背景">
                    <div class="upload">
                        <el-upload class="video-upload" :action="`${apiUrl}/upload/file`"
                            :on-success="handleUploadSuccess" :before-upload="beforeUpload" :show-file-list="false"
                            list-type="picture-card">
                            <el-icon class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                        <video class="video" autoplay :src="videoUrl"></video>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="footer">交互灯后台管理系统</div>
            </template>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue'
import { getSettings, getUser, updateSettings } from '@/api/settings'

const apiUrl = import.meta.env.VITE_API_URL;
const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

// 预约人数
const userCount = ref(0)
// 用户总数
const vipCount = ref(0)
// 会员数量
const reserveCount = ref(0)
// 表单
const form = ref({
    id: 1,
    isRegister: 1,
    videoUrl: '',
})
// 视频背景
const videoUrl = ref<string>('');

const handleUploadSuccess = (response: any, file: any) => {
    const { data } = response;
    form.value.videoUrl = data.path;
    // 假设服务器返回的视频URL在response.url
    videoUrl.value = `${imageBaseUrl}${data.path}`;
    // videoUrl.value = data.url
};


const beforeUpload = (file: File) => {
    const isVideo = file.type.startsWith('video/');
    if (!isVideo) {
        ElMessage.error('上传文件只能是视频格式!');
        return false;
    }
    return true;
};

// 提交表单
const onSubmit = async () => {
    try {
        const { data } = await updateSettings<any>(form.value.id, { isRegister: form.value.isRegister, videoUrl: form.value.videoUrl })
        ElMessage.success(data)
    } catch (error) {
        ElMessage.error(`异常：${error}`)
    }
}

// 初始化设置
const initSettings = async () => {
    try {
        // 获取设置
        const { data } = await getSettings<any>()
        form.value.id = data.id
        form.value.isRegister = data.isRegister
        form.value.videoUrl = data.videoUrl
        videoUrl.value = `${imageBaseUrl}${data.videoUrl}`
    } catch (error) {
        ElMessage.error(`异常：${error}`)
    }
}
// 初始化获取用户信息
const initUserInfo = async () => {
    try {
        // 获取用户信息
        const { data } = await getUser<any>()
        userCount.value = data.userCount
        vipCount.value = data.vipCount
        reserveCount.value = data.reserveCount
    } catch (error) {
        ElMessage.error(`异常：${error}`)
    }
}

onMounted(() => {
    initSettings()
    initUserInfo()
})

</script>

<style scoped>
.settings {
    height: 100%;

    .upload {
        display: flex;
        align-items: center;

        .video {
            margin-left: 10px;
            /* 宽高比9：16 */
            width: 90px;
            height: 200px;
        }
    }

    .footer {
        width: 100%;
        text-align: center;
        color: #777;
    }
}
</style>