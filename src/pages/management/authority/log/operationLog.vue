<template>
  <div>
    <div class="tableset">
      <el-table
        :data="resData.list"
        :default-sort="{prop: 'date', order: 'descending'}"
        border
        stripe>
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column label="系统编码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.systemCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户编码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.operatorCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.operatorName  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户CA" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.operatorCaKey }}</span>
          </template>
        </el-table-column>
        <el-table-column label="方法类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.operationType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="IP" show-overflow-tooltip >
          <template slot-scope="scope">
            <span>{{ scope.row.operatorClientIp }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览器" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.operatorClientBrowserInfo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.operationRemark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.operationDate }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格分页 -->
    <div class="pagebox">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30]"
        :total="resData.total"
        :page-size="resData.pageSize"
        :page-count="resData.pages"
        :current-page.sync="resData.pageNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {operationLogList} from "src/axios/management/authority/headMenu";
  import {mapGetters} from 'vuex'
  export default {
    name: "operationLog",
    computed: {
      ...mapGetters([
        'loginCode',
      ]),
    },
    data() {
      return {
        resData: this.metaData(),
      }
    },
    mounted() {
      this.metaList();
    },
    methods: {
      metaData() {
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: [{
            id:'',
            operatorCode:'',
            operatorName:'',
            operatorCaKey:'',
            operationType:'',
            operationDate:'',
            operatorClientIp:'',
            operatorClientBrowserInfo:'',
            systemCode:'',
            operationRemark:'',
          }]
        }
      },
      metaList() {
        // todo  去除条件
        if('超级管理员'==this.loginCode){
          operationLogList(this.resData.pageNum, this.resData.pageSize).then(res => {
            if (res.code == 200) {
              this.resData = res.data;
              0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
            }
          })
        }
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.metaList()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.metaList()
      },
    }
  }
</script>

<style scoped>

</style>
