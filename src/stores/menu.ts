import { defineStore } from 'pinia';
import type { MenuItem, TabsItem } from '@/types/menu';

export const useMenuStore = defineStore('menu', {
    state: () => {
        return {
            menuList: [
                {
                    title: '系统设置',
                    icon: 'HomeFilled',
                    path: '/settings'
                }, {
                    title: '管理员表',
                    icon: 'Tools',
                    path: '/admin'
                }, {
                    title: '用户管理',
                    icon: 'UserFilled',
                    path: '/user'
                }, {
                    title: '动画列表',
                    icon: 'GoodsFilled',
                    path: '/goods'
                }, {
                    title: '订单列表',
                    icon: 'List',
                    path: '/order'
                }, {
                    title: '创建动画',
                    icon: 'Edit',
                    path: '/create'
                }
            ] as MenuItem[],
            activeMenu: '1',
            tabs: [
                {
                    title: '系统设置',
                    name: '1',
                    content: '/settings'
                }
            ] as TabsItem[],
            tabsActive: '1'
        };
    },
    actions: {
        addTabs(menuItem: MenuItem) {
            // 判断是否已经存在
            const i = this.tabs.findIndex(item => item.content === menuItem.path);
            if (i === -1) {
                // 不存在则添加
                this.tabs.push({
                    title: menuItem.title,
                    name: (this.tabs.length + 1).toString(),
                    content: menuItem.path
                });
                this.tabsActive = (this.tabs.length).toString()
            } else {
                // 存在则不添加激活
                this.tabsActive = this.tabs[i].name
            }
        },
        removeTabs(targetName: number) {
            // 删除对应的item
            const i = this.tabs.findIndex(item => item.name === targetName.toString());
            this.tabs.splice(i, 1);
            // 更改激活
            this.tabsActive = this.tabs.length.toString()
        },
        updateActiveMenu(activeMenu: string) {
            this.activeMenu = activeMenu;
        }
    },
});