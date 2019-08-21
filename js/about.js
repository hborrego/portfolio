// 1. Set up for Passport animation

var passportAnimWindow = document.getElementById("passportAboutLottie"),
  passportAnimData = {
    container: passportAnimWindow,
    renderer: "html",
    loop: false,
    prerender: true,
    autoplay: false,
    path: "../json/passport/passport.json"
  };
var passportAnim = bodymovin.loadAnimation(passportAnimData);
passportAnim.addEventListener("DOMLoaded", onPassportDOMLoaded);

// 2. TimelineMax Passport animation

var hideAnim = function() {
    document.getElementById("passportAboutLottie").style.visibility = "hidden";
  }

var passportTL = new TimelineMax({onComplete:hideAnim}); // new TimelineMax

function onPassportDOMLoaded() {
  passportTL.to(
    {
      frame: 0
    },
    3,
    {
      frame: passportAnim.totalFrames - 1,
      onUpdate: function() {
        passportAnim.goToAndStop(Math.round(this.target.frame), true);
      }
    }
  );
}

var displayAnim = function() {
  document.getElementById("passportAboutLottie").style.visibility = "visible";
  passportTL.restart();
};

document
  .getElementById("example-animation")
  .addEventListener("click", displayAnim);
