<template>
  <div class="root">
    <div class="top">
      <div style="display: flex;justify-content: flex-end;padding-top: 1em">
        <van-icon name="edit" color="white" size="25" style="margin-right: 0.5em" @click="$router.push('/editMess')"/>
        <van-icon name="cross" color="white" size="25" style="margin-right: 1em" @click="$router.replace('/login')"/>
      </div>
      <div style="display: flex;align-items: center;padding: 2em;margin-top: 1em">
        <img :src="user.useravatar" class="ava">
        <div v-text="user.username" style="color: white;margin-left: 1em"></div>
      </div>

    </div>

    <van-swipe class="my-swipe myw" :autoplay="3000" indicator-color="white">
      <van-swipe-item><img :src="require('../../assets/b1.jpg')"></van-swipe-item>
      <van-swipe-item><img :src="require('../../assets/b2.jpg')"></van-swipe-item>
      <van-swipe-item><img :src="require('../../assets/b3.jpg')"></van-swipe-item>
    </van-swipe>

    <div class="content">
      <div style="padding: 1em;text-align: left">我的健康资料</div>
      <div style="border-bottom: 1px solid rgba(0, 0, 0, .05);"></div>
      <div class="cell" @click="$router.push('/editMess')">
        <van-icon name="orders-o" style="margin-right: 1em"/>
        基本信息
      </div>
      <div class="cell" @click="$router.replace('/home/two')">
        <van-icon name="invitation" style="margin-right: 1em"/>
        建议菜单
      </div>
      <div class="cell" @click="$router.replace('/home/three')">
        <van-icon name="award" style="margin-right: 1em"/>
        图表统计
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      user: this.$root.getUser()
    }
  },
  created() {
    console.log();
  }
}
</script>

<style scoped>
.ava {
  object-fit: cover;
  width: 4em;
  height: 4em;
  border-radius: 50%;
}

.top {
  background: #00c4b3;
}

.root {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f2f1f6;
}

.cell {
  display: flex;
  padding: 1em;
  align-items: center;
}

.content {
  border-radius: 8px;
  margin: 20px;
  background: white;
}

.my-swipe {
  color: #fff;
  height: 150px;
  text-align: center;
}

.myw {
  border-radius: 8px;
  overflow: hidden;
  margin: 1em;
}
.myw img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>