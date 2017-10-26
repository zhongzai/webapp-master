import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


var router =  new Router({
  routes: [
    {
      path: '/kf',
      component: (resolve) => require(['./components/KF/Index.vue'], resolve)  ,
      children: [{
        path: '',
        meta: {title:'待分配咨询列表'},
        component: (resolve) => require(['./components/KF/Main.vue'], resolve)
      }]
    },
    {
      path: '/vd',
      component: (resolve) => require(['./components/VD/village_doctor.vue'], resolve)  ,
    },
    {
      path: '/gd',
      component: (resolve) => require(['./components/GD/Index.vue'], resolve)  ,
    },
    {
      path:'/',
      meta: {title:'用户登录'},
      component:(resolve) => require(['./components/login.vue'], resolve)
    } ,

    {
      path:'*',
      name:'404',
      meta: {title:'错误'},
      component:(resolve) => require(['./components/404.vue'], resolve)
    }
  ]
});

export default router;
