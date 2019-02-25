<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input size="small" v-model="query.productName" maxlength="200" placeholder="品名" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input size="small" v-model="query.sourceName" maxlength="200" placeholder="来源" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
              <el-form-item>
                <el-input size="small" v-model="query.manufactureName" maxlength="200" placeholder="生产企业" @keyup.enter.native="searchEnterFun"></el-input>
              </el-form-item>
            <el-form-item>
              <el-button size="small" type="success" @click="searchEnterFun">查询</el-button>
              <el-button size="small" type="warning" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="来源" prop="sourceName" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.sourceName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="医院名称" prop="hosName" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.hosName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="通用名" prop="name_Chn" sortable="custom"  :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" prop="productName" width="150">
            <template slot-scope="scope">
              <div class="ellipsis es150">{{ scope.row.productName }}</div>
              <div class="ellipsis es150">(商品名：{{ scope.row.tradeName }})</div>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" prop="drug_Detail" width="200">
            <template slot-scope="scope">
              <div class="pro-details ellipsis es200"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+'('+scope.row.wrapName+')'+'('+scope.row.doseageFormName+')'">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} ({{scope.row.wrapName}}) ({{ scope.row.doseageFormName }})
              </div>
              <div class="pro-details ellipsis es200" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="申报企业" prop="bid_Org_Name" sortable="custom"  :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.bidOrgName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="两票制" prop="twoVoteId" sortable="custom"  width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.twoVoteId != 1" style="color:red">未签订</span>
              <span v-if="scope.row.twoVoteId == 1">已签订</span>
            </template>
          </el-table-column>
          <el-table-column label="最低价" prop="min_Price" sortable="custom" width="85" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.minPrice) }}</span>
            </template>lk
          </el-table-column>
          <el-table-column label="企业报价" prop="bid_Price" sortable="custom"  width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.bidPrice) }}</span>
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
      <div class="foot-btn">
        <div class="foot-left">
          <el-button size="small" type="warning" @click="Excel()">导出</el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryBargainQuoteLiveList,exportExcel} from 'src/axios/contract/bargainmanagement/bargainquote/bargainQuoteLive'
  import fileUpload from 'js-file-download'
  import {priceFormat} from "src/utils"
  import { keyBoardEnter } from "src/utils"

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder:undefined, //分页的时候缓存
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        checked: true
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
      metaData () {
        return {
          orderBy: undefined,
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
          query: {
            productName : undefined,
            sourceName : undefined,
            manufactureName : undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryBargainQuoteLiveList(this.resData, this.query).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      resetForm () {
        this.query = this.metaQuery();
        this.list();
      },
      Excel(){
        this.lyfloading = true;
        exportExcel(this.resData, this.query).then(res => {
          this.lyfloading = false;
          let headers = res.headers;
          let title = ""
          if (!title) {
            console.info("title",title)
            const fileName = headers['content-disposition'];
            console.info("fileName " , fileName)
            console.info(fileName)
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,title,"application/vnd.ms-excel")
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      sortChange(value){
        console.log("value: ", value);
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.list();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      },
      /*==============================暂时不会用到==============================*/
      /*,
      handleGoAdd (id) {
        this.$router.push("/contract/datamanagement/hospitalDeliveryAddress/" + id);
      },
      deleteAddress(id) {
        this.$confirm(`您删除收货地址的同时，之前的产品配送关系可能失效，是否确认删除？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteHospitalAddress(id).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list();
              }
            })
          })
        })
      },
      updateAddress(id) {
        this.$router.push("/contract/datamanagement/hospitalDeliveryAddress/" + id);
      }*/
      /*==============================暂时不会用到==============================*/
    }
  }
</script>
