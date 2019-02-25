<template>
  <!--转产列表-->
  <div class="padding10">
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
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

    <div class="tableset">
      <el-table :data="resData.list" border stripe>
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
        <el-table-column label="剂型" width="80" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.dosage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.specification }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转换比" width="60" header-align="left" align="right">
          <template slot-scope="scope">
            <span>{{ scope.row.conversion }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.units }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材" width="60" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.packingMaterials }}</span>
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
        <template v-if="this.way ==='detail'">
          <el-table-column label="是否同意" width="80">
            <template slot-scope="scope">
              <span>{{scope.row.processingState=='0'?'不同意':scope.row.processingState=='1'?'同意':'未确认'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="理由" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.processingReason}}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核结果" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.auditResult==1" style="color: green">审核通过</span>
              <span v-if="scope.row.auditResult==2" style="color: #004b80">待确认</span>
              <span v-if="scope.row.auditResult==3" style="color: red">审核未通过</span>
              <span v-if="scope.row.auditResult==''||scope.row.auditResult==null||scope.row.auditResult==undefined" style="color: orange">未审核</span>
            </template>
          </el-table-column>
          <el-table-column label="理由" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.auditRemark}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="operates">
                <span><a class="operation-btn" @click="openPreviewVisible(scope.row.id)">产品资质</a></span>
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-if="way ==='edit' || way ==='add'">
          <el-table-column label="资质文件数量" width="120" header-align="left" align="right">
            <template slot-scope="scope">
              <span>{{scope.row.imageCount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="operates">
                <span><a class="operation-btn" @click="openVisible(scope.row.id)">上传资质</a></span>
                <span><a class="operation-btn" @click="openPreviewVisible(scope.row.id)">产品资质</a></span>
                <!--<div>-->
                  <span><a class="operation-btn" v-if="type != 'DATA00000000000000326290'" @click="handleDelete(scope.row.id)">删除</a></span>
                <!--</div>-->
              </div>
            </template>
          </el-table-column>
        </template>
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
    <update-file  ref="updateFile" @refresh="list()"></update-file>
    <file-preview ref="filePreview" @refresh="list()"></file-preview>
  </div>
</template>

<script>
  import {findUpProductTransferInfos, del} from 'src/axios/auditchanges/messageChanges/productTransferInfo'
  import {keyBoardEnter} from "src/utils";
  import updateFile from '../productMessageTransferDialog/UpdateFile'
  import filePreview from '../productMessageTransferDialog/filePreview'

  export default {
    components: {
      filePreview,
      updateFile
    },
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery(),
        way: undefined,
        type: '',
        updateDialog: false,
      }
    },
    created() {
      var id = this.$route.params.id;
      this.query.id = id;
      var way = this.$route.params.way;
      this.way = way;
      this.type = this.$route.params.type;
      this.list()
    },
    methods: {
      openVisible(id) {
        this.updateDialog = true;
        this.$nextTick(() => {
          this.$refs.updateFile.openVisible(id, this.type)
        })
      },
      openPreviewVisible(id) {
        this.updateDialog = true;
        this.$nextTick(() => {
          this.$refs.filePreview.openVisible(id, this.type)
        })
      },
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
            id: undefined,
            name: undefined,
            dosage: undefined,
            specification: undefined,
            manufacture: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        findUpProductTransferInfos(this.resData, this.query).then(res => {
          this.resData = res.data
          console.log(res)
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      handleDelete(id) {
        this.$confirm('此操作将删除此条本次转移产品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del(id).then(res => {
            this.$message({
              type: 'success',
              message: res.data
            })
            this.list()
          })
        })
      },
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      handleQuery() {
        this.list()
      },
      restQuery() {
        this.query = this.metaQuery();
        this.query.id = this.$route.params.id;
        this.list();
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      fillData(id) {
        this.query.id = id;
        this.list();
      }
    }
  }
</script>

