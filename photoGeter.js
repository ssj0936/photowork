var API_KEY = 'ee5075e9d4a5a59568858f65f6195527',
    USER_ID = '27389068@N08',
    photoURL = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=' + API_KEY + '&user_id=' + USER_ID + '&format=json';

var photoGeter = (function () {
    function getPhoto() {
        $.ajax({
            url: photoURL,
            method: 'GET',
            dataType: 'text',
            success: function (json) {
                var jsonObj = flickrJsonParser(json);
                for(let photoset of jsonObj.photosets.photoset){
                    let photosetID = photoset.id;
                    $.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='+API_KEY+'&user_id=' + USER_ID + '&photoset_id='+photosetID+'&extras=url_o&format=json',function(resultjson){
                        let photosetjsonObj = flickrJsonParser(resultjson);
                        console.log(photosetjsonObj);
                    });
                }
                console.log(jsonObj);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("ajaxFetchMapValue:" + xhr.status);
                alert(thrownError);
            }
        })
        return 'test';
    }

    function flickrJsonParser(text) {
        text = text.replace(/^jsonFlickrApi/, '')
        text = text.substring(1, text.length - 1);
        return JSON.parse(text);
    }

    return {
        getPhoto: getPhoto,
    }
}());
