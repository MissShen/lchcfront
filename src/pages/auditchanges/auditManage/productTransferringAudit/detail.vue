<template>
  <div>
    <h4 style="padding: 10px; text-align: center;">将 「<span class="red">{{transfer.outOrgName}}</span>」 以下产品转移到 「<span
      class="red">{{transfer.inOrgName}}</span>」
    </h4>

    <div class="tablebox">
      <el-tabs v-model="activeName">
        <el-tab-pane label="本次转移产品" name="first">
          <div class="tableset">
            <el-table
              :data="resData.list"
              border
              stripe>
              <el-table-column label="产品名称" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.productName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="商品名" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.goodsName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="剂型" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.dosage }}</span>
                </template>
              </el-table-column>
              <el-table-column label="规格" width="100" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.specification }}</span>
                </template>
              </el-table-column>
              <el-table-column label="转换比" width="60" header-align="center" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.conversion }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位" width="50">
                <template slot-scope="scope">
                  <span>{{ scope.row.packingMaterials }}</span>
                </template>
              </el-table-column>
              <el-table-column label="包材" width="60" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.units }}</span>
                </template>
              </el-table-column>
              <el-table-column label="生产企业" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.manufacture }}</span>
                </template>
              </el-table-column>
              <!--<el-table-column label="产品名称">-->
                <!--<template slot-scope="scope">-->
                  <!--<div>-->
                    <!--<div class="text-inline">{{ scope.row.productName }}</div>-->
                  <!--</div>-->
                  <!--<div class="text-inline">{{ scope.row.mixDosage }}</div>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column label="产品信息">-->
                <!--<template slot-scope="scope">-->
                  <!--<div class="pro-details">-->
                    <!--<div class="text-inline">{{ scope.row.combined }}&nbsp;&nbsp;{{scope.row.wrap}}</div>-->
                  <!--</div>-->
                  <!--<div class="text-inline">{{ scope.row.abbr }}</div>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column label="审核结果" width="100px">
                <template slot-scope="scope">
                  <span>{{ scope.row.auditResult|statusConvert }}</span>
                </template>
              </el-table-column>
              <el-table-column label="审核备注" width="80px" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.auditRemark }}</span>
                </template>
              </el-table-column>s
              <el-table-column label="其他信息">
                <template slot-scope="scope">
                  <a size="mini" class="el-button--success" @click="openPreviewVisible(scope.row.id)">产品资质</a>
                  <a size="mini" class="el-button--success" @click="productMessage(scope.row.pfpbId)">产品信息</a>
                  <a size="mini" class="el-button--success" @click="auditList(scope.row.id)">审核记录</a>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200px" v-if="way=='edit'">
                <template slot-scope="scope">
                  <div class="operates">
                    <span  v-if="!(scope.row.auditResult == 1 || scope.row.auditResult == 3)">
                      <a class="operation-btn"@click="audit(scope.row.id)">审核</a>
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
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 20, 30]"
              :total="resData.total"
              :page-size="resData.pageSize"
              :page-count="resData.pages"
              :current-page.sync="resData.pageNum">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="table-caption foot-btn">
      <div class="foot-left">
        <span><el-button type="default" @click="goBack" plain>返回</el-button></span>
      </div>
    </div>
    <audit v-if="audit" ref="audit" @refreshData="list"></audit>
    <file-preview ref="filePreview" @refresh="list()"></file-preview>
    <find-change-product-message ref="findChangeProductMessage"></find-change-product-message>
  </div>
</template>

<script>
  import {auditList, findTransferById} from 'src/axios/auditchanges/messageChanges/productTransferInfo';
  import audit from 'src/pages/auditchanges/auditManage/productTransferringAudit/audit'
  import filePreview from '../../messageChanges/productMessageTransferDialog/filePreview'
  import findChangeProductMessage from 'src/pages/auditchanges/messageDoubt/productMessageDoubt/findChangeProductMessage'

  export default {
    components: {
      filePreview,
      audit,
      findChangeProductMessage
    },
    data() {
      return {
        activeName: 'first',//标签页默认选中第一个
        transferId: undefined, // 查询初始化
        transferInfoId: undefined,
        resData: this.metaData(),
        way: undefined,
        transfer: this.transferData(),
      }
    },
    created() {
      this.transferId = this.$route.params.id;
      this.way = this.$route.params.way;
      this.list();
    },
    methods: {
      productMessage(id) {
        console.log(id)
        this.$nextTick(() => {
          this.$refs.findChangeProductMessage.list(id)
        })
      },
      openPreviewVisible(id) {
        this.updateDialog = true;
        this.$nextTick(() => {
          this.$refs.filePreview.openVisible(id, this.type)
        })
      },
      metaData() {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 1,
            pageSize: 20,
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
        }
      },
      transferData() {
        return {
          outOrgName: '',
          inOrgName: ''
        }
      },
      //  获取用户分页列表
      list() {
        findTransferById(this.transferId).then(res => {
          this.transfer = res.data;
        })
        auditList(this.resData, this.transferId, '1').then(res => {
          this.resData = res.data;
          console.log('wangqiming', this.resData)
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      auditList(transferInfoId) {
        this.formViewVisible = true;
        this.$nextTick(() => {
          this.$refs.audit.showForm(this.transferId, transferInfoId, 'detail');
        })
      },
      audit(transferInfoId) {
        this.formViewVisible = true;
        this.$nextTick(() => {
          this.$refs.audit.showForm(this.transferId, transferInfoId, 'edit');
        })
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      }
    },
    filters: {
      statusConvert: function (status) {
        if (status == null || status == '' || status == 'underfind') {
          return '待审核'
        } else {
          if (status == '1') {
            return "审核通过";
          }
          else if (status == '2') {
            return "审核中";
          }
          else if (status == '3') {
            return "审核不通过";
          }
        }
      }
    },
  }
</script>
<style scoped>
  .hiddenfont {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
