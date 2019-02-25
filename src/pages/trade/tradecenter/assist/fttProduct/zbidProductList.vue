<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item class="width-120">
            <el-input v-model="query.searchproductName" @keyup.enter.native="searchEnterFun" placeholder="通用名" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input v-model="query.orgName" @keyup.enter.native="searchEnterFun" placeholder="生产企业名称" size="small"></el-input>
          </el-form-item>
      <!--    <el-form-item class="width-120">
            <el-input v-model="query.searchDoseFrom" @keyup.enter.native="searchEnterFun" placeholder="剂型" size="small"></el-input>
          </el-form-item>-->
          <el-form-item class="width-120">
            <el-input v-model="query.searchSpec" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" size="small" @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @selection-change="handleSelectionChange"
          @sort-change="sortChang"
          border
          @select="checkedRow"
          stripe  ref="multipleTable">
          <el-table-column type="selection" width="40" align="center" ></el-table-column>
          <!--<el-table-column type="index" width="50" label="序号" header-center="left" align="center"></el-table-column>-->
          <el-table-column label="产品名" show-overflow-tooltip prop="f.NAME_CHN" sortable="custom">
            <template slot-scope="scope">
              <!--<span>{{ scope.row.nameChn }}</span>-->

                <!--tootip提示气泡-->
                <!--:enterable="false" 鼠标不可进入tooltip中-->
                <el-tooltip placement="top" :enterable="false">
                  <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                  <div slot="content">
                    <div>{{ scope.row.nameChn }}</div>
                    <div>{{ scope.row.bakProductName }}
                      <span v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">({{ scope.row.tradeName }})</span>
                    </div>
                  </div>

                  <!--源内容（必须放在class="el-tooltip-box"内）-->
                  <div class="el-tooltip-box">
                    <!--加class="text-inline"确保内容不折行-->
                    <div class="text-inline">{{ scope.row.nameChn }}</div>
                    <div class="text-inline">{{ scope.row.bakProductName }}
                      <span v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">({{ scope.row.tradeName }})</span>
                    </div>
                  </div>
                </el-tooltip>

            </template>
          </el-table-column>
          <el-table-column label="产品信息" show-overflow-tooltip prop="f.TRADE_NAME" sortable="custom">
            <template slot-scope="scope">
              <!--<span>{{ scope.row.tradeName }}</span>-->

              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getHints(scope.row.spec,scope.row.warpName)}}<br/>
                  {{ scope.row.manufactureName}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    {{ scope.row.spec }}&nbsp;&nbsp;
                    <span v-if="scope.row.warpName != '空' && scope.row.warpName != null">{{scope.row.warpName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.manufactureName}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="转换比" width="90" prop="BAK_STAND_SPEC_RATE" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.standRate }}</span>
            </template>
          </el-table-column>
          <!--      <el-table-column label="剂型" width="100" prop="f.DOSEAGE_FORM_NAME" sortable="custom">
                 <template slot-scope="scope">
                   <span>{{ scope.row.doseageFormName }}</span>
                 </template>
               </el-table-column>
              <el-table-column label="规格" width="100" show-overflow-tooltip prop="f.SPEC" sortable="custom">
                 <template slot-scope="scope">
                   <span>{{ scope.row.spec }}</span>
                 </template>
               </el-table-column>
               <el-table-column label="转换比" width="100" prop="f.STAND_RATE" sortable="custom">
                 <template slot-scope="scope">
                   <span>{{ scope.row.standRate }}</span>
                 </template>
               </el-table-column>
               <el-table-column label="单位" width="50" prop="f.NAME_CHN" sortable="custom">
                 <template slot-scope="scope">
                   <span>{{ scope.row.specUnit }}</span>
                 </template>
               </el-table-column>
               <el-table-column label="包材" width="50" prop="f.WRAP_NAME" sortable="custom">
                 <template slot-scope="scope">
                   <span>{{ scope.row.warpName }}</span>
                 </template>
               </el-table-column>
                 <el-table-column label="生产企业" width="200" show-overflow-tooltip prop="f.MANUFACTURE_NAME" sortable="custom">
                   <template slot-scope="scope">
                     <span>{{ scope.row.manufactureName }}</span>
                   </template>
                 </el-table-column>-->
              <el-table-column label="单价" width="80" header-align="left" align="center" prop="f.BID_PRICE" sortable="custom">
                <template slot-scope="scope">
                  <span>{{ priceFormat(scope.row.bidPrice) }}</span>
                </template>
             </el-table-column>
            <el-table-column type="expand" heigh="10px">
              <template slot-scope="scope">
                <span>非两票制原因 :  <el-input style="width:400px " v-model="scope.row.remark"  size="small"></el-input></span>
              </template>
            </el-table-column>
        </el-table>
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
      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="success" size="small" @click="goAdd">加入非两制药品</el-button>
          <el-button type="" size="small" @click="goBefore">返回</el-button>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>
</template>
<script>

  // 引入数据请求
  import {viewFttProductList,addFttProduct} from 'src/axios/trade/assist/fttProduct/orgFttList'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        currentOrder:undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        expanded:true,
        multipleSelection:[],
        remarks:[],
        showAddForm:false,
      }
    },
    created () {
      this.list()
    },
    methods: {
      getSpecHints,
      getPackHints,
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
           // 前后台交互数据封装格式
          orderBy:undefined,
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
            list: [],
            requestInfo:[]

        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
            searchproductName:undefined,
            orgName:undefined,
            searchDoseFrom:undefined,
            searchSpec:undefined
        }
      },
      checkedRow(row){
      },
      goAdd(){
        if(this.multipleSelection.length<1){
          this.$message.error('选择要加入的产品');
          return false
        }else {
            let ids = [], arr = this.multipleSelection;
           for(let i = 0; i < arr.length; i++){
              ids.push(arr[i].id);
              this.remarks.push(arr[i].remark);
             if(arr[i].remark==undefined ||arr[i].remark==''){
                for(let j=0;j<this.resData.list.length;j++){
                    if(arr[i].id == this.resData.list[j].id ){
                      this.$message.error("第"+(j+1)+"条原因不能为空");
                    }
                }
               this.remarks =[]
                return false;
              }
            }
           addFttProduct(ids,this.remarks).then(res => {
               this.list()
             })
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
        }
      },
      goBefore(){
        this.$router.go(-1)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        viewFttProductList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
        })
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      handleClose(done) {
        this.query= this.metaQuery()
      },
      reset(){
        this.query=this.metaQuery();
        this.list();
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      getHints(bakMedicalSpec,wrapName){
        let _bakMedicalSpec,_wrapName;
        if(bakMedicalSpec == null || bakMedicalSpec == undefined || bakMedicalSpec == "空"){
          _bakMedicalSpec = "";
        }else {
          _bakMedicalSpec = bakMedicalSpec;
        }
        if(wrapName == null || wrapName == undefined || wrapName == "空"){
          _wrapName = "";
        }else {
          _wrapName = wrapName;
        }
        return _bakMedicalSpec +_wrapName
      },

    }
  }
</script>
