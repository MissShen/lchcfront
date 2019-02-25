<template>
  <el-dialog
    title="质疑审核明细"
    :visible.sync="visible"
    width="900px">
    <div class="tableset service-table">
      <template>
        <el-table :data="resData.list" stripe>
          <el-table-column prop="operator" label="操作人"></el-table-column>
          <el-table-column prop="operateTime" label="操作时间"></el-table-column>
          <el-table-column prop="operateType" label="操作类型"></el-table-column>
          <el-table-column prop="operateContent" label="操作内容"></el-table-column>
          <el-table-column prop="operateResult" label="操作结果"></el-table-column>
          <el-table-column label="附件说明" width="200">
            <template slot-scope="scope">
              <a class="operation-btn" @click="showFile(scope.row.id)">查看附件</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "audit-detail",
    data() {
      return {
        visible: false,
        resData: this.metaData(),
      }
    },
    methods: {
      metaData() {
        return {
          pageNum: 1,
          pageSize: 5,
          total: 0,
          pages: 0,
          list: [
            {
              operator:'admin',
              operateTime:'2018-05-16 17:19',
              operateType:'质疑',
              operateContent:'XXXXX',
              operateResult:'xx',
            },{
              operator:'admin',
              operateTime:'2018-05-16 17:20',
              operateType:'澄清',
              operateContent:'XXXXX',
              operateResult:'xx',
            },{
              operator:'admin',
              operateTime:'2018-05-16 17:19',
              operateType:'审核',
              operateContent:'XXXXX',
              operateResult:'xx',
            },
          ]
        }
      },
      fillData(id) {
        this.visible = true;
        this.resData = this.metaData();
      },
      //查看附件方法
      showFile() {

      }
    }
  }
</script>

<style scoped>

</style>
