<template>
  <el-dialog
    :title="'已关联产品'"
    :close-on-click-modal="false"
    width="75%"
    @close="closeWindow()"
    :visible.sync="visible">

    <div class="tableset">
      <el-table ref="multipleTable"
        :row-key="getRowKeys"
        :data="resData.list"
        @selection-change="handleSelectionChange"
        @sort-change="sortChangeFunc"
        border
        stripe>
        <el-table-column type="selection" width="50" :reserve-selection="true" align="center"></el-table-column>
        <el-table-column label="产品名称" prop="general_name" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catDrug.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" prop="doseage_name" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catDoseageForm==null?'':scope.row.catDoseageForm.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" prop="SPEC" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catDrug.spec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位转换比" prop="STAND_RATE" sortable="custom" width="90">
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
      <el-button size="small" type="primary" @click="cancelProducts">取消关联</el-button>
      <el-button size="small" @click="closeWindow()">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {assoProduct} from 'src/axios/datacenter/basedata/manual/manual'
  import {delRP} from 'src/axios/datacenter/basedata/manual/manual'

  export default {
    components: {ElCol},
    name: "hasAssoProducts",
    data() {
      return {
        visible: false,
        chooseList: [],
        manualId: undefined,
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
          this.metaFrom(this.manualId);
        }
      },
      fillData(id) {
        this.visible = true;
        this.manualId = id;
        this.resData = this.metaData();
        this.metaFrom(id);
      },
      metaFrom(id){
        assoProduct(id, this.resData,this.orderBy).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1
          }
        })
      },
      getRowKeys(row){
        return row.catProduct.id;
      },
      handleSelectionChange(val){
        this.chooseList = val
      },
      //  关闭窗口
      closeWindow(){
        this.$refs.multipleTable.clearSelection();
        this.visible = false;
      },
      cancelProducts() {
        if (this.chooseList.length > 0) {
          this.$confirm('确认取消关联' + this.chooseList.length + '个产品', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '重选',
            type: 'warning'
          }).then(() => {
              var deleteList = [];
              for (var i = 0; i < this.chooseList.length; i++) {
                deleteList.push(this.chooseList[i].catProduct.id)
              }
              delRP(this.manualId, deleteList.toString()).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    if (res.code == 200) {
                      //同步取消关联数量到主页面
                      this.$emit('cancelProducts', {value: deleteList.length})
                    }
                    this.closeWindow();
                  }
                })
              });
            }
          )
        } else {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        }
      },
      metaData()
      {
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
          lastPage: 0
        }
      }
      ,
      // ************************ 分页操作 ************************
      handleSizeChange(val)
      {
        this.resData.pageSize = val;
        this.metaFrom(this.manualId)
      }
      ,
      handleCurrentChange(val)
      {
        this.resData.pageNum = val;
        this.metaFrom(this.manualId)
      }
    }
  }
</script>
