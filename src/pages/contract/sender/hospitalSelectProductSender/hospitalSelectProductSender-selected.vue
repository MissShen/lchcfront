<template>
  <!--<el-dialog
    title="可选配送"
    :close-on-click-modal="false"
    :visible.sync="visible" width="80%">-->
  <!-- 表格 -->
  <div class="padding10">
      <el-form ref="query" :model="query" :inline="true" class="table-form">
          <el-form-item class="width-120">
            <el-input v-model="query.senderName"
                      maxlength="200" placeholder="配送企业名称" size="small" @keyup.enter.native="searchEnterFun"></el-input>
          </el-form-item>
          <el-form-item class="width-120">
              <el-select v-model="query.complainedCount" placeholder="不良记录" size="small">
                <el-option-group
                  key="不良记录"
                  label="不良记录">
                  <el-option
                    v-for="item in records"
                    :key="item.record"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          <el-form-item class="width-120">
              <el-select v-model="query.serviceState" placeholder="配送评价" size="small">
                <el-option-group
                  key="配送评价"
                  label="配送评价">
                  <el-option
                    v-for="item in serviceStates"
                    :key="item.serviceState"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
          </el-form-item>
      </el-form>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table ref="multipleTable"
                :data="resData.list"
                tooltip-effect="dark"
                style="width: 100%"
                border
                stripe
                @selection-change="handleSelectionChange"
                @sort-change="sortChange">
        <el-table-column label="首选配送" prop="senderId" sortable width="80" align="center">
          <template slot-scope="scope">
            <el-radio :label="scope.row.senderId" v-model="radio" @change="changeHandler(scope.$index)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column type="selection" :label="tableName" width="40" align="center" :selectable="selectable"></el-table-column>
        <!--<el-table-column label="选择配送">
          <template slot-scope="scope">
            <span>{{ scope.row.selectId }}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="合同已选" prop="contractId" sortable="custom" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.contractId != null ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="配送企业" prop="senderName" sortable="custom" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.senderName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="不良记录" prop="COMPLAINED_COUNT" sortable="custom" width="120">
          <template slot-scope="scope">
            <a @click="complainedTable(scope.row.senderId)" v-if="scope.row.complainedCount >0&&scope.row.complainedCount != null && scope.row.complainedCount != ''">{{ scope.row.complainedCount }}</a>
            <span v-if="scope.row.complainedCount == 0||scope.row.complainedCount == null || scope.row.complainedCount == ''">无不良记录</span>
          </template>
        </el-table-column>
        <el-table-column label="配送评价" prop="SERVICESTATE" sortable="custom" width="120">
          <template slot-scope="scope">
              <span>
                <el-rate
                  v-model= scope.row.serviceState disabled>
                </el-rate>
              </span>
          </template>
        </el-table-column>
        <el-table-column label="两票制" prop="twoVoteId" sortable="custom" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.twoVoteId != null">已签订</span>
            <span v-else style="color: #FF0000">未签订</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" prop="LINK_PHONE" sortable="custom" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.linkPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <div class="operates">
              <a size="small" @click="deleteSender(scope.row.senderId,scope.row.conState)">删除</a>
              <a v-if="scope.row.firstSender == '1'" class="operation-btn" size="small" @click="cancelFirstSender(scope.row.shsId)">取消首选</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagebox">
        <div class="flo-left">
          <el-button type="primary" size="small" @click="addEnterprise()">保存</el-button>
        </div>
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
      <!--<div slot="footer" align="right" class="dialog-footer">-->
        <!--<el-button @click="closeDialog()" size="small">关闭</el-button>-->
      <!--</div>-->
    </div>

  </div>
  <!--</el-dialog>-->
