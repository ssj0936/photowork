var photoView = (function () {
    function onResize() {
        $(window).resize(function () {
            console.log(getPhotoLongestLength());

            $('.photoBlock').css({
                height: '' + ($(this).height * (getPhotoLongestLength() / $(this).width)) + 'px',
                width: '' + getPhotoLongestLength() + 'px',
            });
            setTimeout(function () {
                $('.masonryObject').masonry('layout');
            }, 2000);
        });
    }

    function getPhotoLongestLength() {
        var photoLongestLength = ($('div#divWorks').innerWidth() > 768) ? (($('div#divWorks').innerWidth()) / 4) :
            ($('div#divWorks').innerWidth() > 520) ? (($('div#divWorks').innerWidth()) / 2) :
            ($('div#divWorks').innerWidth());

        return photoLongestLength;
    }

    function photoViewConstruct(photometa) {
        var id = photometa.id,
            height = photometa.height,
            width = photometa.width,
            ispublic = photometa.ispublic,
            title = photometa.title,
            url = photoGeter.getPhotoUrl(photometa, 'Medium 640');

//        let ratio = getPhotoLongestLength() / parseInt(width),
//            height_n = height * ratio,
//            width_n = width * ratio;

        //        var photoview = jQuery('<div/>', {
        //                class: 'photoBlock'
        //            })
        //            .css({
        //                'background-image': 'url(' + url + ')',
        //                height: '' + height_n + 'px',
        //                width: '' + width_n + 'px',
        //                border: '3px solid transparent'
        //            })

        var photoview = jQuery('<img/>', {
                class: 'photoBlockImg',
                src: url,
            })
            .css({
                border: '3px solid transparent'
            })

        //        var photoview = jQuery('<img/>', {
        //                class: 'photoBlockImg',
        //                src: url,
        //            })
        //            .css({
        //                border: '3px solid transparent'
        //            })
        return photoview;
    }

    //    function masonryfy() {
    //        $('.masonryObject').each(function () {
    //            if (!$(this).first().hasClass('masonrySizer')) {
    //                jQuery('<div/>', {
    //                    class: 'masonrySizer'
    //                }).prependTo(this)
    //            }
    //
    //            if (!$(this).hasClass('masonryInited')) {
    //                var $masonry = $(this).masonry({
    //                    // options
    //                    itemSelector: '.photoBlockImg',
    //                    columnWidth: '.masonrySizer',
    //                    //            itemSelector: 'div.photoBlock',
    //                    //            columnWidth: getPhotoLongestLength(),
    //                    percentPosition: true,
    //                });
    //
    //                $masonry.imagesLoaded().progress(function () {
    //                    $masonry.masonry('layout');
    //                });
    //                
    //                $(this).addClass('masonryInited');
    //            }
    //        });
    //    }

    function masonryfy(target) {
        if (!$(target).first().hasClass('masonrySizer')) {
            jQuery('<div/>', {
                class: 'masonrySizer'
            }).prependTo(target)
        }

//        if (!$(target).hasClass('masonryInited')) {
            var $masonry = $(target).masonry({
                // options
                itemSelector: '.photoBlockImg',
                columnWidth: '.masonrySizer',
                //                itemSelector: 'div.photoBlock',
                //                columnWidth: getPhotoLongestLength(),
                percentPosition: true,
            });

            $masonry.imagesLoaded().always(function () {
                $masonry.masonry('layout');
            });

//            $(target).addClass('masonryInited');
//        }
    }

    function photoPageConstruct(photosArr) {
        let count = 0,
            firstLoadNum = lazyloader.getFirstBookmarkLoadCount();

        let needToBreak = false;
        for (let photoset of photosArr) {
            if (photoset.allLoaded) continue;

            var container = null;
            if ($('div.album').last().attr('data-title') != photoset.title) {
                var album = jQuery("<div/>", {
                        class: "album",
                        'data-title': photoset.title,
                    })
                    .append(
                        jQuery('<div/>', {
                            class: 'albumTitle'
                        })
                        .append(
                            jQuery('<h3/>').text(photoset.title)
                        )
                    )
                    .appendTo("div#photopageContainer");
                container = jQuery('<div/>', {
                    class: 'albumContent masonryObject',
                }).appendTo(album);

            } else {
                container = $('div.album .masonryObject').last();
            }
            container = $('div.album .masonryObject').last();

            for (let photo of photoset.photos) {
                if (photo.ispublic != 1) continue;
                if (photo.loaded) continue;
                if (needToBreak) break;

                ++count;
                var view = photoViewConstruct(photo);
                container.append(view);
                photo.loaded = true;

                if (count >= firstLoadNum)
                    needToBreak = true;
            }
            if (needToBreak) break;

            photoset.allLoaded = true;
        }
        $('.masonryObject').each(function () {
            masonryfy(this);
        })

        lazyloader.lazyloaderSetup(function () {
            lazyloaderAction();
            console.log('scrollToButton');
        });
    }

    function lazyloaderAction() {
        let count = 0,
            firstLoadNum = lazyloader.getBookmarkCountPerLoad();

        let needToBreak = false,
            photosArr = photoGeter.getPhoto();
        for (let photoset of photosArr) {
            if (photoset.allLoaded) continue;

            var container = null,
                masonryAppend = false;
            if ($('div.album').last().attr('data-title') != photoset.title) {
                var album = jQuery("<div/>", {
                        class: "album",
                        'data-title': photoset.title,
                    })
                    .append(
                        jQuery('<div/>', {
                            class: 'albumTitle'
                        })
                        .append(
                            jQuery('<h3/>').text(photoset.title)
                        )
                    )
                    .appendTo("div#photopageContainer");
                container = jQuery('<div/>', {
                    class: 'albumContent masonryObject',
                }).appendTo(album);

            } else {
                container = $('div.album .masonryObject').last();
                masonryAppend = true;
            }

            for (let photo of photoset.photos) {
                if (photo.ispublic != 1) continue;
                if (photo.loaded) continue;
                if (needToBreak) break;

                ++count;
                var view = photoViewConstruct(photo);

                if (masonryAppend) {
                    container.append(view).masonry('appended', view);
                } else {
                    container.append(view);
                }
                photo.loaded = true;

                if (count >= firstLoadNum)
                    needToBreak = true;
            }
            //            if (!masonryAppend)
            //                masonryfy();


            if (needToBreak) break;
            photoset.allLoaded = true;
        }
        $('.masonryObject').not('.masonryInited').each(function () {
            masonryfy(this);
        })
    }

    return {
        onResize: onResize,
        photoViewConstruct: photoViewConstruct,
        photoPageConstruct: photoPageConstruct,
        lazyloaderAction: lazyloaderAction,
    }
}())
