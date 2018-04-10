<style>
  /* Clearfix */

.clearfix {
  *zoom: 1;
}

.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}

.pull_left {
  float: left;
}

.pull_right {
  float: right;
}
.z_financial_withdraw>div:nth-child(1){
  color: #111;
  line-height: 32px;
  height: 32px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}
.z_financial_fund {
  padding-left: 10%;
}
.flex_parent {
    /*设置父元素为伸缩容器*/
    display: -webkit-box; /*老版本：iOS 6-, Safari 3.1-6*/
    display: -webkit-flex; /*新版本：Chrome*/
    display: flex; /*标准规范：Opera 12.1, Firefox 20+*/

    /*设置父元素内部的伸缩子元素项目换行规则：水平排列（row）不换行（nowrap）*/
    -webkit-box-orient: horizontal; /*老版本：iOS 6-, Safari 3.1-6*/
    -webkit-flex-flow: row nowrap; /*新版本：Chrome*/
    flex-flow: row nowrap; /*标准规范：Opera 12.1, Firefox 20+*/
}

.flex_son {
  /*设置子元素伸缩项目的伸缩比例*/
  -webkit-box-flex: 1; /*老版本：iOS 6-, Safari 3.1-6*/
  -webkit-flex: 1; /*新版本：Chrome*/
  flex: 1; /*标准规范：Opera 12.1, Firefox 20+*/

  /*此处无需设置宽度，因为flexbox会自动伸缩*/
}
.money_wrap {
  align-items:center;
  -webkit-align-items:center;
  box-align:center;
  -moz-box-align:center;
  -webkit-box-align:center;
  padding: 20px 0;
}
.money_item {
  /*background-color: red;*/
  text-align: center;
}
.money_item:nth-of-type(1){
  border-right: 1px solid #ccc;
}
.money_item>p{
  height: 32px;
  line-height: 32px;
}

.shop_wrap {
  padding: 20px 0;
  background-color: #fff;
}
.goshopping {
  height: 40px;
  background-color: #d72d83;
  width: 200px;
  border-radius: 8px;
  margin: 0 auto;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
  color: #fff;
}

</style>
<header id="head_tit">
    <div class="head_tit_left back" >
       <span class="icon-left"></span>
    </div>
    <div class="head_tit_center">返现账户</div>
    <div class="head_tit_right skips"  data-src="/financial/cashbackhelp">
        <span >帮助</span>
    </div>
</header>
<div class="HT_45"></div>
<?php  $this->initLogin(); if($this->uid==4){?>
 <article class="border_bottom bgwt">
	<section class="auto92 z_financial_withdraw">
		<div>账户余额(元)</div>
		<div><span><?php echo number_format($FinanceIndexMng['Balance'], 2, '.', ''); ?></span>
		<?php if($FinanceIndexMng['Balance']>0){ ?>
		<span class="skips" data-src="/financial/withdrawway">提现</span>
		<?php }else{?>
		<span style="background:#bcbcbc">提现</span>
		<?php  }?>
		</div>
	</section>
</article>
<article class="border_bottom bgwt">
	<section class="auto92 z_financial_con" >
		<div class="z_financial_canuse">
			<div>累计收入(元)</div>
			<div><?php echo number_format($FinanceIndexMng['TotalProfit'], 2, '.', ''); ?></div>
		</div>
		<div class="z_financial_today">
			<div>今日收入(元)</div>
			<div>15367.50</div>
		</div>
	</section>
</article>
<article class="border_bottom bgwt">
	<section class="auto92 z_financial_con" >
		<div class="z_financial_canuse">
			<div>近一周收入(元)</div>
			<div>78546.86</div>
		</div>
		<div class="z_financial_today">
			<div>近一月收入(元)</div>
			<div>243565.35</div>
		</div>
	</section>
</article>
<?php  }else{?>
<article class="border_bottom bgwt">
	<section class="auto92 z_financial_withdraw">
		<div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">已返金额(元)：124565.25</div>

	</section>
</article>

<article class="border_bottom bgwt">
  <section class="auto92  money_wrap flex_parent">
    <div class="money_item flex_son">
      <p>累计消费金额(元) <span class="icon icon-wen call_modal" data-target="consume_detail"></span></p>
      <p>11000.00</p>
    </div>
    <div class="money_item flex_son">
      <p>待返金额(元) <span class="icon icon-wen call_modal"  data-target="unreturned_cash"></span></p>
      <p>1245.12</p>
    </div>

  </section>
</article>

<?php  }?>
<article class="border_bottom bgwt">
	<section class="auto92 z_financial_fund skips" data-src="/financial/cashbacklist">
		<span class="icon-capital"></span><span>查看返现明细</span><span class="icon-bright"></span>
	</section>
</article>

<div class=" shop_wrap ">
  <p class="skips goshopping" data-src="/">去购物 </p>
</div>

<div class="am-modal am-modal-no-btn" tabindex="-1" id="consume_detail">
  <div class="am-modal-dialog">
    <div class="am-modal-hd">Modal 标题
      <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
    </div>
    <div class="am-modal-bd">
      Modal 内容。111111111111
    </div>
  </div>
</div>

<div class="am-modal am-modal-no-btn" tabindex="-1" id="unreturned_cash">
  <div class="am-modal-dialog">
    <div class="am-modal-hd">Modal 标题
      <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
    </div>
    <div class="am-modal-bd">
      Modal 内容。2222
    </div>
  </div>
</div>
<script>
    seajs.config({
        base: '/assets/v2/js/finance/'
    });
    seajs.use('cashback');
</script>


