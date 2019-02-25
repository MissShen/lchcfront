<template>
  <el-dialog
    :title="'相关产品信息'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">
        <el-form-item>
          <el-input placeholder="通用名" v-model="dataForm.nameChn" @keyup.enter.native="searchEnterFun" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="剂型" v-model="dataForm.doseageName" @keyup.enter.native="searchEnterFun" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="resetForm" size="small">重置</el-button>
        </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        @selection-change="handleSelectionChange"
        border
        :row-key="getRowkeys"
        stripe>
        <el-table-column width="50" type="selection" :reserve-selection="true" align="center"></el-table-column>
        <el-table-column label="通用名" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商用名" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.tradeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.doseageName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.spec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.orgName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包装材质" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.wrapDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产企业" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.orgAbbr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否作废" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.enableFlag == '1'?'否':'是' }}</span>
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
      <el-button size="small" type="primary" @click="choiceData()" v-if="this.type == '0'">关联</el-button>
      <el-button size="small" type="primary" @click="choiceData()" v-else>取消关联</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {getPros} from 'src/axios/datacenter/authdata/protecteddrug/protecteddrug';
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "assoProductInfo",
    props: {
      type:'',
      orgCode:'',
      productId:''
    },
    data() {
      return {
        visible: false,
        choiceList: [],
        resData: this.metaData(),
        dataForm: this.metaQuery()
      }
    },
    created(){
      this.resData.pageSize = 10;
    },
    methods: {
      fillData(type, data) {
        this.visible = true;
        this.list();
      },
      getRowkeys(row){
        return row.productId;
      },
      searchEnterFun(e) {
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      list(){
        if(this.type == '0'){
          this.dataForm.searchType = '1';
          this.dataForm.orgCode = this.orgCode;
          this.dataForm.productId = '';
        }else{
          this.dataForm.orgCode = '';
          this.dataForm.searchType = '2';
          this.dataForm.productId = this.productId;
        }
        getPros(this.dataForm, this.resData).then(res => {
          this.resData = res.data
          console.log(res.data,'res-data')
        })
      },
      //最终选择的数据
      handleSelectionChange(val){
        this.choiceList = val
      },
      //选中数据同步到父页面
      messageMethod() {

      },
      resetForm() {
        this.dataForm = this.metaQuery();
        this.list();
      },
      metaData () {
        return {// 前后台交互数据封装格式
          pageNum: 0,
          pageSize: 20,
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
          searchType:'',
          nameChn:'',
          doseageName:'',
          orgCode:'',
          productId:''
        }
      },
      choiceData(){
        this.visible = false
        this.$emit('saveProIds',this.choiceList)

      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val;
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val;
        this.list()
      }
    }
  }
</script>
