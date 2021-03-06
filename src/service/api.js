import ajax from 'axios';
import {Toast} from 'mint-ui';

export default {
  doResp: function (ctx, data, cb) {
    if (data.status == -100) {
      Toast("会话过期，请重新登录");
      ctx.$router.replace({path: '/', replace: true, query: {code: -1}});
    }
    else {
      cb(data);
    }

  },
 /* dispatchAsk: function (ctx, data, ok, err) {
    ajax.post('/service/ask/dispatch', {}, {
      params: data
    })
      .then((resp, a, b) => {
        this.doResp(ctx, resp.data, ok);
        ;
      }).catch((e) => {
      console.log(e);
      err(e)
    })
  },
  getSites: function (ctx, data, ok, err) {
    ajax.get('/service/site/list', {
      params: data
    })
      .then((resp, a, b) => {
        this.doResp(ctx, resp.data, ok);
        ;
      }).catch((e) => {
      err(e)
    })
  },
  getUsers: function (ctx, data, ok, err) {
    ajax.get('/service/user/list', {
      params: data
    })
      .then((resp, a, b) => {
        this.doResp(ctx, resp.data, ok);
        ;
      }).catch((e) => {
      err(e)
    })
  },

  askList: function (ctx, data, ok, err) {
    ajax.get('/service/ask/list', {
      params: data
    })
      .then((resp, a, b) => {
        this.doResp(ctx, resp.data, ok);
        ;
      }).catch((e) => {
      err(e)
    })
  },*/

  login: function (ctx, account, pass, ok, err) {
    ajax.post('/service/user/login', {
      'userName': account,
      'password': pass
    })
      .then((resp, a, b) => {
        this.doResp(ctx, resp.data, ok);
        ;
      }).catch((e) => {
      console.log(e);
      err(e)
    })
  },
  schedulingList: function (ctx, ok, err) {
    ajax.post('/service/scheduling/findAllRecords')
      .then((resp, a, b) => {
        this.doResp(ctx, resp.data, ok);
      }).catch((e) => {
      err(e)
    })
  },
    registerBooking: function(ctx,data, ok, err) {
        ajax.post('/service/appointment/add', data)
            .then((resp,a,b) => {
                this.doResp(ctx,resp.data,ok);
            }).catch((e) => {
            console.log(e)          ;
            err(e)
        })
    },
  appointmentList: function (ctx,createrId,ok, err) {
    ajax.post('/service/appointment/list',{
      'createrId': createrId
    })
      .then((resp, a, b) => {
        this.doResp(ctx, resp.data, ok);
      }).catch((e) => {
      err(e)
    })
  },
  checkAppointment: function (ctx,appointmentNumber,ok, err) {
    ajax.post('/service/appointment/checkAppointment',{
      'appointmentNumber':appointmentNumber,
    })
      .then((resp, a, b) => {
        this.doResp(ctx, resp.data, ok);
      }).catch((e) => {
      err(e)
    })
  },
  getNumber: function (ctx,appointmentNumber,ok, err) {
    ajax.post('/service/appointment/getNumber',{
      'appointmentNumber':appointmentNumber,
    })
      .then((resp, a, b) => {
        this.doResp(ctx, resp.data, ok);
      }).catch((e) => {
      err(e)
    })
  },
}
