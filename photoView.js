var photoView = (function () {
    function onResize() {
        $(window).resize(function () {
            console.log(getPhotoLongestLength());
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
            //            height = photometa.height,
            //            width = photometa.width,
            ispublic = photometa.ispublic,
            title = photometa.title,
            url = photoGeter.getPhotoUrl(photometa, 'Medium 640');

        //        let ratio = getPhotoLongestLength() / parseInt(width),
        //            height_n = height * ratio,
        //            width_n = width * ratio;

        var photoview = jQuery('<img/>', {
            class: 'photoBlockImg loading',
            src: url,
        })

        photoview.click(function () {
            if (isModile()) return;

            //cache data
            localStorage['photometa'] = JSON.stringify(photometa);

            var isLandScape = $(this).width() > $(this).height();
            //            console.log(isLandScape);
            //            $('div#photopageContainer').fadeOut();
            //            $('div#photoDetail').show();
            $('div#photopageContainer, div#photoDetail').addClass('photoDetailShowing');

            //empty first
            $('div#photoDetail div#photoDetailImg, div#photoDetail div#photoDetailMeta').off().empty();

            //append new content
            let imgContainer = $('div#photoDetail div#photoDetailImg');

            $('div#photoDetailImg').append(createLoadingAnimation());
            imgContainer.append(
                jQuery('<img/>', {
                    class: 'photoDetailImg loading',
                    src: photometa.url_o,
                })
            );

            imgContainer.imagesLoaded()
                .always(function () {
                    console.log('img load finish');
                    imgContainer.children('img.photoDetailImg').removeClass('loading');
                    imgContainer.children('.sk-fading-circle').remove();
                });


            //            //---------------------------------------
            //            //empty first
            //            $('div#photoDetailModal .modal-body').empty();
            //
            //            //append new content
            //            $('div#photoDetailModal .modal-body').append(
            //                jQuery('<img/>', {
            //                    class: 'photoDetailImg',
            //                    src: photometa.url_o,
            //                })
            //            );
            //
            //            $('#photoDetailModal')
            //                .modal('show');
            //---------------------------------------
        })
        return photoview;
    }

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
            percentPosition: true,
        });

        $masonry.imagesLoaded().always(function () {
            $masonry.masonry('layout');
            $('img.photoBlockImg.loading').removeClass('loading');
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
