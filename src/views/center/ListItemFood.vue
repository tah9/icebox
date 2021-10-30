<template>
  <div class="item" @click="clickFoodItem" v-if="data">
    <img :src="data.pic" class="leftImg">
    <div class="center">
      <div v-text="data.name" class="name"></div>
      <div class="bottom-text"><span style="color: red" v-text="data.re"></span> 千卡/100克</div>
    </div>
    <div class="right" :style="'background:'+circleBg(data)+';'"></div>
  </div>
</template>

<script>
export default {
  name: "ListItemFood",
  props: {
    data: null
  },
  methods:{
    clickFoodItem(){
      this.$emit('clickItem',this.data)
    }
  },
  data(){
    return{
      circleBg(data){
        let healthLabel = data.health_label;
        if (healthLabel==='红灯食物'){
          return 'red'
        }else if (healthLabel==='黄灯食物'){
          return '#fec408'
        }else{
          return '#00c4b3'
        }
      }
    }
  }
}
</script>

<style scoped>
.right {
  width: 10px;
  height: 10px;
  margin-right: 1em;
  background: #00c4b3;
  border-radius: 50%;
  margin-left: auto;
}

.item {
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 15px;
}

.leftImg {
  width: 50px;
  height: 50px;
  border-radius: 8px;
}
.center {
  margin-left: 1em;
}


.name {
  text-align: left;
}

.bottom-text {
  margin-top: 4px;
  font-size: 14px;
  text-align: left;
  color: #757575;
}
</style>