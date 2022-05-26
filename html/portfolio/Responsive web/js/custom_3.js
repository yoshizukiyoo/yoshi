
$(function(){

  // 스크롤 이벤트
  AOS.init();

  
  $('.m_vis_btn').click(function(){
    $('.aside').addClass('on');
  });
  
  $('.close').click(function(){
    $('.aside').removeClass('on');
  });


  $('.menu a').click(function(){
    t = $(this).data('target')
    h = $('#'+t).offset().top;
    $('html,body').animate({scrollTop:h},300)
  });

  $('.aside li a').click(function(){
    t = $(this).data('target')
    h = $('#'+t).offset().top;
    $('html,body').animate({scrollTop:h},300)
    $('.aside').removeClass('on');
  });

  var swiper = new Swiper('.swiper-container', {
    loop:true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
  
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // }
  });
  



}); //지우지 마세요