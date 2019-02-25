<template>
  <el-dialog
    title="变更详情"
    :visible.sync="visible"
    width="1200px">
    <div class="tableset service-table">
      <el-table :data="resData.list" stripe>
        <el-table-column prop="projectName" label="项目"></el-table-column>
        <el-table-column prop="changePerson" label="变更发起人" width="90"></el-table-column>
        <el-table-column prop="changeTime" label="发起时间" width="130"></el-table-column>
        <el-table-column prop="applyArea" label="适用地区" width="70"></el-table-column>
        <el-table-column prop="originalPrice" label="原价" width="80"></el-table-column>
        <el-table-column prop="adjustPrice" label="调价价格" width="80"></el-table-column>
        <el-table-column prop="adjustRate" label="调价幅度" width="70"></el-table-column>
        <el-table-column prop="queryTimes" label="质疑次数" width="70"></el-table-column>
        <el-table-column prop="auditTimes" label="审核次数" width="70"></el-table-column>
        <el-table-column prop="executeTime" label="执行时间" width="100"></el-table-column>
        <el-table-column prop="adjustExplain" label="调价说明"></el-table-column>
        <el-table-column label="附件说明" width="80">
          <template slot-scope="scope">
            <a class="operation-btn" @click="showFile(scope.row.id)">查看附件</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "change-detail",
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
              projectName: '北京市昌平区项目',
              changePerson: 'admin',
              changeTime: '2018-05-16 17:22',
              applyArea: '昌平区',
              originalPrice: '213',
              adjustPrice: '115',
              adjustRate: '80',
              originalPrice: '',
              queryTimes: '5',
              auditTimes: '3',
              executeTime: '2018-05-16 17:23',
              adjustExplain: 'XXX',
            }, {
              projectName: '北京市朝阳区项目',
              changePerson: 'admin',
              changeTime: '2018-05-16 17:22',
              applyArea: '朝阳区',
              originalPrice: '213',
              adjustPrice: '115',
              adjustRate: '80',
              originalPrice: '',
              queryTimes: '5',
              auditTimes: '3',
              executeTime: '2018-05-16 17:23',
              adjustExplain: 'XXX',
            }, {
              projectName: '北京市大兴区项目',
              changePerson: 'admin',
              changeTime: '2018-05-16 17:22',
              applyArea: '大兴区',
              originalPrice: '213',
              adjustPrice: '115',
              adjustRate: '80',
              originalPrice: '',
              queryTimes: '5',
              auditTimes: '3',
              executeTime: '2018-05-16 17:23',
              adjustExplain: 'XXX',
            },
          ]
        }
      },
      fillData(id) {
        this.visible = true;
        this.resData = this.metaData();
      },

    }
  }
</script>

<style scoped>

</style>
