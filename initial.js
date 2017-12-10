var initial = (function () {

    function initial() {
        var json = photoGeter.fetchPhoto(
            function (photosArr) {
                photoView.photoPageConstruct(photosArr)
            }
        );
        photoDetail.clickListenerSetting();
        photoDetail.photoDetailRepositionListener();
        
        nav.sideNavSetting();
        nav.infoButtonSetting();
    }
    
    return {
        initial:initial,
    }
}())
