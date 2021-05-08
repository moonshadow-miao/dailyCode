// js 精度问题


// requestAnimationFrame 优雅降级
if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

(function() {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() { callback(lastTime = nextTime); },
            nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
}());
