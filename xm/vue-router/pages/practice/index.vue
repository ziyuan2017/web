<template>
  <div class="practice">
    <h1>{{ msg }}</h1>
    <p>2222{{ $route.name}}</p>
    {{$route.params.username}}
    {{$route.params.ids}}
    <hr>
    <router-view class="zmk"></router-view>
  </div>
</template>

<script>

export default {
  name: 'practice',
  data () {
    return {
      msg: '基础练习'
    }
  },
  created(){
    this.getImg() //定义方法
  },
  methods:  {
    getImg: function(){
      // this.$axios({      //调用接口
      //   method:'get',
      //   url:'https://zhi.taobao.com/json/fantomasItems.htm?appId=10&blockId=1050&startRow=0&pageSize=12&src=coin-half&flowId=32&bucketId=1&requestId=bbeaf8a6-beda-5d81-3199-7da803b025f6&viewId=b8e16286-2f5e-497c-cb74-60333128c75d&_ksTS=1524386292630_82&callback=jsonp83' //this指data
      // },{ credentials: true }).then(function(response){ //接口返回数据
      //   console.log(response.data)
      // },function(error){
      // })
      // this.$http.jsonp({      //调用接口
      //   method:'GET',
      //   url:'https://zhi.taobao.com/json/fantomasItems.htm?appId=10&blockId=1050&startRow=0&pageSize=12&src=coin-half&flowId=32&bucketId=1&requestId=bbeaf8a6-beda-5d81-3199-7da803b025f6&viewId=b8e16286-2f5e-497c-cb74-60333128c75d&_ksTS=1524386292630_82&callback=jsonp83' //this指data
      // },{ credentials: true }).then(function(response){ //接口返回数据
      //   console.log(response.data)
      // },function(error){
      // })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.practice{ font-size: 0.3rem;}
</style>
