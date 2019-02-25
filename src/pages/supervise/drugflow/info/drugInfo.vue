<template>
  <div class="mainbox">
    <ul>
      <el-collapse v-model="activeNames" @change="handleChange" accordion>
        <el-collapse-item title="基本信息" name="1">
          <basic-info></basic-info>
        </el-collapse-item>
        <el-collapse-item title="资审信息" name="2">
          <qualification-info></qualification-info>
        </el-collapse-item>
        <el-collapse-item title="遴选信息" name="3">
          <select-info></select-info>
        </el-collapse-item>
        <!--<el-collapse-item title="合同信息" name="4">
          <contract-info></contract-info>
        </el-collapse-item>-->
        <el-collapse-item title="采购交易" name="5">
          <trade-info></trade-info>
        </el-collapse-item>
      </el-collapse>

    </ul>
  </div>
</template>

<script>
  import BasicInfo from './basic/basicInfo'
  import QualificationInfo from './qualification/qualificationInfo'
  import SelectInfo from './select/selectInfo'
  import ContractInfo from './contract/contractInfo'
  import TradeInfo from './trade/tradeInfo'

  export default {
    components: {
      BasicInfo,
      QualificationInfo,
      SelectInfo,
      ContractInfo,
      TradeInfo
    },
    name: "drug-info",
    data() {
      return {
        activeNames: ['1'],
        // resLxData: this.metaData(),
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>

<style scoped>

</style>
