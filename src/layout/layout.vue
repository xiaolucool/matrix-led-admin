<template>
    <div class="layout">
        <el-container>
            <el-aside width="200px">
                <Aside />
            </el-aside>
            <el-container>
                <el-header>
                    <Header />
                </el-header>
                <el-main style="background: #F5F6FB;">
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup lang="ts">
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
</script>

<style scoped>
.layout {
    height: 100%;

    :deep(.el-header) {
        padding: 0 !important;
        height: auto !important;
    }
}
</style>