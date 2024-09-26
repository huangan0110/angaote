var t_browser_has_css3;
var t_css3_array = ['transition', '-webkit-transition', '-moz-transition', '-o-transition', '-ms-transition'];
var t_css3_index;
$(document).ready(function () {
    var t_css3_test = $('body');
    for (t_css3_index = 0, t_css3_test.css(t_css3_array[t_css3_index], ''); t_css3_index < t_css3_array.length && null == t_css3_test.css(t_css3_array[t_css3_index]); t_css3_test.css(t_css3_array[++t_css3_index], ''));
    if (t_css3_index < t_css3_array.length)
        t_browser_has_css3 = true;
    else
        t_browser_has_css3 = false;
    load_pretty();
    load_slider();
    load_carousel();
});



//PRETTYPHOTO
var load_pretty = function () {
    $('.pretty').prettyPhoto();
};

// SLIDER 
var load_slider = function () {
    $('.skywalkerSlider').each(function () {
        var t_time_slide = 200;   //time of slide transition animation in miliseconds
        var t_time_slide_box = 200;   //time of slide info box fade animation in miliseconds
        var t_time_preview = 200;   //time of preview items movements in miliseconds
        var t_time_preview_hover = 200;   //time of preview item hover effect animation in miliseconds
        var t_time_preview_marker = 200;   //time of preview marker movement in miliseconds
        var t_autoplay_time = 2000;   //interval for autoplay to switch the slides in miliseconds; *NOTE: animation time and autoplay interval are independent from each other, thus autoplay interval must be equal or less then animation time, in other case there will be more then one slide executing its transition animation (recomemnded values for autoplay interval: 1/2 of animation time or less)
        var t_autoplay_time_resume = 3000;   //time for the autoplay to resume in miliseconds
        var t_preview_items_visible = 4;   //nr of items visible in the preview box; *NOTE: this is not a configuration option
        var t_preview_items_width = 240;   //width of an item in the preview box in pixels (width + padding + border +margin); *NOTE; this is not a configuration option
        var t = $(this);
        var t_marker = t.children('.skywalkerSliderMarker');
        var t_marker_value = 0;
        var t_preview_items_width_css = t_preview_items_width + 'px';
        var t_preview_items_width_css_small = t_preview_items_width - 1 + 'px';
        var t_marker_value_maximum = t_preview_items_visible - 1;
        var t_content = t.children('.skywalkerSliderContent');
        var t_content_items = t_content.children('.skywalkerSliderContentItem');
        var t_preview = t.children('.skywalkerSliderPreview');
        var t_preview_items = t_preview.children('.skywalkerSliderPreviewItem');
        var t_preview_items_opacity = t_preview_items.children('.skywalkerSliderPreviewItemOpacity');
        var t_preview_items_total = t_preview_items.length;
        var t_preview_value = 0;
        var t_preview_value_maximum = t_preview_items_total - 1;
        var t_preview_items_array = $.makeArray(t_preview_items);
        var t_content_box = t_content_items.children('.skywalkerSliderContentItemBox');
        var t_content_left = t_content_box.children('.skywalkerSliderContentItemBoxPrev');
        var t_content_right = t_content_box.children('.skywalkerSliderContentItemBoxNext');
        var t_preview_overflow = t_preview_items_total > 4;
        var t_interval = 0;
        var t_timeout = 0;
        if (t_browser_has_css3) {
            t_content_items.css(t_css3_array[t_css3_index], 'opacity ' + t_time_slide / 1000 + 's linear');
            t_content_box.css(t_css3_array[t_css3_index], 'opacity ' + t_time_slide_box / 1000 + 's ease-in-out');
            t_preview.css(t_css3_array[t_css3_index], 'margin-left ' + t_time_preview / 1000 + 's ease-in-out');
            t_preview_items_opacity.css(t_css3_array[t_css3_index], 'background-color ' + t_time_preview_hover / 1000 + 's ease-in-out');
            t_marker.css(t_css3_array[t_css3_index], 'width,margin-left ' + t_time_preview_marker / 1000 + 's ease-in-out');
        }
        else {
            t_preview_items_opacity.css({
                'background-color': 'white',
                opacity: 0.7
            });
            t_preview_items_opacity.hover(function () {
                $(this).stop().animate({
                    opacity: 0
                }, {
                    duration: t_time_preview_hover,
                    queue: false
                });
            }, function () {
                $(this).stop().animate({
                    opacity: 0.7
                }, {
                    duration: t_time_preview_hover,
                    queue: false
                });
            });
            t_content_box.hover(function () {
                $(this).stop().animate({
                    opacity: 1
                }, {
                    duration: t_time_slide_box,
                    queue: false
                });
            }, function () {
                $(this).stop().animate({
                    opacity: 0
                }, {
                    duration: t_time_slide_box,
                    queue: false
                });
            });
        }
        var t_content_transition = function () {
            if (t_browser_has_css3) {
                t_content_items.filter('.skywalkerSliderContentActive').removeClass('skywalkerSliderContentActive');
                t_content_items.filter(':eq(' + t_preview_value + ')').addClass('skywalkerSliderContentActive');
            }
            else {
                t_content_items.filter('.skywalkerSliderContentActive').removeClass('skywalkerSliderContentActive').stop().animate({
                    opacity: 0
                }, {
                    duration: t_time_slide,
                    queue: false
                });
                t_content_items.filter(':eq(' + t_preview_value + ')').addClass('skywalkerSliderContentActive').stop().animate({
                    opacity: 1
                }, {
                    duration: t_time_slide,
                    queue: false
                });
            }
        }
        var t_preview_transition = function () {
            if (t_browser_has_css3) {
                t_preview_items.filter('.skywalkerSliderPreviewActive').removeClass('skywalkerSliderPreviewActive');
                t_preview_items.filter(':eq(' + t_preview_value + ')').addClass('skywalkerSliderPreviewActive');
            }
            else {
                t_preview_items.filter('.skywalkerSliderPreviewActive').removeClass('skywalkerSliderPreviewActive').children('.skywalkerSliderPreviewItemOpacity').stop().animate({
                    opacity: 0
                }, {
                    duration: t_time_preview_hover,
                    queue: false
                });
                t_preview_items.filter(':eq(' + t_preview_value + ')').addClass('skywalkerSliderPreviewActive').children('.skywalkerSliderPreviewItemOpacity').stop().animate({
                    opacity: 0.7
                }, {
                    duration: t_time_preview_hover,
                    queue: false
                });
            }
        }
        var t_autoplay_start;
        var t_autoplay_stop_resume;
        var t_left_transition;
        var t_right_transition;
        var t_left_function;
        var t_right_function;
        t_left_function = function () {
            t_left_transition();
            t_autoplay_stop_resume();
        }
        t_right_function = function () {
            t_right_transition();
            t_autoplay_stop_resume();
        }
        t_autoplay_start = function () {
            t_interval = setInterval(t_right_transition, t_autoplay_time);
        }
        t_autoplay_stop_resume = function () {
            clearInterval(t_interval);
            clearTimeout(t_timeout);
            t_timeout = setTimeout(t_autoplay_start, t_autoplay_time_resume);
        }
        if (t_preview_overflow) {
            if (t_browser_has_css3)
                t_preview.css('width', t_preview_items_width * t_preview_items_total);
            else
                t_preview.stop().animate({
                    width: t_preview_items_width * t_preview_items_total
                }, {
                    duration: t_time_preview,
                    queue: false
                });
            var t_button_left = $('<div>').addClass('skywalkerSliderLeft');
            var t_button_right = $('<div>').addClass('skywalkerSliderRight');
            t.append(t_button_left).append(t_button_right);
            var t_preview_view_maximum = t_preview_items_total - t_preview_items_visible;
            var t_preview_view_minimum = t_preview_items_visible - 1;
            t_left_transition = function () {
                t_preview_value--;
                if (t_preview_value < 0) {
                    t_preview_value = t_preview_value_maximum;
                    if (t_browser_has_css3)
                        t_preview.css('margin-left', -t_preview_items_width * t_preview_view_maximum);
                    else
                        t_preview.stop().animate({
                            marginLeft: -t_preview_items_width * t_preview_view_maximum
                        }, {
                            duration: t_time_preview,
                            queue: false
                        });
                    t_marker_value = t_marker_value_maximum;
                    if (t_browser_has_css3)
                        t_marker.css({
                            marginLeft: t_preview_items_width * t_marker_value + 1 + 'px',
                            width: t_preview_items_width_css_small
                        });
                    else
                        t_marker.stop().animate({
                            marginLeft: t_preview_items_width * t_marker_value + 1 + 'px',
                            width: t_preview_items_width_css_small
                        }, {
                            duration: t_time_preview_marker,
                            queue: false
                        });
                }
                else {
                    if (t_preview_value < t_preview_view_maximum)
                        if (t_browser_has_css3)
                            t_preview.css('margin-left', -t_preview_items_width * t_preview_value);
                        else
                            t_preview.stop().animate({
                                marginLeft: -t_preview_items_width * t_preview_value
                            }, {
                                duration: t_time_preview,
                                queue: false
                            });
                    if (t_preview_value) {
                        if (t_marker_value > 0) {
                            t_marker_value--;
                            if (t_browser_has_css3)
                                t_marker.css({
                                    marginLeft: t_preview_items_width * t_marker_value + 1 + 'px'
                                });
                            else
                                t_marker.stop().animate({
                                    marginLeft: t_preview_items_width * t_marker_value + 1 + 'px'
                                }, {
                                    duration: t_time_preview_marker,
                                    queue: false
                                });
                        }
                    }
                    else
                        if (t_browser_has_css3)
                            t_marker.css({
                                marginLeft: 0,
                                width: t_preview_items_width_css
                            });
                        else
                            t_marker.stop().animate({
                                marginLeft: 0,
                                width: t_preview_items_width_css
                            }, {
                                duration: t_time_preview_marker,
                                queue: false
                            });
                }
                t_preview_transition();
                t_content_transition();
            }
            t_right_transition = function () {
                t_preview_value++;
                if (t_preview_value > t_preview_value_maximum) {
                    t_preview_value = 0;
                    if (t_browser_has_css3)
                        t_preview.css('margin-left', 0);
                    else
                        t_preview.stop().animate({
                            marginLeft: 0
                        }, {
                            duration: t_time_preview,
                            queue: false
                        });
                    t_marker_value = 0;
                    if (t_browser_has_css3)
                        t_marker.css({
                            marginLeft: 0,
                            width: t_preview_items_width_css
                        });
                    else
                        t_marker.stop().animate({
                            marginLeft: 0,
                            width: t_preview_items_width_css
                        }, {
                            duration: t_time_preview_marker,
                            queue: false
                        });
                }
                else {
                    if (t_preview_value > t_preview_view_minimum)
                        if (t_browser_has_css3)
                            t_preview.css('margin-left', -t_preview_items_width * (t_preview_value - t_preview_view_minimum));
                        else
                            t_preview.stop().animate({
                                marginLeft: -t_preview_items_width * (t_preview_value - t_preview_view_minimum)
                            }, {
                                duration: t_time_preview,
                                queue: false
                            });
                    if (t_marker_value < t_marker_value_maximum) {
                        t_marker_value++;
                        if (t_preview_value != 1)
                            if (t_browser_has_css3)
                                t_marker.css({
                                    marginLeft: t_preview_items_width * t_marker_value + 1 + 'px'
                                });
                            else
                                t_marker.stop().animate({
                                    marginLeft: t_preview_items_width * t_marker_value + 1 + 'px'
                                }, {
                                    duration: t_time_preview_marker,
                                    queue: false
                                });
                        else
                            if (t_browser_has_css3)
                                t_marker.css({
                                    marginLeft: t_preview_items_width * t_marker_value + 1 + 'px',
                                    width: t_preview_items_width_css_small
                                });
                            else
                                t_marker.stop().animate({
                                    marginLeft: t_preview_items_width * t_marker_value + 1 + 'px',
                                    width: t_preview_items_width_css_small
                                }, {
                                    duration: t_time_preview_marker,
                                    queue: false
                                });
                    }
                }
                t_preview_transition();
                t_content_transition();
            }
            t_button_left.click(t_left_function);
            t_button_right.click(t_right_function);
            t_button_left.mousedown(function () {
                return false;
            });
            t_button_right.mousedown(function () {
                return false;
            });
        }
        else {
            t_left_transition = function () {
                t_preview_value--;
                if (t_preview_value < 0) {
                    t_preview_value = t_preview_value_maximum;
                    t_marker_value = t_marker_value_maximum;
                    if (t_browser_has_css3)
                        t_marker.css({
                            marginLeft: t_preview_items_width * t_marker_value + 1 + 'px',
                            width: t_preview_items_width_css_small
                        });
                    else
                        t_marker.stop().animate({
                            marginLeft: t_preview_items_width * t_marker_value + 1 + 'px',
                            width: t_preview_items_width_css_small
                        }, {
                            duration: t_time_preview_marker,
                            queue: false
                        });
                }
                else {
                    if (t_marker_value > 0) {
                        t_marker_value--;
                        if (t_preview_value)
                            if (t_browser_has_css3)
                                t_marker.css({
                                    marginLeft: t_preview_items_width * t_marker_value + 1 + 'px'
                                });
                            else
                                t_marker.stop().animate({
                                    marginLeft: t_preview_items_width * t_marker_value + 1 + 'px'
                                }, {
                                    duration: t_time_preview_marker,
                                    queue: false
                                });
                        else
                            if (t_browser_has_css3)
                                t_marker.css({
                                    marginLeft: 0,
                                    width: t_preview_items_width_css
                                });
                            else
                                t_marker.stop().animate({
                                    marginLeft: 0,
                                    width: t_preview_items_width_css
                                }, {
                                    duration: t_time_preview_marker,
                                    queue: false
                                });
                    }
                }
                t_preview_transition();
                t_content_transition();
            }
            t_right_transition = function () {
                t_preview_value++;
                if (t_preview_value > t_preview_value_maximum) {
                    t_preview_value = 0;
                    t_marker_value = 0;
                    if (t_browser_has_css3)
                        t_marker.css({
                            marginLeft: 0,
                            width: t_preview_items_width_css
                        });
                    else
                        t_marker.stop().animate({
                            marginLeft: 0,
                            width: t_preview_items_width_css
                        }, {
                            duration: t_time_preview_marker,
                            queue: false
                        });
                }
                else {
                    if (t_marker_value < t_marker_value_maximum) {
                        t_marker_value++;
                        if (t_preview_value != 1)
                            if (t_browser_has_css3)
                                t_marker.css({
                                    marginLeft: t_preview_items_width * t_marker_value + 1 + 'px'
                                });
                            else
                                t_marker.stop().animate({
                                    marginLeft: t_preview_items_width * t_marker_value + 1 + 'px'
                                }, {
                                    duration: t_time_preview_marker,
                                    queue: false
                                });
                        else
                            if (t_browser_has_css3)
                                t_marker.css({
                                    marginLeft: t_preview_items_width * t_marker_value + 1 + 'px',
                                    width: t_preview_items_width_css_small
                                });
                            else
                                t_marker.stop().animate({
                                    marginLeft: t_preview_items_width * t_marker_value + 1 + 'px',
                                    width: t_preview_items_width_css_small
                                }, {
                                    duration: t_time_preview_marker,
                                    queue: false
                                });
                    }
                }
                t_preview_transition();
                t_content_transition();
            }
        }
        t_preview_items.click(function () {
            var t_preview_items_active_last = t_preview_items.filter('.skywalkerSliderPreviewActive').not(this);
            if (t_preview_items_active_last.length) {
                var t_preview_value_new = t_preview_items_array.indexOf(this);
                t_marker_value += t_preview_value_new - t_preview_value;
                if (!t_preview_value)
                    if (t_browser_has_css3)
                        t_marker.css({
                            marginLeft: t_preview_items_width * t_marker_value + 1 + 'px',
                            width: t_preview_items_width_css_small
                        });
                    else
                        t_marker.stop().animate({
                            marginLeft: t_preview_items_width * t_marker_value + 1 + 'px',
                            width: t_preview_items_width_css_small
                        }, {
                            duration: t_time_preview_marker,
                            queue: false
                        });
                else
                    if (t_preview_value_new)
                        if (t_browser_has_css3)
                            t_marker.css({
                                marginLeft: t_preview_items_width * t_marker_value + 1 + 'px'
                            });
                        else
                            t_marker.stop().animate({
                                marginLeft: t_preview_items_width * t_marker_value + 1 + 'px'
                            }, {
                                duration: t_time_preview_marker,
                                queue: false
                            });
                    else
                        if (t_browser_has_css3)
                            t_marker.css({
                                marginLeft: 0,
                                width: t_preview_items_width_css
                            });
                        else
                            t_marker.stop().animate({
                                marginLeft: 0,
                                width: t_preview_items_width_css
                            }, {
                                duration: t_time_preview_marker,
                                queue: false
                            });
                t_preview_value = t_preview_value_new;
                t_preview_transition();
                t_content_transition();
            }
            t_autoplay_stop_resume();
        });
        t_content.click(function () {
            t_autoplay_stop_resume();
        });
        t.children('.skywalkerSliderResponsiveLeft').click(t_left_function);
        t.children('.skywalkerSliderResponsiveRight').click(t_right_function);
        t_content_left.click(t_left_function);
        t_content_right.click(t_right_function);
        t_autoplay_start();
    });
};

