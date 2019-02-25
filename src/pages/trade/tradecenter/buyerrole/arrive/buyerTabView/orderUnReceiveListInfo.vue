<template xmlns="http://www.w3.org/1999/html">
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
        <el-form-item class="width-90">
            <el-input v-model="query.purchaseId" @keyup.enter.native="searchEnterFun"  placeholder="采购单号" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-90">
            <el-input v-model="query.purchaseName" @keyup.enter.native="searchEnterFun" placeholder="品名" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-90">
            <el-input v-model="query.purchaseSpec" @keyup.enter.native="searchEnterFun" placeholder="规格" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-90">
            <el-input v-model="query.productionOrg" @keyup.enter.native="searchEnterFun" placeholder="生产企业" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-90">
            <el-input v-model="query.distributionOrg" @keyup.enter.native="searchEnterFun" placeholder="配送企业" size="small"></el-input>
        </el-form-item>
        <!--0未完成，1未阅读，2已阅读，3已确认，4到货中，5完成，6作废，7缺货，8断货，9到货修改,10.已备完,11备货中-->
        <el-form-item class="width-100">
          <el-select v-model="query.orderItemState" @keyup.enter.native="searchEnterFun"  placeholder="订单状态" size="small">
            <el-option label="" value=""></el-option>
            <el-option label="已确认" value="3"></el-option>
            <!--<el-option label="已到货" value="4"></el-option>-->
            <el-option label="缺货" value="7"></el-option>
            <el-option label="断货" value="8"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="创建日期" class="width-120" v-model="query.searchBenDate" @keyup.enter.native="searchEnterFun"
                          format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
           &nbsp;至&nbsp;
          <el-date-picker type="date" placeholder="创建日期" class="width-120" v-model="query.searchEndDate" @keyup.enter.native="searchEnterFun"
                          format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
        </el-form-item>
        <el-form-item class="width-90">
            <el-input v-model="query.invoiceNumber" @keyup.enter.native="searchEnterFun" placeholder="发票号" size="small"></el-input>
        </el-form-item>
        <el-form-item class="width-60"  v-if="roleCode==='serviceCenter'">
          <el-checkbox  v-model="checkedAll">全部</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="list()" size="small">查询</el-button>
          <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="this.resData.list"
          @sort-change="sortChang"
          border
          stripe
          @selection-change="handleSelectionChange"
          ref="multipleTable"
          >
          <!--@selection-change="handleSelectionChange"-->
          <el-table-column type="selection" width="40" align="center"  :selectable="selectable"></el-table-column>
          <el-table-column label="采购单号" width="75" prop="ooi.purchase_code" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.purchaseCode}}<br/>
                </div>
                <div class="el-tooltip-box">
                  {{ scope.row.purchaseCode}}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="150" prop="ooi.bak_medical_name" sortable="custom">
            <template slot-scope="scope">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i class="ico icon-ji" v-if="scope.row.degreeFlag == '2'"></i>
                    <i class="ico icon-jihui" v-if="scope.row.degreeFlag == '0'"></i>
                    <i class="ico icon-jc" v-if="scope.row.basicMedicantFlag == '1'"></i>
                    <i class="ico icon-qu" v-if="scope.row.isRegion == '1'"></i>
                    <i class="ico icon-liang" v-if="scope.row.twoVoteType != '0'" ></i>
                  </div>
                </li>

                <li>
                  <!--tootip提示气泡-->
                  <!--:enterable="false" 鼠标不可进入tooltip中-->
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div>{{ scope.row.bakMedicalName }}</div>
                      <div>{{ scope.row.bakMedicalMode }}
                        <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                      </div>
                    </div>

                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <!--加class="text-inline"确保内容不折行-->
                      <div class="text-inline">{{ scope.row.bakMedicalName }}</div>
                      <div class="text-inline">{{ scope.row.bakMedicalMode }}
                        <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                      </div>
                    </div>
                  </el-tooltip>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" min-width="100">
            <template slot-scope="scope">

              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  {{scope.row.bakProductSpec}}<br/>
                 <!-- {{getHints(scope.row.bakProductSpec,scope.row.bakWrapName)}}<br/>-->
                  {{getPackHints(scope.row.bakFactoryEasy,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline">{{ scope.row.bakProductSpec}}
                    <span v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null">{{ scope.row.bakWrapName}}</span>
                  </div>
                  <div class="text-inline" >
                    {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
                  </div>
                </div>
              </el-tooltip>

            </template>
          </el-table-column>

          <el-table-column label="配送企业\发单时间" :render-header="labelHead" prop="oo.bak_sender_easy" sortable="custom" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.bakSenderEasy==''">{{ scope.row.bakSenderName }}</span>
              <span v-if="scope.row.bakSenderEasy!=''">{{ scope.row.bakSenderEasy }}</span>
              <div class="text-inline">{{scope.row.createDate}}</div>
            </template>
          </el-table-column>
          <el-table-column label="单价" prop="unit_price" sortable="custom" width="60" header-align="left" align="right">
            <template slot-scope="scope">
              <span> {{ priceFormat(scope.row.unitPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货量\订货量" :render-header="labelHead" prop="ooi.receive_qty" sortable="custom" width="90" header-align="left" align="right">
            <template slot-scope="scope">
              <!--<div>-->
                <!--<el-input v-model="scope.row.amount" size="mini"></el-input>-->
              <!--</div>-->
              <!--<div>{{ scope.row.requestQty }}</div>-->
              <div>
                <template v-if="scope.row.eamount">
                  <el-input v-model="scope.row.stockupQty" size="mini"></el-input>
                </template>
                <template v-else>
                  <a href="javascript:" @click="handleEdit('eamount', scope.row)">{{ scope.row.stockupQty }}
                    <i class="el-icon-edit"></i>
                  </a>
                </template>
              </div>
              <div>{{ scope.row.requestQty }}</div>
              <!--<div>-->
                <!--<template v-if="scope.row.erequestQty">-->
                  <!--<el-input v-model="scope.row.requestQty" size="mini"></el-input>-->
                <!--</template>-->
                <!--<template v-else>-->
                  <!--<a href="javascript:;" @click="handleEdit('erequestQty', scope.row)">{{ scope.row.requestQty }}</a>-->
                <!--</template>-->
              <!--</div>-->
            </template>
          </el-table-column>
          <el-table-column label="到货金额\订购金额" :render-header="labelHead" prop="totalReceiveMoney" sortable="custom" width="90" header-align="left" align="right">
            <template slot-scope="scope">
              <div>{{ priceFormat(scope.row.totalReceiveMoney) }}</div>
              <div>{{ priceFormat(scope.row.totalRequestMoney) }}</div>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="60" prop="ooi.order_item_state" sortable="custom" align="center">
            <template slot-scope="scope">
              <span >{{getFlag(scope.row.orderItemState,scope.row.readyFlag)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="发票号" :render-header="labelHead" width="100" prop="oos.invoice_no" sortable="custom">
            <template slot-scope="scope">
              <!--<p>-->
                <!--<el-input v-model="scope.row.invoiceNo" size="mini"></el-input>-->
              <!--</p>-->
              <!--<p class="martop5"><el-input v-model="scope.row.purchaseInvoiceNo" size="mini"></el-input></p>-->
              <div>
                <template v-if="scope.row.einvoiceNo">
                  <el-input v-model="scope.row.invoiceNo" size="mini"></el-input>
                </template>
                <template v-else>
                  <a href="javascript:" @click="handleEdit('einvoiceNo', scope.row)">{{ scope.row.invoiceNo }}
                    <i class="el-icon-edit"></i>
                  </a>
                </template>
              </div>
              <!--<div>-->
                <!--<template v-if="scope.row.epurchaseInvoiceNo">-->
                  <!--<el-input v-model="scope.row.purchaseInvoiceNo" size="mini"></el-input>-->
                <!--</template>-->
                <!--<template v-else>-->
                  <!--<a href="javascript:" @click="handleEdit('epurchaseInvoiceNo', scope.row)">{{ scope.row.purchaseInvoiceNo }}</a>-->
                <!--</template>-->
              <!--</div>-->
            </template>
          </el-table-column>
          <el-table-column label="批号\有效期" :render-header="labelHead" width="110" prop="oos.lot_no" sortable="custom" align="center">
            <template slot-scope="scope">
              <!--<p><el-input v-model="scope.row.lotNo" size="mini"></el-input></p>-->
              <!--<p class="martop5"><el-input placeholder="yyyy-mm-dd" v-model="scope.row.medicalExpiredDate" size="mini"></el-input></p>-->
              <div class="hold-height">
                <template v-if="scope.row.elotNo">
                  <el-input v-model="scope.row.lotNo" size="mini"></el-input>
                </template>
                <template v-else>
                  <a href="javascript:" @click="handleEdit('elotNo', scope.row)">{{ scope.row.lotNo }}
                    <i class="el-icon-edit"></i>
                  </a>
                </template>
              </div>
              <div class="hold-height">
                <template v-if="scope.row.emedicalExpiredDate">
                  <el-input v-model="scope.row.medicalExpiredDate" size="mini"></el-input>
                </template>
                <template v-else>
                  <a href="javascript:" @click="handleEdit('emedicalExpiredDate', scope.row)">{{ scope.row.medicalExpiredDate }}
                    <i class="el-icon-edit"></i>
                  </a>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="买方机构\收货地址" :render-header="labelHead" width="90" prop="oo.bak_buyer_easy" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip placement="top" :enterable="false">
                <div slot="content">
                  <div class="text-inline" v-if="scope.row.bakBuyerEasy==''">{{ scope.row.bakBuyerName }}</div>
                  <div class="text-inline" v-else>{{ scope.row.bakBuyerEasy }}</div>
                  <div class="text-inline">{{ scope.row.addressAbbr }}</div>
                </div>
                <div class="el-tooltip-box">
                  <div class="text-inline" v-if="scope.row.bakBuyerEasy==''">{{ scope.row.bakBuyerName }}</div>
                  <div class="text-inline" v-else>{{ scope.row.bakBuyerEasy }}</div>
                  <div class="text-inline">{{ scope.row.addressAbbr }}</div>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <!--<el-table-column label="总到货量"  width="90" header-align="left" align="right" prop="ooi.receive_qty" sortable="custom">-->
            <!--<template slot-scope="scope">-->
              <!--{{scope.row.receiveQty}}-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <div class="operates">
                <span>
                <a href="javascript:" class="blue-bord" @click="handleUpdateStockup(scope.row.stockupId,
                           scope.row.invoiceNo,scope.row.purchaseInvoiceNo,scope.row.lotNo,scope.row.medicalExpiredDate,
                           scope.row.stockupQty,scope.row.orderItemId,scope.row.requestQty,scope.row.orderId)"
                   v-if="(scope.row.orderItemState=='3' ||  scope.row.orderItemState=='4')">
                  到货
                </a>
                  </span>
                <span>
                <a href="javascript:" class="green" @click="handleGoEdit(scope.row.orderItemId,scope.row.stockupId,'close')"
                   v-if="(scope.row.orderItemState=='3')">
                  申请作废
                </a>
                <a href="javascript:" class="green" @click="handleUpdateDisabled(scope.row.orderItemId)"
                   v-if="(scope.row.orderItemState=='7' || scope.row.orderItemState=='8')">
                  作废
                </a>
                  <a href="javascript:" class="red" type="text" size="small" @click="complaintThisOne(scope.row.recordId)"
                     v-if="scope.row.orderItemState=='7'||scope.row.orderItemState=='8'">
                  投诉
                </a>

                  </span>

                <!--<div class="red ahand" @click="handleCloseStockup(scope.row.stockupId)"-->
                <!--v-if="(scope.row.orderItemState=='3') && scope.row.stockupId != null && (scope.row.readyFlag == '0' || scope.row.readyFlag == '3')">-->
                        <!--v-if="(scope.row.orderItemState=='3' )">-->
                <!--到货-->
              <!--</div>-->
              <!--<div class="green ahand" @click="handleGoEdit(scope.row.orderItemId,scope.row.stockupId,'close')"-->
                   <!--v-if="(scope.row.orderItemState=='3' )">-->
                <!--申请作废-->
              <!--</div>-->
              <!--<div class="green ahand" @click="handleUpdateDisabled(scope.row.orderItemId)"-->
                         <!--v-if="(scope.row.orderItemState=='8')">-->
                <!--作废-->
              <!--</div>-->
              <!--<div class="red ahand" @click="handleCloseStockup(scope.row.stockupId)"-->
                   <!--v-if="(scope.row.orderItemState=='3') && scope.row.stockupId != null && (scope.row.readyFlag == '0' || scope.row.readyFlag == '3')">-->
                <!--关闭明细-->
                <!--</div>-->
              </div>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 表格分页 -->
      <div class="pagebox">
        <ul class="explain">
          <li><i class="ico icon-qu"></i><span>区目录</span></li>
          <li><i class="ico icon-jc"></i><span>基本药物</span></li>
          <li><i class="ico icon-ji"></i><span>急需药品</span></li>
          <li><i class="ico icon-yi"></i><span>医保药品</span></li>
          <li><i class="ico icon-liang"></i><span>两票制</span></li>
          <li><i class="ico icon-kang"></i><span>抗菌药</span></li>
          <li><i class="ico icon-budan"></i><span>补单</span></li>
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


      <!--  ====================================== 弹窗 ====================================== -->
      <!--&lt;!&ndash;1.申请作废弹窗&ndash;&gt;-->
      <!--<el-dialog title="申请作废" :visible.sync="showForm" :before-close="handleClose" width="45%">-->
          <!--<el-form :model="importForm"  ref="importForm" label-width="100px" size="small"-->
                   <!--label-position="left" class="demo-form-inline" :inline="true">-->
            <!--<el-form-item label="上传附件：" prop="alias">-->
              <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--:on-change="changeFile"-->
                <!--ref="upload"-->
                <!--action=""-->
                <!--:auto-upload="false"-->
                <!--:on-exceed="handleExceed"-->
                <!--:file-list="importForm.fileList">-->
                <!--<el-button size="small">点击上传</el-button>-->
                <!--<div slot="tip" class="el-upload__tip">请上传png,jpg文件</div>-->
              <!--</el-upload>-->
            <!--</el-form-item>-->
            <!--<el-form-item >-->
              <!--<el-input v-model="importForm.type"type="hidden" style="width:75%"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
          <!--<span slot="footer" class="dialog-footer">-->
          <!--<el-button type="primary" size="small" @click="submitUpload">上传</el-button>-->
          <!--<el-button @click="handleClose"  size="small">取消</el-button>-->
        <!--</span>-->
      <!--</el-dialog>-->

      <!--1.申请作废弹窗-->
      <el-dialog title="申请作废" :visible.sync="showForm" :before-close="handleClose" width="45%">
        <div class="alertbox warning">
          <div class="alert-title"><i class="el-icon-warning"></i>请注意</div>
          <div class="alert-content">
            <p>对于状态处于备货环节之前的订单明细，医疗机构可以自行销毁，对于状态为备货、发货或完成的订单明细，如因
              订购数量、到货数量等信息有误，需做废单处理，则需由医疗机构提出作废申请，平台依申请对订单明细执行作废。</p>
            <p>如需申请作废订单明细，请参考模板出具纸质情况说明，加盖本院公章后扫描上传，并在平台页面填写申请说明，请简要
              描述作废原因并写清需作废的订单明细ID。</p>
          </div>
        </div>
        <el-form :model="importForm" ref="importForm" label-width="90px" size="small" inline class="form-view">
          <el-form-item label="模板下载：">
            <a :href="loadFile" download="作废说明模板.docx" class="el-button el-button--default el-button--small">点击下载</a>
          </el-form-item>
          <el-form-item label="上传附件：" prop="alias">
            <el-upload
              :on-change="changeFile"
              ref="upload"
              action=""
              :auto-upload="false"
              accept=".jpg,.png"
              :on-exceed="handleExceed"
              :file-list="importForm.fileList">
              <el-button>点击上传</el-button>
              <span slot="tip" class="gap-20 font-12 red">请上传png,jpg文件</span>
            </el-upload>
            <input v-model="importForm.type" type="hidden" />
          </el-form-item>
          <el-form-item label="作废原因：" >
            <el-input type="textarea" :rows="6" v-model="importForm.nullifyReason"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="submitUpload(importForm.nullifyReason)">上传</el-button>
          <el-button @click="handleClose"  size="small">取消</el-button>
        </span>
      </el-dialog>


      <div class="foot-btn">
        <div class="foot-left">
          <el-button type="primary" @click="commit" size="small">确认到货</el-button>
          <!--<el-button type="warning" >关闭到货</el-button>-->
          <!--<el-button type="warning" @click="getPrintData">打印</el-button>-->
          <el-button type="warning" size="small" @click="exportExcel()">导出excel</el-button>
        </div>
        <div class="foot-right">
          <a class="padding20" target="_blank" href="https://inv-veri.chinatax.gov.cn/">点击进入"国家税务局全国<span class="red">增值税发票查验</span>平台"</a>
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>
  /*0准备，1未阅读，2已阅读，3已确认，4到货中，5完成，6作废，7缺货，8断货，9到货修改*/

  // 引入用户相关请求
  import {querySendOrderItemList,commintReceiveQuery,updateDisabled,deleteCloseStockup,uploadFileToAttachMent,exportEXL} from 'src/axios/trade/buyerrole/arrive/buyerTabView/receiveListInfo'
  import {priceFormat,keyBoardEnter,labelHead} from "src/utils/index";
  import {findRole} from 'src/axios/trade/purchase/purchase';
  import fileUpload from 'js-file-download'
  import {getSpecHints,getPackHints} from "src/utils/validateUtil";
  export default {
    name: "orderList",
    data () {
      return {
        checked:false,
        currentOrder:undefined,
        value2:undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        queryReceive:this.metaReceiveQuery(),//确认到货请求参数
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        remarkShow:true,
        dataList:[],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        options: [{
          value: '选项1',
          label: '到货中'
        },{
          value: '选项2',
          label: '完成'
        },{
          value: '选项3',
          label: '到货修改'
        }],
        checkedAll:false,
        roleCode:'',
        showBargainBody:false,//申请作废 弹框状态
        printList: {
          printData:[],
          printLabel:[
            {'labelName':'采购单号','labelValue':'purchaseCode'},
            {'labelName':'产品名','labelValue':'htmlProductName'},
            {'labelName':'产品信息','labelValue':'htmlSpace'},
            {'labelName':'配送企业','labelValue':'bakSenderName'},
            {'labelName':'单价','labelValue':'unitPrice','width':90,'align':'right','headerAlign':'left'},
            {'labelName':'到/订货量','labelValue':'htmlAmount','width':90,'align':'right','headerAlign':'left'},
            {'labelName':'到货/订购金额','labelValue':'htmlTotalReceiveMoney','width':90,'align':'right','headerAlign':'left'},
            {'labelName':'状态','labelValue':'htmlOrderItemState'},
            {'labelName':'销售/采购发票号','labelValue':'htmlInvoiceNo'},
            {'labelName':'批号/有效期','labelValue':'htmlLotNo'},
            {'labelName':'买方机构/地址','labelValue':'htmlBuyerName'},
            {'labelName':'总到货量','labelValue':'receiveQty','width':90,'align':'right','headerAlign':'left'}
          ]
        },
        gsp: {},
        dialogVisible: false,
        btnText:'fileInput',
        fileType:'1',
        uploadFileList:{
          fileInput:[]
        },
        importForm:{fileList:[],type:0,nullifyReason:''},
        orderItemIdUpload:'',
        stockUpIdUpload:'',
        hasFile:false,
        dataForm:{},
        loadFile: 'static/templateFileNullify.docx'
      }
    },
    created () {
      this.list()
    },
    methods: {
      getSpecHints,
      getPackHints,
      labelHead,
      complaintThisOne(orderItemId){
        this.$router.push("/trade/manage/createTradeComplain/choose/1/"+orderItemId)
      },
      getIsNull(param ){
        if(param === '' || param === null || param === undefined ){
          return ''
        }else {
          return param;
        }
      },
      getPrintData(){
        let _this = this;
        this.printList.printData=this.resData.list.map(item => {
          //产品名
          item.htmlProductName  = '<div class="hiddenfont"><span>' + item.bakMedicalName + '</span></div>';
                              if(item.bakTradeName === null || item.bakTradeName === ''){
                                item.htmlProductName += '<div class="hiddenfont">(商品名：无)</div>';
                              }else {
                                item.htmlProductName += '<div class="hiddenfont">(商品名：' + item.bakTradeName + ')</div>';
                              }
          //产品信息
          item.htmlSpace = '规格包装:'+_this.getIsNull(item.bakMedicalSpec)+'×'+_this.getIsNull(item.bakStandSpecRate)+_this.getIsNull(item.useUnit)+'/'+_this.getIsNull(item.metricName)+'中大包装:';
                        if(item.bakFactoryEasy!=''){
                          item.htmlSpace += '<div class="hiddenfont">'+item.bakFactoryEasy+'</div>'
                        }else if(item.bakFactoryEasy==''){
                          item.htmlSpace += '<div class="hiddenfont">'+item.bakFactoryName+'</div>'
                        }
          //到/订货量
          item.htmlAmount = _this.getIsNull(item.stockupQty)+'/'+_this.getIsNull(item.requestQty);
          //到货/订购金额
          item.htmlTotalReceiveMoney = _this.priceFormat(item.totalReceiveMoney)+'/'+_this.priceFormat(item.totalRequestMoney);
          //状态
          item.htmlOrderItemState = _this.getFlag(item.orderItemState);
          //销售/采购发票号
          item.htmlInvoiceNo = _this.getIsNull(item.invoiceNo)+'/'+_this.getIsNull(item.purchaseInvoiceNo);
          //批号/有效期
          item.htmlLotNo = _this.getIsNull(item.lotNo)+'/'+_this.getIsNull(item.medicalExpiredDate);
          //买方机构/地址
          if(item.bakBuyerEasy===''){
            item.htmlBuyerName = item.bakBuyerName;
          }else if(item.bakBuyerEasy!=''){
            item.htmlBuyerName = item.bakBuyerEasy;
          }
          return item
        });
        sessionStorage.removeItem('printList');
        sessionStorage.setItem('printList',JSON.stringify(this.printList))
        let routeData = this.$router.resolve({path:'/printTable'});
        window.open(routeData.href, '_blank');
      },

      //--------------------------------------------导出Excel------------------------------------
      exportExcel() {
          exportEXL(this.query).then(res => {
            let headers = res.headers;
            let title = ""
            if (!title) {
              const fileName = headers['content-disposition'];
              title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
            }
            fileUpload(res.data,title,"application/vnd.ms-excel")
          })
      },
     // ----------------------------------------------结束--------------------------------------------------

      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------

      selectable(row,index) {
        if(Number(row.orderItemState)==3||Number(row.orderItemState)==4){
          return true;
        }else {
          return false;
        }
      },
      metaData () {
        return {
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
      restQuery(){
        this.query=this.metaQuery();
        this.list();
      },
//      getFlag(flag){
//        var arrFlag = ['准备','未阅读','已阅读','已确认','已到货','完成','作废','缺货','断货','到货修改'];
//        return arrFlag[flag];
//      },
      getFlag(flag,readyFlag){
        var arrFlag = ['准备','未阅读','已阅读','已确认','已到货','完成','作废','缺货','断货','到货修改','关闭','申请作废','同意作废','拒绝作废'];
        if(readyFlag == 9 && (flag==3 || flag == 4)){
          return "已阅读";
        }
        if(readyFlag == 0 && (flag==3 || flag == 4)){
          return "已确认";
        }
        return arrFlag[flag];
      },
      getIsFinish(flag){
        var arrFlag = ['备货中','已备完'];
        return arrFlag[flag];
      },
      submitUpload(nullifyReason) {
//        this.$refs.upload.submit();
//        this.importForm.fileList =[];
        if(!this.hasFile){
          this.$message({
            message:'请选择文件！',
            type:'warning'
          })
          return;
        }
        this.dataForm.append("nullifyReason",nullifyReason);
        uploadFileToAttachMent(this.dataForm).then(res => {
          let _this = this;
          if(res.code == '200'){
            this.$message({
              message:'上传成功！',
              type:'success',
              onClose:function () {
                _this.handleClose();
                _this.restQuery();
              }
            })

          }else{
            this.$message.error(res.message);
          }
        })
      },
      handleClose(done) {
        this.importForm.fileList = [];
        this.importForm.nullifyReason='';
        this.toggleForm();
      },
      toggleForm () {
        this.showForm = !this.showForm
      },
      metaQuery () { // 表单查询数据初始化
        return {
          purchaseId: undefined,
          purchaseName: undefined,
          purchaseSpec: undefined,
          productionOrg: undefined,
          distributionOrg: undefined,
          orderState: undefined,
          invoiceNumber: undefined,
          orderItemState:undefined,
          dataFlag:undefined,
          searchBenDate: undefined,
          searchEndDate: undefined
        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      changeFile (file) {
        let file_now = file.raw;
        this.hasFile = file.raw?true:false;
        let  formData=new FormData();
        formData.append('file',file_now);
        formData.append('orderItemId',this.orderItemIdUpload);
        formData.append('stockUpId',this.stockUpIdUpload);
        formData.append('type',this.dialogType);
        this.dataForm=formData;
//        uploadFileToAttachMent(formData).then(res => {
//          if(res.code == '100'){
//            this.$message.error(res.message);
//          }else{
//            this.$message.success('上传成功！')
//            this.handleClose();
//            this.list()
//            this.restQuery()
//          }
//        })
        return true;
      },
      handleSelectionChange(val) {
        this.dataList = val;
      },
      //表格内编辑
      handleEdit(editName, row) {
        row[editName] = true;
        let flag = true;
        this.dataList.some((item) => {
          if (item.stockupId === row.stockupId) {
            flag = false;
          }
        })
        if (flag) {
          this.$refs.multipleTable.toggleRowSelection(row, true);
          this.dataList.push(row);
        }
      },
      handleSelect(rows) {
        this.dataList = rows;
//        //取消勾选后关闭该行内的编辑框
//        if (rows.length) {
//          for (let i = 0; i < rows.length; i++) {
//            for (let j = 0; j < this.resData.list.length; j++) {
//              if (this.resData.list[j].purchaseCode != rows[i].purchaseCode) {
//                this.resData.list[j].eAmount = false;
//                this.resData.list[j].eRequestQty = false;
//              }
//            }
//          }
//        } else {
//          for (let j = 0; j < this.resData.list.length; j++) {
//            this.resData.list[j].eAmount = false;
//            this.resData.list[j].eRequestQty = false;
//          }
//        }
      },
      handleUpdateDisabled(orderItemId){
        updateDisabled(orderItemId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
//              this.list();
              this.restQuery()
            }
          })
        })
      },
      handleGoEdit (orderItemId,stockUpId) {
        this.orderItemIdUpload=orderItemId;
        this.stockUpIdUpload=stockUpId;
        this.showForm = true;
        this.formStatus = 'edit';
      },

      uploadList(res) {
        this.uploadFileList[res.refName] = res.data;
      },
      selectedData(res){
        // 所选择的树节点id
        if(!/\d/.test(res.refName)) {
          // 选择证书
          if(!this.form[res.refName].fileList) {
            this.$set(this.form[res.refName], "fileList", []);
          }
          this.$nextTick(()=>{
            res.data.forEach(function (item) {
              this.form[res.refName].fileList.push(item);
            }.bind(this));
          })
        } else {
          // 选择附加信息文件
          if(!this.form.fileList[res.refName]) {
            this.$set(this.form.fileList, res.refName, []);
          }
          this.$nextTick(()=>{
            res.data.forEach(item => {
              this.form.fileList[res.refName].push(item);
            });
          });
        }
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      commit(){
        if(this.dataList.length<1){
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }else {
//          if(this.dataList.length>1){
//            this.$alert("只能选择需要到货的单子，缺货和断货不能选择！");
//          };
          for (var data of this.dataList) {
            this.queryReceive.invoiceNos += (data.invoiceNo + ',');
            this.queryReceive.purchaseInvoiceNos += (data.purchaseInvoiceNo + ',');
            this.queryReceive.lotNos += (data.lotNo + ',');
            this.queryReceive.medicalExpiredDates += (data.medicalExpiredDate + ',');
            this.queryReceive.stockupQtys += (data.stockupQty + ',');
            this.queryReceive.orderItemIds +=(data.orderItemId + ',');
            this.queryReceive.orderIds +=(data.orderId + ',');
            this.queryReceive.planStockQtys +=(data.requestQty + ',');
            this.queryReceive.stockupIds +=(data.stockupId + ',');
          }
        }
        this.queryReceive.invoiceNos=this.queryReceive.invoiceNos.slice(0, -1);
        this.queryReceive.purchaseInvoiceNos=this.queryReceive.purchaseInvoiceNos.slice(0, -1);
        this.queryReceive.lotNos=this.queryReceive.lotNos.slice(0, -1);
        this.queryReceive.medicalExpiredDates=this.queryReceive.medicalExpiredDates.slice(0, -1);
        this.queryReceive.stockupQtys=this.queryReceive.stockupQtys.slice(0, -1);
        this.queryReceive.orderItemIds=this.queryReceive.orderItemIds.slice(0, -1);
        this.queryReceive.orderIds=this.queryReceive.orderIds.slice(0, -1);
        this.queryReceive.planStockQtys=this.queryReceive.planStockQtys.slice(0, -1);
        this.queryReceive.stockupIds=this.queryReceive.stockupIds.slice(0, -1);


        //调用后台方法请求提交并刷新页面
        commintReceiveQuery(this.resData, this.queryReceive).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
//              this.list();
              this.queryReceiveClear();
              this.restQuery()
              this.dataList=[];
            }
          })
        })
      },
      queryReceiveClear(){
        this.queryReceive.invoiceNos='';
        this.queryReceive.purchaseInvoiceNos='';
        this.queryReceive.lotNos='';
        this.queryReceive.medicalExpiredDates='';
        this.queryReceive.stockupQtys='';
        this.queryReceive.orderItemIds='';
        this.queryReceive.orderIds='';
        this.queryReceive.planStockQtys='';
        this.queryReceive.stockupIds='';
      },
      metaReceiveQuery(){
        return {
          invoiceNos : '',
          purchaseInvoiceNos : '',
          lotNos : '',
          medicalExpiredDates : '',
          stockupQtys : '',
          orderItemIds:'',
          orderIds:'',
          planStockQtys:'',
          stockupIds:''
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        let dataFlag;
        if(this.checkedAll==false){
          this.dataFlag = '0';
        }
        else{
          this.dataFlag = "1";
        }
        this.query.dataFlag=this.dataFlag;
        this.resData.orderBy=this.currentOrder;
        querySendOrderItemList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
          findRole().then(res => {
            this.roleCode = res.data;
          })
          this.$emit("evalue",this.resData.total);
        })
      },
      handleUpdateStockup (stockupId,invoiceNo,purchaseInvoiceNo,lotNo,medicalExpiredDate,stockupQty,orderItemId,requestQty,orderId) {
        this.queryReceive.invoiceNos = invoiceNo;
        this.queryReceive.purchaseInvoiceNos = purchaseInvoiceNo;
        this.queryReceive.lotNos = lotNo;
        this.queryReceive.medicalExpiredDates = medicalExpiredDate;
        this.queryReceive.stockupQtys = stockupQty;
        this.queryReceive.orderItemIds = orderItemId;
        this.queryReceive.planStockQtys = requestQty;
        this.queryReceive.stockupIds = stockupId;
        this.queryReceive.orderIds=orderId;
        //调用后台方法请求提交并刷新页面
        commintReceiveQuery(this.resData, this.queryReceive).then(res => {
          this.$message({
            message: res.success == true ? res.data : res.message,
            type: res.success == true ? 'success' : 'error',
//            message: res.data,
//            type: 'success',
            duration: 3000,
            onClose: () => {
//              this.list();
              this.queryReceiveClear();
              this.restQuery();
              this.dataList=[];
            }
          })
        })
      },
      handleNullify(){

      },
      // ************************ 分页操作 ************************
      handleCloseStockup (stockUpId) {
        deleteCloseStockup(stockUpId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list()
            }
          })
        })
      },

      sortChang(value){
        let sortType=" desc";
        if(value.order.startsWith("asc")){
          sortType=" asc";
        }
        this.currentOrder=value.prop + sortType;
        this.list()
      },
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      changeFun(val) {
        this.multipleSelection = val;
      },
      checkboxInit(row,index){
        return 1;//可勾选
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      getDrugStorage(bakMedicalSpec,bakStandSpecRate,useUnit,metricName){
        let _bakMedicalSpec = bakMedicalSpec || '';
        let _bakStandSpecRate = bakStandSpecRate || '';
        let _useUnit = useUnit || '';
        let _metricName = metricName || '';
        return '规格包装:'+_bakMedicalSpec+ '×'+ _bakStandSpecRate+ _useUnit+'/'+ _metricName
    },
      getHints(bakProductSpec, bakWrapName) {

        let _bakProductSpec, _bakWrapName;
        if (bakProductSpec == null || bakProductSpec == undefined || bakProductSpec == "空") {
          _bakProductSpec = "";
        } else {
          _bakProductSpec = bakProductSpec;
        }
        if (bakWrapName == null || bakWrapName == undefined || bakWrapName == "空") {
          _bakWrapName = "";
        } else {
          _bakWrapName = bakWrapName;
        }
        return  "规格:  "+ _bakProductSpec +"    包材:"+ _bakWrapName
      },
    }
  }
</script>

