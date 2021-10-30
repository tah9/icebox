<template>
  <div>
    <navbar title="食物详情"></navbar>
    <div class="root">
      <div style="width: 33%">
        <div class="title">营养元素</div>
        <div v-for="name in leftData" v-text="name"></div>
      </div>
      <div style="width: 40%">
        <div class="title">每100克</div>
        <div v-for="name in centerData" v-text="name"></div>
      </div>
      <div style="width: 27%">
        <div class="title">备注</div>
        <div v-for="name in rightData" v-text="name" class="comment"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import request from "@/untils/request";

export default {
  name: "FoodInfo2",
  components: {Navbar},
  data() {
    return {
      name: decodeURIComponent(this.$route.path).replace('/info2/', ''),
      rows: null,
      rightData: [],
      leftData: [],
      centerData: []
    }
  },
  created() {
    let _this = this
    request.post('/foods/info', {
      name: this.name
    }).then(res => {
      this.rows = JSON.parse(res.rows.ingredient_section)
      // let myLeft =[],myRight=[],myCenter=[]
      //数值
      let index = 0
      for (let key in this.rows.main_ingredient) {
        _this.$set(_this.centerData, index, _this.rows.main_ingredient[key] + _this.rows.main_unit[key]);
        if (_this.rows.light[key] === ''||!(key in _this.rows.light)) {
          _this.$set(_this.rightData, index,'');
        }else{
          _this.$set(_this.rightData, index, _this.rows.light[key]);
        }
        index++
      }
      for (let key in this.rows.vitamin_ingredient) {
        _this.$set(_this.centerData, index, _this.rows.vitamin_ingredient[key] + _this.rows.vitamin_unit[key]);
        if (_this.rows.light[key] === ''||!(key in _this.rows.light)) {
          _this.$set(_this.rightData, index,'');
        }else{
          _this.$set(_this.rightData, index, _this.rows.light[key]);
        }
        index++

      }
      for (let key in this.rows.minerals_ingredient) {
        _this.$set(_this.centerData, index, this.rows.minerals_ingredient[key] + _this.rows.minerals_unit[key]);
        if (_this.rows.light[key] === ''||!(key in _this.rows.light)) {
          _this.$set(_this.rightData,index, '');
        }else{
          _this.$set(_this.rightData, index, _this.rows.light[key]);
        }
        index++
      }


      index = 0
      //左边营养元素名称
      for (let key in this.rows.main) {
        _this.$set(_this.leftData, index++, this.rows.main[key])
      }
      for (let key in this.rows.vitamin) {
        _this.$set(_this.leftData, index++, this.rows.vitamin[key])
      }
      for (let key in this.rows.minerals) {
        _this.$set(_this.leftData, index++, this.rows.minerals[key])
      }
    })
  }
}
</script>

<style scoped>

.root> *>*{
  padding-left: 1em;
  height: 44px;
  border-bottom: 1px rgba(0, 0, 0, .05) solid;
  line-height: 44px;
  text-align: left;
}
.title{
  background: #eeeeee;
  font-weight: bold;
}
.root {
  display: flex;
}
.comment{
  color: #00c4b3;
}
</style>