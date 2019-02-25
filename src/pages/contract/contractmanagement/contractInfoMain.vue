<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible" width="80%"
  >
    <el-tabs v-model="contractManagement" @tab-click="handleClick">
      <el-tab-pane label="北京市医疗机构药品阳光采购购销合同" name="beijing_mainContract">
        <main-contract-view ref="mainContractView" v-if="visible" :contract-id="contractId" :operate="operate" v-on:refreshbizlines_mainContract="subFun_mainContract($event)" @closeParent="closeThisWindowAndRefreshParent()"></main-contract-view>
      </el-tab-pane>
      <el-tab-pane label="北京市医疗机构药品廉洁购销合同" name="beijing_honestContract">
        <honest-contract-view ref="honestContractView" v-if="visible && (contractManagement === 'beijing_honestContract')" :contract-id="contractId" :operate="operate" v-on:refreshbizlines_honestContract="subFun_honestContract($event)" @closeParent="closeThisWindowAndRefreshParent()"></honest-contract-view>
      </el-tab-pane>
    </el-tabs>
    <!-- ========================== 主内容end ========================= -->
  </el-dialog>

</template>
<script>

  // 引入tab的页面组件
  import mainContractView from 'src/pages/contract/contractmanagement/mainContractInfo'
  import honestContractView from 'src/pages/contract/contractmanagement/honestContractInfo'

  export default {
    name: 'contractInfoMain',
    components: {
      mainContractView,
      honestContractView
    },
    data() {
      return {
        contractManagement: 'beijing_mainContract',
        visible : false,
        contractId : '',
        operate: '',
        mainContractViewVisible : true,
        honestContractViewVisible : true,
        myKey: ""
      };
    },
    methods: {
      //实现基本思路：
      // 当第一个组件删除数据的时候 会通过：this.$emit("refreshbizlines_selected","");调用该父组件的 subFun_selected方法
      //subFun_selected方法中又通过this.$refs.unselectedView .refreshList(); 调用第二个子组件的refreshList方法去刷新第二个组件中的数据
      //这就是不用vuex的坏处。

      //父组件控制第一个子组件的函数
      mainContractViewRefresh(){
        this.$refs.mainContractViewVisible.refreshList();
      },
      //父组件控制第二个子组件的函数
      honestContractRefresh(){
        this.$refs.honestContractView.refreshList();
      },
      closeThisWindowAndRefreshParent () {
        this.$emit('refreshParent');
        this.visible = false;
      },
      //第一个子组件控制父组件的函数
      subFun_honestContract(data){
        //可选配送企业
        this.honestContractRefresh();
      },
      //第二个子组件控制父组件的函数
      subFun_mainContract(data){
        //刷新已选配送企业列表
        this.mainContractViewRefresh();
      },
      fillData(contractId, operate) {
        console.log("fillData: ", contractId);
        console.log("fillData_operate: ", operate);
        this.visible = true;
        this.contractId = contractId;
        this.operate = operate;
        this.mainContractViewVisible = true;
        this.honestContractViewVisible = true;
        this.myKey = new Date().toString();
      },
      handleClick(tab, event) {
        console.log(tab, event);
        this.myKey = new Date();
      }
    }
  }
</script>
