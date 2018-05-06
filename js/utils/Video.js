define(['utils/Elements'], function ( Elements ) {

  return {

    /**
    * @method playPauseVideo
    * @param querySelector (String)
    * @return true/false (Boolean)
    */
    playPauseVideo: function ( querySelector ) {

      // Only continue if querySelector is defined.
      if ( querySelector !== '' ) {

        // Loop through nodes
        Elements.forEach(document.querySelectorAll( querySelector ), function( index, el ) {

          // Variables
          var videoElement = el.querySelector("video"),
          videoButton = el.querySelector(".video__playpause");

          // Play or pause the video.
          videoElement && videoButton && (videoElement.removeAttribute("controls"), videoButton.addEventListener("click", function() {
              videoElement.paused ? (videoElement.play(),
              videoButton.classList.add("video__playpause--playing")) : (videoElement.pause(),
              videoButton.classList.remove("video__playpause--playing"))
          }, !1))
        });

        return true;
      }

      return false;

    }

  }

});
