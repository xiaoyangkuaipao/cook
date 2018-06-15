<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="努力加载中">
    <div class="cookbook-page" ref="cookbookPage">
      <div class="cook-search-items">
        <div v-for="(item, index) in cookItems">
          <cook-item
            :cook-data="item"
            :key="index"
            v-if="!item.supplement"
          ></cook-item>
          <section
            v-if="item.supplement"
            class="supplement"
          ></section>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="babel">
  import cookItem from "../components/cookItem.vue";

  export default {
    data() {
      return {
        fullscreenLoading: false,
        itemNum: 1,
        keyword: this.$route.params.keyword,
        cookItems: [],
      };
    },
    mounted() {
      if(!this.keyword) {
        this.$router.push("/");
        return
      }
      this.setItems();
      const self = this;
//      this.axios.get("http://localhost/food/php/searchCook.php?keyword="+this.keyword)
      this.axios.get("/food/php/searchCook.php?keyword="+this.keyword)
        .then(function(resp){
          if(resp.data.code === "10000") {
            self.fullscreenLoading = false;
            if(resp.data.result.status !== "0") {
              self.$message(resp.data.result.msg);
              self.isLast = true;
            }
            if(resp.data.result && resp.data.result.result.list) {
              if(resp.data.result.result.list.length === 0){
                self.isLast = true;
              }
              self.cookItems = self.cookItems.concat(resp.data.result.result.list);
              const len = self.cookItems.length;
              const remain = len % self.itemNum;
              if(remain !== 0) {
                const supplement = self.itemNum - remain;
                for(let i=0; i<supplement; i++ ) {
                  self.cookItems.push({
                    supplement: true,
                  })
                }
              }
            }
          }
        });
    },
    methods: {
      setItems() {
        const self = this;
        const outWidth = self.$refs.cookbookPage.clientWidth;
        const inWidth = 300;
        this.itemNum = parseInt(outWidth / inWidth);
        window.onresize = function() {
          const outWidth = self.$refs.cookbookPage.clientWidth;
          const inWidth = 300;
          self.itemNum = parseInt(outWidth / inWidth);
        }
      },
    },
    components: { cookItem },
  };
</script>

<style rel="stylesheet/less" lang="less" scope>
  .cookbook-page{
    display: flex;
  }

  .cook-search-items{
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .supplement{
    position: relative;
    width: 16rem;
    height: 23rem;
    padding: 10px;
    margin: 10px 20px;
  }

</style>
