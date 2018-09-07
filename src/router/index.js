import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/customer',
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'customer',
        component: () => import('@/views/user/customer/index'), // Parent router-view
        name: 'menu1',
        meta: { title: '消费者查询' }
      },
      {
        path: 'team',
        component: () => import('@/views/user/team/index'),
        meta: { title: '装修团队管理' }
      },
      {
        path: 'supplier',
        component: () => import('@/views/user/supplier/index'),
        meta: { title: '供应商管理', icon: '' }
      }
    ]
  },
  {
    path: '/product-manage',
    component: Layout,
    redirect: '/product-manage/',
    name: 'product-manag',
    meta: {
      title: '商品管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'product',
        component: () => import('@/views/product-manage/product/index'), // Parent router-view
        name: 'product',
        meta: { title: '产品管理', icon: 'nested' }
      }
    ]
  },
  {
    path: '/decorate-project',
    component: Layout,
    redirect: '/decorate-project/',
    name: 'decorate-project',
    meta: {
      title: '装修项目',
      icon: 'nested'
    },
    children: [
      {
        path: 'decorate-project',
        component: () => import('@/views/decorate-project/decorate-list/index'), // Parent router-view
        name: 'product',
        meta: { title: '装修项目', icon: 'nested' }
      },
      {
        path: 'service',
        component: () => import('@/views/decorate-project/decorate-service/index'), // Parent router-view
        name: 'service',
        hidden: true,
        meta: { title: '服务合同管理' }
      },
      {
        path: 'settlement',
        component: () => import('@/views/decorate-project/settlement/index'), // Parent router-view
        name: 'settlement',
        hidden: true,
        meta: { title: '项目结算管理' }
      },
      {
        path: 'order',
        component: () => import('@/views/decorate-project/order/index'), // Parent router-view
        name: 'order',
        hidden: true,
        meta: { title: '商品订单管理' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

