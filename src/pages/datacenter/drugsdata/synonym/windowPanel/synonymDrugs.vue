<template>
  <el-dialog
    :title="'关联药品'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">
        <el-form-item>
          <el-input v-model="dataForm.text" placeholder="通用名或编码" size="small" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
          <el-button type="warning" size="small">重置</el-button>
        </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        :row-key="getRowkeys"
        stripe>
        <el-table-column type="selection" width="50" align="center" :reserve-selection="true"></el-table-column>
        <el-table-column label="药品编码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.CODE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通用名" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.NAME_CHN }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.CDF_NAME_CHN }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operates"><a class="operation-btn" @click="myFun(scope.row.CODE, scope.row.NAME_CHN, scope.row.CDF_NAME_CHN, scope.row.ID)">选择</a></div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer">
      <el-button size="small" type="" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";

  import {queryDrugList} from 'src/axios/datacenter/drugdata/synonym/synonym';
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "synonym-drugs",
    props: {
      // parentId: {
      //   type: String,
      //   required: true
      // }
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
    },
    methods: {
      metaForm() {
        return {
          text: '',
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
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.metaList();
        })
      },
      getRowkeys(row){
        return row.ID;
      },
      metaList() {
        queryDrugList(this.dataForm, this.resData).then( res => {
          this.resData = res.data;
          console.log("this.resData===>", this.resData)
        })
      },
      fillData() {
        // this.dataForm.id = id || undefined
        this.visible = true
        this.metaList()
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

      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },
      myFun(code, name, dos, id) {
        // fatherFun
        this.$emit('fatherFun', code, name, dos, id);

        this.visible = false;

      }
    }
  }
</script>
