import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CeShi from '@/pages/cs'
import Practice from '@/pages/Practice'
import PracticeLx from '@/pages/Practice/lx1'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'
import Params from '@/components/params'
import Error from '@/components/Error'

// import VueResource from 'vue-resource'
//
// Vue.use(VueResource);

import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: {
        default:HelloWorld,
        left:Hi1,
        right:Hi2
      }
    },
    {
      path: '/CeShi',
      name: 'cs',
      components: {
        default:CeShi,
        left:Hi1,
        right:Hi2
      },
      alias:'/bm'//URL路径没有别改变
    },
    {
        path:'/params/:newsId/:newsTitle',
        //path:'/params/:newsId(\\d+)/:newsTitle',//加正则newsId只能为数字
        component:Params
        //路由中写钩子函数
        // beforeEnter:(to,from,next)=>{
        //   console.log('我进入了params模板');
        //   console.log(to);
        //   console.log(from);
        //   //不写next()会拦截跳转
        //   next();
        //   //可以加参数
        //   //next(false)；//不跳转 next(true)//跳转
        //   //next({path:'/'});//跳转到指定路径
        // }
    },
    {
      path:'/goback',
      redirect:'/'//打开为真实路径
    },
    {
      path:'/goParams/:newsId(\\d+)/:newsTitle',
      redirect:'/params/:newsId(\\d+)/:newsTitle'
    },
    {
      path: '/Practice',
      name: 'Practice',
      component: Practice,
      children:[
        {path:'/',name:'Practice'},
        {path:'lx1',name:'lx1',component:PracticeLx}
      ]
    },
    {
       path:'*',
       component:Error
    }
  ]
})
