<template>
  <dl class="mainbox">
    <dd>
      <div class="infobox">
        <el-switch
          style="float:left; z-index: 999;"
          v-model="receiveFlag"
          active-color="#3eede7"
          inactive-color="#44cef6"
          active-text="全部配送"
          inactive-text="已选配送"
          @change="drawGraph('main')"
        >
        </el-switch>
         <div id="main" style="height: 350px;"></div>
      </div>

      <div class="infobox">
        <div class="s-form">
          <el-form>
            <el-input  placeholder="配送企业"></el-input>
            <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="开始日期"
                 :editable="false"
               >
                </el-date-picker>
              至
              <el-date-picker
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                :editable="false"
              >
                </el-date-picker>
             </span>
            <el-button @click="">查询</el-button>
            <el-button @click="" size="small">重置</el-button>
            <el-button @click="" size="small">导出</el-button>
          </el-form>
        </div>
        <div class="tableset">
          <table class="s-table">
            <thead>
            <tr class="w100">
              <th width="30"></th>
              <th>配送企业</th>
              <th width="12%">订单数</th>
              <th width="12%">响应订单数</th>
              <th width="9%">2小时响应率</th>
              <th width="9%">订购数量</th>
              <th width="12%">订购金额（万元）</th>
              <th width="12%">3天发货金额（万元）</th>
              <th width="9%">3天发货率</th>
              <th width="30"></th>
            </tr>
            </thead>
            <tbody>
            <template v-for="(row,index) in senderData">
              <tr>
                <td @click="leftClick(row,index,row.id+'left')" align="center" class="nopadding">
                  <i :id="row.id+'left'" :class="leftClickFlag?'el-icon-arrow-down':'el-icon-arrow-right'"></i></td>
                <td><a href="javascript:" @click="openMapData(row.id)">{{row.senderName}}</a></td>
                <td align="right">{{row.orderNum}}</td>
                <td align="right">{{row.responseNum}}</td>
                <td align="right">{{row.twoResPonseRate}}</td>
                <td align="right">{{row.purchaseNum}}</td>
                <td align="right">{{row.purchasePrice}}</td>
                <td align="right">{{row.threeSendPrice}}</td>
                <td align="right">{{row.threeSendRate}}</td>
                <td @click="rightClick(row,index,row.id+'right')" align="center" class="nopadding">
                  <i :class="rightClickFlag?'el-icon-arrow-down':'el-icon-arrow-left'" :id="row.id+'right'" ></i></td>
              </tr>
              <tr v-if="row.expand1==true||row.expand2==true" key="purchase-data" class="s-table-extend">
                <td colspan="10">
                  <el-form class="s-form" key="product-form2" v-if="row.right">
                    <el-input  placeholder="产品名称"></el-input>
                    <el-date-picker
                      size="small"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="开始日期"
                      :editable="false"
                    >
                    </el-date-picker>
                    至
                    <el-date-picker
                      size="small"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="结束日期"
                      :editable="false"
                    >
                    </el-date-picker>
                    <el-button>查询</el-button>
                    <el-button  size="small">重置</el-button>
                    <el-button  size="small">导出</el-button>
                  </el-form>
                  <el-table :data="productData2" key="product-table2" style="width: 100%" v-if="row.right" tooltip-effect="dark">
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form class="s-form">
                          <el-input  placeholder="医院名称"></el-input>
                          <el-date-picker
                            size="small"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="开始日期"
                            :editable="false"
                          >
                          </el-date-picker>
                          至
                          <el-date-picker
                            size="small"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="结束日期"
                            :editable="false"
                          >
                          </el-date-picker>
                          <el-button>查询</el-button>
                          <el-button  size="small">重置</el-button>
                          <el-button  size="small">导出</el-button>
                        </el-form>
                        <el-table :data="hosData" style="width: 100%" tooltip-effect="dark">
                          <el-table-column
                            label="医院名称"
                            prop="hosName" show-overflow-tooltip>
                          </el-table-column>
                          <el-table-column
                            label="区域"
                            prop="hosArea">
                          </el-table-column>
                          <el-table-column
                            label="等级"
                            prop="hosLevel">
                          </el-table-column>
                          <el-table-column
                            label="性质"
                            prop="hosNature">
                          </el-table-column>
                          <el-table-column
                            label="品种数"
                            prop="varietyNum">
                          </el-table-column>
                          <el-table-column
                            label="订购数量" align="right"
                            prop="purchaseNum">
                          </el-table-column>
                          <el-table-column
                            label="订购金额\(万元)" align="right" :render-header="labelHead"
                            prop="purchasePrice">
                          </el-table-column>
                          <el-table-column
                            label="到货数量" align="right"
                            prop="receiveNum">
                          </el-table-column>
                          <el-table-column
                            label="到货金额\（万元）" align="right" :render-header="labelHead"
                            prop="receivePrice">
                          </el-table-column>
                          <el-table-column
                            label="是否投诉" width="76">
                            <template slot-scope="scope">
                              <a @click="findThisComplaint(scope.row.id)" v-if="scope.row.isComplaint=='是'">{{ scope.row.isComplaint}}</a>
                              <a v-if="scope.row.isComplaint=='否'">否</a>
                            </template>
                          </el-table-column>
                        </el-table>
                        <div class="pagebox">
                          <el-pagination
                            layout="total, sizes, prev, pager, next, jumper"
                            :page-sizes="[10, 20, 30]"
                            :total="hospatilData.total"
                            :page-size="hospatilData.pageSize"
                            :page-count="hospatilData.pages"
                            :current-page.sync="hospatilData.pageNum">
                          </el-pagination>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="产品名称"
                      prop="productName" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      label="商品名" width="120"
                      prop="tradeName">
                    </el-table-column>
                    <el-table-column
                      label="剂型" width="100"
                      prop="osagedForm">
                    </el-table-column>
                    <el-table-column
                      label="产品信息">
                      <template slot-scope="scope">
                        <!--tootip提示气泡-->
                        <!--:enterable="false" 鼠标不可进入tooltip中-->
                        <el-tooltip placement="top" :enterable="false">
                          <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                          <div slot="content">
                            <div>{{ scope.row.productInfo}}</div>
                            <div v-if="scope.row.production!=''">{{ scope.row.production}}</div>
                          </div>

                          <!--源内容（必须放在class="el-tooltip-box"内）-->
                          <div class="el-tooltip-box">
                            <!--加class="text-inline"确保内容不折行-->
                            <div class="text-inline">{{ scope.row.productInfo}}</div>
                            <div class="text-inline" v-if="scope.row.production!=''">{{ scope.row.production}}</div>
                          </div>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="基药标识" width="90" align="center"
                      prop="basicFlag">
                    </el-table-column>
                    <el-table-column
                      label="订购数量" width="100" align="right"
                      prop="purchaseNum">
                    </el-table-column>
                    <el-table-column
                      label="订购金额\(万元)" :render-header="labelHead" width="100" align="right"
                      prop="purchasePrice">
                    </el-table-column>
                    <el-table-column
                      label="到货数量" width="100" align="right"
                      prop="receiveNum">
                    </el-table-column>
                    <el-table-column
                      label="到货金额\(万元)" :render-header="labelHead" width="100" align="right"
                      prop="receivePrice">
                    </el-table-column>
                    <el-table-column
                      label="库存状态" width="80" align="center"
                      prop="stockState">
                    </el-table-column>
                    <el-table-column label="库存更新时间" width="120" align="center" prop="stockUpdateTime">
                    </el-table-column>
                  </el-table>
                  <div class="pagebox" key="product-page2" v-if="row.right">
                    <el-pagination
                      layout="total, sizes, prev, pager, next, jumper"
                      :page-sizes="[10, 20, 30]"
                      :total="hospatilData.total"
                      :page-size="hospatilData.pageSize"
                      :page-count="hospatilData.pages"
                      :current-page.sync="hospatilData.pageNum">
                    </el-pagination>
                  </div>

                  <el-form class="s-form" key="sender-form" v-if="row.left">
                    <el-input  placeholder="医院名称"></el-input>
                    <el-date-picker
                      size="small"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="开始日期"
                      :editable="false"
                    >
                    </el-date-picker>
                    至
                    <el-date-picker
                      size="small"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="结束日期"
                      :editable="false"
                    >
                    </el-date-picker>
                    <el-button size="small">查询</el-button>
                    <el-button size="small">重置</el-button>
                    <el-button size="small">导出</el-button>
                  </el-form>
                  <el-table :data="hosPatilData" border stripe style="width: 100%" key="sender-table" v-if="row.left" tooltip-effect="dark">

                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form class="s-form">
                          <el-input  placeholder="产品名称"></el-input>
                          <el-date-picker
                            size="small"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="开始日期"
                            :editable="false"
                          >
                          </el-date-picker>
                          至
                          <el-date-picker
                            size="small"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="结束日期"
                            :editable="false"
                          >
                          </el-date-picker>
                          <el-button>查询</el-button>
                          <el-button  size="small">重置</el-button>
                          <el-button  size="small">导出</el-button>
                        </el-form>
                        <el-table :data="productData" style="width: 100%" tooltip-effect="dark">
                          <el-table-column
                            label="产品名称" min-width="100"
                            prop="productName" show-overflow-tooltip>
                          </el-table-column>
                          <el-table-column
                            label="商品名" min-width="100"
                            prop="tradeName">
                          </el-table-column>
                          <el-table-column
                            label="剂型"
                            prop="osagedForm">
                          </el-table-column>
                          <el-table-column label="产品信息" min-width="160" show-overflow-tooltip>
                            <template slot-scope="scope">
                              <!--tootip提示气泡-->
                              <!--:enterable="false" 鼠标不可进入tooltip中-->
                              <el-tooltip placement="top" :enterable="false">
                                <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                                <div slot="content">
                                  <div>{{ scope.row.productInfo}}</div>
                                  <div v-if="scope.row.production!=''">{{ scope.row.production}}</div>
                                </div>

                                <!--源内容（必须放在class="el-tooltip-box"内）-->
                                <div class="el-tooltip-box">
                                  <!--加class="text-inline"确保内容不折行-->
                                  <div class="text-inline">{{ scope.row.productInfo}}</div>
                                  <div class="text-inline" v-if="scope.row.production!=''">{{ scope.row.production}}</div>
                                </div>
                              </el-tooltip>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="基药标识" align="center"
                            prop="basicFlag">
                          </el-table-column>
                          <el-table-column
                            label="订购数量" align="right"
                            prop="purchaseNum">
                          </el-table-column>
                          <el-table-column
                            label="订购金额\(万元)" align="right" :render-header="labelHead"
                            prop="purchasePrice">
                          </el-table-column>
                          <el-table-column
                            label="到货数量" align="right"
                            prop="receiveNum">
                          </el-table-column>
                          <el-table-column
                            label="到货金额\(万元)" align="right" :render-header="labelHead"
                            prop="receivePrice">
                          </el-table-column>
                          <el-table-column
                            label="库存状态" align="center"
                            prop="stockState">
                          </el-table-column>
                          <el-table-column align="center" width="130"
                            label="库存更新时间"
                            prop="stockUpdateTime">
                          </el-table-column>
                        </el-table>
                        <div class="pagebox">
                          <el-pagination
                            layout="total, sizes, prev, pager, next, jumper"
                            :page-sizes="[10, 20, 30]"
                            :total="hospatilData.total"
                            :page-size="hospatilData.pageSize"
                            :page-count="hospatilData.pages"
                            :current-page.sync="hospatilData.pageNum">
                          </el-pagination>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="医院名称"
                      prop="hosName" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      label="区域" width="120"
                      prop="hosArea" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      label="等级" width="90" align="center"
                      prop="hosLevel">
                    </el-table-column>
                    <el-table-column
                      label="性质" width="70" align="center"
                      prop="hosNature">
                    </el-table-column>
                    <el-table-column
                      label="品种数" width="100" align="right"
                      prop="varietyNum">
                    </el-table-column>
                    <el-table-column
                      label="订购数量" width="100" align="right"
                      prop="purchaseNum">
                    </el-table-column>
                    <el-table-column
                      label="订购金额(万元)" width="120" align="right"
                      prop="purchasePrice">
                    </el-table-column>
                    <el-table-column
                      label="到货数量" width="120" align="right"
                      prop="receiveNum">
                    </el-table-column>
                    <el-table-column
                      label="到货金额（万元）" width="120" align="right"
                      prop="receivePrice">
                    </el-table-column>
                    <el-table-column
                      label="是否投诉" width="80" align="center">
                      <template slot-scope="scope">
                        <a href="javascript:" @click="findThisComplaint(scope.row.id)" v-if="scope.row.isComplaint=='是'">
                          <i class="el-icon-info"></i>
                          {{ scope.row.isComplaint}}
                        </a>
                        <span v-if="scope.row.isComplaint=='否'">否</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="pagebox" key="sender-page" v-if="row.left">
                    <el-pagination
                      layout="total, sizes, prev, pager, next, jumper"
                      :page-sizes="[10, 20, 30]"
                      :total="hospatilData.total"
                      :page-size="hospatilData.pageSize"
                      :page-count="hospatilData.pages"
                      :current-page.sync="hospatilData.pageNum">
                    </el-pagination>
                  </div>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30]"
            :total="hospatilData.total"
            :page-size="hospatilData.pageSize"
            :page-count="hospatilData.pages"
            :current-page.sync="hospatilData.pageNum">
          </el-pagination>
        </div>
      </div>
    </dd>
    <!-- 弹窗 -->
    <!--@size-change="productSizeChange" @current-change="productCurrentChange"-->
      <el-dialog title="投诉记录" :visible.sync="dialogTableVisible" width="50%" :close-on-click-modal="false" v-if="dialogTableVisible">
        <el-table :data="complaintData">
          <el-table-column property="complaint" label="投诉行为" width="150"></el-table-column>
          <el-table-column property="remark" label="备注"></el-table-column>
          <el-table-column property="date" label="投诉日期" width="180" align="center"></el-table-column>
        </el-table>
      </el-dialog>
  </dl>
