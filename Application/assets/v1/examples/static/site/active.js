define(function(require){
    var main =require('/assets/v1/examples/modules/main.js?v=10.1');
    var m = new main();
    require('/assets/v1/examples/modules/imagesloaded.min.js');
    var PageSize_First = 20;
    var firstPageNo =true;
    var scrolltop = 0;
    var endtime = '';
    var starttime = '';
    var log='';
$(document).ready(function(){
     var activeindex = localStorage.getItem('activeindex')?localStorage.getItem('activeindex'):1;
      if(activeindex>1000){activeindex=1};
    /*
     * CatId	        Long	   		类目Id
     * Size	            String	  		选择的尺寸
     * MinPrice	        Decimal	   		最低价格
     * MaxPrice	        Decimal	   		最高价格
     * SearchOrderBy	Int	      		排序方式:100/销售价,200/人气,300/折扣
     * SortOrder	    Int	       		正序:0/倒叙:1,默认0
     */
    var ProductParam ={
        BrandId         : '',
        OneCatId        : '',
        HotBrandId      : '',
        PageNo          : 1,
        PageSize        : 20,
        Size            : '',
        MinPrice        : '',
        MaxPrice        : '',
        SearchOrderBy   : '',
        SortOrder       : '',
        isfinished      : false,
        isactive        : false,
        TopPageNo       : 1,
        ActSeckillId    :'',
        Keywords        :'',
    }

    PageSize_First = Math.ceil(activeindex/ProductParam.PageSize)*ProductParam.PageSize;
    scrolltop = parseInt(localStorage.getItem('scrolltop'));
    var ProductParambak = localStorage.getItem("ProductParam", ProductParam);
    if(ProductParambak){
        ProductParam = JSON.parse(ProductParambak);
    }
    if($_GET['keyword']){
        $("#title").animate({opacity: 0},40);
        $(".searchHead").animate({opacity: 1},40);
        $(".searchHead").show();
        $("#title").hide();
        $_GET['keyword'] = $_GET['keyword'].replace(/\+|\-|\*|\?/g," ");
        ProductParam.Keywords = decodeURI($_GET['keyword']);
        $("#key_word").val(ProductParam.Keywords);
    }
    localStorage.removeItem('activeindex');
    localStorage.removeItem('scrolltop');
    localStorage.removeItem("ProductParam");
    setTimeout(function(){
        Jockey.on("ClickButtonCallback-" + urlString, function(payload) {
            if (payload.index == 700) { //分享
                appShare();  //main.php
            } else if (payload.index == 800) {  //收藏
                collect();
            }
        });
    },1000);

    if($_GET['hotbrandid']){
        ProductParam.HotBrandId = $_GET['hotbrandid'];
        $("#collectbrandid").show();
        $("#hotid").val($_GET['hotbrandid']);
    }else if($_GET['actseckillid']){
        ProductParam.ActSeckillId = $_GET['actseckillid'];
        $("#hotid").val($_GET['actseckillid']);
    }
    $("img.lazy").lazyload({
        effect: "fadeIn",               // 载入使用何种效果
        threshold: 200,                 // 提前开始加载
        placeholder : "/assets/v1/image/imgload1.jpg"   //用图片提前占位
    });

    //获取专场信息
    function getbrandinfo(){
        $.AMUI.progress.start();
        $.ajax({
            url:m.baseUrl+'/site/ajaxGetBrandInfo',
            data:{HotBrandId:ProductParam.HotBrandId},
            dataType:'jsonp',
            jsonp:'callback',
            type:'post'
        }).done(function(ret){
            $.AMUI.progress.done();
            if(ret.status){
                var brandname = ret.data.HotBrandInfo.BrandCoverName;
                if(!brandname){
                        brandname ='商品列表' ;
                }else if($_GET['actename']){

                }
                $("#title").html(brandname);
                $(".brand_img").attr('src',ret.data.HotBrandInfo.BrandCover);
            }
        })
    }
    if(ProductParam.HotBrandId){getbrandinfo(); }

    //专场商品列表
    function SeckillGetList(){
        ProductParam.isactive = true;
        var PageNo = ProductParam.PageNo;
        var PageSize = ProductParam.PageSize;
        if(firstPageNo){
            PageSize = PageSize_First;
            PageNo = 1;
            ProductParam.PageNo = Math.ceil(activeindex/ProductParam.PageSize);
        }
        $(".ball-pulse-sync").show();
        if($_GET['hotbrandid']){
                var param = {PageSize:PageSize,PageNo:PageNo,HotBrandId:ProductParam.HotBrandId,SortOrder:ProductParam.SortOrder,SearchOrderBy:ProductParam.SearchOrderBy,MaxPrice:ProductParam.MaxPrice,MinPrice:ProductParam.MinPrice,Size:ProductParam.Size,CatId:ProductParam.CatId,CatId:ProductParam.CatId,OneCatId:ProductParam.OneCatId,Keywords:ProductParam.Keywords,BrandId:ProductParam.BrandId}
        }else if($_GET['actseckillid']){
                var param = {PageSize:PageSize,PageNo:PageNo,ActSeckillId:ProductParam.ActSeckillId,SortOrder:ProductParam.SortOrder,SearchOrderBy:ProductParam.SearchOrderBy,MaxPrice:ProductParam.MaxPrice,MinPrice:ProductParam.MinPrice,Size:ProductParam.Size,CatId:ProductParam.CatId,CatId:ProductParam.CatId,OneCatId:ProductParam.OneCatId,Keywords:ProductParam.Keywords,BrandId:ProductParam.BrandId}
        }

        $.ajax({
            url:m.baseUrl+'/site/FProductGetList',
            data:param,
            dataType:'jsonp',
            jsonp:'callback',
            type:'post'
        }).done(function(ret){
            if(ret.status){
                $(".TotalCount").find("span").text(ret.data.TotalCount);
                var GoodsList = '';
                $(".ball-pulse-sync").hide();
                $(".detail").show();
                if(ret.data.ActSeckillName){
                    $("#title").text(ret.data.ActSeckillName);
                }
                if(ret.data.ActSeckillSrc){
                    $(".brand_img").attr('src',ret.data.ActSeckillSrc);
                }
                if(ret.data.ModelList.length<1){
                    ProductParam.isfinished = true;
                    if(PageNo == 1){
                        m.histauto("暂无数据",'icon-main','.d_goods_list .d_nothing');
                        ProductParam.isactive = false;
                        $.ajax({
                            url:m.baseUrl+'/site/log',
                            data:{param:param,result:ret.data.ModelList},
                            dataType:'jsonp',
                            jsonp:'callback',
                            type:'post'
                        }).done(function(ret){
                        })
                        return false;
                    }else{
                        ProductParam.isfinished = true;
                        $(".d_goods_list .d_nothing").html("没有更多了！");
                    }
                }else if(ret.data.ModelList.length<ProductParam.PageSize && PageNo == 1){
                    ProductParam.isfinished = true;
                    $(".d_goods_list .d_nothing").html("没有更多了！");
                }else{
                    $(".d_goods_list .d_nothing").html("");
                }
                if(ProductParam.ActSeckillId && ret.data.EndTime){
                    $(".active_time").show();
                    if(!log){
                         endtime = m.substrTime(ret.data.EndTime);
                         starttime = m.substrTime(ret.data.StartTime);
                         log= setInterval(timer,1000);
                         timer();
                    }
                }
                if($_GET['hotbrandid'] && ret.data.IsCollectHotBrand){
                    $("#collectbrandid").addClass("icon-star thmemColor").removeClass('icon-newstar');
                    $("#collectbrandid").attr("value","true");
                }else{
                     $("#collectbrandid").attr("value","false");
                }

                $.each(ret.data.ModelList,function(k,v) {
                    if(ProductParam.HotBrandId){
                          GoodsList += '<li class="d_goods_item" data-src="/site/detail?HotBrandId='+ProductParam.HotBrandId+'&productid='+ v.ProductId +'">\
                    <p style="position:relative">'
                    }else{
                            GoodsList += '<li class="d_goods_item" data-src="/site/detail?productid='+ v.ProductId +'">\
                        <p style="position:relative">'
                    }

                    $.each(v.ProductTags,function(){
                        if(this.TagType==100){
                             GoodsList +='<label style="position:absolute;top:0px;left:0px;width:30%;height:60px!important;background:url(/assets/v1/image/double.png?v=1.0) no-repeat;background-size:100%" /></label>'
                        }
                        // if(this.TagType==600){
                        //      GoodsList +='<label style="position:absolute;top:0px;left:0px;width:30%;height:60px!important;background:url(/assets/v1/image/tag1.png?v=1.0) no-repeat;background-size:100%" /></label>'
                        // }
                        // 2017-07-28 修改记录 Start
                        if(this.TagType==600){
                             GoodsList +='<label style="position:absolute;top:0px;left:0px;width:30%;height:60px!important;background:url(/assets/v1/image/tag99.png?v=1.1) no-repeat;background-size:100%" /></label>'
                        }
                        if(this.TagType==800){
                             GoodsList +='<label style="position:absolute;top:0px;left:0px;width:30%;height:60px!important;background:url(/assets/v1/image/tag29.png?v=1.1) no-repeat;background-size:100%" /></label>'
                        }
                        // 2017-07-28 修改记录 End
                    })
                    if(!v.AvailableSize && v.SupplierId == 1){
                             GoodsList +='<label style="position:absolute;bottom:30%;right:30%;width:40%;height:40%!important;background:url(/assets/v1/image/over.png?v=1.1) no-repeat;background-size:100%"/></label>'
                    }
                    if(v.IsFullReturn){
                            GoodsList  +='<lable style="position:absolute;top:0px;right:0px;width:28%;height:30%!important;background:url(/assets/v1/image/index/fullback.png?v=1.3) no-repeat;background-size:100%" /></label>'

                    }
                    if(v.ActSeckillType != 400 && cabbageActive){
                            GoodsList  +='<lable style="position:absolute;top:0px;right:0px;width:28%;height:30%!important;background:url('+cabbageImg+'?v='+cabbageVersion+') no-repeat;background-size:100%" /></label>'
                    }
                    GoodsList +='<img class="lazy'+PageNo+'" data-original="'+ v.Src +'"></p>\
                                        <div class="d_goods_cont">\
                                        <div style="height:36px;"><p class="d_goods_tit">'
                                   if(v.ProductType==200) {
                                       GoodsList += '<span class="z_qqg">全球购</span>'
                                   }
                    GoodsList += v.ProductName+'</p></div>'
                                // 月销量
                                var salesNum;
                                var sales = (v.StockCount*0.3).toFixed();
                                if (v.Sales == 0) {
                                    salesNum = sales;
                                } else if (sales > v.Sales > 0) {
                                    salesNum = (v.StockCount*0.2).toFixed();
                                } else {
                                    salesNum = v.Sales;
                                }

                    GoodsList +='<div class="w_goodlist_price" style="margin-top:8px">\
                                    <p class="d_goods_price" style="margin-top:0px;">&yen;<span class="sale_price">'+ v.Price +'</span>'
                    if(v.Price != v.MarketPrice ){
                         GoodsList +='<del class="market_price" style="margin-left:5px">&yen;'+ v.MarketPrice +'</del>'
                    }
                    GoodsList +='</p>'
                    if(v.Discount != 1){
                        GoodsList +='<p class="goodlist_discount" style="margin-top:0px;"><span class="">'+m.discountPipe(v.Discount)+'</span></p>'
                    }
                    GoodsList += '</div>';

                    if(v.ProductType != 400){
                          GoodsList += '<div style="color: #999;font-size:13px;margin-top:3px">月销量：'+ (v.Sales + v.BaseSales) +'</div>'
                    }
                    GoodsList +='</div></li>';
                });
                $(".d_goods_list ul").append(GoodsList);
                $("img.lazy"+PageNo).lazyload({
                    effect: "fadeIn",               // 载入使用何种效果
                    threshold: 200,                 // 提前开始加载
                    placeholder : "/assets/v1/image/loadimg.png"   //用图片提前占位
                });
                $(".d_goods_item img").height($(".d_goods_item").width());
                $(".d_goods_item label").height($(".d_goods_item label").width());
                ProductParam.isactive = false;
            }else{
                m.AlertMessage(ret.msg);
                return false;
            }
            if(firstPageNo){
                firstPageNo = false;
                setTimeout(function(){ $(document).scrollTop(scrolltop);},50);
            }
        })
    }
    SeckillGetList();
    // 分页
    $(window).scroll(function(){
        // 当滚走的距离加上屏幕的高度 大于当前文档的高度
        if($(this).scrollTop()+$(window).height()+350 >= $(document).height() && $(this).scrollTop() > 100 ) {
            if(ProductParam.isfinished || ProductParam.isactive){
                return;
            }
            ProductParam.isactive = true; ProductParam.istop =false;   ProductParam.PageNo++;
            SeckillGetList();
        }
        var offset = 100;
        var ScrollTop = $('#RightFixed');
        var Height = 0;
        var PositionTop = $(".d_goods_list ul").position().top;
        var PositionTop = $(window).height()-PositionTop;
        $(this).scrollTop() > offset ? ScrollTop.fadeIn(): ScrollTop.fadeOut();
        Height = $(".d_goods_list ul").find('li').height()+10;
        var i = parseInt(($(this).scrollTop()+PositionTop)/Height)*2;
        var TotalCount = parseInt($(".TotalCount").find("span").html());
        i= i > 0 ? i : 1;
        i= i < TotalCount ? i : TotalCount;
        $(".NowCount").html(i);
        $(".CurrentPosition").css("z-index",'3');


        //当滚动条高度大于50时，显示搜索栏
        // if($(this).scrollTop()>0||$("#key_word").val().trim()!=''||$("#key_word").is(":focus")){
        //         $(".searchHead").show();
        //         $("#title").hide();
        //         $("#title").stop().animate({opacity: 0},40);
        //         $(".searchHead").stop().animate({opacity: 1},40);
        //   }else{
        //             $(".searchHead").hide();
        //             $("#title").show();
        //             $("#title").stop().animate({opacity: 1},40);
        //             $(".searchHead").stop().animate({opacity: 0},40);
        // }
        var $obj = $('.J_sortTab');
        if ($obj.css("position") == "static") {
            if ($(this).scrollTop() >= $obj.position().top - 45) {
              $obj.css("position", "fixed");
            } else {
              $obj.css("position", "unset");
            }
        } else {
          var bannertop = $(".d_active_poster").height() + 43;
            if ($obj.position().top > bannertop) {
              $obj.css("position", "fixed");
            } else {
              $obj.css("position", "unset");
            }
        }
    });

    $(".active_all").click(function(){
        if(!$(this).hasClass("active")){
            if(!ProductParam.isactive){
                ProductParam.BrandId   = '';
                ProductParam.OneCatId  = '';
                ProductParam.CatId     = '';
                ProductParam.Size      = '';
                ProductParam.MinPrice  = '';
                ProductParam.MaxPrice  = '';
                ProductParam.PageNo    = 1;
                // ProductParam.SearchOrderBy = '';
                // ProductParam.SortOrder = '';
                ProductParam.isfinished = false;
                $(".brand_tag").find('.sift-item').eq(0).trigger('click');
                $(this).addClass('active').siblings().removeClass('active');
                var $siblings = $(this).siblings();
                var colors = {color: '#999'};
                $.each($siblings, function(){
                  if($(this).hasClass('price_sort')){

                    var sort = $(this).data('sort');
                    console.log(sort)
                    if(sort != 0){
                      console.log($(this))
                      $(this).data('sort', 0);
                    }
                  }
                })
                $.each( $siblings.find('.price_down'), function(){
                  $(this).css(colors);
                })
                 $.each( $siblings.find('.price_up'), function(){
                  $(this).css(colors);
                })
                 ProductParam.SearchOrderBy   = '',
                 ProductParam.SortOrder   = '',
                $(".d_goods_list ul").html('');
                 SeckillGetList();
            }
        }
    });
    $(".price_sort").click(function(){
        if(!ProductParam.isactive){
            var SearchOrderBy=parseInt($(this).attr("data-orderby"));
            var PriceSort = parseInt($(this).attr("data-sort"));
            if(PriceSort == 1){
                $(this).attr("data-sort",2);
                $(this).find(".price_up").css("color",'#999999');
                $(this).find(".price_down").css("color",'#d72d83');
                $(this).addClass("active").siblings().removeClass('active');
                ProductParam.SearchOrderBy   = SearchOrderBy;
                ProductParam.SortOrder       = PriceSort;
            }else if(PriceSort == 0){
                $(this).attr("data-sort",1);
                $(this).find(".price_down").css("color",'#999999');
                $(this).find(".price_up").css("color",'#d72d83');
                $(this).addClass("active").siblings().removeClass('active');
                ProductParam.SearchOrderBy   = SearchOrderBy;
                ProductParam.SortOrder       = PriceSort;
            }else{
                $(this).attr("data-sort",0);
                $(this).find(".price_down").css("color",'#999999');
                $(this).find(".price_up").css("color",'#999999');
                $(this).removeClass("active");
                $('.active_all').addClass('active');
                ProductParam.SearchOrderBy   = '';
                ProductParam.SortOrder       = '';
            }
            ProductParam.PageNo          = 1;
            ProductParam.isfinished = false;
            $(this).siblings().attr("data-sort",0).find(".icon").css("color",'#999999');
            SeckillGetList();
            $(".d_goods_list ul").html('');
        }

    });



    function timer(){
        var nowtime = Date.parse(new Date());
        if(nowtime<starttime){
             var ts =  starttime - nowtime;//计算剩余的毫秒数
         }else if(nowtime<endtime){
             var ts =  endtime - nowtime;//计算剩余的毫秒数
         }
        var hh = parseInt(ts / 1000 / 60 / 60, 10);//计算剩余的小时数
        var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
        var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数

        if(hh <= 0 && mm <= 0 && ss <0){
            clearInterval(log);
            return false;
        }
        hh = checkTime(hh);
        mm = checkTime(mm);
        ss = checkTime(ss);
        if(nowtime<starttime){
              $(".active_time_tag").html('距离活动开始 <span>'+hh.substr(0,1)+'</span><span>'+hh.substr(1,1)+'</span><lable>时</lable><span>'+mm.substr(0,1)+'</span><span>'+mm.substr(1,1)+'</span><lable>分</lable><span>'+ss.substr(0,1)+'</span><span>'+ss.substr(1,1)+'</span><lable>秒</lable>');
        }else if(nowtime<endtime){
              $(".active_time_tag").html('距离活动结束 <span>'+hh.substr(0,1)+'</span><span>'+hh.substr(1,1)+'</span><lable>时</lable><span>'+mm.substr(0,1)+'</span><span>'+mm.substr(1,1)+'</span><lable>分</lable><span>'+ss.substr(0,1)+'</span><span>'+ss.substr(1,1)+'</span><lable>秒</lable>');
        } else{
              $(".active_time_tag").html('抢购活动已结束');
        }

    }
    function checkTime(i){
        if (i < 10) {
            i = "0" + i;
        }else{
            i = "" + i;
        }
        return (i);
    }

     //获取商品品牌分类
    var ProductList = '';
    function GetProductCatList(){
        if($_GET['hotbrandid']){
            var param  = {HotBrandId:ProductParam.HotBrandId,Keywords:ProductParam.Keywords};
        }else{
            var param  = {ActSeckillId:ProductParam.ActSeckillId,Keywords:ProductParam.Keywords};
        }
        $.ajax({
            url:m.baseUrl+'/site/GetProductCatList',
            data:param,
            dataType:'jsonp',
            jsonp:'callback',
            type:'post'
        }).done(function(ret){
          console.log(ret)
            ProductList = ret.data.ModelList;
            if(ret.status){
                if(ProductList.length>0){
                    var BrandTag = '<li class="sift-item  J_siftItem" data-BrandId="">全部\
                    <span class="icon-selected"></span>\
                </li>';
                }else{
                    var BrandTag = '<li class="sift-item  J_siftItem" data-BrandId="">'+$(".head_tit_center").html()+'\
                    <span class="icon-selected"></span>\
                </li>';
                }

                $.each(ret.data.ModelList,function(k,v) {
                    BrandTag += '<li class="sift-item" data-BrandId="'+ v.BrandId +'">'+ v.BrandName +'\
                    <span class="icon-selected"></span>\
                </li>';
                });
                BrandTag+='<div class="clear"></div>';
                $(".brand_tag").html(BrandTag);
                $(".brand_tag").find(".sift-item").eq(0).trigger('click');
            }else{
                //m.AlertMessage(ret.msg);
                return false;
            }
        })
    }
    GetProductCatList();
    var BrandId,OneCatId,BrandIdKey;
    //筛选条件 品牌
    $(document).on("click",".brand_tag .sift-item",function(){
        if($(this).hasClass("selected")){
            return ;
        }
       var brandid = $(this).attr("data-brandid");
       if(brandid){
            BrandId = [brandid];
       }else{
            BrandId = brandid;
       }
        $(this).addClass("selected").siblings().removeClass("selected");
        var i=$(this).index();
        console.log(i)
        BrandIdKey = i-1;
        var CateTag = '<li class="sift-item  J_siftItem" data-onecatid="" >全部\
                            <span class="icon-selected"></span>\
                           </li>';
        if(BrandIdKey>=0){
           var data=ProductList[BrandIdKey].CatInfos;
           console.log( 'ProductList-%o' ,ProductList)
           $.each(data,function(k,v) {
            console.log(k)
               var className = k > 4 ? ' hidden': '';
               CateTag += '<li class="sift-item '+ className +'" data-visibility="'+ className +'" data-onecatid="'+ v.OneCatId +'">'+ v.OneCatName +'\
                                <span class="icon-selected"></span>\
                           </li>';
           });

        }else{
           console.log( 'ProductList-%o' ,ProductList)
           var OneCats =[];
           $.each(ProductList,function(key,val){
                $.each(val.CatInfos,function(k,v){
                  console.log(v)
                    // OneCats[v.OneCatId] = v.OneCatName;
                    OneCats.push(v);

                })
           })
           console.log(OneCats)
           $.each(OneCats, function(i, v){
            v && console.log(i)
             var className = i > 4 ? ' hidden': '';
                if(v){CateTag += '<li class="sift-item '+ className +'" data-visibility="'+ className +'" data-onecatid="'+ v.OneCatId +'">'+ v.OneCatName +'\
                                <span class="icon-selected"></span>\
                           </li>';}
           })
        }
        CateTag+='<div class="clear"></div>';
        $(".category_tag").html(CateTag);
        setTimeout(function(){
               $(".category_tag_list").slideDown();
        },10)
        $(".category_tag").find(".sift-item").eq(0).trigger('click');
    });

    //筛选条件  一级品类
    $(document).on("click",".category_tag .sift-item",function(){
        if($(this).hasClass("selected")){
            return ;
        }

        var onecatid = $(this).attr("data-onecatid");
        OneCatId = onecatid;
        var i = $(this).index();
        $(this).addClass("selected").siblings().removeClass("selected");
        var CateTag = '<li class="sift-item  J_siftItem" data-catid="" >全部\
                            <span class="icon-selected"></span>\
                           </li>';
        if(OneCatId){
            if(BrandIdKey>=0){
                   var data = ProductList[BrandIdKey].CatInfos;
                   $.each(data,function(key,val) {
                    console.log('%s--%o', key, val)
                        if(val.OneCatId==OneCatId){
                            $.each(val.CatInfos,function(k,v){
                              console.log('%d-%o', k,v)
                              var className = k > 4 ? ' hidden': '';
                                CateTag += '<li class="sift-item '+ className +'" data-visibility="'+ className +'"data-catid="'+ v.CatId +'">'+ v.CatName +'\
                                            <span class="icon-selected"></span>\
                                       </li>';

                            })
                        }
                   });
             }else{
                    var Cats =[];
                    $.each(ProductList,function(key,val){
                        $.each(val.CatInfos,function(k,v){
                            if(v.OneCatId==OneCatId){
                                $.each(v.CatInfos,function(k, v){
                                     // Cats[this.CatId] = this.CatName;
                                     Cats.push(v)
                                })
                             }
                        })
                    })
                    console.log(Cats)
                    $.each( Cats, function(i, v){
                       var className = i > 4 ? ' hidden': '';
                        CateTag += '<li class="sift-item '+ className +'" data-visibility="'+ className +'" data-catid="'+ j.CatId +'">'+ j.CatName +'\
                                <span class="icon-selected"></span>\
                           </li>';
                    })
             }
        }else{
            var Cats =[];
            if(BrandIdKey>=0){
                $.each(ProductList[BrandIdKey].CatInfos,function(key,val) {
                    $.each(val.CatInfos,function(k,v){
                        // Cats[v.CatId] = v.CatName;
                        Cats.push(v);
                    })
                });
            }else{

                $.each(ProductList,function(key,val) {

                    $.each(val.CatInfos,function(k,v){
                        $.each(v.CatInfos,function(idx, value){
                            // Cats[this.CatId] = this.CatName;
                            Cats.push(value)
                        })
                    })
                });
            }
            console.log(Cats)
            $.each(Cats, function(i, j){
               var className = i > 4 ? ' hidden': '';
                CateTag += '<li class="sift-item '+ className +'" data-visibility="'+ className +'" data-catid="'+ j.CatId +'">'+ j.CatName +'\
                                <span class="icon-selected"></span>\
                           </li>';
           })
        }
        CateTag+='<div class="clear"></div>';
        $(".categorytwo_tag").html(CateTag);
        setTimeout(function(){
               $(".categorytwo_tag_list").slideDown();
        },10)
        $(".categorytwo_tag").find(".sift-item").eq(0).trigger('click');
    });


     //筛选条件  二级品类
    $(document).on("click",".categorytwo_tag .sift-item",function(){
        if($(this).hasClass("selected")){
            return ;
        }
        var catid = $(this).attr("data-catid");
        var i=$(this).index();
        $(this).addClass("selected").siblings().removeClass("selected");
        if($_GET['hotbrandid']){
            var JsonData= {HotBrandId:ProductParam.HotBrandId,CatId:catid,BrandIds:BrandId,OneCatId:OneCatId,Keywords:ProductParam.Keywords};
        }else{
            var JsonData= {ActSeckillId:ProductParam.ActSeckillId,CatId:catid,BrandIds:BrandId,OneCatId:OneCatId,Keywords:ProductParam.Keywords};
        }

        $.ajax({
            url:m.baseUrl+'/site/GetAllAvailableSize',
            data:JsonData,
            dataType:'jsonp',
            jsonp:'callback',
            type:'post'
        }).done(function(ret){
             if(ret.status){
                var SizeTag = '<li class="sift-item selected J_siftItem" data-size="">全部\
                        <span class="icon-selected"></span>\
                       </li>';
                $.each(ret.data.AvailableSizes,function(k,v) {
                   var className = k > 4 ? ' hidden': '';
                    SizeTag += '<li class="sift-item '+ className +'" data-visibility="'+ className +'" data-size="'+ v.Size +'">'+ v.Size +'\
                            <span class="icon-selected"></span>\
                       </li>';
                });
                SizeTag+='<div class="clear"></div>';
                $(".size_tag").html(SizeTag);
                 $(".size_tag_list").slideDown();
            }else{
                //m.AlertMessage(ret.msg);
                return false;
            }
        });
    });


    $('.ScrollTop').click(function(){
        $('html, body').animate({scrollTop:0}, 'slow');
    });
    var count = 0, timers = null;
    var oldTop = newTop = $(window).scrollTop();
    function action(){
        if(timers) clearTimeout(timers);
        newTop = $(window).scrollTop();
        if(newTop === oldTop) {
            clearTimeout(timers);
            //已停止，写入业务代码
            setTimeout(function(){
                $(".CurrentPosition").css("z-index",'-1');
            },1000);
        } else{
            oldTop = newTop;
            timers = setTimeout(action,100);
        }
    }
    $(window).on('scroll',action);

    //收藏品牌
    $("#collectbrandid").click(function(){
          m.Wislogin();collect();
    })

    function collect() {
        var HotBrandId = $_GET["hotbrandid"];
        var val = $("#collectbrandid").attr("value");
         $.ajax({
            url:m.baseUrl+'/site/HotBrandCollectSave',
            data:{HotBrandId:HotBrandId,val:val},
            dataType:'jsonp',
            jsonp:'callback',
            type:'post'
        }).done(function(ret){
            if(ret.status){
                if(val=="false"){
                    $("#collectbrandid").addClass("icon-star thmemColor").removeClass('icon-newstar');
                    $("#collectbrandid").attr("value","true");
                     m.AlertMessage('收藏成功');
                }else{
                     $("#collectbrandid").removeClass("icon-star thmemColor").addClass('icon-newstar');
                     $("#collectbrandid").attr("value","false");
                     m.AlertMessage('已取消收藏');

                }
            }else{
                m.AlertMessage(ret.msg);
                return false;
            }
        })
    }


    //筛选条件  尺码
    $(document).on("click",".size_tag .sift-item",function(){
        $(this).addClass("selected").siblings().removeClass("selected");
    });


    //选择价格区间
    $(document).on("click",".price_tag .sift-item",function(){
        $(this).addClass("selected").siblings().removeClass("selected");
        var MinPrice = $(this).attr("data-min");
        var MaxPrice = $(this).attr("data-max")?$(this).attr("data-max"):'';
        $(".min-price").val(MinPrice);
        $(".max-price").val(MaxPrice);
    });

    $(document).on("keyup",".min-price",function(){
        $(".price_tag .sift-item").removeClass("selected");
    });

    $(document).on("keyup",".max-price",function(){
        $(".price_tag .sift-item").removeClass("selected");
    });

    //防止安卓闪屏
    var firstclick = 0;
    $(document).on("focus",".min-price",function(){
        $(window).off('resize.offcanvas.amui');
        if(firstclick == 0){
            firstclick = 1 ;
        }
    })


    $(document).on("focus",".max-price",function(){
         $(window).off('resize.offcanvas.amui');
        if(firstclick == 0){
            firstclick == 1 ;
        }
     })


    //重置
    $(document).on("click","#J_SiftContent .reset",function(){
      console.log('reset')
      $(".brand_tag").find('.sift-item').eq(0).trigger('click');
    });


    //确定
    $(document).on("click",".sure_btn",function(){
      console.log('confirm')
        var  BrandId='',OneCatId='',CatId='',Size='';
        $(".sift-item").each(function(){
            if($(this).hasClass("selected")){
                if($(this).attr("data-brandid")){
                    BrandId = $(this).attr("data-brandid");
                }
                if($(this).attr("data-onecatid")){
                    OneCatId = $(this).attr("data-onecatid");
                }
                 if($(this).attr("data-catid")){
                    CatId = $(this).attr("data-catid");
                }
                if($(this).attr("data-size")){
                    Size = $(this).attr("data-size");
                }
            }
        });
        var MinPrice = parseInt($(".min-price").val()) > 0 ? $(".min-price").val() : '';
        var MaxPrice = parseInt($(".max-price").val()) > 0 ? $(".max-price").val() : '';
        //console.log(MinPrice,MaxPrice);
        if(parseInt(MinPrice) > parseInt(MaxPrice)){
            AlertMessage("最低价必须小于最高价！");
            return ;
        }

        ProductParam.MinPrice = MinPrice;
        ProductParam.MaxPrice = MaxPrice;

        if(BrandId){
            ProductParam.BrandId = BrandId;
        }else{
            ProductParam.BrandId = '';
        }
        if(OneCatId){
            ProductParam.OneCatId = OneCatId;
        }else{
            ProductParam.OneCatId = '';
        }
        if(CatId){
            ProductParam.CatId = CatId;
        }else{
            ProductParam.CatId = '';
        }

        if(Size){
            ProductParam.Size = Size;
        }else{
            ProductParam.Size = '';
        }
        ProductParam.PageNo = 1;
        $(".d_goods_list ul").html('');
        ProductParam.isfinished = false;
        SeckillGetList();
        var $J_SiftContent = $("#J_SiftContent");
        $J_SiftContent.offCanvas('close');

     });

     //跳转
    $(document).on("click", ".d_goods_item", function(){
            localStorage.setItem("ProductParam", JSON.stringify(ProductParam));
            var keyword = $_GET['keyword'];
            var i = $(this).index()+1;
            var scrolltop  = $(document).scrollTop();
            localStorage.setItem('activeindex',i);
            localStorage.setItem('scrolltop',scrolltop);
            var url = $(this).attr("data-src");
            m.UrltoStorage();
            window.location.href=url;
    });
    $("#clear").click(function(){
            $("#key_word").val('');
            $("#key_word").focus();
    })


    //搜索
    $("#search").click(function(){
          var  status = $(this).attr("status");
          if(status==100){
                $(this).attr("status","200");
                $(this).find("span").text("取消");
                $(".searchHead").show();
                $("#title").hide();
          }else{
                $(this).attr("status","100");
                $(this).find("span").text("搜索");
                $(".searchHead").hide();
                $("#title").show();
          }
    })

})

})
