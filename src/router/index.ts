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
    component: () => import('../views/login.vue'),
    meta: {
      title: "登录",
    }
  },
  {
    component: Layout,
    path: "/",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "首页分析",
          icon: "HomeFilled"
        }
      }, {
        path: "/admin",
        name: "admin",
        component: () => import("@/views/admin.vue"),
        meta: {
          title: "管理员表",
          icon: "Tools"
        }
      }, {
        path: "/user",
        name: "user",
        component: () => import("@/views/user.vue"),
        meta: {
          title: "用户管理",
          icon: "UserFilled"
        }
      }, {
        path: "/goods",
        name: "goods",
        component: () => import("@/views/goods.vue"),
        meta: {
          title: "动画列表",
          icon: "GoodsFilled"
        }
      }, {
        path: "/order",
        name: "order",
        component: () => import("@/views/order.vue"),
        meta: {
          title: "订单列表",
          icon: "Shop"
        }
      }, {
        path: "/create",
        name: "create",
        component: () => import("@/views/create.vue"),
        meta: {
          title: "创建动画",
          icon: "Edit"
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // 假设 token 存储在本地存储中

  if (to.name !== 'login' && !token) {
    // 如果用户尝试访问非登录页面且没有 token，则重定向到登录页面
    next('/login');
  } else {
    // 如果用户已经登录或访问登录页面，则允许路由跳转
    next();
  }
});

router.afterEach((to, from) => {
  document.title = `${to.meta.title}-矩阵灯后台管理系统`;
});

export default router
