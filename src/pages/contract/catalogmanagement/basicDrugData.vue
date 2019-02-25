<template>
  <div v-loading="lyfloading" element-loading-text="正在导出中">
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" class="table-form" :inline="true">
            <el-form-item class="width-150">
              <el-input size="small"  v-model="query.productName" maxlength="200" placeholder="品名" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-150">
              <el-input size="small"  v-model="query.manufactureName" maxlength="200" placeholder="生产企业" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <!--begin不知道如何筛选-->
            <el-form-item class="width-150">
              <el-input size="small"  v-model="query.doseageFormName" maxlength="200" placeholder="剂型" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-150">
              <el-input size="small"  v-model="query.spec" maxlength="200" placeholder="规格" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-150">
               <el-select size="small" v-model="query.catalogArea" placeholder="目录范围">
                 <el-option-group
                   key="目录范围"
                   label="目录范围">
                   <el-option
                      v-for="item in catalogAreas"
                      :key="item.catalogId"
                      :label="item.catalogName"
                      :value="item.catalogId">
                   </el-option>
                 </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item class="nomar">
              <el-button size="small" v-show="boxhide" type="success" @click="searchEnterFun">查询</el-button>
              <el-button size="small" v-show="boxhide" type="warning" @click="reset()">重置</el-button>
              <el-button size="small" @click="spread"  v-show="boxhide">更多<i class="el-icon-arrow-down"></i></el-button>
            </el-form-item>
            <span style="font-size: 0;" v-show="boxShow">
              <!--<el-form-item class="width-150">
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
              <el-form-item class="width-150">
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
              <el-form-item class="width-150">
                <el-select size="small" v-model="query.purchaseState" placeholder="采购状态">
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
              </el-form-item>


              <el-form-item class="width-150">
                <el-select size="small" v-model="query.basicFlag" placeholder="基药标记">
                  <el-option-group
                    key="基药标记"
                    label="基药标记">
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
                  <el-button size="small"  type="success" @click="list()">查询</el-button>
                  <el-button size="small" type="warning" @click="reset()">重置</el-button>
                <el-button size="small" @click="packup" >收起<i class="el-icon-arrow-up"></i></el-button>
              </el-form-item>
          </span>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @selection-change="handleSelectionChange"
          @sort-change="sortChange">
          <!--<el-table-column type="selection" width="40" align="center" :selectable="selectable"></el-table-column>-->
          <el-table-column type="selection" width="40" align="center" ></el-table-column>
          <el-table-column label="通用名" prop="nameChn" width="90" sortable>
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

          <el-table-column label="申报企业" prop="OBJECTIVESCORE" sortable="custom" width="100">
            <template slot-scope="scope">
              <div :title="scope.row.bidOrgName">{{ scope.row.bidOrgName}}</div>
            </template>
          </el-table-column>

          <el-table-column label="目录类型" prop="CATALOGAREA" sortable="custom" width="90" align="center" >
            <template slot-scope="scope">
              <span>{{ scope.row.catalogArea }}</span>
            </template>
          </el-table-column>

          <el-table-column label="客观分" prop="OBJECTIVESCORE" sortable="custom" width="80" align="right">
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
                <span class="blue">{{priceFormat(scope.row.rminPrice)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>-->
          <el-table-column label="成交参考价" prop="BIDPRICE" sortable="custom" width="70" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{scope.row.bidPrice}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="候选目录" prop="RESSTATE" sortable="custom" width="75" align="center">
            <template slot-scope="scope">
              <span class="red" v-if="scope.row.resState == 1">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>-->

          <el-table-column label="成交价格区间" prop="BIDPRICE" sortable="custom" width="150" align="center">
            <template slot-scope="scope">

              <template v-if="scope.row.minPrice != null &&scope.row.maxPrice != null">
                <range-bar :rangeData="[scope.row.bidPrice,scope.row.minPrice,scope.row.maxPrice, 1, 1]"
                           @bar-click="companyPrice(scope.row.productId)"></range-bar>
              </template>

              <template v-else>
                <range-bar :rangeData="[scope.row.bidPrice,scope.row.minPrice,scope.row.maxPrice]"></range-bar>
              </template>

            </template>
          </el-table-column>

          <el-table-column label="状态" width="80" prop="HOSCON" sortable="custom" align="center">
            <template slot-scope="scope">
             <!-- <span v-if="(scope.row.hosCon)>0">已加入</span>
              <span  v-else >未加入</span>-->
              <span>{{stateFun(scope.row.hosCon,scope.row.enableFlag)}}</span>
            </template>
          </el-table-column>

          <el-table-column label="上一年未发生采购" width="80" prop="HOSCON" sortable="custom" align="center">
            <template slot-scope="scope">
              <span v-if="(scope.row.lypiCount)>0">否</span>
              <span class="orange" v-else >是</span>
            </template>
          </el-table-column>

         <!-- <el-table-column label="可配送数" prop="CANCOUNT" sortable="custom" width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.canCount }}</span>
            </template>
          </el-table-column>-->

          <el-table-column label="操作" width="180" v-if="showSetting">
            <template slot-scope="scope">
              <div v-if="scope.row.enableFlag==1" class="operates">
                <!--需求变更去掉加入备选议价，采购目录改为本院目录 -->
                <!--&lt;!&ndash;备选议价&ndash;&gt;-->
                <!--<a href="javascript:;" v-if="alternativeBargainingDisplay(scope.row.resState,scope.row.alternativeCon,scope.row.hosCon)"-->
                   <!--type="text" size="small"-->
                   <!--@click="(scope.row.alternativeCon)>0?delAlternativeBargainingForone(scope.row):showAlternativeBargainingForone(scope.row)">{{(scope.row.alternativeCon)>0?"删除备选议价":"加入备选议价" }}</a>-->
                <!--&lt;!&ndash;采购目录&ndash;&gt;-->
                <!--<a href="javascript:;" v-if="purchaseCatalogDisplay(scope.row.resState,scope.row.alternativeCon,scope.row.hosCon)"  type="text" size="small" @click="(scope.row.hosCon)>0?delPurchaseList(scope.row):addPurchaseList(scope.row)">{{(scope.row.hosCon)>0?"删除采购目录":"加入采购目录" }}</a>-->
                <!--“申请上架”、上架可用 的产品可以加入本院目录，查看医院和配送；-->
                <div v-if="scope.row.enableFlag == 1 || scope.row.enableFlag  == 2">
                  <a href="javascript:;" class="flo-left red" v-if="(scope.row.hosCon)>0"
                     @click="delPurchaseList(scope.row)">
                    移出本院
                  </a>
                  <a href="javascript:;" class="flo-left" v-else
                     @click="addPurchaseList(scope.row)">
                    加入本院
                  </a>

                  <a href="javascript:;" class="flo-left" @click="viewSelectionHos(scope.row.productId)">查看医院</a>
                  <a href="javascript:;" class="flo-left" @click="viewSendCompany(scope.row.productId)">查看配送</a>
                </div>
              </div>
              <div v-if="scope.row.enableFlag==0" class="operates">
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content" v-html="scope.row.comments"></div>
                  <span class="font-12 red">已禁用</span>
                </el-tooltip>
              </div>
              <div v-if="scope.row.enableFlag==3" class="operates">
                <a href="javascript:;" class="flo-left" @click="lowerFrameRemake(scope.row.remark)">下架原因</a>
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
          :pager-count="5"
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <span><el-button  size="small" type="success" @click="batchAddPurchaseList()">加入本院</el-button></span>
          <span><el-button  size="small" type="danger"  @click="batchDelPurchaseList()">移出本院</el-button></span>
          <!--<el-button  size="small" type="success" @click="showAlternativeBargainingForbatch()">加入备选议价</el-button>-->
          <el-button size="small" type="warning" @click="Excel()">导出</el-button>
          <!--<span><el-button  size="small" type="danger" @click="">删除备选议价</el-button></span>-->
        </div>
      </div>

      <!--  ====================================== 弹窗 ====================================== -->
      <!--1.查看选择医院弹窗-->
      <el-dialog title="查看选择医院" :visible.sync="showHos" :before-close="closeForm" width="60%">
        <el-form :inline="true" size="small" ref="showHosDataQuery" :model="showHosDataQuery" onsubmit="return false;" class="table-form">
          <el-form-item>
            <el-input v-model="showHosDataQuery.name" size="small"  maxlength="200" placeholder="医院名称" @keyup.enter.native="searchEnterFunViewOne"></el-input>
          </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFunViewOne" size="small">查询</el-button>
          </el-form-item>
        </el-form>

          <el-table
            :data="showHosData.list"
            style="width: 100%"
            max-height="400"
            border
            stripe>

            <el-table-column label="医院名称">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
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
            :current-page.sync="showHosData.pageNum">
          </el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showHos=false" size="small" class="el-button-pale">关闭</el-button>
        </span>
      </el-dialog>
      <!--2.查看配送企业弹窗-->
      <el-dialog title="查看配送企业" :visible.sync="showCompany" :before-close="closeCompany" width="60%">
        <el-form :inline="true" size="small" ref="showCompanyDataQuery" :model="showCompanyDataQuery" onsubmit="return false;" class="table-form">
          <el-form-item>
            <el-input v-model="showCompanyDataQuery.name" size="small" maxlength="200" placeholder="配送企业名称" @keyup.enter.native="searchEnterFunViewTwo"></el-input>
          </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchEnterFunViewTwo" size="small">查询</el-button>
          </el-form-item>
        </el-form>

          <el-table
            :data="showCompanyData.list"
            style="width: 100%"
            max-height="400"
            border
            stripe>
            <el-table-column label="配送企业">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

          </el-table>
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange3"
            @current-change="handleCurrentChange3"
            :page-sizes="[10, 20, 30]"
            :total="showCompanyData.total"
            :page-size="showCompanyData.pageSize"
            :page-count="showCompanyData.pages"
            :current-page.sync="showCompanyData.pageNum">
          </el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showCompany=false" size="small" class="el-button-pale">关闭</el-button>
        </span>
      </el-dialog>

      <!--3.添加备选议价弹窗-->
      <el-dialog title="加入备选议价" :close-on-click-modal="false" :visible.sync="showAlternativeBargaining" :before-close="closeAlternativeBargaining" width="30%">
        <el-form :inline="true" ref="AlternativeBargainingText" :model="AlternativeBargainingText" class="demo-form-inline">
           <span style="width:30%;text-align: center">
               <el-input
                 type="textarea"
                 :rows="3"
                 maxlength="4000"
                 placeholder="请输入备注内容"
                 v-model="AlternativeBargainingText.textarea">
                </el-input>
          </span>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="insertAlternativeBargaining()">保存</el-button>
          <el-button @click="closAlternativeBargaining()" size="small" class="el-button-pale">关闭</el-button>
        </span>
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
        <!--5.议价详情-->
      <el-dialog title="查看议价详情" :close-on-click-modal="false" :visible.sync="showBargainingDetails" :before-close="closeBargainingDetails" width="60%">
      <el-form :inline="true" ref="bargainingDetailsData" :model="bargainingDetailsData" class="demo-form-inline">
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
              <span>{{ priceFormat(scope.row.bidPrice) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="价格类别">
            <template slot-scope="scope">
              <span>{{scope.row.talkType == '1'?'议价':'降价'}}</span>
            </template>
          </el-table-column>

          <el-table-column label="报价日期">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{scope.row.bidTime}}</div>
                <span>{{ scope.row.bidDate }}</span>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="确认日期">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{scope.row.confirmTime}}</div>
                <span>{{ scope.row.confirmDate }}</span>
              </el-tooltip>
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


      <el-dialog title="保密协议" :close-on-click-modal="false" :visible.sync="showSecrecy" :before-close="closeSecrecy" width="52%">
        <el-form :inline="true" ref="insertForm" :model="insertForm">
          <div v-html="this.agreementSignedText">
            {{this.agreementSignedText}}
          </div>
          <div>
            <p class="pcssd" align="right">甲方：北京市医药集中采购服务中心</p>
            <p class="pcssd" align="right">
              乙方：<img :src="this.insertForm.stampImage" />
            </p>
            <p class="pcssd" align="right">承诺时间：{{this.insertForm.signedDate}}</p>
          </div>
        </el-form>
        <span slot="footer">
          <el-button type="primary" @click="openSignPasswordView()" size="small">签订</el-button>
          <el-button @click="showSecrecy = false" size="small" class="el-button-pale">关闭</el-button>
        </span>
      </el-dialog>

      <!-- 密码框 -->
      <el-dialog title="请输入密码完成签章" :close-on-click-modal="false" :visible.sync="signPasswordVisible" width="30%">
        <el-form label-width="90px" class="demo-ruleForm">
          <el-input type="password" v-model="passWord" size="small"></el-input>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeSignPasswordView()" size="small" class="el-button-pale">关闭</el-button>
          <el-button type="primary" @click="signed()" size="small">确定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="下架原因" :close-on-click-modal="false" :visible.sync="showLowerFrameRemake" width="30%">
        <el-form label-width="90px" class="demo-ruleForm">
          {{this.lowerFrameRemakeText}}
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeLowerFrameRemake()" size="small" class="el-button-pale">关闭</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- ========================== 主内容end ========================= -->

    <!--6.价格详情-->
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
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {showSettingHttp,checkAgreementSignedHttp,insertSigned,querySysCatalog,bargainingDetailsHttp,scoreDetailedHttp,queryBasicDrugDataList,deleteBatchPurchaseList,findSelectionHos,findSendCompany,addPurchaseListHttp,insertAlternativeBargainingHttp,delAlternativeBargainingHttp,BasicDrugDataExportExcel} from "src/axios/contract/catalogmanagement/basicDrugDataType";
 // import {queryUnselectedProductList,insertSigned,findCommitmentSignedById} from 'src/axios/contract/twovotemanagement/commitmentSignedType';
  import {priceDetailsList} from 'src/axios/contract/catalogmanagement/hosCandidateCatalogType'
  import fileUpload from 'js-file-download'
  import {priceFormat, keyBoardEnter} from "src/utils"
  /*import {
    inintCALogin,
  } from 'src/assets/XTXSAB'*/
  // import { keyLoginArr, CERT_OID_NOT_BEFORE, CERT_OID_NOT_AFTER } from 'src/assets/XTXSAB'
  import { caInit } from 'src/axios/login/calogin'
  import { VERIFY_USER_PIN } from 'src/utils/CA';
  import moment from "moment";
  import RangeBar from 'src/components/RangeBar'

  export default {
    components: {RangeBar},
    data () {
      return {
        //是否显示操作
        showSetting:true,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        currentOrder: undefined,
        boxShow: false,
        query: this.metaQuery(), // 查询初始化
        showHos: false, // 表单可见性初始化
        showCompany:false,// 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        options:[],
        multipleSelection: [],//多选checkbox的数据

        showHosData:[],//查看选择医院数据
        showHosDataQuery:{name:""},//查看医院弹出框查询条件

        showCompanyData:this.metaData(),//查看配送企业数据
        showCompanyDataQuery:{name:""},//查看配送企业弹出框查询条件
        productId:"",//当前弹出框药品的id

        showAlternativeBargaining:false,//加入备选议价弹框状态
        AlternativeBargainingText:{textarea:""},//弹出框的值

        showScoreDetailed:false,//客观分详细弹框
        ScoreDetailedText: this.scoreDetailedData(),//框内数据初始化
        sources : [{    //基药标记选择
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

        //候选目录
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
        purchaseStates:[
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
        ],
        reportStates:[
          {
            label : '全部',
            value : ''
          },
          {
            label : '已上报',
            value : '1'
          },
          {
            label : '未上报',
            value : '0'
          }
        ],
        catalogAreas:[{catalogId:"",catalogName:""}]

        ,
        showBargainingDetails:false,
        bargainingDetailsData:this.metaData(),
        lyfloading:false,
        boxhide:true,


        showSecrecy:false,
        signPasswordVisible:false,
        dataForm: this.metaForm(),
        passWord:'',
        insertForm :this.formData(),
        bargainingDetailsProductId:"",
        agreementSignedText:"",

        //价格详情相关
        priceDetailsData:this.metaData(),
        currentOrderPrice:undefined,
        dialogVisible:false,
        showLowerFrameRemake:false,
        lowerFrameRemakeText:""

      }
    },
    created () {
      this.showSettingFun();
      this.list();
      this.querySysCatalogHttp()
      // inintCALogin(this.packUsbKeyUser);
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      moment,
      priceFormat,
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
      metaForm () { // 表单数据初始化
        return {
          password: undefined,
          userKey: undefined,
          strRandom: '',
          userSignedData: '',
          userCert: '',
          containerName: '',
          imgUrl: ''
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          productId: undefined,
          searchBuyerName: undefined,
          searchSenderName: undefined,
          searchBenDate: undefined,
          searchEndDate: undefined,
          query: {
            manufactureName: "",
            productName: "",
            basicFlag:"",
            resState:""
          }
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
      formData(){
        return {
          query: {
            orgId: undefined,
            signedDate :undefined
          },
          password: undefined,
          userKey: undefined,
          strRandom: '',
          userSignedData: '',
          userCert: '',
          containerName: '',
          imgUrl: '',
          stampImage:undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      packUsbKeyUser(retObj) {
        let USB_KEY_USER=[];
        this.options=[];
        console.log('retObj=',retObj);
        if (retObj && retObj.retVal) {
          let strUserList = retObj.retVal;
          while (true) {
            let i = strUserList.indexOf("&&&");
            if (i <= 0) {
              break;
            }
            let strOneUser = strUserList.substring(0, i);
            let strName = strOneUser.substring(0, strOneUser.indexOf("||"));
            let strCertID = strOneUser.substring(strOneUser.indexOf("||") + 2, strOneUser.length);
            USB_KEY_USER.push({label: strName, value: strCertID});
            let len = strUserList.length;
            strUserList = strUserList.substring(i + 3, len);
          }
          this.options=USB_KEY_USER;
        }
      },
      toggleQuery () {
        this.showQuery = !this.showQuery
      },
      toggleForm () {
        this.showHos = !this.showHos
      },
     closeForm () {
       this.toggleForm();
     },
      closeCompany(){
        this.showCompany = false;
      },
      closeAlternativeBargaining(){
        this.showAlternativeBargaining = false;
      },
      // -------------选择医院模态框查询----------
      //点击查询按钮查询的时候
      viewSelectionSourch(){
        findSelectionHos(this.productId, this.showHosDataQuery,this.showHosData,0).then(res => {
          this.showHosData = res.data;
          this.showHos = true;
        })
      },
      //  第一次弹开
      viewSelectionHos(id) {
        //每次弹出来的时候把搜索框清空
        this.showHosDataQuery.name = "";
        this.productId = id;
        this.viewSelectionSourch();
      },

      // -------------查看配送企业模态框查询----------
      //点击查询按钮查询的时候
      viewSendCompanySourch(){
        findSendCompany(this.productId, this.showCompanyDataQuery,this.showCompanyData).then(res => {
          this.showCompanyData = res.data;
          this.showCompany = true;
        })
      },
      //第一次弹开
      viewSendCompany(id) {
        //每次弹出来的时候把搜索框清空
        this.showCompanyDataQuery.name = "";
        this.productId = id;
        this.viewSendCompanySourch();
      },

      showSettingFun(){
        showSettingHttp().then(res =>{
          this.showSetting = res.data;
        })
      },
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryBasicDrugDataList(this.resData, this.query).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum =1;
          }
        })
      },
      //请求目录范围
      querySysCatalogHttp(){
        querySysCatalog().then(res=>{
          var header = [{catalogId: "", catalogName: "全部"}];
          this.catalogAreas = header.concat(res.data);
        })
      },
      //-----------加入目录的操作begin-------------------
      //单条数据 加入 采购目录
      addPurchaseList(row){
        this.$confirm('确定加入本院目录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {


              let params = [];
              params.push(row.productId);
              addPurchaseListHttp(params).then(res =>{
                if(res.data>0){
                  this.$message({
                    message: '加入成功',
                    type: 'success'
                  });
                  this.list();
                }else{
                  this.$message({
                    message: '系统错误',
                    type: 'error'
                  });
                }
              });


        }).catch(()=>{
          /* this.$message({
             message: '已取消操作',
             type: 'info'
           });*/
        });
      },
      //多选框改变状态
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
      //批量加入目录
      batchAddPurchaseList(){
        if(this.multipleSelection.length != 0){
          this.$confirm('确定加入本院目录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = [];
            //把没有加入目录的数据筛选出来
            this.multipleSelection.map(function(item,key,ary) {
              //判断没有被禁用(enableFlag=1),且在目录内(resState=1)
              if(item.enableFlag==1){
                //如果没有加入到本院目录
                if(item.hosCon == 0){
                  params.push(item.productId);
                }
              }

            });

            //如果当前页数据都加入到了目录那么就return 不使他提交
            if(params.length==0){
              this.$message({
                message: '当前选择已加入采购目录',
                type: 'warning'
              });
              return;
            }
            addPurchaseListHttp(params).then(res =>{
              if(res.data>0){
                this.$message({
                  message: '加入成功',
                  type: 'success'
                });
                this.list();
              }
            });

          }).catch(()=>{});
        }else{
          this.$message({
            message: '请至少选择一条产品',
            type: 'warning'
          });
        }
      },
      //-----------加入目录的操作end-------------------
      //-----------删除目录的操作begin-------------------
      //单个删除采购目录
      delPurchaseList(row){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {


          //删除操作
          let ids = [];
          ids.push(row.productId);
          deleteBatchPurchaseList(ids).then(res=>{
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


      //批量删除采购目录
      batchDelPurchaseList(){
        if(this.multipleSelection.length != 0){
          this.$confirm('确定删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let ids = [];
            this.multipleSelection.map(function(item,key,ary) {
              if(item.enableFlag==1) {
                if (item.hosCon > 0) {
                  ids.push(item.productId);
                }
              }
            });
            //如果当前选择数据都未加入到了目录那么就return 不使他提交
            if(ids.length==0){
              this.$message({
                message: '当前选择都未加入采购目录',
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
          }).catch(()=>{});
        }else{
          this.$message({
            message: '请至少选择一条产品',
            type: 'warning'
          });
        }
      },
      reset(){
        this.query = this.metaQuery();
        this.list();
      },

      //-----------删除目录的操作end-------------------
      //-----------加入备选议价begin-------------------
      //单个加入窗口弹出
      showAlternativeBargainingForone(row){
        let productIds = [];
        productIds.push(row.productId)

        this.modalId = productIds;
        this.showAlternativeBargaining = true;
        this.AlternativeBargainingText.textarea = "";
      },
      //批量加入窗口弹出
      showAlternativeBargainingForbatch(){
        let productIds = [];
        for(let i= 0;i<this.multipleSelection.length;i++){
          productIds.push(this.multipleSelection[i].productId)
        }
        if(productIds.length > 0){
          this.modalId = productIds;
          this.showAlternativeBargaining = true;
          this.AlternativeBargainingText.textarea = "";
        }else{
          this.$message({
            message: '请至少选择一条产品',
            type: 'warning'
          });
          return;
        }
      },
      //关闭窗口
      closAlternativeBargaining(){
        this.showAlternativeBargaining = false;
      },
      //保存窗口
      insertAlternativeBargaining(){
        if(this.AlternativeBargainingText.textarea.trim() === ""){
          this.$message({
            message: '备注内容不能为空',
            type: 'warning'
          });
          return;
        }
        insertAlternativeBargainingHttp(this.modalId,this.AlternativeBargainingText).then(res=>{
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

      delAlternativeBargainingForone(row){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {


          let productIds = [];
          productIds.push(row.productId);
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
      //-----------加入备选议价end-------------------


      //--------------客观分查看详细begin
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
      //-------------客观分查看详细end
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
//----------------------------------table数据判断 begin-------------
      //判断多选框是否可以勾选
      //如果加入了备选议价或者采购目录 那么不可选
      /*selectable(row,index) {
        if(row.alternativeCon>0||row.hosCon>0||row.enableFlag==0){
          return false;
        }else{
          return true;
        }
      },*/
        //参考价
      referencePrice(rMinPrice,bjPrice,hbPrice,tjPrice,catalogAreaFlag) {

        if (catalogAreaFlag > 0) {
          return "全国最低价" + priceFormat(rMinPrice);
        } else {
              return "河北最低价:" + ((hbPrice != null && hbPrice != '') ? priceFormat(hbPrice) : '无') + "," + "天津最低价:" + ((tjPrice != null && tjPrice != '') ? priceFormat(tjPrice) : '无') + "," + "北京最低价:" + ((bjPrice != null && bjPrice != '') ? priceFormat(bjPrice) : '无');
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
      //企业报价 a标签
      bidPriceDataForA(bhiBidPrice){
       if(bhiBidPrice != null && bhiBidPrice != ""){
         return true;
       }else{
         return false;
       }
      },
      /*
      需求变更去掉加入备选议价，采购目录改为本院目录
      //备选议价
      //参数 （1.resstate 2.备选议价 3.采购目录）
      alternativeBargainingDisplay(resState,alternativeCon,hosCon){
        //如果resState等于1  如果加入采购目录>0 那么不显示备选议价 否则就显示
        //如果resState!=1  那么肯定显示备选议价
        if(resState == 1){
          if(hosCon>0){
            return false;
          }
          return true;
        }else{
          return true;
        }
      },
      //采购目录
      //参数 （1.resstate 2.备选议价 3.采购目录）
      purchaseCatalogDisplay(resState,alternativeCon,hosCon){
        //如果resState等于1  如果备选议价>0那么不显示加入采购目录 否则就显示
        //如果resState!=1  那么肯定不显示采购目录
        if(resState == 1){
          if(alternativeCon>0){
            return false;
          }
          return true;
        }else{
          return false;
        }
      },*/
     //
      //判断是否显示本院目录
      thisHosCatalogDisplay(resState){
        if(resState == 1){
          return true;
        }else{
          return false;
        }
      },
      closeSecrecy(){
        this.showSecrecy = false;
      },
      //  密码框
      openSignPasswordView() {
        this.passWord = '';
        this.signPasswordVisible = true;
      },
      closeSignPasswordView() {
        this.passWord = '';
        this.signPasswordVisible = false;
      },
      closeSignPasswordView() {
        this.passWord = '';
        this.signPasswordVisible = false;
      },
      //  点击签订
      signed () {
        let _this = this;
        let strCertID = '';
        let strPin = _this.passWord;
        let strServerSignedData = '';
        let strServerRan = '';
        let strServerCert = '';
        caInit().then(res => {
          strServerRan = res.data.strRandom;
          strServerSignedData = res.data.strSignedData;
          strServerCert = res.data.strServerCert;
          _this.dataForm.strRandom = res.data.strRandom;
          if (_this.options.length == 0){
            _this.$message({
              message: "未检测到Key，请检查后重试",
              type: 'error'
            });
            return;
          }
          if (_this.options.length > 1) {
            _this.$message({
              message: "检测到多个Key，默认使用第一个",
              type: 'warning'
            });
          }
          strCertID = _this.options[0].value;
          let keyParam = _this.options;
          VERIFY_USER_PIN(_this,
            keyParam,
            CERT_OID_NOT_BEFORE,
            CERT_OID_NOT_AFTER,
            strCertID,
            strPin,
            strServerCert,
            strServerRan,
            strServerSignedData
          ).then(res => {

            insertSigned(_this.id, res).then(res => {
              _this.$message({
                message: res.success == true ? res.data : res.message,
                type: res.success == true ? 'success' : 'error',
                onClose: () => {
                  _this.signPasswordVisible = false;
                  _this.showSecrecy = false;
                  _this.closeSignPasswordView();
                  _this.list();
                }
              })
            })
          }).catch(err => {
            _this.$message({
              message: "服务器繁忙，",
              type: 'error'
            });
          })
        })
      },
      Excel(){
        this.lyfloading = true;
        checkAgreementSignedHttp().then(res=>{
          if(res.data.state == '-1'){
            this.agreementSignedText = res.data.text;
            this.showSecrecy = true;
            this.lyfloading = false;
            return;
          }
          BasicDrugDataExportExcel(this.resData, this.query).then(res => {
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


        })
      },




      spread:function(){
        this.boxShow = true;
        this.boxhide=false;
      },
      packup:function(){
        this.boxShow = false;
        this.boxhide=true;
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
//      sortChangPrice(value){
//        let sortType=" desc"
//        if(value.order.startsWith("asc")){
//          sortType=" asc";
//        }
//        this.currentOrderPrice=value.prop + sortType;
//        this.list()
//      },
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
      //状态取值
      stateFun(hosCon,enableFlag){
        if(enableFlag == '3'){
          return "已下架"
        }else{
          if(hosCon >0){
            return "已加入";
          }else{
            return "未加入";
          }
        }
      },

      lowerFrameRemake(text){
        this.lowerFrameRemakeText = text;
        this.showLowerFrameRemake = true;

      },
      closeLowerFrameRemake(){
        this.showLowerFrameRemake = false
      },
      //------------------价格弹窗end
//----------------------------------table数据判断 end-------------
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
        this.viewSelectionSourch()
      },
      handleCurrentChange2 (val) {
        this.showHosData.pageNum = val
        this.viewSelectionSourch()
      },
      handleSizeChange3 (val) {
        this.showCompanyData.pageSize = val
        this.viewSendCompanySourch()
      },
      handleCurrentChange3 (val) {
        this.showCompanyData.pageNum = val
        this.viewSendCompanySourch()
      },

      handleSizeChange4 (val) {
        this.bargainingDetailsData.pageSize = val
        this.bargainingDetailsList()
      },
      handleCurrentChange4 (val) {
        this.bargainingDetailsData.pageNum = val
        this.bargainingDetailsList()
      },
      handleSizeChange6 (val) {
        this.priceDetailsData.pageSize = val
        this.companyPriceList()
      },
      handleCurrentChange6 (val) {
        this.priceDetailsData.pageNum = val
        this.companyPriceList()
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
      searchEnterFunViewOne(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.viewSelectionSourch();
        })
      },
      searchEnterFunViewTwo(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.viewSendCompanySourch();
        })
      }
    }
  }
</script>

