var photoDetail = (function () {

    var CURRENT_SCROLL_TOP = 0;

    function photoDetailRepositionListener() {
        var $container = $('#mainPage');
        $container.scroll(function () {
            //photo Detail Scrolling setting
            CURRENT_SCROLL_TOP = $container.scrollTop();

            //photo Detail Scrolling setting
            var currentScrollTop = $container.scrollTop();
            if ($('div#photoDetail.photoDetailShowing').length != 0)
                $('div#photoDetail.photoDetailShowing').css('top', currentScrollTop);
        });
    }

    function clickListenerSetting() {
        $('.photoDetailBtn').click(function () {
            switch (this.getAttribute('id')) {
                case 'prevPhoto':
                    var id = $('div#photoDetail div#photoDetailImg img.photoDetailImg').last().attr('id');

                    //                    console.log(photoGeter.getPhoto(id));
                    //                    console.log(photoGeter.getPrevPhoto(id));
                    if (photoGeter.getPrevPhoto(id) != null) {
                        $('div#photoDetail div#photoDetailImg img.photoDetailImg').addClass('photodetailSlideRight');
                        //                        console.log(photoGeter.getPrevPhoto(id));
                        if (photoGeter.getPrevPhoto(photoGeter.getPrevPhoto(id).id) != null)
                            photoView.imgPreload(photoGeter.getPrevPhoto(photoGeter.getPrevPhoto(id).id));
                        photoView.showDetailPhoto(photoGeter.getPrevPhoto(id));

                        if ($('div#exifInfoSection').hasClass('showing')) {
                            nav.exifDataViewShow();
                        }
                    } else {
                        console.log('First Photo');
                    }
                    console.log('prevPhoto');
                    break;
                case 'backToPhotoWall':
                    //remove photo
                    $('div#photoDetail div#photoDetailImg img.photoDetailImg').remove();

                    //remove photo detail
                    $('div#photopageContainer, div#photoDetail').removeClass('photoDetailShowing');

                    //collapse exif container
                    $('div#exifInfoSection').removeClass('showing');
                    var exifContainer = $('div#exifInfoDetail');
                    exifContainer.empty();
                    console.log('backToPhotoWall');
                    break;
                case 'nextPhoto':
                    var id = $('div#photoDetail div#photoDetailImg img.photoDetailImg').last().attr('id');
                    //                    console.log(photoGeter.getPhoto(id));
                    //                    console.log(photoGeter.getNextPhoto(id));
                    if (photoGeter.getNextPhoto(id) != null) {
                        $('div#photoDetail div#photoDetailImg img.photoDetailImg').addClass('photodetailSlideLeft');
                        //                        console.log(photoGeter.getNextPhoto(id));
                        if (photoGeter.getNextPhoto(photoGeter.getNextPhoto(id).id) != null)
                            photoView.imgPreload(photoGeter.getNextPhoto(photoGeter.getNextPhoto(id).id));

                        photoView.showDetailPhoto(photoGeter.getNextPhoto(id));

                        if ($('div#exifInfoSection').hasClass('showing')) {
                            nav.exifDataViewShow();
                        }
                    } else {
                        console.log('Last Photo');
                    }
                    break;
            }
        })
    }

    function getCurrentScrollTop() {
        return CURRENT_SCROLL_TOP;
    }

    return {
        clickListenerSetting: clickListenerSetting,
        photoDetailRepositionListener: photoDetailRepositionListener,
        getCurrentScrollTop: getCurrentScrollTop,
    }
}());
