var photoDetail = (function () {
    function photoDetailRepositionListener() {
        var $container = $('#mainPage');
        $container.scroll(function () {
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
                    var id = $('div#photoDetail div#photoDetailImg img.photoDetailImg').attr('id');
                    //                    console.log(photoGeter.getPhoto(id));
                    //                    console.log(photoGeter.getPrevPhoto(id));
                    if (photoGeter.getPrevPhoto(id) != null) {
                        console.log(photoGeter.getPrevPhoto(id));
                        photoView.showDetailPhoto(photoGeter.getPrevPhoto(id));
                    } else {
                        console.log('First Photo');
                    }

                    //if EXIF is showing
                    //do something

                    console.log('prevPhoto');
                    break;
                case 'backToPhotoWall':
                    //remove photo detail
                    $('div#photopageContainer, div#photoDetail').removeClass('photoDetailShowing');
                    
                    //collapse exif container
                    $('div#exifInfoSection').removeClass('showing');
                    var exifContainer = $('div#exifInfoDetail');
                    exifContainer.empty();
                    console.log('backToPhotoWall');
                    break;
                case 'nextPhoto':
                    var id = $('div#photoDetail div#photoDetailImg img.photoDetailImg').attr('id');
                    //                    console.log(photoGeter.getPhoto(id));
                    //                    console.log(photoGeter.getNextPhoto(id));
                    if (photoGeter.getNextPhoto(id) != null) {
                        console.log(photoGeter.getNextPhoto(id));
                        photoView.showDetailPhoto(photoGeter.getNextPhoto(id));
                    } else {
                        console.log('Last Photo');
                    }

                    //if EXIF is showing
                    //do something

                    break;
            }
        })
    }

    return {
        clickListenerSetting: clickListenerSetting,
        photoDetailRepositionListener:photoDetailRepositionListener,
    }
}());
