var lazyloader = (function () {
    var homepageBMNumFirstTime = 40,
        homepageBMNumPerload = 20;

    var LAST_SCROLL_TOP = 0;

    function lazyloaderSetup(container, content, callback) {
        container.scroll(function () {
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
            return (container.scrollTop() > LAST_SCROLL_TOP);
        }

        function isScrollToBottomTrigger() {
            console.log('scrollTop:'+container.scrollTop());
            console.log('height:'+container.height());
            return (container.scrollTop() + container.height() >= content.height())
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
