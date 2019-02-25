<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="签订委托协议" name="first">
        <signEntrustmentAgreement></signEntrustmentAgreement>
      </el-tab-pane>
      <el-tab-pane label="历史委托协议" name="second">
        <signEntrustmentAgreementHistory></signEntrustmentAgreementHistory>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import signEntrustmentAgreement from 'src/pages/contract/contractmanagement/conmaincontract/signConsignmentAgreement'
  import signEntrustmentAgreementHistory from 'src/pages/contract/contractmanagement/conmaincontract/signEntrustmentAgreementHistory'

  export default {
    name: 'contractManagementContractSignature',
    components: {
      signEntrustmentAgreement,
      signEntrustmentAgreementHistory
    },
    data() {
      return {
        activeName: 'first',
        partyCode: undefined,
      };
    },
    created() {
      // let path = this.$route.path;
      // this.partyCode = path.substr(path.length - 1, path.length)
      // console.log("------------------", this.partyCode);
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

