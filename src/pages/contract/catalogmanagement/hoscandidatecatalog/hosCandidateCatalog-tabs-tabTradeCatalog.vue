<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" :inline="true" class="table-form" size="small">
                <el-form-item class="width-120">
                  <el-input size="small" v-model="query.productName" maxlength="200" placeholder="品名" @keyup.enter.native="searchEnterFun"></el-input>
                </el-form-item>
                <el-form-item class="width-120">
                  <el-input  size="small" v-model="query.manufactureName" maxlength="200" placeholder="生产企业" @keyup.enter.native="searchEnterFun"></el-input>
                </el-form-item>
                <el-form-item class="width-120">
                  <el-select size="small" clearable v-model="query.basicFlag" placeholder="基药类型">
                    <el-option-group
                      key="基药类型"
                      label="基药类型">
                      <el-option
                        v-for="item in sources"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-option-group>
                  </el-select>
                </el-form-item>
            <el-form-item class="width-120">
                  <el-select size="small" clearable v-model="query.bargainState" placeholder="议价状态">
                    <el-option-group
                      key="议价状态"
                      label="议价状态">
                      <el-option
                        v-for="item in bargainStateDatas"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-option-group>
                  </el-select>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="success" @click="searchEnterFun">查询</el-button>
                <el-button size="small" type="warning" @click="reset">重置</el-button>
               </el-form-item>
        </el-form>


      <!-- 表格列表 -->
      <div class="tableset">
        <el-table :data="resData.list"
                  border
                  stripe
                  @selection-change="handleSelectionChange"
                  @sort-change="sortChange">
          <!--通用名、产品名、商品名、剂型、规格、转换比、单位、包材、生产企业、申报企业、是否签订两票制、总分、参考价、企业报价、历史采购量、基药标记、其他医院选择数量（点击数量查看详细）、已选配送数量-->
          <el-table-column align="center" type="selection" width="40"></el-table-column>
          <el-table-column label="通用名" prop="NAMECHN" sortable="custom" width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" prop="productName" min-width="150">
            <template slot-scope="scope">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i v-if="scope.row.crcount>0?true:false" class="ico icon-qu"></i>
                    <i v-if="scope.row.basicFlag == 0?false:true" class="ico icon-jc"></i>
                    <i v-if="scope.row.healthFlag>0?true:false" class="ico icon-yi"></i>
                    <i v-if="scope.row.twoflag > 0" class="ico icon-liang"></i>
                  </div>
                </li>
                <li>
                  <div class="text-inline" :title="scope.row.productName">{{ scope.row.productName }}</div>
                  <div class="text-inline" :title="scope.row.doseageFormName + scope.row.tradeName">{{ scope.row.doseageFormName }}{{scope.row.tradeName}}</div>
                </li>
              </ul>
            </template>


           <!-- <template slot-scope="scope">
              <div class="text-inline" :title="scope.row.productName">{{ scope.row.productName }}</div>
              <div class="text-inline" :title="scope.row.doseageFormName">(剂型：{{scope.row.doseageFormName}})</div>
              <div class="text-inline" :title="scope.row.tradeName">(商品名：{{ scope.row.tradeName }})</div>
            </template>-->
          </el-table-column>
          <el-table-column label="产品信息" prop="drug_Detail" min-width="150">
            <template slot-scope="scope">
              <div class="text-inline"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+'('+scope.row.wrapName+')'">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} ({{scope.row.wrapName}}))
              </div>
              <div class="text-inline" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>

          <el-table-column label="申报企业" prop="BIDORGNAME" sortable="custom" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.bidOrgName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="目录类型" prop="CATALOGAREA" width="90" sortable="custom" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.catalogArea }}</span>
            </template>
          </el-table-column>

          <el-table-column label="参考价" prop="MINPRICE" sortable="custom" width="70" align="right" header-align="left">
            <template slot-scope="scope">
              <!--<el-tooltip effect="dark"  placement="top">
                <div slot="content">
                  {{referencePrice(scope.row.rminPrice,scope.row.bjPrice,scope.row.hbPrice,scope.row.tjPrice,scope.row.catalogAreaFlag)}}
                </div>
                <span>{{priceFormat(scope.row.rminPrice)}}</span>
              </el-tooltip>-->
              <span>{{priceFormat(scope.row.rminPrice)}}</span>
            </template>
          </el-table-column>

          <!--<el-table-column label="候选目录" prop="CATALOGAREA" width="70" sortable="custom" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.resState == 1" class="red">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>-->

          <el-table-column label="企业报价" prop="BIDPRICE" sortable="custom" width="170" align="center">
           <!-- <template slot-scope="scope">
              <span v-if="!bidPriceDataForA(scope.row.bhiBidPrice)">
                {{ bidPriceData(scope.row.resState,scope.row.bidPrice) }}
              </span>
              <span href="javascript:" v-if="bidPriceDataForA(scope.row.bhiBidPrice)" >
                {{bhiBidPriceData(scope.row.bhiBidPrice,scope.row.talkType)}}
              </span>
            </template>-->


            <template slot-scope="scope">

              <span v-if="!bidPriceDataForA(scope.row.bhiBidPrice)">
              {{ bidPriceData(scope.row.resState,scope.row.bidPrice) }}
              </span>
              <a href="javascript:" v-if="bidPriceDataForA(scope.row.bhiBidPrice)" @click="bargainingDetails(scope.row.productId)" >
                {{bhiBidPriceData(scope.row.bhiBidPrice,scope.row.talkType)}}
              </a>

              <range-bar :rangeData="[scope.row.bidPrice,scope.row.pminPrice,scope.row.pmaxPrice]"></range-bar>
            </template>
          </el-table-column>

          <el-table-column label="状态" prop="BASICFLAG" sortable="custom" width="65" align="center">
            <template slot-scope="scope">
              <div v-html="bargainState(scope.row.resState,scope.row.confirmFlag)">
                {{ bargainState(scope.row.resState,scope.row.confirmFlag)}}
              </div>
            </template>
          </el-table-column>


          <el-table-column label="其它医院" prop="OTHERHOSCOUNT" sortable="custom" width="70" align="right">
            <template slot-scope="scope">
              <a href="javascript:;" @click="hosSelectionHos(scope.row.productId)">{{ scope.row.otherHosCount }}</a>
              <!--<span></span>-->
            </template>
          </el-table-column>
          <el-table-column label="已选配送" prop="SENDER_COUNT" sortable="custom" width="70" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.senderCount }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="议价参考价" prop="REFERENCE_PRICE" sortable="custom" width="80" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.referencePrice }}</span>
            </template>
          </el-table-column>-->

          <!--<el-table-column label="两票制" prop="TWOVOTECOU" sortable="custom" width="60" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.twoflag == 0" style="color:red">未签订</span>
              <span v-if="scope.row.twoflag != 0">已签订</span>
            </template>
          </el-table-column>

          <el-table-column label="基药类型" prop="BASICFLAG" sortable="custom" width="70" align="center">
            <template slot-scope="scope">
              <span>{{ basicFlagData(scope.row.basicFlag)}}</span>
            </template>
          </el-table-column>-->


          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
              <div class="operates">
                <a v-if="scope.row.alternativeBargaining<=0" @click="showAlternativeBargainingForone(scope.row)" >议价</a>
                <!--<a class="flo-left" v-if="scope.row.alternativeBargaining>0" @click="delAlternativeBargainingForone(scope.row.productId)" >删除议价</a>-->
                <a class="red" @click="deleteThis(scope.row.productId)" >移除</a>
                <a v-if="scope.row.dealPrice>0?true:false" @click="chooseSender(scope.row.productId,scope.row.dealPrice)" >选择配送</a>
              </div>
            </template>
          </el-table-column>


        </el-table>
      </div>

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
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button size="small" type="success" @click="gotoCatalogManagementBasicDrugDataPage()">新增</el-button>
          <el-button type="danger" size="small" @click="deleteBatchList()">移除本院目录</el-button>
          <!--<el-button size="small" type="success" @click=""><a style="color:#fff;" href="/#/CONTRACT/catalogmanagement/catalogManagementBasicDrugData">新增</a></el-button>-->
          <el-button size="small" type="warning" @click="Excel()">导出</el-button>
        </div>
      </div>
      <!--  ====================================== 弹窗 ====================================== -->
      <!--1.查看选择医院弹窗-->
      <el-dialog title="查看选择医院" :visible.sync="showHos" :before-close="closeForm" width="60%">
        <el-form :inline="true" ref="showHosDataQuery" :model="showHosDataQuery" class="table-form" size="small" onsubmit="return false;" >
          <el-form-item>
            <el-input v-model="showHosDataQuery.name" placeholder="医院名称" @keyup.enter.native="searchEnterFunView"></el-input>
          </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFunView">查询</el-button>
          </el-form-item>
        </el-form>

          <el-table
            :data="showHosData.list"
            style="width: 100%"
            max-height="400"
            min-height="250"
            border
            stripe>
            <el-table-column label="医院名称">
              <template slot-scope="scope">
                <span>{{ scope.row.name == null?".":scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="医院所属区域">
              <template slot-scope="scope">
                <span>{{ scope.row.nameChn == null?"":scope.row.nameChn}}</span>
              </template>
            </el-table-column>
            <el-table-column label="医院级别">
              <template slot-scope="scope">
                <span>{{ scope.row.gradeName == null?"":scope.row.gradeName}}</span>
              </template>
            </el-table-column>

          </el-table>
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :page-sizes="[10, 20, 30]"
            :total="showHosData.total"
            :page-size="showHosData.pageSize"
            :page-count="showHosData.pages"
            :current-page.sync="resData.pageNum">
          </el-pagination>
        </div>
      </el-dialog>

      <!--2.加入议价-->
      <el-dialog title="加入议价" :visible.sync="showAlternativeBargaining" :before-close="closAlternativeBargaining" width="50%" :key="this.bargainKey">
        <div class="form-view">
          <el-form ref="AlternativeBargainingText" :rules="rules" :model="AlternativeBargainingText" inline>
            <el-row :gutter="24">
              <el-col :span="8">
                <strong>本院价格：</strong>
                <span class="highline">{{priceFormat(AlternativeBargainingText.bidPrice) == ""?"无":priceFormat(AlternativeBargainingText.bidPrice)}}</span>
              </el-col>
              <el-col :span="8">
                <strong>北京市最低价：</strong>
                <span class="highline">{{priceFormat(AlternativeBargainingText.minPrice) == ""?"无":priceFormat(AlternativeBargainingText.minPrice)}}</span>
              </el-col>
              <el-col :span="8">
                <strong>其他医院价格：</strong>
                <template v-if="minPrice">
                  <span class="highline">{{minPrice}}--{{maxPrice}}</span>
                  <a href="javascript:;" @click="priceDetails()">查看</a>
                </template>
                <template v-else>
                  <span>无</span>
                </template>
              </el-col>
            </el-row>
            <hr>
            <el-form-item label="请设置议价时间：" label-width="150px" prop="time">
              <el-date-picker
                style="width:426px !important;"
                :unlink-panels=true
                v-model="AlternativeBargainingText.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="设定开始日期"
                end-placeholder="设定结束日期"
                size="small"
                :default-time="[this.nowDate, '10:00:00']"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="请设置参考价：" label-width="150px">
              <el-input v-model="AlternativeBargainingText.referencePrice" style="width:426px" size="small"></el-input>
            </el-form-item>
            <el-form-item label="请填写备注：" label-width="150px">
              <el-input type="textarea" :rows="3" maxlength="4000" style="width:426px" placeholder="请输入备注内容" v-model="AlternativeBargainingText.textarea"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="closAlternativeBargaining()" class="el-button-pale" size="small">取消</el-button>
          <el-button type="primary" @click="insertAlternativeBargaining()" size="small">发送</el-button>
        </span>
      </el-dialog>

      <!--3.议价详情-->
      <el-dialog title="查看议价详情" :visible.sync="showBargainingDetails" :before-close="closeBargainingDetails" width="60%">
        <el-form :inline="true" ref="bargainingDetailsData" :model="bargainingDetailsData">
          <el-table
            :data="bargainingDetailsData.list"
            style="width: 100%"
            max-height="400"
            border
            stripe>
            <el-table-column label="医院名称"  :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="报价">
              <template slot-scope="scope">
                <span>{{ scope.row.bidPrice }}</span>
              </template>
            </el-table-column>

            <el-table-column label="报价日期">
              <template slot-scope="scope">
                <div>
                  <el-popover
                    ref="popover1"
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    content= "">
                    {{scope.row.bidTime}}
                  </el-popover>
                  <el-span v-popover:popover1>{{ scope.row.bidDate }}</el-span>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="确认日期">
              <template slot-scope="scope">
                <div>
                  <el-popover
                    ref="popover2"
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    content= "">
                    {{scope.row.confirmTime}}
                  </el-popover>
                  <el-span v-popover:popover2>{{ scope.row.confirmDate }}</el-span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <!-- 表格分页 -->
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange4"
            @current-change="handleCurrentChange4"
            :page-sizes="[10, 20, 30]"
            :total="bargainingDetailsData.total"
            :page-size="bargainingDetailsData.pageSize"
            :page-count="bargainingDetailsData.pages"
            :current-page.sync="bargainingDetailsData.pageNum">
          </el-pagination>
        </div>
      </el-dialog>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryHosCandidateCatalogListTabTradeCatalog,queryHosCandidateCatalogListTabJoinedExportExcel,insertAlternativeBargainingHttp,delAlternativeBargainingHttp,findSectionPriceHttp} from 'src/axios/contract/catalogmanagement/hosCandidateCatalogType'
  import {findSelectionHos,deleteBatchPurchaseList,bargainingDetailsHttp} from "src/axios/contract/catalogmanagement/basicDrugDataType";
  import fileUpload from 'js-file-download'
  import {priceFormat} from "src/utils"
  import { keyBoardEnter } from "src/utils"
  import moment from "moment";
  // import ElInput from '../../../../../node_modules/element-ui/packages/input/src/input.vue'

  export default {
    // components: {ElInput},
    data () {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        },
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder: undefined,
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        showHos:false,//选择医院弹框状态
        showHosDataQuery:{name:""},
        showHosData:this.metaData(),
        multipleSelection:[],//多选框选择状态
        sources :[
          {label:'全部',value:''},
          {
            label: '非基药',
            value: '0'
          },{
            label: '国家基药',
            value: '1'
          },{
            label: '北京增补',
            value: '2'
        }],
        //备选议价相关
        AlternativeProductId:"",
        AlternativeBargainingText:this.alternativeBargainingTextData(),
        showAlternativeBargaining:false,
        minPrice:"",
        maxPrice:"",
        bargainingDetailsData:this.metaData(),
        showBargainingDetails:false,
        bargainStateDatas:[
          {
            label: '全部',
            value: ''
          },
          {
            label: '待议价',
            value: '1'
          },
          {
            label: '议价中',
            value: '2'
          },
          {
            label: '议价完成',
            value: '3'
          },
        ],
        nowDate:"",
        bargainKey:0,
        // bargainingDetailsData:this.metaData(),
        // showBargainingDetails:false,
        bargainingDetailsProductId:"",
        rules: {
          time: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        }
      }
    },
    created () {
      this.list();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
      alternativeBargainingTextData (){
        return {
          bidPrice:"",
          minPrice:"",
          textarea:"",
          time:"",
          referencePrice:"",
          // bidPrice:"",
          // minPrice:""
        }
      },
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
          productName: "",
          manufactureName: undefined,
          basicFlag:undefined
        }
      },
      toggleHos() {
        this.showHos = !this.showHos
      },
      closeForm(){
        this.toggleHos();
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        console.log(this.resData);
        this.resData.orderBy = this.currentOrder;
        queryHosCandidateCatalogListTabTradeCatalog(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data;
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
          }
        })
      },
      // -------------选择医院模态框查询----------
      //点击查询按钮查询的时候
      hosSelectionSourch(){
        findSelectionHos(this.productId,this.showHosDataQuery,this.showHosData,1).then(res => {
          this.showHosData = res.data;
          this.showHos = true;
        })
      },
      //  第一次弹开
      hosSelectionHos(id) {
        //每次弹出来的时候把搜索框清空
        this.showHosDataQuery.name = "";
        this.productId = id;
        this.hosSelectionSourch("");
      },
      /*//点击查询按钮查询的时候
      hosSelectionHosForSelected(hosName) {
        this.hosSelectionSourch(hosName);
      },
*/
      deleteThis(productId){
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBatchPurchaseList(productId).then(res=>{
            this.$message({
              message: res.success == true ? '删除成功' : '删除失败',
              type: res.success == true ? 'success' : 'error'
            });
            this.list();
          })
        }).catch(()=>{})
      },
      deleteBatchList(){

        let ids = [];
        this.multipleSelection.map(function(item,key,ary) {
          ids.push(item.productId);
        });

        //如果当前选择数据都未加入到了目录那么就return 不使他提交
        if(ids.length==0){
          this.$message({
            message: '请选择要删除的条目',
            type: 'warning'
          });
          return;
        }

        deleteBatchPurchaseList(ids).then(res=>{
          if(res.data>0){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.list();
          }
        })
      },
      gotoCatalogManagementBasicDrugDataPage(){
        this.$router.push({path:'/CONTRACT/catalogmanagement/catalogManagementBasicDrugData'});
      },
      //重置
      reset(){
        this.query = this.metaQuery();
        this.list();
      },
      //企业报价
      //如果有议价价格那么无条件填写 bhiBidPrice ，如果没有议价价格那么 当resState == 1 显示result_bid_item 的bid_price 否则显示 待谈判
      bidPriceData(resState,bidPrice){
        if(resState == 1){
          return this.priceFormat(bidPrice);
        }else{
          return "待谈判"
        }
      },

      bhiBidPriceData(bhiBidPrice,talkType){
        if(talkType == "1"){
          return bhiBidPrice+"(议价)";
        }else if(talkType == "3"){
          return bhiBidPrice+"(降价)";
        }
      },
      //参考价
      referencePrice(rMinPrice,bjPrice,hbPrice,tjPrice,catalogAreaFlag) {

        if (catalogAreaFlag > 0) {
          return "全国最低价" + priceFormat(rMinPrice);
        } else {
          return "河北最低价:" + ((hbPrice != null && hbPrice != '') ? this.priceFormat(hbPrice) : '无') + "," + "天津最低价:" + ((tjPrice != null && tjPrice != '') ? this.priceFormat(tjPrice) : '无') + "," + "北京最低价:" + ((bjPrice != null && bjPrice != '') ? this.priceFormat(bjPrice) : '无');
        }
      },
      //基药标记
      basicFlagData(basicFlag){
        if(basicFlag==0){
          return "非基药";
        }else if(basicFlag == 1){
          return "国家基药";
        }else if(basicFlag==2){
          return "北京增补";
        }else{
          return "";
        }
      },
      Excel(){
        this.lyfloading = true;
        queryHosCandidateCatalogListTabJoinedExportExcel(this.resData, this.query).then(res => {
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
        }).catch(() => {
          this.lyfloading = false;
        })
      },
      //议价弹出框显示
      showAlternativeBargainingForone(row){
        //查出数据之前先清理干净，预防残留上次数据
        this.minPrice = "";
        this.maxPrice = "";
        this.AlternativeBargainingText = this.alternativeBargainingTextData();

        this.AlternativeBargainingText.bidPrice =  row.bidPrice;
        this.AlternativeBargainingText.minPrice =  row.minPrice;

        findSectionPriceHttp(row.productId).then(res=>{
          if(res.message == 'SUCCESS'){
            this.minPrice = res.data.minPrice;
            this.maxPrice = res.data.maxPrice;
          }
        })

        this.AlternativeProductId = row.productId;
       this.nowDate =  moment(new Date()).format("HH:mm:ss")

        this.showAlternativeBargaining = true;
      },
      //关闭窗口
      closAlternativeBargaining(){
        this.bargainKey = (this.bargainKey+1);
        this.showAlternativeBargaining = false;
      },
      //加入议价
      insertAlternativeBargaining(){
        console.log(this.AlternativeBargainingText.time);
        if(this.AlternativeBargainingText.time == null || this.AlternativeBargainingText.time ==""){
          this.$message({
            message: '议价时间不能为空',
            type: 'warning'
          });
          return;
        }
        insertAlternativeBargainingHttp(this.AlternativeProductId,this.AlternativeBargainingText).then(res=>{
          if(res.data>0){
            this.$message({
              message: '加入成功',
              type: 'success'
            });
            this.list();
            this.showAlternativeBargaining = false;
          }else{
            this.$message({
              message: '系统错误',
              type: 'error'
            });
          }
        })
      },
      //删除备选议价
      delAlternativeBargainingForone(productId){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {


          let productIds = [];
          productIds.push(productId);
          delAlternativeBargainingHttp(productIds).then(res=>{
            if(res.data>0){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.list();
            }
          })


        }).catch(()=>{
          /* this.$message({
             message: '已取消操作',
             type: 'info'
           });*/
        });
      },
      //议价详情
      priceDetails(){
        bargainingDetailsHttp(this.AlternativeProductId).then(res=>{
          this.bargainingDetailsData = res.data;
          if(this.bargainingDetailsData.pageNum === 0){
            this.bargainingDetailsData.pageNum =1;
          }
          this.showBargainingDetails = true;
        })
      },
      //关闭议价详情
      closeBargainingDetails(){
        this.showBargainingDetails = false;
      },
      bargainState(resState,confirmFlag){
        //如果res_state != 1 且bargain_hos_item 中没有这条数据，那么就是待议价
        if(resState != 1 && (confirmFlag == "" ||confirmFlag == null)){
          return "<span>待议价</span>";
        }

        if(confirmFlag == 0){
          return "<span style='color: orange'>议价中</span>";
        }
/*
        if(confirmFlag == 1 || confirmFlag ==2){
          return "<span style='color: green'>议价完成</span>";
        }*/

      },
