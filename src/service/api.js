import ajax from 'axios';
import {Toast} from 'mint-ui';

export default {
    doResp:function(ctx,data,cb)
    {
        if (data.status==-100) {
           Toast("会话过期，请重新登录");
           ctx.$router.replace({path: '/',replace: true,query: {code: -1}});
        }
        else
        {
            cb(data);
        }

    },
    dispatchAsk: function(ctx,data, ok, err) {
        ajax.post('/service/ask/dispatch', {}, {
                params: data
            })
            .then((resp,a,b) => {
                this.doResp(ctx,resp.data,ok); ;
            }).catch((e) => {
            console.log(e)          ;
                err(e)
            })
    },
    getSites:function(ctx,data,ok,err)
    {
        ajax.get('/service/site/list', {
                params: data
            })
            .then((resp,a,b) => {
                this.doResp(ctx,resp.data,ok); ;
            }).catch((e) => {
                err(e)
            })
    },
    getUsers:function(ctx,data,ok,err)
    {
        ajax.get('/service/user/list', {
                params: data
            })
            .then((resp,a,b) => {
                this.doResp(ctx,resp.data,ok); ;
            }).catch((e) => {
                err(e)
            })
    },

     askList:function(ctx,data,ok,err)
    {
      ajax.get('/service/ask/list', {
                params: data
            })
            .then((resp,a,b) => {
                this.doResp(ctx,resp.data,ok); ;
            }).catch((e) => {
                err(e)
            })
    },

     login: function(ctx,account, pass, ok, err) {
        ajax.post('/service/user/weblogin', {}, {
                params: {
                    'username': account,
                    'password': pass
                }
            })
            .then((resp,a,b) => {
                this.doResp(ctx,resp.data,ok); ;
            }).catch((e) => {
                console.log(e)          ;
                err(e)
            })
    },

}
