<template>
  <div>
    <navbar title="个人信息"></navbar>
    <div class="cell">
      <div>头像</div>
      <img :src="user.useravatar">
    </div>
    <div class="cell">
      <div>昵称</div>
      <input v-model="user.username" style="border: none;text-align: right">
    </div>
    <div class="cell">
      <div>性别</div>
      <van-radio-group v-model="user.gender" direction="horizontal">
        <van-radio name="男">男</van-radio>
        <van-radio name="女">女</van-radio>
      </van-radio-group>
    </div>
    <div class="cell">
      <div>年龄</div>
      <div v-text="user.year"></div>
    </div>
    <div class="cell">
      <div>身高</div>
      <div @click="showHeight=true">
        {{ user.height }}cm
      </div>
    </div>
    <div class="cell">
      <div>体重</div>
      <div @click="showWeight=true">
        {{ user.weight }}kg
      </div>
    </div>
    <van-picker
        v-show="showHeight" @confirm="showHeight=false"
        title="选择身高" @cancel="showHeight=false" show-toolbar
        :columns="heiRows" :default-index='75'
        @change="(p,v,i)=>{this.user.height=v}"/>
    <van-picker
        v-show="showWeight"
        title="选择体重" @confirm="showWeight=false"
        show-toolbar @cancel="showWeight=false"
        :columns="weiRows" :default-index='35'
        @change="(p,v,i)=>{this.user.weight=v}"/>
    <van-picker
        v-show="showWeight"
        title="选择年龄" @confirm="yearShow=false"
        show-toolbar @cancel="yearShow=false"
        :columns="yearRows" :default-index='6'
        @change="(p,v,i)=>{this.user.year=v}"/>
    <div class="btn" @click="save">保存</div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import request from "@/untils/request";

export default {
  name: "EditMess",
  components: {Navbar},
  data() {
    return {
      user: this.$root.getUser(),
      heiRows: [],
      showHeight: false,
      weiRows: [],
      showWeight: false,
      yearShow: false,
      yearRows: [],
    }
  },
  methods: {
    save(){
      console.log(this.user);
      request.post('/user/updateUser',{
        uid:this.user.uid,
        username:this.user.username,
        gender:this.user.gender,
        year:this.user.year,
        height:this.user.height,
        weight:this.user.weight
      }).then(res=>{
        console.log(res);
        this.$root.setUser(this.user)
        Toast.success('修改成功')
      })
    }
  },
  created() {
    for (let i = 100; i < 221; i++) {
      this.heiRows.push(i)
    }
    for (let i = 35; i < 150; i++) {
      this.weiRows.push(i)
    }
    for (let i = 14; i < 80; i++) {
      this.yearRows.push(i)
    }
  }
}
</script>

<style scoped>
.cell {
  display: flex;
  padding: 1em 1.5em;
  margin: 1em 0;
  justify-content: space-between;
  align-items: center;
}

img {
  width: 3em;
  height: 3em;
  object-fit: cover;
  border-radius: 50%;
}

.btn {
  border-radius: 50px;
  color: white;
  line-height: 44px;
  height: 44px;
  background: #00c4b3;
  margin: 20px 20px;
  text-align: center;
}

</style>