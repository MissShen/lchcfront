<template>
  <div>
    <div class="tabs-panel">
      <span class="active">本次转移产品</span>
    </div>

    <h4 style="padding: 10px; text-align: center;">将 「<span class="red">保定天浩制药有限公司</span>」 以下产品转移到 「<span class="red">江西天施康弋阳制药有限公司</span>」
    </h4>

    <div class="tablebox">
      <el-tabs v-model="activeName">
        <el-tab-pane label="本次转移产品" name="first">
          <div class="tableset">
            <el-table
              :data="resData.list"
              border
              stripe>
              <el-table-column label="序号" type="index" width="50"></el-table-column>
              <el-table-column label="产品名称">
                <template slot-scope="scope">
                  <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.productName">
                    <span class="hiddenfont" slot="reference">{{ scope.row.productName }}</span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="商用名">
                <template slot-scope="scope">
                  <span>{{ scope.row.goodsName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="剂型" width="130">
                <template slot-scope="scope">
                  <span>{{ scope.row.dosage }}</span>
                </template>
              </el-table-column>
              <el-table-column label="规格" width="120">
                <template slot-scope="scope">
                  <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.specification">
                    <span class="hiddenfont" slot="reference">{{ scope.row.specification }}</span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="转换比" width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.conversion }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位" width="50">
                <template slot-scope="scope">
                  <span>{{ scope.row.units }}</span>
                </template>
              </el-table-column>
              <el-table-column label="包材" width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.packingMaterials }}</span>
                </template>
              </el-table-column>
              <el-table-column label="生产企业">
                <template slot-scope="scope">
                  <el-popover placement="top-start" width="200" trigger="hover" :content="scope.row.manufacture">
                    <span class="hiddenfont" slot="reference">{{ scope.row.manufacture }}</span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <div class="operates">
                    <span>
                      <a href="javascript:;" class="operation-btn" @click="openPreviewVisible(scope.row.id)" size="small">产品资质</a>
                    </span>
                    <span>
                         <a href="javascript:;" class="operation-btn" @click="productMessage(scope.row.id)" size="small">产品信息</a>
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
        <span><el-button type="primary" @click="confirm" v-if="confirmEnable" size="small">确认</el-button></span>
        <span><el-button type="default" @click="goBack" plain size="small">返回</el-button></span>
      </div>
    </div>
    <file-preview ref="filePreview" @refresh="list()"></file-preview>
    <find-change-product-message ref="findChangeProductMessage"></find-change-product-message>
  </div>
</template>

<script>
  import {findUpProductTransferInfos} from 'src/axios/auditchanges/messageChanges/productTransferInfo'
  import filePreview from '../../messageChanges/productMessageTransferDialog/filePreview'
  import findChangeProductMessage from 'src/pages/auditchanges/messageDoubt/productMessageDoubt/findChangeProductMessage'
  export default {
    components: {filePreview,findChangeProductMessage},
    data() {
      return {
        resData: this.metaData(),
        activeName: 'first',//标签页默认选中第一个
        query: this.metaQuery(),
        confirmEnable: true,
      }
    },
    created() {
      var transferId = this.$route.params.id;
      this.query.id = transferId;

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
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
      metaQuery() { // 表单查询数据初始化
        return {
          query: {
            id: undefined
          }
        }
      },
      list() {
        findUpProductTransferInfos(this.resData, this.query).then(res => {
          this.resData = res.data
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
          if (this.resData.list =='' || this.resData.list.size <= 0) {
            this.confirmEnable = false;
          }
        })
      },
      confirm() {
        alert("xx");
      },
      goBack() {
        this.$router.go(-1);
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

