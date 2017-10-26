<template>
  <div>
    <!-- <mt-header title="三健医疗诊断系统" :fixed="false" class="appheader">
</mt-header> -->
    <div class="login-form">
      <label>账号：</label>
      <mt-field class="inputStr" placeholder="请输入用户名" type="text" v-model="username"></mt-field>
      <label>密码：</label>
      <mt-field class="inputStr" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <!--<mt-field label="用户名" placeholder="请输入用户名" type="text" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <div class="mint-cell-wrapper">-->
        <!--<span class="mint-cell-text" style="margin: 10px 10px">记住密码&nbsp;&nbsp;</span>-->
        <!--<mt-switch v-model="keeppass" style="margin: 10px 10px">-->
        <!--</mt-switch>-->
      <!--</div>-->
    </div>
    <div class="loginDiv" style="">
      <mt-button class="loginBtn" type="primary" size="normal" @click="login()">登录</mt-button>
    </div>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  export default{
    mounted(){
    },
    beforeRouteEnter (to, from, next) {

      next(vm => {
        vm.$setTitle(to.meta.title);
        var obj = vm.$localstore.get('keeppass');
        if (obj) {
          vm.keeppass = true;
        }
      });

    },
    data(){
      return {
        username: this.$localstore.get('username') || '',
        password: this.$localstore.get('pass') || '',
        keeppass: false
      }
    },
    methods: {
      login(){
          var that = this;
          that.$api.login(that,that.username,that.password,
            (ret) => {
              if (ret.code != 200) {
                Toast(ret.msg);
              }else{
                console.log('ret',ret);
                var user = ret.result;
                if (user.userType == 1) {       // 村医
                  this.$sessionstore.set('user', JSON.stringify(user));
                  this.$localstore.set('username', user.userName);
                  this.$localstore.set('userId', user.userId);
                  this.$router.push('/vd');
                }else if(user.userType == 2){   // 导医
                  this.$localstore.set('userId', user.userId);
                  this.$router.push('/gd');
                }
              }
          },
          (e) => {
            Toast("登录失败:" + e);
          });
      },
    }
  }
</script>

<style scoped>
  .login-form {
    padding-top: 50px;
    width: 80%;
    margin: 0 auto;
  }
  .inputStr {
    margin: 10px 0;
    border: 1px solid #333;
  }
  .loginDiv{
    text-align: center;
    width: 70%;
    margin: 50px auto;
    text-align: center;
  }
  .loginBtn{
    width: 100%;
    background-color: #333;
  }
</style>
