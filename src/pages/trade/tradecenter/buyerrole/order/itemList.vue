<template>
  <div>
    <div class="tabs-echo">
      <div class="tabs-echo-left">
        <div class="title">
          <span>订单状态：</span>
          <span class="red" v-if="this.ruleForm.requestValue.order.orderState==='0'">未完成</span>
          <span class="red" v-if="this.ruleForm.requestValue.order.orderState==='1'">未阅读</span>
          <span class="red" v-if="this.ruleForm.requestValue.order.orderState==='2'">已阅读</span>
          <span class="red" v-if="this.ruleForm.requestValue.order.orderState==='3'">已确认</span>
          <span class="red" v-if="this.ruleForm.requestValue.order.orderState==='4'">到货中</span>
          <span class="red" v-if="this.ruleForm.requestValue.order.orderState==='5'">完成</span>
          <span class="red" v-if="this.ruleForm.requestValue.order.orderState==='6'">作废</span>
          <span class="red" v-if="this.ruleForm.requestValue.order.orderState==='7'">缺货</span>
          <span class="red" v-if="this.ruleForm.requestValue.order.orderState==='8'">到货修改</span>
          <span class="red" v-if="this.ruleForm.requestValue.order.orderState==='9'">断货</span>
        </div>
        <div class="tools">
          <el-button type="warning" size="small" @click="goBack">返回</el-button>
        </div>
      </div>
      <div class="tabs-echo-right">
        <div class="padding20">
          <el-form :model="this.ruleForm" ref="ruleForm" label-position="left"
                   label-width="100px" size="small"
                   class="demo-form-inline" :inline="true">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="配送企业：">
                  <span>{{this.ruleForm.requestValue.order.bakSenderName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="买方机构：">
                  <span>{{this.ruleForm.requestValue.order.bakBuyerName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="订单号：">
                  <span>{{this.ruleForm.requestValue.order.orderCode}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="订购金额：">
                  <span>{{ priceFormat(this.ruleForm.requestValue.order.requestTotal) }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="到货金额：">
                  <span>{{ priceFormat(this.ruleForm.requestValue.order.receiveTotal) }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    <div class="process">
      <div class="process-box">
        <el-steps :active="Number(this.ruleForm.requestValue.order.orderState)" align-center v-if="this.ruleForm.requestValue.order.orderState === '6'">
          <el-step title="发送" :description="this.ruleForm.requestValue.order.createDate" ></el-step>
          <el-step title="已阅读" :description="this.ruleForm.requestValue.order.readDate"></el-step>
          <el-step title="作废"></el-step>
        </el-steps>
        <el-steps :active="Number(this.ruleForm.requestValue.order.orderState)" align-center v-if="this.ruleForm.requestValue.order.orderState === '7'">
          <el-step title="发送" :description="this.ruleForm.requestValue.order.createDate" ></el-step>
          <el-step title="已阅读" :description="this.ruleForm.requestValue.order.readDate"></el-step>
          <el-step title="缺货"></el-step>
        </el-steps>
        <el-steps :active="Number(this.ruleForm.requestValue.order.orderState)" align-center v-if="this.ruleForm.requestValue.order.orderState === '8'">
          <el-step title="发送" :description="this.ruleForm.requestValue.order.createDate" ></el-step>
          <el-step title="已阅读" :description="this.ruleForm.requestValue.order.readDate"></el-step>
          <el-step title="断货"></el-step>
        </el-steps>
        <el-steps :active="Number(this.ruleForm.requestValue.order.orderState)" align-center v-if="this.ruleForm.requestValue.order.orderState ==  '2'">
          <el-step title="发送" :description="this.ruleForm.requestValue.order.createDate" ></el-step>
          <el-step title="已阅读" :description="this.ruleForm.requestValue.order.readDate"></el-step>
        </el-steps>
          <el-steps :active="Number(this.ruleForm.requestValue.order.orderState)" align-center v-if="this.ruleForm.requestValue.order.orderState ==  '3'">
            <el-step title="发送" :description="this.ruleForm.requestValue.order.createDate" ></el-step>
            <el-step title="已阅读" :description="this.ruleForm.requestValue.order.readDate"></el-step>
            <el-step title="已发货" :description="this.ruleForm.requestValue.order.confirmDate"></el-step>
          </el-steps>
          <el-steps :active="Number(this.ruleForm.requestValue.order.orderState)" align-center v-if="this.ruleForm.requestValue.order.orderState ==  '4'">
            <el-step title="发送" :description="this.ruleForm.requestValue.order.createDate" ></el-step>
            <el-step title="已阅读" :description="this.ruleForm.requestValue.order.readDate"></el-step>
            <el-step title="已发货" :description="this.ruleForm.requestValue.order.confirmDate"></el-step>
            <el-step title="到货中" :description="this.ruleForm.requestValue.order.prcoessDate" ></el-step>
          </el-steps>
          <el-steps :active="Number(this.ruleForm.requestValue.order.orderState)" align-center v-if="this.ruleForm.requestValue.order.orderState ==  '5'">
            <el-step title="发送" :description="this.ruleForm.requestValue.order.createDate" ></el-step>
            <el-step title="已阅读" :description="this.ruleForm.requestValue.order.readDate"></el-step>
            <el-step title="已发货" :description="this.ruleForm.requestValue.order.confirmDate"></el-step>
            <el-step title="到货中" :description="this.ruleForm.requestValue.order.prcoessDate" ></el-step>
            <el-step title="已完成" :description="this.ruleForm.requestValue.order.overDate" ></el-step>
          </el-steps>
      </div>
    </div>
    <div class="tablebox">
      <h3>商品清单</h3>
      <div class="table-form">
        <el-form :inline="true" :model="this.ruleForm" ref="formQuery" class="demo-form-inline">
          <div class="formrow">
          <span>
            <el-input v-model="this.ruleForm.requestValue.bakMedicalName" placeholder="产品名" size="small"></el-input>
          </span>
            <span>
            <el-input v-model="this.ruleForm.requestValue.bakMedicalSpec" placeholder="规格" size="small"></el-input>
          </span>
          <span>
            <el-button type="success" size="small">查询</el-button>
            <el-button type="warning" size="small">重置</el-button>
          </span>
          </div>
        </el-form>
      </div>
      <div class="tableset">
        <el-table :data="this.ruleForm.requestInfo" style="width: 100%" stripe border>
      <!--
          <el-table-column label="药品信息" width="300">
            <template slot-scope="scope" class="drugMessage">
              <p>
                <span class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"></span>
                {{ scope.row.bakProductName }}（商品名：{{ scope.row.bakTradeName }}）
                <span class="ico icon-jc" v-if="scope.row.contractType != '0'"></span>
                <span class="ico icon-qu" v-if="scope.row.regionId == '0'"></span>
              </p>
              <p class="drugCon">规格包装：{{scope.row.bakMedicalSpec}}  中大包装：{{scope.row.bigMiddleRate}}</p>
              <p class="drugCon">生产企业：{{scope.row.bakFactoryEasy}}</p>
            </template>
          </el-table-column>
        -->
          <el-table-column label="产品名" prop="drugDetail">
            <template slot-scope="scope" class="drugMessage">
              <ul class="ico-zt">
                <li class="ico-left">
                  <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"></i>
                  <i class="ico icon-jc" v-if="scope.row.contractType != '0'"></i>
                  <i class="ico icon-qu" v-if="scope.row.regionId != '0'"></i>
                </li>
                <li>  {{ scope.row.bakProductName }}</li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="drugStorage" label="产品信息">
            <template slot-scope="scope">
              <div class="pro-details ellipsis es300 " >
                {{scope.row.bakMedicalSpec}}
                &nbsp;&nbsp; 中大包装:  {{scope.row.bigMiddleRate}}
              </div>
              <div :title="scope.row.bakFactoryEasy" class="pro-details ellipsis es200" v-if="scope.row.bakFactoryEasy!=''">{{scope.row.bakFactoryEasy}}</div>
            </template>
          </el-table-column>

          <el-table-column label="单价" header-align="left" align="right">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.unitPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订购量" header-align="left" align="right">
            <template slot-scope="scope">
              <span>{{scope.row.requestQty }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="advice" label="总到货量" header-align="left" align="right">
            <template slot-scope="scope">
              <span>{{scope.row.receiveQty }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.orderItemState}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="操作" width="120">
            <template slot-scope="scope">
               <a @click="handleGoShow(scope.row.recordId)" class="operation-btn">详情</a>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30]"
            :total="this.ruleForm.requestInfo.total"
            :page-size="this.ruleForm.requestInfo.pageSize"
            :page-count="this.ruleForm.requestInfo.pages"
            :current-page.sync="this.ruleForm.requestInfo.pageNum">
          </el-pagination>
        </div>
        <ul class="explain">
          <li>标记说明：</li>
          <li><i class="ico icon-qu"></i><span>区目录药品</span></li>
          <li><i class="ico icon-jc"></i><span>基本药物目录</span></li>
          <li><i class="ico icon-ji"></i><span>急需药品</span></li>
        </ul>
        <!--<div class="log-box">
          <h3>订单处理记录</h3>
          <ul class="log-con">
            <li>
              <span>2018-03-10 15:54</span>
              订单已完成
            </li>
            <li>无数据</li>
          </ul>
        </div>-->
      </div>
    </div>
    <el-dialog  top="2vh" width="600" :visible.sync="showForm" :before-close="handleClose">
        <el-form ref="form" :model="this.form" label-width="80px">
          <ul class="detail-from-ul">
            <li> 产品名：<span>{{this.form.bakMedicalName}}</span></li>
            <li>商品名：<span>{{this.form.bakTradeName}}</span></li>
          </ul>
          <ul class="detail-from-ul">
            <li>订购金额：<span>{{ priceFormat(this.form.retailPrice) }}</span></li>
            <li>总到货金额：<span>{{ priceFormat(this.form.price) }}</span></li>
          </ul>
          <ul class="detail-from-ul">
            <li>备注：<span>{{this.form.remark}}</span></li>
          </ul>
          <div class="tableset">
            <el-table :data="this.form.stockupList" style="width: 100%" border>
              <el-table-column label="到货日期">
                <template slot-scope="scope">
                  <span>{{tscope.lotNo }}</span>
                </template>
              </el-table-column>
              <el-table-column label="批号">
                <template slot-scope="scope">
                  <span>{{scope.row.lotNo }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="advice" label="到货量">
                <template slot-scope="scope">
                  <span>{{scope.row.stockupQty }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="state" label="销售发票号">
              <template slot-scope="scope">
                <span>{{scope.row.invoiceNo}}</span>
              </template>
            </el-table-column>
              <el-table-column prop="state" label="采购发票号">
                <template slot-scope="scope">
                  <span>{{scope.row.purchaseInvoiceNo}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  // 引入数据请求
  import {itemList,invoiceInfo} from 'src/axios/trade/buyerrole/arrive/buyerTabView/orderList'
  import {priceFormat} from "src/utils";

  export default {
    data() {
      return {
        ruleForm: {
          orderId: '',
          orderItemState:'',
          bakSenderName:'',
          bakBuyerName:'',
          orderCode:'',
          requestTotal:'',
          receiveTotal:'',
          createDate:'',
          readDate:'',
          confirmDate:'',
          prcoessDate:'',
          overDate:'',
          bakMedicalName:'',
          bakProductName:'',
          bakMedicalMode:'',
          bakMedicalSpec1:'',
          requestInfo:[],
          requestValue:{order:{orderState:''}},
          orderState:''
        },
        form: {
          receiveDate:'',
          bakMedicalName:'',
          bakTradeName:'',
          retailPrice:'',
          price:'',
          remark:'',
          receiveDate:'',
          stockupList:[],

        },
        showForm: false, // 表单可见性初始化
      };
    },
    created(){
      var orderId =this.$route.params.orderId;
      this.orderId = orderId;
      this.metaList()
    },
    methods: {
      priceFormat,
      metaList() {
        var orderId= this.orderId;
        itemList(orderId).then(res => {
          this.ruleForm = res.data;
        })
      },
      metaQuery(){
        return {
          name:'',
          specification:''
        }
      },
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 0,
          pageSize: 20,
          size: "",
          startRow: "",
          endRow: "",
          total: 4,
          pages: "",
          prePage: "",
          nextPage: "",
          isFirstPage: true,
          isLastPage: "",
          hasPreviousPage: "",
          hasNextPage: "",
          navigatePages: "",
          navigatepageNums: "",
          navigateFirstPage: "",
          navigateLastPage: "",
          firstPage: "",
          lastPage: "",
          list: []
        }
      },
      goBack() {
        this.$router.go(-1)
      },

      // 打开详情
      handleGoShow (id) {
        invoiceInfo(id).then(res => {
          this.showForm = true;
          this.form = res.data;
        })
      },
      handleClose(done) {
        this.$refs['form'].resetFields();
        this.toggleForm();
      },
      toggleForm() {
        this.showForm = !this.showForm
      },
    },
    // ------------------------------------------------- 处理方法 ----------------------------------------
    //  获取用户分页列表
    // ************************ 分页操作 ************************
    handleSizeChange (val) {
      this.ruleForm.requestInfo.pageSize = val;
      this.metaList()
    },
    handleCurrentChange (val) {
      this.ruleForm.requestInfo.pageNum = val;
      this.metaList()
    }
  }
</script>
