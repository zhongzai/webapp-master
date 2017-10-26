<template>
  <div>
    <!--标题栏-->
    <mt-header title="远程取号" style="background-color: #333;">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div>
      <label  class="popupStr">预约码：</label>
      <div class="input-warp">
        <input type="text" class="appointment-input" v-model="appointmentNumber">
      </div>

<!--
      <mt-field placeholder="" type="text" v-model="appointmentNumber"></mt-field>
-->

      <mt-button class="popup_sumbitBtn" type="primary" size="normal"  @click="checkAppointment()">查询
      </mt-button>
      <mt-popup class="popupSuc" v-model="isPopupSuc" popup-transition="popup-fade" modal="true"
                closeOnClickModal="true">
        <div style="text-align: center">
          <span class="popupSuc_str">患者: {{bookingname}}</span>
          <span class="popupSuc_str">{{bookingtime}}{{timePeriod}}</span>
          <span class="popupSuc_str">{{bookingcode}}</span>
        </div>
      </mt-popup>

      <mt-popup class="popupFai" v-model="isPopupFai" popup-transition="popup-fade" modal="true"
                closeOnClickModal="true">
        <div style="text-align: center">
          <span class="popupSuc_str">查询失败！</span>
          <span class="popupSuc_str">预约码无效</span>
        </div>
      </mt-popup>
    </div>

    <div ref="recordDetail" style="display:none;margin-top: 20px;">

        <div class="row_con">
          <div class="left_con" style="">
            <span class="left_row" style="position: absolute;top:0;left:-80px;">{{appointment.realName}}</span>
            <span class="left_row" >年龄：{{appointment.age}}</span>
            <span class="left_row" >性别：{{appointment.sex}}</span>
            <span class="left_row" >手机号：{{appointment.phone}}</span>
            <span class="right_row">身份证：{{appointment.idCard}}</span>
            <span class="right_row">邮箱：{{appointment.email}}</span>
            <span class="right_row">预约时间：{{appointment.scheduleDate}} {{appointment.timePeriod}}</span>
            <span class="left_row" v-if="appointment.status==0">状态：未取号</span>
            <span class="left_row" v-if="appointment.status==1">状态：已取号</span>
          </div>


        </div>

      <mt-button class="popup_sumbitGetBtn" type="primary" size="normal" @click="getNumber()">取号
      </mt-button>
    </div>

  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        appointmentNumber:'',
        appointment:{},
        isPopupSuc:false,
        isPopupFai:false,
        bookingname:'',
        bookingcode:'',
        bookingtime:'',
        timePeriod:'',
      }
       },
    methods: {
      checkAppointment:function () {

        var me = this;
        me.$api.checkAppointment(me,me.appointmentNumber,(ret) => {
          if (ret.code != 200) {
            this.$refs.recordDetail.style.display = 'none';
            this.isPopupFai=true;
          }else{
            me.appointment = ret.result;
            me.bookingname = ret.result.realName ;
            me.bookingcode = ret.result.appointmentNumber;
            me.bookingtime = ret.result.scheduleDate;
            me.timePeriod = ret.result.timePeriod;
            this.$refs.recordDetail.style.display = 'block';
          }
        }, (e) => {
          Toast("获取列表失败！:" + e);
        });
      },

      getNumber:function () {

        var me = this;
        me.$api.getNumber(me,me.appointmentNumber,(ret) => {
          if (ret.code != 200) {
            Toast(ret.msg);
          }else{
            this.isPopupSuc=true;
          }
        }, (e) => {
          Toast("获取列表失败！:" + e);
        });
      },

    }
  }
</script>

<style scoped>
  .input-warp{
    width: 80%;
    margin: 0 auto;
  }
  .appointment-warp{
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    padding-bottom: 80px;
  }
  .appointment-input{
    width: 100%;
    outline:none;
    -webkit-appearance: none;
  }
  .popup_sumbitBtn {
    bottom: 5px;
    width: 240px;
    right: 50%;
    left: 50%;
    margin-left: -120px;
    margin-top:20px;
    background-color: #000;
  }
  .popup_sumbitGetBtn {
    bottom: 5px;
    width: 240px;
    right: 50%;
    left: 50%;
    margin-left: -120px;
    margin-top:130px;
    background-color: #000;
  }
  .popupStr {
    display: block;
    margin: 0px 0px 5px;
    padding: 0px 10px;
  }

  input:focus, textarea:focus {
    outline: none;
  }

  .row_con{
    width: 90%;
    margin:0 auto;
    color: #000;
    position: relative;
  }
  .row_con span{
    display: block;
    padding-left: 80px;
  }
  /*预约成功*/
  .popupSuc_str{
    display: inline-block;
    padding: 5px 80px;
    width: 100px;
  }
</style>
