<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本医疗保险药品" name="1">
        <base-medical-insurance-drugs v-if="activeName=='1'"></base-medical-insurance-drugs>
      </el-tab-pane>
      <el-tab-pane label="剂型打包维护列表" name="2">
        <dosage-form-package v-if="activeName=='2'"></dosage-form-package>
      </el-tab-pane>
      <el-tab-pane label="分类维护" name="3">
        <tree-table v-if="activeName=='3'"></tree-table>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import baseMedicalInsuranceDrugs from 'src/pages/datacenter/authdata/medicalinsurance/mainTable'
  import dosageFormPackage from 'src/pages/datacenter/authdata/medicalinsurance/dosageFormPackage'
  import treeTable from 'src/pages/datacenter/authdata/medicalinsurance/tree'

  export default {
    name: 'demoTabs',
    components: {
      baseMedicalInsuranceDrugs,
      dosageFormPackage,
      treeTable
    },
    data() {
      return {
        activeName: '1'
      };
    },
    created(){
      this.activeName=this.$store.state.activeName;
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        this.$store.state.pageSeach={};
        this.$store.state.activeName=tab.name;
      },
      getNavType(){
        this.activeName=this.$store.state.activeName;
      },
    },
    watch:{
      '$store.state.activeName':'getNavType',
    }
  }
</script>

