<template>
  <div>
    <navbar title="添加食品" class="nav" :left="false"></navbar>
    <van-search v-model="searchValue" shape="round" :show-action="beSearch" @focus="myFocus()" @input="beInput"
                placeholder="请输入食物名称" class="search" @cancel="cancelSearch()"/>
    <TabLayout class="myTab" @changeTab="clickTab" v-show="!beSearch">
      <div class="tab" v-for="(name,index) in typeRows" v-text="name"
           :class="tabIndex===index?'tab-on':''"></div>
    </TabLayout>
    <div class="bottom" v-show="!beSearch" ref="bottom">
      <van-badge :content="$store.state.rows.length">
        <van-icon name="send-gift-o" size="30" @click="()=>{this.showSelect=true}"/>
      </van-badge>
      <div class="btn" @click="over()">完成</div>
      <div @click="toggleClass()" style="color: #00c4b3">
        <van-icon name="exchange"/>
        {{ myclass }}
      </div>
    </div>
    <div class="list">
      <div v-for="item in rows">
        <ListItemFood :data="item" @clickItem="clickItem" :key="item.id"></ListItemFood>
        <!--    分割线-->
        <div style="border-bottom: 1px solid rgba(0, 0, 0, .05);margin-left: 15px;margin-right: 15px"></div>
      </div>
    </div>
    <van-action-sheet v-model="showBottom" round v-if="showBottom">
      <div class="bottom-content">
        <div class="bottomItem">
          <div @click="clickInfo">
            <ListItemFood :data="clickData"></ListItemFood>
            <van-divider style="color:#00c4b3 ">食品详情 ></van-divider>
          </div>
          <div class="number">
            <div style="display: flex;flex-direction: column;align-items: flex-start">
              <span style="color: #757575" v-text="qianKa()"></span>
              <span style="color: #757575" v-text="weight+'克'"></span>
            </div>
            <div style="display: flex">
              <div style="font-size: 2em;color: #00c4b3;text-decoration: underline" v-text="weight"></div>
              <div style="color: #00c4b3;margin-left: 0.5em">克</div>
            </div>
            <div style="display: flex" @click="clickDay()">
              <span style="color: #757575;font-size: 14px">保质期</span>
              <van-icon name="exchange" color="#00c4b3"/>
              <div style="font-size: 2em;" v-text="bao"></div>
              <div style="color: #00c4b3;margin-left: 0.5em">天</div>
            </div>
          </div>
        </div>
        <van-number-keyboard :show="showBottom" theme="custom" v-model="weight"
                             :maxlength="6" @close="close()" @blur="blur"
                             extra-key="." close-button-text="完成"/>
      </div>
    </van-action-sheet>
    <van-popup v-model="showSelect" v-if="showSelect" round
               :overlay-style="{background:'linear-gradient(to bottom,rgba(0,0,0,0.6),rgba(0,0,0,0))'}"
               style="height: 40vh;margin-bottom: 100px;" position="bottom">
      <div style="margin-top: 1em;margin-left: 2em">总计{{zong().toFixed(2)}}千卡</div>
      <select-food :data="data" v-for="data in $store.state.rows"></select-food>
    </van-popup>
  </div>
</template>

<script>
import request from "@/untils/request";
import axios from "axios";
import ListItemFood from "@/views/center/ListItemFood";
import TabLayout from "@/components/TabLayout";
import Navbar from "@/components/navbar";
import SelectFood from "@/views/center/SelectFood";
import {Toast} from "vant";

