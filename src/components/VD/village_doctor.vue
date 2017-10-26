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
        <mt-navbar v-model="tabSelected">
            <mt-tab-item id="1">预约挂号</mt-tab-item>
            <mt-tab-item id="2">查询挂号</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="tabSelected" class="tabcon"  v-show="schedulings.length != 0">
            <mt-tab-container-item class="tabcon_item" id="1">
                <div class="con1">
                    <div class="weekdayCon">
                        <div v-for="(item, index) in schedulings " :key="item.scheduleTranferDate" class="weekday" :class="{ active: daySelected == index }" @click="daySelected = index">
                            <div>{{item.weekString}}</div>
                            <div>{{item.scheduleTranferDate}}</div>
                            <div  :class="item.canAppointment?'green':'red' ">{{item.canAppointment?'预约':'约满' }}</div>
                        </div>
                    </div>
                    <div class="actionCon">
                        <div class="actionConDiv">
                            <div class="actionConDivLable"><b>上午：剩余</b>{{schedulings[daySelected].scheduling[0] && schedulings[daySelected].scheduling[0].number}}</div>
                            <mt-button class="actionConBtn" :disabled="schedulings[daySelected].scheduling[0] && schedulings[daySelected].scheduling[0].number==0"
                                       type="primary" size="normal" @click="apply(schedulings[daySelected].scheduling[0].scheduleId,schedulings[daySelected].scheduling[0].scheduleDate,schedulings[daySelected].scheduling[0].timePeriod)">{{schedulings[daySelected].scheduling[0] &&schedulings[daySelected].scheduling[0].number==0?'约满':'预约挂号'}}
                            </mt-button>
                            <div class="actionConDivLable"><b>下午：剩余</b>{{schedulings[daySelected].scheduling[1] && schedulings[daySelected].scheduling[1].number}}</div>
                            <mt-button class="actionConBtn" :disabled="schedulings[daySelected].scheduling[1] && schedulings[daySelected].scheduling[1].number==0"
                                       type="primary" size="normal" @click="apply(schedulings[daySelected].scheduling[1].scheduleId,schedulings[daySelected].scheduling[1].scheduleDate,schedulings[daySelected].scheduling[1].timePeriod)">{{schedulings[daySelected].scheduling[1] && schedulings[daySelected].scheduling[1].number==0?'约满':'预约挂号'}}
                            </mt-button>
                            <div class="actionConDivLable"><b>晚上：剩余</b>{{schedulings[daySelected].scheduling[2] && schedulings[daySelected].scheduling[2].number}}</div>
                            <mt-button class="actionConBtn" :disabled="schedulings[daySelected].scheduling[2] && schedulings[daySelected].scheduling[2].number==0"  type="primary"
                                       size="normal" @click="apply(schedulings[daySelected].scheduling[2].scheduleId,schedulings[daySelected].scheduling[2].scheduleDate,schedulings[daySelected].scheduling[2].timePeriod)">{{schedulings[daySelected].scheduling[2] && schedulings[daySelected].scheduling[2].number==0?'约满':'预约挂号'}}
                            </mt-button>
                        </div>
                    </div>
                    <mt-popup class="popupCon" v-model="isPopup" popup-transition="popup-fade" modal="true"
                              closeOnClickModal="true">
                        <div>
                            <div>
                                <div class="popup_prepare">预约</div>
                                <label class="popupStr">患者姓名：</label>
                                <mt-field placeholder="" type="text" v-model="appointmentRole.name"></mt-field>
                                <label class="popupStr">年龄：</label>
                                <mt-field placeholder="" type="number" v-model="appointmentRole.age"></mt-field>
                                <label class="popupStr">性别：</label>
                                <select v-model="selectSex" class="popup_select">
                                    <option v-for="option in options" :value="option">
                                        {{ option }}
                                    </option>
                                </select>
                                <label class="popupStr">身份证号：</label>
                                <mt-field placeholder="" :attr="{ maxlength: 18 }" v-model=appointmentRole.identity></mt-field>
                                <label class="popupStr">手机号：</label>
                                <mt-field placeholder="" type="tel" v-model="appointmentRole.phoneNumber"></mt-field>
                                <label class="popupStr">QQ邮箱：</label>
                                <mt-field placeholder="" type="email" v-model="appointmentRole.qqMail"></mt-field>
                                <mt-button class="popup_sumbitBtn" type="primary" size="normal" @click="applySumbit()">提交
                                </mt-button>
                            </div>
                        </div>
                    </mt-popup>
                    <mt-popup class="popupSuc" v-model="isPopupSuc" popup-transition="popup-fade" modal="true"
                              closeOnClickModal="true">
                        <div style="text-align: center">
                            <h2>预约成功！</h2>
                            <span class="popupSuc_str">患者: {{bookingname}}</span>
                            <span class="popupSuc_str">{{bookingtime}}</span>
                            <span class="popupSuc_str">{{bookingcode}}</span>
                        </div>
                    </mt-popup>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item class="tabcon_item" id="2">
                <mt-cell v-for="(item, index) in appointments"  :key="item.appointmentId">
                    <div class="row_con">
                        <div class="left_con" style="">
                            <span class="left_row">{{item.realName}}</span>
                            <span class="left_row" v-if="item.status==0">未取号</span>
                          <span class="left_row" v-if="item.status==1">已取号</span>
                        </div>
                        <div class="right_con" style="display: inline-block">
                            <span class="right_row">身份证：{{item.idCard}}</span>
                            <span class="right_row">预约检查时间：{{item.scheduleDate}} {{item.timePeriod}}</span>
                            <span class="right_row">预约码：{{item.appointmentNumber}}</span>
                        </div>
                    </div>
                </mt-cell>
            </mt-tab-container-item>
        </mt-tab-container>
        <!--tab内容-->
        <!--<router-view style="height: 100%"></router-view>-->
    </div>

