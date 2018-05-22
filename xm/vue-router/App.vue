<template>
  <div id="app">
    <p>导航 ：
      <!-- <router-link to="/CeShi">cs</router-link>| -->
      <router-link to="/">首页</router-link>|
      <router-link to="/goback">goback打开为首页</router-link>|
      <router-link to="/CeShi">多路由</router-link>|
      <router-link to="/bm">多路由别名</router-link>|
      <router-link to="/params/idName/titleText">params</router-link> |
      <router-link to="/goParams/10086/titleText">params</router-link> |
      <router-link to="/Practice">基础练习</router-link>|
      <router-link to="/Practice/lx1">基础练习1</router-link>
      <router-link :to="{name:'Practice',params:{username:'zy'}}">标签中的to传参1</router-link>
      <router-link :to="{name:'Practice',params:{username:'zy2',ids:'ids'}}">标签中的to传参2</router-link>
      <!-- <router-link :to="{name:'Practice',params:{username:'zy'}}">标签中的to传参</router-link> -->
    </p>
    <div class="">
      <button @click="goBack" type="button">后退</button>
      <button @click="goGo" type="button">前进</button>
      <button @click="goHome" type="button">返回首页</button>
    </div>
    <transition name="fade" mode="in-out">
      <router-view ></router-view>
    </transition>
    <router-view name="left" style="float:left;width:50%;background-color:#ccc;height:300px;"></router-view>
    <router-view name="right" style="float:right;width:50%;background-color:#c0c;height:300px;"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    goBack(){
      this.$router.go(-1);
    },
    goGo(){
      this.$router.go(1);
    },
    goHome(){
      this.$router.push('/');
    }

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
</style>
