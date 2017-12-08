var lazyloader = (function () {
    var homepageBMNumFirstTime = 40,
        homepageBMNumPerload = 20;

    var LAST_SCROLL_TOP = 0,
        CURRENT_SCROLL_TOP = 0;

    function lazyloaderSetup(callback) {
        var $container = $('#mainPage'),
            container = document.getElementById('mainPage');
        $container.scroll(function () {
            
            //photo Detail Scrolling setting
            CURRENT_SCROLL_TOP = $container.scrollTop();
//            if($('div#photoDetail.photoDetailShowing').length != 0)
//                $('div#photoDetail.photoDetailShowing').css('top',CURRENT_SCROLL_TOP);
            
            //lazyloader setting
            if (!$('div#photopageContainer').is(':visible')) return;

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

    function getLastScrollTop() {
        return LAST_SCROLL_TOP;
    }

    function getCurrentScrollTop() {
        return CURRENT_SCROLL_TOP;
    }

    return {
        lazyloaderSetup: lazyloaderSetup,
        getFirstBookmarkLoadCount: getFirstBookmarkLoadCount,
        getBookmarkCountPerLoad: getBookmarkCountPerLoad,
        getLastScrollTop: getLastScrollTop,
        getCurrentScrollTop: getCurrentScrollTop,
    }
}());
