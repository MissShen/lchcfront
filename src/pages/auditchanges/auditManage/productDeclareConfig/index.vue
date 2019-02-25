<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待挂网产品" name="1">
        <queuing-declare-table ref="queuingDeclareTable" v-if="activeName==='1'"></queuing-declare-table>
      </el-tab-pane>
      <el-tab-pane label="暂不挂网产品" name="2">
        <not-declare-table ref="notDeclareTable" v-if="activeName==='2'"></not-declare-table>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import queuingDeclareTable from 'src/pages/auditchanges/auditManage/productDeclareConfig/queuingDeclareTable'
  import notDeclareTable from 'src/pages/auditchanges/auditManage/productDeclareConfig/notDeclareTable'

  export default {
    name: 'tabs',
    components: {
      queuingDeclareTable,
      notDeclareTable
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
          this.$refs.queuingDeclareTable.list();
        } else {
          this.$refs.notDeclareTable.list();
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

