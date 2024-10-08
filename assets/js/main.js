(function ($) {
    "use strict";

    $(window).on('load', function(){
        //===== Prealoder
        $("#preloader").delay(400).fadeOut();

        if (window.matchMedia('(max-width: 991.98px)').matches) {
            $('.dropdown_wrap>a').click(function(e) {
                e.preventDefault();
                var $this = $(this);
                // $('.drop_box>a').removeClass('open');
                // $this.toggleClass('open');

                if ($this.next().hasClass('show')) {
                    $this.next().removeClass('show');
                    $this.next().slideUp(350);
                    $('.drop_box>a').removeClass('open');
                    
                } else {
                    $this.parent().parent().find('ul').removeClass('show');
                    $this.parent().parent().find('ul').slideUp(350);
                    $this.next().toggleClass('show');
                    $this.next().slideToggle(350);

                }
            }); 
        }
        if (window.matchMedia('(max-width: 991.98px)').matches) {
            $('.mobile_slider').addClass('owl-carousel');
            $('.owl-carousel.mobile_slider').owlCarousel({
                loop: true,
                margin: 30,
                items: 1,
                dots: true,
                nav: false,
                dotsContainer: '.mobile_nav .navigation .owl-dots',            
                navContainer: '.mobile_nav .navigation .owl-nav',            
                navText:['<i class="fal fa-angle-left"></i>','<i class="fal fa-angle-right"></i>'],
                responsive:{
                    576:{
                        stagePadding: 85,
                    },
                    768:{
                        stagePadding: 145,
                    }
                }
            });  
        }
    });

    $(document).ready(function () {
        //05. sticky header
        function sticky_header(){
            var wind = $(window);
            var sticky = $('header');
            wind.on('scroll', function () {
                var scroll = wind.scrollTop();
                if (scroll < 100) {
                    sticky.removeClass('sticky');
                } else {
                    sticky.addClass('sticky');
                }
            });
        }
        sticky_header();
        //===== Back to top

        // Show or hide the sticky footer button
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 600) {
                $('.back-to-top').fadeIn(200)
            } else {
                $('.back-to-top').fadeOut(200)
            }
        });

        //Animate the scroll to yop
        $('.back-to-top').on('click', function (event) {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: 0,
            }, 900);
        });        

        // Hamburger-menu
        $('.hamburger-menu').on('click', function () {
            $('.hamburger-menu .line-top, .menu').toggleClass('current');
            $('.hamburger-menu .line-center').toggleClass('current');
            $('.hamburger-menu .line-bottom').toggleClass('current');
        });        

        // Hamburger-menu
        $('.filter_btn, .fitler_overlay').on('click', function (e) {
            e.preventDefault();
            $('.fitler_wrap, .fitler_overlay').toggleClass('current');
        });

        // Slider Initialize  
        $('.owl-carousel.slider1').owlCarousel({
            loop: true,
            margin: 40,
            // autoplay: true,
            autoplayTimeout: 1500,
            autoplayHoverPause: true,
            dots: true,
            nav: true,
            responsive:{
                0:{
                    items: 1,
                },
                576:{
                    items: 3,
                    margin: 20,
                },
                992:{
                    items: 5,
                    margin: 20,
                },
                1200:{
                    items: 5
                },                
            }
        });

        // nice select
        $('select').niceSelect();
        // niceNumber
        $('input[type="number"]').niceNumber();
        
        $('.popup, #sync1 .item a').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });       
    });

})(jQuery);


$(document).ready(function () {
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 5;
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: false,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: ['<i class="fal fa-angle-left"></i>', '<i class="fal fa-angle-right"></i>'],
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            margin: 25,
            dots: false,
            nav: false,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: slidesPerPage,
            responsiveRefreshRate: 100,
            responsive:{
                0:{
                    margin: 15,
                },
                576:{
                    margin: 25,
                }
            }
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });
});