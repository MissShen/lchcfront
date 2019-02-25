<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="零售企业(零售药店)" name="1">
        <retailorg ref="retailor" v-if="activeName=='1'"></retailorg>
      </el-tab-pane>
      <el-tab-pane label="零售企业(零售药店)回收站" name="2">
        <retail-recycle ref="retailre" v-if="activeName=='2'"></retail-recycle>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import retailorg from 'src/pages/datacenter/orgdata/retailorg/retail/index'
  import retailRecycle from 'src/pages/datacenter/orgdata/retailorg/retailRecycle'

  export default {
    name: 'demoTabs',
    components: {
      retailorg,
      retailRecycle
    },
    data() {
      return {
        activeName: '1',
        activeF:false,
        activeS:true,
      };
    },
    created(){
      this.activeName=this.$store.state.activeName;
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        this.$store.state.pageSeach={};
        this.$store.state.activeName=tab.name;
      },
      getNavType(){
        this.activeName=this.$store.state.activeName;
      },
    },
    watch:{
      '$store.state.activeName':'getNavType',
    }
  }
</script>