</template>
<script>

  // 引入用户相关请求
  import { querySelectedSenderList, deleteSender, cancelFirstSender, updateSenderForProduct } from 'src/axios/contract/sender/hospitalSelectProductSender'
  import { keyBoardEnter } from "src/utils"

  export default {
    props: {
      productId: {
        type: String,
        required: true
      },
      dealPrice: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        currentOrder: undefined,
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        dataForm: this.metaForm(),
        radio: '',
        deleteDataList: [],
        forbidden: false,
        tableName: '选择配送',
        serviceStates:[
          {label:"全部",value:""},
          {label:"一星",value:"1"},
          {label:"二星",value:"2"},
          {label:"三星",value:"3"},
          {label:"四星",value:"4"},
          {label:"五星",value:"5"}
        ],
        records: [
          {
            value: "",
            label: "全部"
          },
          {
            value: "1",
            label: "是"
          }, {
            value: "0",
            label: "否"
          }
        ],
        allSenderIds: [],
        selectSenderIds: [],
        unSelectSenderIds: [],
        changeSelectSenderIds: [],
        changeUnSelectSenderIds: [],
        finalSelectSenderIds: [],
        finalUnSelectSenderIds: []

      }
    },
    created() {
      this.list3();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          orderBy: undefined,
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
          list: []
        }
      },
      metaForm() { // 表单数据初始化
        return {
          senderName: undefined,
          serviceState:undefined
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          senderName: undefined,
          serviceState: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list3() {
        this.resData.orderBy = this.currentOrder;
        querySelectedSenderList(this.resData, this.query, this.productId).then(res => {
          this.allSenderIds = [];
          this.selectSenderIds = [];
          this.unSelectSenderIds = [];
          var _selectSenderIds = [];
          var _unSelectSenderIds = [];
          for (var i=0; i<res.data.list.length; i++){
            if(res.data.list[i].firstSender != null && res.data.list[i].firstSender != ''){
              this.radio = res.data.list[i].senderId;
            }
            this.allSenderIds.push(res.data.list[i].senderId);
            if(res.data.list[i].shsId != null && res.data.list[i].shsId != ''){
              _selectSenderIds.push(res.data.list[i].senderId);
            }else{
              _unSelectSenderIds.push(res.data.list[i].senderId);
            }
          }
          this.selectSenderIds = _selectSenderIds;
          this.unSelectSenderIds = _unSelectSenderIds;
          this.changeSelectSenderIds = _selectSenderIds;
          this.changeUnSelectSenderIds = _unSelectSenderIds;
          this.resData = res.data
          this.defaultSelected();
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
      },
      defaultSelected(){
        this.resData.list.forEach(item =>{
          if(item.shsId){
            console.log(item.shsId);
            this.$refs.multipleTable.toggleRowSelection(item, true);
          }
        })
      },
      // 重置用户表单
      resetForm() {
        this.radio = '';
        this.query = this.metaQuery()
        this.allSenderIds = [];
        this.selectSenderIds = [];
        this.unSelectSenderIds = [];
        this.list3();
      },
      judgeContract(conState){
        if(conState == ''||conState == 0 || conState == 10 || conState == 60 || conState == 70 || conState == 80 || conState == 90){
          return false;
        }
        if(conState == 20 || conState == 40 || conState == 41 || conState == 42 || conState == 50 || conState == 51 || conState == 52 || conState == 62){
          return true;
        }
        return false;
      },
      //  删除已选配送关系
      deleteSender(senderId,conState) {
        let judgeContractState =  this.judgeContract(conState);
        this.$confirm(judgeContractState?'贵医院与该配送已签订合同，如若删除该配送，会删除交易目录该产品的配送关系，请谨慎操作，确定删除？':'是否确认删除产品与该配送的关系？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSender(senderId,this.productId).then(res => {
            this.$message({
              message: res.success == true ? res.data : "删除失败",
              type: res.success == true ? "success" : "error",
              onClose: ()=>{
                this.list3();
                //调用父组件的方法，通过父组件通知 已选配送企业 请求url 刷新页面
                this.fatherMathod();
              }
            })
          });
        }).catch(()=>{});
      },
      cancelFirstSender(shsId){
        this.$confirm('确认取消首选配送？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          cancelFirstSender(shsId).then(res => {
            this.$message({
              message: res.success == true ? res.data : "取消失败",
              type: res.success == true ? "success" : "error",
              onClose: ()=>{
                this.list3();
              }
            })
          })
        }).catch(()=>{});
      },
      changeHandler(value) {
          this.$refs.multipleTable.toggleRowSelection(this.resData.list[value], true)
      },
      handleSelectionChange(val) {
        this.deleteDataList = val;
        var _selectSenderIds = [];
        var _unSelectSenderIds = [];

        for (var i=0; i<val.length; i++){
          _selectSenderIds.push(val[i].senderId);
        }

        for (var i=0; i<this.allSenderIds.length; i++){
          var isExist = false;
          for(var j = 0; j < val.length; j++){
            if(this.allSenderIds[i] == val[j].senderId){
              isExist = true;
              break;
            }
          }
          if(!isExist){
            _unSelectSenderIds.push(this.allSenderIds[i]);
          }
        }
        this.changeSelectSenderIds = _selectSenderIds;
        this.changeUnSelectSenderIds = _unSelectSenderIds;
      },
      selectable(row, index) {
        if (row.senderId === this.radio) {
          return false
        } else {
          return true
        }
      },
      addEnterprise() {
        let arr = this.deleteDataList.map(data => {
          return data.senderId
        })
        var _finalSelectSenderIds = [];
        var _finalUnSelectSenderIds = [];
        this.finalSelectSenderIds = [];
        this.finalUnSelectSenderIds = [];
        for (var i = 0; i < this.changeSelectSenderIds.length; i++){
          var isExist = false;
          for(var j = 0; j < this.selectSenderIds.length; j++){
            if(this.changeSelectSenderIds[i] == this.selectSenderIds[j]){
              isExist = true;
              break;
            }
          }
          if(!isExist){
            _finalSelectSenderIds.push(this.changeSelectSenderIds[i]);
          }
        }
        for (var i = 0; i < this.changeUnSelectSenderIds.length; i++){
          var isExist = false;
          for(var j = 0; j < this.unSelectSenderIds.length; j++){
            if(this.changeUnSelectSenderIds[i] == this.unSelectSenderIds[j]){
              isExist = true;
              break;
            }
          }
          if(!isExist){
            _finalUnSelectSenderIds.push(this.changeUnSelectSenderIds[i]);
          }
        }
        this.finalSelectSenderIds = _finalSelectSenderIds;
        this.finalUnSelectSenderIds = _finalUnSelectSenderIds;
        if((this.finalSelectSenderIds == null || this.finalSelectSenderIds.length == 0) && (this.finalUnSelectSenderIds == null || this.finalUnSelectSenderIds.length == 0)) {
          this.$message({
            message: "当前没有需要更新的数据！",
            type: 'warning'
          });
          return;
        }
        updateSenderForProduct(this.productId, this.radio, this.finalSelectSenderIds.join(',').toString(), this.finalUnSelectSenderIds.join(',').toString(), this.dealPrice).then(res => {
          if(res.message == "SUCCESS"){
            this.$message({
              message: "保存成功",
              type: 'success'
            })

            this.list3();
            //调用父组件的方法，通过父组件通知 已选配送企业 请求url 刷新页面
            this.fatherMathod();
          }
        })
      },

      //调用父组件的函数
      fatherMathod(){
        this.$emit("refreshbizlines_unselected","");
      },
      //父组件用来控制当前组件刷新的函数
      refreshList(){
        this.radio = '';
        this.list3()
      },
      closeDialog(){
        this.$emit("closeDialog");
      },

      //调用父页面的方法 去让他显示dialog
      complainedTable(senderId){
        this.$emit("showComplainedTable_unselected",{senderId:senderId});
      },
      // ************************
      handleSizeChange(val) {
        this.radio = '';
        this.resData.pageSize = val
        this.list3()
      },
      handleCurrentChange(val) {
        this.radio = '';
        this.resData.pageNum = val
        this.list3()
      },
      sortChange(value){
        this.radio = '';
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
        this.list3();
      },
      searchEnterFun(e){
        this.radio = '';
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list3();
        })
      }
    }
  }
</script>
