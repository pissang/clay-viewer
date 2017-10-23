
function showTimeline() {
    document.getElementById('timeline').style.display = 'block';
}
function hideTimeline() {
    document.getElementById('timeline').style.display = 'none';
}

var isPlay = false;
var currentTime = 0;
var viewer;
var animationToken;
var pauseBtnClickListener;
var progressElClickListener;
var controlBtnMouseDownListener;


function updateAnimationUI(_viewer) {
    viewer = _viewer;
    var duration = _viewer.getAnimationDuration();
    duration > 0 ? (showTimeline()) : (hideTimeline());

    var pauseBtn = document.getElementById('timeline-pause-resume');
    var controlBtn = document.getElementById('timeline-control');
    var progressEl = document.getElementById('timeline-progress');
    var dragging = false;
    
    pauseBtn.removeEventListener('click', pauseBtnClickListener);
    pauseBtn.addEventListener('click', pauseBtnClickListener = function () {
        if (isPlay) {
            stopAnimation();
        }
        else {
            startAnimation(duration, _animationToken);
        }
    });
    progressEl.removeEventListener('click', progressElClickListener);
    progressEl.addEventListener('click', progressElClickListener = function (e) {
        if (dragging) {
            return;
        }
        var percent = e.offsetX / progressEl.clientWidth;
        currentTime = duration * percent;
        updateControlPosition(percent);
        if (!isPlay) {
            viewer.setPose(currentTime);
        }
    });
    controlBtn.removeEventListener('mousedown', controlBtnMouseDownListener);
    controlBtn.addEventListener('mousedown', controlBtnMouseDownListener = function (e) {
        var isPlaying = isPlay;
        var startX = e.clientX;
        var controlStartPosition = parseInt(controlBtn.style.left);
        dragging = true;

        stopAnimation();
        function drag(e) {
            var x = e.clientX;
            var pos = x - startX + controlStartPosition;
            var percent = Math.min(Math.max(pos / progressEl.clientWidth, 0), 1);
            updateControlPosition(percent);
            currentTime = duration * percent;
            viewer.setPose(currentTime);           
        }
        function stopDrag() {
            if (isPlaying) {
                startAnimation(duration, _animationToken);
            }
            document.body.removeEventListener('mouseup', stopDrag);
            document.body.removeEventListener('mousemove', drag);

            setTimeout(function () {
                dragging = false;
            });
        }

        document.body.addEventListener('mouseup', stopDrag);
        document.body.addEventListener('mousemove', drag);
    });


    // Reset time
    currentTime = 0;
    updateControlPosition(0);

    var _animationToken = Math.random();
    animationToken = _animationToken;
    
    if (duration > 0) {
        startAnimation(duration, _animationToken);
    }
    else {
        stopAnimation();
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