<template>
  <el-dialog
    :title="'假冒药记录'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table :data="resData.list">
          <el-table-column label="被抽样单位类型">
            <template slot-scope="scope">
              <span>{{ getType(scope.row.SAMPLED_ORG_TYPE) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="被抽样单位名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.SAMPLED_ORG_NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公告药品名" width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.DRUG_NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.DRUG_SPEC }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品批号" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.PERMIT_NUMBER }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="hiddenfont" slot="reference">{{ scope.row.MANUFACTURER_NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公报期数" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.PROCLAMATION_NUMBER }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总期数" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.PROCLAMATION_TOTAL }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    <span slot="footer">
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";

  import {queryCounterfeitMedicineRecording} from 'src/axios/datacenter/orgdata/sell/seller'

  export default {
    components: {ElCol},
    name: "fake-drugs",
    props: {
      parentId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        visible: false,
        resData: this.metaData(),
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
      }
    },
    created() {
      this.metaList()
    },
    methods: {
      metaForm() {
        return {
          id: undefined,
          parentId: undefined,
          menuName: undefined,
          shortcutMenuName: undefined,
          menuUrl: undefined,
          orderNum: undefined,
          remark: undefined,
          isShortcutMenu: '0'
        }
      },
      metaRule() {
        return {
          menuName: [
            {required: true, message: '菜单名称不能为空', trigger: 'blur'},
            {min: 1, max: 10, message: '菜单名称长度大于1小于10', trigger: 'blur'}
          ],
          shortcutMenuName: [
            {required: true, message: '菜单名称简写不能为空', trigger: 'blur'},
          ],
          menuUrl: [
            {required: true, message: '菜单路径不能为空', trigger: 'blur'},
          ],
        }
      },
      metaList() {
        this.dataForm.parentId = this.parentId
        queryCounterfeitMedicineRecording(this.dataForm.parentId).then(res => {
          console.log("==>", res);
          this.resData = res.data;
        })
      },
      // ---------------
      fillData(id) {
        this.dataForm.id = id || undefined
        this.visible = true
        /* this.$nextTick(() => {
         this.$refs['dataForm'].resetFields()
         })
         if (this.dataForm.id) {
         menuView(this.dataForm.id).then(res => {
         this.dataForm = res.data
         })
         }*/
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = this.dataForm.id ? menuLevelTwoUpdate(this.dataForm) : menuLevelTwoSave(this.dataForm)
            http.then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false;
                  this.$emit('refreshData');
                }
              })
            })
          }
        })
      },
      metaData () {
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
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            code: undefined,
            name: undefined,
            beginDate: undefined,
            endDate: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        userList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      getType(status) {
        const arr = ["经营企业", "医院药店", "生产企业"];
        return arr[status]
      }
    }
  }
</script>
