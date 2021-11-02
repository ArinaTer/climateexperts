/**
 * Template Name: Nebbia
 * Description: Responsive Under Construction Template
 * Author: Infinity Motion
 * Template URL: http://www.infinity-motion.com/nebbia/
 * Author URL: http://themeforest.net/user/InfinityMotion
 * Version: 1.0
 */

/**
 * Website Application.
 *
 * @class
 */
var Application = new function() {

	/**
	 * Application object alias.
	 *
	 * @alias Application
	 */
	var app = this;

	/**
	 * Application widgets.
	 *
	 * @namespace
	 */
	this.widgets = {};

	/**
	 * Application mobile.
	 * Check is it mobile phone.
	 *
	 * @method
	 */
	this.isMobile = (function() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	})();

	/**
	 * Application init.
	 * Each and add widgets.
	 *
	 * @method
	 */
	this.init = function(widgets) {
		if(widgets) {
			$.each(widgets, function(key, value){
				app.widgets[key] = value.call(app);
			});
		}
	}
};


