import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/layout.vue'

export const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    component: Layout,
    path: "/",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home.vue"),
        mate: {
          title: "首页分析",
          icon: "HomeFilled",
          keepAlive: true
        }
      }, {
        path: "/admin",
        name: "admin",
        component: () => import("@/views/admin.vue"),
        mate: {
          title: "管理员表",
          icon: "Tools",
          keepAlive: true
        }
      }, {
        path: "/user",
        name: "user",
        component: () => import("@/views/user.vue"),
        mate: {
          title: "用户管理",
          icon: "UserFilled",
          keepAlive: true
        }
      }, {
        path: "/goods",
        name: "goods",
        component: () => import("@/views/goods.vue"),
        mate: {
          title: "商品管理",
          icon: "GoodsFilled",
          keepAlive: true
        }
      }, {
        path: "/order",
        name: "order",
        component: () => import("@/views/order.vue"),
        mate: {
          title: "订单列表",
          icon: "Shop",
          keepAlive: true
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
