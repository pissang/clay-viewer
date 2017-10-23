
function showTimeline() {
    document.getElementById('timeline').style.display = 'block';
}
function hideTimeline() {
    document.getElementById('timeline').style.display = 'none';
}
function setTimelinePercent(percent) {
    document.getElementById('timeline-control').style.left = percent * 100 + '%';
}

var isPlay = false;
var currentTime = 0;
var viewer;
var animationToken;
var listener;

function updateAnimationUI(_viewer) {
    viewer = _viewer;
    var duration = _viewer.getAnimationDuration();
    duration > 0 ? (showTimeline()) : (hideTimeline());

    var pauseBtn = document.getElementById('timeline-pause-resume');
    pauseBtn.removeEventListener('click', listener);
    pauseBtn.addEventListener('click', listener = function () {
        if (isPlay) {
            stopAnimation();
        }
        else {
            startAnimation(duration, _animationToken);
        }
    });

    // Reset time
    currentTime = 0;
    var _animationToken = Math.random();
    animationToken = _animationToken;
    
    if (duration > 0) {
        startAnimation(duration, _animationToken);
    } 
}

function updateControlPosition(percent) {
    var timelineProgressWidth = document.getElementById('timeline-progress').clientWidth;
    document.getElementById('timeline-control').style.left = Math.round(timelineProgressWidth * percent) + 'px';
}

function startAnimation(animationDuration, _animationToken) {

    isPlay = true;

    var time = Date.now();

    var pauseBtn = document.getElementById('timeline-pause-resume');
    pauseBtn.classList.remove('icon-resume');
    pauseBtn.classList.add('icon-pause');

    function update() {
        if (!isPlay) {
            return;
        }
        if (_animationToken !== animationToken) {
            return;
        }

        viewer.setPose(currentTime);
        updateControlPosition(currentTime / animationDuration);

        var dTime = Math.min(Date.now() - time, 20);
        time += dTime;
        currentTime = (currentTime + dTime) % animationDuration;

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

function stopAnimation() {
    isPlay = false;
    
    var pauseBtn = document.getElementById('timeline-pause-resume');
    pauseBtn.classList.remove('icon-pause');
    pauseBtn.classList.add('icon-resume');

}

export { updateAnimationUI };