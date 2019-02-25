<template>
  <el-dialog
    :title="'选择关联药品'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="search" ref="search"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">
          <el-form-item>
            <el-input v-model="search.searchContent" placeholder="通用名或编码" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" size="small">重置</el-button>
          </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        :row-key="getRowkeys"
        @selection-change="handleSelectionChange"
        border
        stripe>
        <el-table-column type="selection" :reserve-selection="true" width="50" align="center"></el-table-column>
        <el-table-column label="药品编码">
          <template slot-scope="scope">
            <a href="javascript:;">{{ scope.row.code }}</a>
          </template>
        </el-table-column>
        <el-table-column label="通用名" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.doseageFormCodeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.spec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位转换比" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.standRate }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer">
      <el-button size="small" type="primary" v-if="this.pharmType == 2" @click="choiceData()">取消关联</el-button>
      <el-button size="small" type="primary" v-if="this.pharmType != 2" @click="choiceData()">加入关联</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {getDrugs} from 'src/axios/datacenter/basedata/catatccategory/catatclist';
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "drugs-list",
    props: {
      pharmType:'',
      drugIds8:'',
      doseageIds:'',
      atcId:''
    },
    data() {
      return {
        visible: false,
        resData: this.metaData(),
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        choiceList:[],
        search:{
          searchContent:'',
          pharmType:'',
          codeType:'',
          drugIds8:'',
          doseageIds:'',
          atcId:''
        }
      }
    },
    created() {

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
      searchEnterFun(e){
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.metaList();
        })
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
        this.search.pharmType = this.pharmType;
        if(this.pharmType != '2'){
          this.search.atcId = '';
          this.search.drugIds8 = this.drugIds8;
          this.search.doseageIds = this.doseageIds;
        }else{
          this.search.atcId = this.atcId;
          this.search.drugIds8 = '';
          this.search.doseageIds = '';
        }
        getDrugs(this.search, this.resData).then(res => {
          this.resData = res.data
        })
      },
      fillData(id) {
        this.dataForm.id = id || undefined
        this.visible = true
        this.metaList();
      },
      choiceData(){
        this.visible = false
        let idsArr = this.choiceList.map(data=>{
          return data.code;
        })
        let ids = idsArr.join(',').toString();
        this.$emit('saveDrugIds20',ids)

      },
      getRowkeys(row){
        return row.id;
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
      // -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; 处理方法 &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
      //  获取用户分页列表
      list () {
        userList(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.metaList()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.metaList()
      },
      handleSelectionChange(val){
        this.choiceList=val
      }
    }
  }
</script>
