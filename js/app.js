/**
* @class App
*
* @desc Initiate the additional functionality for the app.
*/


define(['Core', 'utils/util', 'utils/Device', 'utils/Events', 'utils/Elements', 'lib/scrollReveal', 'utils/Ajax', 'utils/Video', 'utils/Menu'],
function (Core, Util, Device, Events, Elements, scrollReveal, Ajax, Video, Menu) {

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

	/**
	* @method toggleOverlappingElements
	*
	* @param {NodeList} onTopNodeList (Query Selector)
	* @param {NodeList} belowNodeList (Query Selector)
	*/
	// change the colour of the hamburger and logo when it overlaps the green blocks.
	// window.addEventListener('scroll', function () {
	// 		toggleOverlappingElements(this,
	// 			document.querySelectorAll('.symbol--icon-logo, .hamburger .hamburger__layer'),
	// 			document.querySelectorAll('.block--green, article.type-work, article.type-staff, .btn--f3')
	// 		);
	// });
	function toggleOverlappingElements (App, onTopNodeList, belowNodeList) {
			Elements.forEach(onTopNodeList, function (index, value) {
					Elements.forEach(belowNodeList, function (indexI, valueI) {
						var belowRect = valueI.getBoundingClientRect(),
							onTopRect = value.getBoundingClientRect();

						// Check it if the elments on top are overlapping the element below.
						if (belowRect.top <= onTopRect.top + onTopRect.height && belowRect.top + belowRect.height > onTopRect.top) {
									value.classList.add('element--overlap');
									valueI.classList.add('element--overlaped-' + index);
						} else {
							if (valueI.classList.contains('element--overlaped-' + index)) {
											valueI.classList.remove('element--overlaped-' + index);
											value.classList.remove('element--overlap');
							}
							return false;
						}
					}, value);
			}, belowNodeList);
	};

	function hamburger (el, force) {
		var m = 'hamburger--active';

		if (el.classList.contains(m) || force == 'remove') {
				el.classList.remove(m);
				document.body.style.overflow = 'auto';
		} else {
				el.classList.add(m);
				document.body.style.overflow = 'hidden';
		}
	};

	function toggleMobileMenu (menuSelector) {
      [].forEach.call(document.querySelectorAll(menuSelector), function(el) {
          var m = 'nav--mobile';
          if (el.length !== 0) {
              if (el.classList.contains(m)) {
                          el.classList.remove(m);
              } else {
                          el.classList.add(m);
              }
          }
      });
	};

	function Events () {

			// should be able to make this into one call and place this code in the method
			Video.playPauseVideo('#project-video, .project-video');

			Ajax.getPosts();

			Menu.linkedMenuEvents();

			var hamburgerNode = document.querySelector('#hamburger');

			if ( hamburgerNode !== null ) {
				hamburgerNode.addEventListener('click', function(e) {

					// toggle hamburger icon
					hamburger(e.currentTarget);

					// Toggle mobile menu.
					toggleMobileMenu('.nav--primary');

					// Toggle header
					var header = document.querySelector('header');
					var headerModifier = 'header--fade-in';
					if (header.classList.contains(headerModifier)) {
							header.classList.remove(headerModifier);
							header.querySelector('.symbol--icon-logo').classList.remove('icon--negative');
					} else {
							header.classList.add(headerModifier);
							header.querySelector('.symbol--icon-logo').classList.add('icon--negative');
					}
				});
			}

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


// function ajaxLinks () {
//
// 	require(['utils/Ajax'], function (Ajax) {
//
// 		Ajax.internalLinkBefore = function () {
//
// 				//variable
// 				var hamburger = document.querySelector('.hamburger');
//
// 				// this assumes that mobile menu is used for all devices
// 				// close menu and toggle the hamburger state
// 				if (hamburger.classList.contains('hamburger--active')) {
// 						this.hamburger(hamburger);
// 						this.toggleMobileMenu('.nav--primary');
// 						var header = document.querySelector('header');
// 						var headerModifier = 'header--fade-in';
// 						if (header.classList.contains(headerModifier)) {
// 								header.classList.remove(headerModifier);
// 						} else {
// 								header.classList.add(headerModifier);
// 						}
// 				}
//
// 				ajaxLinks();
//
// 				this.toggleAjaxLoadingScreen();
// 	 };
//
// 		Ajax.getPageCallback = function (response) {
// 			var main = document.querySelector('main');
// 			main.innerHTML = response;
// 			window.scroll(0, 0);
// 			Ajax.internalLinks();
//
// 			setTimeout(function() {
// 					// Finish Loading animation
// 					this.toggleAjaxLoadingScreen();
//
// 					// Ajax Main
// 					this.main.classList.add('main--ajax');
// 					this.main.classList.remove('main--fade');
// 					// void this.main.offsetWidth;
// 					this.main.classList.add('main--fade');
// 			}, 750);
// 		};
//
// 			window.onpopstate = function (event) {
// 					Ajax.getPage(document.location);
// 			};
//
// 			Ajax.internalLinks();
// 	});
// };
