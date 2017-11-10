/*
* @Author: fanjun-junyi
* @Date:   2017-11-10 19:35:12
* @Last Modified by:   fanjun-junyi
* @Last Modified time: 2017-11-10 19:57:51
*/

$(function(){
  var currentPage = 1;
  var pageSize = 5;

  // 渲染表格
  function render(){
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(data){
        // console.log(data);
        var html = template("firstTmp",data);
        $('tbody').html(html);

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages:Math.ceil(data.total/pageSize),
          onPageClicked:function(a,b,c,page){
            //修改成当前页
            currentPage = page;
            //重新渲染
            render();
          }
        });
      }
    });
  }
  render();

  $('.btn_add').on('click',function(){
    $("#addModal").modal("show");
  })
})