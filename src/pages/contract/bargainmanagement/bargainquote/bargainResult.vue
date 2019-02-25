<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item class="width-120">
              <el-input size="small" v-model="query.hospitalName" maxlength="200" placeholder="议价医院" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input size="small" v-model="query.productName" maxlength="200" placeholder="品名" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input size="small" v-model="query.spec" maxlength="200" placeholder="规格" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input size="small" v-model="query.doseageFormName" maxlength="200" placeholder="剂型" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-120">
              <el-input size="small" v-model="query.manufactureName" maxlength="200" placeholder="企业名称" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-100">
              <el-select v-model="query.basicFlag" placeholder="基药标记" size="small">
                <el-option-group
                  key="基药标记"
                  label="基药标记">
                  <el-option v-for="item in basicFlagOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item class="width-80">
              <el-select v-model="query.twoVote" placeholder="两票制" size="small">
                <el-option-group
                  key="两票制"
                  label="两票制">
                  <el-option v-for="item in twoVoteOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          <el-form-item class="width-100">
            <el-select v-model="query.bidFlagOp" placeholder="报价状态" size="small">
              <el-option-group
                key="报价状态"
                label="报价状态">
                <el-option v-for="item in bidFlagOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
            <el-form-item class="width-100">
              <el-select v-model="query.confirmFlagState" placeholder="议价状态" size="small">
                <el-option-group
                  key="议价状态"
                  label="议价状态">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-option-group>
              </el-select>
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
          <el-table-column label="议价医院" prop="hosName" sortable="custom" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.hosName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="通用名" prop="nameChn" sortable="custom" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" prop="productName" min-width="200">
            <template slot-scope="scope">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i class="ico icon-qu" v-if="scope.row.regionalDrug > 0"></i>
                    <i class="ico icon-jc" v-if="scope.row.basicFlag != null && scope.row.basicFlag > 0"></i>
                    <i class="ico icon-yi" v-if="scope.row.healthFlag"></i>
                    <i class="ico icon-liang" v-if="scope.row.twoVote"></i>
                  </div>
                </li>
                <li>
                  <div class="text-inline" :title="scope.row.productName">{{ scope.row.productName }}</div>
                  <div class="text-inline" :title="scope.row.doseageFormName + formatTradeName(scope.row.tradeName)">{{ scope.row.doseageFormName }}{{formatTradeName(scope.row.tradeName)}}</div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" prop="drug_Detail" min-width="200">
            <template slot-scope="scope">
              <!--规格 × 转换比 最小使用单位 / 单位 包材-->
              <div class="text-inline"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+formatWrapName(scope.row.wrapName)">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} {{formatWrapName(scope.row.wrapName)}}
              </div>
              <div class="text-inline" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="申报企业" prop="bidOrgName" sortable="custom" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.bidOrgName }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column :label="orgTypeName" align="right" header-align="left" width="85">
            <template slot-scope="scope">
              <span v-if="scope.row.minBidPrice != null">{{ priceFormat(scope.row.minBidPrice) }}</span>
              <span v-if="scope.row.minBidPrice == null && scope.row.bidPrice != 0">{{ priceFormat(scope.row.bidPrice) }}</span>
              <span v-if="scope.row.bidPrice == '0' && scope.row.minBidPrice == null">待谈判</span>
            </template>
          </el-table-column>-->
          <el-table-column label="议价时间" prop="bidDate" sortable="custom"  width="130" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.bidDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业报价" prop="barBidPrice" sortable="custom" align="right" width="80">
            <template slot-scope="scope">
              <span class="blue">{{ formatBarBidPrice(scope.row.bidFlag,scope.row.barBidPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="议价状态" width="80" prop="confirmFlag" sortable="custom" align="center">
            <template slot-scope="scope">
              <span v-if="formatConfirmFlag(scope.row.confirmFlag)=='拒绝'" class="red">{{ formatConfirmFlag(scope.row.confirmFlag) }}</span>
              <span class="green" v-else>{{ formatConfirmFlag(scope.row.confirmFlag) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结果公示" width="80" prop="barBidPrice" sortable="custom" align="right">
            <template slot-scope="scope">
              <!--<span >{{ formatResult(scope.row.bidFlag, scope.row.confirmFlag, scope.row.barBidPrice) }}</span>-->
              <span v-if="scope.row.bidFlag == '1' && scope.row.confirmFlag == '1'" class="green">{{ priceFormat(scope.row.barBidPrice) }}</span>
              <span v-if="scope.row.confirmFlag == '2'">0</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格分页 -->
        <div class="pagebox">
          <ul class="explain">
            <li><i class="ico icon-qu"></i><span>区目录药品</span></li>
            <li><i class="ico icon-jc"></i><span>基本药物目录</span></li>
            <li><i class="ico icon-yi"></i><span>医保药品</span></li>
            <li><i class="ico icon-liang"></i><span>两票制</span></li>
          </ul>
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :pager-count="5"
            :page-sizes="[10, 20, 30]"
            :total="resData.total"
            :page-size="resData.pageSize"
            :page-count="resData.pages"
            :current-page.sync="resData.pageNum">
          </el-pagination>
        </div>
      </div>



    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryBargainingResultList} from 'src/axios/contract/bargainmanagement/bargainingResultList'
  import {queryOrg}  from 'src/axios/contract/datamanagement/orgCommon'
  import moment from 'moment'
  import {priceFormat} from "src/utils"
  import { keyBoardEnter } from "src/utils"

  export default {
    components: {moment},
    data () {
      return {
        orgTypeName : "医院采购价",
        currentOrder:undefined, //分页的时候缓存
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        orgType : undefined,
        options: [
          {
            value: '',
            label: '全部'
          },
          {
          value: '0',
          label: '待确认'
          }, {
            value: '1',
            label: '已确认'
          }, {
            value: '2',
            label: '拒绝'
          }
        ],
        bidFlagOptions: [
          {
            value: '',
            label: '全部'
          }, {
            value: '1',
            label: '已报价'
          }, {
            value: '2',
            label: '已拒绝'
          }
        ],
        basicFlagOptions: [
          {
            label : '全部',
            value : ''
          },{
            label : '非基药',
            value : '0'
          },{
            label : '国家基药',
            value : '1'
          },{
            label : '北京增补',
            value : '2'
          }
        ],
        twoVoteOptions: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '已签订'
          },
          {
            value: '0',
            label: '未签订'
          }
        ]
      }
    },
    created () {
      this.queryOrgType();
      this.list()
    },
    methods: {
      moment,
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
            pagerCount: 5,
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
      // 重置表单
      resetForm () {
        this.query = this.metaForm();
        this.list();
      },
      // 表单数据初始化
      metaForm () {
        return {
          productName :  "",
          source :  "",
          hospitalName : ""
        }
      },
      metaQuery () {
        return {
          hospitalName: undefined,
          productName :  undefined,
          spec :  undefined,
          doseageFormName :  undefined,
          manufactureName :  undefined,
          bidFlagOp : undefined,
          basicFlag :  undefined,
          twoVote :  undefined,
          confirmFlagState :undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //
      queryOrgType(){
        queryOrg("").then(res => {
          this.orgType = res.data.orgType;
          if(this.orgType == 4){
            this.orgTypeName = "本院采购价";
          }
        })
      },
      list () {
        this.resData.orderBy = this.currentOrder;
        queryBargainingResultList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum =1;
          }
        })
      },
      formatTradeName(tradeName){
        if(tradeName == null || tradeName == '' || tradeName == '无'){
          return "";
        }else{
          return "(商品名:"+tradeName+")";
        }
      },
      formatWrapName(wrapName){
        if(wrapName == null || wrapName == '' || wrapName == '空'){
          return "";
        }else{
          return "("+wrapName+")";
        }
      },
      formatBarBidPrice(bidFlag, barBidPrice){
        if(bidFlag == '1'){
          return this.priceFormat(barBidPrice);
        }else if(bidFlag == '2'){
          return "拒绝";
        }else{
          return "";
        }
      },
      formatConfirmFlag(confirmFlag){
        if(confirmFlag == '0'){
          return "待确认";
        }else if(confirmFlag == '1'){
          return "已确认";
        }else if(confirmFlag == '2'){
          return "拒绝";
        }else{
          return "";
        }
      },
      /*formatResult(bidFlag, confirmFlag, barBidPrice){
        if(confirmFlag == '0'){
          return "";
        }else if(bidFlag == '1' && confirmFlag == '1'){
          return this.priceFormat(barBidPrice);
        }else if(confirmFlag == '2'){
          return "0";
        }else{
          return "";
        }
      },*/
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
    }
  }
</script>
