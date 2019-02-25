<template>
  <div class="padding10">
    <!--原企业产品列表-->
    <!--查询-->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class=" table-form">
          <el-form-item>
            <el-input v-model="query.name" placeholder="产品名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.dosage" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.specification" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.manufacture" placeholder="生产企业" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="restQuery" size="small">重置</el-button>
          </el-form-item>
      </el-form>

    <div class="table-caption">
      <el-button type="primary" @click="handlConfirm" :disabled="arrCheckeds.length==0">确定转移</el-button>
    </div>
    <div class="tableset">
      <el-table :data="resData.list" ref="multipleTable" @selection-change="handleSelectionChange" border stripe :row-key="getRowkeys"
      >
        <el-table-column align="center" type="selection" width="50" :reserve-selection="true"></el-table-column>
        <el-table-column label="产品名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.goodsName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.dosage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.specification }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转换比" width="60" header-align="center" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.conversion }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.packingMaterials }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材" width="60" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.units }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.manufacture }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="产品名称">-->
          <!--<template slot-scope="scope">-->
            <!--<div>-->
              <!--<div class="text-inline">{{ scope.row.productName }}</div>-->
            <!--</div>-->
            <!--<div class="text-inline">{{ scope.row.mixDosage }}</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="产品信息">-->
          <!--<template slot-scope="scope">-->
            <!--<div class="pro-details">-->
              <!--<div class="text-inline">{{ scope.row.combined }}&nbsp;&nbsp;{{scope.row.wrap}}</div>-->
            <!--</div>-->
            <!--<div class="text-inline">{{ scope.row.abbr }}</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
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
  import {productList} from 'src/axios/auditchanges/common/catProduct';
  import {confirm} from 'src/axios/auditchanges/messageChanges/productTransferInfo';
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {},
    props: {
      orgId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery(),
        multipleSelection: [],
        arrCheckeds: [],
        transferId: '',
      }
    },
    created() {
      var id = this.$route.params.id;
      this.transferId = id;

      var orgId = this.$route.params.orgId;
      this.query.orgId = orgId;

      var type = this.$route.params.type;
      this.query.type = type;

      this.list();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
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
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            orgId: undefined,
            name: undefined,
            dosage: undefined,
            specification: undefined,
            manufacture: undefined,
            type: undefined,
            transferId:undefined
          }
        }
      },
      //查询
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      getRowkeys(row){
        return row.id;
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      list() {
        if (this.query.type != 'DATA00000000000000326290') {
          this.query.transferId = this.transferId
          productList(this.resData, this.query).then(res => {
            this.resData = res.data;
            if (this.resData.pageNum == 0) {
              this.resData.pageNum = 1;
            }
          })
        }
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      handleQuery() {
        this.list()
      },
      restQuery() {
        this.query = this.metaQuery()
        this.query.type = this.$route.params.type;
        this.transferId = this.$route.params.id;
        this.query.orgId = this.$route.params.orgId;
        this.list();
      },
      handlConfirm() {
        this.$confirm('此操作将转移选中的产品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          confirm(this.transferId, this.arrCheckeds).then(res => {
            this.$message({
              type: 'success',
              message: res.data
            });
            this.list();
          })
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        let arr = [];
        for (let i in this.multipleSelection) {
          arr.push({id: this.multipleSelection[i].id, value: this.multipleSelection[i].productName});
        }
        this.arrCheckeds = arr;
      },
      fillData(id) {
        this.query.type = this.$route.params.type;
        this.transferId = this.$route.params.id;
        this.query.orgId = this.$route.params.orgId;
        this.list();
      }
    },
  }
</script>

