<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="劣质药记录" name="1">
        <bulletin v-if="activeName === '1'" ref="bulletin"></bulletin>
      </el-tab-pane>
      <el-tab-pane label="假药记录" name="2">
        <fake-drug v-if="activeName === '2'" ref="fakeDrug"></fake-drug>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import bulletin from 'src/pages/datacenter/authdata/qualityBulletin/bulletin/mainTable'
  import fakeDrug from 'src/pages/datacenter/authdata/qualityBulletin/fakeDrug/mainTable'

  export default {
    name: 'demoTabs',
    components: {
      bulletin,
      fakeDrug
    },

    data() {
      return {
        activeName: "1"
      };
    },

    created(){
      this.activeName = this.$store.state.activeName
    },

    methods: {
      handleClick(tab, event) {
        this.$store.state.pageSeach = {};
        this.$store.state.activeName = tab.name;
        if (tab.name === "1") {
          this.$refs.bulletin.list();
        } else {
          this.$refs.fakeDrug.list();
        }
      },

      getNavType(){
        this.activeName = this.$store.state.activeName;
      }
    },

    watch: {
      '$store.state.activeName': 'getNavType'
    }
  }
</script>

