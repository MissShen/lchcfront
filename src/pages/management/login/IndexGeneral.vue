<template>
  <div class="indexbox">
    <ul class="index-left">
      <li class="user-section">
        <div class="user-avatar">
          <span class="avatar"><img :src="userImage"></span>
        </div>
        <div class="user-detail">
          <p>{{loginCode}}</p>
          <p>{{roleNames}}</p>
        </div>
        <div class="login-mark">
          上次登录时间：2018-07-25 16:33:03
        </div>
      </li>

      <li class="todo-section">
        <dl class="todo-box">
          <dt>待办事项</dt>
          <dd>
            <template v-if="todoDataList||todoContractList||todoAuditList||todoTradeList">
              <ul class="todos">
                <!--<h4>北京医药采购项目</h4>-->
                <!--数据中心待办事项-->
                <template v-if="todoDataList">
                  <li>
                    <div class="todo-title"><span>{{todoDataList.systemName}}</span></div>
                    <div class="todo-items">
                      <p v-for="data in todoDataList.dataList" :key="data.name"
                         @click="handleGoItem(data)">{{data.name}}<span>{{data.count}}</span></p>
                    </div>
                  </li>
                </template>
                <!--合同待办事项-->
                <template v-if="todoContractList">
                  <li>
                    <div class="todo-title"><span>{{todoContractList.systemName}}</span></div>
                    <div class="todo-items">
                      <p v-for="data in todoContractList.dataList" :key="data.name"
                         @click="handleGoItem(data)">{{data.name}}<span>{{data.count}}</span></p>
                    </div>
                  </li>
                </template>
                <!--资审待办事项-->
                <template v-if="todoAuditList">
                  <li>
                    <div class="todo-title"><span>{{todoAuditList.systemName}}</span></div>
                    <div class="todo-items">
                      <p v-for="data in todoAuditList.dataList" :key="data.name"
                         @click="handleGoItem(data)">{{data.name}}<span>{{data.count}}</span></p>
                    </div>
                  </li>
                </template>
                <!--交易待办事项-->
                <template v-if="todoTradeList">
                  <li>
                    <div class="todo-title"><span>{{todoTradeList.systemName}}</span></div>
                    <div class="todo-items">
                      <p v-for="data in todoTradeList.dataList" :key="data.name"
                         @click="handleGoItem(data)">{{data.name}}<span>{{data.count}}</span></p>
                    </div>
                  </li>
                </template>
              </ul>
            </template>
            <template v-else>
              <div class="list-blank">暂无待办事项</div>
            </template>
          </dd>
        </dl>
      </li>

      <el-row :gutter="30" class="note-section">
        <el-col :span="12">
          <dl class="panelbox panel-bar bar-green">
            <dt>
              <span>通知公告</span>
            </dt>
            <dd>
              <template v-if="noticeData.list.length>0">
                <ul v-for="(item,index) in noticeData.list" :key="index" class="list-view">
                  <li>
                    <a href="javascript:;" @click="handleNoticeView(item.id)">{{item.noticeTitle }}</a>
                    <span>{{item.createDate }}</span>
                  </li>
                </ul>
                <div class="panel-page">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleNoticeCurrentChange"
                    :total="noticeData.total"
                    :page-size="noticeData.pageSize"
                    :pager-count="5"
                    :current-page.sync="noticeData.pageNum">
                  </el-pagination>
                </div>

                <notice-view-from v-if="noticeView" ref="noticeView"></notice-view-from>
              </template>
              <template v-else>
                <div class="list-blank padding10">暂无内容</div>
              </template>
            </dd>
          </dl>
        </el-col>

        <el-col :span="12">
          <dl class="panelbox panel-bar bar-violet">
            <dt>
              <span>变更通知</span>
            </dt>
            <dd>
              <template v-if="msgChangeData.list.length>0">
                <ul v-for="(item,index) in msgChangeData.list" :key="index" class="list-view">
                  <li>
                    <a href="javascript:;">{{item.messageContent }}</a>
                    <span>{{item.createDate }}</span>
                  </li>
                </ul>
                <div class="panel-page">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleMsgChangeCurrentChange"
                    :total="msgChangeData.total"
                    :page-size="msgChangeData.pageSize"
                    :pager-count="5"
                    :current-page.sync="msgChangeData.pageNum">
                  </el-pagination>
                </div>
              </template>
              <template v-else>
                <div class="list-blank padding10">暂无内容</div>
              </template>
            </dd>
          </dl>
        </el-col>
      </el-row>
    </ul>

    <ul class="index-right">
      <template v-if="backlogTotal.length>0">
        <li class="purple-panel">
          <h5>{{backlogTotal[0].receiveTotalDate}} <a href="javascript:;">交易明细</a></h5>
          <div class="survey"><span>{{backlogTotal[0].receiveTotal}}</span> {{backlogTotal[0].receiveTotal_ts}}</div>
        </li>

        <li class="blue-panel">
          <h5>{{backlogTotal[0].requestTotalDate}} <a href="javascript:;">交易明细</a></h5>
          <div class="survey"><span>{{backlogTotal[0].requestTotal}}</span> {{backlogTotal[0].requestTotal_ts}}</div>
        </li>
      </template>
      <dl class="panelbox">
        <dt>
          <span>紧急求购</span>
          <a v-if="purchaseData.length>0" href="javascript:;" @click="handleUserMessage()">更多&raquo;</a>
        </dt>
        <dd>
          <template v-if="purchaseData.length>0">
            <ul v-for="(item,index) in purchaseData.list" :key="index" class="list-view">
              <li>
                <a href="javascript:;">{{item.messageContent }}</a>
                <span>{{item.createDate }}</span>
              </li>
            </ul>
          </template>
          <template v-else>
            <div class="list-blank padding10">暂无内容</div>
          </template>
        </dd>
      </dl>

      <dl class="panelbox">
        <dt>
          <span>异常订单公示</span>
          <a v-if="unnormalData.list.length>0" href="javascript:;" @click="goUnmormalList()">更多&raquo;</a>
        </dt>
        <dd>
          <template v-if="unnormalData.list.length>0">
            <ul v-for="(item,index) in unnormalData.list" :key="index" class="list-view">
              <li>
                <a href="javascript:;" @click="goUnnormalDetail(item.buyerOrgid)">{{item.bakBuyerName }}</a>
                <span>异常数量<b class="red">{{item.orderItemNum}}</b>次</span>
              </li>
            </ul>
          </template>
          <template v-else>
            <div class="list-blank padding10">暂无内容</div>
          </template>
        </dd>
      </dl>


      <dl class="panelbox">
        <dt>
          <span>评价公示</span>
          <a v-if="complainData.list.length>0" href="javascript:;" @click="goComplainList()">更多&raquo;</a>
        </dt>
        <dd>
          <template v-if="complainData.list.length>0">
            <ul v-for="(item,index) in complainData.list" :key="index" class="list-view">
              <li>
                <a href="javascript:;" @click="goComplainDetail(item.beComplainedOrgid)">{{item.beComplainedOrgName }}</a>
                <span>被投诉<b class="red">{{item.beComplainedCount}}</b>次</span>
              </li>
            </ul>
          </template>
          <template v-else>
            <div class="list-blank padding10">暂无内容</div>
          </template>
        </dd>
      </dl>
    </ul>
    <notice-yellowpage v-if="yellowpgNoticeVisible"></notice-yellowpage>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    import {
    todoOfData,
    todoOfContract,
    todoOfAudit,
    todoOfTrade,
    todoEnterprise,
    backlogTotal,
    getAllComplaint,
    queryUnnormalInfoList
  } from "src/axios/management/todo/to";

   import {findRouterPathByTitle} from "src/utils";

  export default {
    name: "IndexGeneral",
    components: {},
    computed: {
      ...mapGetters([
        'accountType',
        'perm_routers',
        'loginCode',
        'roleNames',
        'orgId',
        'userImage',
      ])
    },
    data() {
      return {
        messageData: this.metaData(),
        backlogTotal: [],
        purchaseData: [], // 紧急求购
        unnormalData: this.metaData(), // 异常订单
        complainData: this.metaData(), // 评价公示
        noticeData: this.metaData(), //通知公告
        msgChangeData: this.metaData(), //通知公告
        queryData: this.metaQuery(), // 查询初始化
        menuCode : [],
        noticeView: false,
        messageView: false,
        menuCodeStr:'',
        messageQuery: {
          searchSystemName: undefined,
          searchContent: undefined,
          searchReadFlag: undefined,
        },
        todoDataList: null,
        todoContractList: null,
        todoAuditList: null,
        todoTradeList: null,
        sublogo: '', // 子系统名称
        navGeneral: [],
        busSysList: [],
        num: 0,
        annouceList: [],
        yellowpgNoticeVisible: false
      }
    },
    created() {
      if (sessionStorage.getItem('token')) {
        sessionStorage.setItem("login", "login");
      }
      if (this.accountType != null && this.accountType != '') {
        sessionStorage.setItem('account-type', this.accountType);
      }
      if (!sessionStorage.getItem("isAlerted") || sessionStorage.getItem("isAlerted") == 'false') {
        this.enterpriseTodo(); //企业黄页信息维护通知
        sessionStorage.setItem("isAlerted", 'true');
      }
      this.queryData.queryType = '';
      this.queryMsgChangeList();
      this.queryMessageList();
      this.handleTodo();
      this.queryNoticeMessageList(3);
      this.queryBulletins();
      this.queryAllComplaint();
      this.queryUnnormal();
    },
    methods: {
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 4,
          total: 0,
          pages: 0,
          list: []
        }
      },
      enterpriseTodo() {
        todoEnterprise(this.orgId).then(res => {
          if (res.data == true) {
            this.yellowpgNoticeVisible = true;
          }
        })
      },
      handleTodoDataList(todoDataList) {
        if (todoDataList) {
          let dataList = todoDataList.dataList;
          if (dataList) {
            let filterDataList = [];
            dataList.forEach(item => {
              let path = findRouterPathByTitle(this.perm_routers, item.title);
              if (path != '/IndexGeneral') {
                filterDataList.push(item);
              }
            });
            if (filterDataList.length > 0) {
              todoDataList.dataList = filterDataList;
              return todoDataList;
            }
          }
        }
      },
      handleTodo() {
        todoOfData().then(res => {
          if (res.code == 200) {
            let data = this.handleTodoDataList(res.data);
            this.todoDataList = data ? data : undefined;
          }
        });
        todoOfContract().then(res => {
          if (res.code == 200) {
            let data = this.handleTodoDataList(res.data);
            this.todoContractList = data ? data : undefined;
          }
        });
        todoOfAudit().then(res => {
          if (res.code == 200) {
            let data = this.handleTodoDataList(res.data);
            this.todoAuditList = data ? data : undefined;
          }
        });
        todoOfTrade().then(res => {
          if (res.code == 200) {
            let data = this.handleTodoDataList(res.data);
            this.todoTradeList = data ? data : undefined;
          }
        });
        backlogTotal().then(res => {
          if (res.code == 200) {
            this.backlogTotal = res.data;
            this.transferMoney(this.backlogTotal[0].receiveTotal, 'receiveTotal');
            this.transferMoney(this.backlogTotal[0].requestTotal, 'requestTotal');
          }
        })
      },
      transferMoney(m, name){
        let _total = Number(m) || 0;
        if(_total >= 100000000){
          this.backlogTotal[0][name] = (_total/100000000).toFixed(2);
          this.backlogTotal[0][name+'_ts'] = '亿元';
        }else if(_total >= 10000){
          this.backlogTotal[0][name] = (_total/10000).toFixed(2);
          this.backlogTotal[0][name+'_ts'] = '万元';
        }else{
          this.backlogTotal[0][name] = _total.toFixed(2);
          this.backlogTotal[0][name+'_ts'] = '元';
        }
      },
      // 公告更多
      openAffiche() {
           },
      metaQuery() { // 查询数据封装格式
        return {
          queryType: '1',
          queryContent: '',
          beginDate: undefined,
          endDate: undefined
        }
      },
      // 消息列表
      queryMessageList() {
        userMessageList(1, 6, this.messageQuery).then(res => {
          if (res.code == 200) {
            this.messageData = res.data
          }
        })
      },
      // 公示列表
      queryNoticeMessageList(day) {
        noticeMessageList(day).then(res => {
          if (res.code == 200) {
            this.annouceList = res.data;
            this.announcementScroll(this.num);
          }
        })
      },
      //评价公示
      queryAllComplaint() {
        getAllComplaint(this.complainData,'').then(res => {
          if (res.code == 200) {
            this.complainData = res.data
          }
        })
      },
      // 异常订单
      queryUnnormal() {
        queryUnnormalInfoList(this.unnormalData, '').then(res => {
          this.unnormalData = res.data
          if (this.unnormalData.pageNum === 0) {
            this.unnormalData.pageNum = 1
          }
        })
      },


      // 公告列表
      queryBulletins() {
        queryBulletinList(this.noticeData.pageNum).then(res => {
          this.noticeData = res.data;
        })
      },
      // 变更列表
      queryMsgChangeList() {
        messageChangeList(this.msgChangeData.pageNum).then(res => {
          this.msgChangeData = res.data;
        })
      },
      // 公告详情
      handleNoticeView(id) {
        this.noticeView = true;
        this.$nextTick(function () {
          this.$refs.noticeView.metaList(id)
        })
      },
      // 消息更多
      handleUserMessage() {
        this.messageView = true;
        this.$nextTick(function () {
          this.$refs.messageView.metaList()
        })
      },
      // 公示滚动
      announcementScroll(num) {
        this.annouceList.push(this.annouceList[0]);
        var max = this.annouceList.length;
        var that = this;
        var marqueetimer = setInterval(function () {
          num++;
          if (num >= max) {
            num = 0;
          }
          that.num = num * 30;
        }, 2000);
      },
      handleGoItem(item) {
        if (item.url) {
          this.$router.push({path: item.url})
        }
      },
      handleNoticeCurrentChange(val) {
        this.noticeData.pageNum = val;
        this.queryBulletins();
      },
      handleMsgChangeCurrentChange(val) {
        this.msgChangeData.pageNum = val;
        this.queryMsgChangeList();
      },
      goUnnormalDetail (buyerOrgid){
        this.$router.push("/trade/information/queryOrderUnnormalInfoList/" + buyerOrgid );
      },
      goUnmormalList(){
        this.$router.push({path: '/TRADE/information/queryUnnormalInfoList'});
      },
      goComplainDetail (beComplainedOrgid){
        this.$router.push({path: '/trade/information/complaintDetails/'+beComplainedOrgid});
      },
      goComplainList(){
        this.$router.push({path: '/TRADE/information/moreComplaint'});
      }
    }
  }
