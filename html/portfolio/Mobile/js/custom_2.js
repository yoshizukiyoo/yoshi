
$(function(){

    // 스크롤 이벤트
    AOS.init();

    // 헤더 스크롤 이벤트
    $(window).on('mousewheel',function(e){
      var wheel = e.originalEvent.wheelDelta;
      
      //스크롤값을 가져온다.
      if(wheel>0){
  
      //스크롤 올릴때
      $("header").removeClass("hide");
      } else {
      
        //스크롤 내릴때
      $("header").addClass("hide");
      }
      });
  
    var swiper = new Swiper('.main_slide', {
      loop:true,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    });

    var swiper = new Swiper('.gnb_slide', {
      slidesPerView: 'auto',
      freeMode: true,
    });    

  var swiper = new Swiper('.best_slide', {
        slidesPerView: 'auto',
        spaceBetween: 10 ,
        scrollbar: {
        el: '.swiper-scrollbar',
      },
  });

  var swiper = new Swiper('.prd_slide', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    freeMode: true,
    pagination: {
      el: '.pgai_2',
      clickable: true,
    },
  });

  var new_nav = new Swiper('.new_nav', {
    slidesPerView: 'auto',
    freeMode: true,
  });
  
  var new_con = new Swiper('.new_con', {
    thumbs: {
      swiper: new_nav
    }    
  });

  $('.play').click(function(){
    $('.pop').addClass('on');
    $('.utube').append('<iframe width="460" height="315" src="https://www.youtube.com/embed/eKfZvJ_cvvE?list=RDgPG0NYLE7wQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
  });

  $('.pop .close').click(function(){
    $('.pop').removeClass('on');
    $('.utube iframe').remove();
  });

  $('.family_btn').click(function(){
    $('.family_link').toggleClass('on');
    $(this).toggleClass('on');
    $('body').toggleClass('hidden');
    //$('.family_link ul li').removeClass('on');

    // $('.family_link ul li').each(function(index){
    //   var row = $(this);
    //   setTimeout(function() {
    //      row.toggleClass('on');
    //    }, 200*index);
    // })
    //gsap.killTweensOf(".family_link li");
    //gsap.to(".family_link li", {duration: 0.2, opacity:1,stagger: 0.2});
    TweenMax.killAll()
    var tweenStagger = TweenMax.staggerFromTo('.family_link li', 0.2,
    {
      opacity:0
    },
    {
      opacity:1
    },
    0.2
  );

  });

  $('.info_btn').click(function(){
    $('.info').toggleClass('on');
    $(this).toggleClass('on');
    $('.info').toggleClass('hidden');
  });

  // $('#search_btn').click(function(){
  //   var offset = $('#wrap_search').offset(); //선택한 태그의 위치를 반환
  //       $('html').animate({scrollTop : offset.top}, 500);
  // });
  

  $('#search_btn').click(function(){
    t = $(this).data('target')
    h = $('#'+t).offset().top-150;
    $('html,body').animate({scrollTop:h},300)
  });
}) //지우지 마세요