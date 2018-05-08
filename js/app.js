/**
* @class App
*
* @desc Initiate the additional functionality for the app.
*/

define(['Core', 'utils/util', 'utils/Device', 'utils/Events', 'utils/Elements', 'lib/scrollReveal', 'utils/Ajax', 'utils/Video', 'utils/Menu', 'utils/Button'],
function (Core, Util, Device, Events, Elements, scrollReveal, Ajax, Video, Menu, Button) {

	'use strict';

	function App () {

			// This first guard ensures that the callee has invoked our Class' constructor function
			// with the `new` keyword - failure to do this will result in the `this` keyword referring
			// to the callee's scope (typically the window global) which will result in the following fields
			// (name and _age) leaking into the global namespace and not being set on this object.

			if (!(this instanceof App)) {
					throw new TypeError("App constructor cannot be called as a function.");
			}

			this.html = document.querySelector('html');
			this.header = document.querySelector('header');
			this.main = document.querySelector('main');

			this.loadingScreen = document.querySelector('#loadingScreen');
			this.overlayLoading = document.querySelector('#overlayLoading');
			this.ajaxScreen = document.querySelector('#ajaxScreen');
			this.overlayAjax = document.querySelector('#overlayAjax');
			this.overlayMenu = document.querySelector('#overlayMenu');

			this.mainDirection = '';
			this.overlayAjaxDirection = '';
			this.ajaxScreenDirection = '';
	}


	function Events () {

			// should be able to make this into one call and place this code in the method
			Video.playPauseVideo('#project-video, .project-video');

			Ajax.getPosts();

			Menu.linkedMenuEvents();

			var eventTarget = { node: '.btn', modifier: 'btn--primary' };
			var eventHandlers = { 0 : { node: '.action', modifier: 'action--active' }, 1: { node: '.actions', modifier: 'actions--active' } };
			Button.create(eventTarget, eventHandlers);

	};

	App.prototype = {

		constructor: App,

		doAnimations: function () {
			if ( this.html !== null, this.main !== null, this.header !== null ) {
				this.html.classList.add('html--animation-loaded');
				this.main.classList.add('main--fade');
				this.header.classList.add('header--animation-loaded');
			}
		},

		start: function () {

			var theCore = new Core();
			theCore.start();

			setTimeout(this.doAnimations(), 250);

			Events();
		}

	};

	return App;
});
