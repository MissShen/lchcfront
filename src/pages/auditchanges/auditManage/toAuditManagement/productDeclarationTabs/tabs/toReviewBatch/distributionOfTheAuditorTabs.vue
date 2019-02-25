<template>
  <div>
    <!--<div class="tabs-panel">-->
      <!--<span class="active">分配审核员</span>-->
    <!--</div>-->

    <div class="">
      <!-- ========================== 主内容start ========================= -->
      <el-tabs v-model="activeName" @tab-click="handleClick"  width="100%">
        <el-tab-pane label="一审" name="1" v-if="auditorSize>=1" >
          <!--<distribution-of-the-auditor-one @userData="userData" :allData="allData" :projectId="projectId" :activeName="activeName" v-if="activeName=='1'"></distribution-of-the-auditor-one>-->
          <distributionOfTheAuditor @userData="userData" :allData="allData" :projectId="projectId" :activeName="activeName" v-if="activeName=='1'"></distributionOfTheAuditor>
        </el-tab-pane>
        <el-tab-pane label="二审" name="2" v-if="auditorSize>=2">
          <!--<distribution-of-the-auditor-two @userData="userData" :allData="allData" :projectId="projectId" :activeName="activeName" v-if="activeName=='2'"></distribution-of-the-auditor-two>-->
          <distributionOfTheAuditor @userData="userData" :allData="allData" :projectId="projectId" :activeName="activeName" v-if="activeName=='2'"></distributionOfTheAuditor>
        </el-tab-pane>
        <el-tab-pane label="三审" name="3"  v-if="auditorSize>=3">
          <!--<distribution-of-the-auditor-thr @userData="userData" :allData="allData" :projectId="projectId" :activeName="activeName" v-if="activeName=='3'"></distribution-of-the-auditor-thr>-->
          <distributionOfTheAuditor @userData="userData" :allData="allData" :projectId="projectId" :activeName="activeName" v-if="activeName=='3'"></distributionOfTheAuditor>
        </el-tab-pane>
        <el-tab-pane label="四审" name="4" v-if="auditorSize>=4">
          <!--<distribution-of-the-auditor-fou @userData="userData" :allData="allData" :projectId="projectId" :activeName="activeName" v-if="activeName=='4'"></distribution-of-the-auditor-fou>-->
          <distributionOfTheAuditor @userData="userData" :allData="allData" :projectId="projectId" :activeName="activeName" v-if="activeName=='4'"></distributionOfTheAuditor>
        </el-tab-pane>
        <el-tab-pane label="五审" name="5" v-if="auditorSize>=5" >
          <!--<distribution-of-the-auditor-fiv @userData="userData" :allData="allData" :projectId="projectId" :activeName="activeName" v-if="activeName=='5'"></distribution-of-the-auditor-fiv>-->
          <distributionOfTheAuditor @userData="userData" :allData="allData" :projectId="projectId" :activeName="activeName" v-if="activeName=='5'"></distributionOfTheAuditor>
        </el-tab-pane>
      </el-tabs>
      <!-- ========================== 主内容end ========================= -->
    </div>
  </div>
</template>
<script>
  import distributionOfTheAuditor from './distributionOfTheAuditorTab/distributionOfTheAuditor'
  // import distributionOfTheAuditorOne from './distributionOfTheAuditorTab/distributionOfTheAuditorOne'
  // import distributionOfTheAuditorTwo from './distributionOfTheAuditorTab/distributionOfTheAuditorTwo'
  // import distributionOfTheAuditorThr from './distributionOfTheAuditorTab/distributionOfTheAuditorThr'
  // import distributionOfTheAuditorFou from './distributionOfTheAuditorTab/distributionOfTheAuditorFou'
  // import distributionOfTheAuditorFiv from './distributionOfTheAuditorTab/distributionOfTheAuditorFiv'

  import {getcheckCountAndUserId} from 'src/axios/auditchanges/toAuditManagement/productDeclarationTabs'

  export default {
    name: "distribution-of-the-auditor-tabs",
    components: {
      distributionOfTheAuditor,
      // distributionOfTheAuditorOne,
      // distributionOfTheAuditorTwo,
      // distributionOfTheAuditorThr,
      // distributionOfTheAuditorFou,
      // distributionOfTheAuditorFiv
    },
    data() {
      return {
        projectId:'',
        activeName: '1',
        checkFlag:'1',
        auditorSize:'5',
        allData: [],
        allIds:[]
      };
    },
    created(){
      this.projectId = this.$route.params.id;
      this.getTabs();
      // this.projectType = this.$route.params.type;
      console.log(this.projectId,'projectId');
      // console.log(this.projectType);
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        // this.allData[this.activeName] = subData;
      },
      getTabs(){
        getcheckCountAndUserId(this.projectId).then(res=>{
          console.log(res,'res........................')
          if(res.data.success){
            this.auditorSize = res.data.rightBackJson.checkCount;
            this.allData[5] = res.data.rightBackJson.userIdList;
          }else{
            this.$message(res.data.exceptionMessage)
          }
        });
      },
      userData(msg){
        // console.log(msg,'msg');
        this.allData[msg.activeName-1] = msg.tableData;
        // console.log(this.allData,'allData');
      }
    },


  }

</script>

<style>

</style>
