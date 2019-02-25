<template>
  <el-dialog
    :title="this.flag==0?'新增附加信息':'修改附加信息'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="70%"
    append-to-body
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="90px" size="small" label-position="left" class="gap-40 form-bold">
      <el-form-item label="所属项目">
        <el-select v-model="dataForm.catProjectId" placeholder="选择项目" class="w50">
          <el-option
            v-for="item in proList"
            :key="item.ID"
            :label="item.PROJECT_NAME"
            :value="item.ID">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="信息类型">
        <el-select v-model="dataForm.attachedType" placeholder="信息类型" class="w50">
          <el-option
            label="企业"
            value="1">
          </el-option>
          <el-option
            label="产品"
            value="2">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字段组名称">
        <el-input v-model="dataForm.dicName" class="w50" placeholder="字段组名称"></el-input>
      </el-form-item>
      <el-form-item label="字段维护">
        <el-button type="" size="small" @click="handleFromView(0)">
          新增
        </el-button>
        <el-table :data="dataList" border stripe class="martop5">
          <el-table-column label="字段类型">
            <template slot-scope="scope">
              {{ scope.row['fieldType']=='NOTNEED1'?'文本框':
              scope.row['fieldType']=='NOTNEED2'?'多行文本框':
              scope.row['fieldType']=='NOTNEED3'?'日期框':
              scope.row['fieldType']=='NEEDCUT4'?'下拉框':
              scope.row['fieldType']=='NEEDCUT5'?'复选框':
              scope.row['fieldType']==1?'文本框':
              scope.row['fieldType']==2?'多行文本框':
              scope.row['fieldType']==3?'日期框':
              scope.row['fieldType']==4?'下拉框':
              scope.row['fieldType']==5?'复选框':'单选框'}}
            </template>
          </el-table-column>
          <el-table-column label="是否有图">
            <template slot-scope="scope">
              {{scope.row['hasImageFlag']=='1'?'有图':scope.row['hasImageFlag']=='0'?'无图':null}}
            </template>
          </el-table-column>
          <el-table-column label="字段说明" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row['remark'] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <div class="operates">
                <span><a class="operation-btn" type="text" size="small" @click="up(scope.$index)">上移</a></span>
                <span><a class="operation-btn" type="text" size="small" @click="down(scope.$index)">下移</a></span>
                <span><a class="operation-btn" type="text" size="small" @click="handleFromView(1,scope.$index)">修改</a></span>
                <span><a class="operation-btn" type="text" size="small" @click="deleteField(scope.$index)">删除</a></span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button size="small" @click="closeVisible()">返回</el-button>
      <el-button size="small" type="primary" v-if="this.flag == 0" @click="dataFormSubmit()">保存</el-button>
      <el-button size="small" type="primary" v-if="this.flag == 1" @click="updateSubjoinMessage()">提交</el-button>
    </span>
    <field-safeguard v-if="fieldSafeguardView" ref="FieldSafeguard"></field-safeguard>
  </el-dialog>
</template>

<script>

  import {
    proList,
    AddSubjoinMessage,
    updateSubjoinMessage,
    messageGoback
  } from "src/axios/auditchanges/systemManage/subjoinMessageManage";
  import FieldSafeguard from "./fieldSafeguard";

  export default {
    components: {FieldSafeguard},
    name: "add-or-up",
    data() {
      return {
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        visible: false,
        proList: undefined,
        fieldSafeguardView: false,
        dataList: [],
        flag: 0,
        subjoinMessage: this.messageData(),
        messageId:''
      }
    },
    created() {
      this.list()
      this.metaList()
    },
    methods: {
      closeVisible(){
        this.visible=false;
        this.dataForm = this.metaForm();
        this.dataList = [];
      },
      deleteField(index) {
        this.dataList.splice(index, 1)
      },
      messageData() {
        return {
          catProjectId: '',
          attachedType: '',
          dicName: '',
          list: []
        }
      },
      up(index) {
        var tmp = this.dataList[index];
        this.dataList.splice(index, 1);
        this.dataList.splice(index - 1, 0, tmp);
      },
      down(index) {
        var tmp = this.dataList[index];
        this.dataList.splice(index, 1);
        this.dataList.splice(index + 1, 0, tmp);
      },
      handleFromView(flag,index) {
        this.fieldSafeguardView = true;
        this.$nextTick(() => {
          this.$refs.FieldSafeguard.fillData(this.dataList,this.dataForm.attachedType,flag,index)
        })
      },
      metaForm() {
        return {
          id: undefined,
          dicName: undefined,
          catProjectId: undefined,
          attachedType: undefined,
          dataList: this.dataList,
          proList: this.searchPro(),
          visible: false
        }
      },
      list() {
        proList().then(res => {
          this.proList = res.data
        })
      },
      metaRule() {
        return {
          categoryName: [
            {required: true, message: '类别名称不能为空', trigger: 'blur'}
            /*{ min: 1, max:10, message: '菜单名称长度大于1小于10', trigger: 'blur' }*/
          ],
          catProjectId: [
            {required: true, message: '所属系统不能为空', trigger: 'blur'},
          ],
        }
      },
      metaList() {
        this.$nextTick(() => {
          //this.$refs['dataForm'].resetFields()
          proList().then(res => {
            this.proList = res.data
          })
        })
        if (this.dataForm.id) {
        }
      },
      // ---------------
      updateSubjoinMessage() {
        this.dataForm.id = this.messageId;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = updateSubjoinMessage(this.dataForm, this.dataList)
            http.then(res => {
              this.visible = false
              if (res.data == 1) {
                this.$message({
                  message: "保存成功",
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.$emit("refreshData");
                  }
                })
              } else {
                this.$message({
                  message: "保存失败",
                  type: 'error'
                })
              }
            })
          }
        })
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = AddSubjoinMessage(this.dataForm, this.dataList)
            http.then(res => {
              this.visible = false
              if (res.data == 1) {
                this.$message({
                  message: "保存成功",
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.$emit("refreshData");
                  }
                })
              } else {
                this.$message({
                  message: "保存失败",
                  type: 'error'
                })
              }
            })
          }
        })
      },
      fillData(flag, id) {
        this.visible = true
        this.flag = flag
        if (flag != 0) {
          messageGoback(id).then(res => {
            this.dataForm = res.data
            this.dataForm.catProjectId = res.data.id;
            this.dataList = res.data.catAttachedDictionaryDomains;
          })
          this.messageId = id;
        }
      },
      restFrom() {

      },
      searchPro() {
        return {
          proList: {
            ID: undefined,
            PROJECT_NAME: undefined
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
