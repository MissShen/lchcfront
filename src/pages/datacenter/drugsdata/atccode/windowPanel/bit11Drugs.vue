<template>
  <el-dialog
    :title="'关联药品信息'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="query"  ref="query"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">
        <el-form-item>
          <el-select v-model="query.searchType" placeholder="通用名" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchContent" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
        </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        @selection-change="handleSelectionChange"
        border
        :row-key="getRowkeys"
        stripe>
        <el-table-column type="selection" :reserve-selection="true" width="50" align="center"></el-table-column>
        <el-table-column label="药品编码">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通用名" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="hiddenfont" slot="reference">{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.doseageFormCodeName }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer">
      <el-button size="small" type="primary" @click="choiceData()" v-if="this.pharmId == 0">加入关联</el-button>
      <el-button size="small" type="primary" @click="choiceData()" v-else>取消关联</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>

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
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {getDrugs} from 'src/axios/datacenter/basedata/catpharmcology/catnewpharmcology'
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "bit11-drugs",
    props: {
      pharmId:''
    },
    data() {
      return {
        visible: false,
        resData: this.metaData(),
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        query : this.metaQuery(),
        choiceList : [],
        options: [{
          value: '4',
          label: '通用名'
        },{
          value: '3',
          label: '编码'
        }],
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
      getRowkeys(row){
        return row.id;
      },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.metaList();
        })
      },
      metaList() {
        if(this.pharmId != '0'){
          this.query.pharmType = '1';
          this.query.pharmId = this.pharmId;
        }else{
          this.query.pharmType = '0';
        }
        this.query.codeType = '11';
        getDrugs(this.query, this.resData).then(res => {
        this.resData = res.data
      })
      },
      choiceData(){
        this.visible = false
        let idsArr =this.choiceList.map(data=>{
            return data.id
          })
        let ids = idsArr.join(',').toString()
        this.$emit('saveDrugIds',ids)

      },
      fillData(id,pharmId) {
        this.visible = true;
        this.metaList()
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
        return {// 前后台交互数据封装格式
          pageNum: 0,
          pageSize: 10,
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
      metaQuery () { // 表单查询数据初始化
        return {
          searchContent : "",
          searchType:'',
          codeType:'',
          pharmType:'',
          pharmId:''
        }
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
