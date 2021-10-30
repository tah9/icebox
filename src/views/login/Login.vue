<template>
  <div>
    <div class="top">
      <div style="font-size: 1.5em;font-weight: bold">密码登录</div>
      <div style="margin-top: 1em;margin-bottom: 2em">定制你的健康方案，一站建立健康档案</div>
      <input type="number" v-model="phonenumber" placeholder="手机号">
      <input type="password" v-model="password" placeholder="密码">
    </div>
    <div class="btn" @click="clickBtn()"
         :style="'background:' +((phonenumber===''||password==='')?'#eeeff3':'#00c4b3')+';'+
        'color:'+((phonenumber===''||password==='')?'black':'white')+';'">登录</div>
    <div class="reg" @click="$router.push('/register')">注册账号</div>
  </div>
</template>

<script>
import request from "@/untils/request";
import {Toast} from "vant";

export default {
  name: "Login",
  data() {
    return {
      phonenumber: '',
      password: ''
    }
  },
  methods:{
    clickBtn(){
      let _this=this
      if (this.phonenumber===''||this.password===''){
        return
      }
      request.post('/user/login',{
        phonenumber:this.phonenumber,
        password:this.password
      }).then(res=>{
        console.log(res);
        if (res.code===200){
          console.log(res);
          _this.$root.setUser(res.rows)
          _this.$router.replace('/home/user')
        }else{
          Toast.fail('账号或密码错误')
        }
      })
    }
  }
}
</script>

<style scoped>
.top {
  display: flex;
  padding: 40px;
  margin-top: 100px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
}

.btn {
  border-radius: 50px;
  line-height: 50px;
  height: 50px;
  background: #eeeff3;
  margin: 0 30px;
  text-align: center;
}

input {
  border-bottom: 1px solid rgba(0, 0, 0, .05);
  border-top: none;
  border-left: none;
  border-right: none;
  width: 100%;
  height: 55px;

}
.reg{
  color: #757575;
  margin: 30px;
}
</style>