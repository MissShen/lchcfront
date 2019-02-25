<template>
  <el-dialog
    title="变更详情"
    :visible.sync="visible"
    width="900px">
    <div class="tableset service-table">
      <template>
        <el-table :data="resData.list" stripe border style="width: 100%">
          <el-table-column prop="projectName" label="项目"></el-table-column>
          <el-table-column prop="changePerson" label="变更发起人"></el-table-column>
          <el-table-column prop="changeTime" label="变更时间"></el-table-column>
          <el-table-column prop="changeContent" label="变更内容"></el-table-column>
          <el-table-column prop="queryTimes" label="质疑次数"></el-table-column>
          <el-table-column prop="auditTimes" label="审核次数"></el-table-column>
          <el-table-column prop="passTime" label="通过时间"></el-table-column>
        </el-table>
      </template>
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
              projectName:'北京市昌平区项目',
              changePerson:'admin',
              changeTime:'2018-05-16 17:22',
              changeContent:'XXX',
              queryTimes:'5',
              auditTimes:'3',
              passTime:'2018-05-16 17:23',
            },{
              projectName:'北京市石景山区项目',
              changePerson:'admin',
              changeTime:'2018-05-16 17:23',
              changeContent:'XXX',
              queryTimes:'5',
              auditTimes:'3',
              passTime:'2018-05-16 17:23',
            },{
              projectName:'北京市朝阳区项目',
              changePerson:'admin',
              changeTime:'2018-05-16 17:23',
              changeContent:'XXX',
              queryTimes:'5',
              auditTimes:'3',
              passTime:'2018-05-16 17:23',
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
