<template>

    <!-- ========================== 主内容start ========================= -->
   <div class="tab-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
       <el-tab-pane label="全部列表" name="first">
          <saler-item-list v-if="activeName==='first'"></saler-item-list>
       </el-tab-pane>
        <el-tab-pane label="待发货列表" name="second">
          <div slot="label">待发货
            <span class="tab-sign" v-if="sendCount!='0' &&  Number(sendCount)>100">100+</span>
            <span class="tab-sign" v-if="sendCount!='0' &&  Number(sendCount)<100">{{sendCount}}</span>
          </div>
          <saler-handle-list v-if="activeName==='second'" @beSend="beSendCount"></saler-handle-list>
        </el-tab-pane>
        <el-tab-pane label="备货/发货列表" name="third">
          <saler-message-list v-if="activeName==='third'"></saler-message-list>
        </el-tab-pane>
        <el-tab-pane label="退货列表" name="fouth">
          <div slot="label">待退货
            <span class="tab-sign" v-if="returnCount!='0' &&  Number(returnCount)>100">100+</span>
            <span class="tab-sign" v-if="returnCount!='0' &&  Number(returnCount)<100">{{returnCount}}</span>
          </div>
          <saller-return-list v-if="activeName==='fouth'"  @beReturn="beReturnCount"></saller-return-list>
        </el-tab-pane>
   <!--    <el-tab-pane label="已到货列表" name="five">
         <saler-receive-list v-if="activeName==='five'"></saler-receive-list>
       </el-tab-pane>-->
     <!--  <el-tab-pane label="关闭列表" name="five">
          <saler-close-list v-if="activeName==='five'"></saler-close-list>
        </el-tab-pane>-->
      </el-tabs>
    </div>
    <!-- ========================== 主内容end ========================= -->
</template>
<script>

  // 引入用户相关请求
  import {selectParameterSettingList} from 'src/axios/trade/audit/auditConfig'

  import salerHandleList from 'src/pages/trade/tradecenter/senderRole/order/salerTableView/salerHandleList'
  import salerMessageList from 'src/pages/trade/tradecenter/senderRole/order/salerTableView/salerMessageList'
  import salerReceiveList from 'src/pages/trade/tradecenter/senderRole/order/salerTableView/salerReceiveList'
  import salerCloseList from 'src/pages/trade/tradecenter/senderRole/order/salerTableView/salerCloseList'
  import salerItemList from 'src/pages/trade/tradecenter/senderRole/order/salerTableView/salerItemList'
  import sallerReturnList from 'src/pages/trade/tradecenter/senderRole/order/salerTableView/AllVerifyList'
  export default {
    components: {
      salerHandleList,
      salerMessageList,
      salerReceiveList,
      salerItemList,
      salerCloseList,
      sallerReturnList
    },
    data () {
      return {
        activeName:'second',  // 当前标签
        state: 0,
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        createdTimes: 0,
        sendCount:0,
        returnCount:0,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
      }
    },
    watch: {
      $route(to,from){
        if(to.query.anchor!=from.query.anchor){
          this.goAnchor();
        }
      },
    },
    mounted(){
      this.goAnchor()
    },
    methods: {
      goAnchor(){
        let routeAnchor = this.$route.query.anchor;
        let routeQuery = this.$route.meta.query;
        if (routeAnchor) {
          routeQuery.forEach(item => {
            if (routeAnchor == item.name) {
              this.activeName = item.val;
              //console.log(routeAnchor,"-----",routeQuery,"------",item.val);

            }
          })
        }
      },
      beSendCount(val){
        this.sendCount=val;
      },
      beReturnCount(val){
        this.returnCount=val;
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
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
      metaQuery () { // 表单查询数据初始化
        return {

            id: undefined,
            searchSenderName: undefined,
            searchSenderAbbr: undefined,

        }
      },
     handleClick(tab, event) {
      }
    }
  }
</script>

