/**
 * A simple and small jQuery parallax plugin
 * 
 * @author Sajidur Rahman <sajibsrs@gmail.com>
 * @version 1.0.0
 * @license MIT
 * 
 */

'use strict';

( function($) {
    var win = $(window);
    var win_height = win.height();

    // Recalculate widow height on resize
    win.resize( function() {
        win_height = win.height();
    });

    $.fn.slim_palallax = function(arg) {
        var self = $(this);
        var speed = arg.speed;

        // Check user specified value
        if ( NaN !== speed  && undefined !== speed && 1 < speed && 40 >= speed ) speed = 20;

        function update() {
            // Get scroll position from top
            var win_top = win.scrollTop();

            self.each( function() {
                var elm = $(this);
                var elm_height = elm.height();
                var offset_top = elm.offset().top;
                var data_speed = elm.data('slim-prx-speed');
                var speed_mod  = null;

                // Check if data is valid and greater than 1
               if( NaN !== data_speed && undefined !== data_speed && 1 < data_speed && 40 >= speed ){
                    speed_mod = data_speed;
               }else{
                    speed_mod = speed; 
               }

                var prx_speed = Math.round( ( offset_top - ( win_top + elm_height ) ) / speed_mod ) ;
                
                // Check if parallax container is out of window (top or bottom)
                if( offset_top + elm_height < win_top || offset_top > win_top + win_height ) {
                    return;
                }

                elm.css({ 'background-position-y': prx_speed + 'px'});
            });
        }

        // Call update on scroll and resize
        win.on('scroll resize', function(){
            update();
        });

        update();
    }

})(jQuery);