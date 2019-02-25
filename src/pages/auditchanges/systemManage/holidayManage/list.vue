<template>
  <div class="tablebox">
    <!--<el-tabs v-model="activeName">-->
      <!--<el-tab-pane label="假期管理" name="first">-->
        <Datepicker :bootstrap-styling="true"
                    :inline="true" language="zh"
                    :disabled="disabled"
                    :highlighted="highlighted"
                    @selected="selectDate"
                    @changedMonth="changedMonth" class="holiday-nobd">
        </Datepicker>
      <!--</el-tab-pane>-->
    <!--</el-tabs>-->
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import moment from 'moment';
  import {insert, deleteByDate, list} from 'src/axios/auditchanges/systemManage/holidyManage'

  // https://github.com/charliekassel/vuejs-datepicker
  export default {
    data() {
      return {
        activeName: 'first',
        resData: [],
        query: undefined,
        disabled: {
          customPredictor: function (date) {
            return date.getTime() < Date.now();
          }
        },
        highlighted: {}
      }
    },
    components: {
      Datepicker
    },
    created() {
      this.query = moment(new Date()).format('YYYYMM')
      this.list();
    },
    methods: {
      list() {
        list(this.resData, this.query).then(res => {
            this.resData = res.data;
            let dayOffArr = new Array();
            for (let i = 0; i < res.data.length; i++) {
              dayOffArr.push((moment(res.data[i].monthDay).format('YYYYMMDD')));
            }

            this.highlighted = {
              customPredictor: function (date) {
                for (let m = 0; m < dayOffArr.length; m++) {
                  if (dayOffArr[m] == moment(date).format("YYYYMMDD")) {
                    return true;
                  }
                }
              },
              includeDisabled: true
            }
          }
        );
      },
      insert(date) {
        let content = moment(date).locale('zh-cn').format("dddd");
        insert(date, content).then(res => {
        });
      },
      deleteByDate(date) {
        deleteByDate(date).then(res => {
        });
      },
      selectDate(date) {
        if (this.resData.length > 0) {
          let isMach = false;
          for (let i = 0; i < this.resData.length; i++) {
            if (moment(date).format('YYYY-MM-DD') == moment(this.resData[i].monthDay).format('YYYY-MM-DD')) {
              isMach = true;
              break;
            }
          }
          if (isMach) {
            this.deleteByDate(moment(date).format('YYYYMMDD'));
          }
          else {
            this.insert(moment(date).format('YYYYMMDD'));
          }
        }
        else {
          this.insert(moment(date).format('YYYYMMDD'));
        }
        this.query = moment(date).format('YYYYMM');
        this.list();
      },
      changedMonth(date) {
        this.query = moment(date).format('YYYYMM');
        this.list();
      }
    }
  };
</script>
