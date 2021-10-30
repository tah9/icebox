<template>
<div class="item">
<div class="cell">
  <img :src="data.pic">
  <div class="cell-text">
    <span>{{data.weight}}g</span>
    <span style="text-align: center">{{qianKa()}}</span>
  </div>
</div>
  <div style="text-align: center">{{data.name}}</div>
</div>
</template>

<script>
export default {
  name: "cellFoods",
  props:{
    data:null
  },
  methods:{
    qianKa() {
      return (this.data.re * (parseInt(this.data.weight) / 100)).toFixed(2) + '千卡'
    },
  }
}
</script>

<style scoped>
.item{
  margin: 5px;
}

.cell {
  border-radius: 8px;
  width: 70px;
  height: 70px;
  overflow: hidden;
  position: relative;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
}
.cell-text {
  font-size: 14px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
}
</style>