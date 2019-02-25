<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible" width="80%"
    title="产品明细"
  >
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input v-model="query.productName" max="200" size="small" placeholder="品名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.manufactureName" max="200" size="small" placeholder="生产企业"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="list()">查询</el-button>
              <el-button type="warning" size="small" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <el-table-column label="通用名" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.medicalName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.tradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" width="85" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.doseageFormName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" width="80" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.spec }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比" width="70" align="right" header-align="left" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.standRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="60" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.specUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" width="60" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.wrapName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.manufactureName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格" width="60" align="right" header-align="left" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.conPrice) }}</span>
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
    <!-- ========================== 主内容end ========================= -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeThisWindow()" size="small">关闭</el-button>
    </div>
  </el-dialog>

</template>
<script>


  import {queryProductDetail} from 'src/axios/contract/contractmanagement/contractManagement';
  import {priceFormat} from "src/utils"

  export default {
    name: 'productDetail',
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery(),
        visible : false,
        id : undefined,
        operate: undefined,
        mainContractViewVisible : true,
        honestContractViewVisible : true,
        myKey:""
      };
    },

    methods: {
      priceFormat,
      metaData () {
        return {
          pageNum: 1,
          pageSize: 10,
          size: undefined,
          startRow: undefined,
          endRow: undefined,
          total: undefined,
          pages: undefined,
          prePage: undefined,
          nextPage: undefined,
          isFirstPage: true,
          isLastPage: undefined,
          hasPreviousPage: undefined,
          hasNextPage: undefined,
          navigatePages: undefined,
          navigatepageNums: undefined,
          navigateFirstPage: undefined,
          navigateLastPage: undefined,
          firstPage: undefined,
          lastPage: undefined,
          list: [],
        }
      },
      metaQuery(){
        return {
          query: {
            productName: undefined,
            manufactureName: undefined
          }
        }
      },
      fillData(id) {
        this.resData = this.metaData();
        this.query = this.metaQuery();
        this.visible = true;
        this.id = id;
        this.myKey = new Date().toString();
        this.list();
      },
      list(){
        queryProductDetail(this.id,this.resData,this.query).then(res=>{
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1;
          }
        })
      },
      resetForm(){
        this.query = this.metaQuery();
        this.list();
      },
      closeThisWindow(){
        this.visible = false;
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>
