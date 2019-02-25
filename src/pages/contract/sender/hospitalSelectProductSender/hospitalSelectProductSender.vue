<template>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格1 -->
    <div class="tablebox">
      <el-form ref="query" :model="query" :inline="true" class="table-form">
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
          <el-form-item class="width-120">
            <el-select v-model="query.regionalDrug" placeholder="区目录" size="small">
              <el-option-group
                key="区目录"
                label="区目录">
                <el-option
                  v-for="item in regionalDrugOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select v-model="query.basicFlag" placeholder="基药标记" size="small">
              <el-option-group
                key="基药标记"
                label="基药标记">
                <el-option
                  v-for="item in baseFlags"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.twoVoteId" placeholder="两票制" size="small" class="width-100">
              <el-option-group
                key="两票制"
                label="两票制">
                <el-option v-for="item in twoVoteOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.isTrade" placeholder="进入交易" size="small" class="width-100">
              <el-option-group
                key="进入交易"
                label="进入交易">
                <el-option v-for="item in tradeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select v-model="query.firstSender" placeholder="首选配送" size="small">
              <el-option-group
                key="首选配送"
                label="首选配送">
                <el-option v-for="item in firstSenderOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
          </el-form-item>
      </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="通用名" prop="NAME_CHN" sortable="custom" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名称"  min-width="180">
            <template slot-scope="scope">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i class="ico icon-qu" v-if="scope.row.regionalDrug"></i>
                    <i class="ico icon-jc" v-if="scope.row.basicFlag != null && scope.row.basicFlag > 0"></i>
                    <i class="ico icon-yi" v-if="scope.row.healthFlag"></i>
                    <i class="ico icon-liang" v-if="scope.row.twoVoteId"></i>
                  </div>
                </li>
                <li>
                  <div class="text-inline" :title="scope.row.productName">{{ scope.row.productName }}</div>
                  <div class="text-inline" :title="scope.row.doseageFormName + formatTradeName(scope.row.tradeName)">{{ scope.row.doseageFormName }}{{formatTradeName(scope.row.tradeName)}}</div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" min-width="180">
            <template slot-scope="scope">
              <!--规格 × 转换比 最小使用单位 / 单位 包材-->
              <div class="text-inline"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+formatWrapName(scope.row.wrapName)">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} {{formatWrapName(scope.row.wrapName)}}
              </div>
              <div class="text-inline" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="申报企业" width="120" prop="BID_ORG_NAME" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.bidOrgName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格" prop="DEAL_PRICE" sortable="custom" width="80" header-align="left" align="right" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="blue">{{ priceFormat(scope.row.dealPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="进入交易" width="90" prop="isTrade" sortable="custom" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isTrade=='是'" class="green">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column label="已选配送" width="90" prop="SENDER_NUM" sortable="custom" header-align="left" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.senderNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="首选配送" width="90" prop="FIRST_SENDER" sortable="custom" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.firstSender > 0" class="orange">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="合同签订" width="90" prop="isSignContract" sortable="custom" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isSignContract > 0">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column label="基药标记" width="90" prop="BASIC_FLAG" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.basicFlagName }}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <!--<el-button type="text" size="small" @click="openSelectedPage(scope.row.productId)">详情</el-button>-->
              <div v-if="scope.row.disableProductId != null && scope.row.disableProductId != ''">
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content" v-html="scope.row.comments"></div>
                  <span class="font-12 red">已禁用</span>
                </el-tooltip>
              </div>
              <div v-if="scope.row.disableProductId == null || scope.row.disableProductId == ''" class="operates">
                <a href="javascript:;" class="flo-left blue-bord" @click="openUnselectedPage(scope.row.productId,scope.row.dealPrice,false)">选择配送</a>
                <!--<a href="javascript:;" class="flo-left" @click="openIntoTradePage(scope.row.productId)">查看进入交易配送企业</a>-->
              </div>
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
            :page-sizes="[10, 20, 30]"
            :total="resData.total"
            :page-size="resData.pageSize"
            :page-count="resData.pages"
            :pager-count="5"
            :current-page.sync="resData.pageNum">
          </el-pagination>
        </div>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <!--<span>
            <el-button type="warning" size="small" @click="generate()">预生成</el-button>
          </span>-->
          <span>
            <el-button type="warning" size="small" @click="Excel()">导出已选择的配送企业</el-button>
          </span>
        </div>
      </div>
      <!-- 可选配送列表 -->
      <!--<unselected-view v-if="unselectedViewVisible" :parent-id="this.productId" ref="unselectedView"></unselected-view>-->

      <!-- 已选配送列表 -->
      <!--<selected-view v-if="mainViewVisible" :parent-id="this.productId" ref="mainView"></selected-view>-->

      <main-view v-if="mainVisible" ref="mainView"></main-view>

      <!-- 进入交易配送列表 -->
      <intoTrade-view v-if="intoTradeViewVisible" :parent-id="this.productId" ref="intoTradeView"></intoTrade-view>
    </div>
