<template>
  <div class="root" v-if="rows">
    <navbar title="食物详情"></navbar>
    <div class="top">
      <div class="item" v-if="rows">
        <img :src="rows.pic" class="leftImg">
        <div v-text="rows.name" style="margin-left: 1em;font-weight: bold"></div>
        <div class="right" @click="clickQue">
          <div class="circle" :style="'background:'+circleBg(rows)+';'"></div>
          <div v-text="rows.health_label" :style="'color:'+circleBg(rows)+';'"></div>
          <van-icon name="question-o" style="margin-left: 1em"/>
        </div>
      </div>
      <div class="chipLayout">
        <chip v-for="data in chipRows" :data="data"></chip>
      </div>
    </div>
    <div class="re">
      <div class="re-title">
        <div>热量</div>
        <div class="rightbtn">千卡</div>
      </div>
      <div style="display: flex;align-items: center;justify-content: center">
        <div v-text="rows.re" style="font-size: 2em;"></div>
        <div style="margin-left: 1em">千卡</div>
      </div>
      <div style="color: #757575;font-size: 12px;margin-top: 1em;margin-bottom: 2em">每100克 （可食用部分）</div>
    </div>
    <div class="re">
      <div class="re-title">
        <div>营养元素</div>
        <div style="color: #757575;font-size: 12px;margin-left: auto">单位：每100克</div>
      </div>
      <div style="display: flex;justify-content: space-around;margin-top: 2em">
        <div style="display: flex;flex-direction: column;justify-content: center">
          <van-circle v-model="dan" size="80px" stroke-width="80" :text="dan+'%'" color="#ffce9f"
                      layer-color="#f2f1f6"/>
          <div style="font-size: 13px;margin-top: 1em">蛋白质</div>
          <div style="font-size: 13px">{{ rows.dan }} 克</div>
        </div>
        <div style="display: flex;flex-direction: column;justify-content: center">
          <van-circle v-model="zhi" size="80px" stroke-width="80" :text="zhi+'%'" color="#fc938f"
                      layer-color="#f2f1f6"/>
          <div style="font-size: 13px;margin-top: 1em">脂肪</div>
          <div style="font-size: 13px">{{ rows.zhifang }} 克</div>
        </div>
        <div style="display: flex;flex-direction: column;justify-content: center">
          <van-circle v-model="tan" size="80px" stroke-width="80" :text="tan+'%'" color="#aaacff"
                      layer-color="#f2f1f6"/>
          <div style="font-size: 13px;margin-top: 1em">碳水化合物</div>
          <div style="font-size: 13px">{{ rows.tan }} 克</div>
        </div>
      </div>
      <div style="color: #757575;font-size: 12px;margin-top: 2.5em;margin-bottom: 2em;text-align: left">
        注：以上为三大营养素的供能比例，不是重量比例。其中脂肪的供能效率比最高，是碳水化合物和蛋白质的2.25倍
      </div>
      <div style="display: flex;justify-content: center">
        <div class="morebtn" @click="$router.push('/info2/'+name)">更多营养素</div>
      </div>
    </div>
  </div>
</template>

<script>
import {ImagePreview} from "vant";

import Navbar from "@/components/navbar";
import request from "@/untils/request";
import Chip from "@/components/chip";

export default {
  name: "FoodInfo",
  components: {Chip, Navbar},
  computed: {
    zong() {
      let dan = parseFloat(this.rows.dan)
      let zhi = parseFloat(this.rows.zhifang);
      let tan = parseFloat(this.rows.tan);
      return (dan * 4 + zhi * 9 + tan * 4)
    },
    dan() {
      let dan = parseFloat(this.rows.dan) * 4
      return (dan / this.zong * 100).toFixed(1)
    },
    zhi() {
      let zhi = parseFloat(this.rows.zhifang) * 9;
      return (zhi / this.zong * 100).toFixed(1)
    },
    tan() {
      let tan = parseFloat(this.rows.tan) * 4;
      return (tan / this.zong * 100).toFixed(1)
    }
  },
  methods: {
    clickQue() {
      ImagePreview([require('../../assets/notice.jpg')])
    },
    circleBg(data) {
      let healthLabel = data.health_label;
      if (healthLabel === '红灯食物') {
        return 'red'
      } else if (healthLabel === '黄灯食物') {
        return '#fec408'
      } else {
        return '#00c4b3'
      }
    }
  },
  data() {
    return {
      chipRows: null,
      rows: null,
      name: decodeURIComponent(this.$route.path).replace('/info/', '')
    }
  },
  created() {
    request.post('/foods/info', {
      name: this.name
    }).then(res => {
      this.rows = res.rows
      this.chipRows = JSON.parse(res.rows.scenes)
    })
  }
}
</script>

<style scoped>
.root {
  background: #f2f1f6;
  position: fixed;
  width: 100%;
  height: 100%;
}

.top {
  background: white;
}

.morebtn {
  border-radius: 50px;
  height: 2em;
  line-height: 2em;
  width: 8em;
  font-size: 14px;
  text-align: center;
  border: 2px solid #f2f1f6;
}

.right {
  display: flex;
  margin-right: 1em;
  margin-left: auto;
  align-items: center;
  height: 1em;
}

.re-title {
  display: flex;
}

.rightbtn {
  border-radius: 50px;
  background: rgba(0, 196, 179, 0.05);
  color: #00c4b3;
  font-size: 12px;
  padding: 4px;
  margin-left: auto;
}

.circle {
  background: #00c4b3;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-right: 5px;
}

.item {
  box-sizing: border-box;
  display: flex;
  padding: 15px;
}

.chipLayout {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1em;
}

.leftImg {
  width: 50px;
  height: 50px;
  border-radius: 8px;
}

.re {
  padding: 15px;
  margin: 15px;
  border-radius: 15px;
  background: white;
}
</style>