<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="制定采购单" name="first">
        <first-medicine-list></first-medicine-list>
      </el-tab-pane>
      <el-tab-pane label="候选目录" name="second">
        <first-all-medicine-list></first-all-medicine-list>
      </el-tab-pane>
      <el-tab-pane label="采购计划" name="third">
        <first-plan-list></first-plan-list>
      </el-tab-pane>
      <el-tab-pane label="采购模板" name="fourth">
        <first-template-list></first-template-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import firstMedicineList from 'src/pages/trade/tradecenter/firstInstanceRole/purchase/medicineList'
  import firstAllMedicineList from 'src/pages/trade/tradecenter/firstInstanceRole/purchase/allMedicineList'
  import firstPlanList from 'src/pages/trade/tradecenter/firstInstanceRole/plan/planList'
  import firstTemplateList from 'src/pages/trade/tradecenter/firstInstanceRole/purchase/templateList'
  import firstPriceWarning from 'src/pages/trade/tradecenter/firstInstanceRole/purchase/priceWarningList'

  export default {
    name: 'purchaseTabs',
    components: {
      firstMedicineList,
      firstAllMedicineList,
      firstPlanList,
      firstTemplateList
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
      }
    }
  }
</script>