</template>

<script>
  import carSvg from "src/assets/images/car.svg";
  import {labelHead} from "src/utils";

  const typeOptions = ['三级医院', '二级医院', '一级医院','社区','其他'];
  export default {
    carSvg,
    name: 'purchaseInfo',
    data() {
      return {
        receiveFlag: false,
        leftClickFlag: false,
        rightClickFlag: false,
        isFullscreen: true,
        hospitalLevel: '0',
        natrual: '0',
        dialogTableVisible:false,
        hospatilData:this.hospatilDatas(),
        checkedType: ['全部'],
        types: typeOptions,
        isIndeterminate: true,
        checkAll: false,
        complaintData:[
          {complaint:'违约行为1',remark:'备注1',date:'2017-03-15'},
          {complaint:'违约行为2',remark:'备注2',date:'2017-03-18'},
          {complaint:'违约行为3',remark:'备注3',date:'2017-03-21'}],
        queryData: {
          queryId: 'FR20T0000011000000050066',
          queryUnit: 'province',//city
          queryStartDate:'',
          queryEndDate:'',
        },
        sourceData : [{
          name: '海南瑞尔医药有限公司',
          sales: 42.56,
          services: 64.5,
        }, {
          name: '海南三叶医药贸易公司',
          sales: 71.14,
          services: 76.2,
        }, {
          name: '海南省医药公司',
          sales: 42.1,
          services: 34.8,
        }, {
          name: '尉氏县医药有限责任公司大马批发部',
          sales: 63.2,
          services: 97.4,
        }, {
          name: '道县药材公司蚣坝药品经营配送站',
          sales: 97.3,
          services: 67.5,
        }, {
          name: '方城县医药公司杨集购销站',
          sales: 82,
          services: 37.7,
        }, {
          name: '成都市中药材公司第一分公司',
          sales: 41.1,
          services: 12.8,
        }],
        productData2:[{
          productName:'阿奇霉素分散片',
          tradeName:'君洁',
          osagedForm: '分散片',
          productInfo: '0.34gx40片',
          production: '盒河南省济源市济世药业有限公司',
          basicFlag:'国家基药',
          purchaseNum:'345234',
          purchasePrice:'23423423',
          receiveNum:'23112',
          receivePrice:'234569',
          stockState:'紧张',
          stockUpdateTime:'2018-07-22 12:30'
        },{
          productName:'阿奇霉素分散片',
          tradeName:'君洁',
          osagedForm: '分散片',
          productInfo: '0.34gx40片',
          production: '盒河南省济源市济世药业有限公司',
          basicFlag:'国家基药',
          purchaseNum:'345234',
          purchasePrice:'23423423',
          receiveNum:'23112',
          receivePrice:'234569',
          stockState:'紧张',
          stockUpdateTime:'2018-07-22 12:30'
        },],
        productData:[{
          productName:'阿奇霉素分散片',
          tradeName:'君洁',
          osagedForm: '分散片',
          productInfo: '0.34gx40片',
          production: '盒河南省济源市济世药业有限公司',
          basicFlag:'国家基药',
          purchaseNum:'345234',
          purchasePrice:'23423423',
          receiveNum:'23112',
          receivePrice:'234569',
          stockState:'紧张',
          stockUpdateTime:'2018-07-22 12:30'
        },{
          productName:'阿奇霉素分散片',
          tradeName:'君洁',
          osagedForm: '分散片',
          productInfo: '0.34gx40 ',
          basicFlag:'国家基药',
          purchaseNum:'345234',
          purchasePrice:'23423423',
          receiveNum:'23112',
          receivePrice:'234569',
          stockState:'紧张',
          stockUpdateTime:'2018-07-22 12:30'
        },{
          productName:'阿奇霉素分散片',
          tradeName:'君洁',
          osagedForm: '分散片',
          productInfo: '0.34gx40片',
          production: '盒河南省济源市济世药业有限公司',
          basicFlag:'国家基药',
          purchaseNum:'345234',
          purchasePrice:'23423423',
          receiveNum:'23112',
          receivePrice:'234569',
          stockState:'紧张',
          stockUpdateTime:'2018-07-22 12:30'
        },{
          productName:'阿奇霉素分散片',
          tradeName:'君洁',
          osagedForm: '分散片',
          productInfo: '0.34gx40片',
          production: '盒河南省济源市济世药业有限公司',
          basicFlag:'国家基药',
          purchaseNum:'345234',
          purchasePrice:'23423423',
          receiveNum:'23112',
          receivePrice:'234569',
          stockState:'紧张',
          stockUpdateTime:'2018-07-22 12:30'
        },{
          productName:'阿奇霉素分散片',
          tradeName:'君洁',
          osagedForm: '分散片',
          productInfo: '0.34gx40片',
          production: '盒河南省济源市济世药业有限公司',
          basicFlag:'国家基药',
          purchaseNum:'345234',
          purchasePrice:'23423423',
          receiveNum:'23112',
          receivePrice:'234569',
          stockState:'紧张',
          stockUpdateTime:'2018-07-22 12:30'
        },{
          productName:'阿奇霉素分散片',
          tradeName:'君洁',
          osagedForm: '分散片',
          productInfo: '0.34gx40片',
          production: '盒河南省济源市济世药业有限公司',
          basicFlag:'国家基药',
          purchaseNum:'345234',
          purchasePrice:'23423423',
          receiveNum:'23112',
          receivePrice:'234569',
          stockState:'紧张',
          stockUpdateTime:'2018-07-22 12:30'
        },{
          productName:'阿奇霉素分散片',
          tradeName:'君洁',
          osagedForm: '分散片',
          productInfo: '0.34gx40片',
          production: '盒河南省济源市济世药业有限公司',
          basicFlag:'国家基药',
          purchaseNum:'345234',
          purchasePrice:'23423423',
          receiveNum:'23112',
          receivePrice:'234569',
          stockState:'紧张',
          stockUpdateTime:'2018-07-22 12:30'
        },
        ],
        hosData:[
          {
            id: '12987122',
            hosName: '北京航星机器制造有限公司北京东城航星医院',
            hosArea: '东城区',
            hosLevel: '二级甲等',
            hosNature: '公立',
            varietyNum: '440',
            purchaseNum:'500',
            purchasePrice:'260.43',
            receiveNum:'400',
            receivePrice:'230.34',
            isComplaint:'是'
          },
          {
            id: '12987122',
            hosName: '北京航星机器制造有限公司北京东城航星医院',
            hosArea: '东城区',
            hosLevel: '二级甲等',
            hosNature: '公立',
            varietyNum: '440',
            purchaseNum:'500',
            purchasePrice:'260.43',
            receiveNum:'400',
            receivePrice:'230.34',
            isComplaint:'是'
          },
          {
            id: '12987122',
            hosName: '北京航星机器制造有限公司北京东城航星医院',
            hosArea: '东城区',
            hosLevel: '二级甲等',
            hosNature: '公立',
            varietyNum: '440',
            purchaseNum:'500',
            purchasePrice:'260.43',
            receiveNum:'400',
            receivePrice:'230.34',
            isComplaint:'是'
        }],
        hosPatilData:[
          {
            id: '12987122',
            hosName: '北京航星机器制造有限公司北京东城航星医院',
            hosArea: '东城区',
            hosLevel: '二级甲等',
            hosNature: '公立',
            varietyNum: '440',
            purchaseNum:'500',
            purchasePrice:'260.43',
            receiveNum:'400',
            receivePrice:'230.34',
            isComplaint:'是'
          },
          {
            id: '13987122',
            hosName: '北京航星机器制造有限公司北京东城航星医院',
            hosArea: '东城区',
            hosLevel: '二级甲等',
            hosNature: '公立',
            varietyNum: '440',
            purchaseNum:'500',
            purchasePrice:'260.43',
            receiveNum:'400',
            receivePrice:'230.34',
            isComplaint:'是'
          },
          {
            id: '14987122',
            hosName: '北京航星机器制造有限公司北京东城航星医院',
            hosArea: '东城区',
            hosLevel: '二级甲等',
            hosNature: '公立',
            varietyNum: '440',
            purchaseNum:'500',
            purchasePrice:'260.43',
            receiveNum:'400',
            receivePrice:'230.34',
            isComplaint:'是'
          },
          {
            id: '15987122',
            hosName: '北京航星机器制造有限公司北京东城航星医院',
            hosArea: '东城区',
            hosLevel: '二级甲等',
            hosNature: '公立',
            varietyNum: '440',
            purchaseNum:'500',
            purchasePrice:'260.43',
            receiveNum:'400',
            receivePrice:'230.34',
            isComplaint:'是'
          },
        ],

        senderData: [{
          id: '13987123',
          senderName: '海南三叶医药贸易公司',
          orderNum:'334566',
          responseNum:'334500',
          twoResPonseRate:'40%',
          purchaseNum:'789.32',
          purchasePrice:'937.36',
          threeSendPrice:'837.36',
          threeSendRate:'60%'
        },
          {
            id: '92987123',
            senderName: '海南三叶医药贸易公司',
            orderNum:'334566',
            responseNum:'334500',
            twoResPonseRate:'40%',
            purchaseNum:'789.32',
            purchasePrice:'937.36',
            threeSendPrice:'837.36',
            threeSendRate:'60%'
          },{
            id: '82987123',
            senderName: '海南三叶医药贸易公司',
            orderNum:'334566',
            responseNum:'334500',
            twoResPonseRate:'40%',
            purchaseNum:'789.32',
            purchasePrice:'937.36',
            threeSendPrice:'837.36',
            threeSendRate:'60%'
          },{
            id: '72987123',
            senderName: '海南三叶医药贸易公司',
            orderNum:'334566',
            responseNum:'334500',
            twoResPonseRate:'40%',
            purchaseNum:'789.32',
            purchasePrice:'937.36',
            threeSendPrice:'837.36',
            threeSendRate:'60%'
          },{
            id: '62987123',
            senderName: '海南三叶医药贸易公司',
            orderNum:'334566',
            responseNum:'334500',
            twoResPonseRate:'40%',
            purchaseNum:'789.32',
            purchasePrice:'937.36',
            threeSendPrice:'837.36',
            threeSendRate:'60%'
          },{
            id: '52987123',
            senderName: '海南三叶医药贸易公司',
            orderNum:'334566',
            responseNum:'334500',
            twoResPonseRate:'40%',
            purchaseNum:'789.32',
            purchasePrice:'937.36',
            threeSendPrice:'837.36',
            threeSendRate:'60%'
          },{
            id: '42987123',
            senderName: '海南三叶医药贸易公司',
            orderNum:'334566',
            responseNum:'334500',
            twoResPonseRate:'40%',
            purchaseNum:'789.32',
            purchasePrice:'937.36',
            threeSendPrice:'837.36',
            threeSendRate:'60%'
          },{
            id: '32987123',
            senderName: '海南三叶医药贸易公司',
            orderNum:'334566',
            responseNum:'334500',
            twoResPonseRate:'40%',
            purchaseNum:'789.32',
            purchasePrice:'937.36',
            threeSendPrice:'837.36',
            threeSendRate:'60%'
          },{
            id: '22987123',
            senderName: '海南三叶医药贸易公司',
            orderNum:'334566',
            responseNum:'334500',
            twoResPonseRate:'40%',
            purchaseNum:'789.32',
            purchasePrice:'937.36',
            threeSendPrice:'837.36',
            threeSendRate:'60%'
          },]
      }
    },
    mounted(){
      this.drawGraph("main");
      //this.findMapData();
    },
    methods:{
      labelHead,
      findThisComplaint(id){
        this.dialogTableVisible=true;
      },
      drawGraph(id){
        var sourceData=this.sourceData;
        this.chart = echarts.init(document.getElementById(id));
        this.chart.clear();
        var seriesData = sourceData.map(function(item, index, array) {
          return {
            name: item['name'],
            value: [item['sales'], item['services']]
          }
        });

        var computeServicesAvgLine = function() {
          let sum = 0;
          sourceData.forEach(function(item) {
            sum += item['services']
          });
          return sum / sourceData.length
        };

        var computeSalesAvgLine = function() {
          let sum = 0;
          sourceData.forEach(function(item) {
            sum += item['sales']
          });
          return sum / sourceData.length
        };
        var avg = {
          servicesAvgLine: computeServicesAvgLine(),
          salesAvgLine: computeSalesAvgLine()
        };
        var optionPic = {
          title: {
            text: '配送企业服务四象限图',
            textStyle: {color:'#3eede7'},
            left:'45%'

          },
          grid: {
            left: '3%',
            right: '8%',
            top: '18%',
            bottom: '5%',
            containLabel: true
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
              show: true,
              type: 'cross',
              lineStyle: {
                type: 'dashed',
                width: 2
              },
            },
            formatter: function(obj) {
              if (obj.componentType == "series") {
                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                  obj.name +
                  '</div>' +
                  '<span>' +
                  '发货率' +
                  '</span>' +
                  ' : ' + obj.data.value[0] +'%' +
                  '<br/>' +
                  '<span>' +
                  '2H响应率' +
                  '</span>' +
                  ' : ' + obj.data.value[1] + '%'
              }
            }
          },
          label: {
            normal: {
              show: true,
              position: 'bottom',
              formatter: function(params) {
                return params.name
              }
            },
            emphasis: {
              show: true,
              position: 'bottom',
            }
          },
          xAxis: {
            name: '备货率',
            type: 'value',
            scale: true,
            color:'#fff',
            axisLabel: {
              formatter: '{value} %',
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#3eede7'
              }
            }
          },
          yAxis: {
            name: '2H响应率',
            type: 'value',
            scale: true,
            axisLabel: {
              formatter: '{value} %',
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#3eede7'
              }
            }
          },
          visualMap: {
            min: 0,
            max: 800,
            dimension: 0,
            right: '5%',
            top: 'top',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            itemWidth: 18,
            itemHeight: 160,
            textStyle: {
              color: '#fff',
              height: 56,
              fontSize: 11,
              lineHeight: 60,
            },
            inRange: {
              color: ['#4b5cc4', '#70f3ff']
            },
            padding: [50, 20],
            orient: 'horizontal',
          },
          series: [{
            type: 'scatter',
            data: seriesData,
            symbolSize: 20,
            markLine: {
              label: {
                normal: {
                  formatter: function(params) {
                    return params.value + " %";
                  }
                }
              },
              lineStyle: {
                normal: {
                  color: "#4c8dae",
                  type: 'solid',
                  width: 1,
                },
                emphasis: {
                  color: "#d9def7"
                }
              },
              data: [{
                xAxis: avg.salesAvgLine,
                name: '平均响应率%',
                itemStyle: {
                  normal: {
                    color: "#fff",
                  }
                }
              }, {
                  yAxis: avg.servicesAvgLine,
                  name: '平均发货率%',
                  itemStyle: {
                    normal: {
                      color: "#fff",
                    }
                  }
                }
              ]
            },

            markArea: {
              silent: true,
              data: [
                [{
                  name: '',
                  itemStyle: {
                    normal: {
                      color: 'transparent'
                    },
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'insideTopLeft',
                      color: "#44cef6",
                      fontSize: 14,
                    }
                  },
                  coord: [avg.salesAvgLine, avg.servicesAvgLine],
                }, {
                  coord: [Number.MAX_VALUE, 0],
                }],
                [{
                  name: '一般',
                  itemStyle: {
                    normal: {
                      color: 'transparent',
                    },
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'insideTopRight',
                      color: "#4b5cc4",
                      fontSize: 14,
                    }
                  },
                  coord: [0, 0],
                }, {
                  coord: [avg.salesAvgLine, avg.servicesAvgLine],
                }],
                [{
                  name: '优秀',
                  itemStyle: {
                    normal: {
                      color: 'transparent',
                    },
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'insideBottomLeft',
                      color: "#70f3ff",
                      fontSize: 14,
                    }
                  },
                  coord: [avg.salesAvgLine, avg.servicesAvgLine],
                }, {
                  coord: [Number.MAX_VALUE, Number.MAX_VALUE],
                }],
                [{
                  name: '',
                  itemStyle: {
                    normal: {
                      color: 'transparent',
                    },
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'insideBottomRight',
                      color: "#177cb0",
                      fontSize: 14,
                    }
                  },
                  coord: [0, Number.MAX_VALUE],
                }, {
                  coord: [avg.salesAvgLine, avg.servicesAvgLine],
                }],
              ]
            }
          }]
        };
       this.chart.setOption(optionPic);
      },
      handleCheckAllChange(val){
        this.checkedType = val ? typeOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value){
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.types.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.types.length;
      },
      //根据
     hospatilDatas(){
        return {
          pageNum: 1,
          pageSize: 10,
          total: 8,
          pages: 1,
          list: []
        }
      },
      //左图标点击事件
      leftClick(row, index,id) {
        console.log(id);
        if(document.getElementById(id).className==='el-icon-arrow-right'){
          document.getElementById(id).setAttribute('class','el-icon-arrow-down')
        }else{
          document.getElementById(id).setAttribute('class','el-icon-arrow-right');
        }
        var idl=id.replace('left','right');
        document.getElementById(idl).setAttribute('class','el-icon-arrow-left');
        this.$set(row, 'expand1', !row.expand1);
        this.$set(row, 'expand2', false);
        this.$set(row, 'left', true);
        this.$set(row, 'right', false);
      },
      //右图标点击事件
      rightClick(row, index,id) {
        if(document.getElementById(id).className==='el-icon-arrow-left'){
          document.getElementById(id).setAttribute('class','el-icon-arrow-down')
        }else{
          document.getElementById(id).setAttribute('class','el-icon-arrow-left');
        }
        var idr=id.replace('right','left');
        document.getElementById(idr).setAttribute('class','el-icon-arrow-right');
        this.$set(row, 'expand1', false);
        this.$set(row, 'expand2', !row.expand2);
        this.$set(row, 'left', false);
        this.$set(row, 'right', true);
      },
    }
  }

</script>
