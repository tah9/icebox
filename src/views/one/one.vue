<template>
  <div class="root">
    <van-search class="search" style="z-index: 999"
                v-model="value" @input="myInput"
                shape="round" @focus="myFocus()" @cancel="myCancel()"
                background="#00c4b3" :show-action="beSearch"
                placeholder="搜索添加的食物"
    />
    <div class="content">
      <div class="jinchu">
        <div style="width: 33%;height: 200px" id="sheng"></div>
        <div style="width: 33%;height: 200px" id="qu"></div>
        <div style="width: 33%;height: 200px;" id="she"></div>
      </div>
      <div v-if="!beSearch" @click="deleteQu()" style="display: flex;justify-content: center"><van-button plain hairline type="info" size="small">清除取出记录</van-button></div>
      <div class="top" v-if="!beSearch" style="text-align: center">滑动取出食品</div>
      <div class="list">
        <van-swipe-cell v-for="data in rows">
          <div class="item">
            <img :src="data.pic" class="leftImg">
            <div class="center">
              <div v-text="data.name" class="name"></div>
              <div class="bottom-text">{{ data.weight }}克</div>
            </div>
            <div class="right">
              <van-tag type="success" v-if="!guo(data)">剩余{{ tian(data) }}天</van-tag>
              <van-tag type="danger" v-else>已过期{{ tian(data) }}天</van-tag>
            </div>
          </div>
          <template #right>
            <van-button  square text="取出" type="warning" class="delete-button" @click="deleteClick(data.id)"/>
          </template>
        </van-swipe-cell>
      </div>
    </div>

  </div>
</template>

<script>
import request from "@/untils/request";
import {Toast} from "vant";

export default {
  name: "one",
  data() {
    return {
      value: '',
      rows: [],
      beSearch: false,
      timeSearch: null,
      allRows: []
    }
  },
  methods: {
    deleteQu(){
      request.post('/my/delete',{},{
        params:{
          uid:this.$root.getUser().uid
        }
      }).then(res=>{
        Toast.success('清除成功')
        this.loadAll()
      })
    },
    loadShe(){
      let _this=this
      let echarts = require('echarts')
      let chartDom = document.getElementById('she');
      let myChart = echarts.init(chartDom);
      let data=[]
      this.rows.forEach(item=>{
          data.push({
            value:item.weight,
            name:item.name
          })
      })
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        title: {
          text: '剩余的食品',
          bottom: 'bottom'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    loadQu(){
      let _this=this
      let echarts = require('echarts')
      let chartDom = document.getElementById('qu');
      let myChart = echarts.init(chartDom);
      let data=[]
      this.allRows.forEach(item=>{
        if (item.status===1){
          data.push({
            value:item.weight,
            name:item.name
          })
        }
      })
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        title: {
          text: '取出的食品',
          bottom: 'bottom'
        },
        legend: {
          orient: 'horizontal',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    loadSheng(){
      let _this=this
      let echarts = require('echarts')
      let chartDom = document.getElementById('sheng');
      let myChart = echarts.init(chartDom);
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        title: {
          text: '存取食物占比',
          bottom: 'bottom'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            data: [
              { value: _this.allRows.length-_this.rows.length, name: '取出' },
              { value: _this.rows.length, name: '剩余' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    myInput(str) {
      //函数防抖
      if (this.timeSearch !== null) {
        clearTimeout(this.timeSearch)
      }
      this.timeSearch = setTimeout(() => {
        this.load(str)
      }, 500)
    },
    tian(data) {
      let time = Date.parse(new Date()) / 1000;
      let offTime = time - data.addTime;
      // console.log(offTime);
      // console.log(offTime / (60 * 60 * 24));
      return data.bao - Math.round(offTime / (60 * 60 * 24))
    },
    guo(data) {
      let time = Date.parse(new Date()) / 1000;
      let offTime = time - data.addTime;
      if (offTime < data.bao * 60 * 60 * 24) {
        return false
      } else {
        return true
      }
    },
    myCancel() {
      this.beSearch = false
      this.load('')
    },
    myFocus() {
      this.beSearch = true;
      this.rows = []
    },
    deleteClick(id) {
      this.rows.forEach(item => {
        if (item.id === id) {
          let index = this.rows.indexOf(item)
          this.rows.splice(index, 1)
        }
      })
      this.allRows.forEach(item=>{
        if (item.id === id) {
          item.status=1
        }
      })
      let params= {
        id: id,
        status: '1'
      }
      console.log(params);
      request.post("/my/toggle", {},{
        params: {
          id: id,
          status: 1
        }
      }).then(res => {
        Toast.success('取出成功')
        this.loadShe()
        this.loadQu()
        this.loadSheng()
      })
    },
    load(str) {
      request.get('/my/order', {
        params: {
          uid: this.$root.getUser().uid,
          search: str,
          status: '0'
        }
      }).then(res => {
        this.rows = res.rows
        console.log(res);
      })
    },
    loadAll(str) {
      request.get('/my/order', {
        params: {
          uid: this.$root.getUser().uid,
          status: str
        }
      }).then(res => {
        this.allRows = res.rows
        this.loadSheng()
        this.loadQu()
        this.loadShe()
      })
    }
  },
  activated() {
    console.log('====')
    this.load('')
    this.loadAll('')
  }
}
</script>

<style scoped>
.delete-button {
  height: 100%;
}

.item {
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 15px;
}

.search {
  position: sticky;
  top: 0;
}
.content{
  /*position: absolute;*/
}
.top {

}
.jinchu {
  background: white;
  width: 100%;
  height: 200px;
  display: flex;
}

.leftImg {
  width: 50px;
  height: 50px;
  border-radius: 8px;
}

.right {
  margin-left: auto;
  margin-right: 1em;
}

.center {
  text-align: left;
  margin-left: 1em;
}
</style>