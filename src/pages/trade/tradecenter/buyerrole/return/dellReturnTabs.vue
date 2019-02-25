<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部退货单" name="first">
        <handle-list></handle-list>
      </el-tab-pane>
      <el-tab-pane label="待处理退货单" name="second">
        <div slot="label">待处理退货单<span class="tab-sign">2</span></div>
        <wait-list  v-if="visible_second"></wait-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import handleList from 'src/pages/trade/tradecenter/buyerrole/return/handleList'
  import waitList from 'src/pages/trade/tradecenter/buyerrole/return/waitList'

  export default {
    name: 'dellReturnTabs',
    components: {
      handleList,
      waitList
    },
    data() {
      return {
        activeName: 'first',
        visible_second: false
      }

        ;
    },
    methods: {
      handleClick(tab, event) {
//        console.log(tab, event);

        if('second'===tab.name){
          this.visible_second=true;
        }
      }
    }
  }
</script>

