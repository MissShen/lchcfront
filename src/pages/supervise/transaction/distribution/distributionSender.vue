<template>
  <el-dialog title="查看配送" :visible.sync="dialogTableVisible" width="50%">
    <div class="s-form">
      <el-form ref="queryData" :model="queryData">
        <el-input v-model="queryData.searchSenderName" placeholder="配送企业"></el-input>
        <el-button type="success" size="small" @click="handleQuery">查询</el-button>
        <el-button type="warning" size="small" @click="queryData = metaQuery()"> 重置</el-button>
      </el-form>
    </div>
    <div class="tableset">
      <el-table :data="resData.list" stripe border tooltip-effect="dark">
        <el-table-column property="sendName" label="企业名称" show-overflow-tooltip></el-table-column>
        <el-table-column property="senderStockState" width="80" label="库存状态"></el-table-column>
        <el-table-column property="modifyName" width="200" label="维护时间"></el-table-column>
      </el-table>
    </div>
    <page-bar :data="resData" @refreshPage="refreshPage"></page-bar>
    <span slot="footer">
      <el-button @click="dialogTableVisible = false" size="small">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {querySenderListByProduceId} from "src/axios/supervise/supervise-transaction/supervision";
  import {PageData} from "src/components/mixins/index";

  export default {
    name: "distributionSender",
    mixins: [PageData],
    data() {
      return {
        queryData: this.metaQuery(), // 查询初始化
        dialogTableVisible: false,
        productId:'',
      }
    },
    methods: {
      fillData(productId) {
        this.productId=productId;
        this.metaList();
      },
      metaList() {
        if (this.productId) {
          this.dialogTableVisible = true;
          querySenderListByProduceId(this.productId,this.resData.pageNum,this.resData.pageSize, this.queryData).then(res => {
            if (res.code == 200) {
              this.resData = res.data;
              0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
            }
          })
        }
      },
      metaData() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 5,
          pages: 1,
          list: []
        }
      },
      metaQuery() {
        return {
          searchSenderName: '',
        }
      },
    }
  }
</script>

<style scoped>

</style>
