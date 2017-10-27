<template>
  <div>
    <!--标题栏-->
    <mt-header title="远程取号" style="background-color: #333;">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div>
      <label  class="popupStr" style="margin-left: 8%;line-height: 35px;">预约码：</label>
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
        <div style="text-align: center;padding-top: 32px;position: relative;left: -15px;">
          <span class="popupSuc_str">患者: {{bookingname}}</span>
          <span class="popupSuc_str">{{bookingtime}}{{timePeriod}}</span>
          <span class="popupSuc_str">{{bookingcode}}</span>
        </div>
      </mt-popup>

      <mt-popup class="popupFai" v-model="isPopupFai" popup-transition="popup-fade" modal="true"
                closeOnClickModal="true">
        <div style="text-align: center;padding-top: 36px;">
          <span class="popupSuc_str" style="padding-bottom: 33px;color: #d62727;">&nbsp;查询失败！</span>
          <span class="popupSuc_str">预约码无效</span>
        </div>
      </mt-popup>
    </div>

    <div ref="recordDetail" style="display:none;margin-top: 30px;">

        <div class="row_con">
          <div class="left_con" ref="leftCon" style="padding-top: 56%;">
            <span class="left_row" style="position: absolute;top:46%;left:-72px;"><b>{{appointment.realName}}</b></span>
            <span class="left_row" ><b>年龄：</b>{{appointment.age}}</span>
            <span class="left_row" ><b>性别：</b>{{appointment.sex}}</span>
            <span class="left_row" ><b>手机号：</b>{{appointment.phone}}</span>
            <span class="right_row"><b>身份证：</b>{{appointment.idCard}}</span>
            <span class="right_row"><b>邮箱：</b>{{appointment.email}}</span>
            <span class="right_row"><b>预约时间：</b>{{appointment.scheduleDate}} {{appointment.timePeriod}}</span>
            <span class="left_row" v-if="appointment.status==0"><b>状态：</b><i  style="color: #3cda6e;">未取号</i></span>
            <span class="left_row" v-if="appointment.status==1"><b>状态：</b><i  style="color: #d62727;">已取号</i></span>
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
//            if(screen.width > 320){
//              this.$refs.leftCon.style.paddingTop="56px";
//            }
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
    height: 30px;
    outline:none;
    padding-left: 5px;
    border: 1px solid #979797;
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
    margin-top:37px;
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
    line-height: 26px;
  }
  /*预约成功*/
  .popupSuc_str{
    display: inline-block;
    padding: 5px 80px;
    width: 100px;
  }
  .popupFai,.popupSuc{
    width: 252px;
    height: 155px;
    border-radius: 5px;
  }
  .left_row b{
    font-weight: bold;
  }
  i{
    font-style:normal;
  }
</style>
