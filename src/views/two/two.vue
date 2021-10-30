<template>
  <div>
    <navbar title="食品分析" :left="false"></navbar>
    <div class="top" style="box-shadow:none">
      <div class="list">
        <CellFoods :data="data" v-for="data in rows"></CellFoods>
      </div>
      <div class="biao-root">
        <div id="myChart" :style="{width: '100px', height: '100px'}"></div>
        <div class="label">
          <div style="display: flex;justify-content: left;align-items: center"><div class="k" style="background: #5470c6"></div>碳水化合物</div>
          <div style="display: flex;justify-content: left;align-items: center"><div class="k" style="background: #91cc75"></div>蛋白质</div>
          <div style="display: flex;justify-content: left;align-items: center"><div class="k" style="background: #fac858"></div>脂肪</div>
        </div>
        <div class="label" style="color: #757575">
          <div>{{ (tan()/zong()*100).toFixed(1)}}%</div>
          <div>{{ (dan()/zong()*100).toFixed(1)}}%</div>
          <div>{{ (zhi()/zong()*100).toFixed(1)}}%</div>
        </div>
        <div class="label" style="color: #757575">
          <div>{{tan().toFixed(1)}}克</div>
          <div>{{dan().toFixed(1)}}克</div>
          <div>{{zhi().toFixed(1)}}克</div>
        </div>
      </div>
    </div>
    <div class="top">
      <img style="width: 3em;position: absolute;left: 20px;margin-top: -40px" :src="require('../../assets/图钉.png')">
      <div style="font-weight: bold">建议菜单</div>
      <div style="display: flex;align-items: center">
        <div>
          <div id="lei" :style="{width: '200px', height: '300px',marginTop:'1em'}"></div>
          <div style="color: #757575;font-size: 10px;margin-bottom: 1em">*数据来源：中国膳食指南2016版</div>
        </div>
        <div>经大数据对比，您的<div style="color: red;">{{buzu}}</div>等摄入不足,建议多食用这些食物</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import CellFoods from "@/views/two/cellFoods";
import request from "@/untils/request";

export default {
  name: "two",
  data() {
    return {
      rows: [],
      gu:0,
      nai:0,
      rou:0,
      shu:0,
      buzu:''
    }
  },
  components: {CellFoods, Navbar},
  methods: {
    formatRows(){
      this.rows.forEach(item=>{
        if (item.type==='谷薯芋、杂豆、主食'){
          this.gu+=parseInt(item.weight)
        }
        if (item.type==='奶类及制品'||item.type==='坚果、大豆及制品'){
          this.nai+=parseInt(item.weight)
        }
        if (item.type==='蛋类、肉类及制品'){
          this.rou+=parseInt(item.weight)
        }
        if (item.type==='蔬果和菌藻'){
          this.shu+=parseInt(item.weight)
        }
      })
      if (this.gu<650){
        this.buzu='谷薯'
      }
      if (this.nai<335){
        if (this.buzu.length!==0){
          this.buzu+=',奶、豆、坚果'
        }else {
          this.buzu='奶、豆、坚果'
        }
      }
      if (this.rou<300){
        if (this.buzu.length !== 0) {
          this.buzu+=',肉、水产、蛋'
        }else {
          this.buzu='肉、水产、蛋'
        }
      }if (this.shu<850){
        if (this.buzu.length!==0){
          this.buzu+=',蔬果'
        }else {
          this.buzu='蔬果'
        }
      }
    },
    drawLei(){
      let _this=this
      let echarts = require('echarts')
      let chartDom = document.getElementById('lei');
      let myChart = echarts.init(chartDom);
      myChart.setOption({
        title: {
        },
        legend: {
          data: ['中国居民平衡膳食参考', '你的摄入']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '谷薯', max: 800 },
            { name: '蔬\n果', max: 1200 },
            { name: '肉/水产/蛋', max: 420 },
            { name: '奶\n大豆\n坚果', max: 350 },
          ],
          radius: 60,//缩放
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [_this.gu, _this.shu, _this.rou,_this.nai],
                name: '你的摄入'
              },
              {
                value: [650, 850, 300,335],
                name: '中国居民平衡膳食参考'
              }
            ]
          }
        ]
      })
    },
    drawLine() {
      let echarts = require('echarts')
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [
              {value: this.tan(), name: '碳水化合物'},
              {value: this.dan(), name: '蛋白质'},
              {value: this.zhi(), name: '脂肪'}
            ]
          }
        ]
      });
    },
    zong() {
      let dan = 0, zhi = 0, tan = 0
      this.rows.forEach(item => {
        dan += parseFloat(item.dan)
        zhi += parseFloat(item.zhifang);
        tan += parseFloat(item.tan)
      })
      return dan + zhi + tan
    },
    tan() {
      let tan = 0
      this.rows.forEach(item => {
        tan += parseFloat(item.tan)
      })
      return tan
    }, dan() {
      let dan = 0
      this.rows.forEach(item => {
        dan += parseFloat(item.dan)
      })
      return dan
    }, zhi() {
      let zhi = 0
      this.rows.forEach(item => {
        zhi += parseFloat(item.zhifang)
      })
      return zhi
    },
    load(str) {
      request.get('/my/order', {
        params: {
          uid: this.$root.getUser().uid,
          search: str
        }
      }).then(res => {
        this.rows = res.rows
        console.log(res);
        this.formatRows()
        this.drawLine()
        this.drawLei()
      })
    }
  },
  activated() {
    this.load('')
  },
}
</script>

<style scoped>
.label {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin: 0 5px;
  padding: 20px 0;
  box-sizing: border-box;
  justify-content: space-evenly;
}
.k {
  width: 10px;
  height: 10px;
  background: red;
  margin-right: 3px;
}
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.biao-root {
  display: flex;
  justify-content: space-evenly;
}

.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 3px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
}
</style>