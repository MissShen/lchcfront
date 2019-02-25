<template xmlns="http://www.w3.org/1999/html">
  <!-- ========================== 主内容start ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
          <el-form-item class="width-90">
            <el-input v-model="query.searchPurchaseCode"  @keyup.enter.native="searchEnterFun"  placeholder="采购单号" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-90">
            <el-input v-model="query.searchProductName"  @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-90">
            <el-input v-model="query.searchMedicalSpec"  @keyup.enter.native="searchEnterFun"  placeholder="规格" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-90">
            <el-input v-model="query.searchOrgName"  @keyup.enter.native="searchEnterFun"  placeholder="生产企业" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-90">
            <el-input v-model="query.searchSenderName"  @keyup.enter.native="searchEnterFun"  placeholder="配送企业" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-100">
            <el-select v-model="query.searchOrderState"  @keyup.enter.native="searchEnterFun"  placeholder="订单状态" size="small">
              <el-option label="" value=""></el-option>
              <!--<el-option label="未发送" value="0"></el-option>-->
              <el-option label="未阅读" value="1"></el-option>
              <el-option label="已阅读" value="2"></el-option>
              <el-option label="已确认" value="3"></el-option>
              <el-option label="已到货" value="4"></el-option>
              <el-option label="完成" value="5"></el-option>
              <el-option label="撤回" value="6"></el-option>
              <el-option label="缺货" value="7"></el-option>
              <el-option label="断货" value="8"></el-option>
              <el-option label="到货修改" value="9"></el-option>
              <el-option label="申请作废" value="11"></el-option>
              <el-option label="作废" value="12"></el-option>
              <el-option label="拒绝作废" value="13"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker type="date" placeholder="创建日期" v-model="query.searchBenDate" class="width-120" @keyup.enter.native="searchEnterFun"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
             &nbsp;至&nbsp;
            <el-date-picker type="date" placeholder="创建日期" v-model="query.searchEndDate" @keyup.enter.native="searchEnterFun"
                            format="yyyy-MM-dd" class="width-120" value-format="yyyy-MM-dd" size="small"></el-date-picker>
          </el-form-item>
          <el-form-item class="width-90">
            <el-input v-model="query.searchInvoiceNo"  @keyup.enter.native="searchEnterFun"  placeholder="发票号" size="small"></el-input>
          </el-form-item>
          <el-form-item class="width-50" v-if="roleCode==='serviceCenter'">
              <el-checkbox v-model="checkedAll">全部</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="restQuery()" size="small">重置</el-button>
          </el-form-item>
      </el-form>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        @select="handleSelect"
        ref="multipleTable"
        stripe
        @sort-change="sortChang"
      >
        <!--@sort-change="sortChang"-->
        <!--<el-tamultipleTableble-column label="采购单号" width="100" prop="op.purchase_code" sortable="custom" show-overflow-tooltip>-->
        <el-table-column label="采购单号" width="75" prop="op.purchase_code" sortable="custom">
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                {{scope.row.purchaseCode}}
              </div>
              <div class="el-tooltip-box">
                {{ scope.row.purchaseCode}}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="产品名" min-width="150"  prop="opi.bak_product_name" sortable="custom">
          <template slot-scope="scope" >
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
                    <div>{{ scope.row.bakProductName }}</div>
                    <div>{{ scope.row.bakMedicalMode }}
                      <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                    </div>
                  </div>

                  <!--源内容（必须放在class="el-tooltip-box"内）-->
                  <div class="el-tooltip-box">
                    <!--加class="text-inline"确保内容不折行-->
                    <div class="text-inline">{{ scope.row.bakProductName }}</div>
                    <div class="text-inline">{{ scope.row.bakMedicalMode }}
                      <span v-if="scope.row.bakTradeName != '无' && scope.row.bakTradeName !=null">({{ scope.row.bakTradeName }})</span>
                    </div>
                  </div>
                </el-tooltip>
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column  label="产品信息" min-width="150">
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                {{getSpecHints(scope.row.bakMedicalSpec,scope.row.bakStandSpecRate,scope.row.useUnit,scope.row.metricName,scope.row.bakWrapName)}}<br/>
                {{getPackHints(scope.row.bakFactoryEasy,scope.row.middleStandRate,scope.row.bigMiddleRate)}}
              </div>
              <div class="el-tooltip-box">
                <div class="text-inline">{{ scope.row.bakMedicalSpec}} × {{ scope.row.bakStandSpecRate}} {{scope.row.useUnit}} / {{ scope.row.metricName}}
                  <span v-if="scope.row.bakWrapName != '空' && scope.row.bakWrapName != null"> {{ scope.row.bakWrapName}}</span>
                </div>
                <div class="text-inline" >
                  {{ scope.row.bakFactoryEasy}}&nbsp;&nbsp; 中大包装: {{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
                </div>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="配送企业\发单时间" :render-header="labelHead" width="90"  prop="opi.bak_sender_easy" sortable="custom">
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                <div class="text-inline" v-if="scope.row.bakSenderEasy==''">{{ scope.row.bakSenderName }}</div>
                <div class="text-inline" v-else>{{ scope.row.bakSenderEasy }}</div>
                <div class="text-inline">{{scope.row.createDate}}</div>
              </div>
              <div class="el-tooltip-box">
                <div class="text-inline" v-if="scope.row.bakSenderEasy==''">{{ scope.row.bakSenderName }}</div>
                <div class="text-inline" v-else>{{ scope.row.bakSenderEasy }}</div>
                <div class="text-inline">{{scope.row.createDate}}</div>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="单价" width="60" sortable header-align="left" align="right"  prop="opi.unit_price" sortable="custom">
          <template slot-scope="scope">
            <span>{{ priceFormat(scope.row.unitPrice) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="到货量\订货量" :render-header="labelHead" width="80" sortable header-align="left" align="right"  prop="ooi.request_qty" sortable="custom">
          <template slot-scope="scope">
            <!--<div><el-input v-model="scope.row.stockupQty" size="mini"></el-input></div>-->
            <div class="hold-height">
              <template v-if="Number(scope.row.receiveFlag) == 2 || Number(scope.row.receiveFlag) == 1">
                <span v-if="scope.row.orderItemId+scope.$index==updateOrderItemId"> <el-input size="mini"  v-model.trim="scope.row.receiveQty"></el-input></span>
                <span class="red" v-else >{{scope.row.receiveQty}}</span>
              </template>
              <!--没有备货标识，如果没有生成备货ID，则不显示备货信息。解决已阅读显示备货信息问题-->
              <template v-else-if="(scope.row.eamount || ((scope.row.orderItemState == '2' || scope.row.orderItemState == '3'|| scope.row.orderItemState == '4') && ((scope.row.stockupId == null || scope.row.stockupId == '') || scope.row.readyFlag == '9')))">
                  <!--&& ((scope.row.stockupId == null || scope.row.stockupId == ''))">-->
                <el-input v-model="scope.row.stockupQty" size="mini"></el-input>
              </template>
              <template v-else-if="((scope.row.orderItemState == '3' && scope.row.readyFlag == '0') || scope.row.orderItemState == '4')">
                <!--&& ((scope.row.stockupId == null || scope.row.stockupId == ''))">-->
                <span v-if="scope.row.receiveId != null">
                  <a href="javascript:">{{ scope.row.receiveQty }}</a>
                </span>
                <span v-else-if="scope.row.readyFlag == '0'">
                  <a href="javascript:" @click="handleEdit('eamount', scope.row)">{{ scope.row.stockupQty }}
                    <i class="el-icon-edit"></i>
                  </a>
                </span>
              </template>
              <template v-else>
                <a href="javascript:" type="text" @click="handleEdit('eamount', scope.row)">
                  {{ scope.row.receiveQty }}
                  <i class="el-icon-edit" v-if="scope.row.orderItemState != '1' && scope.row.orderItemState != '10'"></i>
                </a>
              </template>
            </div>
            <div class="hold-height">{{ scope.row.requestQty }}</div>
          </template>
        </el-table-column>
        <el-table-column label="到货金额\订购金额" :render-header="labelHead" width="80" header-align="left" align="right"  prop="totalRequestMoney" sortable="custom">
          <template slot-scope="scope">
            <div class="hold-height red">{{ priceFormat(scope.row.totalReceiveMoney) }}</div>
            <div class="hold-height">{{ priceFormat(scope.row.totalRequestMoney)  }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="60" align="center" >
          <template slot-scope="scope">
            <div>
              <el-popover
                :ref="scope.$index"
                placement="top"
                width="140"
                trigger="hover">
                <ul class="pullstus">

                  <li>制单时间：{{scope.row.purchaseCreateDate}}</li>
                  <li>发单时间：{{scope.row.orderCreateDate}}</li>
                  <li>发货时间：{{scope.row.sendDate}}</li>
                  <li>到货时间：{{scope.row.receiveDate}}</li>
                </ul>
              </el-popover>
            </div>
            <div class="green" v-popover="scope.$index">{{getFlag(scope.row.orderItemState,scope.row.readyFlag,scope.row.receiveFlag)}}</div>

          </template>
        </el-table-column>
        <el-table-column label="发票号" :render-header="labelHead">
          <template slot-scope="scope">
            <!--<p><el-input v-model="scope.row.invoiceNo" size="mini"></el-input></p>-->
            <!--<p class="martop5"><el-input v-model="scope.row.purchaseInvoiceNo" size="mini"></el-input></p>-->
            <div>
              <!--没有备货标识，如果没有生成备货ID，则不显示备货信息。解决已阅读显示备货信息问题-->
              <template v-if="scope.row.einvoiceNo || ((scope.row.orderItemState == '2' || scope.row.orderItemState == '3'|| scope.row.orderItemState == '4') && ((scope.row.stockupId == null || scope.row.stockupId == '') || scope.row.readyFlag == '9'))">
                <el-input v-model="scope.row.invoiceNo" size="mini"></el-input>
              </template>
              <template v-else-if="(scope.row.orderItemState == '3' && scope.row.readyFlag == '0') || (scope.row.orderItemState == '4')">
                <span v-if="scope.row.receiveId != null">
                  <a href="javascript:">{{ scope.row.receiveInvoiceNo }}</a>
                </span>
                <span v-else>
                  <a href="javascript:" @click="handleEdit('einvoiceNo', scope.row)">{{ scope.row.invoiceNo }}
                  <i class="el-icon-edit"></i>
                  </a>
                </span>
                <!--<a v-if="scope.row.receiveId != null" href="javascript:" @click="handleEdit('einvoiceNo', scope.row)">{{ scope.row.receiveInvoiceNo }}</a>-->
                <!--<a v-else href="javascript:" @click="handleEdit('einvoiceNo', scope.row)">{{ scope.row.invoiceNo }}</a>-->
              </template>
              <template v-else-if="Number(scope.row.receiveFlag) == 2 || Number(scope.row.receiveFlag) == 1">
                <span v-if="scope.row.orderItemId+scope.$index==updateOrderItemId"> <el-input size="mini"  v-model.trim="scope.row.invoiceNo"></el-input></span>
                <span v-else>{{scope.row.invoiceNo}}</span>
              </template>
              <template v-else>
                <a href="javascript:" @click="handleEdit('einvoiceNo', scope.row)">{{ scope.row.receiveInvoiceNo }}
                  <i class="el-icon-edit" v-if="scope.row.orderItemState != '1' && scope.row.orderItemState != '10'"></i>
                </a>
              </template>
            </div>
            <div class="text-inline" v-show="false">
              <a href="javascript:" class="green flo-left" type="text" size="small" @click="showInvoice(scope.row.invoiceNo)">
                发票查看
              </a>

            </div>
            <!--<div>-->
              <!--<template v-if="scope.row.epurchaseInvoiceNo || scope.row.orderItemState == '2'">-->
                <!--<el-input v-model="scope.row.purchaseInvoiceNo" size="mini"></el-input>-->
              <!--</template>-->
              <!--<template v-else-if="Number(scope.row.orderItemState)> 4">-->
                <!--<span v-if="scope.row.orderItemId==updateOrderItemId"> <el-input size="mini"  v-model.trim="scope.row.purchaseInvoiceNo"></el-input></span>-->
                <!--<span v-else>{{scope.row.purchaseInvoiceNo}}</span>-->
              <!--</template>-->
              <!--<template v-else>-->
                <!--<a href="javascript:" @click="handleEdit('epurchaseInvoiceNo', scope.row)">{{ scope.row.purchaseInvoiceNo }}</a>-->
              <!--</template>-->
            <!--</div>-->
          </template>
        </el-table-column>
        <el-table-column label="批号\有效期" width="120" :render-header="labelHead" align="center">
          <template slot-scope="scope">
           <!--<p><el-input v-model="scope.row.lotNo" size="mini"></el-input></p>-->
           <!--<p class="martop5"><el-input placeholder="yyyy-mm-dd" v-model="scope.row.medicalExpiredDate" size="mini"></el-input></p>-->
            <div class="hold-height width-130">
              <template v-if="scope.row.elotNo || ((scope.row.orderItemState == '2' || scope.row.orderItemState == '3'|| scope.row.orderItemState == '4') && ((scope.row.stockupId == null || scope.row.stockupId == '') || scope.row.readyFlag == '9'))">
                <el-input v-model="scope.row.lotNo" size="mini"></el-input>
              </template>
              <template v-else-if="(scope.row.orderItemState == '3' && scope.row.readyFlag == '0') || scope.row.orderItemState == '4'">
                <span v-if="scope.row.receiveId != null">
                  <a href="javascript:">{{ scope.row.receiveLotNo }}</a>
                </span>
                <span v-else-if="scope.row.readyFlag == '0'">
                  <a href="javascript:" @click="handleEdit('elotNo', scope.row)">{{ scope.row.lotNo }}
                  <i class="el-icon-edit"></i>
                  </a>
                </span>
              </template>
              <template v-else-if="Number(scope.row.receiveFlag) == 2 || Number(scope.row.receiveFlag) == 1">
                <span v-if="scope.row.orderItemId+scope.$index==updateOrderItemId"> <el-input size="mini"  v-model.trim="scope.row.receiveLotNo"></el-input></span>
                <span v-else>{{scope.row.receiveLotNo}}</span>
              </template>
              <template v-else>
                <a href="javascript:" @click="handleEdit('elotNo', scope.row)">{{ scope.row.receiveLotNo }}
                  <i class="el-icon-edit" v-if="scope.row.orderItemState != '1' && scope.row.orderItemState != '10'"></i>
                </a>
              </template>
            </div>
            <div class="hold-height width-130">
              <template v-if="scope.row.emedicalExpiredDate || ((scope.row.orderItemState == '2' || scope.row.orderItemState == '3'|| scope.row.orderItemState == '4') && ((scope.row.stockupId == null || scope.row.stockupId == '') || scope.row.readyFlag == '9'))">
                <!--<el-input v-model="scope.row.medicalExpiredDate" size="mini"></el-input>-->
                <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                v-model="scope.row.medicalExpiredDate" type="date" placeholder="选择日期" size="mini" class="width-130"></el-date-picker>
              </template>
              <template v-else-if="(scope.row.orderItemState == '3' && scope.row.readyFlag == '0') || scope.row.orderItemState == '4'">
                <!--<el-input v-model="scope.row.medicalExpiredDate" size="mini"></el-input>-->
                <span v-if="scope.row.receiveId != null">
                  <a href="javascript:">{{ scope.row.receiveMedicalExpiredDate }}</a>
                </span>
                <span v-else-if="scope.row.readyFlag == '0'">
                  <a href="javascript:" @click="handleEdit('emedicalExpiredDate', scope.row)">{{ scope.row.medicalExpiredDate }}
                    <i class="el-icon-edit"></i>
                  </a>
                </span>
              </template>
              <template v-else-if="Number(scope.row.receiveFlag) == 2 || Number(scope.row.receiveFlag) == 1">
                   <span v-if="scope.row.orderItemId+scope.$index==updateOrderItemId"> <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                                                                          v-model="scope.row.medicalExpiredDate" type="date" placeholder="选择日期" size="mini" class="width-130"></el-date-picker></span>
                <span v-else>{{scope.row.medicalExpiredDate}}</span>
              </template>
              <template v-else>
                <a href="javascript:" @click="handleEdit('emedicalExpiredDate', scope.row)">{{ scope.row.receiveMedicalExpiredDate }}
                  <i class="el-icon-edit" v-if="scope.row.orderItemState != '1' && scope.row.orderItemState != '10'"></i>
                </a>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="买方机构\收货地址" :render-header="labelHead" width="76" prop="op.bak_buyer_easy" sortable="custom">
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">
                <div class="text-inline" v-if="scope.row.bakBuyerEasy==''">{{ scope.row.bakBuyerName }} </div>
                <div class="text-inline" v-else>{{ scope.row.bakBuyerEasy }} </div>
                <div class="text-inline">{{scope.row.addressAbbr}}</div>
              </div>
              <div class="el-tooltip-box">
                <div class="text-inline">
                  <div class="text-inline" v-if="scope.row.bakBuyerEasy==''">{{ scope.row.bakBuyerName }} </div>
                  <div class="text-inline" v-else>{{ scope.row.bakBuyerEasy }} </div>
                  <div class="text-inline">{{scope.row.addressAbbr}}</div>
                </div>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <!--<el-table-column label="总到货量"  width="90" header-align="left" align="right"  prop="oor.receive_qty" sortable="custom">-->
          <!--<template slot-scope="scope">-->
            <!--<div>-->
              <!--<template v-if="Number(scope.row.orderItemState)<5">-->
                <!--{{scope.row.receiveQty}}-->
              <!--</template>-->
              <!--<template v-else>-->
                <!--{{scope.row.totalReceiveQty}}-->
              <!--</template>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div class="operates">
              <a href="javascript:" class="green flo-left" type="text" size="small" @click="handleAutoArrival(
                       scope.row.invoiceNo,scope.row.purchaseInvoiceNo,scope.row.lotNo,scope.row.medicalExpiredDate,
                       scope.row.stockupQty,scope.row.orderItemId,scope.row.requestQty,scope.row.stockupId)"
                 v-if="scope.row.orderItemState=='2' || ((scope.row.orderItemState=='4' || scope.row.orderItemState=='3') && scope.row.readyFlag=='9')">
                 <!--v-if="scope.row.orderItemState=='2' && (scope.row.stockupId == null || scope.row.stockupId == '') ">-->
                自主到货
              </a>
              <a href="javascript:" class="blue-bord flo-left" type="text" size="small" @click="handleUpdateStockup(scope.row.stockupId,
                       scope.row.invoiceNo,scope.row.purchaseInvoiceNo,scope.row.lotNo,scope.row.medicalExpiredDate,
                       scope.row.stockupQty,scope.row.orderItemId,scope.row.requestQty)"
                 v-if="(scope.row.orderItemState=='3' && scope.row.readyFlag == '0') || (scope.row.orderItemState=='4' && scope.row.readyFlag == '0' && scope.row.receiveQty == null)">
                到货
              </a>
              <a href="javascript:" class="green flo-left" @click="handleGoEdit(scope.row.orderItemId,scope.row.stockupId,'close')"
                 v-if="(((scope.row.orderItemState=='3' || scope.row.orderItemState=='4') && scope.row.readyFlag == '0') || scope.row.orderItemState=='5')">
                申请作废
              </a>
              <a href="javascript:" class="green flo-left" @click="handleGoEdit(scope.row.orderItemId,scope.row.stockupId,'close')"
                 v-if="scope.row.orderItemState=='12' && scope.row.readyFlag == '0'">
                再次作废
              </a>
              <a href="javascript:" class="green flo-left" @click="handleUpdateDisabled(scope.row.orderItemId)"
                 v-if="(scope.row.orderItemState=='1' || scope.row.orderItemState=='2' || scope.row.orderItemState=='7' || scope.row.orderItemState=='8')">
                撤回
              </a>
              <a v-if="scope.row.orderItemState=='5'&&scope.row.evaluateFlag=='0'" href="javascript:" class="blue-bord flo-left" size="small" type="text" @click="handleFromInfo(scope)" >评价</a>
              <a href="javascript:" class="green flo-left" type="text" size="small" @click="changeOrderItemState(scope.row.receiveId)"
                 v-if="(scope.row.receiveFlag=='1')&&(roleCode==='director'||roleCode==='manage')">
                设置修改
              </a>
              <a href="javascript:" class="blue-bord flo-left" type="text" size="small" @click="changeReceiveOrder(scope.row.orderItemId+scope.$index,scope.row.receiveQty)"
                 v-if="scope.row.receiveFlag=='2'&&scope.row.orderItemId+scope.$index!=updateOrderItemId">
                到货修改
              </a>
              <a href="javascript:" v-if="scope.row.orderItemId+scope.$index==updateOrderItemId" @click="updateReceiveOrder(scope.row)" type="text" size="small"
                 class="green flo-left">保存</a>
              <!--@click="handleReturn(scope.row.purchaseCode,-->
              <!--scope.row.receiveDate,scope.row.bakBuyerEasy,scope.row.bakMedicalName,scope.row.bakMedicalMode,scope.row.metricName,scope.row.bakMedicalSpecFormat,-->
              <!--scope.row.bakFactoryEasy,scope.row.bakSenderEasy,scope.row.unitPrice,scope.row.lotNo,scope.row.medicalExpiredDate,-->
              <!--scope.row.invoiceNo,scope.row.returnQty,-->
              <!--scope.row.tradeQty,scope.row.receiveId)"-->
              <a href="javascript:" class="green flo-left" type="text" size="small" @click="handleReturn(scope.row.receiveId,scope.row.receiveQty)"
                 v-if="scope.row.orderItemState=='5'">
                退货
              </a>
              <a href="javascript:" class="red flo-left" type="text" size="small" @click="complaintThisOne(scope.row.recordId)"
                 v-if="scope.row.orderItemState=='5'||scope.row.orderItemState=='6'||scope.row.orderItemState=='7'||scope.row.orderItemState=='8'">
                投诉
              </a>
              <!--<div class="red ahand" type="text" size="small" @click="handleCloseStockup(scope.row.stockupId)"-->
              <!--v-if="(scope.row.orderItemState=='4') && scope.row.stockupId != null && (scope.row.readyFlag == '0' || scope.row.readyFlag == '3')">-->
              <!--关闭明细-->
              <!--</div>-->
            </div>
          </template>
        </el-table-column>
      </el-table>
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
      <!--0.发票查看弹窗-->
      <el-dialog
        title="发票展示"
        :visible.sync="dialogVisible"
        width="30%">
        <div>
          <viewer :images="images" class="viewer" ref="viewer">
            <template slot-scope="scope">
              <img v-for="src in scope.images" width="30px" height="30px" :src="src" :key="src">
            </template>
          </viewer>
        </div>
      </el-dialog>

      <!--1.申请作废弹窗-->
      <el-dialog title="申请作废" :visible.sync="showForm2" :before-close="handleClose" width="45%">
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
          <!--el-button type="warning" size="small"  @click="getPrintData">打印</el-button>-->
          <el-button type="warning" size="small" @click="exportArriveItem">导出到货</el-button>
          <el-button type="warning" size="small" @click="exportItem">导出订单</el-button>
        </div>
        <div class="foot-right">
          <a class="padding20" target="_blank" href="https://inv-veri.chinatax.gov.cn/">点击进入"国家税务局全国<span class="red">增值税发票查验</span>平台"</a>
        </div>
      </div>
    </div>
    <!--评价订单对话框-->
    <el-dialog title="评价订单" top="2vh" width="500px" :visible.sync="showForm" :before-close="closeForm">
      <el-form ref="form" :model="form" class="info-view">
        <input type="hidden" v-model="ids" />
        <dl class="nopad-left">
          <dt>配送速度：</dt>
          <dd>
            <el-rate v-model="form.speedState"   show-score text-color="#ff9900" score-template="{value}" ></el-rate>
          </dd>
        </dl>
        <dl class="nopad-left">
          <dt>服务态度：</dt>
          <dd>
            <el-rate v-model="form.serviceState"  show-score text-color="#ff9900" score-template="{value}"></el-rate>
          </dd>
        </dl>
        <dl class="nopad-left">
          <dt>药品包装：</dt>
          <dd>
            <el-rate v-model="form.productPack"  show-score text-color="#ff9900" score-template="{value}"></el-rate>
          </dd>
        </dl>
        <dl class="nopad-left">
          <dt>库存信息描述：</dt>
          <dd>
            <el-radio-group v-model="form.stockInfoState">
              <el-radio label="1">准确</el-radio>
              <el-radio label="2">不准确</el-radio>
            </el-radio-group>
          </dd>
        </dl>
        <el-form-item label="评价内容：" label-width="100">
          <el-input type="textarea" :rows="4" v-model="form.evaluate" class="width-320"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="handleForm('form')">提交</el-button>
        <el-button @click="showForm=false" size="small" class="el-button-pale">取消</el-button>
      </span>
    </el-dialog>

    <!-- 退货 -->
    <returns-list v-if="returnsVisible" ref="returnList"></returns-list>
  </div>
  <!-- ========================== 主内容end ========================= -->
</template>
<script>
  // 引入用户相关请求
  import {
    queryPurchaseItemList,
    autoArrival,saveReceiveOrder,
    deleteCloseStockup,
    commintReceiveQuery,
    updateDisabled,
    exportData,changeOrderState,
    exportArriveData,
    evaFill,checkCanReturn,uploadFileToAttachMent
  } from 'src/axios/trade/buyerrole/arrive/buyerTabView/receiveListInfo'
  import {priceFormat,keyBoardEnter,labelHead} from "src/utils";
  import {findRole} from 'src/axios/trade/purchase/purchase'
  import fileUpload from 'js-file-download'
  import {getSpecHints,getPackHints,isNumber} from "src/utils/validateUtil";
  import returnsList from 'src/pages/trade/tradecenter/senderRole/order/salerTableView/returnsList'
  import 'viewerjs/dist/viewer.css'
  import Viewer from "v-viewer/src/component.vue"
  export default {
    name: "orderList",
    components: {
      returnsList,
      Viewer
    },
    props: {
      'param': {
        type: Object,
        required: false
      }
    },
    data () {
      return {
        images: [],
        dialogVisible: false,
        checked:false,
        ids:[],
        value2:undefined,
        lastReceive: '',  // 上次到货
        updateOrderItemId:'-',
        currentOrder:undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        form: this.metaForm(), // 表单初始化
        queryReceive:this.metaReceiveQuery(),//确认到货请求参数
        showForm: false, // 表单可见性初始化
        showForm2: false,
        showQuery: false, // 表单查询初始化
        dataList:[],
        multipleSelection:[],
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
        returnsVisible: false,
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
      priceFormat,
      labelHead,
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
      showInvoice (invoice) {
        this.dialogVisible = true;
        let imagesArr = [];
        $.ajax({
          type: "GET",
          url: "http://172.16.2.98:8080/ScanFile/copyFile/"+invoice,
          async : false,
          dataType : 'jsonp',
          data : '',
          jsonp : 'callback',
          jsonpCallback : "jsonpCallback",
          success : function(data) {
            for (let i = 0; i < data.length; i ++){
              imagesArr.push("http://172.16.2.98:8080/ScanFile/images/"+invoice+"/"+data[i]);
            }
          },
        });
        this.images = imagesArr;
      },
      changeOrderItemState (receiveId) {
        changeOrderState(receiveId).then(res => {
          this.$message({
            type: 'success',
            message: "设置成功"
          })
          this.list()
        })
      },
      metaForm () { // 表单数据初始化
        return {
          stockInfoState: '1',
          speedState:5,
          serviceState:5,
          orderItemId:undefined,
          evaluate:'',
          productPack:5,
          ids:[]
        }
      },
      changeReceiveOrder(orderItemId,receiveQty){
        this.updateOrderItemId=orderItemId
        this.lastReceive=receiveQty
      },
      complaintThisOne(orderItemId){
        this.$router.push("/trade/manage/createTradeComplain/choose/1/"+orderItemId)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleFromInfo (scope) {
        this.multipleSelection.push(scope.row);
        this.evaluateAll();
      },
      closeForm () {
        this.toggleForm();
        this.form = this.metaForm();
      },
      toggleForm () {
        this.showForm = !this.showForm
      },
      toggleForm2 () {
        this.showForm2 = !this.showForm2
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
//          if(res.code == '200'){
//            this.$message.success('上传成功！');
//            this.handleClose();
//            this.restQuery();
//          }else{
//            this.$message.error(res.message);
//          }
//        })
        return true;
      },
      // 提交用户表单
      handleForm (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.toggleForm();
            evaFill(this.form,this.ids).then(res => {
              this.$message({
                type: 'success',
                message: '评价成功',
                onClose: () => {
                  this.list()
                  this.multipleSelection = [];
                  this.form = this.metaForm();
                }
              })
            })
          } else {
            return false
          }
        })
      },
      evaluateAll(){
        if(this.multipleSelection.length<1){
          this.$message.error('请选择需要评价的订单');
          return false;
        }else {
          let idsArr = [] , arr = this.multipleSelection;
          for(let i = 0; i < arr.length; i++){
            idsArr.push(arr[i].recordId);
          }
          this.ids = idsArr;
          this.showForm = ! this.showForm
        }
      },
      updateReceiveOrder (row) {
        console.log("aaaa",Number(row.receiveQty))
        console.log("bbbb",Number(row.totalReceiveQty))
        console.log("cccc",Number(this.lastReceive))
        console.log("eeee",Number(row.requestQty))
        console.log("a+b-c>2e",(Number(row.receiveQty)+Number(row.totalReceiveQty)-Number(this.lastReceive))>Number(row.requestQty+row.requestQty))
        if(row.receiveLotNo=='' ||(row.receiveQty<0) ||row.invoiceNo=='' ||row.medicalExpiredDate==null ||row.purchaseInvoiceNo==''){
          this.$message({
            message: '修改内容不能为空！',
            type: 'warning'
          });
          return false
        }else if(!isNumber(row.receiveQty)){
          this.$message({
            message: '请正确输入到货量！',
            type: 'warning'
          });
        }else if((Number(row.receiveQty)+Number(row.totalReceiveQty)-Number(this.lastReceive))>Number(row.requestQty+row.requestQty)){
          this.$message({
            message: '确认到货量必须小于等于订购量的两倍！',
            type: 'warning'
          });
        }else {
          saveReceiveOrder(row).then(res => {
            this.$message({
              type: 'success',
              message: "修改成功"
            })
            this.updateOrderItemId='-';
            this.list()
          })
        }
      },
      exportArriveItem(){
        if(this.query.searchBenDate == undefined || this.query.searchBenDate == ''||this.query.searchEndDate == undefined || this.query.searchEndDate == null ){
          this.$message({
            type: 'error',
            message: '请选择创建的开始日期及创建的结束日期'
          });
          return false;
        }else {
          exportArriveData(this.query).then(res => {
            let headers = res.headers;
            let title = ""
            if (!title) {
              const fileName = headers['content-disposition'];
              title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
            }
            fileUpload(res.data, title, "application/vnd.ms-excel")
          })
        }
      },
      exportItem(){

        if(this.query.searchBenDate == undefined || this.query.searchBenDate == ''||this.query.searchEndDate == undefined || this.query.searchEndDate == null ){
          this.$message({
            type: 'error',
            message: '请选择创建的开始日期及创建的结束日期'
          });
          return false;
        }else {
          exportData(this.query).then(res => {

            let headers = res.headers;
            let title = ""
            if (!title) {
              const fileName = headers['content-disposition'];
              title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
            }
            fileUpload(res.data, title, "application/vnd.ms-excel")
          })
        }
      },
      getFlag(flag,readyFlag,receiveFlag){
        var arrFlag = ['准备','未阅读','已阅读','已确认','已到货','完成','撤回','缺货','断货','到货修改','关闭','申请作废','作废','拒绝作废'];
        if(readyFlag == 9 && (flag==3 || flag == 4)){
          return "已阅读";
        }
        if(readyFlag == 0 && (flag==3 || flag == 4)){
          return "已确认";
        }
        if(receiveFlag==2){
          flag=9;
        }
        if(flag == 4 && receiveFlag == 1){
          return "已到货";
        }
        return arrFlag[flag];
      },
      handleReturn(receiveId,receiveQty) {
        checkCanReturn(receiveId,receiveQty).then(res => {
           if(res.data==""){
             this.returnsVisible = true;
             this.$nextTick(() => {
               this.$refs.returnList.getReturnsList(receiveId);
             })
           }else{
            this.$alert(res.data);
           }
        });
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
//      getIsFinish(flag){
//        var arrFlag = ['备货中','已备完'];
//        return arrFlag[flag];
//      },
      restQuery(){
        this.query=this.metaQuery();
        this.list();
      },
      metaQuery () { // 表单查询数据初始化
        return {
          searchPurchaseCode: this.param.purchaseCode || '',
          searchProductName: undefined,
          searchMedicalSpec: undefined,
          searchOrgName: undefined,
          searchSenderName: undefined,
          searchOrderState: this.param.purchaseCode === '' ? this.param.state : '',
          searchInvoiceNo: undefined,
          searchBenDate: undefined,
          searchEndDate: undefined,
          dataFlag:undefined
        }
      },
      getDrugStorage(bakMedicalSpec,bakStandSpecRate,useUnit,metricName){
        let _bakMedicalSpec = bakMedicalSpec || '';
        let _bakStandSpecRate = bakStandSpecRate || '';
        let _useUnit = useUnit || '';
        let _metricName = metricName || '';
        return _bakMedicalSpec+ '×'+ _bakStandSpecRate+ _useUnit+'/'+ _metricName
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
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
        queryPurchaseItemList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1
          }
          findRole().then(res => {
            this.roleCode = res.data;
          })
          /*this.$emit("orderCount",this.resData.total);*/
        })

      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleUpdateStockup (stockupId,invoiceNo,purchaseInvoiceNo,lotNo,medicalExpiredDate,stockupQty,orderItemId,requestQty) {
        this.queryReceive.invoiceNos = invoiceNo;
        this.queryReceive.purchaseInvoiceNos = purchaseInvoiceNo;
        this.queryReceive.lotNos = lotNo;
        this.queryReceive.medicalExpiredDates = medicalExpiredDate;
        this.queryReceive.stockupQtys = stockupQty;
        this.queryReceive.orderItemIds = orderItemId;
        this.queryReceive.planStockQtys = requestQty;
        this.queryReceive.stockupIds = stockupId;
        //调用后台方法请求提交并刷新页面
        commintReceiveQuery(this.resData, this.queryReceive).then(res => {
          this.$message({
            message: res.success == true ? res.data : res.message,
            type: res.success == true ? 'success' : 'error',
//            message: res.data,
//            type: 'success',
            duration: 3000,
            onClose: () => {
              if(res.success == true){
                this.list();
              }
            }
          })
        })
      },
      handleAutoArrival (invoiceNo,purchaseInvoiceNo,lotNo,medicalExpiredDate,stockupQty,orderItemId,requestQty,stockupId) {
        this.queryReceive.invoiceNos = invoiceNo;
        this.queryReceive.purchaseInvoiceNos = purchaseInvoiceNo;
        this.queryReceive.lotNos = lotNo;
        this.queryReceive.medicalExpiredDates = medicalExpiredDate;
        this.queryReceive.stockupQtys = stockupQty;
        this.queryReceive.orderItemIds = orderItemId;
        this.queryReceive.planStockQtys = requestQty;
        this.queryReceive.stockupIds = stockupId;
        //调用后台方法请求提交并刷新页面
        autoArrival(this.resData, this.queryReceive).then(res => {
          this.$message({
            message: res.success == true ? res.data : res.message,
            type: res.success == true ? 'success' : 'error',
//            message: res.data,
//            type: 'success',
            duration: 3000,
            onClose: () => {
              this.list();
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
      handleUpdateDisabled(orderItemId){
        updateDisabled(orderItemId).then(res => {
          this.$message({
            message: res.data,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.list();
            }
          })
        })
      },
      handleCloseStockup (stockupId) {
        deleteCloseStockup(stockupId).then(res => {
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
      handleClose(done) {
        this.importForm.fileList = [];
        this.importForm.nullifyReason='';
        this.toggleForm2();
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
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
      },
      handleGoEdit (orderItemId,stockUpId) {
        this.orderItemIdUpload=orderItemId;
        this.stockUpIdUpload=stockUpId;
        this.showForm2 = true;
        this.formStatus = 'edit';
      },
      submitUpload(nullifyReason) {
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
    }
  }
</script>
