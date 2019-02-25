<template>
  <el-dialog
    custom-class="w80"
    :title="'选择产品申报'"
    :close-on-click-modal="false"
    :visible.sync="viewVisible"
    >
    <div v-if="viewVisible">
        <el-form ref="query" :model="query" :inline="true" class="demo-form-inline table-form">
            <el-form-item>
              <el-input v-model="query.searchName" placeholder="产品名称" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.searchDosageForm" placeholder="剂型" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.searchSpec" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.searchOrg" placeholder="生产企业" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" @click="restQuery" size="small">重置</el-button>
            </el-form-item>
        </el-form>
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
         <!-- <el-table-column label="产品名称">
            <template slot-scope="scope">
              <div>
                <div class="text-inline">{{ scope.row.DRUG }}</div>
              </div>
              <div class="text-inline">{{ scope.row.MIXDOSAGE }}</div>
            </template>
          </el-table-column>
          <el-table-column label="产品信息">
            <template slot-scope="scope">
              <div class="pro-details">
                <div class="text-inline">{{ scope.row.COMBINED }}&nbsp;&nbsp;{{scope.row.WRAP}}</div>
              </div>
              <div class="text-inline">{{ scope.row.ABBR }}</div>
            </template>
          </el-table-column>-->

          <el-table-column label="产品名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.DRUG }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.TRADE }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.DOSAGE }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.SPEC }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比" width="60" header-align="left" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.STANDRATE }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.METRIC }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" width="60" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.WRAP }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.MANUFACTURE }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作"  width="100">
            <template slot-scope="scope">
              <div class="operates">
                <span><a class="operation-btn" @click="submitProduct(scope.row.ID)">选择</a></span>
              </div>
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
    <span slot="footer">
      <el-button @click="viewVisible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {selectProductList,addDeclareProductById} from 'src/axios/auditchanges/messageDeclare/product'
  import {keyBoardEnter} from "src/utils";
  export default {
    data () {
      return {
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        viewVisible: false,
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
            pageNum: 0,
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
          query: {
            id: undefined,
            searchName: undefined,
            searchDosageForm: undefined,
            searchSpec: undefined,
            searchOrg: undefined
          }
        }
      },
      fillData() {
        this.viewVisible = true;
        console.log("========lz ceshi===========")
        console.log(this.resData)
        selectProductList(this.resData,this.query).then(res => {
          this.resData = res.data;
        })

      },
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.fillData()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.fillData()
      },
      //查询
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.fillData();
        })
      },
      handleQuery(){
        this.fillData()
      },
      restQuery(){//重置
        this.query=this.metaQuery();this.fillData();
      },
      submitProduct(id){
        this.viewVisible = false;
        addDeclareProductById(id).then(res =>{
          if(res.success){
            this.$message({
              message: "保存成功",
              type: 'success',
              onClose: function () {
                window.location.reload()
              }
            })
          } else{
            this.$message.error("提交失败")
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
