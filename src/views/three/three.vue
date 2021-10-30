<template>
  <div>
    <navbar title="图表统计" :left="false"></navbar>
    <div id="dian" :style="{width: '100%', height: '300px'}"></div>
    <div id="xian" :style="{width: '100%', height: '300px'}"></div>
    <div id="ji" :style="{width: '100%', height: '300px'}"></div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import request from "@/untils/request";

export default {
  name: "three",
  components: {Navbar},
  data() {
    return {
      rows: []
    }
  },
  methods: {
    load(str) {
      request.get('/my/order', {
        params: {
          uid: this.$root.getUser().uid,
          search: str
        }
      }).then(res => {
        this.rows = res.rows
        console.log(res);
        this.initDian()
        this.initJi()
        this.initXian()
      })
    },
    initDian() {
      let echarts = require('echarts')
      let chartDom = document.getElementById('dian');
      let myChart = echarts.init(chartDom);
      let data = []
      this.rows.forEach(item => {
        data.push([parseInt(item.re), parseInt(item.weight), parseInt((item.re * (parseInt(item.weight) / 100)).toFixed(0)), item.name])
      })
      console.log(data);
      // const data = [[28604, 77, 17096869, 'Australia'], [31163, 77.4, 27662440, 'Canada'], [1516, 68, 1154605773, 'China'], [13670, 74.7, 10582082, 'Cuba'], [28599, 75, 4986705, 'Finland'], [29476, 77.1, 56943299, 'France'], [31476, 75.4, 78958237, 'Germany'], [28666, 78.1, 254830, 'Iceland'], [1777, 57.7, 870601776, 'India'], [29550, 79.1, 122249285, 'Japan'], [2076, 67.9, 20194354, 'North Korea'], [12087, 72, 42972254, 'South Korea'], [24021, 75.4, 3397534, 'New Zealand'], [43296, 76.8, 4240375, 'Norway'], [10088, 70.8, 38195258, 'Poland'], [19349, 69.6, 147568552, 'Russia'], [10670, 67.3, 53994605, 'Turkey'], [26424, 75.7, 57110117, 'United Kingdom'], [37062, 75.4, 252847810, 'United States']]

      myChart.setOption({
        /* textStyle:{
           fontSize: 12
         },*/
        xAxis: {
          splitLine: {show: false}
        },
        yAxis: {
          splitLine: {show: false},
          scale: true
        },
        grid: {
          left: 40,
          right: 20
        },
        series: [
          {
            name: '1990',
            data: data,
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]);
            },
            emphasis: {
              focus: 'self'
            },
            labelLayout: function () {
              return {
                x: myChart.getWidth() - 100,
                moveOverlap: 'shiftY'
              };
            },
            labelLine: {
              show: true,
              length2: 5,
              lineStyle: {
                color: '#bbb'
              }
            },
            label: {
              show: true,
              formatter: function (param) {
                return param.data[3];
              },
              position: 'right',
              minMargin: 2
            }
          }
        ]
      })
    },
    initJi() {
      let echarts = require('echarts')
      let chartDom = document.getElementById('ji');
      let myChart = echarts.init(chartDom);
      // let data=[]
      // this.rows.forEach(item=>{
      //   data.push([parseInt(item.re),parseInt(item.weight),parseInt((item.re * (parseInt(item.weight) / 100)).toFixed(0)),item.name])
      // })
      let data = [], series = []
      this.rows.forEach(item => {
        data.push(item.name)
        series.push({
          type: 'bar',
          data: [parseInt(item.dan), parseInt(item.zhi), parseInt(item.tan)],
          coordinateSystem: 'polar',
          stack: 'a',
          emphasis: {
            focus: 'series'
          }
        })
      })
      myChart.setOption({
        angleAxis: {},
        radiusAxis: {
          type: 'category',
          data: data,
          z: 10
        },
        polar: {},
        series: series,
        legend: {
          show: true,
          data: ['蛋白质', '脂肪', '碳水化合物']
        }
      })
    },
    initXian(){
      let echarts = require('echarts')
      let chartDom = document.getElementById('xian');
      let myChart = echarts.init(chartDom);
      let legendData=[],weightData=[],seriesData=[]
      this.rows.forEach(item=>{
        legendData.push(item.name)
        weightData.push(item.weight)
        seriesData.push({
          name: item.name,
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          // data: [120, 132, 101, 134, 90, 230, 210]
          data: [parseInt(item.re), parseInt(item.dan),parseInt(item.zhifang),parseInt(item.weight), parseInt((item.re * (parseInt(item.weight) / 100)).toFixed(0))]
        },);
      })
      myChart.setOption({
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: legendData
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: weightData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series:seriesData
      })
    }
  },
  activated() {
    this.load('')
  }
}
</script>

<style scoped>

</style>