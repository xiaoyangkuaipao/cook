<template>
  <div class="cook-item" @click="getDetail">
      <img class="cook-img" :src="cookData.pic"/>
      <p class="name">{{cookData.name}}</p>
      <p class="cook-labels">
        <label v-for="item in labels">{{item}}</label>
      </p>
      <p>用餐人数: {{cookData.peoplenum}}</p>
      <p>准备时间: {{cookData.preparetime}}</p>
      <p>烹饪时间: {{cookData.cookingtime}}</p>
      <p class="title">享 · 食 · 享 · 语</p>
      <p class="content ellipsis-3" v-html="cookData.content">
      </p>
  </div>
</template>

<script lang="babel">
    export default {
        data() {
            return {
              labels: []
            };
        },
        created() {
          if(this.cookData && this.cookData.tag) {
            this.labels = this.cookData.tag.split(",");
            if(this.labels.length > 4) {
              this.labels = this.labels.slice(0,4);
            }
          }
        },
        methods: {
          getDetail() {
            this.$router.push({
              name: 'detail',
              params: {
                id: this.cookData.id
              }
            })
          }
        },
        props: ["cookData"]
    };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .cook-item{
    width: 16rem;
    height: 23rem;
    padding: 10px;
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    background-color: rgba(250, 229, 191, .4);

    p{
      height: 1.6rem;
      line-height: 1.6rem;
      font-size: .7rem;
    }

    .cook-img{
      width: 8rem;
      height: 8rem;
      margin: 0 auto;
      border-radius: 10px;
    }

    .name{
      height: 2.5rem;
      line-height: 2.5rem;
      font-size: 1.1rem;
      font-weight: bolder;
    }

    .cook-labels{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .content{
      position:relative;
      margin-top: .5rem;
      width: 16rem;
      height: 4.5rem;
      line-height: 1.35rem;
      letter-spacing: 1px;
      color: #666;
    }

    label{
      padding: 0 5px;
      margin: 0 5px;
      border-radius: 5px;
      background-color: #DBF5B9;
      color: #666
    }

    .title{
      position:relative;
      margin-top: .5rem;
      font-weight: bolder;
      font-size: 1rem;
      letter-spacing: 2px;
      color: #666;
    }
  }
</style>
