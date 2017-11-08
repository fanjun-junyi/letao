/*
* @Author: fanjun-junyi
* @Date:   2017-11-08 10:58:12
* @Last Modified by:   fanjun-junyi
* @Last Modified time: 2017-11-08 21:34:20
*/


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
