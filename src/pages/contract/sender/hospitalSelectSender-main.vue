<template>
  <el-dialog
    title="查看产品"
    :visible.sync="visible" width="80%"
    :key = myKey>
    <div class="tab-box">
      <!-- ========================== 主内容start ========================= -->
      <span class="tab-bar"></span>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所有产品" name="selected">
          <hospital-select-sender-all-product :sender-id="senderId"></hospital-select-sender-all-product>
        </el-tab-pane>
        <el-tab-pane label="本院相关产品" name="unSelected">
          <hospital-select-sender-relevant-product :sender-id="senderId"></hospital-select-sender-relevant-product>
        </el-tab-pane>
      </el-tabs>
      <!-- ========================== 主内容end ========================= -->
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </div>
  </el-dialog>

</template>
<script>

  // 引入tab的页面组件
  import hospitalSelectSenderAllProduct from 'src/pages/contract/sender/hospitalSelectSender-allProduct'
  import hospitalSelectSenderRelevantProduct from 'src/pages/contract/sender/hospitalSelectSender-relevantProduct'


  export default {
    name: 'manufactureSelectSender',
    components: {
      hospitalSelectSenderAllProduct,
      hospitalSelectSenderRelevantProduct
    },
    data() {
      return {
        activeName: 'selected',
        visible : false,
        senderId : undefined,
        myKey:"",
      };
    },
    methods: {
      fillData(senderId) {
        this.visible = true;
        this.senderId = senderId;
        this.myKey = new Date().toString();
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
