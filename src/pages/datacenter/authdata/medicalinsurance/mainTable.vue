<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item class="width-160">
              <el-select v-model="query.areaId" placeholder="查询地区" size="small">
                <el-option
                  v-for="item in area.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-select v-model="query.searchType" placeholder="公告药品名称" size="small">
                <el-option  label="公告药品名称" value="5"></el-option>
                <el-option  label="关联药品名称" value="6"></el-option>
                <el-option  label="第一层分类" value="1"></el-option>
                <el-option  label="第二层分类" value="2"></el-option>
                <el-option  label="第三层分类" value="3"></el-option>
                <el-option  label="第四层分类" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-input v-model="query.searchContent" placeholder="关键词" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-radio-group v-model="query.limitFlag">
                <el-radio  label="111">全部</el-radio>
                <el-radio  label="1">正常</el-radio>
                <el-radio  label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>

          <span class="ftsz0" v-if="showForm">
            <el-form-item class="width-160">
              <el-select v-model="query.medicareType" placeholder="医保类别" size="small">
                <el-option  label="甲类" value="1"></el-option>
                <el-option  label="乙类" value="2"></el-option>
                <el-option  label="民族药" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="width-160">
              <el-input v-model="query.loadUserName" placeholder="录入人" @keyup.enter.native="searchEnterFun" size="small"></el-input>
            </el-form-item>
            <el-form-item class="width-160">
              <el-date-picker v-model="query.loadDateBegin" type="date" placeholder="录入时间-开始" size="small"></el-date-picker>
            </el-form-item>
            <el-form-item class="width-160">
              <el-date-picker v-model="query.loadDateEnd" type="date" placeholder="录入时间-结束" size="small"></el-date-picker>
            </el-form-item>
          </span>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="reset()" size="small">重置</el-button>
            <el-button type="" v-if="showQuery" @click="more()" size="small">更多</el-button>
            <el-button type="" v-if="showForm" @click="less()" size="small">收起</el-button>
          </el-form-item>
        </el-form>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button size="small" type="success" @click="goAdd()">新增</el-button>
          <el-button size="small" type="danger" @click="goDelete()">删除</el-button>
          <el-button type="warning" size="small" @click="getTips()">导出Excel</el-button>
        </div>
        <!--<el-button type="primary" size="small" @click="handleChange">导入数据</el-button>
        <input type="file" id="uploadFile" @change="getFile($event)" style="display:none;">
        <el-button type="primary" size="small" @click="downloadExcel()">下载模板</el-button>-->
      </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          ref="multipleTable"
          :data="resData.list"
          @selection-change="handleSelectionChange"
          :row-key="getRowKeys"
          @sort-change="sortChangeFunc"
          border
          stripe>
          <el-table-column width="50" type="selection" :reserve-selection="true" align="center"></el-table-column>
          <el-table-column label="地区" prop="province_id" sortable="custom" width="100" show-overflow-tooltip="true">
            <template slot-scope="scope" >
              <span>{{ scope.row.provinceId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="国家医保号" prop="insured_nation_nubmer" sortable="custom" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.insuredNationNubmer }}</span>
            </template>
          </el-table-column>
          <el-table-column label="第一层分类" prop="drug_category" sortable="custom" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.drugCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column label="第二层分类" prop="middle_category" sortable="custom" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.middleCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column label="第三层分类" prop="small_category" sortable="custom" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.smallCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column label="第四层分类" prop="fourth_category" sortable="custom" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.fourthCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column label="医保药类别" prop="insured_drug_type" sortable="custom" width="120" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ getInsuredDrugType(scope.row.insuredDrugType) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公告药品名称" prop="bulletin_drug_name" sortable="custom" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.bulletinDrugName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公告剂型名称" prop="bulletin_doseage_name" sortable="custom" width="100" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.bulletinDoseageName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="（是/否）限制使用" prop="permit_flag" sortable="custom" width="140" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ getPermitFlag(scope.row.permitFlag) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130" >
            <template slot-scope="scope">
              <a class="operation-btn" @click="goCheckPage(scope.row.id)">查看</a>
              <a class="operation-btn" @click="goUpdatePage(scope.row.id)">修改</a>
              <a class="operation-btn" @click="goCopyPage(scope.row.id)">复制</a>
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
    <el-dialog
            :title="tip"
            :close-on-click-modal="false"
            width="400px"
            :visible.sync="tipVisible">
      <div class="tipbox">
        <i class="el-icon-warning"></i>
        <span>导出当前筛选数据或全部数据？</span>
      </div>
      <span slot="footer">
      <el-button size="small" @click="exportExcel(query)">当前数据</el-button>
      <el-button size="small" type="primary" @click="exportExcel(metaQuery())">全部数据</el-button>
    </span>
    </el-dialog>
  </div>

