<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部投诉" name="third">
        <all-of-complaint-list v-if="visible_third">
         </all-of-complaint-list>
      </el-tab-pane>
      <el-tab-pane label="待处理" name="first">
        <div slot="label">待处理<span class="tab-sign">{{waCount}}</span></div>
        <wait-handle-list  @wait="waitCount"></wait-handle-list>
      </el-tab-pane>
      <el-tab-pane label="企业扣分汇总" name="second">
        <company-complaint-list v-if="visible_second"></company-complaint-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import allOfComplaintList from 'src/pages/trade/tradecenter/evaluate/complaint/allOfComplaintList'
  import companyComplaintList from 'src/pages/trade/tradecenter/evaluate/complaint/companyComplaintList'
  import waitHandleList from 'src/pages/trade/tradecenter/evaluate/complaint/waitHandleList'

  export default {
    name: 'complaintManageTabs',
    components: {
      allOfComplaintList,
      companyComplaintList,
      waitHandleList
    },
    data() {
      return {
        activeName: 'first',
        visible_second: false,
        visible_third: false,
        waCount:0,
      }

        ;
    },
    methods: {
      handleClick(tab, event) {

        if('second'===tab.name){
          this.visible_second=true;
        }
        if('third'===tab.name){
          this.visible_third=true;
        }
      },
      waitCount(val){
        this.waCount=val;
      },
    }
  }
</script>

