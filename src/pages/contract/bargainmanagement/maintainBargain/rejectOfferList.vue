<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input size="small" v-model="query.productName" maxlength="200" placeholder="产品名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="success" @click="list()">查询</el-button>
              <el-button size="small" type="warning" @click="reset()">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChange">
          <el-table-column label="通用名" prop="nameChn" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.nameChn }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名" width="130">
            <template slot-scope="scope">
              <div class="ellipsis es150">{{ scope.row.productName }}</div>
              <div class="ellipsis es150">(商品名：{{ scope.row.tradeName }})</div>
            </template>
          </el-table-column>
          <el-table-column label="产品信息" width="140">
            <template slot-scope="scope">
              <div class="pro-details ellipsis es200"
                   :title="scope.row.spec+'×'+scope.row.standRate+scope.row.smallestUnits+'/'+scope.row.specUnit+'('+scope.row.wrapName+')'+'('+scope.row.doseageFormName+')'">
                {{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} ({{scope.row.wrapName}}) ({{ scope.row.doseageFormName }})
              </div>
              <div class="pro-details ellipsis es200" :title="scope.row.manufactureName">{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="目录范围" prop="catalogArea" sortable="custom" width="135" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.catalogArea}}</span>
            </template>
          </el-table-column>
          <el-table-column label="基药标记" prop="basicFlag" sortable="custom" width="90" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.basicFlag==0?"非基药":(scope.row.basicFlag==1?"国家基药":"北京增补")}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最低价" prop="minPrice" sortable="custom" width="80" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.minPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业报价" prop="bidPrice" sortable="custom" width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.bidPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="报价状态" prop="confirmFlag" sortable="custom" width="90" align="right" header-align="left">
            <template slot-scope="scope">
              <span>{{scope.row.confirmFlag==1?"已确认":( scope.row.bidFlag==0?(scope.row.dateComp>0?"已过期":"未报价"):"已报价")}}</span>
            </template>
          </el-table-column>
          <el-table-column label="拒报备注" prop="bidFlag" sortable="custom" width="90" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.bidFlag}}</span>
            </template>
          </el-table-column>
          <el-table-column label="议价开始" prop="startDate" sortable="custom" :show-overflow-tooltip="true" width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.startDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="议价结束" prop="endDate" sortable="custom" :show-overflow-tooltip="true" width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.endDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a class="operation-btn" type="text" @click="deleteBargain(scope.row.id)"  size="small">删除</a>
              <a class="operation-btn" type="text" @click="showRenewBargainFun(scope.row.id,scope.row.startDate,scope.row.endDate)"  size="small">重新议价</a>
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

      <!--  ====================================== 弹窗 ====================================== -->
      <el-dialog title="重新议价" :visible.sync="showRenewBargain" :before-close="closeRenewBargain" width="60%">
        <el-form :inline="true" ref="bargainTimeForm" :model="bargainTimeForm" class="demo-form-inline">
          <div class="formrow" style="width:80%">
            <span style="width:80%">
              <!--<el-input v-model="bargainTimeForm.startTime" placeholder="开始时间"></el-input>
              <el-input v-model="bargainTimeForm.endTime" placeholder="结束时间"></el-input>-->
               <el-date-picker
                 unlink-panels = "true"
                 v-model="bargainTimeForm.time"
                 type="daterange"
                 range-separator="至"
                 start-placeholder="设定开始日期"
                 end-placeholder="设定结束日期">
            </el-date-picker>
            </span>
            <span style="color: red;display: block">
              *设置议价时间默认开始时间24点整，结束时间23点59分59秒
            </span>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeRenewBargain()">关闭</el-button>
          <el-button type="primary" @click="updateRenewBargain()">保存</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {queryMaintainBargainListHttp,updateRenewBargain,deleteBargainHttp} from 'src/axios/contract/bargainmanagement/maintainBargainList'

  export default {
    data () {
      return {
        currentOrder:undefined, //分页的时候缓存
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showRenewBargain:false,//设置议价时间弹出框
        bargainTimeForm:{
          time:[],
        },
        renewId:""
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
            list: []
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            productName : undefined,
            sources : '2'
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        this.resData.orderBy = this.currentOrder;
        this.query.sources = 2;
        queryMaintainBargainListHttp(this.resData, this.query).then(res => {
          console.log(res)
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum =1;
          }
        })
      },
      //设定议价时间弹框
      showRenewBargainFun(id,startDate,endDate){
        //每次弹出对之前存的时间状态清空，不然不符合规则，显示不出来
        this.bargainTimeForm.time = [];
        this.bargainTimeForm.time.push(startDate);
        this.bargainTimeForm.time.push(endDate);
        this.renewId = id;
        this.showRenewBargain = true;
      },
      //关闭设定议价弹框
      closeRenewBargain(){
        this.showRenewBargain = false;
      },
      //保存设定议价时间
      updateRenewBargain(){
        debugger
        console.log(this.bargainTimeForm.time)
        updateRenewBargain(this.renewId,this.bargainTimeForm.time).then(res=>{
          if(res.data > 0){
            this.$message({
              message: '设定成功',
              type: 'success'
            });
            this.list();
            this.showRenewBargain = false;
          }else{
            this.$message({
              message: '设定失败',
              type: 'warning'
            });
          }
        })
        console.log(this.bargainTimeForm.time)
      },
      //删除议价
      deleteBargain(id){
        this.$confirm('是否确认删除此产品？删除后不可恢复，您需要重新将其加入议价，请谨慎操作！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          deleteBargainHttp(id).then(res=>{
            if(res.data > 0){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.list();
            }else{
              this.$message({
                message: '删除失败',
                type: 'error'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      reset(){
        this.query = this.metaQuery();
        this.list();
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
        sortChange(value){
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
    this.list();
  }
    }
  }
</script>

