<template>
    <div>

    </div>
</template>

<script type="text/ecmascript-6">
    import {Toast} from 'mint-ui';
    import { MessageBox } from 'mint-ui';
    export default{
        props: [],
        data () {
          return {
            askSelect:{},
            slots:[{values:[]}],
            doctors:[],
            loading:true,
          }
        },
        methods:{
          getSites(){
            var me = this;
            var params={pageSize:300,pageNum:1};
            me.$api.getSites(this,params, (ret) => {

              if (ret.status != 0) {
                Toast(ret.message);
              } else {
                me.sites = ret.list;
              }

            }, (e) => {
              Toast("获取机构列表出错:" + e);
            });
          },
          getDoctors(){

            var me = this;
            var params={pageSize:300,pageNum:1,blocked:0,rolename:'doctor'};
            me.$api.getUsers(me,params, (ret) => {

              if (ret.status != 0) {
                Toast(ret.message);
              } else {
                me.doctors = ret.list;
              }

            }, (e) => {
              Toast("获取医生列表出错:" + e);
            });

          },

//          Toast("获取机构列表出错:" + e);
        }
    }
</script>
<style>

</style>
