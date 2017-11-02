
function showTimeline() {
    document.getElementById('timeline').style.display = 'block';
}
function hideTimeline() {
    document.getElementById('timeline').style.display = 'none';
}

var isPlay = false;
var currentTime = 0;
var startTime = 0;
var duration;

var viewer;
var animationToken;
var pauseBtnClickListener;


function updateAnimationUI(_viewer) {
    viewer = _viewer;
    duration = _viewer.getAnimationDuration();
    duration > 0 ? (showTimeline()) : (hideTimeline());

    var pauseBtn = document.getElementById('timeline-pause-resume');
    
    pauseBtn.removeEventListener('click', pauseBtnClickListener);
    pauseBtn.addEventListener('click', pauseBtnClickListener = function () {
        if (isPlay) {
            stopAnimation();
        }
        else {
            startAnimation(_animationToken);
        }
    });


    // Reset time
    startTime = 0;
    currentTime = 0;

    updateControlPosition();

    var _animationToken = Math.random();
    animationToken = _animationToken;
    
    if (duration > 0) {
        startAnimation(_animationToken);
    }
    else {
        stopAnimation();
    }
    if (!$('#timeline-progress input').data('ionRangeSlider')) {
        $('#timeline-progress input').ionRangeSlider({
            from_shadow: true,
            force_edges: true,
            grid: true,
            grid_num: 10,
            onChange: function (data) {
                currentTime = data.from;
                viewer.setPose(currentTime);
            }
        });
        $('#timeline-range input').ionRangeSlider({
            from_shadow: true,
            force_edges: true,
            type: 'double',
            onChange: function (data) {
                duration = data.to - data.from;
                startTime = data.from;
                progressSlider.update({
                    from_min: data.from,
                    from_max: data.to
                });
            }
        });

        var progressSlider = $('#timeline-progress input').data('ionRangeSlider');
        var rangeSlider = $('#timeline-range input').data('ionRangeSlider');
        progressSlider.update({
            min: 0,
            max: duration,
            from: currentTime,
            from_min: 0,
            from_max: duration
        });
        rangeSlider.update({
            min: 0,
            max: duration,
            from: 0,
            to: duration
        });
    }
}

function updateControlPosition() {
    var slider = $('#timeline-progress input').data('ionRangeSlider');
    if (slider) {
        slider.update({
            from: currentTime
        });
    }
}

function startAnimation(_animationToken) {

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
        updateControlPosition();

        var dTime = Math.min(Date.now() - time, 20);
        time += dTime;

        currentTime += dTime;
        if (currentTime > startTime + duration) {
            currentTime = startTime;
        }

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

function setTimeRange(_startTime, _endTime) {
    startTime = _startTime;
    duration = _endTime - startTime;
}

export { updateAnimationUI, setTimeRange };