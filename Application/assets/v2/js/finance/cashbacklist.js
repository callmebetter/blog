define(function(require) {
  var main = require('/assets/v1/examples/modules/main.js');
  var m = new main();
  var canchange = true;
  var param = {
    2018:{
      Year: 2018,
      loaded: true
    }
  }
  var ajax = function(year){
   return  $.ajax({
       url: m.baseUrl + '/financial/GetFullReturnRecord',
        type: 'post',
        data: { Year: year },
        dataType: 'jsonp'
      })
  }
  var sum = function(arr) {
    var s = 0;
    for (var i=arr.length-1; i>=0; i--) {
        s += arr[i];
    }
    return s;
}
  $.when(ajax(2018), ajax(2019) )
    .done(function(a, b){
      var first, second;
      var returnList = [], unreturnList = [];
      var d1 = a[0].data, d2 = b[0].data;
      if(!d1.ErrCode) {
        first = d1.List ? d1.List  : [];
      }
      if(!d2.ErrCode) {
        second = d2.List ? d2.List  : [];
      }
     // console.log(a,  $.type(a));
     // console.log(b,  $.type(b))
     // var sumArray = [];
     // sumArray.push.apply(sumArray, a[0].data.List, b[0].data.List);
     var sumArray = $.map($.merge(first, second), function(val, key){
             if(val){
              return val.Item2
             }
     })
     $.each(sumArray, function(k, v){
       if(v.ReturnStatus == 0){
        unreturnList.push(v.ReturnAmoun)
       } else if(v.ReturnStatus == 1) {
         returnList.push(v.ReturnAmoun)
       }
     })
      console.group('金额')
     console.log('已经返现金额： %d，待返现金额 %d', sum(returnList), sum(unreturnList))
      console.groupEnd('金额')
    })
    .fail(function(i, j){
      console.log(i, j)
    })
 var init = false;
  //获取明细
  var namespace = {
    getFullReturnRecord: function(options) {
      $.AMUI.progress.start();
      canchange = false;
      $.ajax({
        url: m.baseUrl + '/financial/GetFullReturnRecord',
        type: 'post',
        data: options || { Year: 2018 },
        dataType: 'jsonp',
        jsonp: 'callback',
        async:false
      }).done(function(ret) {
        var getYear = (options || { Year: 2018 })['Year'];
        console.log(getYear)
        $.AMUI.progress.done();
        canchange = true;
        if (ret.status && ret.data) {
          // console.log(ret.data.List)
          // debugger;
          //cashback basebalance  AlreadyReturnAmount WaitingReturnAmount
          $('.basebalance').text('待返现余额：￥' + ret.data.WaitingReturnAmount || 0);
          $('.cashback').text('已返现余额：￥' + ret.data.AlreadyReturnAmount || 0);
          if (ret.data.List && ret.data.List.length > 0) {
            var html = '<ul class="unit">';
            $.each(ret.data.List, function(k, v) {
              // console.log(k, v)
              // console.log(v == null)
              var curDate = new Date();
              var currentMonth = curDate.getMonth();
              var currentYearBool = curDate.getFullYear() == getYear;
              var pregress ;
              switch(true){
                case k > currentMonth && currentYearBool:
                     pregress = '待返现';
                     break;
                case k == currentMonth && currentYearBool:
                     pregress = '返现中';
                     break;
                case k < currentMonth && currentYearBool:
                     pregress = '已返现';
                     break;
                 default:
                    pregress = '待返现';
                    break;
              }
              var monthyTotal = v ? v.Item1 : 0;
              var className = v ? ' icon-right' : '';
              var isEmpty = v ? false : true;
              html += '<li>\
                        <div class="list-item">\
                          <div>' + (k + 1) + '月</div>\
                          <div><span>￥' + monthyTotal + '</span><span>'+ pregress +' <i data-isempty="'+ isEmpty +'" class="icon ' + className + '"></i></span></div>\
                        </div>\
                        <ul>'
              // console.log(v != undefined)
              if (v != undefined) {
                $.each(v.Item2, function(idx, val) {
                  var returnDate = namespace.getMonthDate(val.ReturnDate);
                  var returnStatus = val.ReturnStatus == 1 ? '已返现' : '待返现';
                  html += '<li>\
                          <div>' + returnDate + '</div>\
                          <div>\
                            <span> 返现编号：' + val.ReturnNo + ' ￥' + val.ReturnAmoun + ' </span>\
                            <span>' + returnStatus + '</span>\
                          </div>\
                        </li>'
                })
              }

              html += '</ul> </li>';
            })
            html += '</ul>'
            $("#fullbackdetail").append(html);

            $('#container').show();
          }else {
             var html = '<div class="unit p_Blankpages">\
                        <div class="p_Blankpages2">\
                            <div class="p_blank_ico"> <span class="icon-dingdanxinxi"></span></div>\
                            <div class="p_blank_hist">暂无相关信息</div>\
                        </div>\
                    </div>'
          $('#fullbackdetail').append(html);
          console.log('loading')
          }
            namespace.eventHander();
            namespace.switchTab();
          var xqTab = {
            changeHeight: function(obj) {
              var height = $(obj).height();
              $('#cate_content').css({ height: height });
            }
          }
          xqTab.changeHeight("#fullbackdetail");
          $('#container').show();


        } else {
          m.AlertMessage(ret.msg);
        }
      })
    },
    getMonthDate: function(timestamp) {
      // console.log(timestamp)
      var timestamp = parseInt(timestamp.substr(6, 13));
      var data = new Date(timestamp);
      var month = data.getMonth() + 1;
      var day = data.getDate();
      month = month >= 10 ? month : '0' + month;
      day = day >= 10 ? day : '0' + day;
      return month + '/' + day;
    },
    eventHander: function() {
      $('.icon').parent().unbind('click').on('click', function() {
        console.log('click icon')
        var $detailDom = $(this).closest('.list-item').siblings();
        //没有返现明细点击并不会展开，也不需要向右箭头
        //已经展开的按钮添加状态作为标记，点击时收起来，然后相应的下拉框展开
        //第一次点击 后续点击 点两下收起来
        var $slide = $('.slide');
        var $icon = $(this).find('.icon');
        var isEmpty = $icon.data('isempty');
        if(isEmpty)return;
        if (!$detailDom.hasClass('slide')) {
          //首次点击该对象
          if ($slide.length > 0) {
            $slide.slideUp(400).removeClass('slide')
          }
        }
        if (!$icon.hasClass('expand')) {
          if ($('.expand').lenth > 0) {
            $('.expand').removeClass('expand');
          }
        }
        $detailDom.slideToggle(400).toggleClass('slide'); //点击同一对象
        $icon.toggleClass('expand');
      })
    },
    switchTab: function(){
          //tab切换
      $('.tab').find('li').click(function() {
        console.log('switch tab')
         if (!canchange) { return }
        //to do 首次更新数据
        //to do 没有数据不进行切换
        $('.expand').removeClass('expand'); //数据清除状态
        $('.slide').slideUp().removeClass('slide'); //数据清除状态
        var year = $(this).data('year');
        console.log(year);
        if(!param[year]){
          param[year] = {
            Year:year
          }
          namespace.getFullReturnRecord(param[year]);
        }
        // console.log(param)
        var wiz = $(this).width(); //tab的宽度
        var index = $(this).index(); //tab的索引
        var wizCon_ul = $('.inner').find('ul').width()
        console.log(index)
        $(this).closest('ul').css({
          'transform': 'translate3d(' + -index * wiz + 'px, 0px, 0px)'
        })
        // $('.inner').css({
        //   'transform': 'translate3d(' + -index * wizCon_ul + 'px, 0px, 0px)'
        // })
        $('.inner').find('.unit').eq(index).siblings().hide().end().show();
        console.log($('.expand').length)

      })
    }
  }
  namespace.getFullReturnRecord();
  //下拉加载
  $(window).scroll(function() {
    if ($(this).scrollTop() + $(window).height() + 50 >= $(document).height() && $(this).scrollTop() > 100) {
      // $(this).scrollTop() > 100 ? $('.goto_top').fadeIn() : $('.goto_top').fadeOut();
    }
    //点击回到顶部
    $('.goto_top').click(function() {
      if ($(window).scrollTop() > 300) {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
      }
    })
  })


})
