<template>
  <div class="contract-box">
    <div class="space-20"></div>
    <h1>{{ resData.template.title }}</h1>
    <h3>合同编号：{{ resData.conHonestContract.conNo }}</h3>
    <hr style="padding: 0; margin: 15px 0; border:none; border-bottom: 1px solid #E4E7EA;" />
    <div class="contract-main">
      <div class="contract-members">
        <p>
          <strong>甲方（医疗机构）：</strong> {{ resData.conHonestContract.jiaName }}
        </p>
        <p>
          <strong>乙方（医药生产经营企业及其代理人）：</strong> {{ resData.conHonestContract.yiName }}
        </p>
      </div>
      <div class="contract-content" v-html="resData.template.content">
      </div>
      <hr class="dash" />

      <div class="contract-content">
        <p>此协议一式两份。</p>
      </div>

      <div class="contract-seal">
        <ul>
          <li>
            甲方(盖章)
            <template v-if="resData.conHonestContract.jiaSignImgurl">
              <img :src="resData.conHonestContract.jiaSignImgurl" />
            </template>
          </li>
          <li>
            乙方(盖章)
            <template v-if="resData.conHonestContract.yiSignImgurl">
              <img :src="resData.conHonestContract.yiSignImgurl" />
            </template>
          </li>
        </ul>
        <ul>
          <li>
            甲方(盖章时间):
            <template v-if="resData.conHonestContract.jiaSignDate">
              {{ moment(resData.conHonestContract.jiaSignDate).format("YYYY-MM-DD") }}
            </template>
          </li>
          <li>
            乙方(盖章时间):
            <template v-if="resData.conHonestContract.yiSignDate">
              {{ moment(resData.conHonestContract.yiSignDate).format("YYYY-MM-DD") }}
            </template>
          </li>
        </ul>
      </div>

    </div>
    <div class="flo-right padding20">
      <el-button @click="closeThisWindowAndRefreshParent()" size="small" class="el-button-pale">关闭</el-button>
    </div>
  </div>

</template>

<script>
  import { queryHonestInfo } from 'src/axios/contract/contractmanagement/contractManagement'

  import addView from 'src/pages/contract/contractmanagement/conmaincontract/productList';

  import moment from "moment";

  export default {
    components: {
      addView
    },
    props: {
      contractId: {
        type: String,
        required: true
      },
      operate: {
        type: String,
        required: true,
        default:''
      }
    },
    data () {
      return {
        resData: this.metaData(),
        form: this.metaForm(), // 表单初始化
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        visible: false,
        dataForm: this.metaForm(),
        result: undefined,
        addViewVisible: false
      }
    },
    created() {
      this.list();
      console.log("honest: ", this.operate);
    },
    methods: {
      moment,
      // -------------------------------------------- 数据初始化  -----------------------------------------
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
          list: [],
          conHonestContract:{},
          products:[],
          template:{
            title:''
          }
        }
      },
      metaForm () { // 表单数据初始化
        return {
          productName : '',
          manufactureName : ''
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          productName : '',
          manufactureName : ''
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        queryHonestInfo(this.contractId).then(res => {
          this.$nextTick(() => {
            this.resData = res.data;
            this.result = res.data;
          })
          console.log(this.resData);
        })
      },
      //父组件用来控制当前组件刷新的函数
      refreshList(){
        this.list()
      },
      //  关闭弹窗、刷父页面
      closeThisWindowAndRefreshParent () {
        this.$emit('closeParent');
        this.visible = false;
      },
      // 重置用户表单
      resetForm () {
        this.query = this.metaQuery();
        this.list();
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

<style scoped>
  @import "./../../../assets/css/compact.css";
</style>
