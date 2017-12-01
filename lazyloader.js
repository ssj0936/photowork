var lazyloader = (function () {
    var homepageBMNumFirstTime = 40,
        homepageBMNumPerload = 20;

    var LAST_SCROLL_TOP = 0;

    function lazyloaderSetup(callback) {
        var $container = $(window),
            container = document.documentElement;
        $container.scroll(function () {
            if(!$('div#photopageContainer').is(':visible')) return;
            
            if (isDownScrolling()) {
                if (isScrollToBottomTrigger()) {
                    if (callback) {
                        callback();
                    }
                }
            }
            LAST_SCROLL_TOP = $(this).scrollTop();
            console.log(LAST_SCROLL_TOP);
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

    function getLastScrollTop() {
        return LAST_SCROLL_TOP;
    }

    return {
        lazyloaderSetup: lazyloaderSetup,
        getFirstBookmarkLoadCount: getFirstBookmarkLoadCount,
        getBookmarkCountPerLoad: getBookmarkCountPerLoad,
        getLastScrollTop: getLastScrollTop,
    }
}());
