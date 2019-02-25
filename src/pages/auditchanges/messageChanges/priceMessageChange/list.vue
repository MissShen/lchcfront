<template>
  <div>
  <el-tabs v-model="activeName" @tab-click="toChange">
    <el-tab-pane label="价格变更" name="first" />
    <el-tab-pane label="价格质疑记录" name="second" />
   <!-- <el-tab-pane label="价格变更质疑" name="three" />-->
    <el-tab-pane label="价格澄清" name="four" />
    <!--<el-tab-pane label="价格变更澄清" name="five" />-->
  </el-tabs>
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
      <el-form ref="query" :model="query" label-position="right" size="small" class="table-form" :inline="true">
              <el-form-item class="width-130">
                <el-input v-model="query.requestCode" placeholder="申报号" @keyup.enter.native="searchEnterFun"
                          size="small"></el-input>
              </el-form-item>
          <el-form-item class="width-130">
                <el-input v-model="query.name" placeholder="产品名称" @keyup.enter.native="searchEnterFun"
                          size="small"></el-input>
              </el-form-item>
          <el-form-item class="width-130">
                 <el-input v-model="query.dosage" placeholder="剂型" @keyup.enter.native="searchEnterFun"
                           size="small"></el-input>
              </el-form-item>
          <el-form-item class="width-130">
                 <el-input v-model="query.spec" placeholder="规格" @keyup.enter.native="searchEnterFun"
                           size="small"></el-input>
              </el-form-item>
          <el-form-item class="width-130">
                <el-input v-model="query.manufacture" placeholder="生产企业" @keyup.enter.native="searchEnterFun"
                          size="small"></el-input>
              </el-form-item>
          <el-form-item>
                <el-select v-model="query.status" placeholder="全部" size="small">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
          <el-form-item>
             <el-button type="success" @click="searchEnterFun">查询</el-button>
              <el-button type="warning" @click="restQuery">重置</el-button>
          </el-form-item>
      </el-form>
    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="primary" size="small" @click="goChange">
          价格变更
        </el-button>
        <el-button type="primary" size="small" :disabled="!arrCheckeds || arrCheckeds.length == 0"
                   @click="handelBatchCommit">
          提交
        </el-button>
      </div>
    </div>

    <div class="tableset">
      <el-table :data="resData.list" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column label="申报号">
          <template slot-scope="scope">
            <span>{{ scope.row.requestCode }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="产品名称">-->
          <!--<template slot-scope="scope">-->
            <!--<div>-->
              <!--<div class="text-inline">{{scope.row.productName}}</div>-->
              <!--<div class="text-inline">{{scope.row.mixDosage}}</div>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="产品信息">-->
          <!--<template slot-scope="scope">-->
            <!--<div class="pro-details">-->
              <!--<div class="text-inline">{{scope.row.combined}}&nbsp;&nbsp;{{scope.row.wrap}}</div>-->
              <!--<div class="text-inline">{{scope.row.abbr}}</div>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column label="产品名称">
        <template slot-scope="scope">
        <span>{{ scope.row.productName }}</span>
        </template>
        </el-table-column>
        <el-table-column label="商品名">
        <template slot-scope="scope">
        <span>{{ scope.row.goodsName }}</span>
        </template>
        </el-table-column>
        <el-table-column label="剂型">
        <template slot-scope="scope">
        <span>{{ scope.row.dosage }}</span>
        </template>
        </el-table-column>
        <el-table-column label="规格">
        <template slot-scope="scope">
        <span>{{ scope.row.specification }}</span>
        </template>
        </el-table-column>
        <el-table-column width="60px" align="right" header-align="left" label="转换比">
        <template slot-scope="scope">
        <span>{{ scope.row.conversion }}</span>
        </template>
        </el-table-column>
        <el-table-column label="单位">
        <template slot-scope="scope">
        <span>{{ scope.row.units }}</span>
        </template>
        </el-table-column>
        <el-table-column label="包材">
        <template slot-scope="scope">
        <span>{{ scope.row.packingMaterials }}</span>
        </template>
        </el-table-column>
        <el-table-column label="生产企业">
        <template slot-scope="scope">
        <span>{{ scope.row.manufacture }}</span>
        </template>
        </el-table-column>
        <el-table-column label="当前状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status | statusConvert }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核结果">
          <template slot-scope="scope">
            <span>{{ scope.row.auditResult | resultConvert }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div class="operates">
              <span><a class="operation-btn" @click="handelDetail(scope.row.productId,scope.row.requestCode)">详情</a></span>
              <span v-if="scope.row.status=='0'"><a class="operation-btn" @click="handelEdit(scope.row.productId,scope.row.requestCode)">修改</a></span>
              <span v-if="scope.row.status=='0'"><a class="operation-btn" @click="handelCommit(scope.row.requestCode)">提交</a></span>
              <span v-if="scope.row.status!='0' && scope.row.status!='5' && scope.row.status!='6'"><a class="operation-btn" @click="handRevocation(scope.row.requestCode)">撤销</a></span>
              <span v-if="scope.row.status=='0' && scope.row.auditResult == '0'"><a class="operation-btn" @click="handelDelete(scope.row.requestCode)">删除</a></span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 表格分页 -->
    <div class="pagebox">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" :page-sizes="[10, 20, 30]" :total="resData.total"
                     :page-size="resData.pageSize" :page-count="resData.pages" :current-page.sync="resData.pageNum">
      </el-pagination>
    </div>
    <add-list ref="addList"></add-list>
    <change ref="change"></change>
    <detail ref="detail"></detail>
  </div>
  </div>
</template>

<script>
  // 引入用户相关请求
  import {
    findUpProductPriceChanges,
    submitChanges,
    revocation,
    deleteById
  } from "src/axios/auditchanges/messageChanges/price";
  // import {keyBoardEnter} from "src/utils";
  import change from './change'
  import addList from './addList'
  import detail from './detail'

  export default {
    components: {
      change,
      addList,
      detail
    },
    data() {
      return {
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        activeName: "first", //标签页默认选中第一个
        multipleSelection: [],
        arrCheckeds: [],
        // 当前状态(0.未提交，1.已提交，2.公示中，3.质疑中，4.澄清中，5.审核中，6.挂网中)
        options: [
          {
            value: "",
            label: "全部"
          },
          {
            value: "0",
            label: "未提交"
          },
          {
            value: "1",
            label: "提交"
          },
          {
            value: "2",
            label: "受理"
          },
          {
            value: "3",
            label: "公示"
          },
          {
            value: "4",
            label: "审核"
          },
          {
            value: "5",
            label: "确认"
          },
          {
            value: "6",
            label: "挂网"
          }
        ]
      };
    },
    created() {
      this.list();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
        };
      },
      metaQuery() {
        // 表单查询数据初始化
        let obj = {
          requestCode: undefined,
          name: undefined,
          dosage: undefined,
          spec: undefined,
          manufacture: undefined,
          status: undefined
        }
        if (sessionStorage.getItem('query')) {
          obj = JSON.parse(sessionStorage.getItem('query'))
        }
        return obj
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleQuery() {
        this.showQuery = !this.showQuery;
      },
      //  获取用户分页列表
      list() {
        findUpProductPriceChanges(this.resData, this.query).then(res => {
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        });
      },
      // //查询
      // searchEnterFun(e){
      //   // this.$store.state.pageSeach.pageNum = 1;
      //   this.resData.pageNum=1;
      //   keyBoardEnter(e, () => {
      //     this.list();
      //   })
      // },
      handQuery() {
        this.list();
      },
      toChange(t) {
        if(t.name == "second") {
          this.$router.push('/AUDIT/messageDoubt/priceMessageDoubt');
        }if(t.name == "three") {
          this.$router.push('/AUDIT/messageDoubt/priceMessageDoubtChange');
        }if(t.name == "four") {
          this.$router.push('/AUDIT/orgClarify/priceMessageClarify');
        }if(t.name == "five") {
          this.$router.push('/AUDIT/orgClarify/priceMessageChangeClarify');
        }
      },
      // 重置用户表单
      restQuery() {
        sessionStorage.removeItem('query')
        this.query = this.metaQuery();
        this.list();
      },
      handelBatchCommit() {
        if (this.multipleSelection.length < 1) {
          this.$alert("请您选择要提交的信息", "信息", {
            confirmButtonText: "确定"
          });
          return false;
        } else {
          this.$confirm("您确认提交选中内容？", "信息", {
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            type: "warning"
          }).then(() => {
            console.log(this.arrCheckeds);
            submitChanges(this.arrCheckeds).then(res => {
              this.$message({
                type: "success",
                duration: 1000,
                message: "提交成功!",
                onClose: () => {
                  window.history.go(0);
                  this.list();
                }
              });
            });
          });
        }
      },
      handelCommit(id) {
        let pushId = [];
        pushId.push(id);
        this.$confirm("确认提交选中内容？", "信息", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning"
        }).then(() => {
          submitChanges(pushId).then(res => {
            this.$message({
              type: "success",
              duration: 1000,
              message: "提交成功!",
              onClose: () => {
                window.history.go(0);
                this.list();
              }
            });
          });
        });
      },
      handelDelete(id) {
        this.$confirm("您确认删除此次变更记录？", "信息", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning"
        }).then(() => {
          deleteById(id).then(res => {
            this.$message({
              type: "success",
              duration: 1000,
              message: "撤销成功!",
              onClose: () => {
                window.history.go(0);
                this.list();
              }
            });
          });
        });
      },
      handelEdit(id, upId) {
        //修改
        this.$refs.change.list(id, upId)
      },
      handelDetail(id, upId) {
        //详情
        this.$refs.detail.list(id, upId)
      },
      goChange() {
        this.$refs.addList.list()
      },
      handRevocation(id) {
        revocation(id).then(res => {
          if(res.success){
            this.$message({
              message: res.exceptionMessage,
              type:'success'
            })
            onClose: ()=>{
              this.list()
            }
          }else {
            this.$message({
              message: res.exceptionMessage,
              type: 'error'
            })
          }
        });
      },
      handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection = val;
        let arr = [];
        for (let i in this.multipleSelection) {
          arr.push(this.multipleSelection[i].requestCode);
        }
        this.arrCheckeds = arr;
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.list();
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.list();
      }
    },
    filters: {
      statusConvert: function (status) {
        //当前状态(0.未提交，1.已提交，2.公示中，3.质疑中，4.澄清中，5.审核中，6.挂网中)
        if (status == null || status == "" || status == "underfind") {
          return "";
        } else {
          if (status == "0") {
            return "未提交";
          } else if (status == "1") {
            return "提交";
          } else if (status == "2") {
            return "公示";
          } else if (status == "3") {
            return "质疑";
          } else if (status == "4") {
            return "澄清";
          } else if (status == "5") {
            return "审核";
          } else if (status == "6") {
            return "挂网";
          } else if (status == "8") {
            return "确认中";
          } else if (status == "9") {
            return "已确认";
          }
        }
      },
      resultConvert: function (result) {
        // 审核状态（0.未审核，1.审核通过，2.待确认，3.审核不通过）
        if (result == null || result == "" || result == "underfind") {
          return "";
        } else {
          if (result == "0") {
            return "未审核";
          } else if (result == "1") {
            return "审核通过";
          } else if (result == "2") {
            return "待确认";
          } else if (result == "3") {
            return "审核不通过";
          }
        }
      }
    }
  };
</script>
