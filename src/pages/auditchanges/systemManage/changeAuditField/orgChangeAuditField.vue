<template>
  <div>
  <!--<div class="tabs-panel">
    <span class="active">企业变更审核字段管理</span>
  </div>-->
  <div class="main">
    <!--<ul class="side">
      <li><a href="#jc" class="current d_jump">基础信息</a></li>
      <li><a href="#zx" class="d_jump">资信信息</a></li>
      <li><a href="#sbr" class="d_jump">申报人信息</a></li>
      <li><a href="#yy" class="d_jump">营业执照</a></li>
      <li><a href="#sc" class="d_jump">生产许可证</a></li>
      <li><a href="#gmp" class="d_jump">GMP信息</a></li>
      <li><a href="#jy" class="d_jump">经营许可证</a></li>
      <li><a href="#gsp" class="d_jump">GSP信息</a></li>
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
                <el-checkbox label="企业名称"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="企业类型"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="企业简称"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="分部负责人"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="企业曾用名"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="分部地址"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="是否法人企业"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="分部名称"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="备注"></el-checkbox>
              </el-col>
            </el-row>
          <h3>资信信息</h3>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="开户名称"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="开户银行"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="开户账号"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="纳税人登记号"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="邮政编码"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="企业电话"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="固定电话"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="企业传真"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="企业网址"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="企业QQ"></el-checkbox>
              </el-col>
            </el-row>
          <h3>申报人信息</h3>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="联系人姓名"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="固定电话"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="手机"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="申报人传真"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="电子邮箱"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="身份证号"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="联系地址"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="紧急联系电话(手机)"></el-checkbox>
              </el-col>
            </el-row>
          <h3>营业执照</h3>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="注册号"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="名称"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="类型"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="住所"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="法定代表人"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="注册资本"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="注册资金"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="成立日期"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="营业期限"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="经营范围"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="登记机关"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="发证日期"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="上传附件"></el-checkbox>
              </el-col>
            </el-row>
          <h3>生产许可证</h3>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="编号"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="企业名称"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="注册地址"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="法定代表人"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="企业负责人"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="企业类型"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="质量负责人"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="分类码"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="有效期至"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="日常监管机构"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="日常监督人员"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="监督举报电话"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="发证机关"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="生产地址和生产范围"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="发证日期"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="上传附件"></el-checkbox>
              </el-col>
            </el-row>
          <h3>GMP信息</h3>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="证书编号"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="地址"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="认证范围"></el-checkbox>
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
                <el-checkbox label="发证机关"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="发证日期"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="是否新版GMP"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="上传附件"></el-checkbox>
              </el-col>
            </el-row>
          <h3>经营许可证</h3>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="证号"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="企业名称"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="注册地址"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="法定代表人"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="企业负责人"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="质量负责人"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="仓库地址"></el-checkbox>
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
                <el-checkbox label="经营方式"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="经营范围"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="发证机关"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="发证日期"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="上传附件"></el-checkbox>
              </el-col>
            </el-row>
          <h3>GSP信息</h3>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="证书编号"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="企业名称"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="地址"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="认证范围"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="有效期至"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="发证机关"></el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-checkbox label="发证日期"></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-form-item label="" >
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-checkbox label="上传附件"></el-checkbox>
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
