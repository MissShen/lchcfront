<template>
  <dl class="mainbox">
    <dd>
      <div class="s-form">
        <el-form :inline="true" :model="queryData" ref="queryData">
          <el-input v-model="queryData.factoryName" placeholder="生产企业"></el-input>
          <span class="date-group">
            <el-date-picker
              class="hospital"
              size="small"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="开始日期"
              :editable="false"
              v-model="queryData.beginDate">
            </el-date-picker>
          </span>
          <span class="date-group">
              <el-date-picker
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                :editable="false"
                v-model="queryData.endDate">
              </el-date-picker>
          </span>
          <el-button @click="handleQuery()">查询</el-button>
          <el-button @click="queryData =metaQuery()" size="small">重置</el-button>
          <el-button size="small">导出</el-button>
        </el-form>
      </div>
      <div class="tableset">
        <el-table :data="resData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="factoryName" label="生产企业" show-overflow-tooltip></el-table-column>
          <el-table-column label="订购金额(万元)" align="right" width="140">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestPrice)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="requestNum" label="订购数量" align="right" width="120"></el-table-column>
          <el-table-column label="到货金额(万元)" align="right" width="120">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestPrice)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="requestNum" label="到货数量" align="right" width="120"></el-table-column>
          <el-table-column prop="vaietySum" label="订购品种数" align="right" width="140"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javascript:" @click="selectHospital(scope.row.factoryId,'0')">查看医院</a>
                <a href="javascript:" @click="selectSender(scope.row.factoryId,'0')">查看配送</a>
                <a href="javascript:" @click="selectProduct(scope.row.factoryId,'0')">查看产品</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    </dd>

    <el-dialog title="查看产品" :visible.sync="dialogTableVisible_pro" width="80%" :close-on-click-modal="false" @close="handleClose">
      <div class="s-form">
        <el-form>
          <el-input v-model="proQueryDate.productName" placeholder="产品名称"></el-input>
          <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="开始日期"
                 :editable="false"
                 v-model="proQueryDate.proStartDate">
                </el-date-picker>
              至
              <el-date-picker
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                :editable="false"
                v-model="proQueryDate.proEndDate">
                </el-date-picker>
           </span>
          <el-button @click="searchProduct" size="small">查询</el-button>
          <el-button @click="clearProduct()" size="small">重置</el-button>
          <el-button size="small">导出</el-button>
        </el-form>
      </div>
      <div class="tableset">
        <el-table :data="this.proResData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="productName" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tradeName" label="商用名" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="doseageForm" label="剂型" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="spec" label="规格" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="warpName" label="包材" width="70" show-overflow-tooltip></el-table-column>
          <el-table-column prop="manufactureName" label="生产企业" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="basicDrugFlag" label="基药标记" align="center" width="80"></el-table-column>
          <el-table-column prop="requestNum" label="订单数量" align="right" header-align="left" width="80"></el-table-column>
          <el-table-column  label="订单金额" align="right" width="120">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestPrice)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="receiveNum" label="到货数量" align="right" header-align="left" width="80"></el-table-column>
          <el-table-column  label="到货金额" align="right" header-align="left" width="120">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.receivePrice)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="proSizeChange"
          @current-change="proCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="proResData.total"
          :page-size="proResData.pageSize"
          :page-count="proResData.pages"
          :current-page.sync="proResData.pageNum">
        </el-pagination>
      </div>
    </el-dialog>

    <el-dialog title="查看医院" :visible.sync="dialogTableVisible_hos" width="70%" :close-on-click-modal="false" @close="handleClose">
      <div class="s-form">
        <el-form>
          <el-input v-model="hosQueryData.hospatilName" placeholder="医院名称"></el-input>
          <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="开始日期"
                 :editable="false"
                 v-model="hosQueryData.beginDate">
                </el-date-picker>
              至
              <el-date-picker
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                :editable="false"
                v-model="hosQueryData.endDate">
                </el-date-picker>
           </span>
          <el-button @click="searchHospatil" size="small">查询</el-button>
          <el-button @click="hosQueryData=hosQueryDatas()" size="small">重置</el-button>
          <el-button size="small">导出</el-button>
        </el-form>
      </div>
      <div class="tableset">
        <template>
          <el-table :data="resDescData.list" stripe border tooltip-effect="dark">
            <el-table-column property="buyerName" label="医院名称" show-overflow-tooltip></el-table-column>
            <el-table-column property="requestNum" label="订单数量" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column  label="订单金额" align="right" header-align="left" width="120">
              <template slot-scope="scope">
                <span>{{ priceFormat(scope.row.requestMoney)}}</span>
              </template>
            </el-table-column>
            <el-table-column property="receiveNum" label="到货数量" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column  label="到货金额" align="right" header-align="left" width="120">
              <template slot-scope="scope">
                <span>{{ priceFormat(scope.row.receiveMoney)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagebox">
            <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[10, 20, 30]"
              @size-change="handleDescSizeChange"
              @current-change="handleDescCurrentChange"
              :total="resDescData.total"
              :page-size="resDescData.pageSize"
              :page-count="resDescData.pages"
              :current-page.sync="resDescData.pageNum">
            </el-pagination>
          </div>
        </template>
      </div>
    </el-dialog>

    <el-dialog title="查看配送" :visible.sync="dialogTableVisible_send" width="70%" :close-on-click-modal="false" @close="handleClose">
      <div class="s-form">
        <el-form>
          <el-input v-model="sendQueryData.senderName" placeholder="配送企业"></el-input>
          <span class="date-group">
               <el-date-picker
                 size="small"
                 type="date"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 placeholder="开始日期"
                 :editable="false"
                 v-model="sendQueryData.beginDate">
                </el-date-picker>
              至
              <el-date-picker
                size="small"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束日期"
                :editable="false"
                v-model="sendQueryData.endDate">
                </el-date-picker>
           </span>
          <el-button @click="searchSender" size="small">查询</el-button>
          <el-button @click="sendQueryData=sendQueryDatas()" size="small">重置</el-button>
          <el-button size="small">导出</el-button>
        </el-form>
      </div>
      <div class="tableset">
        <template>
          <el-table :data="senderData.list" stripe border tooltip-effect="dark">
            <el-table-column property="senderName" label="医院名称" show-overflow-tooltip></el-table-column>
            <el-table-column property="requestNum" label="订单数量" align="right" width="100"></el-table-column>
            <el-table-column label="订单金额" align="right" header-align="left" width="120">
              <template slot-scope="scope">
                <span>{{ priceFormat(scope.row.requestPrice)}}</span>
              </template>
            </el-table-column>
            <el-table-column property="receiveNum" label="到货数量" align="right" header-align="left" width="100"></el-table-column>
            <el-table-column  label="到货金额" align="right" header-align="left" width="120">
              <template slot-scope="scope">
                <span>{{ priceFormat(scope.row.receivePrice)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagebox">
            <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[10, 20, 30]"
              @size-change="handleDescSizeChange"
              @current-change="handleDescCurrentChange"
              :total="senderData.total"
              :page-size="senderData.pageSize"
              :page-count="senderData.pages"
              :current-page.sync="senderData.pageNum">
            </el-pagination>
          </div>
        </template>
      </div>
    </el-dialog>

  </dl>
</template>
<script>
  import {makerList,getHosplist,getSender,getProductlist} from 'src/axios/supervise/supervise-transaction/maker'
  import {priceFormat} from "src/utils/index"
  export default {
    name: 'manufacturingEnterprise',
    data() {
      return {
        factoryId:'',
        dialogTableVisible_hos: false,
        dialogTableVisible_pro:false,
        dialogTableVisible_send:false,
        orgId:'',
        resData: this.metaData(),
        queryData: this.metaQuery(), // 查询初始化
        hosQueryData:this.hosQueryDatas(),
        sendQueryData:this.sendQueryDatas(),
        proQueryDate:this.queryDates(),
        resDescData:this.metaDescData(),
        senderData:this.senderDatas(),
        queryDescData:this.metaDescQuery(),
        proResData : this.proResDate(),
      }
    },
    mounted() {

    },
    created(){
      this.initTableData()
    },
    methods: {
      priceFormat,
      metaQuery() { // 查询数据封装格式
        return {
          factoryName: '',
          beginDate: undefined,
          endDate: undefined
        }
      },
      sendQueryDatas(){
        return {
          factoryId:'',
          senderName: '',
          beginDate: '',
          endDate: ''
        }
      },
      hosQueryDatas(){
        return {
          factoryId:'',
          hospatilName: '',
          beginDate: undefined,
          endDate: undefined
        }
      },
      queryDates(){
        return {
          factoryId:'',
          productName: '',
          proStartDate: '',
          proEndDate: ''
        }
      },
      clearProduct(){
        this.proQueryDate=this.queryDates();
      },
      searchProduct(){
        this.selectProduct(this.orgId,'1');
      },
      selectProduct(val,index){
          this.orgId=val;
          this.proQueryDate.factoryId=val;
          if(index=='0'){
            this.proQueryDate.proStartDate=this.queryData.startDate;
            this.proQueryDate.proEndDate=this.queryData.endDate;
          }
        getProductlist(this.proResData, this.proQueryDate).then(res => {
          this.proResData = res.data;
          0 === this.proResData.pageNum ? this.proResData.pageNum = 1 : null;
          this.dialogTableVisible_pro = true;
        })
      },
      searchHospatil(){
        this.selectHospital(this.factoryId,'1');
      },
      searchSender(){
        this.selectSender(this.factoryId,'1');
      },
      selectSender(val,index){
        this.sendQueryData.factoryId=val;
        this.factoryId=val;
        if(index=='0'){
          this.sendQueryData.beginDate=this.queryData.beginDate;
          this.sendQueryData.endDate=this.queryData.endDate;
        }
        console.log(this.sendQueryData.beginDate+"==="+this.sendQueryData.endDate);
        getSender(this.senderData, this.sendQueryData).then(response => {
          this.senderData = response.data;
          this.dialogTableVisible_send = true;
          0 === this.senderData.pageNum ? this.senderData.pageNum = 1 : null;
        });
      },

      selectHospital(val,index) {
        this.hosQueryData.factoryId=val;
        this.factoryId=val;
        if(index=='0'){
          this.hosQueryData.beginDate=this.queryData.startDate;
          this.hosQueryData.endDate=this.queryData.endDate;
        }
        getHosplist(this.resDescData, this.hosQueryData).then(response => {
          this.resDescData = response.data;
          this.dialogTableVisible_hos = true;
          0 === this.resDescData.pageNum ? this.resDescData.pageNum = 1 : null;
        });
      },
      proResDate(){
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      metaDescQuery(){
        return{
          id:'',
        }
      },
      senderDatas(){
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      metaDescData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      initTableData() {
        makerList(this.resData, this.queryData).then(response => {
          console.info("response ", response);
          this.resData = response.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
      },
      handleQuery() {
        this.resData = this.metaData();
        this.initTableData();
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.initTableData()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.initTableData()
      },
      proSizeChange(val){
        this.proQueryDate.pageSize=val;
        this.searchProduct();
      },
      proCurrentChange(val){
        this.proQueryDate.pageNum = val;
        this.searchProduct();
      },
      handleDescSizeChange(val) {
        this.resDescData.pageSize = val;
        this.selectHospital(this.queryDescData.id)
      },
      handleDescCurrentChange(val) {
        this.resDescData.pageNum = val;
        this.selectHospital(this.queryDescData.id)
      },
      handleClose(){
        this.dialogTableVisible = false;
        this.resDescData = {};
      }
    }
  }
</script>
