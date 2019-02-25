<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="非两票制药品列表" name="first">
        <show-ftt-buyer :parent-id="assistId"></show-ftt-buyer>
      </el-tab-pane>
      <el-tab-pane label="非两票制历史删除列表" name="second">
        <div slot="label">非两票制历史删除列表<span class="tab-sign" v-if="tuCount!='0'">{{tuCount}}</span></div>
        <view-ftt-detele-list @return="returnCount" :parent-id="assistId"></view-ftt-detele-list>
      </el-tab-pane>

    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import showFttBuyer from 'src/pages/trade/tradecenter/assist/showFttBuyer'
  import viewFttDeteleList from 'src/pages/trade/tradecenter/assist/viewFttDeleteList'

  export default {
    name: 'assistAddTabs',
    components: {
      showFttBuyer,
      viewFttDeteleList
    },
    data() {
      return {
        activeName: 'first',
        visible_second: false,
        tuCount:0,
        assistId:''
      }
    },
    created () {
      this.assistId = this.$route.params.assistId || undefined;
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

