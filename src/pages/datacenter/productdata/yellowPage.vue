<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-160">
              <el-select v-model="query.searchTypeA" size="small">
                <el-option  label="品名" value="1"></el-option>
                <el-option  label="产品编码" value="2"></el-option>
                <el-option  label="产品ID" value="3"></el-option>
                <el-option  label="批准文号" value="4"></el-option>
                <el-option  label="药品本位码" value="5"></el-option>
                <el-option  label="进口药品注册证号" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-input v-model="query.searchContentA" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-160">
              <el-select v-model="query.searchTypeB" size="small">
                <el-option label="生产企业" value="1"></el-option>
                <el-option label="代理企业" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-input v-model="query.searchContentB" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>

          <span v-if="showQuery" class="ftsz0">
            <el-form-item class="width-160">
              <el-select v-model="query.examineFlag" placeholder="审核状态" size="small">
                <el-option label="未审核" value="0"></el-option>
                <el-option label="已通过" value="1"></el-option>
                <el-option label="未通过" value="2"></el-option>
                <!--<el-option label="临时数据" value="3"></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-select v-model="query.enableFlag" placeholder="使用状态" size="small">
                <el-option label="禁用" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-input v-model="query.doseage" placeholder="剂型" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item class="width-160">
              <el-input v-model="query.spec" placeholder="规格" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <!--<span class="width-160">
              <el-select v-model="query.examinePeople" placeholder="审核人" size="small" @keyup.enter.native="searchEnterFun">
                <el-option
                  v-for="item in checkPeoples.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>-->
            <el-form-item>
              <el-date-picker class="width-200" type="date" placeholder="最后一次审核时间-开始" v-model="query.examineTimeBegin" size="small"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker class="width-200" type="date" placeholder="最后一次审核时间-结束" v-model="query.examineTimeEnd" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item class="width-160">
              <el-select v-model="query.attestationKey" placeholder="认证字段" size="small">
                <el-option label="GMP药品" value="1"></el-option>
                <el-option label="中药保护品种" value="2"></el-option>
                <el-option label="国家基本医疗保险" value="3"></el-option>
                <el-option label="国家基本药物" value="4"></el-option>
                <el-option label="OTC药品" value="5"></el-option>
                <el-option label="行政保护" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-select v-model="query.attestationFlag" placeholder="认证状态" size="small">
                <el-option label="否" value="0"></el-option>
                <el-option label="是" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-select v-model="query.registerType" placeholder="注册证类型" size="small">
                <el-option label="批准文号" value="0"></el-option>
                <el-option label="进口注册证号" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker class="width-200" type="date" placeholder="注册证类型效期-开始" v-model="query.registerDateBegin" size="small"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker class="width-200" type="date" placeholder="注册证类型效期-结束" v-model="query.registerDateEnd" size="small"></el-date-picker>
            </el-form-item>
          </span>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
            <el-button type="" v-if="showForm" @click="more()" size="small">更多</el-button>
            <el-button type="" v-if="showQuery" @click="less()" size="small">收起</el-button>
          </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
                :data="resData.list"
                border
                stripe
                :row-key="getRowKeys"
                :expand-row-keys="expands"
                @row-click="toggleRowExpansion"
                @sort-change="sortChangeFunc">
          <!-- 展开行 -->
          <el-table-column type="expand" >
            <template slot-scope="scope">
              <el-form label-position="left" inline>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="药品分类标准：" class="nomar-btm">{{ scope.row.catCategory.name }}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="质量标准类型：" class="nomar-btm">{{ setCriterionType(scope.row.catDrug.criterionType) }}</el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="质量标准编号：" class="nomar-btm">{{ scope.row.catDrug.criterionNum }}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="重（装）量：" class="nomar-btm">{{ scope.row.catDrug.weightNum }}g</el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="含量：" class="nomar-btm">{{ scope.row.catDrug.contentNum }}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="产品来源：" class="nomar-btm">{{ setProductSource(scope.row.catProduct.productSource) }}</el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="单位转换比：" class="nomar-btm">{{ scope.row.catDrug.standRate }}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="GMP认证：" class="nomar-btm">{{ setGmpFlag(scope.row.catProduct.gmpFlag) }}</el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="批准文号：" class="nomar-btm">{{ scope.row.catProduct.permitNumber }}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="价格：" class="nomar-btm">{{ scope.row.catProduct.nationalRetailPrice }}</el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="生产企业：" class="nomar-btm">{{ scope.row.catOrg.name }}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                  </el-col>
                </el-row>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="通用名" prop="generalName" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catDrug==null?'':scope.row.catDrug.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名" prop="trade_name" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catProduct.tradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型" prop="doseageName" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catDoseageForm==null?'':scope.row.catDoseageForm.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="spec" sortable="custom" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catDrug==null?'':scope.row.catDrug.spec }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="metric_id" sortable="custom" width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.catMetric==null?'':scope.row.catMetric.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比" prop="stand_rate" sortable="custom" width="80" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.catDrug==null?'':scope.row.catDrug.standRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材" prop="wrap_code" sortable="custom" width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.catWrap==null?'':scope.row.catWrap.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="国家基药"prop="national_basic_drug" sortable="custom" width="100">
            <template slot-scope="scope">
              <span>{{ setBasicDrug(scope.row.catDrug==null?'':scope.row.catDrug.nationalBasicDrug) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="医保类型" prop="national_insurance_drug" sortable="custom">
            <template slot-scope="scope">
              <span>{{ setInsuranceDrug(scope.row.catDrug==null?'':scope.row.catDrug.nationalInsuranceDrug) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="OTC药物" prop="prescription" sortable="custom" width="100">
            <template slot-scope="scope">
              <span>{{ setPrescription(scope.row.catDrug==null?'':scope.row.catDrug.prescription) }}</span>
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

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {yellowPageList,queryCheckUsersList} from 'src/axios/datacenter/productdata/yellowpage/yellowpage'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: true, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        checkPeoples:this.checkPeopleData(),
        getRowKeys(row) {
          return row.id;
        },
        expands:[],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
      this.list();
      //this.examinePeopleList()
    },
    methods: {
      toggleRowExpansion(row){
        if(this.expands.length==0){
          this.expands.push(row.id);
        }else{
          this.expands = [];
        }
      },
      searchEnterFun(e){
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          if(this.query.searchContentA || this.query.searchContentB || this.query.doseage || this.query.spec
            || this.query.examineFlag||this.query.enableFlag || this.query.examinePeople ||  this.query.registerType){
            this.list();
          }
          if(this.query.attestationKey && this.query.attestationFlag ){
            this.list();
          }
        })
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          pageNum: 1,
          pageSize: 10,
          size: undefined,
          startRow: undefined,
          endRow: undefined,
          total: undefined,
          pages: undefined,
          prePage: undefined,
          nextPage: undefined,
          isFirstPage: true,
          isLastPage: undefined,
          hasPreviousPage: undefined,
          hasNextPage: undefined,
          navigatePages: undefined,
          navigatepageNums: undefined,
          navigateFirstPage: undefined,
          navigateLastPage: undefined,
          firstPage: undefined,
          lastPage: undefined,
          list: undefined
        }
      },
      // 表单查询数据初始化
      metaQuery () {
        return {
          searchTypeA: '1',
          searchContentA: undefined,
          searchTypeB: '1',
          searchContentB: undefined,
          examineFlag: undefined,
          enableFlag:undefined,
          doseage:undefined,
          spec:undefined,
          examinePeople:undefined,
          examineTimeBegin:undefined,
          examineTimeEnd:undefined,
          attestationKey:undefined,
          attestationFlag:undefined,
          registerType:undefined,
          registerDateBegin:undefined,
          registerDateEnd:undefined,
          orderBy:undefined

        }
      },
      //   审核人初始化
      checkPeopleData(){
        return{
          options:undefined,
          value:''
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  排序查询
      sortChangeFunc(value){
        let sortType=" desc"
        if(value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list();
        }
      },
      //  获取用户分页列表
      list () {
        yellowPageList(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      //  获取审核人列表
      examinePeopleList(){
        queryCheckUsersList().then(res => {
            this.checkPeoples.options=res.data;
        })
      },
      //  重置
      resetForm() {
        this.query = this.metaQuery();
        this.resData= this.metaData();
        this.list();
      },
      //  更多查询选项
      more(){
        this.showForm=false;
        this.showQuery=true;
      },
      less(){
        this.showForm=true;
        this.showQuery=false;
      },
      //  setNameChn
      setNameChn(entity){
        var label='无';
        if(entity!=null){
          label=entity.nameChn;
        }
        return label;
      },
      //  国家基药
      setBasicDrug(key){
        var label='';
        switch (key){
          case "0":
          {label='否';}
            break;
          case "1":
          {label='是';}
            break;
        }
        return label;
      },
      //  医保类型
      setInsuranceDrug(key){
        var label='';
        switch (key){
          case "0":
          {label='非国家基本医疗保险药品';}
            break;
          case "1":
          {label='甲类';}
            break;
          case "2":
          {label='乙类';}
            break;
          case "3":
          {label='民族药';}
            break;
        }
        return label;
      },
      //  OTC药物
      setPrescription(key){
        var label='';
        switch (key){
          case "1":
          {label='非OTC';}
            break;
          case "2":
          {label='甲类OTC';}
            break;
          case "3":
          {label='乙类OTC';}
            break;
        }
        return label;
      },
      //  质量标准类型
      setCriterionType(key){
        var label='';
        switch (key){
          case "00":
          {label='空';}
            break;
          case "01":
          {label='药典标准';}
            break;
          case "02":
          {label='SFDA标准';}
            break;
          case "03":
          {label='部颁标准';}
            break;
          case "04":
          {label='进口标准';}
            break;
          case "05":
          {label='生物制品规程';}
            break;
        }
        return label;
      },
      //  产品来源
      setProductSource(key){
        var label='';
        switch (key){
          case "0":
          {label='国产';}
            break;
          case "1":
          {label='进口';}
            break;
          case "2":
          {label='进口分装';}
            break;
        }
        return label;
      },
      //  GMP认证
      setGmpFlag(key){
        var label='';
        switch (key){
          case "0":
          {label='是';}
            break;
          case "1":
          {label='否';}
            break;
        }
        return label;
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
<style>
  @import "../../../assets/css/datacenter.css";
</style>
