<template>
  <div>
    <!-- <mt-header title="三健医疗诊断系统" :fixed="false" class="appheader">
</mt-header> -->
    <div class="login-form">
      <label>账号：</label>
      <mt-field class="inputStr" placeholder="请输入用户名" type="text" v-model="username"></mt-field>
      <label>密码：</label>
      <mt-field class="inputStr" placeholder="请输入密码" type="password" v-model="password" ></mt-field>

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
        password: this.$localstore.get('password') || '',
        keeppass: false
      }
    },
    methods: {
      login(){
        var me = this;
        me.$api.login(me,me.username,me.password,(ret) => {

          if (ret.code != 200) {
            Toast(ret.msg);
          }else{
            var user = ret.result;
            if (user.userType == 1) {       // 村医
              this.$sessionstore.set('user', JSON.stringify(user));
              this.$localstore.set('username', this.username);
              this.$localstore.set('userId', user.userId);

              console.log(this.username);
              this.$router.push('/vd/1');
            }else if(user.userType == 0){   // 导医
              Toast("目前仅支持村医");
            }
          }
        }, (e) => {
          Toast("登录失败:" + e);
        });

       }
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
