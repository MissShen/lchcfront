<template>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
              <el-form-item>
                 <el-input  v-model="query.searchAllproductName"  @keyup.enter.native="searchEnterFun"  placeholder="产品名称" size="small"></el-input>
             </el-form-item>
             <el-form-item>
                 <el-input  v-model="query.searchName"  @keyup.enter.native="searchEnterFun"  placeholder="剂型名称" size="small"></el-input>
             </el-form-item>
             <el-form-item>
                 <el-input  v-model="query.orgAllName"  @keyup.enter.native="searchEnterFun"  placeholder="生产企业" size="small"></el-input>
             </el-form-item>
               <el-form-item>
                <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
                <el-button type="warning" size="small" @click="resetForm">重置</el-button>
               </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @sort-change="sortChang"
          border
          stripe>
        <!--  <el-table-column label="序号" header-align="left" align="center" type="index" width="50"></el-table-column>-->
    <!--      <el-table-column label="产品名称" show-overflow-tooltip prop="f.NAME_CHN" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" show-overflow-tooltip prop="f.TRADE_NAME" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.tradeName }}</span>
            </template>
          </el-table-column>
            <el-table-column label="剂型名称" width="130" show-overflow-tooltip prop="f.DOSEAGE_FORM_NAME" sortable="custom">
                <template slot-scope="scope">
                   <span>{{ scope.row.doseageFormName }}</span>
                </template>
             </el-table-column>
          <el-table-column label="规格包装" show-overflow-tooltip prop="f.spec" sortable="custom">
                <template slot-scope="scope">
                   <span>{{ scope.row.spec }}×{{ scope.row.spstandRateec }}{{ scope.row.smallestUnits }}/{{ scope.row.specUnit }}</span>
                </template>
             </el-table-column>-->
          <el-table-column label="产品名" show-overflow-tooltip prop="f.NAME_CHN" sortable="custom">
            <template slot-scope="scope">
              <!--<span>{{ scope.row.nameChn }}</span>-->

              <!--tootip提示气泡-->
              <!--:enterable="false" 鼠标不可进入tooltip中-->
              <el-tooltip placement="top" :enterable="false">
                <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                <div slot="content">
                  <div>{{ scope.row.nameChn }}</div>
                  <div class="text-inline">{{ scope.row.doseageFormName }}
                    <span v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">({{ scope.row.tradeName }})</span>
                  </div>
                </div>

                <!--源内容（必须放在class="el-tooltip-box"内）-->
                <div class="el-tooltip-box">
                  <!--加class="text-inline"确保内容不折行-->
                  <div class="text-inline">{{ scope.row.nameChn }}</div>
                  <div class="text-inline">{{ scope.row.doseageFormName }}
                    <span v-if="scope.row.tradeName != '无' && scope.row.tradeName !=null">({{ scope.row.tradeName }})</span>
                  </div>
                </div>
              </el-tooltip>

            </template>
          </el-table-column>
          <el-table-column label="产品信息" prop="f.TRADE_NAME" sortable="custom">
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
          <el-table-column label="转换比" width="80" prop="f.STAND_RATE" sortable="custom">
                <template slot-scope="scope">
                   <span>{{ scope.row.standRate }}</span>
                </template>
             </el-table-column>
        <!--  <el-table-column label="生产企业" show-overflow-tooltip prop="f.MANUFACTURE_NAME" sortable="custom">
                <template slot-scope="scope">
                   <span>{{ scope.row.manufactureName }}</span>
                </template>
             </el-table-column>-->
          <el-table-column label="批准文号" show-overflow-tooltip prop="f.PERMIT_NUMBER" sortable="custom">
                <template slot-scope="scope">
                   <span>{{ scope.row.permitNumber }}</span>
                </template>
             </el-table-column>
            <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="operates">
                <template v-if="scope.row.existFlag=='0'"><a href="javascript:;" @click="addToList(scope.row.id)">上报</a></template>
                <template v-else><span class="font-12">已上报</span></template>
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
      <div class="foot-btn">
        <div class="foot-left"><el-button type="" size="small" @click="returnEx">返回</el-button></div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 引入用户相关请求
  import {viewProductList} from  'src/axios/trade/shortage/buyerRole/shortageUpList'
  import {priceFormat,keyBoardEnter} from "src/utils";


  export default {
    name:'orderItemStaticList',
    data () {
      return {
        currentOrder:undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        expanded:true,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
      this.query.id=this.$route.params.id;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {// 前后台交互数据封装格式
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
          list: []
        }
      },
      resetForm () {
        this.query=this.metaQuery()
        this.list()
      },
      metaQuery () { // 表单查询数据初始化
        return {

            id:undefined,
            searchAllproductName: undefined,
            searchName: undefined,
            orgAllName: undefined,

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy=this.currentOrder;
        viewProductList(this.resData, this.query).then(res => {
          this.resData = res.data
           if(this.resData.pageNum === 0 ){
              this.resData.pageNum = 1
          }
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
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      addToList(productId){
        var id=this.query.id
        this.$router.push("/trade/dataReport/addOrUpdateList/"+id+"/"+productId)
      },
      returnEx(){
        window.history.go(-1)
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
        return "规格:  "+_bakMedicalSpec +"包材:   "+_wrapName
      },
    }
  }
</script>
