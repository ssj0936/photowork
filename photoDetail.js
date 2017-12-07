var photoDetail = (function () {
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
    }
}());
