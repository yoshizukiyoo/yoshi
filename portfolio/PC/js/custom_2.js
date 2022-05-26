
$(function(){
    var swiper = new Swiper('.main_slide', {
      loop:true,
      pagination: {
        el: '.swiper-pagination',
      },
    });
}) //지우지마세요

$(function(){ 
  var swiper = new Swiper('.bg_slide', {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: '.pgai',
      clickable: true,
    },
  });
});

$(function(){ 
  var swiper = new Swiper('.bg_slide2', {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: '.pgai_2',
      clickable: true,
    },
  });
});