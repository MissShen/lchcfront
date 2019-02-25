<template xmlns="http://www.w3.org/1999/html">
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <div class="formrow">
                <span class="date-group">
                      <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFun" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="开始日期" v-model="query.searchBenDate"></el-date-picker>
                &nbsp;至&nbsp;
                      <el-date-picker type="date" size="small" @keyup.enter.native="searchEnterFun" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="query.searchEndDate"></el-date-picker>
                </span>
            <!--<el-col :span="3">-->
              <!--<template>-->
                <!--<el-select size="small" v-model="query.aaa" placeholder="请选择">-->
                  <!--<el-option label="配送企业" value="shanghai"></el-option>-->
                  <!--<el-option label="买方机构" value="beijing"></el-option>-->
                <!--</el-select>-->
              <!--</template>-->
            <!--</el-col>-->
                <span>
                  <el-input v-model="query.bakSenderEasy" @keyup.enter.native="searchEnterFun" placeholder="配送企业" size="small"></el-input>
                </span>
                <span>
                  <el-input v-model="query.bakBuyerEasy" @keyup.enter.native="searchEnterFun" placeholder="买方机构" size="small"></el-input>
                </span>
                <span>
                  <el-input v-model="query.searchSenderName" @keyup.enter.native="searchEnterFun" placeholder="模糊查询" size="small"></el-input>
                </span>
                <span>
                  <el-select v-model="query.degreeFlag" size="small" @keyup.enter.native="searchEnterFun" placeholder="紧急程度" style="width:120px">
                    <el-option label="普通" value="cz"></el-option>
                    <el-option label="部分急需" value="dh"></el-option>
                    <el-option label="全部急需" value="qh"></el-option>
                  </el-select>
                </span>
                <span>
                  <el-button type="warning" @click="searchEnterFun" size="small">查询</el-button>
                  <el-button type="primary" size="small" @click="restQuery()">重置</el-button>
                </span>
            </div>
        </el-form>

      </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <!--<el-table-column type="index" width="50" label="序号"></el-table-column>-->
          <el-table-column label="订单号">
            <template slot-scope="scope">
              {{ scope.row.orderCode }}
            </template>
          </el-table-column>
          <el-table-column label="配送企业">
            <template slot-scope="scope">
              <span>{{ scope.row.senderOrgEasy}}</span>
            </template>
          </el-table-column>
          <el-table-column label="发送时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订购金额（元）">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.requestTotal) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到货金额（元）">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.receiveTotal) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="买方机构">
            <template slot-scope="scope">
              <span>{{ scope.row.bakBuyerEasy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.orderState }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a @click="handleGoShow(scope.row.id)" class="operation-btn">查看</a>
              <a @click="handleGoShow(scope.row.id)" class="operation-btn">评价</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="sign">
        <span class="text">标记说明：</span>
        <span class="icon-sign icon-bufen-jixu"></span>
        <span class="text">部分商品急需</span>
        <span class="icon-sign icon-jixu"></span>
        <span class="text">全部商品急需</span>
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
      <!--评价订单对话框-->
      <el-dialog title="评价订单" top="2vh" :visible.sync="showForm" :before-close="closeForm">
        <div style="width: 500px" class="padding20">
          <el-form ref="form" :model="form" label-width="180px">
             <el-input type="hidden"  v-model="form.orderId"></el-input>
            <el-form-item  label="配送速度：">
              <el-rate v-model="form.speedState"   show-score text-color="#ff9900" score-template="{value}" >
             </el-rate>
            </el-form-item>
            <el-form-item label="服务态度：" >
               <el-rate v-model="form.serviceState"  show-score text-color="#ff9900" score-template="{value}"></el-rate>
            </el-form-item>
            <el-form-item label="库存信息描述：" >
             <el-radio-group v-model="form.stockInfoState">
                  <el-radio label="1">准确</el-radio>
                  <el-radio label="2">不准确</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="评价内容：" >
              <el-input type="textarea" rows="6" v-model="form.evaluate"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <el-button type="primary" size="small" @click="handleForm('form')">提交</el-button>
          <el-button @click="closeForm" size="small">取消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>


  // 引入用户相关请求
  import {selectOrderEvaluateList} from 'src/axios/trade/buyerrole/arrive/buyerTabView/orderList'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    name: "selectOrderEvaluateList",
    data () {
      return {
        speedState:5,
        serviceState:5,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        formStatus: 'add', // 表单状态 add
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        options: [{
          value: '选项1',
          label: '到货中'
        },{
          value: '选项2',
          label: '完成'
        },{
          value: '选项3',
          label: '到货修改'
        }]
      }
    },
    created () {
      this.list()
    },
    methods: {
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
            pageNum: 1,
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
      restQuery(){
        this.query=this.metaQuery()
        this.list()
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      metaForm () { // 表单数据初始化
        return {
            stockInfoState: '1',
            speedState:5,
            serviceState:5,
            orderId:null
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
            searchBenDate: undefined,
            searchEndDate: undefined,
            bakSenderEasy: undefined,
            bakBuyerEasy: undefined,
            searchSenderName: undefined,
            degreeFlag: undefined
        }
      },
      toggleForm () {
          this.showForm = !this.showForm
      },
      closeForm () {
          this.$refs['form'].resetFields();
          this.toggleForm();
          this.form = this.metaForm()
       },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        selectOrderEvaluateList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum===0){
            this.resData.pageNum=1;
          }
          this.$emit("evalue",this.resData.total);
        })
      },
       // 重置用户表单
            resetForm () {
            /*  this.$refs['form'].resetFields()*/
              this.form = this.metaForm()
            },
            // 提交用户表单
            handleForm (form) {
              this.$refs[form].validate(valid => {
                if (valid) {
                  this.toggleForm();
                  if (!this.form.id) {
                    evaFill(this.form).then(res => {
                      this.list();
                      this.$message({
                        type: 'success',
                        message: '评价成功'
                      })
                    })
                  }
                  if (this.form.id) {
                    userUpdate(this.form).then(res => {
                      this.list();
                      this.$message({
                        type: 'info',
                        message: res.data
                      })
                    })
                  }
                } else {
                  return false
                }
              })
            },
            // 打开角色分配页面
            handleGoShow (id) {
             this.showForm = true,
             this.form.orderID=id
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

