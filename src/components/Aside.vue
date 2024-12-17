<template>
    <div class="aside">
        <el-menu :default-active="tabsStore.activeMenu" router class="el-menu-vertical" @open="handleOpen"
            @close="handleClose">
            <div class="logo">
                <img src="../assets/logo.png" width="20%" alt="Logo">
                <span>矩阵灯后台管理系统</span>
            </div>
            <el-menu-item v-for="(item, index) in tabsStore.menuList" :index="`${index + 1}`" :route="item.path"
                @click="addMenu(item, index + 1)">
                <el-icon :size="16" :color="'#ff'">
                    <component :is="item.icon" />
                </el-icon>
                <span>{{ item.title }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue'
import { useMenuStore } from '@/stores/menu';
import type { MenuItem } from '@/types/menu';

const route = useRoute();
const tabsStore = useMenuStore();
const handleOpen = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}

// 点击菜单
const addMenu = (item: MenuItem, index: number) => {
    tabsStore.addTabs(item)
    tabsStore.updateActiveMenu(`${index}`)
}

onMounted(() => {
    tabsStore.menuList?.forEach((item, index) => {
        if (item.path === route.path) {
            tabsStore.updateActiveMenu(`${index + 1}`)
        }
    })
    if (route.path !== '/home') {
        // 开始不是第一页
        const item = tabsStore.menuList.find(item => item.path === route.path) as MenuItem
        tabsStore.addTabs(item)
    }
})
</script>

<style scoped>
.aside {
    height: 100vh;

    .el-menu-vertical {
        height: 100%;

        .logo {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 5px;

            img {
                border-radius: 5px;
            }
        }
    }
}
</style>