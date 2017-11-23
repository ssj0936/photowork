var photoView = (function () {
    var photoLongestLength = 240;

    function photoViewConstruct(photometa) {
        var id = photometa.id,
            height = photometa.height,
            width = photometa.width,
            ispublic = photometa.ispublic,
            title = photometa.title,
            url = photometa.url;

        let ratio = photoLongestLength / parseInt(width),
            height_n = height * ratio,
            width_n = width * ratio;

        var photoview = jQuery('<div/>', {
                class: 'photoBlock'
            })
            .css({
                'background-image': 'url(' + url + ')',
                height: '' + height_n + 'px',
                width: '' + width_n + 'px',
                border: '3px solid transparent'
            })
        return photoview;
    }

    function masonryfy() {
        $('.masonryObject').masonry({
            // options
            itemSelector: 'div.photoBlock',
            columnWidth: photoLongestLength,
            //                percentPosition: true,
        })
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
        masonryfy();
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
            if (!masonryAppend)
                masonryfy();

            if (needToBreak) break;
            photoset.allLoaded = true;
        }
    }

    return {
        photoViewConstruct: photoViewConstruct,
        photoPageConstruct: photoPageConstruct,
        lazyloaderAction: lazyloaderAction,
    }
}())
