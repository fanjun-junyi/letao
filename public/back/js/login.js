/*
* @Author: fanjun-junyi
* @Date:   2017-11-08 11:00:14
* @Last Modified by:   fanjun-junyi
* @Last Modified time: 2017-11-08 21:23:08
*/

$(function(){
  var $form = $('form');

  $form.bootstrapValidator({
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      username: {
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          callback:{
            message:"用户名错误"
          }
        }
      },
      password: {
        validators: {
          notEmpty:{
            message: "密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度为6-12位"
          },
          callback:{
            message: "密码错误"
          }
        }
      }
    }
  })


  $form.on('success.form.bv',function(e){
        e.preventDefault();

        $.ajax({
          type:'post',
          url:'/employee/employeeLogin',
          data:$form.serialize(),
          success:function(data){
            console.log(data);
            if(data.success){
              location.href = "index.html";
            }
            if(data.error ===1000){
                // 获取validator实例(对象)
                // var validator = $("#form").data('bootstrapValidator'); 

                // 更新字段的状态updateStatus(field, status, validatorName)方法
                $form.data('bootstrapValidator').updateStatus('username','INVALID',"callback");
            }
            if(data.error === 1001){
              $form.data('bootstrapValidator').updateStatus("password",'INVALID','callback')
            }
          }
        })
  })

    // 表单重置功能
    $("[type='reset']").on('click',function(){
      $form.data("bootstrapValidator").resetForm();
    })
})