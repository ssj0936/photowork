$(document).ready(function () {
    nav.sideNavSetting();
    nav.infoButtonSetting();
});


var nav = (function () {
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
                    $('div#photopageContainer').fadeIn();
                    $('div#photoDetail').hide();
                    //                    $('div#photopageContainer, div#photoDetail ').toggleClass('hide');
                    console.log('btnBackToPhotoWall');
                    break;
                case 'btnShowExif':
                    var photometa = JSON.parse(localStorage['photometa']);
                    
                    photoGeter.getExif(photometa, function (jsonObj) {
                        console.log(jsonObj);
                        $('div#exifInfoDetail').empty().text(JSON.stringify(jsonObj));
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
                    console.log('btnCloseExifInfo');
                    break;
            }
        })
    }

    return {
        infoButtonSetting: infoButtonSetting,
        sideNavSetting: sideNavSetting,
    }
}());
