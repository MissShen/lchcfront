<template>
  <div class="tablebox">
    <el-tabs v-model="activeName">
      <el-tab-pane label="假期管理" name="first">
        <div class="block">
          <!--  @selected="selectDate" :disabled-picker="true"-->
          <Datepicker :inline="true" placeholder="请选择日期" language="zh" :disabled="disabled"
                      :highlighted="highlighted"
                      @selected="selectDate" @changedMonth="changedMonth" @changedYear="changedYear"></Datepicker>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import moment from 'moment';
  import {insert, deleteByDate, list} from 'src/axios/auditchanges/systemManage/holidyManage'

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
        highlighted: {
        }
      }
    },
    components: {
      Datepicker
    },
    created() {
      this.query = moment(new Date()).format('YYYYMM')
      this.list_bak();
    },
    methods: {
      list() {
        list(this.resData, this.query).then(res => {
          console.log(this.query+"query");
            this.resData = res.data;
            let dayOffArr = new Array();
            let workDayArr = new Array();
            for (let i = 0; i < res.data.length; i++) {
              if ((moment(res.data[i].monthDay).format('d') == 0 || moment(res.data[i].monthDay).format('d') == 6)) {
                dayOffArr.push((moment(res.data[i].monthDay).format('YYYYMMDD')));
              }
              else {
                workDayArr.push((moment(res.data[i].monthDay).format('YYYYMMDD')));
              }
            }
            console.log(dayOffArr);
            console.log(workDayArr);
          if (dayOffArr.length <= 0 ) {
            this.highlighted = {
              days: [0, 6],
              includeDisabled: true
            }
          }
          else {
            this.highlighted = {
              customPredictor: function (date) {
                  //取当前页面的数据比较 如果是休息日取反
                 if (date.getDay() == 0 || date.getDay() == 6) {
                   for (let m = 0; m < dayOffArr.length; m++) {
                      if (dayOffArr[m] != moment(date).format("YYYYMMDD")) {
                        return true;
                      }
                    }
                  }
                  else {
                    for (let n = 0; n < workDayArr.length; n++) {
                      if (workDayArr[n] == moment(date).format("YYYYMMDD")) {
                        return true;
                      }
                    }
                 }
              },
              includeDisabled: true
            }
          }
          }
        );
      },
      insert(date) {
        console.log("insert:" + date);
        insert(date).then(res => {
        });
      },
      deleteByDate(date) {
        console.log("deleteByDate:" + date);
        deleteByDate(date).then(res => {
        });
      },
      selectDate(date,isEdit) {

       if(isEdit!=false) {
         if (this.resData.length > 0) {
           let isMach = false;
           for (let i = 0; i < this.resData.length; i++) {
             if (moment(date).format('YYYY-MM-DD') == moment(this.resData[i].monthDay).format('YYYY-MM-DD')) {
               isMach = true;
               break;
             }
           }
           if (isMach) {
             deleteByDate(moment(date).format('YYYYMMDD'));
           }
           else {
             insert(moment(date).format('YYYYMMDD'));
           }
         }
         else {
           insert(moment(date).format('YYYYMMDD'));
         }
       }

        this.query = moment(date).format('YYYYMM')

        list_bak(this.resData, this.query).then(res => {
          let tempResDate = res.data;
          console.log(tempResDate);
          let dayOffArr = new Array();
          let workDayArr = new Array();
          for (let i = 0; i < tempResDate.length; i++) {
            if ((moment(tempResDate[i].monthDay).format('d') == 0 || moment(tempResDate[i].monthDay).format('d') == 6)) {
              dayOffArr.push((moment(tempResDate[i].monthDay).format('YYYYMMDD')));
            }
            else {
              workDayArr.push((moment(tempResDate[i].monthDay).format('YYYYMMDD')));
            }
          }
          console.log(dayOffArr);
          console.log(workDayArr);

          if (dayOffArr.length <= 0) {
            console.log("selectDate dayOffArrLenth <= 0")
            this.highlighted = {days: [0, 6], includeDisabled: true}
          }
          else {
            this.highlighted = {
              customPredictor: function (date) {
                //   //取当前页面的数据比较 如果是休息日取反
                if (date.getDay() == 0 || date.getDay() == 6) {
                  for (let m = 0; m < dayOffArr.length; m++) {
                    if (dayOffArr[m] != moment(date).format("YYYYMMDD")) {
                      console.log(moment(date).format("YYYYMMDD"));
                    }
                  }
                }
                else {
                  for (let n = 0; n < workDayArr.length; n++) {
                    if (workDayArr[n] == moment(date).format("YYYYMMDD")) {
                      return true;
                    }
                  }
                }
              },
              includeDisabled: true,
            }
          }
        })
      },
      changedMonth(date) {
        this.query = moment(date).format('YYYYMM');
        this.selectDate(date,false)
      },
      changedYear(date) {
        console.log("changedYear")
      }
    }
  };
</script>
