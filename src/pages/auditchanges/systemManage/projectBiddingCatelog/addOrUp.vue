<template>
  <el-dialog
    width="50%"
    :title="dataForm.id == '0'?'新增':'修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="100px" label-position="left" size="small" class="gap-40 form-bold">
      <el-row>
        <el-col>
          <el-form-item label="所属项目" prop="catProjectId">
            <el-select v-model="dataForm.catProjectId" placeholder="请选择" class="w70">
              <el-option v-for="item in projectList"
                         :key="item.id"
                         :label="item.projectName"
                         :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="">
          <el-form-item label="目录编号" prop="finalCode">
            <el-input v-model="dataForm.finalCode" placeholder="请输入" class="w70"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
      <el-form-item label="标的物类别" prop="ydProjectBiddingCategoryId">
        <el-select v-model="dataForm.ydProjectBiddingCategoryId" placeholder="请选择" class="w70">
          <el-option v-for="item in categoryList"
                     :key="item.id"
                     :label="item.categoryName"
                     :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
        </el-col>
      </el-row>
      <!--<el-form-item label="药品通用名" prop="catDrugId" width="317px">-->
        <!--<el-select v-model="dataForm.catDrugId" filterable :filter-method="filterMethod" :loading="loading" placeholder="请选择">-->
      <el-row>
        <el-col>
      <el-form-item label="药品通用名" prop="catDrugId">
        <el-select v-model="dataForm.catDrugId" placeholder="请选择" class="w70">
          <el-option v-for="item in drugList"
                     :key="item.ID"
                     :label="item.NAMECHN"
                     :value="item.ID"
          >
          </el-option>
        </el-select>
      </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
      <el-form-item label="合并剂型"  prop="dosageFormGroupId">
        <el-select v-model="dataForm.dosageFormGroupId" placeholder="请选择" class="w70">
          <el-option v-for="item in dosageList"
                     :key="item.id"
                     :label="item.groupName"
                     :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
      <el-form-item label="合并规格" prop="specGroup">
        <el-input type="textarea"  :rows="3" v-model="dataForm.specGroup" placeholder="规格以“;”分割，例如5ml;5mg" class="w70"></el-input>
      </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
      <el-form-item label="备注" prop="remark" >
        <el-input type="textarea" :rows="3" v-model="dataForm.remark" placeholder="请输入" class="w70"></el-input>
      </el-form-item>
      </el-col>
      </el-row>


    </el-form>
    <div slot="footer" class="btncenter">
      <el-button @click="goBack()" size="small">返回</el-button>
      <el-button type="primary" @click="dataFormSubmit()" size="small">提交</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import {projectList,categoryList,dosageList,insert,update,findById,drugList} from "src/axios/auditchanges/systemManage/projectBiddingCatelog"
  export default {
    data() {
      return {
        visible:false,
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        projectList: undefined,
        categoryList: undefined,
        dosageList: undefined,
        drugList: undefined,
        resData:this.metaDataForm(),
        selectList:undefined,
        loading:false
      }
    },
    created() {
    },
    methods: {
      metaDataForm(){
        return {
            pageNum: 0,
            pageSize: 1000,
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
      },
      metaForm() {
        return {
          id: undefined,
          catProjectId: undefined,
          ydProjectBiddingCategoryId: undefined,
          catDrugId: undefined,
          specGroup:undefined,
          dosageFormGroupId:undefined,
          remark: undefined
        }
      },
      metaRule() {
        return {
          finalCode: [
            { required: true, message: '目录编号不能为空', trigger: 'blur' }
            /*{ min: 1, max:10, message: '菜单名称长度大于1小于10', trigger: 'blur' }*/
          ],
          catProjectId: [
            { required: true, message: '所属项目不能为空', trigger: 'blur' },
          ],
          ydProjectBiddingCategoryId: [
            { required: true, message: '标的物类别不能为空', trigger: 'blur' },
          ],
          catDrugId: [
            { required: true, message: '药品通用名不能为空', trigger: 'blur' },
          ],
          dosageFormGroupId: [
            { required: true, message: '合并剂型不能为空', trigger: 'blur' },
          ]
        }
      },
      metaList(id) {
        this.dataForm = this.metaForm();
        this.dataForm.id = id;
            if(this.dataForm.id!='0'){
               findById(this.dataForm.id).then(res => {
                 this.dataForm = res.data
                })
            }
        drugList(this.resData).then(res => {
          console.log("=============================")
          this.drugList = res.data.list
        })

           projectList().then(res => {
           this.projectList = res.data
           })

            categoryList().then(res => {
            this.categoryList = res.data
           })

            dosageList().then(res => {
              this.dosageList = res.data
            })


             this.visible= true;
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = this.dataForm.id != '0' ?  update(this.dataForm):insert(this.dataForm)
            http.then(res => {
              this.$message({
                message: '保存成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$emit('refreshData')
                  this.visible = false;
                }
              })
            })
          }
        })
      },
      goBack() {
        this.visible = false;
      },
      filterMethod(query) {
        this.resData.pageSize=100000;
        drugList(this.resData).then(res => {
          console.log("=============================")
          this.drugList = res.data.list
          this.selectList = this.drugList.map(item =>{
            return {value:item.ID,label:item.NAMECHN}
          })
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.drugList = this.selectList.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.drugList = [];
        }
        })
      }
    }
  }
</script>

<style scoped>
.btncenter{
padding-left:120px;
}
</style>
