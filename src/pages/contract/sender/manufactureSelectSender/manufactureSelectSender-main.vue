<template>
  <el-dialog
    title="查看配送企业"
    :close-on-click-modal="false"
    :visible.sync="visible" width="80%">
    <div class="tab-box">
      <!-- ========================== 主内容start ========================= -->
      <span class="tab-bar"></span>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已选配送企业" name="selected">
          <selected-view v-if="selectedVisible" :product-id="this.productId"></selected-view>
        </el-tab-pane>
        <el-tab-pane label="可选配送企业" name="unSelected">
          <unselected-view v-if="unselectedVisible" :product-id="this.productId"></unselected-view>
        </el-tab-pane>
      </el-tabs>
      <!-- ========================== 主内容end ========================= -->
    </div>
  </el-dialog>

</template>
<script>

  // 引入tab的页面组件
  import selectedView from 'src/pages/contract/sender/manufactureSelectSender/manufactureSelectSender-selected'
  import unselectedView from 'src/pages/contract/sender/manufactureSelectSender/manufactureSelectSender-unselected'


  export default {
    name: 'manufactureSelectSender',
    components: {
      selectedView,
      unselectedView
    },
    data() {
      return {
        activeName: 'selected',
        visible : false,
        productId : undefined,
        selectedVisible : true,
        unselectedVisible : false
      };
    },
    methods: {
      fillData(productId) {
        this.visible = true;
        this.productId = productId;
        this.selectedVisible = true;
        this.unselectedVisible = false;
      },
      handleClick(tab, event) {
        console.log(tab, event);
        if('selected' === tab.name){
          this.selectedVisible = true;
        }
        if('unSelected' === tab.name){
          this.unselectedVisible = true;
        }
      }
    }
  }
</script>
