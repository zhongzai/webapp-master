<template>
  <div class="page-field">
    <div class="page-title" style="text-align: center">预约挂号</div>
    <div class="page-part">
      <mt-field label="姓名" placeholder="请输入姓名" :attr="{ maxlength: 10 }" v-model="username"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field label="年龄" placeholder="请输入年龄" type="number" v-model="age"></mt-field>
      <mt-field  label="身份证号" placeholder="请输入身份证号" :attr="{ maxlength: 18 }" v-model="idcard"></mt-field>
      <label class="popupStr" >性别
        <mt-picker :slots="numberSlot" @change="onNumberChange" :visible-item-count="3" v-model="sex"></mt-picker>
      </label>
      <mt-button class="popup_sumbitBtn" type="primary" size="normal" @click="bookingRegister()">提交</mt-button>
    </div>
  </div>
</template>

<script>
  import { Picker } from 'mint-ui';
  export default {
    data () {
      return {
        numberSlot: [{
          flex: 1,
          defaultIndex: 0,
          textAlign: 'left',
          values: ["男","女"],
          className: 'slot3'
        }]
      }
    },
    methods: {
      onNumberChange(picker, values) {
        this.sex = values[0];
      },
      bookingRegister(){
        var me = this;
        let data={
            scheduleId:this.$localstore.get('scheduleId'),
            userId:this.$localstore.get('userId'),
            idCard:this.idcard,
            sex:this.sex,
            age:this.age,
            phone:this.phone,
            email:this.email,
          realName:this.username,
          appointmentTime:this.$localstore.get('scheduleDate')+" "+this.$localstore.get('timePeriod'),
        }
        me.$api.registerBooking(me,data,(ret) => {
          if (ret.code != 200) {
            Toast(ret.msg);
          }else{
            this.$router.push('/vd/1');
            //TODO





          }
        }, (e) => {
          Toast("获取列表失败！:" + e);
        });
      }


    }
  };
</script>
