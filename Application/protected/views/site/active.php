<style type="text/css">
    #head_tit{position: fixed;top:0px;height:45px;line-height:45px;}
    #head_tit .head_tit_center{font-size: 16px;line-height: 45px;}
    .head_tit_right{font-size: 16px!important; line-height: 45px;}
    .bgw{background-color: #ffffff;}
    .auto{width: 100%;padding: 0 2%; box-sizing: border-box;}
    #J_SiftContent #head_tit{border-bottom: 0px;}
    .sift-item .icon-selected{position: absolute;bottom: -14px;right: -8px;font-size: 40px;}
    .am-offcanvas-bar{width: 100%;min-height: 100%;background-color: #ffffff}
    .am-offcanvas-bar:after{width: 0px;}
   /* .head_tit_right .icon{font-size: 17px;}
    .droplist_trigger .icon{font-size: 10px!important;vertical-align: middle;margin-top:-2px;}*/
    .head_tit_right .icon{font-size: 18px;}
    .droplist_trigger .icon{font-size: 9px!important;vertical-align: middle;margin-top:-2px;}
    .d_nothing{width: 100%;text-align: center;height: 50px;color: #999;margin-top: 20px;}
    .sort-tab li.active .icon{color: #d72d83;}
    .category_tag_list,.size_tag_list{display: none;}
    .switch-btn{transform:rotate(180deg);
        -ms-transform:rotate(180deg);   /* IE 9 */
        -moz-transform:rotate(180deg);  /* Firefox */
        -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
        -o-transform:rotate(180deg);  /* Opera */}
    /*.d_updname_btn{padding-bottom: 30px;}*/
    .d_updname_btn{position: fixed;bottom: 0px;width: 100%;z-index: 100;}
    .vat{vertical-align: top;}
    .d_active_poster img{margin-top: 0px;}
    .droplist_trigger p{margin-top: 3px;}
    .am-offcanvas-bar{position: absolute;}
    #J_SiftContent .content{
        background: #fff;
        height: 100%;
        overflow-y: scroll;
        box-sizing: border-box;
        top: 45px;
        position: relative;
        z-index: 99;
        /* 增加该属性，可以增加弹性，是滑动更加顺畅 */
        -webkit-overflow-scrolling: touch;
    }
    .d_goods_tit{height:auto;}
    .search-head-edit {position: fixed;top: 0px;left: 0px;width: 100%;z-index: 10;}
    .bgw {background: #fff;border-bottom: 1px solid #ebebeb;}
    #head_tit .head_tit_left{width:40px;}
    #head_tit .head_tit_right {width:60px;}
    .detail{display:none;}
    .active_time{background:#fff5fa;height:45px;color:#d72d83;font-size:14px;line-height:45px;padding:0 3%;}
    .active_time_tag{margin-top:5px;color:#919a97}
    .active_time_tag span{background:#000;color:#fff;margin-right:1px;margin-left:1px;padding:2px 4px;border-radius:3px;}
    .active_time_tag lable{padding:0 4px;}
    .active_time_tag>span:nth-child(7){background:red;}
    .active_time_tag>span:nth-child(8){background:red;}
    .active_time_des{color:#56514e;font-size:14px;margin-top:10px;}
        /* 下载悬浮层 */
 .download {
    width: 100%;
    height: 40px;
    position: fixed;
    top:45px;
    background-color: rgba(255, 255, 255, .5);
    z-index: 9;
}
 .download .close {
    float:left;
    color: #fff;
    background-color: #b8b8b8;
    width: 18px;
    height: 18px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
    display: inline-block;
    margin-left:15px;
    margin-top:12px;
}
 .download .logo {
    float:left;
    display: inline-block;
    width: 80px;
    height: 40px;
    background: url(/assets/v2/images/info/regist/download.png) no-repeat center;
    background-size: contain;
    margin-left: 20px;
}
.download .down {
    width: 70px;
    height: 25px;
    line-height: 25px;
    border-radius: 4px;
    text-align: center;
    background-color: #d83283;
    color: #fff;
    float: right;
    margin: 8px 10px;
}
.sort-tab::after,
.sort-tab::before{
  display: table;
  content: '';
}
.sort-tab::after {
  clear: both;
}

.new-active {
  left: auto;
  width: 80vw;
  display: block;
}
.new-button>span {
  width: 50%;
  float: left;
}
.d_updname_btn span:nth-of-type(2){
  background-color: #ececec;
  color: #666;
}
.hidden {
  display: none;
}
</style>
<!-- <section class="bgw search-head-edit">
        <section class="auto92">
            <section class="search_top">
                <div class="head_tit_left back" style="margin-right:20px"><span class="icon-left"></span></div>
                <div class="head_tit_center" id="title"></div>
                <section class="searchHead" style="display:none"><span class="icon-search search-btn"></span>
                    <form style="display: inline-block;width: 85%" action="/site/active" onsubmit="return checked()" id="search_form">
                        <input id="key_word" type="text" name="keyword" placeholder="请输入搜索关键字" style="vertical-align: text-bottom;margin-top: 6px;">
                        <input  type="hidden" name="hotbrandid"  value="" id="hotid" style="vertical-align: text-bottom;margin-top: 6px;">
                    </form>
                </section>
                <div  style="width:20px;text-align:right"><span class="icon icon-satrtnew"   style="display:none;font-size:16px"></span></div>
            </section>
        </section>
</section> -->
<header id="head_tit">
    <div class="head_tit_left ">
        <span class="icon-left goback" style="display:block;float:left;width:25px;height:50px;line-height:50px"></span>
    </div>
    <div class="head_tit_center" id="title"  style="opacity:1;">

    </div>
   <!--  <section class="searchHead" style="margin-right:0px;margin-top:7px;display:none;opacity:0;">
        <span class="icon-search search-btn" style="float: left;line-height: 33px;"></span>
        <form style="display: inline-block;width: 75%;vertical-align:21px;" action="/site/active"  id="search_form">
            <input id="key_word" type="search" name="keyword" placeholder="请输入搜索关键字" style="vertical-align: text-bottom;margin-top:7px;">
            <input  type="hidden" name="hotbrandid"  value="" id="hotid" style="vertical-align: text-bottom;margin-top: 6px;">
        </form>
        <span class="icon-delete search-btn" id="clear" style="font-size:20px;line-height:33px;color:#bcbcbc;float: right;margin-right:10px;height:100%"></span>
    </section> -->
    <div class="head_tit_right" >
       <span class="icon icon-satrtnew"  style="margin-left:10px;display:none" id="collectbrandid" ></span>
       <span class="icon icon-fen f16 weixinshare "  style="margin-left:10px"></span>
    </div>
</header>
<div class="HT_45"></div>
<div class="detail">
    <div class="download" style="display:none">
       <span id="close" class="close">x</span>
       <span class="logo"></span>
       <a href="https://at.umeng.com/eC8rWn">
         <div id="download" class="down">下载</div>
       </a>
    </div>
</div>
<div class="d_active_poster">
    <p><img class="brand_img"  id="shareimg"></p>
</div>

<div class="active_time" style="display:none">
    <span class="icon-warm" style="margin-right:7px;font-size:16px"></span><span class="show_time active_time_tag"></span>
</div>
<div class="J_sortTab detail" style="width:100%;top:45px;z-index: 221;transition: position 2s; -moz-transition: position 2s; -webkit-transition: position 2s; -o-transition: position 2s;">
    <div>
        <ul class="sort-tab">
            <li class="bar active_all active">全部 <span class="icon icon-bread" style="font-size: 11px;"></span></li>
            <li class="bar price_sort" data-sort="0" data-orderby="100">
                <span class="vat">价格</span>
                <span class="droplist_trigger">
                    <div>
                        <p><span class="icon icon-top price_up"></span>
                            <span class="icon icon-bottom price_down"></span>
                        </p>
                    </div>
                </span>
            </li>
            <li class="bar price_sort" data-sort="0" data-orderby="300">
                <span class="vat">折扣</span>
                <span class="droplist_trigger">
                    <div>
                        <p><span class="icon icon-top price_up"></span>
                            <span class="icon icon-bottom price_down"></span>
                        </p>
                    </div>
                </span>
            </li>
            <li class="bar shift-btn-left">筛选 <span class="icon icon-shaixuan" style=" vertical-align: -1px;"></span></li>
        </ul>
    </div>
</div>
<div class="d_prompt detail">
    <p><b>温馨提示：</b><span>每日有上新，整点有惊喜！</span></p>
</div>
<div class="auto detail">
    <div class="d_goods_list">
        <ul>
            <!--<li class="d_goods_item">
                <p><img src="/assets/v1/image/nv1.jpg"></p>
                <div class="d_goods_cont">
                    <p class="d_goods_tit">男童加绒中灰加绒连帽长袖卫衣</p>
                    <p class="d_goods_price">&yen;<span class="sale_price">79</span> <del class="market_price">&yen;199</del></p>
                    <p class="d_goods_car"><span class="icon-car3"></span></p>
                </div>
            </li> <div class="clear"></div>-->
        </ul>
        <div class="clear"></div>
        <div class="d_nothing"></div>
    </div>
</div>
<div class="HT_45"></div>


<!--筛选-->
<div id="J_SiftContent" class="am-offcanvas sm-offcanvas " >
    <div class="am-offcanvas-bar am-offcanvas-bar-flip new-active">
        <header id="subHead">
            <!-- <div class="head_tit_left shift-btn-right">
                取消
            </div> -->
            <div class="head_tit_center">
                筛选
            </div>
           <!--  <div class="head_tit_right c99">
                重置
            </div> -->
        </header>
        <div class="bgw content">
          <div class="sift-row ">
                <div class="row-head J_siftRowExpand">
                    <span class="title">价格区间（元）</span>
                </div>
                <div class="row-body">
                    <div class="d_price_section">
                        <p>
                            <span class="d_section_left"><input type="text" class="min-price" placeholder="最低价" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"> </span>
                            <span class="d_section_differ"><span></span></span>
                            <span class="d_section_right"><input type="text" class="max-price" placeholder="最高价" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" > </span>
                        </p>
                    </div>
                    <div class="d_section_tag">
                        <ul class="clearfix price_tag">
                            <li class="sift-item" data-min="0" data-max="100">0-100元<span class="icon-selected"></span></li>
                            <li class="sift-item" data-min="100" data-max="250">100-250元<span class="icon-selected"></span></li>
                            <li class="sift-item" data-min="250" data-max="500">250-500元<span class="icon-selected"></span></li>
                            <li class="sift-item" data-min="500">500元以上<span class="icon-selected"></span></li>
                            <div class="clear"></div>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="sift-row ">
                <div class="row-head J_siftRowExpand">
                    <span class="title">品牌</span>
                    <span class="fr icon " data-status="open">展开</span>
                </div>
                <div class="row-body">
                    <ul class="clearfix brand_tag">
                        <!--<li class="sift-item selected J_siftItem">全部
                            <span class="icon-selected"></span>
                        </li>
                        <div class="clear"></div>-->
                    </ul>
                </div>
            </div>
           <div class="sift-row category_tag_list" >
                <div class="row-head J_siftRowExpand">
                    <span class="title">一级品类</span>
                    <span class="fr icon " data-status="open">展开</span>
                </div>
                <div class="row-body">
                    <ul class="clearfix category_tag">
                        <!--<li class="sift-item selected J_siftItem">全部
                            <span class="icon-selected"></span>
                        </li>
                        <div class="clear"></div>-->
                    </ul>
                </div>
            </div>
            <div class="sift-row categorytwo_tag_list" >
                <div class="row-head J_siftRowExpand">
                    <span class="title">二级品类</span>
                    <span class="fr icon " data-status="open">展开</span>
                </div>
                <div class="row-body">
                    <ul class="clearfix categorytwo_tag">

                    </ul>
                </div>
            </div>

            <div class="sift-row size_tag_list">
                <div class="row-head J_siftRowExpand">
                    <span class="title">尺码</span>
                    <span class="fr icon " data-status="open">展开</span>
                </div>
                <div class="row-body">
                    <ul class="clearfix size_tag">
                        <!--<li class="sift-item selected J_siftItem" >全部
                            <span class="icon-selected"></span>
                        </li>-->

                    </ul>
                </div>
            </div>

        </div>
        <div class="d_updname_btn  new-button">
            <span class="reset">重置</span> <span class="sure_btn">确认</span>
        </div>
    </div>
</div>
<div id="RightFixed" style="display: none;">
    <div class="ScrollTop">
        <p><span class="icon-dingbu"></span></p>
        <p>顶部</p>
    </div>
    <div class="CurrentPosition" style="z-index: -1;">
        <p class="NowCount">0</p>
        <p class="TotalCount"><span>0</span></p>
    </div>
</div>
<script>
    seajs.use('site/active.js?v=9.5');
</script>
<script type="text/javascript">
    isAppHideTitle = true;
    appTitleConfig.closePullRefresh = true;
    $(".goback").click(function(){
        if (isWeb) {
            arr = localStorage.historyURL;
            arr = eval(arr);
            if(arr&&arr.length>0){
             backurl = arr.pop();
            }else{
              backurl ='';
            }
            arr = JSON.stringify(arr);
            localStorage.historyURL = arr;
            if(backurl == '' || backurl == null || backurl == undefined){
            backurl = baseUrl + '/site/index';
            }
            window.location.href= backurl;
        } else {
            // alert(3);
            setTimeout(function(){Jockey.send("DidBack-" + urlString)},appDelay2);
        }
    });
    $(".gohome").click(function(){
        if(isWeb) {
                window.location.href= '/site/index';
        }else{
           setTimeout(function(){Jockey.send("ShowFooter-" + urlString, {index:0})},appDelay2);
        }

    })

    if (isWeb && ($_GET['hotbrandid']=='866' || $_GET['hotbrandid']=='872') ){
            $(".download").show();
    }
</script>
<script>
    // 开启筛选层  右边
    $(document).on("click",".shift-btn-left",function(){
        $(window).off('resize.offcanvas.amui');
        var $J_SiftContent = $("#J_SiftContent");
        $J_SiftContent.offCanvas('open');
    })

    // 关闭筛选层
    $(document).on("click",".shift-btn-right",function(){
        var $J_SiftContent = $("#J_SiftContent");
        $J_SiftContent.offCanvas('close');
    })


    var strSet = {
      'open': '展开',
      'close': '收起'
    }
    $(document).on("click",".row-head .icon",function(){
       var  $this = $(this);
       var status = $this.data('status');
       console.log(status);
        if(status == 'open'){
            $this.parent().next().slideDown();
        }else{
            $this.parent().next().slideUp();
        }
    });
    $("#J_SiftContent .content").height($(window).height()-90);


    $('#close').on('click', function () {
        $(this).closest('div').slideUp();
    })
</script>

























