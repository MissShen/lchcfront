<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="卖方机构" name="1">
        <sell v-if="activeName=='1'"></sell>
      </el-tab-pane>
      <el-tab-pane label="卖方机构回收站" name="2">
        <sell-recycle v-if="activeName=='2'"></sell-recycle>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import sell from 'src/pages/datacenter/orgdata/sellorg/sell/index'
  import sellRecycle from 'src/pages/datacenter/orgdata/sellorg/sellRecycle'

  export default {
    name: 'demoTabs',
    components: {
      sell,
      sellRecycle
    },
    data() {
      return {
        activeName: '1'
      };
    },
    created(){
      this.activeName = this.$store.state.activeName
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        this.$store.state.pageSeach = {};
        this.$store.state.activeName=tab.name;
      },
      getNavType(){
        this.activeName=this.$store.state.activeName;
        //store.state.activeName里值变化的时候，设置activeName
      }
    },
    watch: {
      // 监测store.state
      '$store.state.activeName': 'getNavType'
    }
  }
</script>

