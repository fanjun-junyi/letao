/*
* @Author: fanjun-junyi
* @Date:   2017-11-10 19:35:12
* @Last Modified by:   fanjun-junyi
* @Last Modified time: 2017-11-10 20:27:01
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

  // 校验表单
  var $form = $('#form');
  $form.bootstrapValidator({
    // 小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 校验规则
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类"
          }
        }
      }
    }
  });

   //注册表单校验成功事件，成功之后，发送ajax请求
   $form.on('success.form.bv',function(e){
    //阻止默认提交
      e.preventDefault();

    //使用ajax进行提交
      $.ajax({
        type:"post",
        url:"/category/addTopCategory",
        // 表单序列化
        data:$form.serialize(),
        success:function(data){
          // console.log("heh")
          if(data.success){
            // 隐藏模态框
            $('#addModal').modal('hide');
            //重新渲染第一页，因为添加的最新的数据在第一页
            currentPage = 1;
            render();
            // 重置模态框 方便下一次使用
            //获取到表单校验的实例,重置校验的样式
            $form.data("bootstrapValidator").resetForm();
            // DOM对象   jquery对象
            // DOM对象与jquery对象之间的方法不能混着用。
            // var div = document.getElementById("box");
            // $(div).html();

            //jquery对象其实就是dom对象的一个封装。 jquery对象是一个伪数组，内部存放的是DOM对象
            // reset() dom对象的一个方法
            $form[0].reset();
          }
        }
      });

   })


})