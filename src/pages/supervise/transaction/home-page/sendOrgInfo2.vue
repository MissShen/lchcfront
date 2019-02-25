<template>
  <dl class="mainbox">
    <dd>
      <div class="s-form">
        <el-form>
          <el-input placeholder="配送企业"></el-input>
          <span class="date-group">
             <el-date-picker
               size="small"
               type="date"
               format="yyyy-MM-dd"
               value-format="yyyy-MM-dd"
               placeholder="创建开始日期"
               :editable="false"
             >
              </el-date-picker>
            至
            <el-date-picker
              size="small"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="创建结束日期"
              :editable="false"
            >
              </el-date-picker>
           </span>
          <el-button @click="" size="small">查询</el-button>
          <el-button @click="" size="small">重置</el-button>
          <el-button @click="" size="small">导出</el-button>
        </el-form>
      </div>
      <div class="tableset" style="overflow: auto; width: 100%;">
        <table class="s-table">
          <thead>
          <tr>
            <th width="30"></th>
            <th>配送企业</th>
            <th width="180">订单数</th>
            <th width="180">响应订单数</th>
            <th width="150">响应率(%)</th>
            <th width="200">订购数量</th>
            <th width="220">订购金额（万元）</th>
            <th width="30"></th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(row,index) in sendData.list">
            <tr>
              <td @click="leftClick(row,index)" align="center" class="nopadding" title="查看医院"><i
                class="el-icon-arrow-right" :id="row.sendOrgId+'left'"></i></td>
              <td>{{row.sendOrgName}}</td>
              <td align="right">{{row.orderNum}}</td>
              <td align="right">{{row.responseOrderNum}}</td>
              <td align="right">{{row.responseRate}}</td>
              <td align="right">{{row.requestNum}}</td>
              <td align="right">{{row.requestMoney}}</td>
              <td @click="rightClick(row,index)" align="center" class="nopadding" title="查看产品"><i
                class="el-icon-arrow-left" :id="row.sendOrgId+'right'"></i></td>
            </tr>
            <tr v-if="row.expand1==true||row.expand2==true" class="s-table-extend">
              <td colspan="8">
                <el-form class="s-form" v-if="row.left">
                  <el-input v-model="queryHosData.orgHosName" placeholder="医院名称"></el-input>
                  <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="开始日期"
                 :editable="false"
                 v-model="queryHosData.startHosDate">
                </el-date-picker>
              至
              <el-date-picker
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                :editable="false"
                v-model="queryHosData.endHosDate">
                </el-date-picker>
           </span>
                  <el-button @click="searchHospatil" size="small">查询</el-button>
                  <el-button @click="queryHosData=queryHosDatas()" size="small">重置</el-button>
                  <el-button @click="" size="small">导出</el-button>
                </el-form>
                <el-table :data="hospatilData.list" stripe border tooltip-effect="dark" v-if="row.left" key="hospital">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form class="s-form">
                        <el-input v-model="queryData.productName" placeholder="产品名称"></el-input>
                        <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="开始日期"
                 :editable="false"
                 v-model="queryData.proStartDate">
                </el-date-picker>
                  至
                  <el-date-picker
                    size="small"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="结束日期"
                    :editable="false"
                    v-model="queryData.proEndDate">
                    </el-date-picker>
               </span>
                        <el-button @click="searchProduct" size="small">查询</el-button>
                        <el-button @click="queryData=queryDatas()" size="small">重置</el-button>
                        <el-button @click="" size="small">导出</el-button>
                      </el-form>
                      <el-table :data="resData.list" stripe border tooltip-effect="dark" key="product">
                        <el-table-column prop="productName" label="产品名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="tradeName" label="商用名" width="100"></el-table-column>
                        <el-table-column prop="doseageFormName" label="剂型" width="100"></el-table-column>
                        <el-table-column prop="drugStorage" label="产品信息">
                          <template slot-scope="scope">
                            <div class="ellipsis es300 ">
                              {{ scope.row.spec}}
                            </div>
                            <div :title="scope.row.manufactureName" class="ellipsis es200"
                                 v-if="scope.row.manufactureName!=''">{{ scope.row.manufactureName}}
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="basicMedicant" label="基药标记"></el-table-column>
                        <el-table-column prop="requestNumber" label="订单数量" align="right" header-align="left"
                                         width="100"></el-table-column>
                        <el-table-column label="订单金额" align="right" header-align="left" width="120">
                          <template slot-scope="scope">
                            <span>{{ priceFormat(scope.row.requestPrice)}}%</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="receiveNumber" label="到货数量" align="right" header-align="left"
                                         width="100"></el-table-column>
                        <el-table-column label="到货金额" align="right" header-align="left" width="120">
                          <template slot-scope="scope">
                            <span>{{ priceFormat(scope.row.receivePrice)}}%</span>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="pagebox">
                        <el-pagination
                          layout="total, sizes, prev, pager, next, jumper"
                          :page-sizes="[10, 20, 30]"
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :total="resData.total"
                          :page-size="resData.pageSize"
                          :page-count="resData.pages"
                          :current-page.sync="resData.pageNum">
                        </el-pagination>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="orgName" label="医院名称" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="purchaseNumber" label="订单数量" align="right" header-align="left"
                                   width="120"></el-table-column>
                  <el-table-column label="订单金额" align="right" header-align="left" width="180">
                    <template slot-scope="scope">
                      <span>{{ priceFormat(scope.row.purchasePrice)}}%</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="arrivalNumber" label="到货数量" align="right" header-align="left"
                                   width="120"></el-table-column>
                  <el-table-column label="到货金额" align="right" header-align="left" width="180">
                    <template slot-scope="scope">
                      <span>{{ priceFormat(scope.row.arrivalPrice)}}%</span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-form class="s-form" v-if="row.right">
                  <el-input v-model="queryData.productName" placeholder="产品名称"></el-input>
                  <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="开始日期"
                 :editable="false"
                 v-model="queryData.proStartDate">
                </el-date-picker>
                  至
                  <el-date-picker
                    size="small"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="结束日期"
                    :editable="false"
                    v-model="queryData.proEndDate">
                    </el-date-picker>
               </span>
                  <el-button @click="searchProduct" size="small">查询</el-button>
                  <el-button @click="queryData=queryDatas()" size="small">重置</el-button>
                  <el-button @click="" size="small">导出</el-button>
                </el-form>
                <el-table :data="resData.list" stripe border tooltip-effect="dark" v-if="row.right" key="product">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form class="s-form">
                        <el-input v-model="queryHosData.orgHosName" placeholder="医院名称"></el-input>
                        <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="开始日期"
                 :editable="false"
                 v-model="queryHosData.startHosDate">
                </el-date-picker>
              至
              <el-date-picker
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                :editable="false"
                v-model="queryHosData.endHosDate">
                </el-date-picker>
           </span>
                        <el-button @click="searchHospatil" size="small">查询</el-button>
                        <el-button @click="queryHosData=queryHosDatas()" size="small">重置</el-button>
                        <el-button @click="" size="small">导出</el-button>
                      </el-form>
                      <el-table :data="hospatilData.list" stripe border tooltip-effect="dark" key="hospital">
                        <el-table-column prop="orgName" label="医院名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="purchaseNumber" label="订单数量" align="right" header-align="left"
                                         width="120"></el-table-column>
                        <el-table-column label="订单金额" align="right" header-align="left" width="180">
                          <template slot-scope="scope">
                            <span>{{ priceFormat(scope.row.purchasePrice)}}%</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="arrivalNumber" label="到货数量" align="right" header-align="left"
                                         width="120"></el-table-column>
                        <el-table-column label="到货金额" align="right" header-align="left" width="180">
                          <template slot-scope="scope">
                            <span>{{ priceFormat(scope.row.arrivalPrice)}}%</span>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="pagebox">
                        <el-pagination
                          layout="total, sizes, prev, pager, next, jumper"
                          :page-sizes="[10, 20, 30]"
                          @size-change="handleRightSizeChange"
                          @current-change="handleRightCurrentChange"
                          :total="hospatilData.total"
                          :page-size="hospatilData.pageSize"
                          :page-count="hospatilData.pages"
                          :current-page.sync="hospatilData.pageNum">
                        </el-pagination>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productName" label="产品名称" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="tradeName" label="商用名" width="100"></el-table-column>
                  <el-table-column prop="doseageFormName" label="剂型" width="100"></el-table-column>
                  <!--                  <el-table-column prop="spec" label="规格" width="100" show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="manufactureName" label="生产企业" show-overflow-tooltip></el-table-column>-->
                  <el-table-column prop="drugStorage" label="产品信息">
                    <template slot-scope="scope">
                      <div class="ellipsis es300 ">
                        {{ scope.row.spec}}
                      </div>
                      <div :title="scope.row.manufactureName" class="ellipsis es200"
                           v-if="scope.row.manufactureName!=''">{{ scope.row.manufactureName}}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="basicMedicant" label="基药标记"></el-table-column>
                  <el-table-column prop="requestNumber" label="订单数量" align="right" header-align="left"
                                   width="100"></el-table-column>
                  <el-table-column label="订单金额" align="right" header-align="left" width="120">
                    <template slot-scope="scope">
                      <span>{{ priceFormat(scope.row.requestPrice)}}%</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="receiveNumber" label="到货数量" align="right" header-align="left"
                                   width="100"></el-table-column>
                  <el-table-column label="到货金额" align="right" header-align="left" width="120">
                    <template slot-scope="scope">
                      <span>{{ priceFormat(scope.row.receivePrice)}}%</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagebox" v-if="row.left">
                  <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[10, 20, 30]"
                    @size-change="handleRightSizeChange"
                    @current-change="handleRightCurrentChange"
                    :total="hospatilData.total"
                    :page-size="hospatilData.pageSize"
                    :page-count="hospatilData.pages"
                    :current-page.sync="hospatilData.pageNum">
                  </el-pagination>
                </div>
                <div class="pagebox" v-if="row.right">
                  <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[10, 20, 30]"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :total="resData.total"
                    :page-size="resData.pageSize"
                    :page-count="resData.pages"
                    :current-page.sync="resData.pageNum">
                  </el-pagination>
                </div>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
        <div v-if="sendData.list.length===0" class="el-table__empty-block">
          <span class="el-table__empty-text">暂无数据</span>
        </div>
      </div>

      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSendSizeChange"
          @current-change="handleSendCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="sendData.total"
          :page-size="sendData.pageSize"
          :page-count="sendData.pages"
          :current-page.sync="sendData.pageNum">
        </el-pagination>
      </div>
    </dd>
  </dl>
