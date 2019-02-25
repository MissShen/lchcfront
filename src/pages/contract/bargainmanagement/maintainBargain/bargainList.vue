<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
        <el-form-item>
          <el-input size="small" v-model="query.productName" maxlength="200" placeholder="品名" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select size="small" v-model="query.sources" placeholder="报价状态">
            <el-option-group
              key="报价状态"
              label="报价状态">
              <el-option
                v-for="item in sources"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input size="small" v-model="query.manufactureName" maxlength="200" placeholder="生产企业" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button  size="small" type="success" @click="searchEnterFun">查询</el-button>
          <el-button size="small" type="warning" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="通用名" min-width="100" prop="nameChn" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" min-width="140">
            <template slot-scope="scope">
              <ul class="ico-zt">
                <li class="ico-left">
                  <div class="icon-box">
                    <i v-if="scope.row.crcount>0?true:false" class="ico icon-qu"></i>
                    <i v-if="scope.row.basicFlag == 0?false:true" class="ico icon-jc"></i>
                    <i v-if="scope.row.healthFlag>0?true:false" class="ico icon-yi"></i>
                    <i v-if="scope.row.twoVoteCou > 0" class="ico icon-liang"></i>
                  </div>
                </li>
                <li>
                  <div class="text-inline" :title="scope.row.productName">{{ scope.row.productName }}</div>
                  <div class="text-inline" :title="scope.row.doseageFormName + scope.row.tradeName">{{ scope.row.doseageFormName }}(商品名:{{scope.row.tradeName}})</div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" min-width="140">
            <template slot-scope="scope">
              <div class="text-inline"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+'('+scope.row.wrapName+')'">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} ({{scope.row.wrapName}}))
              </div>
              <div class="text-inline" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="申报企业" prop="OBJECTIVESCORE" sortable="custom" width="80">
            <template slot-scope="scope">
              <div :title="scope.row.bidOrgName">{{ scope.row.bidOrgName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="目录类型" width="120" prop="catalogArea" sortable="custom"  :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.catalogArea}}</span>
            </template>
          </el-table-column>
          <el-table-column label="参考价" prop="BIDPRICE" sortable="custom" width="70" align="right">
            <template slot-scope="scope">
              <!--<el-tooltip effect="dark"  placement="top">
                <div slot="content">
                  {{referencePrice(scope.row.rminPrice,scope.row.bjPrice,scope.row.hbPrice,scope.row.tjPrice,scope.row.catalogAreaFlag)}}
                </div>
                <span>{{priceFormat(scope.row.rminPrice)}}</span>
              </el-tooltip>-->
              <span>{{priceFormat(scope.row.bidPrice)}}</span>
            </template>
          </el-table-column>

          <el-table-column label="当前价格" width="170" align="center">
            <template slot-scope="scope">
              <!--<div v-if="!judgmentFun(scope.row.maxPrice, scope.row.minPrice, scope.row.bhiBidPriceMax, scope.row.bidPrice)"><span>待议价</span></div>-->
              <template v-if="judgmentFun(scope.row.maxPrice, scope.row.minPrice, scope.row.bhiBidPriceMax, scope.row.bidPrice)" class="font-black">
                <div>
                  <!--<span v-if="!bidPriceDataForA(scope.row.bhiBidPrice,scope.row.confirmFlag)">
                  {{ bidPriceData(scope.row.resState,scope.row.bidPrice) }}
                  </span>
                  <a href="javascript:" v-if="bidPriceDataForA(scope.row.bhiBidPrice,scope.row.confirmFlag)" @click="bargainingDetails(scope.row.productId)" >
                    {{bhiBidPriceData(scope.row.bhiBidPrice,scope.row.talkType)}}
                  </a>-->
                  <span>
                    {{ bidPriceData(scope.row.sort, scope.row.confirmFlag, scope.row.bhiBidPrice) }}
                  </span>
                  <range-bar :rangeData="[bidPriceData(scope.row.sort, scope.row.confirmFlag, scope.row.bhiBidPrice),
                  max_min_price_format(scope.row.maxPrice, scope.row.minPrice, scope.row.bhiBidPriceMax, scope.row.bidPrice, 'min'),
                  max_min_price_format(scope.row.maxPrice, scope.row.minPrice, scope.row.bhiBidPriceMax, scope.row.bidPrice, 'max'), 1, 1]"
                             @bar-click="bargainingDetails(scope.row.productId)"></range-bar>
                </div>
              </template>
              <template v-else>
                <div>
                  <!--<span v-if="!bidPriceDataForA(scope.row.bhiBidPrice,scope.row.confirmFlag)">
                  {{ bidPriceData(scope.row.resState,scope.row.bidPrice) }}
                  </span>
                  <a href="javascript:" v-if="bidPriceDataForA(scope.row.bhiBidPrice,scope.row.confirmFlag)" @click="bargainingDetails(scope.row.productId)" >
                    {{bhiBidPriceData(scope.row.bhiBidPrice,scope.row.talkType)}}
                  </a>-->
                  <span>
                    {{ bidPriceData(scope.row.sort, scope.row.confirmFlag, scope.row.bhiBidPrice) }}
                  </span>
                  <range-bar :rangeData="[bidPriceData(scope.row.sort, scope.row.confirmFlag, scope.row.bhiBidPrice),
                  max_min_price_format(scope.row.maxPrice, scope.row.minPrice, scope.row.bhiBidPriceMax, scope.row.bidPrice, 'min'),
                  max_min_price_format(scope.row.maxPrice, scope.row.minPrice, scope.row.bhiBidPriceMax, scope.row.bidPrice, 'max')]"></range-bar>
                </div>
              </template>
            </template>
          </el-table-column>

          <el-table-column label="医院议价" width="90" prop="referencePrice" sortable="custom" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.referencePrice}}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="80" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.confirmFlag==0 ">
                <span v-if="scope.row.bidFlag == 1">已报价</span>
                <span class="orange" v-if="scope.row.bidFlag == 0 && scope.row.dateComp >0">已过期</span>
                <span v-if="scope.row.bidFlag == 0 && scope.row.dateComp <=0">未报价</span>
              </div>
              <div v-else>
                <span v-if="scope.row.confirmFlag == 1">已确认</span>
                <span v-if="scope.row.confirmFlag == 2">已拒绝</span>
                <span v-if="scope.row.confirmFlag == 3">已作废</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="企业报价"  prop="BHI_BID_PRICE" sortable="custom"  width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span class="blue">{{scope.row.bidFlag==0?"未报价":(scope.row.bidFlag==2?"已拒绝":priceFormat(scope.row.bhiBidPrice))}}</span>
            </template>
          </el-table-column>

          <el-table-column label="议价开始" prop="startDate" sortable="custom" :show-overflow-tooltip="true" width="90" align="center">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{ scope.row.startDate }}</div>
                <span v-if="scope.row.startDate!=null && scope.row.startDate!=''">{{ moment(scope.row.startDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="议价结束" prop="endDate" sortable="custom" :show-overflow-tooltip="true" width="90" align="center">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{ scope.row.endDate }}</div>
                <span v-if="scope.row.endDate!=null && scope.row.endDate!=''">{{ moment(scope.row.endDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <div class="operates">
                <!--<a href="javascript:;" @click="removeBargain(scope.row.id)" v-if="isShowRemove(scope.row.juageHos,scope.row.bidFlag)">移除</a>-->
                <!--<a href="javascript:;" @click="deleteBargain(scope.row.id)" v-if="isShowRemove(scope.row.juageHos,scope.row.bidFlag)">删除</a>-->

                <!--未确认，而且报价状态是已报价或已拒绝-->
                <a href="javascript:;" class="blue-bord" @click="openRenegotiationModel(scope.row)" v-if="showRenegotiation(scope.row.dateComp,scope.row.bidFlag,scope.row.confirmFlag,scope.row.sort)">再议价</a>
                <a href="javascript:;" class="blue-bord" @click="confirm(scope.row.id)" v-if="isShowConfirm(scope.row.confirmFlag,scope.row.bidFlag)">确认</a>
                <a href="javascript:;" class="red-bord" @click="refuse(scope.row.id)" v-if="isShowConfirm(scope.row.confirmFlag,scope.row.bidFlag)">拒绝</a>
                <!--企业尚未响应之前可以作废-->
                <a href="javascript:;" @click="invalidProduct(scope.row.id)" v-if="isShowInvalid(scope.row.bidFlag,scope.row.confirmFlag)">作废</a>
                <!--查看-->
                <a href="javascript:;" @click="selectRemark(scope.row.id)" v-if="isShowSelect(scope.row.bidFlag)">查看</a>
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
          <el-button size="small" type="success" @click="openbasicModel()">新增议价</el-button>
          <el-button size="small" type="warning" @click="Excel()">议价目录导出</el-button>
          <!--<span><el-button size="small" type="primary" @click="insertObjectId">备选议价加入议价</el-button></span>
          <span><el-button size="small" type="primary" @click="bargainTime">设定议价时间</el-button></span>-->
        </div>
      </div>
      <!--  ====================================== 弹窗 ====================================== -->
      <el-dialog title="设定议价时间" :visible.sync="showBargainTime" :before-close="closeBargainTime" width="60%">
        <el-form :inline="true" ref="bargainTimeForm" :model="bargainTimeForm" class="demo-form-inline">
          <div class="formrow" style="width:80%">
            <span style="width:80%">
              <!--<el-input v-model="bargainTimeForm.startTime" placeholder="开始时间"></el-input>
              <el-input v-model="bargainTimeForm.endTime" placeholder="结束时间"></el-input>-->
               <el-date-picker
                 :unlink-panels=true
                 v-model="bargainTimeForm.time"
                 type="daterange"
                 :picker-options="pickerOptions"
                 range-separator="至"
                 start-placeholder="设定开始日期"
                 end-placeholder="设定结束日期">
              </el-date-picker>
            </span>
            <span style="color: red;display: block">
              *设置议价时间默认开始时间24点整，结束时间23点59分59秒
            </span>
          </div>
        </el-form>
        <span slot="footer">
          <el-button @click="closeBargainTime()" size="small" class="el-button-pale">关闭</el-button>
          <el-button type="primary" size="small" @click="updateBargainTime()">保存</el-button>
        </span>
      </el-dialog>
      <!--生产企业备注-->
      <el-dialog title="查看企业备注" :visible.sync="showFactoryRemark" :before-close="closeFactoryRemark" width="30%">
        <el-form ref="bargainTimeForm" :model="remark">
          <el-form-item id="el-form-item-id" prop="refuseRemark">
            <el-input type="textarea" v-model="remark.factoryRemark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="closeFactoryRemark()" size="small" class="el-button-pale">关闭</el-button>
        </span>
      </el-dialog>

      <!--新增议价-->
      <el-dialog title="新增议价" :visible.sync="basicModel" :before-close="closebasicModel" width="90%">

        <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" class="table-form" :inline="true">
          <el-form-item class="width-120">
            <el-input size="small"  v-model="basicModelQuery.productName" maxlength="200" placeholder="品名" @keyup.enter.native="basicModelSearchEnterFun"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input size="small"  v-model="basicModelQuery.spec" maxlength="200" placeholder="规格" @keyup.enter.native="basicModelSearchEnterFun"></el-input>
          </el-form-item>
          <!--begin不知道如何筛选-->
          <el-form-item class="width-120">
            <el-input size="small"  v-model="basicModelQuery.doseageFormName" maxlength="200" placeholder="剂型" @keyup.enter.native="basicModelSearchEnterFun"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-input size="small"  v-model="basicModelQuery.manufactureName" maxlength="200" placeholder="企业名称" @keyup.enter.native="basicModelSearchEnterFun"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select size="small" v-model="basicModelQuery.catalogArea" placeholder="目录类型">
              <el-option-group
                key="目录类型"
                label="目录类型">
                <el-option
                  v-for="item in catalogAreas"
                  :key="item.catalogId"
                  :label="item.catalogName"
                  :value="item.catalogId">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <!--<el-form-item class="nomar">
            <el-button size="small" v-show="boxhide" type="success" @click="basicModelList()">查询</el-button>
            <el-button size="small" v-show="boxhide" type="warning" @click="basicModelreset()">重置</el-button>
            <el-button size="small" @click="spread"  v-show="boxhide">更多<i class="el-icon-arrow-down"></i></el-button>
          </el-form-item>-->
          <!--<span style="font-size: 0;" v-show="boxShow">-->
          <!--<el-form-item class="width-150">
            <el-select size="small" v-model="basicModelQuery.resState" placeholder="候选目录">
               <el-option-group
                 key="候选目录"
                 label="候选目录">
                  <el-option
                    v-for="item in resStates"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
               </el-option-group>
            </el-select>
          </el-form-item>-->
          <el-form-item class="width-120">
            <el-select size="small" v-model="basicModelQuery.twoVote" placeholder="两票制">
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
          <el-form-item class="width-120">
            <el-select size="small" v-model="basicModelQuery.healthFlag" placeholder="医保标记">
              <el-option-group
                key="医保标记"
                label="医保标记">
                <el-option
                  v-for="item in healthFlags"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select size="small" v-model="basicModelQuery.basicFlag" placeholder="基药标记">
              <el-option-group
                key="基药标记"
                label="基药标记">
                <el-option
                  v-for="item in basicData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item class="width-120">
            <el-select size="small" v-model="basicModelQuery.hosCon" placeholder="本院目录">
              <el-option-group
                key="本院目录"
                label="本院目录">
                <el-option
                  v-for="item in hosCons"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <!--<el-form-item class="width-120">
            <el-select size="small" v-model="basicModelQuery.purchaseState" placeholder="采购状态">
              <el-option-group
                key="采购状态"
                label="采购状态">
                <el-option
                  v-for="item in purchaseStates"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>-->


          <el-form-item>
            <el-button size="small"  type="success" @click="basicModelList()">查询</el-button>
            <el-button size="small" type="warning" @click="basicModelreset()">重置</el-button>
            <!--<el-button size="small" @click="packup" >收起<i class="el-icon-arrow-up"></i></el-button>-->
          </el-form-item>
          <!--</span>-->
        </el-form>

        <!-- 表格列表 -->
        <div class="tableset">
          <el-table
            :data="basicModelResData.list"
            border
            stripe
            @sort-change="sortChangeDialog">
            <el-table-column label="通用名" prop="nameChn" sortable="custom" width="90">
              <template slot-scope="scope">
                <span>{{ scope.row.nameChn }}</span>
              </template>
            </el-table-column>
            <el-table-column label="产品名称" prop="productName" min-width="120">
              <template slot-scope="scope">
                <ul class="ico-zt">
                  <li class="ico-left">
                    <div class="icon-box">
                      <i v-if="scope.row.crcount>0?true:false" class="ico icon-qu"></i>
                      <i v-if="scope.row.basicFlag == 0?false:true" class="ico icon-jc"></i>
                      <i v-if="scope.row.healthFlag>0?true:false" class="ico icon-yi"></i>
                      <i v-if="scope.row.twoVoteCou > 0" class="ico icon-liang"></i>
                    </div>
                  </li>
                  <li>
                    <div class="text-inline" :title="scope.row.productName">{{ scope.row.productName }}</div>
                    <div class="text-inline" :title="scope.row.doseageFormName + scope.row.tradeName">{{ scope.row.doseageFormName }}(商品名:{{scope.row.tradeName}})</div>
                  </li>
                </ul>
              </template>
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

            <el-table-column label="申报企业" prop="bidOrgName" sortable="custom" width="120">
              <template slot-scope="scope">
                <div :title="scope.row.bidOrgName">{{ scope.row.bidOrgName}}</div>
              </template>
            </el-table-column>

            <el-table-column label="目录类型" prop="catalogArea" sortable="custom" width="120" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.catalogArea }}</span>
              </template>
            </el-table-column>

            <el-table-column label="客观分" prop="objectiveScore" sortable="custom" width="80" align="right">
              <template slot-scope="scope">
                <a href="javascript:;" @click="showScoreDetailedFun(scope.row.productId)">{{ scope.row.objectiveScore }}</a>
              </template>
            </el-table-column>

            <!--<el-table-column label="参考价" prop="MINPRICE" sortable="custom" width="70" align="right">
              <template slot-scope="scope">
                <el-tooltip effect="dark"  placement="top">
                  <div slot="content">
                    {{referencePrice(scope.row.rminPrice,scope.row.bjPrice,scope.row.hbPrice,scope.row.tjPrice,scope.row.catalogAreaFlag)}}
                  </div>
                  <span>{{priceFormat(scope.row.rminPrice)}}</span>
                </el-tooltip>
              </template>
            </el-table-column>-->

            <el-table-column label="成交参考价" prop="bidPrice" sortable="custom" width="120" align="right">
              <template slot-scope="scope">
                <!--<el-tooltip effect="dark"  placement="top">
                  <div slot="content">
                    {{referencePrice(scope.row.bidPrice,scope.row.bjPrice,scope.row.hbPrice,scope.row.tjPrice,scope.row.catalogAreaFlag)}}
                  </div>
                  <span>{{(scope.row.bidPrice == 0 || scope.row.bidPrice == null || scope.row.bidPrice == '') ? '待谈判' : priceFormat(scope.row.bidPrice)}}</span>
                </el-tooltip>-->
                <span>{{(scope.row.bidPrice == 0 || scope.row.bidPrice == null || scope.row.bidPrice == '') ? '待谈判' : priceFormat(scope.row.bidPrice)}}</span>
              </template>
            </el-table-column>

            <el-table-column label="成交价格区间" width="170" align="center">
              <template slot-scope="scope">
                <template v-if="!tradeJudgmentFun(scope.row.tradeMaxPrice, scope.row.tradeMinPrice, scope.row.bidPrice)">
                  <span>待谈判</span>
                </template>

                <template v-else>
                  <range-bar :rangeData="[scope.row.bidPrice,
                  trade_max_min_price_format(scope.row.tradeMaxPrice, scope.row.tradeMinPrice, scope.row.bidPrice, 'min'),
                  trade_max_min_price_format(scope.row.tradeMaxPrice, scope.row.tradeMinPrice, scope.row.bidPrice, 'max'),1]"></range-bar>
                </template>
              </template>
            </el-table-column>

            <!--<el-table-column label="候选目录" prop="RESSTATE" sortable="custom" width="75" align="center">
              <template slot-scope="scope">
                <span class="red" v-if="scope.row.resState == 1">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>-->

            <!--<el-table-column label="企业报价" prop="BIDPRICE" sortable="custom" width="150" align="center">
              <template slot-scope="scope">

              <span v-if="!bidPriceDataForA(scope.row.bhiBidPrice)">
              {{ bidPriceData(scope.row.resState,scope.row.bidPrice) }}
              </span>
                  <a href="javascript:" v-if="bidPriceDataForA(scope.row.bhiBidPrice)" @click="bargainingDetails(scope.row.productId)" >
                    {{bhiBidPriceData(scope.row.bhiBidPrice,scope.row.talkType)}}
                  </a>
                <range-bar :rangeData="[scope.row.bidPrice,scope.row.minPrice,scope.row.maxPrice,1]"></range-bar>
              </template>
            </el-table-column>-->

            <el-table-column label="本院目录" prop="hosCon" sortable="custom" width="120" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.hosCon == 1 ? '是' : '否' }}</span>
              </template>
            </el-table-column>


            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <div class="operates">
                  <a href="javascript:;" @click="showAlternativeBargainingForone(scope.row)" >议价</a>
                </div>
              </template>
            </el-table-column>


          </el-table>
        </div>

        <!-- 表格分页 -->
        <div class="pagebox">
          <ul class="explain">
            标记说明
            <li><i class="ico icon-qu"></i><span>区目录药品</span></li>
            <li><i class="ico icon-jc"></i><span>基本药物目录</span></li>
            <li><i class="ico icon-yi"></i><span>医保药品</span></li>
            <li><i class="ico icon-liang"></i><span>两票制</span></li>
          </ul>
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="basicModelHandleSizeChange"
            @current-change="basicModelhandleCurrentChange"
            :page-sizes="[10, 20, 30]"
            :total="basicModelResData.total"
            :page-size="basicModelResData.pageSize"
            :page-count="basicModelResData.pages"
            :pager-count="5"
            :current-page.sync="basicModelResData.pageNum">
          </el-pagination>
        </div>

        <span slot="footer">
          <el-button size="small" class="el-button-pale" @click="closebasicModel()">关闭</el-button>
        </span>
      </el-dialog>
      <!--加入议价-->
      <el-dialog title="加入议价" :visible.sync="showAlternativeBargaining" :before-close="closAlternativeBargaining" width="50%">
        <div class="form-view">
          <el-form ref="AlternativeBargainingText" :model="AlternativeBargainingText" inline label-width="150px">
            <el-row :gutter="16" class="nomar" style="text-align: center">
              <el-col :span="8">
                <strong>本院价格：</strong>
                <span>{{priceFormat(AlternativeBargainingText.dealPrice) == ""?"无":priceFormat(AlternativeBargainingText.dealPrice)}}</span>
              </el-col>
              <el-col :span="8">
                <strong>阳光采购最低成交价：</strong>
                <span>{{priceFormat(AlternativeBargainingText.ygMinPrice) == ""?"无":priceFormat(AlternativeBargainingText.ygMinPrice)}}</span>
              </el-col>
            </el-row>
            <el-row :gutter="16" class="nomar" style="text-align: center">
              <el-col :span="8">
                <strong>议价价格区间：</strong>
                <template v-if="AlternativeBargainingText.allMinPrice">
                  <span class="highline">{{AlternativeBargainingText.allMinPrice}}--{{AlternativeBargainingText.allMaxPrice}}</span>
                  <a href="javascript:;" @click="bargainingDetailsList()" class="font-12 green">查看</a>
                </template>
                <template v-else>
                  无
                </template>
              </el-col>
              <el-col :span="8">
                <strong>全国最低价：</strong>
                <span class="highline">{{priceFormat(AlternativeBargainingText.rminPrice) == ""?"无":priceFormat(AlternativeBargainingText.rminPrice)}}</span>
                <a href="javascript:;" class="font-12 green" @click="openValidPrice()">查看</a>
              </el-col>
            </el-row>
            <hr>
            <el-form-item label="请设置议价时间：" prop="time">
              <el-date-picker
                style="width:426px !important;"
                :unlink-panels=true
                v-model="AlternativeBargainingText.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="设定开始日期"
                end-placeholder="设定结束日期"
                size="small"
                :picker-options="pickerOptions"
                :default-time="[this.nowDate, '10:00:00']"
                format = "yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="请设置参考价：">
              <el-input v-model="AlternativeBargainingText.referencePrice" style="width:426px" size="small"></el-input>
            </el-form-item>
            <el-form-item label="请填写备注：">
              <el-input type="textarea" :rows="3" maxlength="4000" style="width:426px" placeholder="请输入备注内容" v-model="AlternativeBargainingText.textarea"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button class="el-button-pale" size="small" @click="closAlternativeBargaining()">取消</el-button>
          <el-button type="primary" size="small" @click="insertAlternativeBargaining()">发送</el-button>
        </span>
      </el-dialog>
      <!--再议价-->
      <el-dialog title="再议价" :visible.sync="showRenegotiationModel" :before-close="closRenegotiationModel" width="50%">
        <div class="form-view">
          <el-form ref="renegotiationAlternativeBargainingText" :model="renegotiationAlternativeBargainingText" inline label-width="150px">
            <el-row :gutter="16" class="nomar" style="text-align: center">
              <el-col :span="8">
                <strong>本院价格:</strong>
                <span>{{renegotiationAlternativeBargainingText.dealPrice == ""?"无":renegotiationAlternativeBargainingText.dealPrice}}</span>
              </el-col>
              <el-col :span="8">
                <strong>阳光采购最低成交价:</strong>
                <span>{{priceFormat(renegotiationAlternativeBargainingText.ygMinPrice) == ""?"无":priceFormat(renegotiationAlternativeBargainingText.ygMinPrice)}}</span>
              </el-col>
            </el-row>
            <el-row :gutter="16" class="nomar" style="text-align: center">
              <el-col :span="8">
                <strong>议价价格区间:</strong>
                <template v-if="renegotiationAlternativeBargainingText.allMinPrice">
                  <span class="highline">{{renegotiationAlternativeBargainingText.allMinPrice}}--{{renegotiationAlternativeBargainingText.allMaxPrice}}</span>
                  <a href="javascript:;" @click="bargainingDetailsList()" class="font-12 green">查看</a>
                </template>
                <template v-else>
                  无
                </template>
              </el-col>
              <el-col :span="8">
                <strong>全国最低价：</strong>
                <span class="highline">{{priceFormat(renegotiationAlternativeBargainingText.rminPrice) == ""?"无":priceFormat(renegotiationAlternativeBargainingText.rminPrice)}}</span>
                <a href="javascript:;" @click="openValidPrice()" class="font-12 green">查看</a>
              </el-col>
            </el-row>
            <hr>
            <el-form-item label="请设置议价时间：" prop="time">
              <el-date-picker
                style="width:426px !important;"
                :unlink-panels=true
                v-model="renegotiationAlternativeBargainingText.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="设定开始日期"
                end-placeholder="设定结束日期"
                size="small"
                :default-time="[this.nowDate, '10:00:00']"
                :picker-options="pickerOptions"
                format = "yyyy-MM-dd HH:mm"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="请设置参考价：">
              <el-input v-model="renegotiationAlternativeBargainingText.referencePrice" style="width:426px" size="small"></el-input>
            </el-form-item>
            <el-form-item label="请填写备注：">
              <el-input type="textarea" :rows="3" maxlength="4000" style="width:426px" placeholder="请输入备注内容" v-model="renegotiationAlternativeBargainingText.textarea"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="renegotiation()">发送</el-button>
          <el-button @click="closRenegotiationModel()">取消</el-button>
        </span>
      </el-dialog>

      <!--4.全国有效中标价格-->
      <el-dialog title="全国有效中标价格" :visible.sync="showValidprice" :before-close="closeValidPrice" width="60%">
        <el-form :inline="true" ref="validpriceData" :model="validpriceData">
          <el-table
            :data="validpriceData.list"
            style="width: 100%"
            max-height="400"
            border
            stripe>
            <el-table-column label="项目名称"  :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.PROJECT_NAME }}</span>
              </template>
            </el-table-column>

            <el-table-column label="省份">
              <template slot-scope="scope">
                <span>{{ scope.row.PROVINCE }}</span>
              </template>
            </el-table-column>

            <el-table-column label="价格">
              <template slot-scope="scope">
                <span>{{ scope.row.PROJECT_PRICE }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <!-- 表格分页 -->
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange5"
            @current-change="handleCurrentChange5"
            :page-sizes="[10, 20, 30]"
            :total="validpriceData.total"
            :page-size="validpriceData.pageSize"
            :page-count="validpriceData.pages"
            :current-page.sync="validpriceData.pageNum">
          </el-pagination>
        </div>
      </el-dialog>

      <!--4.客观分查看详细-->
      <el-dialog title="客观分详细" :visible.sync="showScoreDetailed" :close-on-click-modal="false" :before-close="closeScoreDetailedFun" width="50%">

        <div class="info-view">
          <div class="view-title">
            <span class="font-14">产品得分：</span>
            <span class="highline">{{ScoreDetailedText.companyScoreSum}}</span>
          </div>
          <div class="view-content" v-if="ScoreDetailedText.companyScoreSum">
            <dl class="w33-3" v-for="data in ScoreDetailedText.companyClassify">
              <dt>{{data.attRame}}：</dt>
              <dd>{{data.score}}</dd>
            </dl>
          </div>
          <div class="view-title">
            <span class="font-14">企业得分：</span>
            <span class="highline">{{ScoreDetailedText.productScoreSum}}</span>
          </div>
          <div class="view-content" v-if="ScoreDetailedText.productScoreSum">
            <dl class="w33-3" v-for="data in ScoreDetailedText.productClassify">
              <dt>{{data.attRame}}：</dt>
              <dd>{{data.score}}</dd>
            </dl>
          </div>

          <hr>

          <div class="view-title">
            <span class="font-14">客观总分：</span>
            <span class="highline">{{ScoreDetailedText.productScoreSum + ScoreDetailedText.companyScoreSum}}</span>
          </div>
        </div>
        <span slot="footer">
          <el-button @click="closeScoreDetailedFun()" size="small" class="el-button-pale">关闭</el-button>
        </span>
      </el-dialog>

      <el-dialog title="查看议价详情" :visible.sync="showBargainingDetails" :before-close="closeBargainingDetails" width="60%">
        <el-form ref="bargainDetailQuery" :model="bargainDetailQuery" size="small" :inline="true" class="table-form">
          <el-form-item>
            <el-input size="small" v-model="bargainDetailQuery.name" maxlength="200" placeholder="议价医院" @keyup.enter.native="searchEnterBargainDetailFun"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select size="small" v-model="bargainDetailQuery.ordCount" placeholder="到货记录">
              <el-option-group
                key="到货记录"
                label="到货记录">
                <el-option
                  v-for="item in ordCountSources"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button  size="small" type="success" @click="searchEnterBargainDetailFun">查询</el-button>
            <el-button size="small" type="warning" @click="resetBargainDetail()">重置</el-button>
          </el-form-item>
        </el-form>

        <el-form :inline="true" ref="bargainingDetailsData" :model="bargainingDetailsData">
          <el-table
            :data="bargainingDetailsData.list"
            style="width: 100%"
            max-height="400"
            border
            stripe
            @sort-change="bargainingDetailsDataSortChange">
            <el-table-column label="议价医院" prop="name" sortable="custom" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="价格" align="right">
              <template slot-scope="scope">
                <span>{{ scope.row.bidPrice }}</span>
              </template>
            </el-table-column>

            <!-- <el-table-column label="议价时间">
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
             </el-table-column>-->

            <el-table-column label="议价时间" align="center">
              <template slot-scope="scope">
                <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                  <div slot="content">{{ scope.row.confirmTime }}</div>
                  <span>{{ scope.row.confirmDate }}</span>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column label="是否有到货记录">
              <template slot-scope="scope">
                <span>{{ scope.row.ordCount }}</span>
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
  import {bargainCueHttp,queryBasicModelList,selectRemarkHttp,invalidProductHttp,bargainExcel,confirmHttp,queryMaintainBargainListHttp,updateBargainTimeHttp,removeBargainHttp,insertBargainHttp,deleteBargainHttp,refuseHttp,renegotiationHttp,bargainHospitalPrice} from 'src/axios/contract/bargainmanagement/maintainBargainList'
  import {insertAlternativeBargainingHttp,findSectionPriceHttp,validPriceHttp} from 'src/axios/contract/catalogmanagement/hosCandidateCatalogType';
  import {scoreDetailedHttp,querySysCatalog,bargainingDetailsHttp} from "src/axios/contract/catalogmanagement/basicDrugDataType";
  import {priceFormat, keyBoardEnter} from "src/utils"
  import moment from "moment";
  import fileUpload from 'js-file-download'
  import RangeBar from 'src/components/RangeBar'
  export default {
    components: {RangeBar},
    data () {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7  ;
          },
        },
        currentOrder:undefined, //分页的时候缓存
        currentOrderDialog:undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        bargainDetailQuery: this.bargainDetailMetaQuery(), // 查询初始化
        showBargainTime:false,//设置议价时间弹出框
        bargainTimeForm:{
          time:"",
        },
        sources: [{
          label : '全部',
          value : ''
        },{
          label : '未报价',
          value : '0_1'
        },{
          label : '已过期',
          value : '0_2'
        },{
          label : '已报价',
          value : '1'
        },
          {
            label : '已拒绝',
            value : '2'
          }],
        ordCountSources: [{
          label : '全部',
          value : ''
        },{
          label : '是',
          value : '1'
        },{
          label : '否',
          value : '0'
        }],
        remark:{factoryRemark:""},
        showFactoryRemark:false,
        basicModel:false,
        //-----------药品数据库 begin
        basicModelQuery:this.basicModelMetaQuery(), // 查询初始化
        basicModelResData:this.metaData(),
        boxShow: false,
        boxhide:true,
        minPrice:"",
        maxPrice:"",
        nowDate:"",
        showAlternativeBargaining:false,
        AlternativeBargainingText:this.alternativeBargainingTextData(),
        showScoreDetailed:false,//客观分详细弹框
        ScoreDetailedText: this.scoreDetailedData(),//框内数据初始化
        catalogAreas:[{catalogId:"",catalogName:""}],
        /*resStates:[
          {
            label : '全部',
            value : ''
          },
          {
            label : '是',
            value : '1'
          },
          {
            label : '否',
            value : '-1'
          }
        ],*/
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
        healthFlags :[
          {
            label:'全部',
            value:''
          }
        ],
        /*purchaseStates:[
          {
            label : '全部',
            value : ''
          },
          {
            label : '已加入',
            value : '1'
          },
          {
            label : '未加入',
            value : '0'
          }
        ],*/
        basicData : [{    //基药标记选择
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
        }],
        hosCons : [{    //本院目录选择
          label : '全部',
          value : ''
        },{
          label : '是',
          value : '1'
        },{
          label : '否',
          value : '0'
        }],
        //-----------药品数据库 end
        //------------再议价 begin
        showRenegotiationModel:false,
        renegotiationAlternativeBargainingText:this.alternativeBargainingTextData(),
        //-----------再议价end
        //-----------议价详情begin
        bargainingDetailsData:this.metaData(),
        showBargainingDetails:false,
        //-----------议价详情end

        //----------全国有效中标价格 begin
        bargainingProductId:"",
        validpriceData:this.metaData(),//数据列表
        showValidprice:false,//全国有效中标价格弹框
        //----------全国有效中标价格 end
      }
    },
    created () {
      this.list();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
      moment,
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
          query: {
            productName : undefined,
            sources : [{
              label : '全部',
              value : ''
            }]
          }
        }
      },
      bargainDetailMetaQuery () { // 表单查询数据初始化
        return {
          name : undefined,
          ordCount : undefined
        }
      },
      basicModelMetaQuery () { // 表单查询数据初始化
        return {
          productName : undefined,
          spec : undefined,
          doseageFormName :undefined,
          manufactureName : undefined,
          catalogArea : undefined,
          twoVote : undefined,
          healthFlag : undefined,
          basicFlag : undefined,
          hosCon : undefined
          /*purchaseState : undefined*/
        }
      },
      alternativeBargainingTextData (){
        return {
          dealPrice:"", //本院价格
          ygMinPrice:"",//阳光采购最低成交价
          allMinPrice:"",//议价价格区间 最低价(原 minPrice)
          allMaxPrice:"",//议价价格区间 最低价（原 maxPrice）
          rminPrice:"",//全国最低价

          textarea:"",
          time:"",
          referencePrice:"",
          // bidPrice:"",
          // minPrice:""
        }
      },
      scoreDetailedData(){
        return {
          productClassify: [],
          companyClassify:[],
          productScoreSum:0,
          companyScoreSum:0
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryMaintainBargainListHttp(this.resData, this.query).then(res => {
          console.log(res)
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum =1;
          }
        })
      },
      //设定议价时间弹框
      bargainTime(){
        this.showBargainTime = true;
      },
      //关闭设定议价弹框
      closeBargainTime(){
        this.showBargainTime = false;
      },
      //保存设定议价时间
      updateBargainTime(){
        updateBargainTimeHttp(this.bargainTimeForm.time).then(res=>{
          if(res.data > 0){
            this.$message({
              message: '设定成功',
              type: 'success'
            });
            this.list();
            this.showBargainTime = false;
          }else{
            this.$message({
              message: '设定失败',
              type: 'warning'
            });
          }
        })
        console.log(this.bargainTimeForm.time)
      },
      //是否显示移除按钮
      isShowRemove(juageHos,bidFlag){
        if(juageHos){
          if(bidFlag == 0){
            return true;
          }
        }
        return false;
      },
      //移除当前数据
      removeBargain(id){
        this.$confirm('是否确认移除本次议价？移除后备选议价目录仍存在该产品，可重新加入本次议价！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          removeBargainHttp(id).then(res=>{
            if(res.data > 0){
              this.$message({
                message: '移除成功',
                type: 'success'
              });
              this.list();
            }else{
              this.$message({
                message: '移除失败',
                type: 'error'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //备选议价加入议价
      insertObjectId(){
        this.$confirm('此操作将把所有移除的数据恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          insertBargainHttp().then(res=>{
            if(res.data > 0){
              this.$message({
                message: '加入成功',
                type: 'success'
              });
              this.list();
            }else{
              this.$message({
                message: '无待加入的议价',
                type: 'warning'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除议价
      deleteBargain(id){
        this.$confirm('是否确认删除此产品？删除后不可恢复，您需要重新将其加入议价，请谨慎操作！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteBargainHttp(id).then(res=>{
            if(res.data > 0){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.list();
            }else{
              this.$message({
                message: '删除失败',
                type: 'error'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //确认
      confirm(id){
        this.$confirm('是否确认此价格', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          confirmHttp(id).then(res => {
            if (res.data > 0) {
              this.$message({
                message: '确认成功',
                type: 'success'
              });
              this.list();
            } else {
              this.$message({
                message: '系统错误',
                type: 'error'
              });
            }
          })
        })
      },
      //拒绝
      refuse(id){
        this.$confirm('是否拒绝此价格', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          refuseHttp(id).then(res => {
            if (res.data > 0) {
              this.$message({
                message: '确认成功',
                type: 'success'
              });
              this.list();
            } else {
              this.$message({
                message: '系统错误',
                type: 'error'
              });
            }
          })
        })
      },
      reset(){
        this.query = this.metaQuery();
        this.list();
      },
      //议价状态
      priceState (confirmFlag, bidFlag, dateComp) {
        if (confirmFlag == 1) {
          return '已确认'
        } else if (confirmFlag == 0) {
          if (bidFlag == 1) {
            return '已报价'
          } else if(bidFlag == 2){
            return "已拒绝";
          }else {
            if (dateComp > 0) {
              return '已过期'
            } else {
              return '未报价'
            }
          }
        }
      },
      //是否显示确认/拒绝按钮
      //1.医院确认状态2.企业报价状态
      isShowConfirm(confirmFlag,bidFlag){
        if(confirmFlag == 0){
          if(bidFlag != 0){
            return true;
          }
        }else{
          return false;
        }
        return false;
      },
      handleGoAdd (id) {
        this.$router.push("/contract/datamanagement/hospitalDeliveryAddress/" + id);
      },
      deleteAddress(id) {
        this.$confirm(`您删除收货地址的同时，之前的产品配送关系可能失效，是否确认删除？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteHospitalAddress(id).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list();
              }
            })
          })
        })
      },
      updateAddress(id) {
        this.$router.push("/contract/datamanagement/hospitalDeliveryAddress/" + id);
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
      bargainingDetailsDataSortChange(value){
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.bargainingDetailsList();
      },
      sortChangeDialog(value){
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrderDialog=value.prop + sortType;
        } else {
          this.currentOrderDialog=undefined;
        }
        this.basicModelList();
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      },
      searchEnterBargainDetailFun(e){
        this.bargainingDetailsData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.bargainingDetailsList();
        })
      },
      resetBargainDetail(){
        this.bargainDetailQuery = this.bargainDetailMetaQuery();
        this.bargainingDetailsList();
      },
      basicModelSearchEnterFun(e){
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.basicModelList();
        })
      },

      Excel(){
        this.lyfloading = true;
        bargainExcel(this.resData, this.query).then(res => {
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
      //参考价
      referencePrice(bidPrice,bjPrice,hbPrice,tjPrice,catalogAreaFlag) {

        if (catalogAreaFlag > 0) {
          return "全国最低价" + priceFormat(bidPrice);
        } else {
          return "河北最低价:" + ((hbPrice != null && hbPrice != '') ? priceFormat(hbPrice) : '无') + "," + "天津最低价:" + ((tjPrice != null && tjPrice != '') ? priceFormat(tjPrice) : '无') + "," + "北京最低价:" + ((bjPrice != null && bjPrice != '') ? priceFormat(bjPrice) : '无');
        }
      },

      judgmentFun(maxPrice, minPrice, bhiBidPriceMax, bidPrice){
        if((maxPrice == null || maxPrice == '') && (minPrice == null || minPrice == '')){
          if(bhiBidPriceMax == null || bhiBidPriceMax == ''){
            if(bidPrice == null || bidPrice == '' || bidPrice == 0){
              return false;
            }else{
              return true;
            }
          }else{
            return true;
          }
        }else{
          return true;
        }
      },
      tradeJudgmentFun(maxPrice, minPrice, bidPrice){
        if((maxPrice == null || maxPrice == '') && (minPrice == null || minPrice == '')){
          if(bidPrice == null || bidPrice == '' || bidPrice == 0){
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
      },

      //企业报价
      //如果有议价价格那么无条件填写 bhiBidPrice ，如果没有议价价格那么 当resState == 1 显示result_bid_item 的bid_price 否则显示 待谈判
      /*bidPriceData(resState,bidPrice){
        if(resState == 1){
          return this.priceFormat(bidPrice);
        }else{
          return "待谈判"
        }
      },*/
      bidPriceData(sort, confirmFlag, bhiBidPrice){
        if(sort == 1) {
          if (confirmFlag == 1) {
            return this.priceFormat(bhiBidPrice);
          } else {
            return "";
          }
        }
      },

      max_min_price_format(maxPrice, minPrice, bhiBidPriceMax, bidPrice, flag){
        if((maxPrice == null || maxPrice == '') && (minPrice == null || minPrice == '')){
          if(bhiBidPriceMax == null || bhiBidPriceMax == ''){
            if(bidPrice != null && bidPrice != '' && bidPrice != 0){
              return this.priceFormat(bidPrice);
            }
          }else{
            return this.priceFormat(bhiBidPriceMax);
          }
        }else{
          if((maxPrice != null && maxPrice != '') && (minPrice != null && minPrice != '')){
            if(flag == 'max'){
              return this.priceFormat(maxPrice);
            } else {
              return this.priceFormat(minPrice);
            }
          }else if((maxPrice != null && maxPrice != '') && (minPrice == null || minPrice == '')){
            return this.priceFormat(maxPrice);
          }else if((maxPrice == null || maxPrice == '') && (minPrice != null && minPrice != '')){
            return this.priceFormat(minPrice);
          }
        }
      },
      trade_max_min_price_format(maxPrice, minPrice, bidPrice, flag){
        if((maxPrice == null || maxPrice == '') && (minPrice == null || minPrice == '')){
          if(bidPrice != null && bidPrice != '' && bidPrice != 0){
            return this.priceFormat(bidPrice);
          }
        }else{
          if((maxPrice != null && maxPrice != '') && (minPrice != null && minPrice != '')){
            if(flag == 'max'){
              return this.priceFormat(maxPrice);
            } else {
              return this.priceFormat(minPrice);
            }
          }else if((maxPrice != null && maxPrice != '') && (minPrice == null || minPrice == '')){
            return this.priceFormat(maxPrice);
          }else if((maxPrice == null || maxPrice == '') && (minPrice != null && minPrice != '')){
            return this.priceFormat(minPrice);
          }
        }
      },

      bhiBidPriceData(bhiBidPrice,talkType){
        if(talkType == "1"){
          return bhiBidPrice+"(议价)";
        }else if(talkType == "3"){
          return bhiBidPrice+"(降价)";
        }
      },
      //企业报价 a标签
      bidPriceDataForA(bhiBidPrice,confirmFlag){
        if(bhiBidPrice != null && bhiBidPrice != "" && confirmFlag == 1){
          return true;
        }else{
          return false;
        }
      },
      //作废此条产品议价
      invalidProduct(id){
        invalidProductHttp(id).then(res => {
          if(res.data >0){
            this.$message({
              message: '操作成功',
              type: 'success',
              onClose: () => {
                this.list();
              }
            })
          }

        })
      },
      //是否显示作废按钮
      isShowInvalid(bidFlag,confirmFlag){
        if(bidFlag == 0&&confirmFlag == 0){
          return true;
        }else{
          return false;
        }
      },
      //显示查看按钮
      isShowSelect(bidFlag){
        if(bidFlag == 1 || bidFlag == 2){
          return true;
        }
        return false;
      },
      //点击查看按钮显示备注
      selectRemark(id){
        selectRemarkHttp(id).then(res => {
          this.remark.factoryRemark =   res.data.refuseFemark;
          this.showFactoryRemark = true;
        })
      },
      closeFactoryRemark(){

        this.showFactoryRemark = false
      },

//   ---------------------------   新增 begin--------------------------
      closebasicModel(){
        this.basicModel = false;
        this.basicModelQuery = this.basicModelMetaQuery();
      },
      openbasicModel(){
        this.basicModelQuery = this.basicModelMetaQuery();
        this.basicModelList();
        this.querySysCatalogHttp();
        this.basicModel = true;
      },
      //  获取用户分页列表
      basicModelList () {
        this.basicModelResData.orderBy = this.currentOrderDialog;
        queryBasicModelList(this.basicModelResData, this.basicModelQuery).then(res => {
          this.basicModelResData = res.data
          if(this.basicModelResData.pageNum === 0){
            this.basicModelResData.pageNum =1;
          }
        })
      },
      basicModelreset(){
        this.basicModelQuery = this.basicModelMetaQuery();
        this.basicModelList();
      },
      spread:function(){
        this.boxShow = true;
        this.boxhide=false;
      },
      packup:function(){
        this.boxShow = false;
        this.boxhide=true;
      },
      basicModelHandleSizeChange (val) {
        this.basicModelResData.pageSize = val
        this.basicModelList()
      },
      basicModelhandleCurrentChange (val) {
        this.basicModelResData.pageNum = val
        this.basicModelList()
      },


      //议价弹出框显示
      showAlternativeBargainingForone(row){
        this.bargainingProductId = row.productId;
        //判断议价产品在本院目录内，是否有同品规产品
        bargainCueHttp(row.productId).then(res=>{
          const list = res.data;
          if(list.length>0){
            let dom = "<div>您医院本院目录内有：</div>";
            for(let i=0;i<list.length;i++){
              dom+= "<div>"+list[i].productName+"，成交价格为"+list[i].dealPrice+"元，</div>"
            }
            dom+="<div>请您注意议价价格符合价格合理性，避免出现价格倒挂情况出现。</div>"
            this.$notify({
              title: '提示',
              dangerouslyUseHTMLString: true,
              message: dom
            });
          }

        })

        //0.查出数据之前先清理干净，预防残留上次数据
        this.AlternativeBargainingText = this.alternativeBargainingTextData();


        //1.设置本院价格（如果有本院价格设置dealPrice，没有设置result的价格bidPrice）
        if(row.dealPrice != "" && row.dealPrice != null && row.dealPrice != 0){
          this.AlternativeBargainingText.dealPrice = row.dealPrice;
        }else if(row.bidPrice != "" && row.bidPrice == null&&row.bidPrice != 0){
          this.AlternativeBargainingText.dealPrice = row.bidPrice;
        }else{
          this.AlternativeBargainingText.dealPrice = '待谈判';
        }
        //2.全国最低价
        this.AlternativeBargainingText.rminPrice = row.rminPrice;


        findSectionPriceHttp(row.productId).then(res=>{
          if(res.message == 'SUCCESS'){
            if(typeof res.data != 'undefined'){
        //3.阳光采购最低价
              this.AlternativeBargainingText.ygMinPrice = res.data.minDealPrice
        //4.议价价格区间
              this.AlternativeBargainingText.allMinPrice = res.data.minPrice;
              this.AlternativeBargainingText.allMaxPrice = res.data.maxPrice;
              this.showAlternativeBargaining = true;
            }
          }
        })
        this.nowDate =  moment(new Date()).format("HH:mm:ss")

      },

      //加入议价
      insertAlternativeBargaining(){

        if(this.AlternativeBargainingText.time == null || this.AlternativeBargainingText.time ==""){
          this.$message({
            message: '议价时间不能为空',
            type: 'warning'
          });
          return;
        }
        insertAlternativeBargainingHttp(this.bargainingProductId,this.AlternativeBargainingText).then(res=>{
          if(res.data>0){
            this.$message({
              message: '加入成功',
              type: 'success'
            });
            this.list();
            this.basicModelList()
            this.showAlternativeBargaining = false;
          }else{
            this.$message({
              message: '系统错误',
              type: 'error'
            });
          }
        })

      },


      showScoreDetailedFun(productId){
        scoreDetailedHttp(productId).then(res=>{
          this.showScoreDetailed = true;
          this.ScoreDetailedText= res.data;
        })
      },
      closeScoreDetailedFun(){
        this.showScoreDetailed = false;
      },
      closeBargainingDetails(){
        this.showBargainingDetails = false;
      },
      //请求目录范围
      querySysCatalogHttp(){
        querySysCatalog().then(res=>{
          var header = [{catalogId: "", catalogName: "全部"}];
          this.catalogAreas = header.concat(res.data);
        })
      },
      closAlternativeBargaining(){
        this.showAlternativeBargaining = false;
      },
      showRenegotiation(dateComp,bidFlag,confirmFlag,sort){
        if(sort == 1) {
          if (confirmFlag == 0 && bidFlag == 0 && dateComp > 0) {
            return true;
          }
          if (confirmFlag == 1 || confirmFlag == 2 || confirmFlag == 3) {
            return true;
          }
        }
        return false;
      },

//   ---------------------------   新增 end--------------------------
//------------------------再议价 begin-----------------------
      renegotiation(){

        if(this.renegotiationAlternativeBargainingText.time == null || this.renegotiationAlternativeBargainingText.time ==""){
          this.$message({
            message: '议价时间不能为空',
            type: 'warning'
          });
          return;
        }

        insertAlternativeBargainingHttp(this.bargainingProductId,this.renegotiationAlternativeBargainingText).then(res=>{
          if(res.data>0){
            this.$message({
              message: '再次议价成功',
              type: 'success'
            });
            this.list();
            this.showRenegotiationModel = false;
          }else{
            this.$message({
              message: '系统错误',
              type: 'error'
            });
          }
        })

      },
      //再议价弹出框1
      openRenegotiationModel(row){
        this.bargainingProductId = row.productId;

        //判断议价产品在本院目录内，是否有同品规产品
        bargainCueHttp(row.productId).then(res=>{
          const list = res.data;
          if(list.length>0){
            let dom = "<div>您医院本院目录内有：</div>";
            for(let i=0;i<list.length;i++){
              dom+= "<div>"+list[i].productName+"，成交价格为"+list[i].dealPrice+"元，</div>"
            }
            dom+="<div>请您注意议价价格符合价格合理性，避免出现价格倒挂情况出现。</div>"
            this.$notify({
              title: '提示',
              dangerouslyUseHTMLString: true,
              message: dom
            });
          }

        })



        //查出数据之前先清理干净，预防残留上次数据
        this.renegotiationAlternativeBargainingText = this.alternativeBargainingTextData();

        //1.设置本院价格（如果有本院价格设置dealPrice，没有设置result的价格bidPrice）
        if(row.dealPrice != "" && row.dealPrice == null){
          this.renegotiationAlternativeBargainingText.dealPrice = row.dealPrice;
        }else if(row.bidPrice != "" && row.bidPrice == null&&row.bidPrice != 0){
          this.renegotiationAlternativeBargainingText.dealPrice = row.bidPrice;
        }else{
          this.renegotiationAlternativeBargainingText.dealPrice = '待谈判';
        }

        //2.设置全国最低价
        this.renegotiationAlternativeBargainingText.rminPrice = row.rminPrice;


        findSectionPriceHttp(row.productId).then(res=>{
          if(res.message == 'SUCCESS'){
            if(typeof res.data != 'undefined'){
        //3.阳光采购最低价
              this.renegotiationAlternativeBargainingText.ygMinPrice = res.data.minDealPrice
        //4.议价价格区间
              this.renegotiationAlternativeBargainingText.allMinPrice = res.data.minPrice;
              this.renegotiationAlternativeBargainingText.allMaxPrice = res.data.maxPrice;
              this.showRenegotiationModel = true;
            }
          }
        })

        this.nowDate =  moment(new Date()).format("HH:mm:ss")

      },


      closRenegotiationModel(){
        this.showRenegotiationModel = false;
      },
//-------------------------再议价end----------------------
      //-------------------议价详情begin
      //--------------议价的详情 begin (状态重用  彩虹的 议价详情)
      //议价详情
     /* priceDetails(){
        bargainingDetailsHttp(this.bargainingProductId,this.bargainingDetailsData).then(res=>{
          this.bargainingDetailsData = res.data;
          if(this.bargainingDetailsData.pageNum === 0){
            this.bargainingDetailsData.pageNum =1;
          }
          this.showBargainingDetails = true;
        })
      },*/

      bargainingDetails(productId){
        this.bargainingProductId = productId;
        this.bargainingDetailsList();

      },
      bargainingDetailsList(){
        this.bargainingDetailsData.orderBy = this.currentOrder;
        bargainingDetailsHttp(this.bargainingProductId,this.bargainingDetailsData,this.bargainDetailQuery).then(res=>{
          this.showBargainingDetails = true;
          this.bargainingDetailsData = res.data;
          if(this.bargainingDetailsData.pageNum === 0){
            this.bargainingDetailsData.pageNum =1;
          }
        })
      },
      //----------议价的详情 end

      //-------全国有效中标价格 begin
      openValidPrice(){
        this.showValidprice = true;
        this.ValidPriceList();
      },

      closeValidPrice(){
        this.showValidprice = false;
      },

      ValidPriceList(){
        validPriceHttp(this.validpriceData,this.bargainingProductId).then(res =>{
          console.log(res);
          this.validpriceData = res.data;
          if(this.validpriceData.pageNum === 0){
            this.validpriceData.pageNum =1;
          }
        })
      },
      //-------全国有效中标价格 end
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      handleSizeChange4 (val) {
        this.bargainingDetailsData.pageSize = val
        this.bargainingDetailsList()
      },
      handleCurrentChange4 (val) {
        this.bargainingDetailsData.pageNum = val
        this.bargainingDetailsList()
      },
      handleSizeChange5 (val) {
        this.validpriceData.pageSize = val
        this.ValidPriceList()
      },
      handleCurrentChange5 (val) {
        this.validpriceData.pageNum = val
        this.ValidPriceList()
      },

    }
  }
</script>

