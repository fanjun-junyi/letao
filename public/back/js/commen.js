/*
* @Author: fanjun-junyi
* @Date:   2017-11-08 10:58:12
* @Last Modified by:   fanjun-junyi
* @Last Modified time: 2017-11-09 15:11:30
*/

// 进度条效果
NProgress.configure({ showSpinner: false });
$(document).ajaxStart(function() {
  /* Stuff to do when an AJAX call is started and no other AJAX calls are in progress */;
  NProgress.start();
});
$(document).ajaxStop(function() {
  /* stuff to do when all AJAX calls have completed */;
  setTimeout(function(){
    NProgress.done();
  },500)
});

//页面一加载，先发送一个判断用户是否登录的请求,如果没登录，跳转到登录页面。
//非登陆页发送这个ajax请求
if(location.href.indexOf('login.html')==-1){
  $.ajax({
    url: '/employee/checkRootLogin',
    type:"get",
    success:function(data){
      if(data.error == 400){
        location.href = "login.html";
      }
    }
  })
}

// 二级菜单显示隐藏功能
$('.child').prev().on('click',function(){
  $(this).next().slideToggle(500);
})

//  侧边栏显示隐藏功能
$('.btn_menu').on('click',function(){
  $('.lt_aside').toggleClass('now');
  $('.lt_main').toggleClass('now');
})
// 退出功能
$('.btn_logout').on('click',function(){
  $('#logoutModal').modal('show');
  

  //  on 注册事件不会覆盖
  // off解绑事件
  //off("click") 只解绑click事件
  //off("click", "**"); 解绑委托事件

  // 给服务器发送ajax请求 清空session
  $('.btn_confirm').off().on('click',function(){
      $.ajax({
        url:'/employee/employeeLogout',
        typr:'get',
        success:function(data){
          if(data.success){
            location.href = 'login.html';
          }
        }
      })
  })
})
