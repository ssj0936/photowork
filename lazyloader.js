var lazyloader = (function () {
    var homepageBMNumFirstTime = 40,
        homepageBMNumPerload = 20;

    var LAST_SCROLL_TOP = 0;

    function lazyloaderSetup(callback) {
        var $container = $('#mainPage'),
            container = document.getElementById('mainPage');
        //        $container.scroll(function () {
        //            _onScroll(container,callback)
        //        });

        //for desktop scrolling
        $container
            .on('scroll', function () {
                _onScroll(callback);
            });

        //for mobile draging
        $(document.body).on('touchmove', function (event) {
            _onScroll(callback);
        });
    }

    function _onScroll(callback) {
        if (!$('div#photopageContainer').is(':visible')) return;

        var container = (isModile()) ? (document.body) : document.getElementById('mainPage'),
            $container = (isModile()) ? $(window) : $('#mainPage');


        if (isDownScrolling()) {
            if (isScrollToBottomTrigger()) {
                if (callback) {
                    callback();
                }
            }
        }
        LAST_SCROLL_TOP = $container.scrollTop();

        function isDownScrolling() {
            return ($container.scrollTop() > LAST_SCROLL_TOP);
        }

        function isScrollToBottomTrigger() {
//            console.log($container.scrollTop());
//            console.log($container.height());
//            console.log(container.scrollHeight);
//            console.log('-------------------------------');
            return (($container.scrollTop() + $container.height()) >= (container.scrollHeight * 0.95))
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
