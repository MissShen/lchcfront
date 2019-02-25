<template>
  <div>
  <!--<div class="tabs-panel">
    <span class="active">产品变更审核字段管理</span>
  </div>-->
  <div class="main">
    <!--<ul class="side">
      <li><a href="#jc" class="current d_jump">基础信息</a></li>
      <li><a href="#sms" class="d_jump">说明书信息</a></li>
      <li><a href="#jg" class="d_jump">价格信息</a></li>

    </ul>-->
    <div class="scroll-content">
      <div class="gap-40">
        <el-form ref="dataForm" :model="dataForm" label-width="160px" size="small" label-position="left" >
          <h3>选择项目</h3>
            <el-row>
              <el-col>
                <el-select placeholder="所属项目">
                  <el-option
                    v-for="item in projectList"
                    :key="item.id"
                    :label="item.projectName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          <h3>基础信息</h3>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="商品名"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="北京地标码"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="最小使用单位"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="批准文号"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="中包装数据"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="大包装数量"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="药品检验报告编号"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="有效期至"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="国产药品批件编号"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="有效期至"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="进口药品注册证编号"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="有效期至"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="代理授权书有效期至"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="GMP证书编号"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="是否专利保护"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="专利保护开始时间"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="专利保护结束时间"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="药品质量标准"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="是否中药保护"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="目录范围"></el-checkbox>
              </el-col>
            </el-row>

          <h3>说明书信息</h3>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="用法用量"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="每次使用量最小值"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="每次使用量最大值"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="每日次数最小值"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="平均日用量"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="每次使用极量"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="疗程"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="说明书"></el-checkbox>
              </el-col>
            </el-row>
          <h3>价格信息</h3>
            <el-row>
              <el-col :span="6">
                <span>全国最低中标价</span>
              </el-col>
              <el-col :span="6">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <span>计算价格</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="年度"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="年度"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="省份"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="省份"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="项目名称"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="项目名称"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="中标价"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="代表品装量规格"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="执行日期"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="代表品装量包装"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="代表品价格"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="计算方法"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="计算价格"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="备注"></el-checkbox>
              </el-col>
            </el-row>
          <el-row>
            <el-col :span="2">
              <el-button type="primary" size="small" @click="">提交</el-button>
            </el-col>
            <el-col :span="10">
              <el-form-item label="" >
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button size="small" @click="">关闭</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
 export default {
    data () {
      return {
        projectList:{},
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          resData: { // 前后台交互数据封装格式
            pageNum: 0,
            pageSize: 20,
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
        }
      },
      metaForm () { // 表单数据初始化
        return {

        }
      },

      metaQuery () { // 表单查询数据初始化
        return {
          query: {
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleQuery () {
        this.showQuery = !this.showQuery
      },
      toggleForm () {
        this.showForm = !this.showForm
      },
      closeForm () {
        this.$refs['form'].resetFields()
        this.toggleForm()
      },
      //  获取用户分页列表
      list () {
      },
      // 重置用户表单
      resetForm () {
        /*  this.$refs['form'].resetFields()*/
        this.form = this.metaForm()
      },
      handleQuery(){
        console.log("handleQuery")
        this.list()
      },
      restQuery(){
        this.query=this.metaQuery()
      },

      // ************************
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
