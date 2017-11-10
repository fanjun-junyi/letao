/*
* @Author: fanjun-junyi
* @Date:   2017-11-10 18:15:41
* @Last Modified by:   fanjun-junyi
* @Last Modified time: 2017-11-10 19:24:09
*/

$(function(){
  // 页面已加载就渲染表格数据
  var currentPage = 1; //记录当前页
  var pageSize = 5; // 记录每页的数量
  function render(){
    $.ajax({
    type:'get',
    url:'/user/queryUser',
    data:{
      page: currentPage,
      pageSize: pageSize
    },
    success:function(data){
      // console.log(data)
      var html = template("userTmp",data);
      $('tbody').html(html);

      // 渲染分页
      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage:currentPage,//当前页
        totalPages: Math.ceil(data.total/pageSize),//总页数
        size:"small",//设置控件的大小，mini, small, normal,large
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          currentPage = page;
          render();
      }

    })
    }
    })
  }
  render();

  // 为禁用启用按钮注册委托事件改变状态
  $('tbody').on('click','.btn',function(){
    // console.log("heh ")
    $('#userModal').modal('show');
    //获取到当前按钮对应的id
    var id = $(this).parent().data('id');
     //获取是禁用还是启用, 如果是禁用按钮，发送0，否则发送1
    var isDelete = $(this).hasClass('btn-danger')?0:1;

    $('.btn_edit').off().on('click',function(){
      $.ajax({
        url:'/user/updateUser',
        type:"post",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(data){
          // console.log("heh")
          if(data.success){

            //操作成功
            //模态框关闭
            $("#userModal").modal("hide");
            //重新渲染
            render();
          }
        }
      });
    })
  })

})