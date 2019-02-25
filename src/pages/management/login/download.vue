<template>
  <div class="login-main">
    <div class="download"></div>
    <div class="affiche-box">
      <ul class="affiche-list">
        <li>
          <a href="javascript:;">
            <span class="item-content">北京医药阳光采购系统项目_CA客户端.zip</span>
            <span class="item-date">2017-12-10</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <span class="item-content">北京市第一批药品阳光采购资质证明文件网上申报指南</span>
            <span class="item-date">2015-07-13</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <span class="item-content">数字证书安装使用常见问题及浏览器常用设置指导</span>
            <span class="item-date">2017-12-10</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <span class="item-content">遴选系统与交易系统录屏及操作说明</span>
            <span class="item-date">2017-12-10</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <span class="item-content">遴选系统操作说明_医院选择本院目录及配送</span>
            <span class="item-date">2017-12-10</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <span class="item-content">阳光采购信息更新系统价格更新操作手册</span>
            <span class="item-date">2017-12-10</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <span class="item-content">阳光采购平台问答小贴士（一）</span>
            <span class="item-date">2017-12-10</span>
          </a>
        </li>
      </ul>
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :total="total"
          :page-size="pageSize"
          :page-count="pages"
          :current-page.sync="pageNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'download',
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        size: 10,
        startRow: 0,
        endRow: 0,
        total: 7,
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
        lastPage: 0
      }
    },
    methods:{
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.pageNum = val;
      }
    }
  }
</script>
