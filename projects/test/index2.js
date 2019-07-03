var animData = {
    wrapper: document.getElementById('bodymovin'),
    animType: 'svg',
    loop: false,
    prerender: true,
    autoplay: false,
    path: 'data.json'
};
var anim = bodymovin.loadAnimation(animData),
    container = document.getElementById('bodymovin');
    contentid = document.getElementById('contentid');

animLoaded();

function animLoaded() {
    if (!anim.isLoaded) {
        setTimeout("animLoaded();", 1000);
        return;
    } else {
        attachScroll(anim, contentid, 50);
    }
}
function attachScroll(anim, contentid, speed) {
    var val = 0,
       totalDuration = anim.totalFrames/anim.frameRate*1000;

    if (contentid.addEventListener) {
        contentid.addEventListener("mousewheel", MouseWheelHandler, false);
        contentid.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    }else{
        contentid.attachEvent("onmousewheel", MouseWheelHandler);
    }

    function MouseWheelHandler(e) {
        var e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if (delta < 0) {
            if (val < totalDuration) {
                val += (Math.abs(delta))*speed;
            }
        }else {
            if (val > 0) {
                val -= (Math.abs(delta))*speed;
            }
        }

        bodymovin.goToAndStop(val);
    }
}