</template>

<script>
    import {Toast} from 'mint-ui';
    import {Header} from 'mint-ui';
    import {Navbar, TabItem} from 'mint-ui';
    import {Popup} from 'mint-ui';

    export default {
        created() {
            var that = this;
            that.$api.schedulingList(that, (ret) => {
                if (ret.code != 200) {
                    Toast(ret.msg);
                } else {
                    var data = new Date();
                    var today = (data.getMonth() + 1) + '-' + (data.getDate());
                    ret.result.forEach(function (value, index, array) {
                        value.weekString = (today == value.scheduleTranferDate ? '今天' : value.weekString ) || '空';
                        value.scheduleTranferDate = value.scheduleTranferDate || '空';
                        value.canAppointment = (value.totalNumber == 0 ? false : true) || false;
                    });
                    that.schedulings = ret.result;
                    console.log('schedulings 预约日期列表：', ret.result)
                }
            }, (e) => {
                Toast("获取列表失败！:" + e);
            });
          that.$api.appointmentList(that,that.$localstore.get('userId'), (ret) => {
            if (ret.code != 200) {
              Toast(ret.msg);
            } else {
              that.appointments = ret.result;
            }
          }, (e) => {
            Toast("获取列表失败！:" + e);
          });
        },
        data() {
            return {
                tabSelected: '1',
                daySelected: 0,
                bookingname:'',
                bookingcode:'',
                bookingtime:'',
                isPopup: false,     //预约窗口 flag
                isPopupSuc:false,   //预约成功 flag
                schedulings: [],
                appointmentRole:{
                    name:'',
                    age:'',
                    sex:'男',
                    identity:'',
                    phoneNumber:'',
                    qqMail:'',
                },
                options:['男','女'],
                selectSex:'男'
        }},
        methods: {
            apply: function (scheduleId,scheduleDate,timePeriod) {
                this.$localstore.set('scheduleId',scheduleId);
              this.$localstore.set('scheduleDate',scheduleDate);
              this.$localstore.set('timePeriod',timePeriod);
                this.isPopup = true;
            },
            applySumbit:function () {
                var me = this;
                let data={
                    scheduleId:this.$localstore.get('scheduleId'),
                    createrId:this.$localstore.get('userId'),
                    idCard:this.appointmentRole.identity,
                    sex:this.appointmentRole.selectSex,
                    age:this.appointmentRole.age,
                    phone:this.appointmentRole.phoneNumber,
                    email:this.appointmentRole.qqMail,
                    realName:this.appointmentRole.name,
                    appointmentTime:this.$localstore.get('scheduleDate')+" "+this.$localstore.get('timePeriod'),
                }
                me.$api.registerBooking(me,data,(ret) => {
                    if (ret.code != 200) {
                        Toast(ret.msg);
                    }else{
                        this.$router.push('/vd');
                        this.isPopup = false;
                        this.bookingname = ret.result.name ;
                        this.bookingcode = ret.result.code;
                        this.bookingtime = ret.result.time;
                        this.isPopupSuc=true;
                    }
                }, (e) => {
                    Toast("获取列表失败！:" + e);
                });
            }
        }

    }
</script>

<style scoped>
    .tabcon {
        overflow: hidden;
        position: absolute;
        top: 100px;
        bottom: 10px;
        left: 10px;
        right: 10px;
        overflow: scroll;
        /* border: 1px solid #ccc; */
    }

    .tabcon_item {
        width: 100%;
        height: 100%;
    }

    /*预约挂号*/
    .weekday {
        display: inline-block;
        width: 20%;
        border: 1px solid #ccc;
        box-sizing: border-box;
        text-align: center;
        padding: 5px 0;
    }
    .weekday.active{
        background-color: #333333;
        color: #FFFFFF;
    }
    .green{
        color: #1AAD19;
    }
    .red{
        color:#E64340;
    }


    .actionCon {
        position: absolute;
        top: 90px;
        bottom: 10px;
        width: 100%;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    .actionConDiv {
        width: 70%;
        margin: 0 auto;
    }

    .actionConBtn {
        width: 100%;
        background-color: #333333;
    }

    .actionConDivLable {
        margin-top: 50px;
        margin-bottom: 10px;
    }

    /*预约菜单*/
    .popupCon {
        width: 75%;
        height: 85%;
        padding: 5px 10px;
    }

    .popup_prepare {
        text-align: center;
        border-bottom: 1px solid #9c9c9c;
        padding-bottom: 5px;
        margin-top: 5px;
        margin-bottom: 15px;
    }

    .popupStr {
        display: block;
        margin: 0px 0px 5px;
        padding: 0px 10px;
    }

    .popup_select{
        width: 96%;
        height: 30px;
        margin: 3px 10px;
    }
    .popup_sumbitBtn {
        position: absolute;
        bottom: 5px;
        width: 240px;
        right: 50%;
        left: 50%;
        margin-left: -120px;
        background-color: #000;
    }

    /*查询挂号*/

    .row_con {
        display: flex;
        border: 1px solid #9c9c9c;
        color: black;
    }

    .left_con {
        padding: 2px;
        display: inline-block;
        flex: 1;
        /*border: 1px solid #9c9c9c;*/
    }

    .right_con {
        padding: 5px;
        display: inline-block;
        flex: 3;
        border-left: 1px solid #9c9c9c;
    }

    .left_row {
        display: inline-block;
        padding: 10px;
    }

    .right_row {
        display: inline-block;
        padding: 2px;
    }
    /*预约成功*/
    .popupSuc_str{
        display: inline-block;
        padding: 5px 80px;
        width: 100px;
    }
</style>
