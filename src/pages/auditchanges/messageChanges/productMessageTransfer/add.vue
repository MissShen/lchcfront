<template>
  <!--新增产品转产模态框-->
  <el-dialog title='请选择转出企业和更新类型' :close-on-click-modal="false" :visible.sync="visible" width="40%"
  >
    <!--@keyup.enter.native="dataFormSubmit()"-->
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px" size="small">

      <el-form-item label="转出企业" prop="orgId">
        <el-select v-model="dataForm.orgId" filterable remote reserve-keyword placeholder="转出企业名称"
                   :remote-method="selectQuery" :loading="loading" clearable @change="orgChangeEvn">
          <el-option v-for="item in options" :key="item.id" :label="item.value" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="更新类型" prop="upTypeId">
        <el-select v-model="dataForm.upTypeId" placeholder="请选择变更类型" @change="selectProductCount">
          <el-option v-for="item in upTypes" :key="item.id" :label="item.value" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <div v-if="dataForm.upTypeId=='DATA00000000000000325048'">
        <el-form-item label="需要代理企业确认:" prop="isConfirm">
          <el-radio v-model="dataForm.isConfirm" label="1">是</el-radio>
          <el-radio v-model="dataForm.isConfirm" label="0">否</el-radio>
        </el-form-item>
        <span>若选择不需要代理企业确认，您必须上传《代理企业授权书》和《产品单包装图片》</span>
      </div>

    </el-form>
    <span slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :disabled="productCount<=0">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    add,
    queryOrgProducts,
    getUpProductTransferById
  } from "src/axios/auditchanges/messageChanges/productTransfer";
  import {
    otherOrgs
  } from "src/axios/auditchanges/common/catOrg";
  import {
    findByOperatorType
  } from "src/axios/auditchanges/messageChanges/upType";
  import {
    orgMerge
  } from "src/axios/auditchanges/messageChanges/productTransferInfo";

  export default {
    name: "product-transfer-add",
    data() {
      return {
        activeName: "first",
        upTypes: [],
        outOrgs: [],
        visible: false,
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        type: "",
        options: [],
        loading: false,
        productCount: 0,
        orgId:''
      };
    },
    created() {
      //  this.getUpTypes();
      //  this.loadOtherOrgs();
    },
    methods: {
      selectProductCount(id){
        this.flag = '';
        if(id=='DATA00000000000000326290'){
          this.flag = '1'
        }else if(id=='DATA00000000000000326291'||id=='DATA00000000000000326292'||id=='DATA00000000000000325048'){
          this.flag = '2'
        }
        queryOrgProducts(this.orgId,this.flag).then(res => {
          this.productCount = res.data;
        });
      },
      metaForm() {
        return {
          upTypeId: "",
          transferId: "",
          orgId: undefined,
          orgName: undefined,
          isConfirm: "0"
        };
      },
      showForm() {
        this.visible = true;
        this.getUpTypes();
        this.loadOtherOrgs();
        this.$nextTick(() => {
          this.$refs["dataForm"].resetFields();
        });
      },
      dataFormSubmit() {
        this.$refs["dataForm"].validate(valid => {
          if (valid) {
            //0.国产，1.进口，2.进口分装
            //1:国产，2：进口分类
            this.outOrgId = this.dataForm.orgId
            getUpProductTransferById(this.dataForm.orgId,this.dataForm.upTypeId).then(res => {
              if (res.data===0) {
                if (this.dataForm.upTypeId == 'DATA00000000000000326290'/*DATA00000000000000326290国内生产企业转产并购*/) {
                  this.$confirm('您选择的是 国内生产企业转产并购，系统将会为您申请全部产品转移！', '提示', {
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    add(this.dataForm).then(res => {
                      this.transferId = res.data.id;
                      if (this.dataForm.upTypeId == "DATA00000000000000326290") {
                        orgMerge(this.transferId).then(res => {
                          console.log("国产并购。。。");
                        });
                      }
                      this.$router.push(
                        "/AUDIT/messageChanges/productMessageTransferEdit/" +
                        this.transferId +
                        "/" +
                        this.dataForm.upTypeId +
                        "/add/" +
                        this.dataForm.orgId
                      );
                    });
                  });
                }
                else {
                  add(this.dataForm).then(res => {
                    this.transferId = res.data.id;
                    this.$router.push(
                      "/AUDIT/messageChanges/productMessageTransferEdit/" +
                      this.transferId +
                      "/" +
                      this.dataForm.upTypeId +
                      "/edit/" +
                      this.dataForm.orgId
                    );
                  });
                }
              }
              else if(res.data === 1){
                this.$message({
                  type: 'error',
                  message: '该转产已存在，并转产类型为国内生产企业转产并购，请核对后操作'
                })
              }
              else if(res.data===2){
                this.$message({
                  type: 'error',
                  message: '该转产已存在，请勿重复操作'
                })
              }
            })
          }
        });
      },
      metaRule() {
        return {
          orgId: [{
            required: true,
            message: "请输入转出机构名称",
            trigger: "change"
          }],
          upTypeId: [{
            required: true,
            message: "请选择变更类型",
            trigger: "change"
          }],
          isConfirm: [{
            required: true,
            message: "请选择是否需要转出企业确认",
            trigger: "change"
          }]
        };
      },
      loadOtherOrgs() {
        otherOrgs().then(res => {
          this.outOrgs = res.data;
          console.log(res.data)
        });
      },
      getUpTypes() {
        findByOperatorType(this.upTypes).then(res => {
          this.upTypes = res.data;
        });
      },
      selectQuery(query) {
        if (query !== "") {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.outOrgs.filter(item => {
              return item.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      },
      orgChangeEvn(id) {
        let obj = {};
        obj = this.options.find(item => {
          return item.id === id;
        });
        this.dataForm.orgName = obj.value;
        this.orgId = id;
      },
    }
  };
</script>
