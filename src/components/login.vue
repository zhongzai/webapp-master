<template>
	<div>
		<!-- <mt-header title="三健医疗诊断系统" :fixed="false" class="appheader">     
</mt-header> -->
<div class="login-form">
<mt-field label="用户名" placeholder="请输入用户名" type="text" v-model="username"></mt-field>
<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>

<div class="mint-cell-wrapper" > 

<span class="mint-cell-text" style="margin: 10px 10px">记住密码&nbsp;&nbsp;</span>
<mt-switch v-model="keeppass" style="margin: 10px 10px">
</mt-switch>

</div>





</div>
<div style="text-align: center;margin:5px;">
<mt-button type="primary" @click="login()">登录</mt-button>
</div>

	</div>
</template>

<script>
import { Toast } from 'mint-ui';
	export default{
		mounted(){

		},
		beforeRouteEnter (to, from, next) {
  			
  			next(vm=>{
  				vm.$setTitle(to.meta.title);
  				var obj = vm.$localstore.get('keeppass');
  				if (obj) {
  					vm.keeppass = true;
  				}
  			}); 
  
		},
		data(){
			return{				
				username:this.$localstore.get('username') || '',
				password:this.$localstore.get('pass') || '',
				keeppass:false
			}
		},
		methods:{
			login(){
				this.$api.login(this,this.username,this.password,
					(ret)=>{
						console.log(ret);
						if (ret.status!=0) {
							Toast(ret.message);
						}						
						else
						{
							var user = ret.data;
							if (user.role !="cs") {
								Toast("目前仅支持客服用户");
							}
							else
							{
							this.$sessionstore.set('user',JSON.stringify(user));
							this.$localstore.set('username',this.username);
							if (this.keeppass==true) {
								this.$localstore.set('pass',this.password);
								this.$localstore.set('keeppass',true);
							}
							else{
								this.$localstore.set('pass',"");	
								this.$localstore.remove('keeppass');
							}
							
							this.$router.push('/kf');	
							}
							
						}
					},(err)=>{

						Toast(err);
					})
			}
		}
	}
</script>

<style scoped>
	.login-form {
	margin-top: 20px;
    text-align: center;
    color: #666;    
    border-bottom: solid 1px #eee;
}
</style>