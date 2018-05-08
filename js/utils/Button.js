/**
* @class Button
*
* @desc Initiate the additional functionality for the app.
*/

define(['Core', 'utils/util', 'utils/Events', 'utils/Elements', 'utils/Ajax'],
function (Core, Util, Events, Elements, Ajax) {

	'use strict';

	function Button (eventTarget, eventHandlers) {

			// This first guard ensures that the callee has invoked our Class' constructor function
			// with the `new` keyword - failure to do this will result in the `this` keyword referring
			// to the callee's scope (typically the window global) which will result in the following fields
			// (name and _age) leaking into the global namespace and not being set on this object.

			if (!(this instanceof Button)) {
					throw new TypeError("Button constructor cannot be called as a function.");
			}

      // Here we create a member property (field) for the Person's name; setting its value
      // what the one supplied to the Constructor.  Although we don't have to define
      // properties ahead of time (they can easily be added at runtime as all Object / functions
      // in JavaScript are dynamic) I believe it makes your code easier to follow if you list your
      // classes intentions up front (eg: in the Constructor function).
      this.eventTarget = eventTarget;

      // classes intentions up front (eg: in the Constructor function).
      this.eventHandlers = eventHandlers ;
	};

  Button.create = function ( eventTarget, eventHandlers ) {
    var result = new Button( eventTarget, eventHandlers );

		// set the callback functions
    result.setEventTargetHandler( result.eventTarget );
    result.setEventHandler( result.eventHandlers );

		// add the event listener to the target
    addEventListener(result);

    return result;
  }

  function addEventListener (button) {
		// add click event to the button target
    document.querySelector(button.eventTarget.node).addEventListener('click', function(e) {
			// Call the callbacks that we have already defined
			button.eventTargetHandler();
			button.eventHandler();
    })
  }

	Button.prototype = {

		constructor: Button,

    setEventTargetHandler: function ( eventTarget ) {
      console.log(eventTarget);
      // Ensure the value provided is an Array
      if ( Util.isObj( eventTarget ) === false  ) {
        throw new TypeError(typeof (eventTarget) + " is not an array.");
      }

      this.eventTargetHandler = function() {
        Events.toggleModifier( eventTarget.node, eventTarget.modifier );
      }

    },

		setEventHandler: function ( eventHandlers ) {
      // Ensure the value provided is an Array
      if ( Util.isObj( eventHandlers ) === false  ) {
        throw new TypeError(typeof (eventHandlers) + " is not an array.");
      }

      // set the eventHandler
      this.eventHandler = function() {
        Elements.each( eventHandlers, function( value, index ) {

					console.log(value);
					console.log(index);

          Events.toggleModifier( value.node, value.modifier );

        });
      }
		},

	};

	return Button;
});
