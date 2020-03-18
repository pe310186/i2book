import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/pages/startpage'
import Home from '@/components/pages/home'
import Login from '@/components/pages/login'
import Member from '@/components/pages/member'
import Register from '@/components/pages/register'
import Search from '@/components/pages/search'
import Shopping from '@/components/pages/shopping'
import ProductView from '@/components/pages/product_view'
import CartList from '@/components/pages/cartlist'
import Checkout from '@/components/pages/checkout'
//import api from '../store/api'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage,
      props:true,
    },
    {
      path:'/home/:path',
      name: 'Home',
      component : Home,
      props:true,
    },
    {
      path:'/login',
      name: 'Login',
      component: Login,
    },
    {
      path:'/member/:path',
      name:'Member',
      component:Member,
      props:true,
    },
    {
      path:'/register',
      name:'Register',
      component:Register,
    },
    {
      path:'/search/:type/:searchname',
      name:'Search',
      component: Search,
      props:true,
    },
    {
      path:'/shopping/:type',
      name:'Shopping',
      component:Shopping,
      props:true,
    },
    {
      path:'/product/:id',
      name:'productView',
      component:ProductView,
      props:true
    },
    {
      path:'/cartlist',
      name:'CartList',
      component:CartList,
      props:true
    },
    {
      path:'/checkout',
      name:'Checkout',
      component:Checkout,
      props:true
    }, 
    // {
    //   path: '/facebook/:id',
    //   beforeEnter: (to, from, next) => {
    //     let id = window.location.href.split('facebook/')[1]
    //     id = id.split("#")[0] + "#"
    //     console.log(id)
    //     api.facebook(id).then(res=>{
    //       console.log(res.data);
    //       next('/')
    //     }).catch(error=>{
    //       next('/login')
    //     })
    //   }
    // }
  ]
})
