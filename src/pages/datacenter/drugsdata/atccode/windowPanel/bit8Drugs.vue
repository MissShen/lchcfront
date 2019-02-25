<template>
  <el-dialog
    :title="'选择关联八位药品'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="search" ref="search"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">

        <el-form-item>
          <el-input v-model="search.searchContent" placeholder="通用名或编码" @keyup.enter.native="searchEnterFun" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
        </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table ref="tableList1"
        :data="resData.list"
        :row-key="getRowkeys"
        @selection-change="handleSelectionChange"
        border
        stripe>
        <el-table-column type="selection" :reserve-selection="true" width="50" align="center"></el-table-column>
        <el-table-column label="药品编码">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通用名" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
      </el-table>
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

    <span slot="footer">
      <el-button size="small" type="primary" @click="choiceData()">保存</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {getDrugs} from 'src/axios/datacenter/basedata/catatccategory/catatclist';
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "bit8-drugs",
    data() {
      return {
        visible: false,
        resData: this.metaData(),
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        choiceList:[],
        search:{
          searchContent:'',
          pharmType:'',
          codeType:'',
          drugIds8:'',
          doseageIds:'',
          atcId:''
        }
      }
    },
    created() {

    },
    methods: {
      metaForm() {
        return {

        }
      },
      metaRule() {
        return {
          menuName: [
            {required: true, message: '菜单名称不能为空', trigger: 'blur'},
            {min: 1, max: 10, message: '菜单名称长度大于1小于10', trigger: 'blur'}
          ],
          shortcutMenuName: [
            {required: true, message: '菜单名称简写不能为空', trigger: 'blur'},
          ],
          menuUrl: [
            {required: true, message: '菜单路径不能为空', trigger: 'blur'},
          ],
        }
      },
      choiceData(){
        this.visible = false
        this.$emit('saveDrugIds8',this.choiceList)
      },
      metaList() {
        this.search.codeType = '8';
        getDrugs(this.search, this.resData).then(res => {
          this.resData = res.data
        })
      },
      searchEnterFun(e){
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.metaList();
        })
      },
      getRowkeys(row){
        return row.id;
      },
      fillData(id) {
        this.dataForm.id = id || undefined;
        this.visible = true;

        this.metaList();

      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = this.dataForm.id ? menuLevelTwoUpdate(this.dataForm) : menuLevelTwoSave(this.dataForm)
            http.then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false;
                  this.$emit('refreshData');
                }
              })
            })
          }
        })
      },
      metaData () {
        return {
            pageNum: 0,
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
            id: undefined,
            code: undefined,
            name: undefined,
            beginDate: undefined,
            endDate: undefined
          }
        }
      },
      //  获取用户分页列表
      list () {
        userList(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.metaList()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.metaList()
      },
      handleSelectionChange(val){
        this.choiceList=val
      }
    }
  }
</script>
