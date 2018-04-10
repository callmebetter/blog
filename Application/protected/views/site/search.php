<style>
.bgw {
  background: #fff;
  padding: 6px 0;
  border-bottom: 1px solid #ebebeb;
}

.bgf {
  background: #fff;
}

.autol4 {
  width: 96%;
  margin-left: 4%;
}

.pd4 {
  padding-left: 4%;
}

.d_goods_list {
  margin-top: 10px;
}

#searchAfter {
  display: none;
}

.d_nothing {
  width: 100%;
  text-align: center;
  height: 50px;
  color: #999;
  margin-top: 20px;
}

.searchHead input {
  width: 100%;
}

.d_goods_car {
  font-size: 17px;
  bottom: 0px;
}

.am-offcanvas-bar:after {
  width: 0px;
}

.search-head-edit {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 10;
}

.droplist_trigger .icon {
  font-size: 10px!important;
  vertical-align: middle;
  margin-top: -4px;
}

.am-offcanvas-bar {
  width: 100%;
  min-height: 100%;
  background-color: #f7f8f9;
}

.d_updname_btn {
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 100;
}

.sift-item .icon-selected {
  position: absolute;
  bottom: -14px;
  right: -8px;
  font-size: 40px;
}

#J_SiftContent .content {
  background: #fff;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  top: 45px;
  position: relative;
  z-index: 99;
  -webkit-overflow-scrolling: touch;
}

.sort-tab li .icon {
  color: #999999;
  font-size: 12px;
}

.sort-tab li {
  color: #999;
}

.droplist_trigger>div p {
  margin-top: 2px;
}

.search-head-edit {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 10;
}

#searchAfter .pad4 {
  padding: 0 2%;
}

input::-webkit-search-cancel-button {
  display: none;
}

</style>
<script>
function checked() {
  var Keywords = $("#key_word").val().trim();
  if (Keywords.length < 1) {
    AlertMessage("请输入搜索关键字");
    return false;
  }
}

</script>
<div>
  <section class="bgw search-head-edit">
    <section class="auto92">
      <section class="search_top">
        <div style="width:40px; line-height: 33px;" class="back"><span class="doc-oc-js icon-left f16 "></span></div>
        <section class="searchHead"><span class="icon-search " style="float: left;line-height: 33px;"></span>
          <form style="display: inline-block;width: 75%; height:33px;" action="/site/search" id="search_form" onsubmit="return checked()">
            <input id="key_word" type="search" name="keyword" placeholder="请输入搜索关键字" style="vertical-align: text-bottom;height:33px; padding:4px 0;">
          </form>
          <span class="icon-delete search-btn" id="clear" style="font-size:20px;line-height:33px;color:#bcbcbc;float: right;margin-right:10px;height:100%"></span>
        </section>
        <span class="doc-oc-js searchBtn f15 ">搜索</span>
      </section>
    </section>
  </section>
  <div class="HT_45"></div>
  <div class="J_sortTab" style="display:none">
    <div>
      <ul class="sort-tab">
        <li class="bar active_all">全部 <span class="icon icon-bread" style="font-size: 11px;"></span></li>
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
  <li class="bar shift-btn-left">筛选 <span class="icon icon-shaixuan"></span></li>
  </ul>
</div>
</div>
<section id="searchBefore" style="display:none">
  <section class="bgf">
    <section class="autol4">
      <section class="search_list c99">
        <p>热门搜索</p>
      </section>
      <section class="hot_tag_list hot_aearch">
        <!--<span isclick="0">女装</span>-->
      </section>
    </section>
  </section>
  <section class="bgf mt10">
    <section class="">
      <section class="search_list c99 pd4">
        <p>历史记录</p>
        <span class="icon icon-dustbin clear_history_btn"></span>
      </section>
      <section class="hot_tag_list history_aearch">
        <ul>
          <!--<li>女装</li>-->
        </ul>
      </section>
    </section>
  </section>
</section>
<section id="searchAfter">
  <div class="d_goods_list pad4">
    <ul>
    </ul>
    <div class="clear"></div>
    <div class="ball-pulse-sync">加载中
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="d_nothing"></div>
  </div>
</section>
</div>
<!--筛选-->
<div id="J_SiftContent" class="am-offcanvas sm-offcanvas">
  <div class="am-offcanvas-bar am-offcanvas-bar-flip">
    <header id="subHead" style="">
      <div class="head_tit_left shift-btn-right">
        取消
      </div>
      <div class="head_tit_center">
        筛选
      </div>
      <div class="head_tit_right c99">
        重置
      </div>
    </header>
    <div class="content">
      <div class="sift-row ">
        <div class="row-head J_siftRowExpand">
          <span class="title">品牌</span>
          <span class="fr icon icon-top"></span>
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
      <div class="sift-row category_tag_list" style="display:none">
        <div class="row-head J_siftRowExpand">
          <span class="title">一级品类</span>
          <span class="fr icon icon-top"></span>
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
      <div class="sift-row categorytwo_tag_list" style="display:none">
        <div class="row-head J_siftRowExpand">
          <span class="title">二级品类</span>
          <span class="fr icon icon-top"></span>
        </div>
        <div class="row-body">
          <ul class="clearfix categorytwo_tag">
          </ul>
        </div>
      </div>
      <div class="sift-row size_tag_list" style="display:none">
        <div class="row-head J_siftRowExpand">
          <span class="title">尺码</span>
          <span class="fr icon icon-top"></span>
        </div>
        <div class="row-body">
          <ul class="clearfix size_tag">
            <!--<li class="sift-item selected J_siftItem" >全部
                            <span class="icon-selected"></span>
                        </li>-->
          </ul>
        </div>
      </div>
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
    </div>
    <div class="d_updname_btn sure_btn">
      <span>确认</span>
    </div>
  </div>
</div>
<div class="HT_45"></div>
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
seajs.use('site/search.js?v=2.57');

</script>
<script>
// 开启筛选层  右边
$(document).on("click", ".shift-btn-left", function() {
  $(window).off('resize.offcanvas.amui');
  var $J_SiftContent = $("#J_SiftContent");
  $J_SiftContent.offCanvas('open');
})

// 关闭筛选层
$(document).on("click", ".shift-btn-right", function() {
  var $J_SiftContent = $("#J_SiftContent");
  $J_SiftContent.offCanvas('close');
})

$(document).on("click", ".row-head .icon", function() {
  if ($(this).hasClass("switch-btn")) {
    $(this).removeClass("switch-btn").parent().next().slideDown();
  } else {
    $(this).addClass("switch-btn").parent().next().slideUp();
  }
});
$("#J_SiftContent .content").height($(window).height() - 90);
$("#key_word").click(function() {
  $(document).scrollTop(0);
})

</script>
<script type="text/javascript">
isAppHideTitle = true;
$("#cancel").click(function() {
  if (isWeb) {
    window.history.go(-1)
  } else {
    setTimeout(function() { Jockey.send("DidBack-" + urlString) }, appDelay2);
  }
});

</script>
