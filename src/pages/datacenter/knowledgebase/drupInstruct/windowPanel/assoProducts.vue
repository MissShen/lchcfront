<template>
  <el-dialog
    :title="'查看关联产品'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">

    <div class="tableset">
      <el-table
        :data="resData.list"
        @sort-change="sortChangeFunc"
        border
        stripe>
        <el-table-column label="产品名称" prop="general_name" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catDrug.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" prop="doseage_name" sortable="custom" width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catDoseageForm==null?'':scope.row.catDoseageForm.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" prop="SPEC" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catDrug.spec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位转换比" prop="STAND_RATE" sortable="custom" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.catDrug.standRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材" prop="wrap_name" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catWrap==null?'':scope.row.catWrap.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catOrg.name }}</span>
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
    <span slot="footer">
      <el-button size="small" @click="close()">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {assoProduct} from 'src/axios/datacenter/basedata/manual/manual'

  export default {
    components: {ElCol},
    name: "assoProducts",
    data() {
      return {
        id:undefined,
        visible: false,
        resData: this.metaData(),
        orderBy:undefined
      }
    },
    methods: {
      //  排序查询
      sortChangeFunc(value){
        let sortType=" desc"
        if(value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.orderBy = value.prop + sortType;
          this.metaFrom();
        }
      },
      //  关闭
      close(){
        this.visible= false;
      },
      fillData(id) {
        this.id=id;
        this.visible = true;
        this.resData = this.metaData();
        this.metaFrom();
      },
      metaFrom(){
        assoProduct(this.id, this.resData,this.orderBy).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        })
      },
      metaData () {
        return {// 前后台交互数据封装格式
          pageNum: 1,
          pageSize: 10,
          size: 10,
          startRow: 0,
          endRow: 0,
          total: 0,
          pages: 0,
          prePage: 0,
          nextPage: 0,
          isFirstPage: false,
          isLastPage: true,
          hasPreviousPage: false,
          hasNextPage: false,
          navigatePages: 8,
          navigatepageNums: [],
          navigateFirstPage: 0,
          navigateLastPage: 0,
          firstPage: 0,
          lastPage: 0,
          list: []
        }
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.metaFrom()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.metaFrom()
      }
    }
  }
</script>

