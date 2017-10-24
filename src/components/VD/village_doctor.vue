<template>
  <div>
    <!--标题栏-->
    <mt-header title="远程挂号" style="background-color: #333;">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <!--tab栏-->
    <mt-navbar v-model="selected" >
      <mt-tab-item id="1">预约挂号</mt-tab-item>
      <mt-tab-item id="2">查询挂号</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" class="tabcon">
      <mt-tab-container-item class="tabcon_item" id="1">
          <div class="con1">
            <div class="weekdayCon" >
              <div v-for="n in 5" class="weekday">
                <div>今天</div>
                <div>10-12</div>
                <div>预约</div>
              </div>
            </div>
            <div class="actionCon">
              <div class="actionConDiv">
                <div class="actionConDivLable">上午：剩余33</div>
                <mt-button class="actionConBtn" type="primary" size="normal" @click="login()">预约挂号</mt-button>
                <div class="actionConDivLable">下午：剩余33</div>
                <mt-button class="actionConBtn" type="primary" size="normal" @click="login()">预约挂号</mt-button>
                <div class="actionConDivLable">晚上：剩余0</div>
                <mt-button class="actionConBtn" style="background-color: #9c9c9c" type="primary" size="normal" @click="login()">预约挂号</mt-button>
              </div>
            </div>
          </div>

      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <!--<mt-cell v-for="n in 4" :title="'测试 ' + n" />-->
        <div>查询挂号</div>
      </mt-tab-container-item>
    </mt-tab-container>
    <!--tab内容-->
    <router-view style="height: 100%"></router-view>
  </div>

</template>

<script>
  import { Header } from 'mint-ui';
  import { Navbar, TabItem } from 'mint-ui';
    export default {
      data () {
        return {
          selected:''
        }
      },
    }
</script>

<style scoped>
  .tabcon{
    overflow: hidden;
    position: absolute;
    top: 100px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    /* border: 1px solid #ccc; */
  }
  .tabcon_item{
    width: 100%;
  }
  .weekday{
    display: inline-block;
    width: 20%;
    border: 1px solid #ccc;
    box-sizing: border-box;
    text-align: center;
    padding: 5px 0;
  }
  .actionCon{
    position: absolute;
    top: 90px;
    bottom: 10px;
    width: 100%;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .actionConDiv{
    width: 70%;
    margin: 0 auto;
  }
  .actionConBtn{
    width: 100%;
    background-color: #333333;
  }
  .actionConDivLable{
    margin-top: 50px;
    margin-bottom: 10px;
  }

</style>
