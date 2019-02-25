<template>
  <!-- ========================== 主内容start ========================= -->

  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" :inline="true" class="table-form">
      <el-form-item class="width-120">
        <el-input size="small" v-model="query.productName" maxlength="200" placeholder="品名" @keyup.enter.native="searchEnterFun"></el-input>
      </el-form-item>
      <el-form-item class="width-120">
        <el-input size="small"  v-model="query.spec" maxlength="200" placeholder="规格" @keyup.enter.native="searchEnterFun"></el-input>
      </el-form-item>
      <el-form-item class="width-120">
        <el-input size="small" v-model="query.manufactureName" maxlength="200" placeholder="生产企业" @keyup.enter.native="searchEnterFun"></el-input>
      </el-form-item>
      <el-form-item class="width-100">
        <el-select size="small" v-model="query.catalogArea" placeholder="目录类型">
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
      <!--<el-form-item class="width-100">
        <el-select size="small" v-model="query.resState" placeholder="候选目录">
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
      <el-form-item class="width-90">
        <el-select size="small" v-model="query.twoVote" placeholder="两票制">
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
      <el-form-item class="width-100">
        <el-select size="small" clearable v-model="query.healthFlag" placeholder="医保标记">
          <el-option-group
            key="医保标记"
            label="医保标记">
            <el-option
              v-for="item in healthFlag"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>

      <el-form-item class="width-100">
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
                  <i v-if="scope.row.twoVoteCou > 0" class="ico icon-liang"></i>
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

        <!--<el-table-column label="参考价" prop="MINPRICE" sortable="custom" width="70" align="right" header-align="left">
          <template slot-scope="scope">
            <el-tooltip effect="dark"  placement="top">
              <div slot="content">
                {{referencePrice(scope.row.rminPrice,scope.row.bjPrice,scope.row.hbPrice,scope.row.tjPrice,scope.row.catalogAreaFlag)}}
              </div>
              <span>{{priceFormat(scope.row.rminPrice)}}</span>
            </el-tooltip>
          </template>
        </el-table-column>-->

        <el-table-column label="参考价" prop="MINPRICE" sortable="custom" width="70" align="right" header-align="left">
          <template slot-scope="scope">
            <span>{{scope.row.bidPrice}}</span>
          </template>
        </el-table-column>

        <!--<el-table-column label="候选目录" prop="CATALOGAREA" width="70" sortable="custom" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.resState == 1" class="red">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>-->

        <el-table-column label="企业报价" prop="BIDPRICE" sortable="custom" width="170" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.dealType == 5||scope.row.dealType == 6">
              <!--<span v-if="!bidPriceDataForA(scope.row.bhiBidPrice)">
              {{ bidPriceData(scope.row.resState,scope.row.bidPrice) }}
              </span>
              <a href="javascript:" v-if="bidPriceDataForA(scope.row.bhiBidPrice)" @click="bargainingDetails(scope.row.productId)" >
                {{bhiBidPriceData(scope.row.bhiBidPrice,scope.row.talkType)}}
              </a>-->
              <span>
                {{scope.row.dealType == 5?(scope.row.dealPrice+'(议价)'):(scope.row.dealPrice+'(降价)')}}
              </span>
            </template>

            <template v-if="scope.row.pminPrice != null &&scope.row.pmaxPrice != null">
              <range-bar :rangeData="[scope.row.dealPrice,scope.row.pminPrice,scope.row.pmaxPrice, 1, 1]"
                         @bar-click="companyPrice(scope.row.productId)"></range-bar>
            </template>

            <template v-else>
              <range-bar :rangeData="[scope.row.dealPrice,scope.row.pminPrice,scope.row.pmaxPrice]"></range-bar>
            </template>
          </template>
        </el-table-column>

        <el-table-column label="议价状态" prop="BASICFLAG" sortable="custom" width="65" align="center">
          <template slot-scope="scope">
            <div v-html="bargainState(scope.row.resState,scope.row.confirmFlag)">
              {{ bargainState(scope.row.resState,scope.row.confirmFlag)}}
            </div>
          </template>
        </el-table-column>


        <el-table-column label="其它医院" prop="OTHERHOSCOUNT" sortable="custom" width="70" align="right">
          <template slot-scope="scope">
            <a href="javascript:" @click="hosSelectionHos(scope.row.productId)">{{ scope.row.otherHosCount }}</a>
            <!--<span></span>-->
          </template>
        </el-table-column>
        <el-table-column label="已选配送" prop="SENDER_COUNT" sortable="custom"  width="70" align="right">
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
        <el-table-column label="是否进入交易" prop="SENDER_COUNT" sortable="custom"  width="70" align="right">
          <template slot-scope="scope">
            <span>{{ scope.row.isInTrade>0?"是":"否" }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <div class="operates">
              <a v-if="bargainingForA(scope.row.alternativeBargaining,scope.row.confirmFlag)" @click="showAlternativeBargainingForone(scope.row)" >议价</a>
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
          <el-select v-model="showHosDataQuery.level" placeholder="医院级别">
            <el-option
              v-for="item in levels"
              :key="item.level"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
          <el-row :gutter="16" class="nomar" style="text-align: center">
            <el-col :span="8">
              <strong>本院价格：</strong>
              <span class="highline">{{priceFormat(AlternativeBargainingText.dealPrice) == ""?"无":priceFormat(AlternativeBargainingText.dealPrice)}}</span>
            </el-col>
            <el-col :span="8">
              <strong>阳光采购最低成交价：</strong>
              <span class="highline">{{priceFormat(AlternativeBargainingText.ygMinPrice) == ""?"无":priceFormat(AlternativeBargainingText.ygMinPrice)}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="16" class="nomar" style="text-align: center">
            <el-col :span="8">
              <strong>议价价格区间：</strong>
              <template v-if="AlternativeBargainingText.allMinPrice">
                <span class="highline">{{AlternativeBargainingText.allMinPrice}}--{{AlternativeBargainingText.allMaxPrice}}</span>
                <a href="javascript:;" @click="priceDetails()">查看</a>
              </template>
              <template v-else>
                <span>无</span>
              </template>
            </el-col>
            <el-col :span="8">
              <strong>全国最低价：</strong>
              <span class="highline">{{priceFormat(AlternativeBargainingText.rminPrice) == ""?"无":priceFormat(AlternativeBargainingText.rminPrice)}}</span>
              <a href="javascript:;" @click="openValidPrice()" class="font-12 green">查看</a>
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
              format = "yyyy-MM-dd HH:mm"
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

    <!--4.价格-->
    <el-dialog title="价格" :visible.sync="dialogVisible" width="800px" height="520px" :close-on-click-modal="false">
      <div>
        <!-- 表格 -->
        <!-- 表格查询表单 -->
        <div class="table-form">
          <el-form ref="query" :model="query" label-position="right" size="small">
            <div class="formrow">
            <span>
                <el-input v-model="query.searchBuyerName" @keyup.enter.native="searchEnterFunPrice" placeholder="医疗机构"
                          size="small"></el-input>
            </span>
              <span>
                <el-input v-model="query.searchSenderName" @keyup.enter.native="searchEnterFunPrice" placeholder=" 配送企业"
                          size="small"></el-input>
            </span>
              <span class="date-group">
              <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFunPrice" placeholder="到货开始日期"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              v-model="query.searchBenDate"></el-date-picker>
            &nbsp;至&nbsp;
              <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFunPrice" placeholder="到货结束日期"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              v-model="query.searchEndDate"></el-date-picker>
            </span>
              <el-form-item>
                <el-button type="success" size="small" @click="searchEnterFunPrice">查询</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>

        <!-- 表格列表 -->
        <div class="tableset">
          <el-table
            :data="priceDetailsData.list"
            @sort-change="sortChangPrice"
            border
            stripe>
            <!--   <el-table-column type="index" width="50" header-align="left" align="center" label="序号"  ></el-table-column>-->
            <el-table-column label="医疗机构" prop="buyer_Org_Easy" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.buyerOrgEasy }}</span>
              </template>
            </el-table-column>
            <el-table-column label="价格" prop="unit_Price" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.unitPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="配送企业" prop="sender_Org_Easy" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.senderOrgEasy }}</span>
              </template>
            </el-table-column>
            <!--<el-table-column label="到货日期" prop="modify_Date" sortable="custom">
              <template slot-scope="scope">
                <span>{{ scope.row.modifyDate }}</span>
              </template>
            </el-table-column>-->
            <el-table-column label="到货日期" prop="modify_Date" sortable="custom" :show-overflow-tooltip="true" width="90" align="center">
              <template slot-scope="scope">
                <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                  <div slot="content">{{ scope.row.modifyDate }}</div>
                  <span v-if="scope.row.modifyDate!=null && scope.row.modifyDate!=''">{{ moment(scope.row.modifyDate).format("YYYY-MM-DD") }}</span>
                  <span v-else></span>
                </el-tooltip>
              </template>
            </el-table-column>

          </el-table>
        </div>
        <!-- 表格分页 -->
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange6"
            @current-change="handleCurrentChange6"
            :page-sizes="[10, 20, 30]"
            :total="priceDetailsData.total"
            :page-size="priceDetailsData.pageSize"
            :page-count="priceDetailsData.pages"
            :current-page.sync="priceDetailsData.pageNum">
          </el-pagination>
        </div>

      </div>
      <!-- ========================== 主内容end ========================= -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
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

  </div>
  <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryHosCandidateCatalogListTabJoined,queryHosCandidateCatalogListTabJoinedExportExcel,insertAlternativeBargainingHttp,delAlternativeBargainingHttp,findSectionPriceHttp,priceDetailsList,validPriceHttp,getAllHospitalLevel} from 'src/axios/contract/catalogmanagement/hosCandidateCatalogType'
  import {findSelectionHos,deleteBatchPurchaseList,bargainingDetailsHttp,querySysCatalog} from "src/axios/contract/catalogmanagement/basicDrugDataType";
  import {bargainCueHttp} from 'src/axios/contract/bargainmanagement/maintainBargainList';
  import fileUpload from 'js-file-download'
  import {priceFormat, keyBoardEnter} from "src/utils"
  import moment from "moment";
  import RangeBar from 'src/components/RangeBar';

  export default {
    components: {RangeBar},
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
        showHosDataQuery:{name:"", level:""},
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
        levels:[],
        //价格详情相关
        priceDetailsData:this.metaData(),
        dialogVisible:false,
        currentOrderPrice:undefined,
        bargainDetailQuery: this.bargainDetailMetaQuery(), // 查询初始化
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

        //备选议价相关
        AlternativeProductId:"",
        AlternativeBargainingText:this.alternativeBargainingTextData(),
        showAlternativeBargaining:false,
        /*minPrice:"",
        maxPrice:"",*/
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
        bargainingDetailsProductId:"",
        rules: {
          time: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        },


        catalogAreas:[{catalogId:"",catalogName:""}],
        //候选目录
        resStates:[
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
        ],
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
        healthFlag :[
          {label:'全部',value:''}
        ],
        //----------全国有效中标价格 begin
        validpriceData:this.metaData(),//数据列表
        showValidprice:false,//全国有效中标价格弹框
        //----------全国有效中标价格 end
      }
    },
    created () {
      this.getAllLevel();
      this.list();
      this.querySysCatalogHttp()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      moment,
      priceFormat,
      alternativeBargainingTextData (){
        return {
          dealPrice:"", //本院价格
          ygMinPrice:"",//阳光采购最低成交价(原 AlternativeBargainingText minPrice)
          allMinPrice:"",//北京市议价价格区间 最低价(原 minPrice)
          allMaxPrice:"",//北京市议价价格区间 最低价（原 maxPrice）
          rminPrice:"",//全国最低价

          textarea:"",
          time:"",
          referencePrice:"",
        }
      },
      bargainDetailMetaQuery () { // 表单查询数据初始化
        return {
          name : undefined,
          ordCount : undefined
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
          basicFlag:undefined,
          productId: undefined,
          searchBuyerName: undefined,
          searchSenderName: undefined,
          searchBenDate: undefined,
          searchEndDate: undefined
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
        this.resData.orderBy = this.currentOrder;
        queryHosCandidateCatalogListTabJoined(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data;
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
          }
        })
      },
      getAllLevel(){
        getAllHospitalLevel().then(res => {
          this.levels = res.data;
        });
      },
      //请求目录范围
      querySysCatalogHttp(){
        querySysCatalog().then(res=>{
          var header = [{catalogId: "", catalogName: "全部"}];
          this.catalogAreas = header.concat(res.data);
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
          this.AlternativeBargainingText.dealPrice = row.dealPrice;

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


        this.AlternativeProductId = row.productId;
        this.nowDate =  moment(new Date()).format("HH:mm:ss")

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
      searchEnterBargainDetailFun(e){
        this.bargainingDetailsData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.priceDetails();
        })
      },
      resetBargainDetail(){
        this.bargainDetailQuery = this.bargainDetailMetaQuery();
        this.priceDetails();
      },

      priceDetails(){
        bargainingDetailsHttp(this.AlternativeProductId,this.bargainingDetailsData,this.bargainDetailQuery).then(res=>{
          this.bargainingDetailsData = res.data;
          if(this.bargainingDetailsData.pageNum === 0){
            this.bargainingDetailsData.pageNum =1;
          }
          this.showBargainingDetails = true;
        })
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
        this.priceDetails();
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
      bidPriceDataForA(bhiBidPrice){
        if(bhiBidPrice != null && bhiBidPrice != ""){
          return true;
        }else{
          return false;
        }
      },
      closeBargainingDetails(){
        this.showBargainingDetails = false;
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
      bargainingForA(alternativeBargaining,confirmFlag){
        if(alternativeBargaining == 0){
          return true;
        }
        if(alternativeBargaining >0 && confirmFlag != 0){
          return true;
        }
        return false;
      },
      //------------------价格弹窗begin
      companyPrice(param){
        this.dialogVisible = true;
        this.query.searchBuyerName = "";
        this.query.searchSenderName = "";
        this.query.searchBenDate = "";
        this.query.searchEndDate = "";
        this.query.productId = param;
        this.companyPriceList();
      },

//        获取用户分页列表
      companyPriceList(){
        this.priceDetailsData.orderBy=this.currentOrderPrice;
        priceDetailsList(this.priceDetailsData,this.query).then(res => {
          this.priceDetailsData = res.data;
          if(this.priceDetailsData.pageNum === 0){
            this.priceDetailsData.pageNum = 1
          }
        })
      },
      sortChangPrice(value){
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrderPrice=value.prop + sortType;
        } else {
          this.currentOrderPrice=undefined;
        }
        this.companyPriceList();
      },
      //------------------价格弹窗end

      //-------全国有效中标价格 begin
      openValidPrice(){
        this.showValidprice = true;
        this.ValidPriceList();
      },

      closeValidPrice(){
        this.showValidprice = false;
      },

      ValidPriceList(){
        validPriceHttp(this.validpriceData,this.AlternativeProductId).then(res =>{
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
      handleSizeChange5 (val) {
        this.validpriceData.pageSize = val
        this.ValidPriceList()
      },
      handleCurrentChange5 (val) {
        this.validpriceData.pageNum = val
        this.ValidPriceList()
      },

      handleSizeChange6 (val) {
        this.priceDetailsData.pageSize = val
        this.companyPriceList()
      },
      handleCurrentChange6 (val) {
        this.priceDetailsData.pageNum = val
        this.companyPriceList()
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
      searchEnterFunPrice(e){
        this.priceDetailsData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.companyPriceList();
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

