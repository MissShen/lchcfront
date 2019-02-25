<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
          <el-form-item class="width-100">
            <el-input v-model="query.bargainObject" maxlength="200" placeholder="议价对象" size="small" @keyup.enter.native="searchEnterFun"></el-input>
          </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.productName" maxlength="200" placeholder="品名" size="small" @keyup.enter.native="searchEnterFun"></el-input>
              </el-form-item>
          <el-form-item class="width-100">
            <el-input v-model="query.spec" maxlength="200" placeholder="规格" size="small" @keyup.enter.native="searchEnterFun"></el-input>
          </el-form-item>
            <el-form-item class="width-100">
              <el-input v-model="query.manufactureName" maxlength="200" placeholder="企业名称" size="small" @keyup.enter.native="searchEnterFun"></el-input>
              </el-form-item>
          <el-form-item class="width-100">
            <el-select size="small" v-model="query.healthFlag" placeholder="医保标记">
              <el-option-group
                key="医保标记"
                label="医保标记">
                <el-option
                  v-for="item in query.healthFlag"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item class="width-100">
            <el-select size="small"  v-model="query.basicFlag" placeholder="基药标记">
              <el-option-group
                key="基药标记"
                label="基药标记">
                <el-option
                  v-for="item in basicFlagSelection"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item class="width-100">
            <el-select size="small" v-model="query.twoVoteId" placeholder="两票制">
              <el-option-group
                key="两票制"
                label="两票制">
                <el-option
                  v-for="item in twoVotes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item class="width-100">
            <el-select size="small" v-model="query.state" placeholder="状态">
              <el-option-group
                key="状态"
                label="状态">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
              <el-button type="warning" size="small" @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="议价对象" prop="bargainObjectName" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.bargainObjectName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="通用名" prop="name_Chn" sortable="custom" :show-overflow-tooltip="true">
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
                    <i class="ico icon-yi" v-if="scope.row.healthFlag=1"></i>
                    <i class="ico icon-liang" v-if="scope.row.twoVoteId >'0'"></i>
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
              <div class="pro-details text-inline"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+'('+scope.row.wrapName+')'+'('+scope.row.doseageFormName+')'">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} ({{scope.row.wrapName}}) ({{ scope.row.doseageFormName }})
              </div>
              <div class="pro-details text-inline" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="成交\参考价" :render-header="labelHead" width="70" align="right" prop="bid_Price" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.bidPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="议价价格区间" width="180" align="center" prop="bid_Price" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <template v-if="scope.row.maxBidPrice!=null || scope.row.minBidPrice!=null">
                <range-bar :rangeData="[scope.row.bidPrice,scope.row.minBidPrice,scope.row.maxBidPrice,1]"></range-bar>
              </template>
              <!--<div v-else-if="scope.row.maxBidPrice!=null">
                最高价:{{ priceFormat(scope.row.maxBidPrice) }}
              </div>
              <div v-else-if="scope.row.minBidPrice!=null">
                最低价:{{ priceFormat(scope.row.minBidPrice) }}
              </div>-->
              <template v-else>
                待议价
                <range-bar :rangeData="[scope.row.bidPrice,scope.row.minBidPrice,scope.row.maxBidPrice]"></range-bar>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="医院议价" width="90" align="right" prop="bid_Price" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.referencePrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="本次报价" width="90" align="right" prop="currentPrice" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.currentPrice>0 && scope.row.bidFlag==1">{{ priceFormat(scope.row.currentPrice) }}</span>
              <span v-if="scope.row.bidFlag==2">拒绝</span>
              <span v-if="scope.row.bidFlag==0">未报价</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="90" align="right" header-align="left" prop="currentPrice" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.bidFlag=='0'">
                未报价
              </span>
              <span v-if="scope.row.bidFlag=='1' && scope.row.confirmFlag=='0'">
                待确认
              </span>
              <span v-if="scope.row.bidFlag=='1' && scope.row.confirmFlag=='1'">
                已确认
              </span>
              <span v-if="scope.row.bidFlag=='1' && scope.row.confirmFlag=='2'">
                已拒绝
              </span>
              <span v-if="scope.row.bidFlag=='2'">
                已拒绝
              </span>
            </template>
          </el-table-column>
          <el-table-column label="议价开始\议价结束" :render-header="labelHead" width="76" prop="startDate" >
            <template slot-scope="scope">
              <span>{{ moment( scope.row.startDate ).format("YYYY-MM-DD") }}</span>
              <br>
              <span>{{ moment(scope.row.endDate ).format("YYYY-MM-DD") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
               <div class="operates">
                 <template v-if="scope.row.canOperate == 1">
                   <span><a href="javascript:;" class="blue-bord" v-if="scope.row.bidFlag == 0" @click="openQuotedPrice(scope.row.bargainHosItemId)">报价</a></span>
                   <span><a href="javascript:;" class="red-bord" v-if="scope.row.bidFlag == 0" @click="refuseFlag(scope.row.bargainHosItemId)">拒绝</a></span>
                 </template>
                 <span><a href="javascript:;" class="blue-bord" @click="selectRemark(scope.row.bargainHosItemId)">查看</a></span>
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

      <el-dialog title="报价" :visible.sync="showQuotedPrice"  width="25%" @close="closeQuotedPrice()">
        <el-form ref="quotedPriceForm" :rules="rules" :model="quotedPriceForm">
          <!--<div class="formrow" style="width:80%">-->
          <el-form-item prop="price">
            请输入价格 <span class="red">(报价只能填写非零非负数的两位小数)</span>
            <el-input v-model="quotedPriceForm.price" size="small"></el-input>
          </el-form-item>
          <el-form-item prop="refuseRemark">
            请输入备注 ：
            <el-input type="textarea" v-model="quotedPriceForm.refuseRemark" class="w100"></el-input>
          </el-form-item>

          <!--</div>-->
        </el-form>
        <span slot="footer">
          <el-button @click="closeQuotedPrice()" class="el-button-pale" size="small">取消</el-button>
          <el-button type="primary" @click="saveQuotedPrice()" size="small">发送</el-button>
        </span>
      </el-dialog>

      <!--备注-->
      <el-dialog title="查看备注" :visible.sync="showRemark" :before-close="closeFactoryRemark" width="30%">
        <el-form ref="bargainTimeForm" :model="remark">
          <el-form-item prop="hosRemark">
            医院备注:
            <el-input type="textarea" v-model="remark.hosRemark" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item prop="refuseRemark">
            企业备注:
            <el-input type="textarea" v-model="remark.factoryRemark" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="closeFactoryRemark()" size="small" class="el-button-pale">关闭</el-button>
        </span>
      </el-dialog>


    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryBargainQuoteList,selectRemarkInfoHttp,saveBargainQuotePrice, updateBargainFlag} from 'src/axios/contract/bargainmanagement/bargainquote/bargainQuote'
  import {priceFormat,labelHead} from "src/utils"
  import moment from 'moment'
  import { keyBoardEnter } from "src/utils"
  import RangeBar from 'src/components/RangeBar'

  export default {
    components: {moment,RangeBar},
    data () {
      return {
        currentOrder:undefined, //分页的时候缓存
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        checked: true,
        productId : undefined,
        bidPrice : undefined,
        showQuotedPrice:false,
        quotedPriceForm:{
          price:'',
          refuseRemark:''
        },
        bargainHosItemId:"",
        rules: this.metaRule(),  // 表单验证初始化
        showRemark : false,
        remark:{
          factoryRemark:"",
          hosRemark : ""
        },
        bargainTimeForm:{
          time:"",
        },
        basicFlagSelection:[{
          value:'',
          label:'全部'
        },{
          value:'0',
          label:'非基药'
        }, {
          value: '1',
          label: '国家基药'
        }, {
          value: '2',
          label: '北京基药'
        }],
        twoVotes:[
          {
            label : '全部',
            value : ''
          },
          {
            label : '已签订',
            value : '1'
          },
          {
            label : '未签订',
            value : '0'
          }
        ],
        options: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '医院确认'
          }, {
            value: '2',
            label: '医院拒绝'
          }, {
            value: '3',
            label: '企业报价'
          }, {
            value: '4',
            label: '企业拒绝'
          }],
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
      labelHead,
      moment,
      metaData () {
        return {
            orderBy: undefined,
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
          bargainObject : undefined,
          productName : undefined,
          manufactureName : undefined,
          healthFlag: [],
          spec :undefined,
          basicFlag :  undefined,
          twoVoteId : undefined,
          state :undefined,

        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  列表查询
      list () {
        this.resData.orderBy = this.currentOrder;
        queryBargainQuoteList(this.resData, this.query).then(res => {
          this.resData = res.data
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
      },
      metaRule (){
        var priceRule = function(rule, value, callback) {
          let regExp = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
          if(value!=""){
            if (regExp.test(value) === false) {
              callback(new Error('只能填写非零非负数的两位小数'));
            } else {
              callback();
            }
          }else{
            callback(new Error('价格不能为空、请填写价格'));
          }
        }
        return {
          price :{required:true,validator: priceRule, trigger: 'submit'},
        }
      },
      //  打开价格窗口
      openPricePage(id) {
        this.$prompt('请输入价格(报价只能填写非零非负数的两位小数)', '报价', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          saveBargainQuotePrice(id, value).then(res => {
            console.log(res)
            this.$message({
              message: res.data,
              type: 'success',
              onClose: () => {
                this.list();
              }
            })
          })
        });
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
      //点击查看按钮显示备注
      selectRemark(id){
        selectRemarkInfoHttp(id).then(res => {
          this.remark.factoryRemark =   res.data.refuseRemark;
          this.remark.hosRemark =   res.data.remark;
          this.showRemark = true;
        })
      },
      //  拒绝
      refuseFlag(id) {
        this.$prompt('请输入拒绝备注', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[^$]+/,
          inputErrorMessage: '不能为空'
        }).then(({ value }) => {
          if(value!="" && value!=null){
            updateBargainFlag(id,value).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                onClose: () => {
                  this.list();
                }
              })
            })
          }else{
            this.$message.error('不能为空');
          }
        });
      },
      resetForm() {
        this.query = this.metaQuery()
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
      openQuotedPrice(bargainHosItemId){
        this.quotedPriceForm.price = "";
        this.showQuotedPrice = true;
        this.bargainHosItemId = bargainHosItemId;
      },
      closeQuotedPrice(){
        this.$refs['quotedPriceForm'].resetFields();
        this.quotedPriceForm.refuseRemark = '';
        this.showQuotedPrice = false;
      },
      saveQuotedPrice(){
        this.$refs['quotedPriceForm'].validate((valid) => {
          if (valid) {
            saveBargainQuotePrice(this.bargainHosItemId, this.quotedPriceForm.price, this.quotedPriceForm.refuseRemark).then(res => {
              if(res.message == 'SUCCESS'){
                this.$message({
                  message: "报价成功",
                  type: 'success',
                  onClose: () => {
                    this.list();
                  }
                })
                this.showQuotedPrice = false;
              }else{
                this.$message({
                  message: "报价失败",
                  type: 'error'
                })
              }

            })
          }
        })
      },
      closeFactoryRemark(){
        this.showRemark = false
      },
      //  确认提交
      commitFlag(id) {
        this.$confirm(`报价提交后不可再修改报价价格，确认提交？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateBargainFlag(id, '1', '').then(res => {
            console.log(res)
            this.$message({
              message: res.data,
              type: 'success',
              onClose: () => {
                this.list();
              }
            })
          })
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
      }
    }
  }
</script>