</template>

<script>
  import {
    querySendInfo,
    queryProductInfo,
    queryHospatilBySender
  } from "src/axios/supervise/supervise-transaction/supervision";
  import {priceFormat} from "src/utils/index"

  export default {
    name: "",
    data() {
      return {
        sendOrgId: '',
        resData: this.metaData(),
        queryHosData: this.queryHosDatas(),
        hospatilData: this.hospatilDatas(),
        sendData: this.sendDatas(),
        queryData: this.queryDatas(),
      }
    },
    mounted() {
      this.searchSender();
    },
    methods: {
      priceFormat,
      sendDatas() {
        return {
          pageNum: 1,
          pageSize: 20,
          total: 20,
          pages: 1,
          list: []
        }
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.selectProduct(this.queryData.id, '0')
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.selectProduct(this.queryData.id, '0')
      },
      handleRightSizeChange(val) {
        this.hospatilData.pageSize = val;
        this.selectHospital(this.sendOrgId, '1');
      },
      handleRightCurrentChange(val) {
        this.hospatilData.pageNum = val;
        this.selectHospital(this.sendOrgId, '1');
      },
      handleSendSizeChange(val) {
        this.sendData.pageSize = val;
        this.searchSender()
      },
      handleSendCurrentChange(val) {
        this.sendData.pageNum = val;
        this.searchSender()
      },
      queryHosDatas() {
        return {
          id: '',
          orgHosName: '',
          startHosDate: '',
          endHosDate: ''
        }
      },
      hospatilDatas() {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 10,
          pages: 1,
          list: []
        }
      },
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 10,
          total: 10,
          pages: 1,
          list: []
        }
      },
      queryDatas() {
        return {
          id: '',
          orgName: '',
          startDate: '',
          endDate: '',
          productName: '',
          proStartDate: '',
          proEndDate: ''
        }
      },
      searchSender() {
        querySendInfo(this.sendData, this.queryData).then(res => {
          this.sendData = res.data;
        })
      },
      searchProduct() {
        this.selectProduct(this.sendOrgId, '1');
      },
      searchHospatil() {
        this.selectHospital(this.sendOrgId, '1');
      },
      leftClick(row, index) {
        this.$set(row, 'expand1', !row.expand1);
        this.$set(row, 'expand2', false);
        this.$set(row, 'left', true);
        this.$set(row, 'right', false);
        if (document.getElementById(row.sendOrgId + 'left').className === 'el-icon-arrow-right') {
          document.getElementById(row.sendOrgId + 'left').className = 'el-icon-arrow-down'
        } else {
          document.getElementById(row.sendOrgId + 'left').className = 'el-icon-arrow-right'
        }
        document.getElementById(row.sendOrgId + 'right').className = 'el-icon-arrow-left';
        if (document.getElementById(row.sendOrgId + 'left').className === 'el-icon-arrow-down') {
          this.selectHospital(row.sendOrgId, '0');
          this.selectProduct(row.sendOrgId, '0')
        }
      },
      rightClick(row, index) {
        this.$set(row, 'expand1', false);
        this.$set(row, 'expand2', !row.expand2);
        this.$set(row, 'left', false);
        this.$set(row, 'right', true);
        if (document.getElementById(row.sendOrgId + 'right').className === 'el-icon-arrow-left') {
          document.getElementById(row.sendOrgId + 'right').className = 'el-icon-arrow-down'
        } else {
          document.getElementById(row.sendOrgId + 'right').className = 'el-icon-arrow-left'
        }
        document.getElementById(row.sendOrgId + 'left').className = 'el-icon-arrow-right';
        if (document.getElementById(row.sendOrgId + 'right').className === 'el-icon-arrow-down') {
          this.selectProduct(row.sendOrgId, '0')
        }
      },
      selectProduct(sendOrgId, index) {
        this.sendOrgId = sendOrgId;
        this.queryData.id = sendOrgId;
        if (index == '0') {
          this.queryData.proStartDate = this.queryData.startDate;
          this.queryData.proEndDate = this.queryData.endDate;
        }
        queryProductInfo(this.resData, this.queryData).then(res => {
          this.resData = res.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
      },
      selectHospital(sendOrgId, index) {
        this.sendOrgId = sendOrgId;
        this.queryHosData.id = sendOrgId;
        if (index == '0') {
          this.queryHosData.startHosDate = this.queryData.startDate;
          this.queryHosData.endHosDate = this.queryData.endDate;
        }
        queryHospatilBySender(this.hospatilData, this.queryHosData).then(res => {
          this.hospatilData = res.data;
          0 === this.hospatilData.pageNum ? this.hospatilData.pageNum = 1 : null;
        })

      },
    },
    watch: {},
  }
</script>
<style>
</style>
