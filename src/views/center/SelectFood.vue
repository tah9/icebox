<template>
  <div class="item"  v-if="data">
    <img :src="data.pic" class="leftImg">
    <div class="center">
      <div v-text="data.name" class="name"></div>
      <div class="bottom-text"><span>{{data.weight}}克</span>  {{ qiank() }}</div>
    </div>
    <div class="right" @click="deleteClick">
      <van-icon name="delete-o"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItemFood",
  props: {
    data: null
  },
  methods: {
    qiank() {
      return (parseInt(this.data.weight) * (this.data.re / 100)).toFixed(2) + '千卡'
    },
    deleteClick() {
      let index = this.$root.$store.state.rows.indexOf(this.data)
      this.$root.$store.state.rows.splice(index, 1)
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.right {
  width: 10px;
  height: 10px;
  margin-right: 1em;
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