;(function ($) {
    $.fn.throttle = function (params) {
        var element = $(this),
            timer = null,
            lastTime = null, startTime = null, timeDiff = null,
            init = false, now = null;
        
        params         = params || { };
        params.event   = params.event || 'click';
        params.timeout = params.timeout || 200;
        params.max     = params.max || 400;
        params.skip    = params.skip || 75;
            
        element.bind(params.event, function (event) {
            now       = new Date().getTime();
            startTime = startTime === null ? now : startTime;
            timeDiff  = now - startTime;
                
            if (now - lastTime < params.skip) {
                return ;
            }
            lastTime = now;
                
            if (init === false) {
                if (typeof params.init === "function") {
                    params.state = params.init(event, params.state) || params.state;
                }
                init = true;
            }
                
            if (typeof params.reset === "function") {
                params.state = params.reset(event, params.state) || params.state;
            }
                
            if (timer !== null && (params.max === 0 || timeDiff < params.max)) {
                clearTimeout(timer);
                if (typeof params.merge === "function") {
                    params.state = params.merge(event, params.state) || params.state;
                }
            }
                
            if (params.max === 0 || timeDiff < params.max) {
                timer = setTimeout(
                    function() { 
                        params.state = params.callback(event, params.state) || params.state;
                        timer     = null;
                        startTime = null;
                        init      = false;
                    },
                    params.timeout
                );
            }
        });
    };
})(jQuery);