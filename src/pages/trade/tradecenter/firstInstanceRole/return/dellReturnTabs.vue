<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部退货单" name="first">
        <handle-list></handle-list>
      </el-tab-pane>
      <el-tab-pane label="待审批退货单" name="second">
        <div slot="label">待审批退货单<span class="tab-sign" v-if="tuCount!='0'">{{tuCount}}</span></div>
        <code-list @return="returnCount"></code-list>
      </el-tab-pane>

    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import handleList from 'src/pages/trade/tradecenter/firstInstanceRole/return/handleList'
  import codeList from 'src/pages/trade/tradecenter/firstInstanceRole/return/codeList'

  export default {
    name: 'dellReturnTabs',
    components: {
      handleList,
      codeList
    },
    data() {
      return {
        activeName: 'first',
        visible_second: false,
        tuCount:0
      }

        ;
    },
    methods: {
      handleClick(tab, event) {
        if('second'===tab.name){
          this.visible_second=true;
        }
      },
      returnCount(val){
        this.tuCount=val;
      },
    }
  }
</script>