//CAROUSEL
var load_carousel = function () {
    $('.carousel').each(function () {
        var t_time = 200;   //time for carousel movement in miliseconds
        var t = $(this);
        var t_view = t.children('.carouselView');
        var t_container = t_view.children('.carouselContainer')
        var t_columns = t_container.children('.columns');
        var t_width_first;
        var t_width_last;
        var t_value = 0;
        var t_visible;
        var t_value_nr = t_columns.length;
        var t_value_max;
        var t_back = t.children('.carouselBack');
        var t_next = t.children('.carouselNext');
        var t_w = $(window);
        var t_w_level = -1;
        var t_update = function (width_new) {
            if (t_w_level != 3 && width_new <= 480) {
                t_w_level = 3;
                t_visible = 1;
                t_value_max = t_value_nr - t_visible;
                t_width_first = parseInt(t_columns.filter(':first').outerWidth(true));
                t_width_last = parseInt(t_columns.filter(':last').outerWidth(true));
                t_container.css({ width: (t_value_nr - 1) * t_width_first + t_width_last });
                t_container.css({ marginLeft: -t_value * t_width_first });
            } else if (t_w_level != 2 && width_new > 480 && width_new <= 767) {
                t_w_level = 2;
                t_visible = 1;
                t_value_max = t_value_nr - t_visible;
                t_width_first = parseInt(t_columns.filter(':first').outerWidth(true));
                t_width_last = parseInt(t_columns.filter(':last').outerWidth(true));
                t_container.css({ width: (t_value_nr - 1) * t_width_first + t_width_last });
                t_container.css({ marginLeft: -t_value * t_width_first });
            } else if (t_w_level != 1 && width_new > 768 && width_new <= 959) {
                t_w_level = 1;
                t_visible = 4;
                t_value_max = t_value_nr - t_visible;
                if (t_value > t_value_max)
                    t_value = t_value_max;
                t_width_first = parseInt(t_columns.filter(':first').outerWidth(true));
                t_width_last = parseInt(t_columns.filter(':last').outerWidth(true));
                t_container.css({ width: (t_value_nr - 1) * t_width_first + t_width_last });
                t_container.css({ marginLeft: -t_value * t_width_first });
            } else if (t_w_level != 0 && width_new > 960) {
                t_w_level = 0;
                t_visible = 4;
                t_value_max = t_value_nr - t_visible;
                if (t_value > t_value_max)
                    t_value = t_value_max;
                t_width_first = parseInt(t_columns.filter(':first').outerWidth(true));
                t_width_last = parseInt(t_columns.filter(':last').outerWidth(true));
                t_container.css({ width: (t_value_nr - 1) * t_width_first + t_width_last });
                t_container.css({ marginLeft: -t_value * t_width_first });
            }
        }
        t_update(t_w.width());
        t_w.resize(function () {
            t_update(t_w.width());
        });
        if (t_browser_has_css3) {
            t_container.css(t_css3_array[t_css3_index], 'margin-left ' + t_time / 1000 + 's linear');
            t_back.click(function () {
                if (t_value > 0) {
                    t_value--;
                    t_container.css({ marginLeft: -t_value * t_width_first });
                }
            });
            t_next.click(function () {
                if (t_value < t_value_max) {
                    t_value++;
                    t_container.css({ marginLeft: -t_value * t_width_first });
                }
            });
        } else {
            t_back.click(function () {
                if (t_value > 0) {
                    t_value--;
                    t_container.stop().animate({ marginLeft: -t_value * t_width_first }, { duration: t_time, queue: false });
                }
            });
            t_next.click(function () {
                if (t_value < t_value_max) {
                    t_value++;
                    t_container.stop().animate({ marginLeft: -t_value * t_width_first }, { duration: t_time, queue: false });
                }
            });
        }
        t_back.mousedown(function () {
            return false;
        });
        t_next.mousedown(function () {
            return false;
        });
    });
};




//IE fix
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    }
}