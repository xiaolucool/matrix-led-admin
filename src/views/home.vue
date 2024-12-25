<template>
  <div>
    <h1>API 地址: {{ apiUrl }}</h1>
    <h1>图片地址: {{ imageBaseUrl }}</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const apiUrl = import.meta.env.VITE_API_URL;
const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

// 确认环境变量是否正确加载
onMounted(() => {
  console.log(import.meta.env);  // 查看所有环境变量
  console.log('API URL:', apiUrl);  // 输出 API URL
  console.log('Image Base URL:', imageBaseUrl);  // 输出图片基础 URL
});
</script>
