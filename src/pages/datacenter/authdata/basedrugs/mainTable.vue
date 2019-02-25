<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
            <el-form-item>
            <el-radio-group v-model="query.cnWestFlag">
              <el-radio label="1">中药</el-radio>
              <el-radio label="2">西药</el-radio>
            </el-radio-group>
          </el-form-item>
            <el-form-item class="width-120">
            <el-select v-model="query.countryId" placeholder="查询地区" size="small">
              <el-option
                v-for="item in chnRegions"
                :key="item.id"
                :label="item.nameChn"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
            <el-form-item class="width-120">
            <el-select v-model="query.searchType" placeholder="下拉框" size="small">
              <el-option label="公告药品名称" value="0"></el-option>
              <el-option label="药品编码" value="1"></el-option>
              <el-option label="药品小类" value="2"></el-option>
              <el-option label="药品中类" value="3"></el-option>
              <el-option label="药品大类" value="4"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item class="width-120">
            <el-input v-model="query.searchText" placeholder="关键词" @keyup.enter.native="searchEnterFun"
                      size="small"></el-input>
          </el-form-item>

            <el-form-item class="width-120">
            <el-select v-model="query.useAgency" placeholder="配备使用单位" size="small">
              <el-option label="基层医疗卫生机构" value="1"></el-option>
              <el-option label="其他医疗机构" value="2"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item class="width-120">
            <el-input v-model="query.createUserName" placeholder="录入人名称" @keyup.enter.native="searchEnterFun"
                      size="small"></el-input>
          </el-form-item>
            <el-form-item>
            <el-date-picker type="date" class="width-130" placeholder="录入开始时间" v-model="query.beginDate" size="small"></el-date-picker>
          </el-form-item>

            <el-form-item>
            <el-date-picker type="date" class="width-130" placeholder="录入结束时间" v-model="query.endDate" size="small"></el-date-picker>
          </el-form-item>

            <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="resetForm" size="small">重置</el-button>
          </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          @selection-change="handleSelectionChange"
          ref="mainTable"
          @sort-change="sortChange"
          :row-key="getRowKeys"
          border
          stripe>
          <el-table-column type="selection" width="50" :reserve-selection="true" align="center"></el-table-column>
          <el-table-column label="地名" show-overflow-tooltip sortable="custom" prop="COUNTRY_ID">
            <template slot-scope="scope">
              <span>{{ scope.row.countryId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公告药品名称" show-overflow-tooltip sortable="custom" prop="BULLETIN_DRUG">
            <template slot-scope="scope">
              <span>{{ scope.row.bulletinDrug }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公告药品剂型" show-overflow-tooltip sortable="custom" prop="BULLETIN_DOSEAGE_NAME">
            <template slot-scope="scope">
              <span>{{ scope.row.bulletinDoseageName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="药品大类" sortable="custom" prop="DRUG_CATEGORY">
            <template slot-scope="scope">
              <span>{{ scope.row.drugCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column label="药品中类" show-overflow-tooltip sortable="custom" prop="MIDDLE_CATEGORY">
            <template slot-scope="scope">
              <span>{{ scope.row.middleCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column label="药品小类" show-overflow-tooltip sortable="custom" prop="SMALL_CATEGORY">
            <template slot-scope="scope">
              <span>{{ scope.row.smallCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <div class="operates"><a class="operation-btn" size="small" @click="goInfo(scope.row.id)">查看</a>
                <a class="operation-btn" @click="goEdit(scope.row.id)" type="text" size="small">修改</a></div>
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
      <div class="foot-btn">
        <div class="foot-left">
          <span class="flo-left">
            <el-button type="success" size="small" @click="goAdd">
              新增
            </el-button>
          </span>
          <span class="flo-left">
            <el-button type="danger" size="small" @click="handleDelete()">
              删除
            </el-button>
          </span>
<!--          <span class="flo-left">
               <el-button type="primary" size="small" @click="handleChange">导入数据</el-button>
          <input type="file" id="uploadFile"
                 @change="getFile($event)" style="display:none;">
          </span>-->
          <span class="flo-left">
            <el-button type="warning" size="small" @click="getTips()">
              导出Excel
            </el-button>
          </span>
          <!--<span class="flo-left">
            <el-button type="primary" size="small" @click="downloadExcel()">
              下载模板
            </el-button>
          </span>-->
        </div>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->

    <el-dialog
      :title="提示"
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

  import {list} from 'src/axios/datacenter/authdata/countrybasedrugs/countryBase'
  import {chnRegions} from 'src/axios/datacenter/authdata/countrybasedrugs/countryBase'
  import {del} from 'src/axios/datacenter/authdata/countrybasedrugs/countryBase'
  import {exportExcel} from 'src/axios/datacenter/authdata/countrybasedrugs/countryBase'
  import {importData} from 'src/axios/datacenter/authdata/countrybasedrugs/countryBase'
  import {downloadExcel} from 'src/axios/datacenter/authdata/countrybasedrugs/countryBase'
  import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item";
  import fileUpload from 'js-file-download'
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElFormItem},
    data () {
      return {
        deleteDataList: [],
        activeName: '1',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        chnRegions: [],
        tipVisible: false
      }
    },

    created () {
      if (!!this.$store.state.pageSeach.pageNum) {
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.list();
    },

    methods: {
      sortChange(value){
        let sortType = " desc";
        if (value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list()
        }
      },

      getRowKeys(row){
        return row.id
      },

      //初始化数据
      list () {
        this.$store.state.pageSeach = this.query;
        list(this.query, this.resData).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1
          }
        });
        chnRegions().then(res => {
          this.chnRegions = res.data;
        })
      },

      handleDelete() {
        if (this.deleteDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else {
          this.$confirm('确定删除选中的' + this.deleteDataList.length + '条数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var ids = [];
            for (var row of this.deleteDataList) {
              ids.push(row.id)
            }
            del(ids.toString()).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$refs.mainTable.clearSelection();
                  this.list()
                }
              })
            })
          }).catch(() => {
          });
        }
      },

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

      searchEnterFun (e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },

      handleSelectionChange(val){
        this.deleteDataList = val;
      },

      resetForm() {
        this.$refs.mainTable.clearSelection();
        this.query = this.metaQuery();
        this.resData = this.metaData();
        this.list();
      },

      goAdd(){
        this.$router.push("/DATA/basedata/authdata/baseDrugs/insertForm");
      },
      goInfo(id){
        this.$router.push("/DATA/basedata/authdata/baseDrugs/tableDetail/" + id);
      },
      goEdit(id){
        this.$router.push("/DATA/basedata/authdata/baseDrugs/updateForm/" + id);
      },

      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData(){
        return {
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

      metaQuery(){ // 表单查询数据初始化
        return {
          searchType: "0",
          searchText: "",
          countryId: "",
          cnWestFlag: "",
          useAgency: "",
          createUserName: "",
          beginDate: undefined,
          endDate: undefined
        }
      },

      // ************************ 分页操作 ************************
      handleSizeChange(val){
        this.resData.pageSize = val;
        this.$store.state.pageSeach.pageSize = val;
        this.list()
      },

      handleCurrentChange(val){
        this.resData.pageNum = val;
        this.$store.state.pageSeach.pageNum = val;
        this.list()
      }
    }
  }
</script>

