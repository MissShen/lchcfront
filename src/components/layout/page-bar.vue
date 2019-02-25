<template>
  <div class="pagebox">
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30]"
      :total="data.total"
      :page-size="data.pageSize"
      :page-count="data.pages"
      :current-page.sync="data.pageNum">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "page-bar",
    props: {
      data: {
        type: Object,
        required: true,
        default() {
          return [];
        }
      }
    },
    methods: {
      /**
       * -----------------------------------------------------------------------------------------------------------------
       *                                           每页显示条目数改变时事件处理
       * @param val 改变后的条目数
       * -----------------------------------------------------------------------------------------------------------------
       */
      handleSizeChange(val) {
        this.$emit('refreshPage', 0, val);
      },
      /**
       * -----------------------------------------------------------------------------------------------------------------
       *                                              当前页码改变时事件处理
       * @param val 改变后的页码数
       * -----------------------------------------------------------------------------------------------------------------
       */
      handleCurrentChange(val) {
        this.$emit('refreshPage', 1, val);
      },
    }
  }
</script>
