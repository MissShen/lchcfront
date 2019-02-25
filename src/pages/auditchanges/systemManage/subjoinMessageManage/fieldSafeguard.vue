<template>
  <el-dialog
    :title="this.flag==0?'新增附加信息':'修改附加信息'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="48%"
    append-to-body
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
             label-width="90px" size="small" label-position="left" class="gap-40 form-bold">
      <el-form-item label="字段类型" prop="fieldType">
        <el-select v-model="dataForm.fieldType" placeholder="请选择" class="w70">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否有图" prop="hasImageFlag">
        <el-select v-model="dataForm.hasImageFlag" placeholder="请选择" class="w70">
          <el-option
            key="1"
            label="是"
            value="1">
          </el-option>
          <el-option
            key="0"
            label="否"
            value="0">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="图片类型名称" prop="fileTypeId" v-model="imageBox" v-if="dataForm.hasImageFlag == 1" label-width="108">
          <el-select v-model="dataForm.fileTypeId" placeholder="请选择" class="w50">
            <el-option v-for="item in imageTypeList"
                       :key="item.ID"
                       :label="item.NAME"
                       :value="item.ID"></el-option>
          </el-select>
      </el-form-item>

      <el-form-item label="示范提示">
        <el-input v-model="dataForm.tipText" placeholder="请输入" class="w70"></el-input>
      </el-form-item>

      <el-form-item label="示范地址">
        <el-input v-model="dataForm.tipUrl" placeholder="请输入" class="w70"></el-input>
      </el-form-item>

      <el-form-item label="字段说明">
        <el-input v-model="dataForm.remark" placeholder="请输入" class="w70"></el-input>
      </el-form-item>
      <el-form-item label="选项定义" prop="remark" v-if="dataForm.fieldType=='4'||dataForm.fieldType=='5'||dataForm.fieldType=='6'">
        <el-input type="textarea" v-model="dataForm.options" placeholder="字段名:字段值:是否默认选中;字段名:字段值:是否默认选中;例如A:B:1;"
                  class="w70"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
          <!--<el-button type="warning" @click="addToView">增加</el-button>-->
          <el-button size="small" @click="closeVisible">返回</el-button>
          <el-button size="small" type="success" @click="addToView">保存</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import {imageTypeList} from "src/axios/auditchanges/systemManage/subjoinMessageManage"

  export default {
    name: "field-safeguard",
    data() {
      return {
        dataForm: this.metaForm(),
        imageIf: false,
        imageBox: false,
        dataRule: this.metaRule(),
        visible: false,
        imageTypeList: undefined,
        dataList: undefined,
        states: '',
        flag: 0,
        dataListIndex:'',//修改传过来的id
        options: [{
          value: '1',
          label: '文本框'
        }, {
          value: '2',
          label: '多行文本框'
        }, {
          value: '3',
          label: '日期框'
        }, {
          value: '4',
          label: '下拉框'
        }, {
          value: '5',
          label: '多选框'
        }, {
          value: '6',
          label: '单选框'
        }]
      }
    },
    methods: {
      closeVisible() {
        this.visible = false;
        this.dataForm = this.metaForm();
      },
      metaForm() {
        return {
          fieldType: undefined,
          'catAttachedDictionary.hasImageFlag': undefined,
          imageTypeList: this.searchImage(),
          fileTypeId: undefined,
          tipText: undefined,
          tipUrl: undefined,
          remark: undefined,
          options: undefined
        }
      },
      metaRule() {
        return {
          fieldType: [
            {required: true, message: '字段类型必须选择', trigger: 'blur'}
          ],
          fileTypeId: [
            {required: true, message: '必须选择图片类型', trigger: 'blur'},
          ],
          remark: [
            {required: true, message: '必须定义选项', trigger: 'blur'},
          ],
        }
      },
      searchImage() {
        return {
          ID: undefined,
          NAME: undefined
        }
      },
      addToView() {
          if (this.dataForm.fieldType == '1' || this.dataForm.fieldType == '2' || this.dataForm.fieldType == '3') {
            'NOTNEED' + this.dataForm.fieldType;
          } else {
            'NEEDCUT' + this.dataForm.fieldType;
          }
// console.log(this.dataList,'this.dataList')
//         console.log(this.dataListIndex,'dataListIndex')
//         console.log(this.dataList[this.dataListIndex],'this.dataList[this.dataListIndex]')
        if(this.flag==0){//新增
          this.dataList.push({
            'fieldType': this.dataForm.fieldType,
            'hasImageFlag': this.dataForm.hasImageFlag,
            'fileTypeId': this.dataForm.fileTypeId,
            'tipText': this.dataForm.tipText,
            'tipUrl': this.dataForm.tipUrl,
            'remark': this.dataForm.remark,
            'options': this.dataForm.options
          })
        }else{//修改
            this.dataList[this.dataListIndex]=this.dataForm
        }
          console.log(this.dataList)
        this.visible = false;
        this.dataForm = this.metaForm();
      },
      metaList() {
        this.$nextTick(() => {
          console.log(this.states)
          imageTypeList(this.states).then(res => {
            console.log(res.data);
            this.imageTypeList = res.data
          })
        })
        if (this.dataForm.id) {
        }
      }
      ,
      fillData(list, states, flag, index) {
        this.flag = flag;//判断新增0/修改1
        this.states = states;
        this.visible = true;
        this.dataListIndex = index;
        this.metaList();
        if (flag == 0) {
          this.dataList = list;
        } else if (flag == 1) {
          this.dataList = list;
          this.dataForm = list[index];
          console.log(this.dataForm)
        } else {
          console.log('传参错误')
        }
        console.log("states", states);//字段类型
        console.log("index", index);//字段id
        console.log("list", list);//列表信息
        console.log("flag", flag);
      }
      ,
    }
  }
</script>

<style scoped>

</style>
