<template>
  <div class="mk1">
    <h2>实例1:{{ msg }}</h2>
    {{$route.params.username}}
  </div>
</template>
<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: 'Hi, I am Hi1!'
    }
  }
}
</script>
<style scoped>

</style>
