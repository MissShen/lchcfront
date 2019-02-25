<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="买方机构" name="1">
        <buyer ref="buyer" v-if="activeName==='1'"></buyer>
      </el-tab-pane>
      <el-tab-pane label="买方机构回收站" name="2">
        <buyer-recycle ref="buyerRecycle" v-if="activeName==='2'"></buyer-recycle>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import buyer from 'src/pages/datacenter/orgdata/buyerorg/buyer/index'
  import buyerRecycle from 'src/pages/datacenter/orgdata/buyerorg/buyerRecycle'

  export default {
    name: 'demoTabs',
    components: {
      buyer,
      buyerRecycle
    },
    data() {
      return {
        activeName: "1"
      };
    },

    created(){
      this.activeName = this.$store.state.activeName
    },

    methods: {
      handleClick(tab, event) {
        this.$store.state.pageSeach = {};
        this.$store.state.activeName = tab.name;
        if (tab.name === "1") {
          this.$refs.buyer.list();
        } else {
          this.$refs.buyerRecycle.list();
        }
      },

      getNavType(){
        this.activeName = this.$store.state.activeName;
      }
    },

    watch: {
      '$store.state.activeName': 'getNavType'
    }
  }
</script>

