<template>
  <div class="tab-box">
    <!-- ========================== 主内容start ========================= -->
    <span class="tab-bar"></span>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="可选企业评分项" name="first">
        <manufacture-item-selection></manufacture-item-selection>
      </el-tab-pane>
      <el-tab-pane label="已选企业评分项" name="second">
        <manufacture-item-selected></manufacture-item-selected>
      </el-tab-pane>
    </el-tabs>

    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入tab的页面组件
  import manufactureItemSelection from 'src/pages/select/controlcenter/score/ManufactureItemSelection'
  import manufactureItemSelected from 'src/pages/select/controlcenter/score/ManufactureItemSelected'

  export default {
    name: 'demoTabs',
    components: {
      manufactureItemSelection,
      manufactureItemSelected
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