export default {
  name: "center",
  components: {Navbar, TabLayout, ListItemFood, SelectFood},
  data() {
    return {
      searchValue: '',
      tabIndex: 0,
      myclass: '食材',
      typeRows: null,
      rows: null,
      showSelect: false,
      showBottom: false,
      clickData: null,
      weight: '1',
      beSearch: false,
      timeSearch: null,
      bao:1,
    }
  },
  methods: {
    zong(){
      let sum=0;
      let rows = this.$store.state.rows;
      rows.forEach(item=>{
        sum+=(parseInt(item.weight) * (parseInt(item.re) / 100))/*.toFixed(2)*/
      })
      console.log(sum);
      return parseFloat(sum)
    },
    clickDay(){
      let a=[0,1,3,7,10,30]
      let index=a.indexOf(this.bao)+1
      this.bao=a[index===a.length?0:index]
    },
    over() {
      let timestamp = Date.parse(new Date())/1000;
      this.$store.state.rows.forEach(item=>{
        item['addTime']=timestamp
      })
      request.post('/my/add/'+this.$root.getUser().uid,this.$store.state.rows).then(res=>{
        console.log(res);
        Toast.success('添加成功')
        this.$store.state.rows=[]
        this.$router.replace('/home/one')
      })
    },
    close() {
      let has = false
      for (let i = 0; i < this.$store.state.rows.length; i++) {
        let item = this.$store.state.rows[i]
        if (item.name === this.clickData.name) {
          this.$store.state.rows.splice(i, 1);
          this.clickData['weight'] = parseFloat(item.weight) + parseFloat(this.weight)
          this.$store.state.rows.splice(0, 0, this.clickData)
          has = true
          break
        }
      }
      if (!has) {
        this.clickData['bao']=this.bao
        this.clickData['weight'] = this.weight
        this.$store.state.rows.push(this.clickData)
      }
      this.showBottom = false
    },
    cancelSearch() {
      this.beSearch = false
      clearTimeout(this.timeSearch)
      this.loadType()
    },
    beInput(str) {
      //函数防抖
      if (this.timeSearch !== null) {
        clearTimeout(this.timeSearch)
      }
      this.timeSearch = setTimeout(() => {
        request.get('/foods/get', {
          params: {
            searchName: str
          }
        }).then(res => {
          console.log(res);
          this.rows = res.rows
        })
      }, 500)
    },
    myFocus() {
      this.rows = []
      this.beSearch = true
    },
    blur() {

    },
    qianKa() {
      return (this.clickData.re * (parseInt(this.weight) / 100)).toFixed(2) + '千卡'
    },
    toggleClass() {
      if (this.myclass === '食材') {
        this.myclass = '菜肴'
      } else {
        this.myclass = '食材'
      }
      this.loadType()
    },
    clickTab(cur) {
      this.tabIndex = cur
      this.load(cur)
    },
    clickItem(data) {
      this.showBottom = true
      this.clickData = data
      this.weight = '1'
      console.log(data);
    },
    clickInfo() {
      this.$router.push('/info/' + this.clickData.name)
    },
    selectMenu(action) {

    },
    search(str) {
      request.get('/foods/get', {
        params: {
          pagerSize: 100,
          searchName: str
        }
      }).then(res => {
        this.rows = res.rows
      })
    },
    load(index) {
      request.get('/foods/get', {
        params: {
          classtype: this.myclass,
          type: this.typeRows[index],
          pagerSize: 100
        }
      }).then(res => {
        console.log(res);
        this.rows = res.rows
      })
    },
    loadType() {
      request.post('/foods/getType', {class: this.myclass}).then(res => {
        console.log(res);
        this.typeRows = res.rows;
        this.load(0)
      })
    }
  },
  created() {
    let _this = this
    this.loadType()
  }
}
</script>

<style scoped>
.number {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.content {
  display: flex;
}

.bottomItem {
  margin-bottom: 70%;
}

.list {
  width: 100%;
  margin-bottom: 94px;
}

.myover {
  background: #f2f1f6;
}

.bottom-content {
  padding: 16px;
}

.btn {
  background: #00c4b3;
  text-align: center;
  line-height: 35px;
  border-radius: 50px;
  flex: 0.6;
  color: white;
  margin-left: 1em;
}

.tab {
  color: #757575;
  padding: 15px;
  box-sizing: border-box;
}

.myTab {
  position: sticky;
  top: 100px;
  background: white;
}

.search {
  position: sticky;
  top: 46px;
}

.tab-on {
  color: black;
  font-weight: bold;
}

.bottom {
  justify-content: space-evenly;
  display: flex;
  position: fixed;
  bottom: 50px;
  background: white;
  width: 100%;
  align-items: center;
  height: 44px;
  padding: 15px;
  box-sizing: border-box;
}

</style>
