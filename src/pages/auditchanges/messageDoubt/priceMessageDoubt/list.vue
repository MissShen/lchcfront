<template>
  <div class="tab-box">
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="价格信息申报质疑" name="1">
        <declare-doubt-list v-if="activeName=='1'" ref="declareDoubtList"></declare-doubt-list>
      </el-tab-pane>
      <el-tab-pane label="价格信息变更质疑" name="2">
        <change-doubt-list v-if="activeName=='2'" ref="changeDoubtList"></change-doubt-list>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import changeDoubtList from 'src/pages/auditchanges/messageDoubt/priceMessageDoubt/changeDoubtList'
  import declareDoubtList from 'src/pages/auditchanges/messageDoubt/priceMessageDoubt/declareDoubtList'
  export default {
    name: "list",
    components:{
      changeDoubtList,
      declareDoubtList
    },
    data() {
      return {
        activeName:'1',
      }
    },
    created(){
      this.activeName = this.$store.state.activeName;
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        this.$store.state.pageSeach = {};
        this.$store.state.activeName = tab.name;
      },
      getNavType(){
        this.activeName = this.$store.state.activeName
      },
    },
    watch:{
      //监测store.state
      '$store.state.activeName' : 'getNavType'
    }
  }
</script>

<style scoped>

</style>
