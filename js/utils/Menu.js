/**
* @module Menu
*
* @desc Menu functionality
*/

define(function () {
    return {

				/**
				* @module menuEvents
				*
				* @desc events for show and hiding linked sub menu items
				*
				* @return null
				*/
        linkedMenuEvents: function () {
          // Event listener for the linked menu
          [].forEach.call(document.querySelectorAll('.nav--linked .menu-item-has-children'), function(el) {
              el.addEventListener('click', function(event) {
                  event.preventDefault();

                  // get children id
                  var target = event.currentTarget;
                  var navId = target.getAttribute('children-id');

                  // hide main nav
                  target.parentNode.classList.add('nav--hide');

                  // show children
                  document.getElementById(navId).classList.remove('nav--hide');
              });
          });

          // Event listener for the submenu nav--linked close button
          [].forEach.call(document.querySelectorAll('.nav--primary .nav__close'), function(el) {
              el.addEventListener('click',  function(event) {
                  event.preventDefault();

                  // hide children
                  var target = event.currentTarget;
                  target.parentNode.classList.add('.nav--hide');

                  // hide main nav
                  target.parentNode.classList.add('nav--hide');

                  // show parents
                  target.parentNode.parentNode.querySelector('.nav--linked').classList.remove('nav--hide');
              });
          });
        }

    }
});
