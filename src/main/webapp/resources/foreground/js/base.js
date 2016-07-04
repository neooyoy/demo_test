$(function(){
	banSwiper();	//轮播
	search();	//焦点事件
	
});

function banSwiper(){
	var mainBan = new Swiper('.main-banner',{
		loop: true,
		autoplay: 5000
	});
};

function search(){
	//var defTxt = $('.text-inp').val();
	/*$('.text-inp').focus(function(){
		$(this).val('');
	});*/
	/*$('.text-inp').blur(function(){
		if($(this).val() == ''){
			$(this).val(defTxt);
		}
	});*/
};
