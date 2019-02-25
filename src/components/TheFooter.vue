<template>
  <div class="footer">
    版权所有：北京市医药集中采购服务中心 <span>&copy; 2018 All rights reserved</span>
  </div>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped>
.footer {
  padding: 14px;
  text-align: center;
  background: #eee;
  font-size: 14px;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: -1;
}
.footer span {
  color: #555;
}
</style>
