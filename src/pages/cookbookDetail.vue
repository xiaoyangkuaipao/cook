<template>
    <div class="cookbook-detail">
      <header class="cook-name">{{cook.name}}</header>
      <img :src="cook.pic" :alt="cook.name" class="cook-pic">
      <div class="content" v-html="cook.content">
      </div>
      <div style="font-weight: bolder;margin: 20px 0 10px 0;">享 · 食 · 菜 ·谱</div>
      <p class="cook-detail-item">用餐人数：{{cook.peoplenum}}</p>
      <p class="cook-detail-item">准备时间：{{cook.preparetime}}</p>
      <p class="cook-detail-item">烹饪时间：{{cook.cookingtime}}</p>
      <div class="material">
        <section class="material-item" v-for="(item, index) in cook.material" :key="index">
          <span> {{item.mname}} </span> ： <span> {{item.amount}} </span>
        </section>
      </div>
      <div class="process">
        <article class="process-item" v-for="(item, index) in cook.process" :key="index">
          <p>第{{index | stepFilter}}步： {{item.pcontent}}</p>
          <img :src="item.pic" :alt="item.pcontent" class="process-pic">
        </article>
      </div>
  </div>
</template>

<script lang="babel">
  export default {
      data() {
          return {
            id: this.$route.params.id,
            cook: {
              process: {},
              material: {},
            }
          };
      },
    created() {
      const self = this;
      this.axios
//      .get("http://localhost/food/php/getCookDetail.php?id="+this.id)
      .get("/food/php/getCookDetail.php?id="+this.id)
      .then(function(resp){
        if(resp.data.code === "10000") {
          self.cook = resp.data.result.result;
        }
      });
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
.cookbook-detail{
  position: relative;
  width: 60vw;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, .4);

  .cook-name{
    width: 60vw;
    font-size: 1.5rem;
    font-weight: bolder;
    text-align: center;
    margin: 20px;
    letter-spacing: 2px;
  }

  .cook-pic{
    width: 8rem;
    height: 8rem;
  }

  .content{
    width: 30vw;
    margin: 10px;
    font-size: .7rem;
    padding: 5px;
  }

  .material{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 30vw;
    margin: 10px;
    padding: 5px;
    border: 1px dotted #CCC;
  }

  .material-item{
    padding: 2px 8px;
    font-size: .7rem;
  }

  .cook-detail-item{
    margin: 5px;
    font-size: .8rem;
  }

  .process-item{
    margin-bottom: 10px;

    .process-pic{
      width: 12rem;
      height: 12rem;
    }

    p{
      margin: 5px;
      font-size: .8rem;
    }
  }
}

.cookbook-detail:before {
  position: absolute;
  width: 200px;
  height: 140px;
  top: 40px;
  left: -120px;
  content: "";
  background: url("../assets/images/cook-detail-decorator.jpg") no-repeat;
  background-size: cover;
  transform-origin: center;
  transform: rotate(-45deg);
}

.cookbook-detail:after {
  position: absolute;
  width: 200px;
  height: 140px;
  top: 40px;
  right: -120px;
  content: "";
  background: url("../assets/images/cook-detail-decorator.jpg") no-repeat;
  background-size: cover;
  transform-origin: center;
  transform: rotate(225deg);
}
</style>
