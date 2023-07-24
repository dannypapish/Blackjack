
var $ = jQuery,
    clickLock = false,
    hoverTimeout;

$(document).ready(function(){
    // Add click event handler for the sidebar toggle on mobile
    if ($(window).width() < 768) {
        $('.sidebar-toggle').on('click', function() {
            if ($('body').hasClass('left')) {
                $('body').removeClass('left');
            } else {
                $('body').addClass('left');
            }
        });


    } else {
        // Remove click event handler for the sidebar toggle on larger screens
        $('.sidebar-toggle').off('click');
        
        // Add hover event handler for the sidebar toggle on larger screens
        $('.sidebar-toggle').hover(function() {
            clearTimeout(hoverTimeout);
            $('body').addClass('opening');
            $('body').addClass('open');
        }, function() {
            hoverTimeout = setTimeout(function() {
                if (!$('.navigation .elementor-icon-list-item').hasClass('active')) {
                    $('body').removeClass('open');
                    setTimeout(function(){
                        $('body').removeClass('opening');
                    }, 200);
                }
            }, 200);
        }).click(function() {
            if ($(window).width() >= 768) {
                if ($('body').hasClass('open')) {
                    $('body').removeClass('open');
                    setTimeout(function() {
                        $('body').removeClass('opening');
                    }, 200);
                } else {
                    $('body').addClass('opening');
                    $('body').addClass('open');
                }
            }
        });
        
        // Add hover event handler for the navigation items on larger screens
        $('.navigation .elementor-icon-list-item').hover(function() {
            clearTimeout(hoverTimeout);
            if (!clickLock) {
                $('.navigation .elementor-icon-list-item').removeClass('active');
                $(this).addClass('active');
                clickLock = true;
                setTimeout(function(){
                    clickLock = false;
                }, 200);
            }
        }, function() {
            hoverTimeout = setTimeout(function() {
                if (!$('.sidebar-toggle').is(':hover')) {
                    $('.navigation .elementor-icon-list-item').removeClass('active');
                }
            }, 200);
        });
    }
});
$(window).on('load resize', function(){
    if( $(window).width() < 768 ){
        $('body').removeClass('open opening')
        $('body').addClass('left')
    }else if( $(window).width() < 1025 ){
        $('body').addClass('open opening')
    }else{
        $('body').removeClass('open opening')
     
    }
})
var hash = true
$(window).on('load', function(){
    $('.elementor-icon-list-item a').each(function(){
        if( $(this).attr('href') == location.protocol+'//'+location.host+location.pathname ){
            hash = false
            $(this).parent().addClass('active')
        }
    })
})
$(window).on('load scroll', function(){
    
    if( !hash || clickLock ) return
    
    var ids = [],
        id
    
    $('.elementor-top-section').each(function(){
        if($(window).scrollTop() + $(window).height() - 350 > $(this).offset().top){
            ids.push($(this).attr('id'))
        }
    })
    
    ids = ids.filter(element => {
      return element !== undefined
    })
    
    id = ids[ids.length - 1]
    
    $('.elementor-icon-list-item').removeClass('active')
    $('[href="#'+id+'"]').parent().addClass('active')
})
$('body').on('click', function(e)  {
    
if(!$(e.target).closest('.elementor-location-header').length && !$(e.target).hasClass('elementor-location-header') ){
    
    if( $(window).width() < 768 ){
        $('body').addClass('left')
    }else {
        $('body').addClass('open opening')
    }
}
    
})

if( $(window).width() > 768 ){

    $(window).scroll(function() {
    
            setTimeout(function(){
              $('body').addClass('open opening')
              },400)
        
        
    });

}

/*<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
var $ = jQuery,
    clickLock = false,
    hoverTimeout;

$(document).ready(function(){
    // Add click event handler for the sidebar toggle on mobile
    if ($(window).width() < 768) {
        $('.sidebar-toggle').on('click', function() {
            if ($('body').hasClass('left')) {
                $('body').removeClass('left');
            } else {
                $('body').addClass('left');
            }
        });


    } else {
        // Remove click event handler for the sidebar toggle on larger screens
        $('.sidebar-toggle').off('click');
        
        // Add hover event handler for the sidebar toggle on larger screens
        $('.sidebar-toggle').hover(function() {
            clearTimeout(hoverTimeout);
            $('body').addClass('opening');
            $('body').addClass('open');
        }, function() {
            setTimeout(function() {
                if (!$('.navigation .elementor-icon-list-item').hasClass('active')) {
                    $('body').removeClass('open');
                    setTimeout(function(){
                        $('body').removeClass('opening');
                    });
                }
            });
        }).click(function() {
            if ($(window).width() >= 768) {
                if ($('body').hasClass('open')) {
                    $('body').removeClass('open');
                    setTimeout(function() {
                        $('body').removeClass('opening');
                    }, 200);
                } else {
                    $('body').addClass('opening');
                    $('body').addClass('open');
                }
            }
        });
        
        // Add hover event handler for the navigation items on larger screens
        $('.m .navigation').hover(function() {
            clearTimeout(hoverTimeout);
            if (!clickLock) {
                $('.navigation .elementor-icon-list-item').removeClass('active');
                $(this).addClass('active');
                clickLock = true;
                setTimeout(function(){
                    clickLock = false;
                });
            }
        }, function() {
            hoverTimeout = setTimeout(function() {
                if (!$('.m .navigation').is(':hover')) {
                    $('.m').removeClass('active');
                }
            },100);
        },100);
    }
});
$(window).on('load resize', function(){
    if( $(window).width() < 768 ){
        $('body').removeClass('open opening')
        $('body').addClass('left')
    }else if( $(window).width() < 1025 ){
        $('body').addClass('open opening')
    }else{
        $('body').removeClass('open opening')
     
    }
})
var hash = true
$(window).on('load', function(){
    $('.elementor-icon-list-item a').each(function(){
        if( $(this).attr('href') == location.protocol+'//'+location.host+location.pathname ){
            hash = false
            $(this).parent().addClass('active')
        }
    })
})
$(window).on('load scroll', function() {
    var windowHeight = $(window).height();
    var documentHeight = $(document).height();
    var scrollPosition = $(window).scrollTop();

    // Calculate the distance from the bottom of the page
    var distanceFromBottom = documentHeight - (scrollPosition + windowHeight);

    // Specify the distance from the bottom where the menu should not automatically expand
    var distanceThreshold = 10; // Adjust this value as needed

    // Check if the distance from the bottom is greater than the threshold
    if (distanceFromBottom > distanceThreshold) {
        $('body').addClass('open opening');
    }
});
$('body').on('click', function(e)  {
    
if(!$(e.target).closest('.elementor-location-header').length && !$(e.target).hasClass('elementor-location-header') ){
    
    if( $(window).width() < 768 ){
        $('body').addClass('left')
    }else {
        $('body').addClass('open opening')
    }
}
    
})

if( $(window).width() > 768 ){

    $(window).scroll(function() {
    
            setTimeout(function(){
              $('body').addClass('open opening')
              },400)
        
        
    });

}

</script>
