<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="合同列表" name="first">
        <contract-Signature></contract-Signature>
      </el-tab-pane>
      <el-tab-pane label="合同历史数据" name="second">
        <contract-Historical-Data></contract-Historical-Data>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import contractSignature from 'src/pages/contract/contractmanagement/contractsignature/contractSignature-Tabs-tabFirst'
  import contractHistoricalData from 'src/pages/contract/contractmanagement/contractsignature/contractSignature-Tabs-tabSecond'

  export default {
    name: 'contractManagementContractSignature',
    components: {
      contractSignature,
      contractHistoricalData
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

