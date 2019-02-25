import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/pages/startpage'
import Home from '@/components/pages/home'
import Login from '@/components/pages/login'
import Member from '@/components/pages/member'
import Register from '@/components/pages/register'
import Search from '@/components/pages/search'

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
    }
  ]
})
