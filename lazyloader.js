var lazyloader = (function () {
    var homepageBMNumFirstTime = 40,
        homepageBMNumPerload = 20;

    var LAST_SCROLL_TOP = 0;

    function lazyloaderSetup(callback) {
        var $container = $(window),
            container = document.documentElement;
        $container.scroll(function () {
            if (isDownScrolling()) {
                if (isScrollToBottomTrigger()) {
                    if (callback) {
                        callback();
                    }
                }
            }
            LAST_SCROLL_TOP = $(this).scrollTop();
        });

        function isDownScrolling() {
            return ($container.scrollTop() > LAST_SCROLL_TOP);
        }

        function isScrollToBottomTrigger() {
            return ($container.scrollTop() + $container.height() >= container.scrollHeight)
        }
    }

    function getFirstBookmarkLoadCount() {
        return homepageBMNumFirstTime;
    }

    function getBookmarkCountPerLoad() {
        return homepageBMNumPerload;
    }

    return {
        lazyloaderSetup: lazyloaderSetup,
        getFirstBookmarkLoadCount: getFirstBookmarkLoadCount,
        getBookmarkCountPerLoad: getBookmarkCountPerLoad,
    }
}());
