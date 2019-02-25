<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane  label="处方集分类" name="1">
        <classify v-if="activeName=='1'"></classify>
      </el-tab-pane>
      <el-tab-pane label="处方集列表" name="2">
        <prescript-sets v-if="activeName=='2'"></prescript-sets>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import classify from 'src/pages/datacenter/knowledgebase/prescriptSets/classify/mainTable'
  import prescriptSets from 'src/pages/datacenter/knowledgebase/prescriptSets/mainTable'

  export default {
    name: 'demoTabs',
    components: {
      classify,
      prescriptSets
    },
    data() {
      return {
        activeName: '1'
      };
    },
    created(){
      this.activeName = this.$store.state.activeName;
    },
    methods: {
      handleClick(tab, event) {
        this.$store.state.pageSeach = {};
        this.$store.state.activeName = tab.name;
      },
      getNavType(){
        this.activeName = this.$store.state.activeName
      },
    },
    watch:{
      //监测store.state
      '$store.state.activeName' : 'getNavType'
    }
  }
</script>

