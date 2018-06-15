<template>
  <div id="app">
    <header class="slogan-header">
      <img class="logo-img" src="./assets/images/logo.png" alt="享·食">
      <el-input placeholder="享 · 食， 陪你一起享受美食" v-model="searchText" class="input-with-select input-search">
        <template slot="prepend">享 · 食</template>
        <el-button slot="append" icon="el-icon-search" @click="searchCook"></el-button>
      </el-input>
      <section class="user-info">
        <el-button type="text" class="login">**</el-button>
        <el-button type="text" class="register">****</el-button>
      </section>
    </header>
    <el-menu :default-active="activeIndex" class="el-menu-demo nav" mode="horizontal">
      <!--<el-menu-item index="1">享食大堂</el-menu-item>-->
      <el-menu-item index="2">享食菜谱</el-menu-item>
      <!--<el-menu-item index="3">享食时刻</el-menu-item>-->
    </el-menu>
    <router-view class="pages"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: "2",
      searchText: ""
    }
  },
  created() {
    this.searchText = "";
  },
  methods: {
    searchCook() {
      this.$router.push({
        name: 'search',
        params: {
          keyword: this.searchText
        }
      })
    }
  }
}
</script>

<style scope>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .pages{
    padding: 0 2vw;
  }

  .slogan-header{
    width: 100vw;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .input-search{
    width: 35rem;
  }

  .nav{
    position: relative;
    margin: 10px 2vw;
    z-index: 20;
  }

  .logo-img{
    margin:10px 0 0 65px;
    width: 120px;
    height: 100px;
  }

  .user-info{
    margin-right: 50px !important;
  }

  .login, .register {
    color: black;
  }
</style>
