define(function(require) {
  var main = require('/assets/v1/examples/modules/main.js');
  var m = new main();
  $(function(){
    $('.call_modal').click(function(){
      var target = $(this).data('target');
      $('#' + target).modal('open');
    })
  })
})
