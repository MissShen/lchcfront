<template>
  <el-dialog
    :title="'产品质疑列表'"
    :close-on-click-modal="false"
    width="80%"
    :visible.sync="visible">

    <div class="tableset">
      <el-table
        :data="resData.list"
        @sort-change="sortChangeFunc"
        border
        stripe>
        <el-table-column label="质疑类型" prop="question_field" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ setQuestionField(scope.row.questionField) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="质疑内容" prop="question_editval" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.questionEditval }}</span>
          </template>
        </el-table-column>
        <el-table-column label="质疑发起人" prop="question_username" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.questionUsername }}</span>
          </template>
        </el-table-column>
        <el-table-column label="质疑发起时间" prop="spec" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ setQuestionDate(scope.row.questionDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="质疑类型" prop="salt_code" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ setQuestionType(scope.row.questionType) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复状态" prop="salt_code2" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ setReplyFlag(scope.row.replyFlag) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复内容" prop="salt_code2" sortable="custom" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.replyContent }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" show-overflow-tooltip="true">
          <template slot-scope="scope">
            <images-preview class="img-pre-text" :dilogFlag="false" :imgIdListUnUnique="scope.row.productQuestionImgList"></images-preview>
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
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {queryQuestions} from 'src/axios/datacenter/productdata/productinfo/productinfo';
  import {keyBoardEnter} from "src/utils";
  import moment from 'moment'
  import imagesPreview from 'src/pages/datacenter/windowPanel/imagesPreview';

  export default {
    components: {ElCol,moment,imagesPreview},
    props: {
      selectedObj: {
        type: Object
      }
    },
    data() {
      return {
        visible: false,
        id:undefined,
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
          id:undefined,
          enableFlag:'1',
          questionTargetType:'2',// 质疑对象为’产品‘
          orderBy:'question_date desc'
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
      fillData(id) {
        this.visible = true;
        this.query.id=id;
        this.list();
      },
      //  获取药品名分页列表
      list () {
        queryQuestions(this.query,this.resData).then(res => {
          this.resData = res.data
        console.log("******************",this.resData);
        })
      },
      // 质疑类型
      setQuestionField(field){
        var tipMessage = '审核';
        switch (field){
          case 'PRODUCT':
            tipMessage = "产品名称";
            break;
          case 'TRADE':
            tipMessage = "商品名称";
            break;
          case 'DOSAGE':
            tipMessage = "剂型";
            break;
          case 'SPEC':
            tipMessage = "规格";
            break;
          case 'STANDRATE':
            tipMessage = "转换比";
            break;
          case 'METRIC':
            tipMessage = "单位";
            break;
          case 'WRAP':
            tipMessage = "包材";
            break;
          case 'MANUFACTURE':
            tipMessage = "生产企业";
            break;
          case 'STANDARDCODE':
            tipMessage = "本位码";
            break;
          case 'SOURCE':
            tipMessage = "产品来源";
            break;
          case 'UNIT':
            tipMessage = "最小使用单位";
            break;
          case 'PERMITNUMBER':
            tipMessage = "批准文号";
            break;
          case 'SWRAP':
            tipMessage = "中包装数量";
            break;
          case 'BWRAP':
            tipMessage = "大包装数量";
            break;
          case 'JYNUM':
            tipMessage = "药品检验报告编号";
            break;
          case 'JYDATE':
            tipMessage = "药品检验报告有效期";
            break;
          case 'JYYJ':
            tipMessage = "药品检验报告永久有效";
            break;
          case 'JKNUM':
            tipMessage = "进口药品注册证编号";
            break;
          case 'JKDATE':
            tipMessage = "进口药品注册证效期";
            break;
          case 'AGENCYORGDATE':
            tipMessage = "代理授权书有效期至";
            break;
          case 'PRODUCTIONNUM':
            tipMessage = "国产药品批件编号";
            break;
          case 'PRODUCTIONDATE':
            tipMessage = "国产药品批件有效期";
            break;
          case 'IMPORTNUM':
            tipMessage = "进口药品注册证编号";
            break;
          case 'GMP':
            tipMessage = "GMP证书编号";
            break;
          case 'PATENTFLAG':
            tipMessage = "是否专利保护";
            break;
          case 'PATENTBEGINDATE':
            tipMessage = "专利保护开始时间";
            break;
          case 'PATENTENDDATE':
            tipMessage = "专利保护结束时间";
            break;
          case 'STANDRD':
            tipMessage = "药品质量标准";
            break;
          case 'PROTECTIONFLAG':
            tipMessage = "是否中药保护";
            break;
          case 'USEUNIT':
            tipMessage = "用法用量";
            break;
          case 'USEMIN':
            tipMessage = "每次使用量最小值";
            break;
          case 'AVENUM':
            tipMessage = "平均日用量";
            break;
          case 'USEMAX':
            tipMessage = "每次使用量最大值";
            break;
          case 'TREATMENT':
            tipMessage = "疗程";
            break;
        }
        return tipMessage;
      },
      // 质疑时间
      setQuestionDate(dateTime){
        var result;
        if(typeof (dateTime)!='undefined'&& dateTime!=null ){
          result=moment(dateTime).format("YYYY-MM-DD");
        }
        return result;
      },
      //  质疑类型
      setQuestionType(type){
        var typeName='';
        switch(type){
          case '0':
            typeName='注册';
            break;
          case '1':
            typeName='申报';
            break;
          case '2':
            typeName='变更';
            break;
          case '3':
            typeName='转产';
            break;
        }
        return typeName;
      },
      //  回复标志
      setReplyFlag(flag){
        var replyName='';
        switch(flag){
          case '0':
                replyName = '未回复';
                break;
          case  '1':
                replyName = '已回复';
                break;
        }
        return replyName;
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

