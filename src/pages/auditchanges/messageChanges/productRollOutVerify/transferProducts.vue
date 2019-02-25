<template>
  <!-- 表格 -->
  <div class="tablebox">
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe @selection-change="handleSelectionChange">
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
        <el-table-column label="是否同意">
          <template slot-scope="scope">
            <span>{{ scope.row.processingState|statusConvert }}</span>
          </template>
        </el-table-column>
        <el-table-column label="理由" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.processingReason }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a class="operation-btn" @click="openPreviewVisible(scope.row.id)" size="small">产品资质</a>
            <span v-if="way=='edit'">
              <el-radio-group v-model="scope.row.processingState">
                    <el-radio v-if="scope.row.processingState ==2" label="2">同意</el-radio>
                    <el-radio v-else label="1">同意</el-radio>
                    <div @click="radioChange(0,scope.row)">
                      <el-radio label="0">不同意</el-radio>
                    </div>
              </el-radio-group>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="table-caption foot-btn">
      <div class="foot-left">
        <el-button type="primary" v-if="flag=='0'" @click="submitConfirm">提交</el-button>
        <el-button type="" @click="goBack">返回</el-button>
      </div>
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
    <el-dialog top="2vh" :close-on-click-modal="false" width="50%" :visible.sync="visible">
      <div>
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px">
          <el-form-item label="理由" prop="reason">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="dataForm.reason">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" style="float: inherit">
      <el-button @click="visible=false">取消</el-button>
      <el-button type="primary" @click="refuseConfirm">确定</el-button>
    </span>
    </el-dialog>
    <file-preview ref="filePreview" @refresh="list()"></file-preview>
  </div>
</template>

<script>
  import {
    auditList,
    productTransferAffirmNo,
    productTransferAffirm
  } from 'src/axios/auditchanges/messageChanges/productTransferInfo';
  import filePreview from '../../messageChanges/productMessageTransferDialog/filePreview'

  export default {
    //初始化函数
    name: 'product-transfer',
    components: {
      filePreview
    },
    data() {
      return {
        resData: this.metaData(),
        activeName: 'first',//标签页默认选中第一个
        dataForm: this.metaForm(), // 表单初始化
        showForm: false, // 表单可见性初始化
        transferId: undefined,
        dataRule: this.metaRules(),
        status: '1',
        way: undefined,
        visible: false,
        arrCheckeds: [],
        commitList: [],
        idChoose: '',
        allState: '',
        changeState: [],
        flag: ''
      }
    },
    //初始化函数
    created() {
      //初始化列表
      this.transferId = this.$route.params.id;
      this.way = this.$route.params.way;
      this.flag = this.$route.params.flag;
      this.list()
    },
    methods: {
      openPreviewVisible(id) {
        this.updateDialog = true;
        this.$nextTick(() => {
          this.$refs.filePreview.openVisible(id, this.type)
        })
      },
      addToArray(id, type, states) {
        this.commitList.forEach(function (item) {
          if (item.proId == id) {
            item.type = type;
            item.states = states;
          } else {
            this.commitList.push({
              'proId': id,
              'type': type,
              'states': states
            })
          }
        })
      },
      list() {
        //0:未审核
        auditList(this.resData, this.transferId, null).then(res => {
          console.log(res, 'resooooo')
          this.resData = res.data;
          if (this.resData.pageNum == 0) {
            this.resData.pageNum = 1;
          }
          this.resData.list.forEach(item => {
            console.log(item.processingState)
            !item.processingState ? item.processingState = '2' : item.processingState = item.processingState;
          })
        })
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
          pageNum: 1,
          pageSize: 10,
          id: undefined,
          inOrgName: undefined,
          outOrgName: undefined,
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
          list: []
        }
      },
      metaForm() { // 表单数据初始化
        return {
          reason: undefined
        }
      },
      metaRules() {
        return {
          reason: [
            {required: true, message: '请输入原因', trigger: 'blur'}
          ]
        }
      },
      refuseConfirm() {
        this.$confirm("此操作不会转出选中产品, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          // batchRefuse(this.transferId, this.arrCheckeds, this.dataForm.reason).then(res => {
          //   this.visible = false;
          //   this.list();
          // });
          if (this.dataForm.reason == '' || this.dataForm.reason == null || this.dataForm.reason == undefined) {
            this.visible = false;
            this.$message({
              message: '请输入理由！',
              type: 'error'
            });
          }
          else {
            productTransferAffirmNo(this.idChoose, 0, this.dataForm.reason).then(res => {
              this.list();
              this.idChoose = ''
              this.dataForm.reason = ''
            })
            for (var i = 0; i < this.resData.list.length; i++) {
              if (this.idChoose == this.resData.list[i].id) {
                this.resData.list[i].processingReason = this.dataForm.reason;
                this.visible = false;
              }
            }
          }

        });
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      handleSelectionChange(val) {
        this.arrCheckeds = [];
        this.multipleSelection = val;
        for (let i in this.multipleSelection) {
          this.arrCheckeds.push(this.multipleSelection[i].id);
        }
      },
      radioChange(labelNum, item) {//同意与不同意
        if (labelNum == '0') {
          this.visible = true;
          this.idChoose = item.id;
        }
      },
      submitConfirm() {//提交
        console.log(this.resData.list, 'this.resData.list');
        for (var i = 0; i < this.resData.list.length; i++) {
          this.changeState[i] = {};
          this.changeState[i].id = this.resData.list[i].id;
          this.changeState[i].stateAudit = this.resData.list[i].processingState;
          this.changeState[i].remark = this.resData.list[i].processingReason;
        }
        this.allState = this.resData.list.some(item => item.processingState == '1');
        if (this.allState) {
          this.allState = '1'
        } else {
          this.allState = '0'
        }
        ;
        productTransferAffirm(this.transferId, this.allState, this.changeState).then((res) => {
          // console.log(res)
          if (res.success) {
            this.$message('提交成功');
            this.$router.push("/AUDIT/orgAffirm/productRollOutVerifyList");
          } else {
            this.$message('提交失败')
          }
        })
      },
      goBack() {
        this.$router.push("/AUDIT/orgAffirm/productRollOutVerifyList");
      }
    },
    filters: {
      statusConvert: function (status) {
        //if (status == null || status == '' || status == 'undefined') {
        if (status == '2') {
          return '未处理'
        } else {
          if (status == '0') {
            return "拒绝";
          }
          else if (status == '1') {
            return "同意";
          }
        }
      },
      resultConvert: function (status) {
        // 审核结果(0.未审核，1.审核通过，2.待确认，3.审核不通过)
        if (status == null || status == '' || status == 'undefined') {
          return '未审核'
        } else {
          if (status == '0') {
            return "审核不通过";
          }
          else if (status == '1') {
            return "审核通过";
          }
        }
      }
    }
  }
</script>
