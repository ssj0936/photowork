var photoView = (function () {
    var photoLongestLength = 320;

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
                height: height_n,
                width: width_n,
                
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

        for (let photoset of photosArr) {
            for (let photo of photoset.photos) {
                if (photo.ispublic != 1) continue;

                ++count;
                var view = photoViewConstruct(photo);
                $('#photopage').append(view);

                if (count >= firstLoadNum) break;
            }
            if (count >= firstLoadNum) break;
        }
        masonryfy();
        lazyloader.lazyloaderSetup($(window), $('#photopage'), function () {
            console.log('scrollToButton');
        });

    }

    return {
        photoViewConstruct: photoViewConstruct,
        photoPageConstruct: photoPageConstruct,
    }
}())