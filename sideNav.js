var nav = (function () {
    var EXIF_ATTR_CREATOR_TOO = 'CreatorTool',
        EXIF_ATTR_EXPOSURE_TIME = 'ExposureTime',
        EXIF_ATTR_FNUMBER = 'FNumber',
        EXIF_ATTR_FLASH = 'Flash',
        EXIF_ATTR_FOCAL_LENGTH = 'FocalLength',
        EXIF_ATTR_ISO = 'ISO',
        EXIF_ATTR_CAMERA = 'camera';

    var exifAttr = ['camera' /*, 'CreatorTool'*/ , 'ExposureTime', 'FNumber', 'Flash', 'FocalLength', 'ISO'],
        exifAttrDisplayName = ['Camera' /*, 'CreatorTool'*/ , 'ExposureTime', 'FNumber', 'Flash', 'FocalLength', 'ISO'];

    function sideNavSetting() {
        $('div.sideNavOption').click(function () {
            console.log('click');
            let target = $('#' + $(this).attr('data-target'));

            if (target.hasClass('clicking')) return;

            $('div.sideNavItem').removeClass('clicking').hide();
            target.addClass('clicking').fadeIn(300);

            $('div.sideNavOption').removeClass("selected")
            $(this).addClass("selected");
        })
    }

    function infoButtonSetting() {
        $('span.functionbtn,img.functionbtn').click(function () {
            switch ($(this).attr('id')) {
                case 'btnBackToPhotoWall':
                    //remove photo detail
                    $('div#photopageContainer, div#photoDetail').removeClass('photoDetailShowing');

                    //collapse exif container
                    $('div#exifInfoSection').removeClass('showing');
                    var exifContainer = $('div#exifInfoDetail');
                    exifContainer.empty();

                    console.log('btnBackToPhotoWall');
                    break;
                case 'btnShowExif':
                    exifDataViewShow();

                    //expend exif container
                    $('div#exifInfoSection').addClass('showing');
                    console.log('btnShowExif');
                    break;
                case 'btnDownload':
                    var a = document.createElement('a');
                    var url = $('img.photoDetailImg').attr('src');
                    var filename = 'what-you-want.jpg';
                    a.href = url;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(url);
                    console.log('btnDownload');
                    break;

                case 'btnCloseExifInfo':
                    //remove photo detail
                    $('div#photopageContainer, div#photoDetail').removeClass('photoDetailShowing');

                    //collapse exif container
                    $('div#exifInfoSection').removeClass('showing');
                    var exifContainer = $('div#exifInfoDetail');
                    exifContainer.empty();
                    console.log('btnCloseExifInfo');
                    break;

                case 'btnbackPhotoDetail':
                    //collapse exif container
                    $('div#exifInfoSection').removeClass('showing');
                    var exifContainer = $('div#exifInfoDetail');
                    exifContainer.empty();
                    console.log('btnbackPhotoDetail');
                    break;
            }
        })
    }

    function exifDataViewShow() {
        var photometa = JSON.parse(localStorage['photometa']);

        var exifContainer = $('div#exifInfoDetail');
        exifContainer.empty();

        photoGeter.getExif(photometa, function (exif) {
            console.log(exif);
            exifDataViewConstruct(exif);
        });
    }

    function exifDataViewConstruct(exif) {
        var exifContainer = $('div#exifInfoDetail');
        exifContainer.hide();
        for (let index in exifAttr) {
            let data = exif[exifAttr[index]],
                displayName = exifAttrDisplayName[index];

            if (typeof data == 'undefined' || data == '') continue;

            if (displayName == EXIF_ATTR_FNUMBER)
                data = 'f/' + data;
            else if (displayName == EXIF_ATTR_ISO)
                data = 'ISO ' + data;
            else if (displayName == EXIF_ATTR_EXPOSURE_TIME)
                data = data + ' Sec';

            jQuery('<div/>', {
                    class: 'exifDataContainer'
                })
                .append(
                    jQuery('<span/>', {
                        class: 'exifDataTitle'
                    })
                    .append(
                        jQuery('<img/>', {
                            class: 'exifDataTitleIcon',
                            src: "img/exifIcon/icon_" + exifAttr[index] + ".png",
                            title: displayName,
                        })
                    )
                )
                .append(
                    jQuery('<span/>', {
                        class: 'exifDataContent'
                    })
                    .text(data)
                    .css({
                        color: '#555',
                    })
                )
                .appendTo(exifContainer)
        }

        //no basic exif data
        if (exifContainer.children().length == 0) {
            jQuery('<div/>', {
                    class: 'exifDataContainer'
                })
                .append(
                    jQuery('<span/>', {
                        class: 'exifDataTitle'
                    })
                    .append(
                        jQuery('<img/>', {
                            class: 'exifDataTitleIcon',
                            src: "img/exifIcon/icon_no_basic_data.png",
                        })
                    )
                )
                .append(
                    jQuery('<span/>', {
                        class: 'exifDataContent'
                    })
                    .text("No Basic Exif Data")
                    .css({
                        color: '#555',
                    })
                )
                .appendTo(exifContainer)
        }
        exifContainer.fadeIn(500);
    }

    return {
        exifDataViewShow: exifDataViewShow,
        infoButtonSetting: infoButtonSetting,
        sideNavSetting: sideNavSetting,
    }
}());
