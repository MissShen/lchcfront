<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="两票制承诺书签订" name="first">
        <two-vote-management-commitment-signed ref="first"></two-vote-management-commitment-signed>
      </el-tab-pane>
      <el-tab-pane label="两票制承诺书公示" name="second">
        <two-vote-management-commitment-publicity-tabs ref="second"></two-vote-management-commitment-publicity-tabs>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import twoVoteManagementCommitmentSigned from 'src/pages/contract/twovotemanagement/commitmentSigned'
  import twoVoteManagementCommitmentPublicityTabs from 'src/pages/contract/twovotemanagement/commitmentPublicityTabs.vue'


  export default {
    name: 'demoTabs',
    components: {
      twoVoteManagementCommitmentSigned,
      twoVoteManagementCommitmentPublicityTabs
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

