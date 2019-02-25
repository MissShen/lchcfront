<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input v-model="query.name" size="small" maxlength="200" placeholder="主体名称" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
              <el-button type="warning" size="small" @click="reset()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @selection-change="handleSelectionChange"
          @sort-change="sortChangeOne"
        >
          <el-table-column label="采购主体" prop="name" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属医院数量" prop="strive_Hos" sortable="custom" align="right" header-align="left" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.striveHos }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <a class="operation-btn" type="text" size="small" @click="addOrUpdateBargainBody('update',scope.row)">修改</a>
              <a class="operation-btn" type="text" size="small" @click="maintainHosFun(scope.row.id)">维护医院</a>
              <a class="operation-btn" type="text" size="small" @click="deleteBargainingBodyForOne(scope.row)">删除</a>
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
          <span><el-button type="success" size="small"  @click="addOrUpdateBargainBody('add','')">新增</el-button></span>
        </div>
        <!--批量删除涉及到判断主体下的维护医院数量，暂时屏蔽此功能-->
        <!-- <a class="operation-btn" type="warning" @click="deleteBatchBargainingBody()">批量删除</a>-->
      </div>

      <!--====================1.新增/修改议价主体弹框=====================-->
      <el-dialog :title="insertOrUpdateFlag == 'update' ? '修改议价主体' : '增加议价主体' " :visible.sync="showBargainBody" :before-close="closeBargainingBody" width="45%">
        <el-form :inline="true" ref="insertForm" :model="insertForm" class="demo-form-inline">
          <div class="formrow">
            <el-alert title="如果医院自主议价，不需要创建主体" type="success" :closable="false"></el-alert>
          <span style="width:60%;margin-top:10px;">
            <el-input style="width:68%" size="small" v-model="insertForm.name" maxlength="200" placeholder="主体名称"></el-input>
          </span>
          </div>
        </el-form>
        <span slot="footer">
          <el-button size="small" type="primary" @click="insertOrUpdateBargainingBody()">保存</el-button>
          <el-button size="small"  @click="closeBargainingBody()">关闭</el-button>
        </span>

      </el-dialog>

    <!-- =========================2.维护主体医院弹框===============================-->
      <el-dialog title="维护医院" :visible.sync="showMaintainHos" :before-close="closeMaintainHos" width="60%">
        <el-form :inline="true" ref="tab" :model="tab" class="table-form" size="small">
          <el-form-item>
            <el-input size="small" placeholder="医院名称" maxlength="200" v-model="tab.hosName" @keyup.enter.native="searchEnterFunViewOne"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button  size="small" type="success" @click="searchEnterFunViewOne">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="tab-box tabs-left">
          <el-tabs v-model="tab.tabChoose">
            <!--第一个pane-->
            <el-tab-pane label="可选医院" name="canChoose">
              <el-table
                :data="canChooseData.list"
                style="width: 100%;"
                max-height="200"
                border
                stripe
                @selection-change = "canChooseSelectionChange"
                @sort-change="sortChangeTwo"
              >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="医院名称" prop="hosName" sortable="custom">
                  <template slot-scope="scope">
                    <span>{{scope.row.hosName}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                  <template slot-scope="scope">
                    <a class="operation-btn" type="text" size="small" @click="insertChooseForOne(scope.row)">选择</a>
                  </template>
                </el-table-column>
              </el-table>

              <!-- 表格分页 -->
              <div class="pagebox">
                <el-pagination
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="canChooseHandleSizeChange"
                  @current-change="canChooseHandleCurrentChange"
                  :page-sizes="[10, 20, 30]"
                  :total="canChooseData.total"
                  :page-size="canChooseData.pageSize"
                  :page-count="canChooseData.pages"
                  :current-page.sync="canChooseData.pageNum">
                </el-pagination>
              </div>
               <div style="text-align: right">
                <el-button size="small" @click="insertChooseForMore">批量选择</el-button>
              </div>
            </el-tab-pane>

              <!--第二个pane-->
            <el-tab-pane label="已选医院" name="readChoos">
              <el-table
                :data="readChooseData.list"
                style="width:100%;"
                max-height="200"
                border
                stripe
                @selection-change = "readChooseSelectionChange"
                @sort-change="sortChangeThree"
              >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="hosName" sortable="custom" label="医院名称">
                  <template slot-scope="scope">
                    <span>{{scope.row.hosName}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                  <template slot-scope="scope">
                    <a class="operation-btn" type="text" size="small" @click="deleteChooseForOne(scope.row)">移除</a>
                  </template>
                </el-table-column>
              </el-table>

              <!-- 表格分页 -->
              <div class="pagebox">
                <el-pagination
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="readChooseHandleSizeChange"
                  @current-change="readChooseHandleCurrentChange"
                  :page-sizes="[10, 20, 30]"
                  :total="readChooseData.total"
                  :page-size="readChooseData.pageSize"
                  :page-count="readChooseData.pages"
                  :current-page.sync="readChooseData.pageNum">
                </el-pagination>
              </div>
              <div style="text-align: right">
                <el-button size="small"  @click="deleteChooseForMore">批量移除</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryBargainingBodyList,deleteBatchBargainingBodyHttp,canChooseHttp,readChooseHttp,deleteChooseHttp,insertBargainingBodyHttp,updateBargainingBodyHttp,insertChooseHttp} from 'src/axios/contract/bargainmanagement/creatBargainingBodyType'
  import { keyBoardEnter } from "src/utils"

  export default {
    data () {
      return {
        currentOrder:undefined, //分页的时候缓存
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        checked: true,
        showBargainBody:false,//新增 弹框状态
        showMaintainHos:false,//维护主体医院 弹框状态
        insertForm:{name:"",id:""},//新增值
        insertOrUpdateFlag:"",//弹出框是保存还是修改的标识
        multipleSelection:"",//母页面多选框选择状态

        //以下为弹出框的状态信息
        objId:"",//当前弹框的主体的id
        tab:{tabChoose:"canChoose",hosName:""},//弹出框面板查询信息
        canChooseData:this.metaData(),//可选择医院数据
        canChooseMultipleSelection:[],//可选择医院多选框选择状态
        readChooseData:this.metaData(),//已选择医院的数据
        readChooseMultipleSelection:[],//已选择医院多选框选择状态
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
            orderBy: undefined,
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
            list: [],
            sources : [{
              label : '全部',
              value : ''
            },{
              label : 'source1',
              value : '1'
            },{
              label : 'source2',
              value : '2'
            }]
        }
      },
        metaQuery () { // 表单查询数据初始化
        return {
          query: {
            name : "",
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        queryBargainingBodyList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0){
            this.resData.pageNum =1;
          }
        })
      },
      //-------------0.关闭按钮
      closeBargainingBody(){
        this.showBargainBody = false;
      },
      closeMaintainHos(){
        this.showMaintainHos = false;
      },
      //-------------1.新增议价主体操作  弹出框
      addOrUpdateBargainBody(type,row){
        // 如果type是add那么就是增加操作 update是修改操作
        if(type == 'add'){
          //新增之前把上一次的状态清空
          this.insertForm.name = "";
          //更改状态为添加
          this.insertOrUpdateFlag = "add";
        }else{
          //修改把名字回显 记录弹出框的id
          this.insertForm = {name:row.name,id:row.id};
          //更改状态为修改
          this.insertOrUpdateFlag = "update";
        }
        this.showBargainBody = true;
      },
      //--------------2.修改/增加总保存
      insertOrUpdateBargainingBody(){
        if(this.insertForm.name.trim() === null || this.insertForm.name.trim() === ''){
          this.$message({
            message: '议价主体名称不能为空！',
            type: 'warning'
          });
        }else{
          if(this.insertOrUpdateFlag == 'add'){
            this.insertBargainingBody();
          }
          if(this.insertOrUpdateFlag =='update'){
            this.updateBargainingBody();
          }
        }
      },
      //----------------  2.1新增保存
      insertBargainingBody(){
        insertBargainingBodyHttp(this.insertForm.name).then(res =>{
          if(res.data>0){
            this.showBargainBody = false;
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.list();
          }else if(res.data <0){
            this.$message({
              message: '主体名重复，请更换名字',
              type: 'warning'
            });
          }else{
            this.$message({
              message: '系统错误',
              type: 'error'
            });
          }
        });

      },
      //---------------   2.2修改保存
      updateBargainingBody(){

        updateBargainingBodyHttp(this.insertForm.name,this.insertForm.id).then(res =>{
          if(res.data>0){
            this.showBargainBody = false;
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.list();
          }else if(res.data <0){
            this.$message({
              message: '主体名重复，请更换名字',
              type: 'error'
            });
          }else{
            this.$message({
              message: '系统错误',
              type: 'error'
            });
          }
        });
      },
      //-----------3.多选框改变状态
      handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection = val;
      },
      //-----------4.删除
      //              4.1 议价主体单个删除
      deleteBargainingBodyForOne(row){
        this.$confirm(`确定删除议价主体?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          ids.push(row.id);
          this.deleteBargainingBody(ids);
        }).catch(()=>{})
      },
      //               4.2 议价主体批量删除
      deleteBatchBargainingBody(){
        let ids = [];
        this.multipleSelection.map(function(item) {
            ids.push(item.id);
        });

        //如果当前选择数据都未加入到了目录那么就return 不使他提交
        if(ids.length==0){
          this.$message({
            message: '请选择要删除的条目',
            type: 'warning'
          });
          return;
        }
        this.deleteBargainingBody(ids);
      },
      //               4.3 删除议价主体执行者
      deleteBargainingBody(ids){
        deleteBatchBargainingBodyHttp(ids).then(res=>{
          if(res.data>0){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.list();
          }else if(res.data == -2){
            this.$message({
              message: '该主体下有维护医院，不能删除',
              type: 'warning'
            });
          }else{
            this.$message({
              message: '该主体下有维护医院，不能删除',
              type: 'error'
            });
          }
        })
      },



      //1.维护主体医院弹窗
      maintainHosFun(objId){
        //默认弹出显示可选医院
        this.tab.tabChoose = "canChoose";
        //二话不说,先给弹出框一个名分(当前主体的id)
        this.objId = objId;
        //改变状态使弹框
        this.showMaintainHos = true;
        //可选医院请求数据
        this.canChooseHttpFun();
        this.readChooseHttpFun();
      },
      //2.查询时候调用此函数 对可选医院，已选医院都进行查询
      queryHttp(){
        this.canChooseHttpFun();
        this.readChooseHttpFun();
      },
          //2.1可选医院请求数据
          canChooseHttpFun(){
            this.canChooseData.orderBy = this.currentOrder;
              canChooseHttp(this.objId,this.tab,this.canChooseData).then(res => {
                this.canChooseData = res.data;
                if(this.canChooseData.pageNum === 0){
                  this.canChooseData.pageNum =1;
                }
              })
        },
          //2.2已选医院请求数据
          readChooseHttpFun(){
            this.canChooseData.orderBy = this.currentOrder;
            readChooseHttp(this.objId,this.tab,this.readChooseData).then(res => {
              this.readChooseData = res.data;
              if(this.readChooseData.pageNum === 0){
                this.readChooseData.pageNum =1;
              }
            })
      },
      //3.弹出框多选框操作
          //3.1可选医院多选框操作
          canChooseSelectionChange(val){
            this.canChooseMultipleSelection = val;
          },
        //3.2已选医院多选框操作
          readChooseSelectionChange(val){
            this.readChooseMultipleSelection = val;
          },
      //4.添加医院
          //4.1添加一个医院
        insertChooseForOne(row){
          let hosIds = [];
          for(let i=0;i<row.length;i++){
            hosIds.push(row[i].hosId)
          }
          this.insertChoose(this.objId,row.hosId)
        },
            //4.2添加多个医院
          insertChooseForMore(){
            if(this.canChooseMultipleSelection.length == 0){
              this.$message({
                message: '请选择需要加入的医院',
                type: 'warning'
              });
              return;
            }
            let hosIds = [];
            this.canChooseMultipleSelection.map(function (item) {
              hosIds.push(item.hosId);
            })
            this.insertChoose(this.objId,hosIds);
          },
           //4.3添加执行者
        insertChoose(objId,hosId){
          insertChooseHttp(objId,hosId).then(res=>{
            if(res.data>0){
              this.$message({
                message: '加入成功',
                type: 'success'
              });
              this.queryHttp();
              this.list();
            }
          })
      },
      //5.删除医院
          //5.1删除一个医院
          deleteChooseForOne(row){
            let ids = [];
            ids.push(row.id);
            this.deleteChoose(ids);
           /* row.map(function(item){
              ids.push(item.id);
            })*/

          },
          //5.2删除多个医院
          deleteChooseForMore(){
            if(this.readChooseMultipleSelection.length == 0){
              this.$message({
                message: '请选择需要移除的医院',
                type: 'warning'
              });
              return;
            }
            let ids = [];
            this.readChooseMultipleSelection.map(function (item) {
              ids.push(item.id);
            })
            this.deleteChoose(ids);
          },
          //5.3删除执行者
          deleteChoose(ids){
              deleteChooseHttp(ids)
                .then(res => {
                  if(res.data>0){
                    this.$message({
                      message: '移除成功',
                      type: 'success'
                    });
                    this.queryHttp();
                    this.list();
                  }
                });
      },
      reset(){
        this.query = this.metaQuery();
        this.list();
      },

      handleGoAdd (id) {
        this.$router.push("/contract/datamanagement/hospitalDeliveryAddress/" + id);
      },
      deleteAddress(id) {
        this.$confirm(`您删除收货地址的同时，之前的产品配送关系可能失效，是否确认删除？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteHospitalAddress(id).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list();
              }
            })
          })
        })
      },
      updateAddress(id) {
        this.$router.push("/contract/datamanagement/hospitalDeliveryAddress/" + id);
      },
      sortChangeOne(value){
        this.sortChangeCommon(value);
        this.list();
      },
      sortChangeTwo(value){
        this.sortChangeCommon(value);
        this.canChooseHttpFun();
      },
      sortChangeThree(value){
        this.sortChangeCommon(value);
        this.readChooseHttpFun();
      },
      sortChangeCommon(value){
        console.log("value: ", value);
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
      },

      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      //可选择的分页
      canChooseHandleSizeChange (val) {
        this.canChooseData.pageSize = val
        this.canChooseHttpFun()
      },
      canChooseHandleCurrentChange (val) {
        this.canChooseData.pageNum = val
        this.canChooseHttpFun()
      },
      //已选择分页
      readChooseHandleSizeChange (val) {
        this.readChooseData.pageSize = val
        this.readChooseHttpFun()
      },
      readChooseHandleCurrentChange (val) {
        this.readChooseData.pageNum = val
        this.readChooseHttpFun()
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      },
      searchEnterFunViewOne(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.queryHttp();
        })
      },
    }
  }
</script>

