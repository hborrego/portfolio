document.addEventListener("DOMContentLoaded", function() {
  // wait until window is loaded - meaning all images, stylesheets, js, fonts, media assets, and links
  window.addEventListener(
    "load",
    function() {
      document.body.style.display = "block";

      var tl = new TimelineMax();

      var tlh1 = function(){ 

        document.getElementById("hero-text").style.visibility = "visible";
        document.getElementById("drag-arrow").style.visibility = "visible";
        

        tl.staggerFrom(
        "h1",
        2,
        {
          opacity: 0,
          y: -40,
          ease: Power2.easeInOut
        },
        0.2
      );
        tl.staggerFrom(
        "#drag-arrow",
        2,
        {
          opacity: 0,
          y: -40,
          ease: Power2.easeInOut
        },
        0.2
      );
    }

    tlh1();

      var hideText = function() {
        document.getElementById("hero-text").style.visibility = "hidden";
        document.getElementById("drag-arrow").style.visibility = "hidden";
      };

      document.getElementById("hero").addEventListener("mousedown", hideText);
      document.getElementById("hero").addEventListener("click", hideText);
      document.getElementById("hero").addEventListener("scroll", hideText);
      document.getElementById("hero").addEventListener("touchstart", hideText);
      
      var inactivityTime = function() {
        var time;
        window.onload = resetTimer;
        // DOM Events
        document.onmousedown = resetTimer;
        document.ontouchstart = resetTimer;
        document.onclick = resetTimer; 
        document.onscroll = resetTimer;

        function showText() {
          var status = document.getElementById("hero-text").style.visibility;

          if (status == "hidden"){
          tlh1();
          // alert("You are now logged out.");
          //location.href = 'logout.html'
          }
        }

        function resetTimer() {
          clearTimeout(time);
          time = setTimeout(showText, 3000);
          // 1000 milliseconds = 1 second
        }
      };

      inactivityTime();

    },
    false
  );
});

var images = ["img/passport01.png"];
