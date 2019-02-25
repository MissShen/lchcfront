<template>
  <el-dialog
    :title="'选择药品名称'"
    :close-on-click-modal="false"
    width="80%"
    :visible.sync="visible">
    <el-form :model="query"  ref="query"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">
        <el-form-item>
          <el-select v-model="query.searchTypeA" size="small">
            <el-option value="1" label="药品通用名"></el-option>
            <el-option value="2" label="药品编码"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchTextA" placeholder="关键词" @keyup.enter.native="searchEnterFun" size="small"></el-input>
        </el-form-item>

      <span class="ftsz0" v-if="moreFormVisible">
        <el-form-item>
          <el-input v-model="query.spec" placeholder="规格" @keyup.enter.native="searchEnterFun" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.searchTypeB" placeholder="衍生物" size="small">
            <el-option value="1" label="一级盐类衍生物"></el-option>
            <el-option value="2" label="二级盐类衍生物"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchTextB" placeholder="关键词" @keyup.enter.native="searchEnterFun" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.compoundFlag" placeholder="复方及小儿标识" size="small">
            <el-option value="1" label="复方制剂"></el-option>
            <el-option value="0" label="非复方制剂"></el-option>
            <el-option value="5" label="复方制剂且非小儿制剂"></el-option>
            <el-option value="6" label="非复方制剂且是小儿制剂"></el-option>
            <el-option value="7" label="复方制剂且是小儿制剂"></el-option>
            <el-option value="8" label="小儿制剂"></el-option>
            <el-option value="9" label="非小儿制剂"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.standRate" placeholder="转换比" @keyup.enter.native="searchEnterFun" size="small"></el-input>
        </el-form-item>
      </span>
      <el-form-item>
        <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
        <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
        <el-button type="" v-if="moreVisible" @click="more()" size="small">更多</el-button>
        <el-button type="" v-if="moreVisible==false" @click="less()" size="small">收起</el-button>
      </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        @sort-change="sortChangeFunc"
        border
        stripe>
        <el-table-column width="50" align="center">
          <template slot-scope="scope">
            <el-radio  v-model="radio" :label="scope.row.id" :value="scope.row"
                       :title="scope.row.id" @change="changeHandler(scope.row)">{{ null}}
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column label="药品编码" prop="drug_code" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通用名" prop="drug_name" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" prop="doseage_form_code" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.doseageFormCodeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" prop="spec" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.spec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="一级盐类衍生物" prop="salt_code" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.saltCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="二级盐类衍生物" prop="salt_code2" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.saltCode2 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="复方及小儿标记" prop="compound_children" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ compoundChildren(scope.row.compoundChildren) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="转换比" prop="stand_rate" sortable="custom" show-overflow-tooltip="true" width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.standRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="包材" prop="wrap_code" sortable="custom" show-overflow-tooltip="true" width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.wrapCode }}</span>
          </template>
        </el-table-column>
      </el-table>
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
    <span slot="footer">
      <el-button size="small" type="primary" @click="buttonForm()">选择</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {drugList} from 'src/axios/datacenter/productdata/productinfo/productinfo';
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    props: {
      selectedObj: {
        type: Object
      }
    },
    data() {
      return {
        visible: false,
        moreFormVisible:false,
        moreVisible:true,
        resData: this.metaData(),
        query: this.metaQuery(),
        radio: undefined
      }
    },
    methods: {
      metaData() {
        return {
          // 前后台交互数据封装格式
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
      metaQuery() {
        return {
          // 表单查询数据初始化
          searchTypeA: '1',
          searchTextA: undefined,
          spec: undefined,
          searchTypeB: undefined,
          searchTextB: undefined,
          compoundFlag:undefined,
          standRate:undefined,
          orderBy:undefined
        }
      },
      //  排序查询
      sortChangeFunc(value){
        let sortType=" desc"
        if(value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list();
        }
      },
      //  回车查询
      searchEnterFun(e){
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      // searchEnterFun (e){
      //   var keyCode = window.event? e.keyCode:e.which;
      //   if(keyCode == 13){
      //     if(this.query.searchTextA || this.query.spec || this.query.searchTextB
      //     || this.query.compoundFlag || this.query.standRate){
      //       this.list();
      //     }
      //   }
      // },
      fillData(name) {
        this.query.searchTextA = name || undefined;
        this.query.searchTypeA='1';
        this.visible = true;
        this.list();
      },
      //  获取药品名分页列表
      list () {
        drugList(this.query,this.resData).then(res => {
          this.resData = res.data
          for(var i=0;i<this.resData.list.length;i++){
            if(this.radio == this.resData.list[i].id){
              this.selectedObj = this.resData.list[i];
            }
          }
        })
      },
      //  重置
      resetForm() {
        this.query = this.metaQuery();
        this.moreFormVisible=false;
        this.moreVisible=true;
        this.selectedObj = undefined;
        this.radio = undefined;
        this.list();
      },
      //  更多选项
      more(){
        this.moreVisible=false;
        this.moreFormVisible=true;
      },
      //  收起
      less(){
        this.moreVisible=true;
        this.moreFormVisible=false;
      },
      //  复方及小儿制剂
      compoundChildren(num){
        var name;
        switch (num){
          case "1":
          {name='复方制剂';}
            break;
          case "0":
          {name='非复方制剂';}
            break;
          case "5":
          {name='复方制剂且非小儿制剂';}
            break;
          case "6":
          {name='非复方制剂且是小儿制剂';}
            break;
          case "7":
          {name='复方制剂且是小儿制剂';}
            break;
          case "8":
          {name='小儿制剂';}
            break;
          case "9":
          {name='非小儿制剂';}
            break;
        }
        return name;
      },
      //  单选按钮控制
      changeHandler(value) {
        this.selectedObj = value;
      },
      //  重新选择药品名称
      buttonForm() {
        if (this.selectedObj == undefined) {
          this.$alert('请选择药品名称', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        }
        this.$confirm('确定将选择的产品设置名称?', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '重选',
          type: 'warning'
        }).then(() => {
          this.visible = false;
        this.$emit('newDrug', {value: this.selectedObj})
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
      }
    }
  }
</script>