</script>

<style scoped>
  .indexbox {
    display: table;
    width: 100%;
  }

  .index-left {
    float: left;
    display: table;
    width: 67%;
    min-height: calc(100vh - 136px);
    padding: 0;
    margin: 0;
    border-right: solid 1px #e6e6e6;
  }

  .index-right {
    float: left;
    display: table-cell;
    width: 33%;
    padding: 5px 15px;
    margin: 0 0 0 -1px;
    border-left: solid 1px #e6e6e6;
  }

  .user-section {
    display: table;
    width: 100%;
    box-sizing: border-box;
    padding: 15px 0 10px 30px;
    border-bottom: solid 1px #ccc;
  }

  .user-avatar {
    float: left;
    display: table-cell;
    vertical-align: middle;
  }

  .user-avatar > span {
    display: inline-block;
    width: 80px;
    height: 80px;
    overflow: hidden;
    background: #f5f5f5;
    border: solid 1px #fafafa;
    border-radius: 50%;
    text-align: center;
  }

  .user-avatar > span img {
    max-width: 100%;
    max-height: 100%;
  }

  .user-detail {
    clear: right;
    display: table;
    margin: 5px 0 0 100px;
  }

  .user-detail > p {
    max-width: 250px;
    padding: 8px 0 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
  }

  .login-mark {
    display: inline-block;
    float: right;
    padding: 0 20px 0 0;
    color: #666;
    font-size: 12px;
  }

  .todo-section {
    padding: 15px 0;
    background: #f0f3fa;
  }

  .todo-box {
    padding: 0 20px;
    background: #fff;
    border-top: solid 10px #f89d00;
  }

  .todo-box > dt {
    height: 16px;
    padding: 10px 5px;
    font-size: 16px;
  }

  .todo-box > dt i {
    margin-right: 15px;
  }

  .todo-box > dd {
    padding: 10px 0 0;
    margin: 0;
  }

  .todos {
    padding: 20px 0 1px;
  }

  .todos > h4 {
    padding: 0 0 15px;
    margin: 0 0 10px;
    border-bottom: dotted 1px #ccc;
    font-weight: normal;
  }

  .todos > li {
    display: table;
    padding: 0;
    margin: 0 0 24px;
    vertical-align: top;
  }

  .todo-title {
    display: table-cell;
  }

  .todo-title > span {
    position: relative;
    display: inline-block;
    height: 32px;
    padding: 0 5px;
    margin: 0 10px 0 0;
    font-size: 16px;
    line-height: 32px;
    white-space: nowrap;
    color: #fff;
  }

  /*.todo-title span::after {
    position: absolute;
    right: -15px;
    top: 2px;
    bottom: 2px;
    border-width: 9px;
    border-style: solid;
    border-color: transparent;
    border-left-color: #eee;
    content: ""
  }*/

  .todo-items {
    display: table-cell;
    padding: 0 24px;
    margin: 0;
  }

  .todo-items > p {
    display: inline-block;
    min-width: 125px;
    padding: 5px 0;
    margin: 0;
  }

  .todo-items > p > span {
    display: inline-block;
    min-width: 14px;
    height: 14px;
    margin: 0 20px 0 3px;
    padding: 0 5px;
    background: #ff3300;
    text-align: center;
    color: #fff;
    font-size: 12px;
    border-radius: 7px;
  }

  .todos > li:nth-child(1) > .todo-title > span {
    background: #ff9133;
  }

  .todos > li:nth-child(2) > .todo-title > span {
    background: #b579e0;
  }

  .todos > li:nth-child(3) > .todo-title > span {
    background: #36a1e9;
  }

  .todos > li:nth-child(4) > .todo-title > span {
    background: #04e3b1;
  }

  .index-right > li {
    padding: 0 0 5px;
    margin: 5px 0 15px;
    background-image: url("../../../assets/images/ico-halfdot.png");
    background-position: left bottom;
    background-repeat: repeat-x;
    color: #fff;
  }

  .index-right > li > h5 {
    height: 34px;
    padding: 0 15px;
    margin: 0;
    line-height: 34px;
    font-size: 16px;
  }

  .index-right > li > h5 > a {
    float: right;
    font-size: 12px;
    color: #fff;
  }

  .purple-panel {
    background-color: #a358d8;
  }

  .purple-panel h5 {
    background-color: #8d4bbb;
  }

  .blue-panel {
    background-color: #36a1e9;
  }

  .blue-panel h5 {
    background-color: #016db5;
  }

  .survey {
    padding: 10px 20px;
    font-size: 16px;
    line-height: 45px;
  }

  .survey span {
    margin-right: 5px;
    font-size: 30px;
    line-height: 20px;
    vertical-align: text-bottom;
  }

  .note-section {
    padding: 15px 25px;
  }
</style>
