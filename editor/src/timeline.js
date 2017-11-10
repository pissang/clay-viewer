
function showTimeline() {
    document.getElementById('timeline').style.display = 'block';
}
function hideTimeline() {
    document.getElementById('timeline').style.display = 'none';
    stopAnimation();
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
    duration = Math.floor(_viewer.getAnimationDuration());
    duration > 0 ? (showTimeline()) : (hideTimeline());

    if (duration <= 0) {
        return;
    }
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
    var _oldIsPlay = null;
    if (!$('#timeline-progress input').data('ionRangeSlider')) {
        $('#timeline-progress input').ionRangeSlider({
            from_shadow: true,
            force_edges: true,
            onChange: function (data) {
                currentTime = data.from;
                viewer.setPose(currentTime);
                if (_oldIsPlay == null) {
                    _oldIsPlay = isPlay;
                }
                stopAnimation();
            },
            onFinish: function () {
                if (_oldIsPlay) {
                    startAnimation(_animationToken);
                }
                _oldIsPlay = null;
            }
        });
        $('#timeline-range input').ionRangeSlider({
            from_shadow: true,
            force_edges: true,
            type: 'double',
            drag_interval: true,
            grid: true,
            grid_num: 10,
            onChange: function (data) {
                duration = data.to - data.from;
                startTime = data.from;
                currentTime = Math.min(Math.max(data.from, currentTime), data.to);
                viewer.setPose(currentTime);
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
    if (isPlay) {
        return;
    }

    isPlay = true;

    var _time = Date.now();

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

        var dTime = Math.min(Date.now() - _time, 20);
        _time = Date.now();

        updateControlPosition();

        currentTime += dTime;
        if (currentTime > startTime + duration) {
            currentTime = startTime;
        }

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

function stopAnimation() {
    if (!isPlay) {
        return;
    }

    isPlay = false;
    
    var pauseBtn = document.getElementById('timeline-pause-resume');
    pauseBtn.classList.remove('icon-pause');
    pauseBtn.classList.add('icon-resume');
}

function setTimeRange(_startTime, _endTime) {
    startTime = _startTime;
    duration = _endTime - startTime;
}

export { updateAnimationUI, setTimeRange, hideTimeline, showTimeline };