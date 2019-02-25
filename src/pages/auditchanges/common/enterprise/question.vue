<template>
  <div class="tableset">
    <el-table :data="questions" border stripe>
      <el-table-column label="质疑人">
        <template slot-scope="scope">
          <span>{{ scope.row.QUESTION_USERNAME }}</span>
        </template>
      </el-table-column>
      <el-table-column label="质疑内容" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.QUESTION_EDITVAL }}</span>
        </template>
      </el-table-column>
      <el-table-column label="质疑时间" :formatter="dateformat" prop="QUESTION_DATE" />
      <el-table-column label="查看图片">
        <template slot-scope="scope">
          <images-preview v-if="scope.row.fileList" :operate="false" :imgIdListUnUnique="scope.row.fileList"></images-preview>
        </template>
      </el-table-column>
      <el-table-column label="是否回复" v-if="flag == 4">
        <template slot-scope="scope">
          {{ dictionary.doubt[scope.row.ID] ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="flag == 4">
        <template slot-scope="scope">
          <div class="operates">
            <span><a href="javascript:;" class="operation-btn" @click="reply(scope.row.ID)">回复</a></span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :close-on-click-modal="false" top="10vh" title="回复" width="80%" :visible.sync="show" :before-close="close" append-to-body>
      <el-form ref="talk" label-width="100px" label-position="right" size="small">
        <el-form-item label="质疑回复">
          <el-input type="textarea" v-model="content" placeholder="回复内容" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="close">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { findRegion } from "src/axios/auditchanges/common/region"
  import { updateQuestion } from "src/axios/auditchanges/auditManage/enterprise"
  import imagesPreview from 'src/pages/auditchanges/common/imagesPreview'
  import moment from "moment"
  import Vue from 'vue'
  import { businessFlag, companyType, moneyType } from 'src/axios/auditchanges/common/enterprise'

  export default {
    components: {
      imagesPreview
    },
    data() {
      return {
        show: false,
        questions: [],
        dictionary: {},
        content: null,
        id: null,
      }
    },
    props: ["flag"],
    methods: {
      async init(doubt, dictionary, type, att) {
        let loading = Vue.prototype.$loading({text:"玩命加载中..."});
        this.questions = [];
        let questions = JSON.parse(JSON.stringify(doubt[type]));
        for(let key in questions) {
          // 如果是所在地区，需要特殊处理
          if(type.indexOf("COUNTRY_ID") != -1) {
            let arr = JSON.parse(questions[key].QUESTION_EDITVAL);
            let res = await findRegion(arr);
            if(res.success) {
              let region = "";
              arr.forEach(x => {
                region += res.data[x] + " ";
              });
              questions[key].QUESTION_EDITVAL = region;
            }
          }
          // 转换日期格式
          if(type.indexOf("DATE") != -1) {
            questions[key].QUESTION_EDITVAL = moment(questions[key].QUESTION_EDITVAL).format("YYYY-MM-DD");
          }
          // 转换经济性质
          if(type == "enterprise.BUSINESS_FLAG") {
            questions[key].QUESTION_EDITVAL = this.getValueByKey(businessFlag(), questions[key].QUESTION_EDITVAL);
          }
          // 转换是否法人企业
          if(type == "enterprise.IS_JURIDICAL_COMPANY") {
            questions[key].QUESTION_EDITVAL = questions[key].QUESTION_EDITVAL == 1 ? "是" : "否";
          }
          // 转换类型
          if(type == "enterprise.REG_TYPE") {
            questions[key].QUESTION_EDITVAL = this.getValueByKey(companyType(), questions[key].QUESTION_EDITVAL);
          }
          // 转换币种
          if(type == "enterprise.REG_AMOUNT_UNIT") {
            questions[key].QUESTION_EDITVAL = this.getValueByKey(moneyType(), questions[key].QUESTION_EDITVAL);
          }
          // 转换企业类型
          if(type == "manufacture.COMPANY_TYPE") {
            questions[key].QUESTION_EDITVAL = this.getValueByKey(companyType(), questions[key].QUESTION_EDITVAL);
          }
          if(att && att.type && att.options) {
            if(att.type == '5') {
              if(!questions[key].QUESTION_EDITVAL) {
                continue;
              }
              questions[key].QUESTION_EDITVAL = JSON.parse(questions[key].QUESTION_EDITVAL);
              let result = "";
              questions[key].QUESTION_EDITVAL.forEach(x => {
                for(let i in att.options) {
                  if(att.options[i].value == x) {
                    result += att.options[i].text + " ";
                  }
                }
              });
              questions[key].QUESTION_EDITVAL = result;
            } else {
              questions[key].QUESTION_EDITVAL = att.options[questions[key].QUESTION_EDITVAL];
            }
          }
          this.questions.push(questions[key]);
        }
        this.dictionary = dictionary;
        this.$nextTick(() => {
          loading.close();
          this.questions.forEach(x => {
            if(x.fileList)
              x.fileList.splice(0, 0);
          });
        });
        console.log(this.questions)
        console.log(this.dictionary)
      },
      reply(id) {
        this.id = id;
        this.show = true;
        this.content = this.dictionary.doubt[id];
      },
      async save() {
        let res = await updateQuestion(this.id, this.content);
        if(res.success) {
          this.$set(this.dictionary.doubt, this.id, this.content);
          console.log(this.dictionary)
          this.close();
        } else {
          this.$alert("保存失败", '提示', {
            confirmButtonText: '确定',
          });
        }
      },
      close() {
        this.show = false;
      },
      dateformat(row, column) {
        let date = row[column.property];
        if (!date) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD");
      },
      getValueByKey(collection, key) {
        for(let i in collection) {
          if(collection[i].key == key) {
            return collection[i].value;
          }
        }
      },
    }
  }
</script>
