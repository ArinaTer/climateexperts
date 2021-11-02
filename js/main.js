/**
 * Template Name: Nebbia
 * Description: Responsive Under Construction Template
 * Author: Infinity Motion
 * Template URL: http://www.infinity-motion.com/nebbia/
 * Author URL: http://themeforest.net/user/InfinityMotion
 * Version: 1.0
 */

$(function(){

	/**
	 *  Application Init
	 *  Init Application widgets and components.
	 */
	Application.init({


		/**
		 * Website preloader.
		 *
		 * data-widget="preloader" - Preloader selector.
		 * data-preloader-animation="fadeIn" - Animation for any blocks.
		 *
		 * P.S. Animation starting after document ready, loaded. Required "animate.css".
		 *
		 * @returns {(boolean|HTMLElement)} - disabled | preloader DOM element.
		 */
		preloader: function() {
			var uiView = $('.ui-view');
			var preloader = $('[data-widget="preloader"]');
			var animateItems = $('[data-preloader-animation]');

			if(preloader) {
				$(window).load(function() {
					uiView.removeClass('__blocked');
					preloader.removeClass('__visible');

					animateItems.each(function(){
						var el = $(this);
						var effect = el.attr('data-preloader-animation');

						el.addClass('animated ' + effect);
					});
				});

				return preloader;
			}

			return false;
		},

		/**
		 * Ajax contact form.
		 *
		 * data-widget="contactForm" - From selector.
		 * data-ajax-response="contactForm" - Block for ajax response.
		 *
		 * P.S. All content in response block, replaced with the data from server.
		 *
		 * @requires plugin: js/jquery.validate
		 * @returns {(boolean|object)} - disabled | jquery.validate instance.
		 */
		contactForm: function() {
			var response = $('[data-ajax-response="contactForm"]');
			var responseAnimation = response.attr('data-ajax-animation');
			var form = $('[data-widget="contactForm"]');
			var submit = form.find('[type="submit"]');

			if($.fn.validate && form) {
				var validate = form.validate({
					errorClass: '__error',
					errorPlacement: function(error, element) {
						$(error).addClass('form-message')
								.insertAfter(element);
					},
					rules: {
						"name": 'required',
						"email": {
							email: true
						},
						"phone": {
                            required: true,
                            number: true
                        }
					},
                    messages: {
                        "name": 'Это поле обязательно для заполнения.',
                        "email": {
                            email: 'Пожалуйста введите правильный E-mail.'
                        },
                        "phone": {
                            required: 'Это поле обязательно для заполнения.',
                            number: 'Пожалуйста введите правильный номер телефона.'
                        }
                    },
					submitHandler: function() {
						$.ajax({
							url: form.attr('action'),
							type: 'POST',
							data: form.serialize(),
							beforeSend: function(){
								submit.attr('disabled', true)
									  .addClass('__loading');
							},
							success: function(data){
								submit.attr('disabled', false)
									.removeClass('__loading');

								if(responseAnimation) {
									response.addClass('animated ' + responseAnimation)
										.html(data);
								}
							},
							error: function(){
								alert('Error data loading!');
							}
						});
					}
				});

				return validate;
			}

			return false;
		},

		/**
		 * Smooth Scroll.
		 *
		 * data-smoothScroll-anchor="#home" - Smooth Scroll item selector.
		 *
		 * @returns {(boolean|array)} - disabled | Smooth Scroll items array.
		 */
		smoothScroll: function() {
			var anchors = $('[data-smoothScroll-anchor]');
			var offset = 69;

			if(anchors.length) {
				anchors.on('click', function() {
					var target = $(this).attr('data-smoothScroll-anchor');
					var pos = $(target).offset().top;

					$('html, body').animate({
						scrollTop: pos - offset
					}, 800);

					return false;
				});

				return anchors;
			}

			return false;
		},

		/**
		 * Appear.
		 * jQuery plugin to call a function when an element appears.
		 *
		 * data-appear-animation="animationName" - Appear animation, use "animate.css".
		 * data-appear-delay="0" - Appear animation delay.
		 *
		 * appear docs: https://github.com/bas2k/jquery.appear/
		 *
		 * @requires plugin: js/jquery.appear.js
		 * @returns {(boolean|object)} - disabled | appear DOM elements.
		 */
		appear: function() {
			var items = $('[data-appear-animation]');

			if($.fn.appear && items.length) {
				var appear = items.appear(function(){
					var el = $(this);
					var animation = el.data('appear-animation');
					var delay = el.data('appear-delay') || 0;

					if (delay) {
						setTimeout(function(){
							el.addClass( animation + " animated" );
						}, delay);
					}else {
						el.addClass( animation + " animated" );
					}
				},{accY: -150});

				return appear;
			}

			return false;
		},

        /**
         * Testimonials slider.
         * Widget for sliding clients testimonials.
         *
         * data-widget="testimonials" - Slider widget selector.
         *
         * owl.carousel docs: http://www.owlcarousel.owlgraphic.com/docs/started-welcome.html
         *
         * @requires plugin: js/owl.carousel.min.js
         * @returns {(boolean|object)} - disabled | owl.carousel object.
         */
        testimonials: function() {
            var slider = $('[data-widget="testimonials"]');

            if($.fn.owlCarousel && slider.length) {

                var sliderInstance = slider.owlCarousel({
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    items: 1,
                    nav: true,
                    mouseDrag: false,
                    touchDrag: false,
                    loop:true,
                    autoplay:true,
                    autoplayTimeout: 4000,
                    autoplayHoverPause:true
                });

                return sliderInstance;
            }

            return false;
        }
	});

});

