<template>
  <div class="root">
    <navbar title='手机号注册'></navbar>
    <div style="padding-left: 3%;padding-right: 3%">

      <!-- 输入昵称 -->
      <van-field v-model="user.username" label="昵称" placeholder="请输入昵称"
                 maxlength="11" :required="true" :rules="[{ required: true }]"/>
      <!--手机号-->
      <van-field v-model="user.phonenumber" :required="true"
                 :rules="[{ required: true }]" maxlength="11" type="tel" label="手机号" placeholder="请输入手机号"/>
      <!-- 输入密码 -->
      <van-field v-model="user.password" type="password" label="密码" placeholder="请输入密码"
                 maxlength="11" :required="true" :rules="[{ required: true }]"/>
      <div style="margin: 16px;" @click="registerUp">
        <van-button round block type="info" color="#00c4b3" native-type="submit">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import {Toast} from "vant";
import request from "@/untils/request";

export default {
  name: "Register",
  components: {Navbar},
  data() {
    return {
      registerFinish: false,
      user: {
        phonenumber: '',
        password: '',
        username: '',
      },
    }
  },
  methods: {
    registerUp() {
      request.post('/user/register', this.user).then(res => {
        console.log(this.user);
        console.log(res);
        if (res.code === 200) {
          this.registerFinish = true
          console.log(res);
          Toast.success('注册成功')
          this.$router.go(-1)
        } else {
          Toast.fail(res.msg)
        }
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
  grid-column-start: 2;
}

a {
  grid-column-start: 3;
  grid-row-start: 3;
  text-align: center;
}
</style>