<template>
  <div class="chip" v-if="data.suitable!==null" @click="clickChip">
    <van-icon name="star" v-if="data.suitable" color="#00c4b3"/>
    <van-icon name="warning" v-else color="red"/>
    <div v-text="data.name" style="margin-left: 4px"></div>
  </div>
</template>

<script>
import {Notify} from 'vant';

export default {
  name: "chip",
  props: {
    data: null
  },
  data() {
    return {}
  },
  methods: {
    clickChip() {
    }
  }
}
</script>

<style scoped>
.chip {
  display: flex;
  align-items: center;
  background: #f2f1f6;
  border-radius: 50px;
  margin: 6px 10px;
  padding: 5px 13px;
  font-size: 14px;
}
</style>