</template>
<script>

  // 引入用户相关请求
  import {medicareDrugsList} from 'src/axios/datacenter/authdata/medicalinsurance/medicalinsurance';
  import {areaList,deleteMedicare} from 'src/axios/datacenter/authdata/medicalinsurance/medicalinsurance';
  import {exportExcel,importData,downloadExcel} from 'src/axios/datacenter/authdata/medicalinsurance/medicalinsurance';
  import fileUpload from 'js-file-download'
  import {keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        tip:'提示',
        activeName: '1',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        area:this.checkArea(),
        showForm: false, // 表单可见性初始化
        showQuery: true, // 表单查询初始化
        assoList:[],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        tipVisible: false
      }
    },
    created () {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query=this.$store.state.pageSeach;
        this.resData.pageSize=this.$store.state.pageSeach.pageSize;
        this.resData.pageNum=this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      this.list();
      this.queryArea();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
           // 前后台交互数据封装格式
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
      metaQuery () {
        return {
          // 表单查询数据初始化
          id: undefined,
          areaId: undefined,
          searchType: "5",
          searchContent: undefined,
          limitFlag: "111",
          medicareType: undefined,
          loadUserName: undefined,
          loadDateBegin: undefined,
          loadDateEnd: undefined,
          orderBy:undefined
        }
      },
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
      //   查询地区初始化
      checkArea(){
        return{
          options:undefined,
          value:''
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  回车查询
      searchEnterFun (e){
        this.$store.state.pageSeach.pageNum=1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list2();
        })
      },
      //  查询
      // search(){
      //   this.$store.state.pageSeach.pageNum=1;
      //   this.resData.pageNum=1;
      //   this.list2();
      // },
      //  查询重置
      list2 () {
        this.$refs.multipleTable.clearSelection();
        this.$store.state.pageSeach=this.query;
        medicareDrugsList( this.query, this.resData).then(res => {
          this.resData = res.data
      })
      },
      //  获取用户分页列表
      list () {
        this.$store.state.pageSeach=this.query;
        medicareDrugsList( this.query, this.resData).then(res => {
          this.resData = res.data
        })
      },
      //  重置
      reset(){
        this.query=this. metaQuery ();
        this.resData=this.metaData();
        this.list2();
      },
      //  查询地区
      queryArea(){
        areaList().then(res => {
          this.area.options=res.data;
        })
      },
      //  医保类别
      getInsuredDrugType(num){
        var type;
        switch (num){
          case "0":
          {type='空';}
            break;
          case "1":
          {type='甲类';}
            break;
          case "2":
          {type='乙类';}
            break;
          case "3":
          {type='民族药';}
            break;
        }
        return type;
      },
      //  是否限制
      getPermitFlag(num){
        var flag;
        switch (num){
          case "0":
          {flag='否';}
            break;
          case "1":
          {flag='是';}
            break;
        }
        return flag;
      },
      //  显示更多查询条件
      more(){
        this.showForm=true;
        this.showQuery=false
      },
      //  收起查询条件
      less(){
        this.showForm=false;
        this.showQuery=true
      },
      //  查看
      goCheckPage(id){
        this.$router.push("/DATA/basedata/authdata/medicalInsurance/tableDetail/"+id);
      },
      //  新增
      goAdd(){
        this.$router.push("/DATA/basedata/authdata/medicalInsurance/insertForm");
      },
      //  修改
      goUpdatePage(id){
        this.$router.push("/DATA/basedata/authdata/medicalInsurance/updateForm/"+id);
      },

      getRowKeys(row){
        return row.id;
      },

      //  选择选中对象存入数据组中
      handleSelectionChange(val){
        this.assoList = val;
      },
      //  删除
      goDelete(){
        if (this.assoList.length > 0) {
          this.$confirm('确认删除' + this.assoList.length + '个信息', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '重选',
            type: 'warning'
          }).then(() => {
            var ids = [];
            for (var row of this.assoList) {
              ids.push(row.id);
            }
          deleteMedicare(ids.toString()).then(res => {
              this.$message({
                      message: res.data,
                      type: 'success',
                      duration: 1000,
                      onClose: () => {
                      this.list();
                      this.$refs.multipleTable.clearSelection();
                      }
                })
            })
          });
        } else {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }
      },
      //  复制
      goCopyPage(id){
        this.$router.push("/DATA/basedata/authdata/medicalInsurance/copyForm/"+id);
      },
      //  导出窗口弹出
      getTips(){
        this.tipVisible = true;
      },
      //导出EXCEL
      exportExcel(query){
        exportExcel(query).then(res => {
          let headers = res.headers;
        let title = "";
        if (!title) {
          const fileName = headers['content-disposition'];
          title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
        }
        fileUpload(res.data, title, "application/vnd.ms-excel")
      });
        this.tipVisible = false;
      },
      //  导入Excel
      handleChange(){
        let obj = document.getElementById('uploadFile').click();
      },
      getFile(event){
        let files = event.target.files;
        let formData = new FormData();
        for (let f of files) {
          formData.append('files', f);
        }
        importData(formData).then(res => {
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
      //下载模板
      downloadExcel(){
        downloadExcel().then(res => {
          let headers = res.headers;
          let title = "";
          if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
          }
          fileUpload(res.data, title, "application/vnd.ms-excel")
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.$store.state.pageSeach.pageSize=val;
        this.resData.pageSize = val;
        this.list();
      },
      handleCurrentChange (val) {
        this.$store.state.pageSeach.pageNum=val;
        this.resData.pageNum = val;
        this.list();
      }
    }
  }
</script>

