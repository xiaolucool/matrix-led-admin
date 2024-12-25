<style scoped>
.create {
    min-width: 800px;
    height: 100%;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    padding: 20px;

    .top {
        border-bottom: 1px solid #e4e7ed;

        .title {
            border-bottom: 1px solid #e4e7ed;
            padding-bottom: 10px;
        }

        :deep(.el-form-item) {
            margin-top: 10px !important;
            margin-bottom: 10px !important;
        }

        .form {
            display: flex;
            align-items: center;



            .file {
                display: flex;
                align-items: center;

                .img {
                    width: 40px;
                    height: 40px;
                }
            }
        }
    }

    .led-box {
        display: flex;
        align-items: center;
        flex-grow: 1;
        padding: 10px 0;
        margin-bottom: 10px;
        border-bottom: 1px solid #e4e7ed;

        .left,
        .right {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .left {
            .box-odd {
                clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
            }

            .box-even {
                clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
            }
        }

        .right {
            .box-odd {
                clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
            }

            .box-even {
                clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
            }
        }
    }

    .btns {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>

<template>
    <div class="create" @mouseup="handleMouseUp">
        <div class="top">
            <div class="title">动画帧列表-当前帧{{ initialIndex }}-总帧数{{ animationList.length === 50 ? 50 :
                animationList.length
                }}
            </div>
            <el-form class="form" :inline="true" :model="formInline">
                <el-form-item label="名称">
                    <el-input v-model="formInline.name" size="small" minlength="1" maxlength="20" placeholder="动画名称"
                        clearable />
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="formInline.price" size="small" type="number" min="0" max="10000"
                        placeholder="动画价格" clearable />
                </el-form-item>
                <el-form-item label="播放间隙">
                    <el-input v-model="formInline.interval" size="small" type="number" min="1" max="10"
                        placeholder="播放间隙" clearable />
                </el-form-item>
                <el-form-item class="file" label="图片">
                    <el-upload class="avatar-uploader" action="/api/upload/file" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img class="img" v-if="imageUrl" :src="imageUrl" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="onSubmit">保到服务器</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="led-box" ref="ledBoxRef">
            <div class="left">
                <div class="container" ref="ledLRef" @mousedown="handleMouseDown" @mouseup="handleMouseUp"
                    @mousemove="handleMouseMove($event, isMouseDown, 0, boundaryL, triangleWidth, boxsL)"
                    @handleTouchEnd="handleTouchEnd(boxsL)" @mouseleave="handleMouseUp">
                    <div v-for="(item, index) in boxsL" :key="index"
                        :style="{ display: 'flex', marginLeft: `${index * triangleWidth}px` }">
                        <div v-for="(box, i) in item" :key="i" @click="switchLed(boxsL, index, i)"
                            :style="getBoxStyle(boxsL, triangleWidth, triangleHeight, '2px 0', index, i)"
                            :class="`box ${i % 2 === 0 ? 'box-odd' : 'box-even'}`">
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="container" ref="ledRRef" @mousedown="handleMouseDown" @mouseup="handleMouseUp"
                    @mousemove="handleMouseMove($event, isMouseDown, 1, boundaryR, triangleWidth, boxsR)"
                    @handleTouchEnd="handleTouchEnd(boxsR)" @mouseleave="handleMouseUp">
                    <div v-for="(item, index) in boxsR" :key="index"
                        :style="{ display: 'flex', marginLeft: `${(11 - index) * triangleWidth}px` }">
                        <div v-for="(box, i) in item" :key="i" @click="switchLed(boxsR, index, i)"
                            :style="getBoxStyle(boxsR, triangleWidth, triangleHeight, '2px 0', index, i)"
                            :class="`box ${i % 2 === 0 ? 'box-odd' : 'box-even'}`">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btns">
            <el-button @click="onPrev">上一项</el-button>
            <el-button type="info" @click="onSave">清空左侧</el-button>
            <el-button type="success" @click="onSave">左镜像右</el-button>
            <el-button type="primary" @click="onSave">保存帧</el-button>
            <el-button type="success" @click="onSave">右镜像左</el-button>
            <el-button type="info" @click="onSave">清空右侧</el-button>
            <el-button @click="onNext">下一项</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage, type UploadProps } from 'element-plus'
import { useElementBounding, useElementSize } from '@vueuse/core'
import { getBoxStyle, switchLed, handleMouseMove, handleTouchEnd, transformBoxs } from '@/utils/draw'
import type { Box } from '@/types/box'
import { createAnimation } from '@/api/animation'

// led盒子
const ledBoxRef = ref<HTMLElement | null>(null)
const size = useElementSize(ledBoxRef)

// 灯左
const ledLRef = ref<HTMLElement | null>(null)
// 灯右
const ledRRef = ref<HTMLElement | null>(null)
// 获取盒子位置
const boundaryL = useElementBounding(ledLRef)
const boundaryR = useElementBounding(ledRRef)
// 标志位，表示鼠标是否按下
const isMouseDown = ref(false)


// 动画列表类型
interface AnimationList {
    left: number[][]
    right: number[][]
}

// 三角形宽度
const triangleHeight = ref(0)
const triangleWidth = ref(0)

// 当前动画帧左侧和右侧
const boxsL = ref<Array<Box[]>>(Array.from(Array(11), () => Array.from(Array(24), () => ({ status: 0, isUpdate: true }))))
const boxsR = ref<Array<Box[]>>(Array.from(Array(11), () => Array.from(Array(24), () => ({ status: 0, isUpdate: true }))))

// 动画列表
const animationList = ref<AnimationList[]>([])
// 当前动画索引
const initialIndex = ref(1)


// 信息表单
const formInline = ref({
    name: "爱心动画",
    interval: 0,
    image: '',
    price: 0,
    isOnline: 1,
    frame: 0,
    frames: [] as AnimationList[]
})

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    if (response.code === 200) {
        formInline.value.image = response.data.path
        ElMessage.success('上传成功')
    } else {
        ElMessage.error('上传失败')
    }
}

// 图片上传
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {

    // 限制传入的类型只能是图片webp,jpg,png,gif并且5MB以下
    if (rawFile.type !== 'image/webp' && rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif') {
        ElMessage.error('图片类型只能是webp,jpg,png,gif')
        return false
    } else if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error('图片大小不能超过5MB')
        return false
    }
    return true
}


