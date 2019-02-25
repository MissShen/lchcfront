<template>

  <div>

    <el-tabs v-model="activeName" @tab-click="toChange">
      <el-tab-pane label="产品转入申报" name="first"/>
      <el-tab-pane label="产品转出确认" name="second"/>
      <el-tab-pane label="产品转产澄清" name="third"/>
      <el-tab-pane label="产品转产质疑记录" name="fourth"/>
    </el-tabs>

    <!-- 表格 -->
    <div class="tablebox">
      <!--产品转产变更列表-->
      <!--<el-tabs v-model="activeName">-->
      <!--<el-tab-pane label="产品转产" name="first">-->
      <!-- 表格查询表单 -->
      <el-form :inline="true" :model="query" class="table-form" size="small">
        <el-form-item>
          <el-input v-model="query.requestCode" placeholder="申请单号" @keyup.enter.native="searchEnterFun"
                    size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.operatorType" value-key="key" placeholder="全部" size="small">
            <el-option
              v-for="item in productTransferOpts"
              :label="item.value"
              :value="item.id"
              :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="resetForm" size="small">重置</el-button>
        </el-form-item>
      </el-form>

      <!--<div class="table-caption">-->
      <!--<el-button type="primary" plain size="small" @click="handleAdd">-->
      <!--新增-->
      <!--</el-button>-->
      <!--</div>-->
      <div class="table-caption foot-btn">
        <div class="foot-left">
          <el-button type="primary" size="small" @click="handleAdd">
            新增
          </el-button>
        </div>
      </div>

      <div class="tableset">
        <el-table :data="resData.list" border stripe>
          <!--<el-table-column type="selection" width="50"></el-table-column>-->
          <el-table-column label="申请单号" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.requestCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新类型名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.upTypeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请企业名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.requestOrg }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转出企业名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.transferOrg }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请时间" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.requestTime|dateConvert }}</span>
            </template>
          </el-table-column>
          <el-table-column label="当前状态">
            <template slot-scope="scope">
              <span>{{scope.row.status|statusConvert}}</span>
            </template>
          </el-table-column>
          <el-table-column label="对方确认结果">
            <template slot-scope="scope">
              <span>{{scope.row.processingState==0?'不同意':scope.row.processingState==1?'同意':'待确认'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核结果">
            <template slot-scope="scope">
              <span>{{scope.row.auditResults=='1'?'审核通过':scope.row.auditResults=='3'?'审核不通过':''}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div v-if="'0'===scope.row.status" class="operates">
              <span><a class="operation-btn"
                       @click="editHandle(scope.row.id,scope.row.upTypeId,scope.row.transferOrgId)">修改
              </a></span>
                <span><a class="operation-btn" @click="deleteHandle(scope.row.id)">删除</a></span>
                <span><a class="operation-btn" size="small" @click="commitHandle(scope.row.id)">提交</a></span>
              </div>
              <div v-else class="operates">
              <span><a class="operation-btn"
                                                    @click="withdrawHandle(scope.row.id)">撤回</a></span>
                <span><a class="operation-btn"
                         @click="detailHandle(scope.row.id,scope.row.upTypeId,scope.row.status,scope.row.transferOrgId)">
                详情
              </a></span>
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
      <!--</el-tab-pane>-->
      <!--</el-tabs>-->
      <transfer-add v-if="formViewVisible" ref="transferAdd"></transfer-add>
    </div>
  </div>
</template>

<script>

  // 引入用户相关请求
  import {
    findProjectOrgByid,
    listCount,
    findUpProductTransfers,
    del,
    commit,
    withdraw,
    findAgencyStateByid,
    findImageIdListById
  } from 'src/axios/auditchanges/messageChanges/productTransfer';
  import {findByOperatorType} from 'src/axios/auditchanges/messageChanges/upType';
  import {keyBoardEnter} from "src/utils";
  import transferAdd from './add';
  import moment from 'moment';

  export default {
    name: 'list',
    components: {
      transferAdd
    },
    data() {
      return {
        resData: this.metaData(),
        activeName: 'first',//标签页默认选中第一个
        query: this.metaQuery(), // 查询初始化
        productTransferOpts: [],
        formViewVisible: false,
        type: '',
        orgName: '',
        dataIdLists:this.dataIdList()
      }
    },
    created() {
      if (!!this.$store.state.pageSeach.pageNum) {
        this.query = this.$store.state.pageSeach;
        this.resData.pageSize = this.$store.state.pageSeach.pageSize;
        this.resData.pageNum = this.$store.state.pageSeach.pageNum;
      }
      this.$store.state.pageSeach = this.query;
      findByOperatorType(this.productTransferOpts).then(res => {
        this.productTransferOpts = res.data;
        this.productTransferOpts.splice(0, 0, {id: '', value: '全部'})
      });
      this.resData.pageSize = 10;
      this.list()
    },
    filters: {
      dateConvert: function (value) {
        if (value == null || value == '' || value == 'undefind') {
          return ''
        } else {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      statusConvert: function (status) {
        if (status == null || status == '' || status == 'underfind') {
          return ''
        }  else {
          if (status == '0') {
            return "未提交";
          }
          else if (status == '1') {
            return "已提交";
          }
          else if (status == '2') {
            return "公式中";
          }
          else if (status == '3') {
            return "质疑中";
          }
          else if (status == '4') {
            return "澄清中";
          }
          else if (status == '5') {
            return "审核中";
          }
          else if (status == '6') {
            return "挂网中";
          }
          else if (status == '7') {
            return "数据中心处理中";
          }
          else if (status == '8') {
            return "确认中";
          }
        }
      },
    },
    methods: {
      dataIdList(){
        return{
          dataIdList:[]
        }
      },
      metaData() {
        return {
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
          list: undefined
        }
      },
      metaQuery() {
        return {
          query: {
            requestCode: undefined,
            operatorType: undefined
          }
        }
      },
      handleAdd() {
        findProjectOrgByid().then(res => {
            if (res.data == 1) {
              this.formViewVisible = true;
              this.$nextTick(() => {
                this.$refs.transferAdd.showForm()
              })
            } else {
              this.$message({
                type: 'error',
                message: '本企业没有进行申报,不可进行转产操作'
              })
            }
          }
        )
      },
      list() {
        this.$store.state.pageSeach = this.query;
        findUpProductTransfers(this.resData, this.query).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        })
      }
      ,
      //查询
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      }
      ,
      toChange(t) {
        if (t.name == "second") {
          this.$router.push('/AUDIT/orgAffirm/productRollOutVerifyList');
        }else if(t.name == 'third'){
          this.$router.push('/AUDIT/orgClarify/productTransferClarify')
        }else if(t.name == 'first'){
          this.$router.push('/AUDIT/messageDeclare/productMessageTransferList')
        }else if (t.name == 'fourth'){
          this.$router.push('/AUDIT/messagePublicity/transferQuestionRecord')
        }
      },
      // 重置
      resetForm() {
        this.query = {};
        this.list();
      }
      ,
      handleQuery() {
        this.list()
      }
      ,
      deleteHandle(id) {
        this.$confirm('此操作将删除此次转产申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del(id).then(res => {
            this.$message({
              type: 'success',
              message: res.data
            })
            this.list()
          })
        })
      }
      ,
      commitHandle(id) {
        findAgencyStateByid(id).then(res => {
          console.log(res)
          if (res.data != 1) {
            this.$confirm("此操作将提交此次转产, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              listCount(id).then(res => {
                if (res.data > 0) {
                  commit(id).then(res => {
                    this.$message({
                      type: "success",
                      message: res.data
                    });
                    this.list();
                  });
                }
                else {
                  this.$message({
                    type: "error",
                    message: '无转产产品,请核对后重新提交'
                  });
                }
              });
            });
          } else {
            findImageIdListById(id).then(res => {
                console.log(res)
                if (res.data > 0) {
                  this.$message({
                    type: "error",
                    message: '有未上传资质的产品,请上传后提交'
                  });
                } else {
                  this.$confirm("此操作将提交此次转产, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }).then(() => {
                    listCount(id).then(res => {
                      if (res.data > 0) {
                        commit(id).then(res => {
                          this.$message({
                            type: "success",
                            message: res.data
                          });
                          this.list();
                        });
                      }
                      else {
                        this.$message({
                          type: "error",
                          message: '无转产产品,请核对后重新提交'
                        });
                      }
                    });
                  });
                }
              }
            )
          }
        })
      }
      ,
      withdrawHandle(id) {
        this.$confirm('此操作将撤回此次转产, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dataIdLists.push(id);
          withdraw(this.dataIdLists).then(res => {
            this.$message({
              type: 'success',
              message: res.data
            })
            this.list()
          })
        })
      }
      ,
      editHandle(id, upTypeId, outOrgId) {
        this.$router.push("/AUDIT/messageChanges/productMessageTransferEdit/" + id + "/" + upTypeId + "/edit/" + outOrgId);
      }
      ,
      detailHandle(id, upTypeId, status, outOrgId) {
        this.$router.push("/AUDIT/messageChanges/productMessageTransferEdit/" + id + "/" + upTypeId + "/detail" + "/" + outOrgId);
      }
      ,
      handleSizeChange(val) {
        this.$store.state.pageSeach.pageSize = val
        this.resData.pageSize = val
        this.list()
      }
      ,
      handleCurrentChange(val) {
        this.$store.state.pageSeach.pageNum = val
        this.resData.pageNum = val
        this.list()
      }
    }
  }

</script>
