<template>
  <div class="app-layout">
    <header class="header">
      <div><img class="img" src="../assets/logo.svg"/></div>
      <div>My shirt shop</div>
    </header>
    <NavMenu />

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue'

export default {
  components: {
    NavMenu,
  },
}
</script>

<!-- stylus是一种扩展的CSS，通过npm模块可以编译成标准的CSS。@import语法在标准的CSS中也是支持的。
     stylus允许在CSS中定义变量和函数，让样式文件编写更简洁灵活。 -->
<style lang="stylus">
@import '../style/main';
</style>

<style lang="stylus" scoped>
.header {
  .img {
    width: 64px;
    height: 64px;
  }
}
</style>