// 表单保存
const onSubmit = async () => {
    formInline.value.frame = animationList.value.length
    formInline.value.frames = animationList.value
    try {
        await createAnimation(formInline.value)
        ElMessage({
            message: '动画创建成功',
            type: 'success',
        })
    } catch (error) {
        ElMessage.error(`异常：${error}`)
    }
}


// 鼠标的移入移出事件
const handleMouseDown = (event: any) => {
    // 检查是否为鼠标左键按下
    if (event.button === 0) {
        isMouseDown.value = true
    }
}

// 鼠标的移入移出事件
const handleMouseUp = (event: any) => {
    isMouseDown.value = false
    handleTouchEnd(boxsL.value)
    handleTouchEnd(boxsR.value)
}

// 保存当前帧
const onSave = () => {
    addFrameToList()
}
// 下一个
const onNext = () => {
    if (initialIndex.value - 1 >= animationList.value.length) return
    if (initialIndex.value >= 50) {  // 限制为最多50张幻灯片
        ElMessage.error('动画列表已满');
        return;
    }
    if (initialIndex.value === animationList.value.length) {
        initialIndex.value++;
    } else {
        initialIndex.value++;
        updateBoxesFromList();
    }
};

// 上一个
const onPrev = () => {
    if (initialIndex.value === 1) return;  // 防止返回到第一帧之前
    initialIndex.value--;
    updateBoxesFromList();
};

// 将当前状态添加到动画列表的实用程序
const addFrameToList = () => {
    animationList.value.push({
        left: boxsL.value.map(row => row.map(box => box.status)),
        right: boxsR.value.map(row => row.map(box => box.status)),
    });
};

// 用于根据当前索引更新动画列表中的框的实用程序
const updateBoxesFromList = () => {
    const currentFrame = animationList.value[initialIndex.value - 1];
    boxsL.value = transformBoxs(currentFrame.left);
    boxsR.value = transformBoxs(currentFrame.right);
};


onMounted(() => {
    triangleWidth.value = Math.floor((size.width.value / 2) / 35)
    triangleHeight.value = Math.floor((size.width.value / 2) / 35)
})
</script>