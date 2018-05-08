/**
* @module Evemts
*
* @desc Event related methods
*/

define(['utils/util'], function( Util ) {

    var Events = {

				/**
				* @method actionAfterTyping
				*
				* @desc Add an event listener with a Timeout, to do something after
				* typing has finished (IE not just on keyup)
				*
				* @param elem (node)
				* @param callback (Function)
				*
				* @return elem (node)
				*/
        actionAfterTyping: function (el, callback) {
            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1500;  //time in ms, 5 second for example

            //on keyup, start the countdown
            Util.addEventHandler(el, 'keyup', function()
            {
                clearTimeout(typingTimer);

                typingTimer = setTimeout(function()
                {
                    Events.actionAfterTypingCallback( function()
                    {
                        callback();
                    });
                }, doneTypingInterval );
            });

            return typingTimer;

            //on keydown, clear the countdown
            Util.addEventHandler(el, 'keydown', function() {
              clearTimeout(typingTimer);
            });
        },

				/**
				* @method actionAfterTypingCallback
				*
				* @desc Call the callback
				*
				* @param callback (Function)
				*
				*/
				actionAfterTypingCallback: function (callback) {
		      callback();
		    },

				/**
				* @desc Not sure if is being used and if necessary
				*/
        bindOneNeedsPrefixes : {
            animationend: true
        		// can add others as needed
        },

        bindOneprefixes : ["webkit", "moz", "ms", "o"],

        bindOne: function (el, evtTypes, callback, captures) {
            var allEvents = evtTypes.trim().split(/\s+/)

            allEvents.forEach(function(evtType) {
                var doPrefixes = Events.bindOneNeedsPrefixes[evtType.toLowerCase()]

                if (doPrefixes) {
                    Events.bindOneprefixes.forEach(function(prefix) {
                        el.addEventListener(prefix + evtType, boundFn, captures)
                    })
                }

                el.addEventListener(evtType, boundFn, captures)

                function boundFn() {
                    if (doPrefixes) {
                        Events.bindOneprefixes.forEach(function(prefix) {
                            this.removeEventListener(prefix + evtType, boundFn, captures)
                        }, this)
                    }

                        this.removeEventListener(evtType, boundFn, captures)

                    callback.call(this, event)
                }
            })
        },

				/**
				* @method delegate
				*
				* @desc Add event listener for dynamically added nodes
				*
				* @param el (node)
				* @param evt (String) Event type
				* @param sel (String) Selector
				* @param handler (Function) callback
				*/
				delegate : function (el, evt, sel, handler) {
						el.addEventListener(evt, function (event) {
								var t = event.target;
								while (t && t !== this) {
										if (typeof t.matches === 'function') {
												if (t.matches(sel)) {
														handler.call(t, event);
												}
										} else {
												if (t.matchesSelector(sel)) {
														handler.call(t, event);
												}
										}

										t = t.parentNode;
								}
						});
				},

				/**
				* @method domReady
				*
				* @desc In case DOMContentLoaded was already fired, the document
				* readyState will be one of "complete" or "interactive" or (nonstandard)
				* "loaded". The regexp above looks for all three states. A more readable
				* regexp would be /complete|interactive|loaded/. In case DOMContentLoaded
				* was not yet fired, use it to run the "start" function when document
				* is read for it.

				* @param callback (Function) callback
				*/
				domReady: function (callback) {
						if (/comp|inter|loaded/.test(document.readyState)) {
								callback();
						} else {
								document.addEventListener('DOMContentLoaded', function () {
										callback();
								}, false);
						}
				},


				/**
				* @method preventForm
				*
				* @desc Prevent the form from it's default behaviour (submit)

				* @param el (node) callback
				*/
				preventForm : function(el) {
						el.addEventListener("submit", function (e) {
								e.preventDefault();
						});
				},

				addLoadEvent: function (func) {
						var oldonload = window.onload;
						if (typeof window.onload != 'function') {
								window.onload = func;
						} else {
						window.onload = function() {
								if (oldonload) {
										oldonload();
								}
										func();
								}
						}
				},

				addEventHandler: function (elem, eventType, handler) {
						if (elem.addEventListener)
								elem.addEventListener (eventType, handler, false);
						else if (elem.attachEvent)
								elem.attachEvent ('on' + eventType, handler);
				},

				/**
				* @method onChange
				*
				* @desc callback for 'change' event

				* This does not have to be specific to change, just pass the required event.

				* @param el (node) callback
				*/
				onChange: function (el) {
						Util.addEventHandler(el, 'change', function () {
								callback();
						});
				},

        /**
        * @method toggleOverlappingElements
        *
        * @param {NodeList} onTopNodeList (Query Selector)
        * @param {NodeList} belowNodeList (Query Selector)
        *
        * @example useage
        * change the colour of the hamburger and logo when it overlaps the green blocks.
        * window.addEventListener('scroll', function () {
        * 		toggleOverlappingElements(this,
        * 			document.querySelectorAll('.symbol--icon-logo, .hamburger .hamburger__layer'),
        * 			document.querySelectorAll('.block--green, article.type-work, article.type-staff, .btn--f3')
        * 		);
        * });
        */
       toggleOverlappingElements: function (App, onTopNodeList, belowNodeList) {
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
        },

        /**
        * @method toggleModifier
        *
        * @param {Node} el (Element to target)
        * @param {String} modifier (Modifier class to toggle)
        */
        toggleModifier: function (el, modifier) {
          var el = document.querySelector(el);
          if (el.classList.contains(modifier)) {
              el.classList.remove(modifier);
          } else {
              el.classList.add(modifier);
          }
        }
    };

    return Events;
});
