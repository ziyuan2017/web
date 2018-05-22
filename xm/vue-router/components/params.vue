<template>
    <div>
        <h2>{{ msg }}</h2>
        <p>新闻ID：{{ $route.params.newsId}}</p>
        <p>新闻标题：{{ $route.params.newsTitle}}</p>
    </div>
</template>

<script>
export default {
  name: 'params',
  data () {
    return {
      msg: 'params page'
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    console.log('准备进入了params路由模板');
    console.log(to);
    console.log(from);
    //不写next()会拦截跳转
    next();
    //可以加参数
    //next(false)；//不跳转 next(true)//跳转
    //next({path:'/'});//跳转到指定路径
  },
  beforeRouteLeave:(to,from,next)=>{
    console.log('准备离开了params路由模板');
    console.log(to);
    console.log(from);
    next();
  }
}
</script>
