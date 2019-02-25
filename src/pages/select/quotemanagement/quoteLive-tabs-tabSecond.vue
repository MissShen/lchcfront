<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="tab2(企业)" name="secondcompany">
        <quoteLive-tabs-tabSecondCompany></quoteLive-tabs-tabSecondCompany>
      </el-tab-pane>
      <el-tab-pane label="tab2(产品)" name="secondproduct">
        <quoteLive-tabs-tabSecondProduct></quoteLive-tabs-tabSecondProduct>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import quoteLiveTabsTabSecondCompany from 'src/pages/select/quotemanagement/quoteLive-tabs-tabSecondCompany'
  import quoteLiveTabsTabSecondProduct from 'src/pages/select/quotemanagement/quoteLive-tabs-tabSecondProduct'

  export default {
    name: 'quoteLive-tabs-tabSecond',
    components: {
      quoteLiveTabsTabSecondCompany,
      quoteLiveTabsTabSecondProduct
    },
    data() {
      return {
        activeName: 'secondcompany'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
