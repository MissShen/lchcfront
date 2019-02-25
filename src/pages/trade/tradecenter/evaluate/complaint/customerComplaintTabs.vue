<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="订单明细" name="1">
        <add-order-complaints-list  v-if="activeName==='1'" @refreshTab="changeTab"></add-order-complaints-list>
      </el-tab-pane>
      <el-tab-pane label="平台所有企业" name="second">
        <add-company-complaints-list v-if="activeName==='second'"></add-company-complaints-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import addOrderComplaintsList from 'src/pages/trade/tradecenter/evaluate/complaint/addOrderComplaintsList'
  import addCompanyComplaintsList from 'src/pages/trade/tradecenter/evaluate/complaint/addCompanyComplaintsList'

  export default {
    name: 'customerComplaintTabs',
    components: {
      addOrderComplaintsList,
      addCompanyComplaintsList
    },
    data() {
      return {
        activeName: '1',
        state: undefined,
        visible_second: false
      };
    },

    created() {
      this.activeName = this.$store.state.activeName
      console.log(this.activeName)
      //if(this.activeName){}
    },
    methods: {
      handleClick(tab, event) {
        this.$store.state.activeName = tab.name
      },
      changeTab(tab){
        this.activeName=tab;
      },
    }
  }
</script>

