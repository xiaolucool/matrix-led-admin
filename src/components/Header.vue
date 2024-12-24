<template>
    <div class="header">
        <el-tabs v-model="tabsStore.tabsActive" type="card" class="tabs" closable @tab-remove="removeTab"
            @tab-click="onclick">
            <el-tab-pane v-for="item in tabsStore.tabs" :key="item.name" :label="item.title" :name="item.name">
                <!-- {{ item.content }} -->
            </el-tab-pane>
        </el-tabs>
        <div class="user">
            <img src="../assets//logo.png" width="30px" alt="头像">
            <svg class="logout-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="#606266" fill-rule="evenodd"
                    d="M15 3.001a1 1 0 1 1 0 2H6v13a1 1 0 0 0 1 1h8a1 1 0 1 1 0 2H7a3 3 0 0 1-3-3v-14a1 1 0 0 1 1-1zm1.707 5.293A1 1 0 0 0 15 9v2H9a1 1 0 1 0 0 2h6v2a1 1 0 0 0 1.707.707l3-3a1 1 0 0 0 0-1.414z"
                    clip-rule="evenodd" />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menu';
import type { TabsItem } from '@/types/menu';
import type { TabsPaneContext } from 'element-plus';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const tabsStore = useMenuStore();
const router = useRouter();

const removeTab = (targetName: string) => {
    if (targetName === "1") return
    const i = tabsStore.tabs.findIndex(item => item.name === targetName)
    const item = tabsStore.tabs[i - 1]
    const path = item.content
    const index = tabsStore.menuList.findIndex(ele => ele.path === path)
    tabsStore.updateActiveMenu(`${index + 1}`)
    router.push(path)
    tabsStore.removeTabs(+targetName)
}
const onclick = (pane: TabsPaneContext, ev: Event) => {
    const name = pane.props.name as string
    // 根据name找到对应的path
    const item = getItem(name)
    const path = item.content
    const index = tabsStore.menuList.findIndex(ele => ele.path === path)
    tabsStore.updateActiveMenu(`${index + 1}`)
    router.push(path)
}

// 根据name返回对应的item
const getItem = (name: string) => {
    return tabsStore.tabs.find(ele => ele.name === name) as TabsItem
}
</script>

<style scoped>
.header {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #e4e7ed;

    .tabs {
        width: calc(100% - 80px);
        min-width: 300px;
    }

    .user {
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        img {
            border-radius: 50%;
            cursor: pointer;
        }

        .logout-icon {
            cursor: pointer;
        }

        /* flex: 1; */
    }
}

:deep(.is-active) {
    border-bottom-color: #e4e7ed !important;
}

:deep(.el-tabs__header) {
    margin: 0 !important;
    border-bottom: unset !important;
}
</style>