<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待审批采购单" name="first" v-if="roleCode!=='supervise_bj'" >
        <div slot="label">待审批采购单
          <span class="tab-sign" v-if="planCount!='0' &&  Number(planCount)>100">100+</span>
          <span class="tab-sign" v-if="planCount!='0' &&  Number(planCount)<100" >{{planCount}}</span>
        </div>
        <query-first-plan-list v-if="activeName==='first'" @planList="planListMethod"></query-first-plan-list>
      </el-tab-pane>
      <el-tab-pane  v-if="roleCode!=='supervise_bj'" label="待审批退货单" name="second">
        <div slot="label">待审批退货单
          <span class="tab-sign" v-if="returnCount!='0' &&  Number(returnCount)>100">100+</span>
          <span class="tab-sign" v-if="returnCount!='0' &&  Number(returnCount)<100" >{{returnCount}}</span>
        </div>
        <handle-list v-if="visible_second"  @return="returnCountMethod"></handle-list>
      </el-tab-pane>
      <el-tab-pane v-if="roleCode==='manage'||roleCode==='supervise_bj'" label="备案审批" name="third">
        <back-up-list  v-if="visible_third"></back-up-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import backUpList from 'src/pages/trade/tradecenter/backUp/List'
  import handleList from 'src/pages/trade/tradecenter/firstInstanceRole/return/handleListToCheck'
  import queryFirstPlanList from 'src/pages/trade/tradecenter/firstInstanceRole/purchase/planList'
  import {getRoleCode} from 'src/axios/trade/backup/hospitalList'


  export default {
    name: 'examinationApprovalTabs',
    components: {
      backUpList,
      handleList,
      queryFirstPlanList
    },
    data() {
      return {
        roleCode:'',
        activeName: 'first',
        visible_second: false,
        visible_third: false,
        returnCount:0,
        planCount:0
      };
    },
    created () {
      this.getRoleCode()
    },
    methods: {
      handleClick(tab, event) {
//        console.log(tab, event);
        if('second'===tab.name){
          this.visible_second=true;
        }
        if('third'===tab.name){
          this.visible_third=true;
        }
      },
      getRoleCode(){
        getRoleCode().then(res => {
          this.roleCode = res.data
        if(this.roleCode==='supervise_bj'){
          this.activeName='third';
          this.visible_third=true;
          }
        })
      },
      returnCountMethod(val){
        this.returnCount=val;
      },
      planListMethod(val){
        this.planCount=val;
      }
    }
  }
</script>