//      nowDate(){
//        return moment(new Date()).format("HH:mm:ss")
//      },
      //企业报价 a标签
      bidPriceDataForA(minBidPrice){
        if(minBidPrice != null && minBidPrice != ""){
          return true;
        }else{
          return false;
        }
      },
      closeBargainingDetails(){
        this.showBargainingDetails = false;
      },
      //企业报价
      //参数：目录范围，中标价格,备选议价，采购目录
      //如果有议价价格那么无条件填写 minBidPrice ，如果没有议价价格那么 当resState == 1 显示result_bid_item 的bid_price 否则显示 待谈判
      bidPriceData(resState,bidPrice){
        if(resState == 1){
          return this.priceFormat(bidPrice);
        }else{
          return "待谈判"
        }
      },

      chooseSender(productId,dealPrice){
        this.$router.push({name:'senderHospitalSelectProductSender',params:{productId:productId,dealPrice:dealPrice}});
        //this.$router.push("/contract/contractmanagement/senderHospitalSelectProductSender/" + productId+"/"+dealPrice);
      },
      //-------------------议价详情begin
      bargainingDetails(productId){
        this.bargainingDetailsProductId = productId;
        this.bargainingDetailsList();

      },
      bargainingDetailsList(){
        bargainingDetailsHttp(this.bargainingDetailsProductId,this.bargainingDetailsData).then(res=>{
          this.bargainingDetailsData = res.data;
          if(this.bargainingDetailsData.pageNum === 0){
            this.bargainingDetailsData.pageNum =1;
          }
          this.showBargainingDetails = true;
        })
      },
      //------------------议价详情end
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },

      handleSizeChange2 (val) {
        this.showHosData.pageSize = val
        this.hosSelectionSourch()
      },
      handleCurrentChange2 (val) {
        this.showHosData.pageNum = val
        this.hosSelectionSourch()
      },
      handleSizeChange4 (val) {
        this.bargainingDetailsData.pageSize = val
        this.bargainingDetailsList()
      },
      handleCurrentChange4 (val) {
        this.bargainingDetailsData.pageNum = val
        this.bargainingDetailsList()
      },
      //数据全选操作
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
      searchEnterFunView(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.hosSelectionSourch();
        })
      },
    }
  }
</script>

