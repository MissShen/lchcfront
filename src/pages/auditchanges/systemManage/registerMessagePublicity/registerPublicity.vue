<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="企业公示管理" name="1">
        <org-publicity-tabs-tabapp v-if="activeName=='1'"></org-publicity-tabs-tabapp>
      </el-tab-pane>
      <el-tab-pane label="产品公示管理" name="2">
   <product-tabs-tabboo v-if="activeName=='2'"></product-tabs-tabboo>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import orgPublicityTabsTabapp  from 'src/pages/auditchanges/systemManage/registerMessagePublicity/orgPublicity'
  import productTabsTabboo  from 'src/pages/auditchanges/systemManage/registerMessagePublicity/productPublicity'

  export default {
    name: 'registerPublicity',
    components: {
      orgPublicityTabsTabapp,
      productTabsTabboo
    },
    data() {
      return {
        activeName: '1'
      };
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
