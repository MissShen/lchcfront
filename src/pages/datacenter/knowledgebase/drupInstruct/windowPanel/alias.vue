<template>
  <el-dialog
    :title="'选择通用名称'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">

        <el-form-item>
          <el-input v-model="dataForm.searchNameOrCode" placeholder="通用名称或编码" size="small" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dataForm.catOrg.code" placeholder="企业编码" size="small" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="resetForm" size="small">重置</el-button>
        </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        @sort-change="sortChangeFunc"
        border
        stripe>
        <el-table-column width="50" align="center">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row.catProduct.id" :value="scope.row"
                      :title="scope.row.catProduct.id" @change="changeHandler(scope.row)">{{ null}}
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" prop="general_name" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catDrug.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" prop="SPEC" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catDrug.spec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" prop="doseage_name" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catDoseageForm.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" prop="factory_name" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.catOrg.name }}</span>
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

    <span slot="footer">
      <el-button size="small" type="primary" @click="buttonForm()">选择</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {aliasData} from 'src/axios/datacenter/basedata/manual/manual'
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "alias",
    props: {
      selectedObj: {
        type: Object
      }
    },
    data() {
      return {
        visible: false,
        resData: this.metaData(),
        dataForm: this.metaForm(),
        radio: undefined,
        radioVal: undefined
      }
    },
    created () {
      this.list()
    },
    methods: {
      metaForm() {
        return {
          catOrg: {code: ''},
          id: '',
          searchNameOrCode: '',
          orderBy:undefined
        }
      },
      resetForm() {
        this.dataForm = this.metaForm();
        this.radio = undefined;
        this.selectedObj = undefined;
        this.list();
      },

      //  排序查询
      sortChangeFunc(value){
        let sortType=" desc"
        if(value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.dataForm.orderBy = value.prop + sortType;
          this.list();
        }
      },

      //由父页面进入，ID为当前选择项，故会过滤掉。
      initWindow(id){
        this.id = id;
        this.visible = true;
        this.list();
      },
      //  回车查询
      searchEnterFun(e){
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          if(this.dataForm.searchNameOrCode || this.dataForm.catOrg.code){
            this.list();
          }
        })
      },
      list() {
        aliasData(this.dataForm, this.id, this.resData).then(res => {
          this.resData = res.data;
          for(var i=0;i<this.resData.list.length;i++){
            if(this.radio == this.resData.list[i].catProduct.id){
              this.selectedObj = this.resData.list[i];
            }
          }
        })
      },
      metaData () {
        return {// 前后台交互数据封装格式
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
          lastPage: 0
        }
      },

      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      },
      changeHandler(value) {
        this.selectedObj = value;
      },
      buttonForm() {
        if (this.selectedObj == undefined) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        }
        this.$confirm('确定将选择的产品设置为通用名称?', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '重选',
          type: 'warning'
        }).then(() => {
          this.visible = false;
          this.$emit('buttonForm', {value: this.selectedObj})
        })
      }
    }
  }
</script>
