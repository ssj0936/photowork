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
            height = photometa.height,
            width = photometa.width,
            ispublic = photometa.ispublic,
            title = photometa.title,
            url = photoGeter.getPhotoUrl(photometa, 'Medium 640');

        //        let ratio = getPhotoLongestLength() / parseInt(width),
        //            height_n = height * ratio,
        //            width_n = width * ratio;

        var photoview = jQuery('<img/>', {
            class: 'photoBlockImg',
            src: url,
        })

        photoview.click(function () {
            $('div#photopageContainer, div#photoDetail ').toggleClass('hide');

            //empty first
            $('div#photoDetail div#photoDetailImg, div#photoDetail div#photoDetailMeta').empty();

            //append new content
            $('div#photoDetail div#photoDetailImg').append(
                    jQuery('<img/>', {
                        src: photoGeter.getPhotoUrl(photometa, 'Large')
                    })
                )
                .click(function () {
                    $('div#photopageContainer, div#photoDetail ').toggleClass('hide');
                });



            photoGeter.getExif(photometa, function (jsonObj) {
                //append new meta
                $('div#photoDetail div#photoDetailMeta').append(
                    jQuery('<div/>', {
                        class: 'photoDetailMeta'
                    })
                    .text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque placerat est non lobortis. Maecenas finibus felis non felis mollis placerat. Nam sagittis nulla mi, vel interdum sem rhoncus at. Vivamus porta eleifend rutrum. Nullam vel eros in lacus lobortis tincidunt pharetra at nibh. Morbi vel sodales dui. Curabitur molestie mattis felis, sit amet laoreet tellus ultricies nec. Praesent quis dui ac massa tempus aliquet. Maecenas egestas nulla non nisl dapibus, sed imperdiet neque tristique. Fusce hendrerit velit ac felis semper pharetra. Nunc pellentesque, magna id condimentum ornare, eros risus interdum nunc, at maximus mi dolor pulvinar nunc. Vestibulum vestibulum, quam et semper efficitur, diam felis maximus libero, non efficitur turpis nulla et justo. Proin dapibus vel sem a ullamcorper. Aenean lectus eros, sagittis vitae placerat eget, imperdiet et eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque placerat est non lobortis. Maecenas finibus felis non felis mollis placerat. Nam sagittis nulla mi, vel interdum sem rhoncus at. Vivamus porta eleifend rutrum. Nullam vel eros in lacus lobortis tincidunt pharetra at nibh. Morbi vel sodales dui. Curabitur molestie mattis felis, sit amet laoreet tellus ultricies nec. Praesent quis dui ac massa tempus aliquet. Maecenas egestas nulla non nisl dapibus, sed imperdiet neque tristique. Fusce hendrerit velit ac felis semper pharetra. Nunc pellentesque, magna id condimentum ornare, eros risus interdum nunc, at maximus mi dolor pulvinar nunc. Vestibulum vestibulum, quam et semper efficitur, diam felis maximus libero, non efficitur turpis nulla et justo. Proin dapibus vel sem a ullamcorper. Aenean lectus eros, sagittis vitae placerat eget, imperdiet et eratLorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque placerat est non lobortis. Maecenas finibus felis non felis mollis placerat. Nam sagittis nulla mi, vel interdum sem rhoncus at. Vivamus porta eleifend rutrum. Nullam vel eros in lacus lobortis tincidunt pharetra at nibh. Morbi vel sodales dui. Curabitur molestie mattis felis, sit amet laoreet tellus ultricies nec. Praesent quis dui ac massa tempus aliquet. Maecenas egestas nulla non nisl dapibus, sed imperdiet neque tristique. Fusce hendrerit velit ac felis semper pharetra. Nunc pellentesque, magna id condimentum ornare, eros risus interdum nunc, at maximus mi dolor pulvinar nunc. Vestibulum vestibulum, quam et semper efficitur, diam felis maximus libero, non efficitur turpis nulla et justo. Proin dapibus vel sem a ullamcorper. Aenean lectus eros, sagittis vitae placerat eget, imperdiet et erat.')
                    //                    .text(JSON.stringify(jsonObj))
                )
                //                console.log(jsonObj);
            })
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
