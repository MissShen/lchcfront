<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
        <el-form-item>
          <el-input v-model="query.catDrug.nameChn" placeholder="药品名称" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.catOrg.name" placeholder="企业名称" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.catDoseageForm.nameChn" placeholder="剂型" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.catDrug.spec" placeholder="规格" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="resetForm" size="small">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @sort-change="sortChange"
          border
          stripe>
          <el-table-column label="药品名称" show-overflow-tooltip width="200px" sortable="custom" prop="NAME_CHN">
            <template slot-scope="scope">
              <span>{{ scope.row.catDrug == null ? "" : scope.row.catDrug.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" show-overflow-tooltip sortable="custom" prop="TRADE_NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.catProduct == null ? "" : scope.row.catProduct.tradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" show-overflow-tooltip sortable="custom" prop="DOS_NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.catDoseageForm == null ? "" : scope.row.catDoseageForm.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" show-overflow-tooltip sortable="custom" prop="SPEC">
            <template slot-scope="scope">
              <span>{{ scope.row.catDrug == null ? "" : scope.row.catDrug.spec }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比" width="80" sortable="custom" prop="STAND_RATE">
            <template slot-scope="scope">
              <span>{{ scope.row.catDrug == null ? "" : scope.row.catDrug.standRate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" show-overflow-tooltip sortable="custom" prop="WRAP_NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.catWrap == null ? "" : scope.row.catWrap.nameChn}}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" show-overflow-tooltip width="200px" sortable="custom" prop="ORG_NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.catOrg == null ? "" : scope.row.catOrg.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格数量" header-align="left" align="right" sortable="custom" prop="NUM_PRICE">
            <template slot-scope="scope">
              <span>{{ scope.row.productPrice == null ? "" : scope.row.productPrice.numPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最低价格" header-align="left" align="right" sortable="custom" prop="MIN_PRICE">
            <template slot-scope="scope">
              <span>{{ scope.row.productPrice == null ? "" : priceFormat(scope.row.productPrice.minPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" size="small"
                                       @click="goInfo(scope.row.catProduct.id)">查看</a></div>
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
  </div>
</template>
<script>

  import {list} from 'src/axios/datacenter/authdata/nationalprice/nationPrice'
  import {keyBoardEnter, priceFormat} from "src/utils";

  export default {
    data () {
      return {
        resData: this.metaData(),
        query: this.metaQuery(),
      }
    },

    created () {
      if (!!this.$store.state.pageSeach.pageNum) {
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.list();
    },

    methods: {

      priceFormat,

      sortChange(value){
        let sortType = " desc";
        if (value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list()
        }
      },

      list () {
        this.$store.state.pageSeach = this.query;
        list(this.query, this.resData).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1
          }
        })
      },

      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },

      //重置
      resetForm() {
        this.query = this.metaQuery();
        this.resData = this.metaData();
        this.list();
      },

      goInfo(id) {
        this.$router.push("/DATA/basedata/authdata/nationalPriceBank/projectPanel/" + id);
      },

      metaData () {
        return {
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

      metaQuery () { // 表单查询数据初始化
        return {
          catDrug: {nameChn: "", spec: ""},
          catOrg: {name: ""},
          catDoseageForm: {nameChn: ""},
          orderBy: null
        }
      },

      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.$store.state.pageSeach.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.$store.state.pageSeach.pageNum = val;
        this.list()
      }
    }
  }
</script>

