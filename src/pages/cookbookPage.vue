<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="努力加载中">
    <div class="cookbook-page">
      <el-menu
        :default-active="categoryActive"
        class="large-class">
        <el-menu-item
          v-for="(item, index) in categories.largeClass"
          :index="String(index)"
          @click="selectCategory(index, item)"
          :key="index">
          <template slot="title">
            <span>{{item.name}}</span>
          </template>
        </el-menu-item>
      </el-menu>
      <article class="cookbook-content">
        <div class="cookbook-labels-wrapper">
          <section class="cookbook-labels" ref="cookbookLabelsWrapper">
            <label class="cookbook-labels-item"
                   v-for="(item, index) in cooklabels"
                   @click="selectLabel(item)"
                   :key="index"
                   type="text"
            >{{item.name}}</label>
          </section>
        </div>
        <section class="load-more" @click="toggleLoad('more')" v-show="loadMore && toggle === 'more'">
          <i class="el-icon-arrow-down"></i> 查看更多
        </section>
        <section class="load-more" @click="toggleLoad('less')" v-show="loadMore && toggle === 'less'">
          <i class="el-icon-arrow-up"></i> 收起
        </section>
        <div class="cook-items">
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
        <div class="is-last" v-if="isLast">---------------------- ~是时候看到底线了~ ---------------------- </div>
      </article>
    </div>

  </div>
</template>

<script lang="babel">
  import cookItem from "../components/cookItem.vue";

  export default {
    data() {
        return {
          fullscreenLoading: false,
          showSmallClass: false,
          enterSmallClass: false,
          categories: {
            largeClass: [{}],
            smallClass: [{}]
          },
          cookItems: [],
          categoryActive: "",
          cooklabels: [],
          timer: {},
          loadHeight: 0,
          itemNum: 1,
          start: 0,
          isLast: false,
          loadMore: "",
          toggle: "",
          classid: "",
        };
    },
    created() {
    },
    mounted() {
      this.setItems();
      this.getCategory();
      this.categoryActive = "0";
      const self = this;

      window.onscroll = function() {
        const wScrollY = window.scrollY; // 当前滚动条位置
        const wInnerH = window.innerHeight; // 设备窗口的高度（不会变）
        const bScrollH = document.body.scrollHeight; // 滚动条总高度
        if (wScrollY + wInnerH >= bScrollH && !self.isLast) {
          self.start += parseInt(self.itemNum * 3);
          self.getCookbooKByClass(self.start, self.itemNum);
        }
      }
    },
    methods: {
      getCategory() {
        const self = this;
        if(sessionStorage.getItem("categories")){
          this.categories = JSON.parse(sessionStorage.getItem("categories"));
          this.cooklabels = this.categories.smallClass[0];
          this.classid = this.cooklabels[0].classid;
          this.getCookbooKByClass(0, self.itemNum);
        }else{
          this.axios
//          .get("http://localhost/food/php/getCategory.php")
          .get("/food/php/getCategory.php")
          .then(function(resp){
            if(resp.data.code === "10000") {
              let categories = {};
              let result = resp.data.result.result;
              let len = result.length;
              let largeClass = [];
              let smallClass = [];
              for(let i=0; i<len; i++) {
                let item = result[i]
                let temp = {
                  index: i,
                  classid: item.classid,
                  name: item.name
                };
                smallClass.push(item.list);
                largeClass.push(temp);
              }
              categories.largeClass= largeClass;
              categories.smallClass= smallClass;
              self.categories = categories;
              self.cooklabels = self.categories.smallClass[0];
              self.classid = self.cooklabels[0].classid;
              self.getCookbooKByClass(0, self.itemNum);
              self.$nextTick(function(){
                self.$refs.cookbookLabelsWrapper.style.height = "auto";
                const height = self.$refs.cookbookLabelsWrapper.clientHeight;
                self.loadHeight = height;
                if(height > 54) {
                  self.loadHeight = height;
                  self.loadMore = true;
                  self.toggle = "more";
                  self.$refs.cookbookLabelsWrapper.style.height = "54px";
                }else{
                  self.loadMore = false;
                }
              })
              sessionStorage.setItem("categories",  JSON.stringify(categories))
            }
          });
        }
      },
      selectLabel(item) {
        this.cookItems = [];
        this.classid = item.classid;
        this.start = 0;
        this.getCookbooKByClass(this.start, this.itemNum);
      },
      getCookbooKByClass(start, num) {
        const self = this;
        self.isLast = false;
        self.fullscreenLoading = true;
        this.axios({
//          url: "http://localhost/food/php/getCookbooKByClass.php?classid="+self.classid+"&start="+start+"&num="+num*3,
          url: "/food/php/getCookbooKByClass.php?classid="+self.classid+"&start="+start+"&num="+num*3,
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(function(resp){
          if(resp.data.code === "10000") {
            self.fullscreenLoading = false;
            if(resp.data.result.status !== "0") {
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
      selectCategory(index, item) {
        this.cooklabels = this.categories.smallClass[index];
        this.categoryActive = index.toString();
        this.classid = this.cooklabels[0].classid;
        this.cookItems = [];
        this.getCookbooKByClass(0, this.itemNum);
      },
      toggleLoad(type) {
        if(type === "more") {
          this.toggle = "less";
          this.$refs.cookbookLabelsWrapper.style.height = this.loadHeight + "px";
        }else if(type === "less") {
          this.toggle = "more";
          this.$refs.cookbookLabelsWrapper.style.height = "54px";
        }
      },
      setItems() {
        const self = this;
        const outWidth = self.$refs.cookbookLabelsWrapper.clientWidth;
        const inWidth = 300;
        this.itemNum = parseInt(outWidth / inWidth);
        window.onresize = function() {
          const outWidth = self.$refs.cookbookLabelsWrapper.clientWidth;
          const inWidth = 300;
          self.itemNum = parseInt(outWidth / inWidth);
        }
      },
    },
    watch: {
      categoryActive(val) {
        this.$nextTick(function(){
          this.$refs.cookbookLabelsWrapper.style.height = "auto";
          const height = this.$refs.cookbookLabelsWrapper.clientHeight;
          this.loadHeight = height;
          if(height > 54) {
            this.loadHeight = height;
            this.loadMore = true;
            this.toggle = "more";
            this.$refs.cookbookLabelsWrapper.style.height = "54px";
          }else{
            this.loadMore = false;
          }
        })
      }
    },
    components: { cookItem },
  };
</script>

<style rel="stylesheet/less" lang="less" scope>
  .large-class {
    position: relative;
    width: 10vw;
    text-align: center;
  }

  .cookbook-page{
    display: flex;
  }

  .cookbook-content{
    width: 86vw;
  }

  .cookbook-labels-wrapper{
    position: relative;
    background-color: #DBF5B9;
    z-index: 10;
  }

  .cookbook-labels{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    transition: all 1s;
  }

  .cookbook-labels-item{
    padding: 5px 10px;
    font-size: .8rem;
  }

  .cookbook-labels-item:hover{
    cursor: pointer;
    color: #AE6465;
    text-decoration: underline;
  }

  .load-more{
    position: relative;
    width: 100%;
    height: 3rem;
    margin-top: -1rem;
    line-height: 4.3rem;
    text-align: center;
    font-size: .7rem;
    letter-spacing: 1px;
    background-color: #DBF5B9;
    border-radius: 0 0 100% 100%;
    cursor: pointer;
  }

  .cook-items{
    width: 86vw;
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

  .is-last{
    text-align: center;
    font-size: .7rem;
    margin: 20px;
    color: #CCC;
  }
</style>
