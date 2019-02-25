<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="tab1(企业)" name="firstcompany">
        <quoteLive-tabs-tabFirstCompany></quoteLive-tabs-tabFirstCompany>
      </el-tab-pane>
      <el-tab-pane label="tab1(产品)" name="firstproduct">
        <quoteLive-tabs-tabFirstProduct></quoteLive-tabs-tabFirstProduct>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import quoteLiveTabsTabFirstCompany from 'src/pages/select/quotemanagement/quoteLive-tabs-tabFirstCompany'
  import quoteLiveTabsTabFirstProduct from 'src/pages/select/quotemanagement/quoteLive-tabs-tabFirstProduct'

  export default {
    name: 'quoteLive-tabs-tabFirst',
    components: {
      quoteLiveTabsTabFirstCompany,
      quoteLiveTabsTabFirstProduct
    },
    data() {
      return {
        activeName: 'firstcompany'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
