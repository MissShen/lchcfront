<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="选择配送企业" name="first">
        <manufacture-select-sender ref="first"></manufacture-select-sender>
      </el-tab-pane>
      <el-tab-pane label="配送企业查看" name="second">
        <distribution-enterprise ref="second"></distribution-enterprise>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import manufactureSelectSender from 'src/pages/contract/sender/manufactureSelectSender/manufactureSelectSender'
  import distributionEnterprise from 'src/pages/contract/sender/distributionenterprise/distributionEnterprise'


  export default {
    name: 'demoTabs',
    components: {
      manufactureSelectSender,
      distributionEnterprise
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

