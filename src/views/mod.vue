<template>
        <Led ref="ledRef" :matrix="matrix" width="500" />
        <input type="file" @change="handleFileChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Led from '@/components/Led.vue'

// 24列
const width = 24;
// 11行
const height = 11;
const matrix = ref(Array.from(Array(height), () => Array.from(Array(width), () => (0))))
const ledRef = ref(null)



const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // 处理图片
                processImage(img);
            };
            img.src = e.target?.result as string | '';
        };
        reader.readAsDataURL(file);
    }
}





const processImage = (img: HTMLImageElement) => {
    // 创建一个 Canvas 元素来处理图片
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 设置 canvas 尺寸为 24x11
    canvas.width = 24;
    canvas.height = 11;

    // 将图片缩放至 canvas 大小
    ctx?.drawImage(img, 0, 0, 24, 11);

    // 获取图像数据
    const imageData = ctx?.getImageData(0, 0, 24, 11);
    const data = imageData?.data;

    // 处理灰度化和二值化
    const binaryData = convertToBinary(data);

    // 转换为二维数组（每个元素表示一个像素的二值）
    const result = convertTo2DArray(binaryData);
    // 使用嵌套的map函数转换数组
    const transformedArray = result.map(row =>
        row.map(value =>
            value === 0 ? 0 : 1
        )
    );
    matrix.value = transformedArray;
    ledRef.value?.getBoxs()
    console.log(transformedArray); // 你可以查看输出的二维数组
}

// 灰度化和二值化处理
const convertToBinary = (data: any) => {
    const binaryData = [];
    for (let i = 0; i < data.length; i += 4) {
        // 获取像素的 RGB 值
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // 灰度化公式：Y = 0.3*R + 0.59*G + 0.11*B
        const gray = 0.3 * r + 0.59 * g + 0.11 * b;

        // 二值化：假设阈值为 128
        const binary = gray < 128 ? 0 : 255;
        binaryData.push(binary);
    }
    return binaryData;
}

// 将一维的二值数据转换为二维数组
const convertTo2DArray = (binaryData: any) => {
    const result = [];
    let row = [];
    for (let i = 0; i < binaryData.length; i++) {
        row.push(binaryData[i]);
        if (row.length === 24) {
            result.push(row);
            row = [];
        }
    }
    return result;
}
</script>

<style scoped></style>