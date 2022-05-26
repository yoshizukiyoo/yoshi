$(function(){
  // 스크롤 이벤트
  AOS.init();

  // 헤더 스크롤 이벤트
  $(window).on('mousewheel',function(e){
    var wheel = e.originalEvent.wheelDelta;
    
    //스크롤값을 가져온다.
    if(wheel>0){

    //스크롤 올릴때
    $("#top").removeClass("hide");
    } else {
    
      //스크롤 내릴때
    $("#top").addClass("hide");
    }
    });



  var swiper = new Swiper('.main_slide', {
      loop:true,
    pagination: {
      el: '.main_slide .swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.main_slide .next',
      prevEl: '.main_slide .prev',
    },
  });
  var swiper = new Swiper('.prd_slide', {
    slidesPerView: 'auto',
    spaceBetween : 10,
    pagination: {
      el: '.prd_slide .swiper-pagination',
    },
  });
  
  $('.search').click(function(){
    $('.search_wrap').toggleClass('on');
  });
  
  $('.search_wrap .close').click(function(){
    $('.search_wrap').removeClass('on');
  });

  // external js: isotope.pkgd.js

  $('.grid').isotope({
    itemSelector: '.grid-item',
    // masonry: {
    //   columnWidth: 100
    // }
  });

  gsap.to(".grid-item", {duration: 0.5, opacity:1, y:0, stagger: 0.2});

})