<template>

  <div style="height: 100%">
     <!-- <mt-header :title="total" :fixed="false" class="appheader">
     <mt-button  @click="logout" slot="right"><i class="icon sign out"></i>退出</mt-button>
</mt-header>  -->

<div class="page-desc">共<span style="color:#ed3f14">{{allCount}}</span>个待分配，下拉刷新,上拉加载</div>
  <mt-spinner  type="double-bounce" :size="32" color="#26a2ff" v-show="loading"></mt-spinner>


<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
 <mt-loadmore ref="loadmore" :top-method="refresh" :topDistance=40
               class="page-loadmore-list" :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :bottomDistance=40 :autoFill="false">

     <div v-for='item in data'>
        <div class="page-listitem">
        <table style="width: 100%">

          <tr>
           <td  class="title">{{getInstitution(item.data.ask.askSite)}}</td>
            <td class="operation" rowspan="3" valign="middle" @click="dispatch(item)">
              <span ><i class="icon chevron right"></i></span>
            </td>
          </tr>
          <tr >
          <td class="desc">
            姓名:{{item.data.image.patientname}}
            </td>


          </tr>
          <tr>
            <td class="desc">
              咨询时间:{{item.data.ask.asktime}}
            </td>
          </tr>
        </table>


        </div>
      </div>

</mt-loadmore>
</div>
<mt-popup v-model="popupshow" position="right" class="popup">

<div class="page-loadmore-wrapper"  :style="{ height: wrapperHeight +50 + 'px' }">
<div v-for='item in doctors' class="page-listitem">
  <table style="width:100%">
    <tr>
      <td rowspan="3" width="50">
        <img src="../../assets/images/head.png" style="border-radius: 100px" width="48" height="48" />
      </td>
      <td class="title">
        {{item.name}}
      </td>
      <td rowspan="3" valign="middle" style="text-align: right;margin-right: 5px">
        <mt-button size="small" type="primary" @click.native="submitDispatch(item)">分配</mt-button>
      </td>
    </tr>
    <tr>
      <td class="desc">
        {{item.level}}
      </td>
    </tr>
    <tr>
      <td class="desc">
        {{getInstitution(item.site.id)}}
      </td>
    </tr>
  </table>
 </div>
 </div>

    </mt-popup>
</div>
</template>

<script>

import {Toast} from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {

  data () {
    return {
      askSelect:{},
      slots:[{values:[]}],
      doctors:[],
      total:0,
      allCount:0,
      sites:[],
      pageNum:1,
      pageSize:10,
      allLoaded:false,
      data:[],
      wrapperHeight: 0,
      popupshow:false,
      loading:true
    }
  },
  mounted (){

    this.wrapperHeight = document.body.clientHeight - 100;


  },
  beforeRouteLeave (to, from, next) {

    if (this.popupshow) {
      this.closePopup();
      next(false);
    }
    else
    {
      next();
    }
  },
beforeRouteEnter (to, from, next) {


  next(vm => {
    // 通过 `vm` 访问组件实例
    vm.$setTitle(to.meta.title);
    vm.getDoctors();
    vm.getSites();
    vm.refresh();



  })
},


  methods:{
    getInstitution(siteid)
    {
      for (var i = this.sites.length - 1; i >= 0; i--) {
        if (this.sites[i].id == siteid) {
          return this.sites[i].name;
        }
      }
    },
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
    submitDispatch(docSelected)
    {
        MessageBox.confirm('确定分配给 '+docSelected.name+'?').then(action => {
        var me = this;

        if (!docSelected.id || !me.askSelect.id) {
          Toast("数据异常，请刷新");
          return;
        }
        else
        {

          var params={askid:me.askSelect.id,doctorid:docSelected.id};
          this.$api.dispatchAsk(this,params,(ret)=>{
          if (ret.status==0) {
            Toast("分配成功")    ;
            me.closePopup();
            me.refresh();
          }
          else
          {
            Toast(ret.message);
          }

        },(e)=>{
          Toast("分配失败:"+e);
        })
      }

    }).catch((e)=>{

    })


    },

    closePopup()
    {
      this.$setTitle(this.$route.meta.title);
      this.askSelect = {};
      this.popupshow = false;

    },
    getDoctors()
    {

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
   dispatch(item){
      this.$setTitle(item.data.image.patientname);
      this.askSelect = item.data.ask;
      this.popupshow = true;

   },
    logout(){
      this.$localstore.set('user','');
      this.$router.replace('/');
    },

    loadMore(){
      var me= this;

      me.pageNum+=1;
      me.getData(()=>{
        this.$refs.loadmore.onBottomLoaded();
        document.body.scrollTop=0;
        this.$nextTick(function(){
          this.wrapperHeight = document.body.clientHeight - 100;
        });

      });

    },
    refresh()
    {

      var me= this;
      me.data=[];
      me.pageNum=1;
      me.total = 0;
      me.allLoaded=false;
      me.getData(()=>{
        this.$refs.loadmore.onTopLoaded();
        document.body.scrollTop=0;
        this.$nextTick(function(){
          this.wrapperHeight = document.body.clientHeight - 100;
        });

      });


    },

    getData: function(cb)
    {

      var me=this;
      var user = this.$user;
      var data={pageSize:me.pageSize,pageNum:me.pageNum,
         rolename:me.$user.role,status:0,asktimedesc:true};

      me.loading = true;
      me.$api.askList(this, data, (ret)=> {

          if (ret.status==0) {

            this.allCount = ret.totalRow;
            this.data = this.data.concat(ret.data);
            me.total += ret.data.length;
            if (me.total>=ret.totalRow) {
              me.allLoaded=true;
            }

          }

          else
          {
            Toast(ret.message);
          }


          cb();
          me.loading = false;
      },
      (err)=>{
        Toast(err);
        me.loading = false;
      }
     );


    }
  }
}
</script>

<style scoped>

.doctor{

    border-bottom: solid 1px #eee;
    margin: 5px auto;
    text-align: left;

}
.doctor div{
  color: #495060;
  width: 100% !important;
  margin-bottom: 3px;
}

.page-desc {
    text-align: center;
    padding-bottom: 5px;
    border-bottom: solid 1px #000;
    background-color: #f8f8f9;
}
.page-listitem {
    border-bottom: solid 1px #ddd;
    margin: 5px auto;
    text-align: left;


}
.page-listitem .title{
    font-size: 14px;
    color: #1c2438;
    font-weight:bold;
}
.page-listitem .desc{
    font-size: 14;
    color: #495060;


}
.page-listitem .operation{
    text-align: right;
    padding-right: 15px;
    color: #555;
}
.popup
{
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

</style>
