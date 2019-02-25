<template>
  <div>

    <div class="tabs-panel">
      <span class="active">医院选择配送</span>
    </div>

    <div class="tablebox">

      <div class="table-from">
        <el-form ref="query" :model="query" size="small" :inline="true" class="demo-form-inline">

          <el-form-item>
            <el-button type="primary" size="small" >预生成合同</el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.name" placeholder="配送企业"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.history" placeholder="是否历史配送">
              <el-option
                v-for="item in histories"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="query.twoVote" placeholder="是否签订两票制承诺书">
              <el-option
                v-for="item in twoVotes"
                :key="item.twoVote"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="query.record" placeholder="是否有不良记录">
              <el-option
                v-for="item in records"
                :key="item.record"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="warning">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tableset">
        <el-table ref="multipleTable" :data="resData.list" tooltip-effect="dark"
                  style="width: 100%" border>
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="name" label="通用名"></el-table-column>
          <el-table-column prop="product" label="产品名称"></el-table-column>
          <el-table-column prop="commodity" label="商用名"></el-table-column>
          <el-table-column prop="dosage" label="剂型"></el-table-column>
          <el-table-column prop="specification" label="规格"></el-table-column>
          <el-table-column prop="transform" label="转换比"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <a href="#" class="operation-btn">选择</a>
              <a class="operation-btn" @click="examine()">查看产品</a>
            </template>
          </el-table-column>
        </el-table>
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
      </div>
      <el-dialog title="选择配送企业" :visible.sync="dialogFormVisible">
        <el-form ref="query" :model="query" size="small" :inline="true">
          <div class="formrow">
            <span>
              <el-form ref="queryFrom" :model="queryFrom" size="small" :inline="true">
                <el-form-item>
                  <el-input v-model="queryFrom.name" placeholder="企业名称"></el-input>
                </el-form-item>
              </el-form>
            </span>
            <span>
              <el-form-item>
                <el-button type="warning">查询</el-button>
                <el-button type="primary">重置</el-button>
              </el-form-item>
            </span>
          </div>
        </el-form>
        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" border
                  @selection-change="handleSelectionChange" @select="handleCheckedCitiesChang">

          <el-table-column label="首选配送" width="80">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio" @change="changeHandler(scope.$index)">{{null}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="80" v-model="tableName" ></el-table-column>
          <el-table-column label="合同已选" prop="state" width="120"></el-table-column>
          <el-table-column prop="company" label="配送企业"></el-table-column>
          <el-table-column prop="telephone" label="电话" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addEnterprise">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        histories:[{
          value : "1",
          label : "是"
        },{
          value : "0",
          label : "否"
        }],
        twoVotes:[{
          value : "1",
          label : "是"
        },{
          value : "0",
          label : "否"
        }],
        records:[{
          value : "1",
          label : "是"
        },{
          value : "0",
          label : "否"
        }],
        dialogFormVisible: false,
        queryFrom:{
          name:''
        },
        tableData3: [{
          id:'343',
          state: '是',
          company: '山东九州通物流',
          telephone: '7899721',
        }, {
          id:'234',
          state: '是',
          company: '山东九州通物流',
          telephone: '7899721',

        }, {
          id:'324',
          state: '是',
          company: '山东九州通物流',
          telephone: '7899721',
        }, {
          id:'989',
          state: '是',
          company: '山东九州通物流',
          telephone: '7899721',
        }, {
          id:'89',
          state: '否',
          company: '山东九州通物流',
          telephone: '7899721',
        }, {
          id:'435',
          state: '是',
          company: '山东九州通物流',
          telephone: '7899721',
        }, {
          id:'67',
          state: '是',
          company: '山东九州通物流',
          telephone: '7899721',
        }],
        tableName:[],
        radio:"",
        radioID:"",
        deleteDataList:[],
        forbidden:false

      }
    },
    methods: {
      metaData() {
        return {
          pageNum: 1,
          pageSize: 20,
          size: "",
          startRow: "",
          endRow: "",
          total: 4,
          pages: "",
          prePage: "",
          nextPage: "",
          isFirstPage: true,
          isLastPage: "",
          hasPreviousPage: "",
          hasNextPage: "",
          navigatePages: "",
          navigatepageNums: "",
          navigateFirstPage: "",
          navigateLastPage: "",
          firstPage: "",
          lastPage: "",
          list: [{
            name:"头孢氨苄",
            product:"头孢氨苄片(糖衣)",
            commodity:"头孢氨苄片(糖衣)",
            dosage:"糖衣片",
            specification:"0.125g",
            transform:"24",
            unit:"盒"
          },
            {
              name:"头孢氨苄",
              product:"头孢氨苄片(糖衣)",
              commodity:"头孢氨苄片(糖衣)",
              dosage:"糖衣片",
              specification:"0.125g",
              transform:"24",
              unit:"盒"
            }]
        }
      },
      metaForm () { // 表单数据初始化
        return {
          id: undefined,
          userCode:undefined,
          userName:undefined,
          password:'',
          pwd2: undefined,
          orgName:"1",
          orgId:"1",
          modifyId:"1",
          mobile:undefined,
          telephone:undefined,
          enableFlag:"1",
          userCaKey:"1",
          createId:"1",
          createName:"1",
          createDate:"1",
          modifyName:"1",
          modifyDate:"1",
          remark:undefined
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            name: undefined,
            history: undefined,
            twoVote: undefined,
            record: undefined
          }
        }
      },
      // 打开用户新增页面
      examine () {
        this.dialogFormVisible=true;
      },
      handleSizeChange (val) {
        this.tableData3.pageSize = val
      },
      handleCurrentChange (val) {
        this.tableData3.pageNum = val
      },
      changeHandler(value) {
        this.radioID=this.tableData3[value].id;
        console.log(this.tableData3[value].id);
          this.$refs.multipleTable.toggleRowSelection(this.tableData3[value],true);
      },
      handleCheckedCitiesChange(row){
        console.log(this.tableName[row].id)
        console.log(this.radio.id)
        if(this.radio===this.tableName){
          this.radio="";
        }

      },
      handleSelectionChange(val){
        this.deleteDataList=val
      },
      addEnterprise(){
        let idArr=this.deleteDataList.map(data => {
          return data.id
        })
        console.log(idArr.join(',').toString())
      }
    }
  }
</script>

<style>
  @import "../../../assets/css/compact.css";
</style>
