<template>
  <div class="tablebox">
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
      <!--<el-tab-pane label="产品降价审核" name="first">-->
          <el-form ref="query" :model="query" label-position="right" size="small" class="table-form" :inline="true">
              <el-form-item>
                <el-input v-model="query.id" placeholder="产品单号" @keyup.enter.native="searchEnterFun" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="query.statesAudit" size="small">
                  <el-option value="" label="全部"></el-option>
                  <el-option value="1" label="未审核"></el-option>
                  <el-option value="7" label="审核通过"></el-option>
                  <el-option value="9" label="审核驳回"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="query.publicity" size="small">
                  <el-option value="" label="全部"></el-option>
                  <el-option value="1" label="已公示"></el-option>
                  <el-option value="2" label="公示结束"></el-option>
                  <el-option value="0" label="未公示"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="date-group">
                <el-date-picker
                  v-model="query.startDate"
                  type="date"
                  placeholder="申请时间-开始"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd" size="small">
                </el-date-picker>
                &nbsp;至&nbsp;
                <el-date-picker
                  v-model="query.endDate"
                  type="date"
                  placeholder="申请时间-结束"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd" size="small">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
                <el-button type="warning" size="small" @click="restQuery">重置</el-button>
              </el-form-item>
          </el-form>
        <div class="foot-btn">
          <div class="foot-left">
            <el-button type="primary" size="small" @click="productDownPublicity(1)">开启公示</el-button>
            <el-button type="warning" size="small" @click="productDownPublicity(0)">关闭公示</el-button>
          </div>
        </div>

        <div class="tableset">
          <el-table
            ref="multipleTable"
            :data="resData.list"
            border
            stripe
            :row-key="getRowkeys"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              align="center"
              type="selection"
              width="50" :reserve-selection="true">
            </el-table-column>
            <el-table-column label="申请单号" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.ID}}</span>
              </template>
            </el-table-column>
           <!-- <el-table-column label="产品名称">
              <template slot-scope="scope">
                <div>
                  <div class="text-inline">{{ scope.row.NAMECHN }}</div>
                </div>
                <div class="text-inline">{{ scope.row.MIXDOSAGE }}</div>
              </template>
            </el-table-column>
            <el-table-column label="产品信息">
              <template slot-scope="scope">
                <div class="pro-details">
                  <div class="text-inline">{{ scope.row.COMBINED }}&nbsp;&nbsp;{{scope.row.wrapName}}</div>
                </div>
                <div class="text-inline">{{ scope.row.ABBR }}</div>
              </template>
            </el-table-column>-->


            <el-table-column label="产品名称" fixed show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.NAMECHN}}</span>
              </template>
            </el-table-column>
            <el-table-column label="商用名" width="70" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.TRADENAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="原报价" header-align="left" align="right">
              <template slot-scope="scope">
                <span>{{priceFormat(scope.row.BEFOREPRICE)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="更新后价格" header-align="left" align="right">
              <template slot-scope="scope">
                <span>{{priceFormat(scope.row.LASTPRICE)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="剂型" width="60" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.DOSEAGENAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="规格" width="60" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.SPEC}}</span>
              </template>
            </el-table-column>
            <el-table-column label="转换比" width="80">
              <template slot-scope="scope">
                <span>{{scope.row.STANDRATE}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位" width="70" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.METRICNAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="包材" width="70" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.WRAPNAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="生产企业" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.NAME}}</span>
              </template>
            </el-table-column>
            <el-table-column label="申请时间">
              <template slot-scope="scope">
                <span>{{scope.row.DATEADD}}</span>
              </template>
            </el-table-column>
            <el-table-column label="公示状态">
              <template slot-scope="scope">
                <span>{{scope.row.STATESPUBLICITY==0?'未公示':scope.row.STATESPUBLICITY==1?'公示中':'公示结束'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="审核状态">
              <template slot-scope="scope">
                <span>{{scope.row.STATESAUDIT==0?'未提交':scope.row.STATESAUDIT==1?'未审核':scope.row.STATESAUDIT==2?'公示质疑':scope.row.STATESAUDIT==4?'初审':scope.row.STATESAUDIT==5?'澄清':scope.row.STATESAUDIT==7?'审核通过':scope.row.STATESAUDIT==9?'驳回':'挂起'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="100">
              <template slot-scope="scope">
                <div class="operates">
                  <span><a v-if="scope.row.STATESAUDIT != 1" class="operation-btn" @click="handleFromView(1,scope.row.ID)">查看</a></span>
                  <span><a v-if="!(scope.row.STATESAUDIT == 7 || scope.row.STATESAUDIT == 9)" class="operation-btn" @click="handleFromView(0,scope.row.ID)">审核</a></span>
                </div>
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
      <!--</el-tab-pane>-->
    <!--</el-tabs>-->
    <present-dialog v-if="presentDialogView" ref="presentDialog" @refresh="list"></present-dialog>
  </div>
</template>

<script>
  import {
    queryPriceDownAuditList,
    findPriceDownAuditDetails,
    priceDownAudit,
    productDownPublicity
  } from 'src/axios/auditchanges/auditManage/productPriceDownAudit'
  import {keyBoardEnter,priceFormat} from "../../../../utils";
  import presentDialog from 'src/pages/auditchanges/auditManage/productPriceDownAudit/presentDialog'

  export default {
    components: {
      presentDialog
    },
    name: "list",
    data() {
      return {
        activeName: 'first',
        query: this.metaQuery(),
        resData: this.metaData(),
        presentDialogView: false,
        publicityList: [],
        publicityId: '',
      }
    },
    created() {
      this.list();
    },
    methods: {
      priceFormat,
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      getRowkeys(row){
        return row.ID;
      },
      productDownPublicity(flag) {
        this.publicityId = "";

        if (this.publicityList.length == 0) {
          this.$message({
            message: '请选择产品！',
            type: 'error'
          });
        } else {
          this.publicityList.forEach(value => {
            if (value.STATESPUBLICITY == 2) {
              this.$alert('公示已结束！', '警告', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$refs.multipleTable.toggleRowSelection(value);
                }
              });
            } else if (value.STATESPUBLICITY == 1 && flag == 1) {
              this.$alert('该产品正在公示中！', '警告', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$refs.multipleTable.toggleRowSelection(value);
                }
              });
            } else {
              this.publicityId += value.ID + ',';

            }
          })
          productDownPublicity(this.publicityId, flag).then(value => {
            if (value.data == 1) {
              this.$message({
                message: '公示成功！',
                type: 'success'
              });
              this.list();
            }
          })
          this.publicityId = '';
          this.publicityList = [];
        }
      },
      handleFromView(flag, productId) {
        this.presentDialogView = true
        this.$nextTick(() => {
          this.$refs.presentDialog.fillData(flag, productId)
        })
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      findListByCondition() {
        this.list()
      },
      handleSelectionChange(val) {
        //val 所选对象
        this.publicityList = val;
        this.publicityId = "";
        this.publicityList.forEach(value => {
          this.publicityId += value.ID + ',';
        })
      },
      //列表内容赋值
      list() {
        queryPriceDownAuditList(this.resData, this.query).then(res => {
          this.resData = res.data;
          if (this.resData.list.length == 0) {
            this.resData.pageNum = 1;
          }

          // this.$nextTick(x => {
          //   this.$refs.multipleTable.toggleRowSelection(2);
          // })
        })
      },
      //重置按钮
      restQuery() {
        this.query = this.metaQuery()
        this.list();
      },
      handleClick() {

      },
      //查询表单初始化
      metaQuery() {
        return {
          id: '',
          startDate: '',
          endDate: '',
          publicity: '',
          statesAudit: ''
        }
      },
      //列表及分页初始化
      metaData() {
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
      }
    }
  }
</script>

<style scoped>

</style>
