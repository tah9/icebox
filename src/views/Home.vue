<template>
  <div class="root">
    <keep-alive>
      <router-view class="router"></router-view>
    </keep-alive>
    <van-tabbar v-model="active"  z-index="999" route >
      <van-tabbar-item icon="home-o"  replace to="/home/one">食品管理</van-tabbar-item>
      <van-tabbar-item icon="orders-o"  replace to="/home/two">食品分析</van-tabbar-item>
      <van-tabbar-item icon="plus"  replace to="/home/center">添加</van-tabbar-item>
      <van-tabbar-item icon="points"  replace to="/home/three">图表统计</van-tabbar-item>
      <van-tabbar-item icon="setting-o"  replace to="/home/user">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
      active:1
    }
  }
}
</script>
<style scoped>
.router{
  margin-bottom: 50px;
}
</style>