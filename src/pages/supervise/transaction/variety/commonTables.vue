<template>
  <dl class="mainbox">
    <dd>
      <div class="s-form">
        <el-form>
          <el-input
            v-for="(input, index) in mainTable.queryCondition.inputs"
            v-if="input.model"
            :key="index"
            v-model="mainQueryData[input.model]"
            :placeholder="input.placeholder"></el-input>
          <span class="date-group">
             <el-date-picker
               v-for="(datePicker, index) in  mainTable.queryCondition.datePickers"
               v-if="datePicker.model"
               size="small"
               :key="index"
               :type="datePicker.type"
               :format="datePicker.format"
               :value-format="datePicker.format"
               :placeholder="datePicker.placeholder"
               :editable="false"
               v-model="mainQueryData[datePicker.model]"
             >
              </el-date-picker>
          </span>
          <el-button @click="mainQuery()" size="small">查询</el-button>
          <el-button @click="mainQueryData ={}" size="small">重置</el-button>
          <el-button @click="" size="small">导出</el-button>
        </el-form>
      </div>
      <div class="tableset" style="overflow: auto; width: 100%;">
        <table class="s-table">
          <thead>
          <tr>
            <th width="30"></th>
            <th
              v-for="(column, index) in mainTable.column"
              :key="index"
              :width="column.width"
            >{{column.name}}
            </th>
            <th width="30"></th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(row,index) in mainResData.list">
            <tr>
              <td @click="leftClick(row,index)" align="center" class="nopadding" title="查看医院"><i
                class="el-icon-arrow-right" :id="index+'left'"></i></td>
              <td
                v-for="(column, index) in mainTable.column"
                :key="index"
              >
                <div v-if="column.type==='tooltip'">
                  <el-tooltip placement="top" :enterable="false">
                    <!--气泡内容（必须放在slot="content"内）,布局与源内容保持一致-->
                    <div slot="content">
                      <div v-for="(prop, index) in column.prop" class="text-inline" :key="index">{{row[prop]}}</div>
                    </div>
                    <!--源内容（必须放在class="el-tooltip-box"内）-->
                    <div class="el-tooltip-box">
                      <div v-for="(prop, index) in column.prop" class="text-inline" :key="index">{{row[prop]}}</div>
                    </div>
                  </el-tooltip>
                </div>
                <div v-else>{{row[column.prop]}}</div>
              </td>
              <td @click="rightClick(row,index)" align="center" class="nopadding" title="查看配送"><i
                class="el-icon-arrow-left" :id="index+'right'"></i></td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleMainSizeChange"
          @current-change="handleMainCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="mainResData.total"
          :page-size="mainResData.pageSize"
          :page-count="mainResData.pages"
          :current-page.sync="mainResData.pageNum">
        </el-pagination>
      </div>
    </dd>
  </dl>
</template>

<script>

  export default {
    name: "common-tables",
    props: ['mainTable'],
    data() {
      return {
        mainQueryData: {},
        mainResData: this.metaMainResData(),
        mainExpandId: '',
        mainExpandRow: {},
      }
    },
    mounted() {
      this.mainQuery()
    },
    methods: {
      metaMainResData() {
        return {
          pageNum: 1,
          pageSize: 20,
          total: 20,
          pages: 1,
          list: []
        }
      },
      mainQuery() {
        this.mainResData = this.metaMainResData();
        this.$emit('mainQuery', this.mainResData, this.mainQueryData)
      },
      handleMainSizeChange(val) {
        this.mainResData.pageSize = val;
        this.$emit('mainQuery', this.mainResData, this.mainQueryData)
      },
      handleMainCurrentChange(val) {
        this.mainResData.pageNum = val;
        this.$emit('mainQuery', this.mainResData, this.mainQueryData)
      },
      leftClick(row, index) {
        if (this.mainExpandId !== '') {
          if (this.mainExpandId === index + 'left') {
            if (document.getElementById(index + 'left').className === 'el-icon-arrow-right') {
              document.getElementById(index + 'left').className = 'el-icon-arrow-down'
            } else {
              document.getElementById(index + 'left').className = 'el-icon-arrow-right'
            }
            this.$set(row, 'expand1', !row.expand1);
            this.$set(row, 'left', !row.left);
          } else {
            //关闭其它行
            document.getElementById(this.mainExpandId).className = this.mainExpandId.endsWith("left") ? 'el-icon-arrow-right' : 'el-icon-arrow-left';
            this.$set(this.mainExpandRow, 'expand1', false);
            this.$set(this.mainExpandRow, 'expand2', false);
            this.$set(this.mainExpandRow, 'left', false);
            this.$set(this.mainExpandRow, 'right', false);
            //展开当前行
            document.getElementById(index + 'left').className = 'el-icon-arrow-down'
            this.$set(row, 'expand1', true);
            this.$set(row, 'expand2', false);
            this.$set(row, 'left', true);
            this.$set(row, 'right', false);
          }
        } else {
          document.getElementById(index + 'left').className = 'el-icon-arrow-down'
          this.$set(row, 'expand1', true);
          this.$set(row, 'left', true);
        }
        this.mainExpandId = index + 'left'
        this.mainExpandRow = row
      },
      rightClick(row, index) {
        if (this.mainExpandId !== '') {
          if (this.mainExpandId === index + 'right') {
            if (document.getElementById(index + 'right').className === 'el-icon-arrow-left') {
              document.getElementById(index + 'right').className = 'el-icon-arrow-down'
            } else {
              document.getElementById(index + 'right').className = 'el-icon-arrow-left'
            }
            this.$set(row, 'expand2', !row.expand2);
            this.$set(row, 'right', !row.right);
          } else {
            //关闭其它行
            document.getElementById(this.mainExpandId).className = this.mainExpandId.endsWith("right") ? 'el-icon-arrow-left' : 'el-icon-arrow-right';
            this.$set(this.mainExpandRow, 'expand1', false);
            this.$set(this.mainExpandRow, 'expand2', false);
            this.$set(this.mainExpandRow, 'left', false);
            this.$set(this.mainExpandRow, 'right', false);
            //展开当前行
            document.getElementById(index + 'right').className = 'el-icon-arrow-down'
            this.$set(row, 'expand1', false);
            this.$set(row, 'expand2', true);
            this.$set(row, 'left', false);
            this.$set(row, 'right', true);
          }
        } else {
          document.getElementById(index + 'right').className = 'el-icon-arrow-down'
          this.$set(row, 'expand2', true);
          this.$set(row, 'right', true);
        }
        this.mainExpandId = index + 'right'
        this.mainExpandRow = row
      },
    },
  }
</script>

<style scoped>

</style>
