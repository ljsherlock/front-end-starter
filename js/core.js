/**
* @class Core
*
* @desc Initiate the core functionality for the app.
*/

define(['utils/util', 'utils/Device'], function (Util, Device) {

		// declaring strict mode
		"use strict";

		function Core () {
			if (!(this instanceof Core)) {
					throw new TypeError("Core constructor cannot be called as a function.");
			}
		}

		Core.prototype = {

			constructor: Core,

			start: function () {

					this.device = Device.detect();

			}

		};

		return Core;
});
