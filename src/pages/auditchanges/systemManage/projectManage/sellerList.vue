<template>
  <el-dialog
    title="配送机构列表"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="80%"
    append-to-body>
    <el-form ref="form" :model="queryForm" label-width="150px" :inline="true" size="small" class="table-form">
        <el-form-item>
          <el-input v-model="queryForm.name" placeholder="企业名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.createCode" placeholder="社会统一信用代码" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.organizeCode" placeholder="组织机构代码" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="select()" size="small">查询</el-button>
          <el-button type="warning" @click="remove()" size="small">重置</el-button>
        </el-form-item>
    </el-form>
    <div class="tableset">
      <el-table :data="resData.list" ref="tableData" border stripe @selection-change="handleSelectionChange" :row-key="getRowKeys">
        <el-table-column type="selection" width="40" :reserve-selection="true" align="center"></el-table-column>
        <el-table-column label="企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <!--<span>{{ scope.row.PROJECT_NAME }}</span>-->
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="社会统一信用代码" show-overflow-tooltip>
          <template slot-scope="scope">
            <!--<span>{{ scope.row.ATTACHED_TYPE==1?'企业':'产品' }}</span>-->
            <span>{{ scope.row.createCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="组织机构代码" show-overflow-tooltip>
          <template slot-scope="scope">
            <!--<span>{{ scope.row.DIC_NAME }}</span>-->
            <span>{{ scope.row.organizeCode }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <div slot="footer">
      <!--<el-button @click="selectAll()">{{resData.total}}条全选</el-button>-->
      <el-button type="primary" @click="selectTabs()">确定</el-button>
      <el-button @click="selectClose()">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import {getAllSender} from 'src/axios/auditchanges/systemManage/orgList'

  export default {
    name: "seller-list",
    data() {
      return {
        queryForm: this.mataQuery(),
        visible: false,
        resData: this.mataData(),
        getRowKeys(row){
          return row.id
        },
        checkArr:[],
        sellId:[]
      }
    },
    props:['sellerId'],
    created(){
      this.sellId = this.sellerId||[];
      this.select();
    },
    methods: {
      //多选框改变状态
      handleSelectionChange(val) {
        const key = this.resData.pageNum;
        this.selectedData = val;
      },
      selectTabs() {
        let selectedDataId =this.selectedData.map(item=>item.id)
        this.$emit('selectedSellerId',selectedDataId);
        this.visible=false;
        console.log(this.selectedData,'this.selectedData')
      },
      selectClose(){//取消
        this.visible=false;
      },
      select() {
        var selectQuery = this.queryForm;
        var resData = this.resData;
        if (resData.pageSize == undefined || resData.pageSize == "") {
          resData.pageSize = 10;
        }
        if (resData.pageNum == undefined || resData.pageNum == "") {
          resData.pageNum = 1;
        }
        getAllSender(resData, selectQuery).then(res => {
          if (res.success) {
            this.resData = res.data;
            console.log(this.resData,'this.resData');
            var _this = this;
            for(let i=0; i<res.data.list.length; i++){
              // console.log(this.sellerId,'this.sellerId')
              // console.log(this.resData.list,'this.resData.list')
              var x = _this.sellId.some(item=>item==res.data.list[i].id);
              if(x){
                _this.checkArr.push(i);
                // console.log(_this.checkArr,'_this.checkArr')
              }else{
                console.log(i,'_i')
              }
            }
            // console.log(_this.resData.list,'_this.resData.list')
            // console.log(_this.checkArr,'_this.checkArr')
            for(let i=0; i<_this.checkArr.length; i++){
              this.$refs.tableData.toggleRowSelection(this.resData.list[_this.checkArr[i]],true);
            }
            if (this.resData.pageNum === 0) {
              this.resData.pageNum = 1
            }
          }
        });
      },
      mataQuery() {
        return {}
      },
      openView() {
        this.visible = true
      },
      mataData() {
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
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.checkArr=[];
        this.select()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.checkArr=[];
        this.select()
      },
      //全选
      selectAll(){
        // getAllBuyer(resData, selectQuery).then(res => {
        //  if(res.success){
        //    console.log("成功")
        //  }else{
        //    console.log("失败")
        //  }
        // });
      },
      remove(){//重置
        this.queryForm = {
          name:'',
          createCode:'',
          organizeCode:''
        };
        this.select()
      },
    }
  }
</script>
