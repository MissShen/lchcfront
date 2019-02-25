<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <!--<span>-->
                <!--<el-input v-model="query.searchDaseageFormName" placeholder="通用名" size="small"></el-input>-->
            <!--</span>-->
            <el-form-item>
                <el-input v-model="query.searchSpec" @keyup.enter.native="searchEnterFun" placeholder="产品名称" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="query.searchStandRate" @keyup.enter.native="searchEnterFun" placeholder="商品名" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="query.searchManufactureName" @keyup.enter.native="searchEnterFun" placeholder="生产企业名称" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
                <el-button type="warning" @click="reset()" size="small">重置</el-button>
            </el-form-item>
        </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          @sort-change="sortChang"
          stripe ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <!--<el-table-column type="index" width="50" align="center" label="序号"></el-table-column>-->
          <!--<el-table-column label="中西药">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.bidFlag }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column label="通用名">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.medicalName }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

          <el-table-column label="产品名称" min-width="200"  prop="h.bak_product_name" sortable="top">
            <template slot-scope="scope" class="drugMessage" >
              <ul class="ico-zt">
                <li>
                  <!--tootip提示气泡-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.bakMedicalName }}</div>
                      <div v-if="scope.row.bakProductName != '无' && scope.row.bakProductName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakProductName }})</div>
                      <div v-if="scope.row.bakProductName == '无' || scope.row.bakProductName ==null">{{ scope.row.bakMedicalMode }}</div>
                    </div>
                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div class="text-inline">{{ scope.row.bakMedicalName }}</div>
                      <div class="text-inline"  v-if="scope.row.bakProductName != '无' && scope.row.bakProductName !=null">{{ scope.row.bakMedicalMode }}({{ scope.row.bakProductName }})</div>
                      <div class="text-inline"  v-if="scope.row.bakProductName == '无' || scope.row.bakProductName ==null">{{ scope.row.bakMedicalMode }}</div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>


          <el-table-column  label="产品信息" min-width="200" prop="h.bak_medical_spec" sortable="top" >
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{getSpecHints(scope.row.bakMedicalSpec,scope.row.bakStandSpecRate,scope.row.bakUseUnit,scope.row.bakSpecUnit,scope.row.warpName)}} <br/>
                  {{scope.row.manufactureName}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">
                    <span class="text-inlie"  v-if="scope.row.warpName != '空' && scope.row.warpName != null"> {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}&nbsp;&nbsp; {{scope.row.warpName}}</span>
                    <span class="text-inlie"  v-if="scope.row.warpName == '空' || scope.row.warpName == null"> {{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.bakUseUnit}} / {{ scope.row.bakSpecUnit}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.manufactureName}}
                  </div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>

         <!-- <el-table-column label="产品名称" prop="BAK_MEDICAL_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.bakMedicalName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" prop="BAK_PRODUCT_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.bakProductName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" prop="BAK_MEDICAL_MODE" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.bakMedicalMode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="BAK_MEDICAL_SPEC" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.bakMedicalSpec }}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="转换比" prop="BAK_STAND_SPEC_RATE" sortable="custom" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.bakStandSpecRate }}</span>
            </template>
          </el-table-column>

  <!--        <el-table-column label="单位" prop="BAK_SPEC_UNIT" sortable="custom" width="60">
            <template slot-scope="scope">
              <span>{{ scope.row.bakSpecUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" prop="WARP_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.warpName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" prop="MANUFACTURE_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.manufactureName }}</span>
            </template>
          </el-table-column>
          -->
          <el-table-column label="单价" prop="PRICE" sortable="custom" width="80">
            <template slot-scope="scope">
              <span> {{ priceFormat(scope.row.price) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="100">
            <template slot-scope="scope">
              <span   class="operation-btn" @click="show(scope.row)">查看</span>
            </template>
          </el-table-column>
          <el-table-column  type="expand">
            <template slot-scope="scope">
              <el-form label-position="left"  height="30px" inline class="demo-table-expand">
                <el-form-item label="备注:" class="nomar">
                  <span>{{ scope.row.remark }}</span>
                </el-form-item>
              </el-form>
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
    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="success" size="small" @click="goAdd(query.declareId)">新增</el-button>
        <el-button type="danger" size="small" @click="deleteShortage()">删除</el-button>
        <el-button type="" size="small" @click="goBack">返回</el-button>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入数据请求
  import {selectOrgDeclareList,deleteOrgDeclare} from 'src/axios/trade/assist/assistConfig'
  import {priceFormat,keyBoardEnter} from "src/utils";
  import {getPackHints,getSpecHints} from "src/utils/validateUtil";

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        currentOrder:undefined,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        expanded:true,
        dataList: []
      }
    },
    created () {
      this.assistId = this.$route.params.assistId || undefined;
      this.list()
    },
    methods: {
      priceFormat,
      getSpecHints,
      getPackHints,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
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
            requestInfo: [],
            requestValue:''

        }
      },
      show(row) {
        this.$refs.multipleTable.toggleRowExpansion(row, this.expanded);
        this.expanded = !this.expanded
      },
      metaQuery() { // 表单查询数据初始化
        return {

            searchDaseageFormName: undefined,
            searchSpec: undefined,
            searchStandRate: undefined,
            searchManufactureName: undefined,

        }
      },

      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.resData.orderBy=this.currentOrder;
         this.query.declareId = this.assistId;
        selectOrgDeclareList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        });
      },
      sortChang(value){
        let sortType=" desc"
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      reset() {
        this.query = this.metaQuery();
        this.list();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      handleFromInfo(orderId) {
        this.$router.push("/trade/manage/orderItemList/" + orderId)
      },
      // ************************ 分页操作 ************************
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.list()
      },
      goBack() {
        this.$router.go(-1)
      },
      handleSelectionChange(val) {
        this.dataList = val;
      },
      deleteShortage() {
        if (this.dataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }
        else {
          var idList = '';
          for (var noticeType of this.dataList) {
            idList += (noticeType.id + ',');
          }
          idList = idList.slice(0, -1);
          this.query.keys = idList;
          this.query.ids=idList;
        }
        deleteOrgDeclare(this.query).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.goBack()
            }
          })
        })
      },
      goAdd(id){
        this.$router.push("/trade/dataReport/assistAddTabs/"+id);
      },
      reset(){
        this.query=this.metaQuery();
        this.list();
      }


    }
  }
</script>
