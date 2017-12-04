$(document).ready(function () {
    nav.sideNavSetting();
    nav.infoButtonSetting();
});


var nav = (function () {
    var EXIF_ATTR_CREATOR_TOO = 'CreatorTool',
        EXIF_ATTR_EXPOSURE_TIME = 'ExposureTime',
        EXIF_ATTR_FNUMBER = 'FNumber',
        EXIF_ATTR_FLASH = 'Flash',
        EXIF_ATTR_FOCAL_LENGTH = 'FocalLength',
        EXIF_ATTR_ISO = 'ISO',
        EXIF_ATTR_CAMERA = 'camera';

    var exifAttr = ['camera'/*, 'CreatorTool'*/, 'ExposureTime', 'FNumber', 'Flash', 'FocalLength', 'ISO'],
        exifAttrDisplayName = ['Camera'/*, 'CreatorTool'*/, 'ExposureTime', 'FNumber', 'Flash', 'FocalLength', 'ISO'];

    function sideNavSetting() {
        $('div.sideNavOption').click(function () {
            console.log('click');
            let target = $('#' + $(this).attr('data-target'));

            if (target.hasClass('clicking')) return;

            $('div.sideNavItem').removeClass('clicking').hide();
            target.addClass('clicking').fadeIn(300);
        })
    }

    function infoButtonSetting() {
        $('span.functionbtn').click(function () {
            switch ($(this).attr('id')) {
                case 'btnBackToPhotoWall':
                    $('div#photopageContainer, div#photoDetail').removeClass('photoDetailShowing');
                    console.log('btnBackToPhotoWall');
                    break;
                case 'btnShowExif':
                    var photometa = JSON.parse(localStorage['photometa']);

                    photoGeter.getExif(photometa, function (exif) {
                        console.log(exif);
                        //                        $('div#exifInfoDetail').empty().text(JSON.stringify(exif));
                        exifDataViewConstruct(exif);
                    })

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
                    $('div#exifInfoSection').removeClass('showing');
                    var exifContainer = $('div#exifInfoDetail');
                    exifContainer.empty();
                    console.log('btnCloseExifInfo');
                    break;
            }
        })
    }

    function exifDataViewConstruct(exif) {
        var exifContainer = $('div#exifInfoDetail');
        exifContainer.empty();

        for (let index in exifAttr) {
            let data = exif[exifAttr[index]],
                displayName = exifAttrDisplayName[index];

            if(typeof data == 'undefined') continue;
            
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

    }

    return {
        infoButtonSetting: infoButtonSetting,
        sideNavSetting: sideNavSetting,
    }
}());
