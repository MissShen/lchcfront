<template>
  <div>
    <!--<div class="tabs-panel">
      <span class="active">产品信息注册</span>
    </div>-->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" :inline="true" class="demo-form-inline table-form">
        <el-form-item>
          <el-input v-model="query.searchName" placeholder="产品名称" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchDosageForm" placeholder="剂型" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchSpec" placeholder="规格" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchOrg" placeholder="生产企业" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.searchState" placeholder="全部" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="restQuery" size="small">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="table-caption foot-btn">
        <div class="foot-left">
          <el-button type="success" size="small" @click="handleFromView('0')">新增</el-button>
          <el-button type="primary" size="small" @click="submitProduct()">提交</el-button>
          <el-button type="primary" size="small" @click="goDeclare">备案产品申报</el-button>

        </div>
      </div>
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          :row-key="getRowkeys"
          @selection-change="handleSelectionChange">
          <el-table-column :selectable="selectAble" type="selection" width="50" :reserve-selection="true" align="center"></el-table-column>
         <!-- <el-table-column label="产品名称">
            <template slot-scope="scope">
              <div>
                <div class="text-inline">{{ scope.row.PRODUCTNAME }}</div>
              </div>
              <div class="text-inline">{{ scope.row.MIXDOSAGE }}</div>
            </template>
          </el-table-column>
          <el-table-column label="产品信息">
            <template slot-scope="scope">
              <div class="pro-details">
                <div class="text-inline">{{ scope.row.COMBINED }}&nbsp;&nbsp;{{scope.row.WRAPNAME}}</div>
              </div>
              <div class="text-inline">{{ scope.row.ABBR }}</div>
            </template>
          </el-table-column>-->

          <el-table-column label="产品名称" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{ scope.row.PRODUCTNAME }}</span>
          </template>
          </el-table-column>
          <el-table-column label="商品名" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{ scope.row.TRADENAME }}</span>
          </template>
          </el-table-column>
          <el-table-column label="剂型" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{ scope.row.DOSAGENAME }}</span>
          </template>
          </el-table-column>
          <el-table-column label="规格" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{ scope.row.SPEC }}</span>
          </template>
          </el-table-column>
          <el-table-column label="转换比" width="60" header-align="left" align="right">
          <template slot-scope="scope">
          <span>{{ scope.row.STANDRATE }}</span>
          </template>
          </el-table-column>
          <el-table-column label="单位" width="50">
          <template slot-scope="scope">
          <span>{{ scope.row.METRICNAME }}</span>
          </template>
          </el-table-column>
          <el-table-column label="包材" width="60" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{ scope.row.WRAPNAME }}</span>
          </template>
          </el-table-column>
          <el-table-column label="生产企业" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>{{ scope.row.MANUFACTURENAME }}</span>
          </template>
          </el-table-column>
          <el-table-column label="提交状态" width="150">
            <template slot-scope="scope">
              <span>{{{'0': '已提交', '1': '已通过', '2': '已拒绝', '3': '未提交','4':'已质疑'}[scope.row.SUBMITSTATE]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div class="operates">
                <span><a class="operation-btn" @click="handleView(scope.row.ID,scope.row.ISTEMP)">查看</a></span>
                <span ><a class="operation-btn" @click="handleView(scope.row.ID,scope.row.ISTEMP,true)">质疑</a></span>
                <span v-if="scope.row.ISTEMP == '1' && scope.row.SUBMITSTATE =='3'"><a class="operation-btn"
                                                                                       @click="handleFromView(scope.row.ID)">修改</a></span>
                <!--<span v-if="scope.row.SUBMITSTATE =='3'"><a class="operation-btn" @click="submitProduct(scope.row.ID)">提交</a></span>-->
                <span v-if="scope.row.SUBMITSTATE=='0'"><a class="operation-btn" @click="rollbackProduct(scope.row.ID)">撤回</a></span>
                <span v-if="scope.row.SUBMITSTATE =='3'"><a class="operation-btn"
                                                            @click="handleDelete(scope.row.ID)">删除</a></span>
              </div>
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
    <add-or-up ref="addOrUp"></add-or-up>
    <find-view ref="findView"></find-view>
  </div>
</template>

<script>
  import {queryList, remove, rollback, submit} from 'src/axios/auditchanges/messageRegister/productMessageRegister'
  import {checkOrg} from 'src/axios/auditchanges/messageDeclare/product'
  import {keyBoardEnter} from "src/utils";
  import findView from './findView';
  import addOrUp from './addOrUp';
  export default {
    components: {
      findView,
      addOrUp,
    },
    data () {
      return {
        maskShow:false,
        selection: '',
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        formViewVisible: false,
        viewVisible: false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '未审核'
        }, {
          value: '1',
          label: '审核通过'
        }, {
          value: '2',
          label: '已拒绝'
        }, {
          value: '3',
          label: '临时数据'
        }, {
          value: '4',
          label: '已质疑'
        }]
      }
    },
    created () {
      this.resData.pageSize = 10;
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
        let obj = {
          id: undefined,
          searchName: undefined,
          searchDosageForm: undefined,
          searchSpec: undefined,
          searchOrg: undefined,
          searchState: undefined
        }
        if (sessionStorage.getItem('query')) {
          obj = JSON.parse(sessionStorage.getItem('query'))
        }
        return obj;
      },
      getRowkeys(row){
        return row.ID;
      },
      async goDeclare(){
        await checkOrg().then(res => {
          if (res.data == undefined || res.data == null) {
            this.$alert('企业尚未申报', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            });
          } else {
            this.$router.push("/AUDIT/messageDeclare/recordProductDeclare");
          }
        });
      },
      /*  //查询
       searchEnterFun(e){
       sessionStorage.setItem('query',JSON.stringify(this.query))
       this.$store.state.pageSeach.pageNum = 1;
       this.resData.pageNum=1;
       keyBoardEnter(e, () => {
       this.list();
       })
       },*/
      //  获取用户分页列表
      list () {
        queryList(this.resData, this.query).then(res => {
          console.log(res.data);
          this.resData = res.data
        })
        if (this.resData.pageNum == 0) {
          this.resData.pageNum = 1
        }
      },
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      handleFromView(id) {
        this.$nextTick(() => {
          this.$refs.addOrUp.list(id)
        })
      },
      handleView(id, istemp, queryFlag) {
        this.$nextTick(() => {
          this.$refs.findView.list(id, istemp,queryFlag)
        })
      },
      handleDelete(id) {
        this.$confirm(`确定删除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(id).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        })
      },
      rollbackProduct(id){
        rollback(id).then(res => {
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
      handleQuery(){
        this.list()
      },
      restQuery(){//重置
        sessionStorage.removeItem('query')
        this.query = this.metaQuery();
        this.list();
      },
      submitProduct(id){
        if (id || this.selection) {
          this.selection = id + ',' + this.selection
          submit(this.selection).then(res => {
            this.$message({
              message: '提交成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                window.location.reload();
              }
            })
          })
        } else {
          this.$message({
            message: '请先选择数据'
          })
        }
      },
      selectAble(row,index){
        return row.SUBMITSTATE == '3'
      },
      handleSelectionChange(val){
        //val 所选对象
        let arr = '';
        let len = val.length + 1;
        for (let i in val) {
          if (i == len) {
            arr += val[i].ID
          } else {
            arr += val[i].ID + ','
          }
        }
        console.log(arr)
        this.selection = arr;
      }
    }
  }
</script>
