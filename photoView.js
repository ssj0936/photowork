var photoView = (function () {
    var ALL_PHOTO_IS_LOADED = false,
        isPhototLoading = false;

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
            ispublic = photometa.ispublic,
            title = photometa.title,
            url = photoGeter.getPhotoUrl(photometa, 'Medium 640');

        var photoview = jQuery('<img/>', {
            class: 'photoBlockImg loading',
            src: url,
            'data-id': id,
        })

        photoview.click(function () {
            if (isModile()) return;

            //image preload
            var metaArr = [photoGeter.getPrevPhoto(photometa.id), photoGeter.getNextPhoto(photometa.id)];
            imgPreload(metaArr);
            showDetailPhoto(photometa);
        })
        return photoview;
    }

    function imgPreload(metaArr) {
        if (Array.isArray(metaArr)) {
            for (var i in metaArr) {
                metaArr[i] = photoGeter.getPhotoUrl(metaArr[i], "Large");
            }
            console.log(metaArr);
            $.preload(metaArr);
        } else {
            $.preload(photoGeter.getPhotoUrl(metaArr, "Large"));
        }
    }

    function showDetailPhoto(photometa) {
        //cache data
        localStorage['photometa'] = JSON.stringify(photometa);

        //            var isLandScape = $(this).width() > $(this).height();
        $('div#photopageContainer, div#photoDetail').addClass('photoDetailShowing');

        //append new content
        let imgContainer = $('div#photoDetail div#photoDetailImg');

        let $image = jQuery('<img/>', {
                class: 'photoDetailImg loading'
            })
            .attr('src', photoGeter.getPhotoUrl(photometa, "Large"))
            .attr('id', photometa.id)
            .appendTo(imgContainer)
            .on("animationend", function () {
                var img = this;
                $(img).css({
                    height: 0,
                    width: 0,
                })
                window.setTimeout(function () {
                    $(img).remove();
                }, 2000);
            })


        imgContainer.append(createLoadingAnimation());
        $image.imagesLoaded()
            .always(function () {
                imgContainer.children('img.photoDetailImg').removeClass('loading');
                imgContainer.children('.sk-fading-circle').remove();
            });

        $('div#photoDetail').css('top', photoDetail.getCurrentScrollTop());
    }

    function masonryfy(target, lastone) {
        if ($(target).children('div.masonrySizer').length == 0) {
            jQuery('<div/>', {
                class: 'masonrySizer'
            }).prependTo(target)
        }

        var $masonry = $(target).masonry({
            // options
            itemSelector: '.photoBlockImg',
            columnWidth: '.masonrySizer',
            percentPosition: true,
        });

        $masonry.imagesLoaded().always(function () {
            $(target).children('img.photoBlockImg.loading').removeClass('loading');
            if (lastone){
                $('.spinner').addClass('fading');
                isPhototLoading = false;
            }
            $masonry.masonry('layout');
        });
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
                    //                    .prependTo("div#photopageContainer .spinner");
                    .appendTo("div#photopageContainer div.photopageContainer");
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
            container.addClass('allLoaded');
        }
        $('.masonryObject').each(function () {
            masonryfy(this);
        })

        lazyloader.lazyloaderSetup(function () {
            if(isPhototLoading) return;
            
            isPhototLoading = true;
            
            lazyloaderAction();
            console.log('scrollToButton');
        });
    }

    function lazyloaderAction() {
        if (ALL_PHOTO_IS_LOADED) return;
        $('.spinner').removeClass('fading');
        let count = 0,
            firstLoadNum = lazyloader.getBookmarkCountPerLoad();

        let needToBreak = false,
            photosArr = photoGeter.getPhotos();
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
                    .appendTo("div#photopageContainer div.photopageContainer");
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
            container.addClass('allLoaded');
        }

        if (count == 0)
            ALL_PHOTO_IS_LOADED = true;
        $('.masonryObject').each(function (index) {
            var lastone = (index == $('.masonryObject').length - 1);
            masonryfy(this, lastone);
        })
    }

    return {
        onResize: onResize,
        photoViewConstruct: photoViewConstruct,
        photoPageConstruct: photoPageConstruct,
        lazyloaderAction: lazyloaderAction,
        showDetailPhoto: showDetailPhoto,
        imgPreload: imgPreload,
    }
}())
