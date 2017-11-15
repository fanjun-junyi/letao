/*
* @Author: fanjun-junyi
* @Date:   2017-11-15 11:09:00
* @Last Modified by:   fanjun-junyi
* @Last Modified time: 2017-11-15 16:31:24
*/

$(function(){
  //思路
  // 1. 发送ajax请求，获取购物车数据
  //2. 下拉刷新功能
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        //style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
        //color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
        //height:'50px',//可选,默认50px.下拉刷新控件的高度,
        //range:'100px', //可选 默认100px,控件可下拉拖拽的范围
        //offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        //下拉时，会触发这个function
        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        callback :function(){
            $.ajax({
                url:'/cart/queryCart',
                type:'get',
                success:function(data){
                  setTimeout(function(){
                    tools.checkLogin(data);
                    // console.log(data)
                    $('.mui-table-view').html(template('cartTmp',{data:data}));
                    $(".lt_total .total").html("00.00");
                    mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                  },1000)
                }
            });

        }
      }
    }
});

  //删除功能
  //1. 给删除按钮注册委托事件
  //2. 获取到当前购物车的id
  //3. 发送ajax请求，删除成功之后，重新渲染页面
  // 是代理"tap"事件,不是"tab"
  // $('.lt_content').on('tab','.btn_delete_cart',function(){
  $(".lt_content").on("tap", ".btn_delete_cart", function () {
    console.log('ff')
    var id = $(this).data('id');
    mui.confirm('确定删除吗','大傻逼',['是','否'],function(e){
      if(e.index===0){
        $.ajax({
          url:'/cart/deleteCart',
          type:'get',
          data:{
            id:'id'
          },
          success:function(data){
            if(data.success){
              //成功之后，需要手动的下拉刷新一次
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        });
      }
    })
  })

  //编辑功能
  //1. 给编辑按钮注册点击事件
  //2. 获取到当前的id
  //3. 发送ajax请求，获取当前商品的详细的信息
  //4. 修改信息
  //5. 点击确定按钮，发送ajax请求，保存
  //6. 重新渲染
   $(".lt_content").on("tap", ".btn_edit_cart", function (){
      var data = this.dataset;
      //渲染一个模板，修改商品
      // var html = template('editTmp',data)
      //去除html中所有的换行，
      // html = html.replace(/\n/g, "");
      var html = template("editTmp", data);
   
      html = html.replace(/\n/g, "");
      //显示confirm框
      mui.confirm(html,"别墨迹",['确定','取消'],function(e){

        if(e.index===0){
          //点击了确定按钮，获取参数，发送ajax请求
          var id = data.id;
          var size = $('.lt_edit_size span.now').html();
          var num =  $(".lt_edit_num .mui-numbox-input").val();

          $.ajax({
            url:'/cart/updateCart',
            type:'post',
            data:{
              id:id,
              size:size,
              num :num
            },
            success:function(data){
              if(data.success){
                //手动下拉刷新
                 mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
              }
            }
          });

        }
      })

      //选择尺码，lt_edit_size下span注册
      $('.lt_edit_size span').on('tap',function(){
        $(this).addClass('now').siblings().removeClass('now');
      })
      //初始化数字框  
      mui(".mui-numbox").numbox();
   })

    //给要所有的checkbox注册点击事件
    $('.lt_content').on('change','.ck',function(){
      //获取到选中的checkbox

      //计算总金额
      var total = 0;
      $('.ck:checked').each(function(){
        //each()的两个参数是index 和value
        // each()里面的参数可以用this来等价 this = value;
        //获取当前元素的价钱和数量。
        total +=this.dataset.price * this.dataset.num;
      })

      //保留2位小数
      $(".lt_total .total").html(total.toFixed(2));
    })
  

  


})