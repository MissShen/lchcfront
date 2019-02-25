<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="新编药学分类(第十七版)" name="1">
        <atc-classify v-if="activeName=='1'"></atc-classify>
      </el-tab-pane>
      <el-tab-pane label="新编药学列表" name="2">
        <atc-list v-if="activeName=='2'"></atc-list>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import atcClassify from 'src/pages/datacenter/drugsdata/newdrug/newDrugClassify'
  import atcList from 'src/pages/datacenter/drugsdata/newdrug/newDrugList'

  export default {
    name: 'demoTabs',
    components: {
      atcClassify,
      atcList
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

