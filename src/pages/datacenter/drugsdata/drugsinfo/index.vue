<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="药品信息" name="1">
        <drugs-info v-if="activeName=='1'"></drugs-info>
      </el-tab-pane>
      <el-tab-pane label="药品回收站" name="2">
        <recovery v-if="activeName=='2'"></recovery>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import drugsInfo from 'src/pages/datacenter/drugsdata/drugsinfo/info/mainTable'
  import recovery from 'src/pages/datacenter/drugsdata/drugsinfo/recovery/mainTable'

  export default {
    name: 'demoTabs',
    components: {
      drugsInfo,
      recovery
    },
    data() {
      return {
        activeName: '1',
        // show_first: true,
        // show_flag: false
      };
    },
    created(){
      this.activeName = this.$store.state.activeName
    },
    methods: {
      handleClick(tab, event) {
        this.$store.state.pageSeach = {};
        this.$store.state.activeName=tab.name;
      },
      getNavType(){
        this.activeName=this.$store.state.activeName;
        //store.state.activeName里值变化的时候，设置activeName
      }
    },
    watch: {
      // 监测store.state
      '$store.state.activeName': 'getNavType'
    }
  }
</script>

