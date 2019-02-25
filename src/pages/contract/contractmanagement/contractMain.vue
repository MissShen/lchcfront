<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="合同管理" name="first">
        <contract-management ref="first"></contract-management>
      </el-tab-pane>
      <el-tab-pane label="合同历史数据" name="second">
        <contract-history ref="second"></contract-history>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import contractHistory from 'src/pages/contract/contractmanagement/history/contractHistory'
  import contractManagement from 'src/pages/contract/contractmanagement/contractManagement'


  export default {
    name: 'demoTabs',
    components: {
      contractManagement,
      contractHistory
    },
    created () {
      this.goAnchor();
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    watch: {
      $route(to,from){
        if(to.query.anchor!=from.query.anchor){
          this.goAnchor();
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        /*if (tab.name == "first") {
          this.$refs["first"].fillData();
        } else if (tab.name == "second"){
          this.$refs["second"].fillData();
        } else {
          this.$refs["thirdly"].fillData();
        }*/
      },
      goAnchor() {
        let routeAnchor = this.$route.query.anchor;
        let routeQuery = this.$route.meta.query;
        if (routeAnchor) {
          routeQuery.forEach(item => {
            if (routeAnchor == item.name) {
              if ('first' == item.val) {
                this.activeName = 'first';
              }
            }
          })
        }
      }
    }
  }
</script>

