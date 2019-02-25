<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已审批备案" name="first">
        <back-up-list></back-up-list>
      </el-tab-pane>
      <el-tab-pane label="待审批备案" name="second">
        <div slot="label">待审批备案<span class="tab-sign" v-if="waCount!=0">{{waCount}}</span></div>
        <list @wait="waitCount" v-if="visible_second"></list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import backUpList from 'src/pages/trade/tradecenter/backUp/backUpList'
  import list from 'src/pages/trade/tradecenter/backUp/list'

  export default {
    name: 'backUpListTabs',
    components: {
      backUpList,
      list
    },
    data() {
      return {
        activeName: 'first',
        visible_second: false,
        waCount:0,
      };
    },
    methods: {

      handleClick(tab, event) {
        if('second'===tab.name){
          this.visible_second=true;
        }
      },
      waitCount(val){
        this.waCount=val;
      },
    }
  }
</script>

