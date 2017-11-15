/*
* @Author: fanjun-junyi
* @Date:   2017-11-15 10:51:11
* @Last Modified by:   fanjun-junyi
* @Last Modified time: 2017-11-15 11:08:02
*/

$(function(){
  //发送ajax请求，获取个人信息
  $.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    success:function(data){
      tools.checkLogin(data);
      //渲染模板
      // console.log(data)
      $('.userinfo').html(template('infoTmp',data))
    }
  });

  //退出功能
  $('.lt_logout .mui-block').on('click',function(){
    //发送退出的ajax请求
    $.ajax({
      url:'/user/logout',
      type:'get',
      success:function(data){
        if(data.success){
           location.href = "login.html";
        }
      }
    });

  })


})