</template>
<script>

  // 引入用户相关请求
  import {queryProductList, generateContract,hospitalSelectProductSenderExcel} from 'src/axios/contract/sender/hospitalSelectProductSender'
  import fileUpload from 'js-file-download'
  //  引入子页面
  import intoTradeView from 'src/pages/contract/sender/hospitalSelectProductSender/intoTradeSender';
  import mainView from 'src/pages/contract/sender/hospitalSelectProductSender/hospitalSelectProductSender-main';
  import { keyBoardEnter } from "src/utils"
  import {priceFormat} from "src/utils"
  export default {
    components: {
      intoTradeView,
      mainView
    },
    data () {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        mainViewVisible : false,
        unselectedViewVisible : false,
        intoTradeViewVisible : false,
        mainVisible : false,
        regionalDrugOptions : [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '是'
          },{
            value: '0',
            label: '否'
          }
        ],
        baseFlags:[
          {
            value: '',
            label: '全部'
          },
          {
            value: '0',
            label: '非基药'
          },{
            value: '1',
            label: '国家基药'
          },{
            value: '2',
            label: '北京基药'
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
        ],
        tradeOptions: [
          {
            value: '',
            label: '全部'
          },{
            value: '1',
            label: '是'
          },{
            value: '0',
            label: '否'
          }
        ],
        firstSenderOptions: [
          {
            value: '',
            label: '全部'
          },{
            value: '1',
            label: '是'
          },{
            value: '0',
            label: '否'
          }
        ],
        productId : undefined
      }
    },
    created () {
      this.list();
      console.log("-------------------------");

    },
    //mounted 挂载结束状态
    mounted (){
     const productId =  this.$route.params.productId;
     const dealPrice =    this.$route.params.dealPrice;
      if(productId != null && productId != '' && productId != 'undefined' && dealPrice != null && dealPrice != '' && dealPrice != 'undefined'){
        this.openUnselectedPage(productId,dealPrice,true);
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
      metaData () {
        return {
          orderBy: undefined,
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
          list: undefined
        }
      },
      metaForm () { // 表单数据初始化
        return {
          productName: '',
          manufactureName: '',
          basicFlag: undefined
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          productName: undefined,
          spec: undefined,
          doseageFormName: undefined,
          manufactureName: undefined,
          regionalDrug: undefined,
          basicFlag: undefined,
          twoVoteId: undefined,
          isTrade: undefined,
          firstSender: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      /**
       * 打开已选配送页面
       * @param productId
       */
      openSelectedPage (productId) {
        this.productId = productId;// 传递Id
        this.mainViewVisible = true;
        this.$nextTick(() => {
          this.$refs.mainView.fillData(productId);
        });
      },
      /**
       * 打开可选配送页面
       * @param productId
       */
      openUnselectedPage (productId,dealPrice,type) {
          this.mainVisible = true;
          this.$nextTick(() => {
            this.$refs.mainView.fillData(productId,dealPrice,type);
          });
      },
      /**
       * 打开进入交易配送页面
       * @param productId
       */
      openIntoTradePage (productId) {
          this.productId = productId;// 传递Id
          this.intoTradeViewVisible = true;
          this.$nextTick(() => {
            this.$refs.intoTradeView.fillData(productId);
          });
      },
      /**
       * 预生成合同
       */
      generate () {
        generateContract().then(res => {
          this.$message({
            message: res.success == true ? res.data : res.message,
            type: res.success == true ? "success" : "error",
            onClose: () => {
              this.list();
            }
          })
        })
      },
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryProductList(this.resData, this.query).then(res => {
          this.resData = res.data
          if (res.data.pageNum === 0) {
            this.resData.pageNum = 1;
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
      // 重置用户表单
      resetForm () {
        /*  this.$refs['form'].resetFields()*/
        this.query = this.metaForm();
        this.list();
      },


      Excel(){
        this.lyfloading = true;
        this.resData.orderBy = this.currentOrder;
        hospitalSelectProductSenderExcel(this.resData, this.query).then(res => {
          this.lyfloading = false;
          let headers = res.headers;
          let title = ""
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data,title,"application/vnd.ms-excel")
        }).catch(() => {
          this.lyfloading = false;
        })
      },


      // ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list();
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list();
      },
      sortChange(value){
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
      }
    }
  }
</script>

