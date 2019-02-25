<template>
  <el-dialog
    width="80%"
    :close-on-click-modal="false"
    :visible.sync="visible" @close="close()">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="100px">
      <el-form-item label="审核记录：">
        <div class="tableset">
          <el-table border stripe :data="resData.list" height="250" style="width: 100%">
            <!--<el-table-column label="审核人">-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{ scope.row.userName }}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="审核时间">-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{ scope.row.dateAudit | dateConvert }}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="审核结果">
              <template slot-scope="scope">
                <span>{{ scope.row.stateAudit | statusConvert }}</span>
              </template>
            </el-table-column>
            <el-table-column label="审核备注">
              <template slot-scope="scope">
                <span>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>

      <div v-if="dataForm.way=='edit'">
        <el-form-item label="审核结果：" prop="auditState">
          <el-radio v-model="dataForm.auditState" label="0">同意</el-radio>
          <el-radio v-model="dataForm.auditState" label="1">不同意</el-radio>
        </el-form-item>

        <el-form-item label="审核备注：">
          <el-input type="textarea" :rows="3" v-model="dataForm.explain"></el-input>
        </el-form-item>
      </div>

    </el-form>
    <span slot="footer">
      <el-button @click="visible = false" v-if="dataForm.way=='detail'">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-if="dataForm.way=='edit'&& chickFlag ==0">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {auditList, insertProductTransferAudit} from 'src/axios/auditchanges/auditManage/productTransfer';
  import moment from 'moment';

  export default {
    name: "audit",
    data() {
      return {
        resData: this.metaData(),
        visible: false,
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        chickFlag:0
      }
    },
    methods: {
      metaData() {
        return {
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
      },
      metaForm() { // 表单数据初始化
        return {
          auditState: '0',
          transferId: undefined,
          transferInfoId: undefined,
          stateAudit: undefined,
          explain: undefined,
          way: undefined,
        }
      },
      metaRule() {
        return {
          auditState: [
            {required: true, message: '请选择是否通过审核', trigger: 'change'}
          ]
        }
      },
      list() {
        auditList(this.dataForm.transferInfoId).then(res => {
          this.resData.list = res.data;
          console.log(this.resData.list);
        })
      },
      showForm(transferId, transferInfoId, way) {
        this.visible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields();
        });
        this.dataForm.transferId = transferId;
        this.dataForm.transferInfoId = transferInfoId;
        this.dataForm.way = way;
        this.list();
      },
      dataFormSubmit() {
        this.chickFlag = 1;
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            if (this.dataForm.auditState == 0) {
              this.dataForm.stateAudit = '1';
            }
            else {
              this.dataForm.stateAudit = '3';
            }
            this.$confirm('此操作将审核选中的产品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              insertProductTransferAudit(this.dataForm).then(res => {
                this.chickFlag = 0;
                this.$message({
                  message: '提交成功',
                  type: 'success',
                });
                this.visible = false;
                this.dataForm = this.metaForm();
                this.$emit("refreshData");
              });
            }).catch(() => {
              this.visible = false;
              this.dataForm = this.metaForm();
              this.chickFlag = 0;
            });
          }
        });
      }
    },
    filters: {
      dateConvert: function (value) {
        if (value == null || value == '' || value == 'underfind') {
          return ''
        } else {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      statusConvert: function (status) {
        // 审核状态 （0.未提交、1.已提交（对方同意）、2.公式中、3.质疑中、4.澄清中、5.审核中、6.挂网中、7.数据处理中、8.需对方确认，9.数据中心处理中）
        if (status == null || status == '' || status == 'underfind') {
          return ''
        } else {
          if (status == '1') {
            return "审核通过";
          }
          else if (status == '2') {
            return "待确认";
          }
          else if (status == '3') {
            return "审核不通过";
          }
        }
      }
    },
  }
</script>
