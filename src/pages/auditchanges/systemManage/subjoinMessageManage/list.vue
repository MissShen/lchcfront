<template>

  <!-- 表格 -->
  <div class="tablebox">
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
    <!--<el-tab-pane label="项目附加信息管理" name="first">-->
    <!-- 表格查询表单 -->
    <div>
      <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
              <el-form-item>
                <el-select v-model="query.proId" placeholder="选择项目" size="small">
                  <el-option
                    v-for="item in proList"
                    :key="item.ID"
                    :label="item.PROJECT_NAME"
                    :value="item.ID">
                  </el-option>
                </el-select>
              </el-form-item>
          <el-form-item>
                <el-select v-model="query.attachedType" placeholder="信息类型" size="small">
                    <el-option
                      key="1"
                      label="企业"
                      value="1">
                    </el-option>
                    <el-option
                      key="2"
                      label="产品"
                      value="2">
                    </el-option>
                  </el-select>
              </el-form-item>
          <el-form-item>
                <el-button type="success" @click="handleQuery" size="small">查询</el-button>
                  <el-button type="warning" @click="restQuery" size="small">重置</el-button>
              </el-form-item>
      </el-form>
    </div>
    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="success" size="small" @click="handleModifyView(0,null)">
          新增
        </el-button>
        <!--<router-link to="/AUDIT/sysManage/subjoinMessageManagePreview">-->
          <el-button type="primary" size="small" @click="goPreview">预览</el-button>
        <!--</router-link>-->
      </div>
    </div>
    <div v-if="listLength == 0">
      <el-row :gutter="24">
        <el-col :span="24">
          <h3>请选择项目及信息类型</h3>
        </el-col>
      </el-row>
    </div>
    <!-- 表格列表 -->
    <div v-if="listLength != 0">
      <div class="tableset">
        <el-table :data="resData.list" border stripe @selection-change="handleSelectionChange" width="100%">
          <el-table-column label="所属项目">
            <template slot-scope="scope">
              <span>{{ scope.row.PROJECT_NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column label="信息类型">
            <template slot-scope="scope">
              <span>{{ scope.row.ATTACHED_TYPE==1?'企业':'产品' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="字段组名称">
            <template slot-scope="scope">
              <span>{{ scope.row.DIC_NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <div class="operates">
                <span>
                  <a v-if="scope.row.SORT !=  maxSort" class="operation-btn" type="text" size="small"
                     @click="up(scope.row.ID,scope.row.SORT)">上移</a>
                </span>
                <span>
                  <a v-if="scope.row.SORT != '1'" class="operation-btn" type="text" size="small"
                     @click="down(scope.row.ID,scope.row.SORT)">下移</a>
                </span>
                <span>
                  <a class="operation-btn" type="text" size="small" @click="handleModifyView(1,scope.row.ID)">修改</a>
                </span>
                <span>
                  <a class="operation-btn" type="text" size="small" @click="delProjectSubjoinMessage(scope.row.ID)">删除</a>
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 表格分页 -->
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="listSizeChange"
          @current-change="listCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="resData.total"
          :page-size="resData.pageSize"
          :page-count="resData.pages"
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>
    </div>
    <add-or-up v-if="addOrUpView" ref="addOrUp" @refreshData="list"></add-or-up>
    <!--</el-tab-pane>-->
    <!--</el-tabs>-->
  </div>

</template>

<script>


  // 引入用户相关请求
  import {
    subjoinmessagelist,
    proList,
    delProjectSubjoinMessage,
    updateProductSubjoinMessageSort
  } from "src/axios/auditchanges/systemManage/subjoinMessageManage";
  import addOrUp from "./addOrUp";

  export default {
    components: {
      addOrUp
    },
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        // showForm: false, // 表单可见性初始化
        // showQuery: false, // 表单查询初始化
        // roleDialogVisible: false, // 角色对话框可见性 不可见
        // roleDialogLoading: false, // 角色加载状态   已加载
        // activeName: 'first',
        addOrUpView: false,
        // roleTree: [], // 角色分配树节点
        proList: this.searchPro(),
        maxSort: 0,
        listLength: 0
      }
    },
    created() {
      if(!!this.$store.state.pageSeach.pageNum){
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach=this.query;
      console.log(this.$store.state.pageSeach);
      this.resData.pageSize = 10;
      proList().then(res => {
        console.log(res.data);
        this.proList = res.data;
        if (this.proList.length == 0) {
          this.resData.pageNum = 1;
        }
      })
    },
    methods: {
      //上移
      up(id, sort) {
        updateProductSubjoinMessageSort(id, sort, 1, this.query.proId).then(res => {
          this.list();
        })
      },
      //下移
      down(id, sort) {
        updateProductSubjoinMessageSort(id, sort, 0, this.query.proId).then(res => {
          this.list();
        })
      },
      // handleClick(tab, event) {
      //   console.log(tab, event);
      // },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 0,
            pageSize: 10,
            size: 10,
            startRow: 0,
            endRow: 0,
            total: 0,
            pages: 0,
            // prePage: 0,
            // nextPage: 0,
            // isFirstPage: false,
            // isLastPage: true,
            // hasPreviousPage: false,
            // hasNextPage: false,
            // navigatePages: 8,
            // navigatepageNums: [],
            // navigateFirstPage: 0,
            // navigateLastPage: 0,
            // firstPage: 0,
            // lastPage: 0,
            list: []
          }
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            attachedType: '1',
            proId: undefined,
            dicName: undefined
          }
        }
      },
      searchPro() {
        return {
          proList: {
            ID: undefined,
            PROJECT_NAME: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {
        this.$store.state.pageSeach = this.query;
        subjoinmessagelist(this.resData, this.query).then(res => {
          console.log(res.data);
          this.resData = res.data;
          this.listLength = this.resData.list.length;
          res.data.list.forEach(function (item) {
            if (item.SORT > this.maxSort) {
              this.maxSort = item.SORT;
            }
            console.log(this.maxSort)
          }.bind(this));
          if (this.proList.length == 0) {
            this.resData.pageNum = 1;
          }
        });
          proList().then(res => {
            console.log(res.data);
            this.proList = res.data;
            if (this.proList.length == 0) {
              this.resData.pageNum = 1;
            }
          })
      },
      //删除
      delProjectSubjoinMessage(id) {
        console.log(id);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await delProjectSubjoinMessage(id);
          console.log(res);
          if (res.code == '200') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.list();
          } else {
            this.$message({
              type: 'warning',
              message: '删除失败!'
            });
            this.list();
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //表格分页
      listSizeChange(val) {
        this.$store.state.pageSeach.pageSize = val;
        this.resData.pageSize = val;
        this.list()
      },
      //表格当前页
      listCurrentChange(val) {
        console.log(val);
        this.$store.state.pageSeach.pageNum = val;
        this.resData.pageNum = val;
        this.list()
      },
      //修改/新增
      handleModifyView(flag, id) {
        this.addOrUpView = true;
        console.log(id);
        this.$nextTick(() => {
          this.$refs.addOrUp.fillData(flag, id)
        })
      },
      //预览
      goPreview(){
        this.$router.push('/AUDIT/sysManage/subjoinMessageManagePreview')
      },
      //选中对象
      handleSelectionChange(val) {
        //val 所选对象
      },
      //查询
      handleQuery() {
        this.resData.pageNum = 1;
        this.list()
      },
      //重置
      restQuery() {
        this.query = this.metaQuery();
        this.list()
      }
    }
  }
</script>
