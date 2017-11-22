var API_KEY = 'ee5075e9d4a5a59568858f65f6195527',
    USER_ID = '27389068@N08',
    photoURL = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=' + API_KEY + '&user_id=' + USER_ID + '&format=json';

var photoGeter = (function () {
    var photosArr = [];

    function fetchPhoto(callback) {
        $.ajax({
            url: photoURL,
            method: 'GET',
            dataType: 'text',
            success: function (json) {
                var jsonObj = flickrJsonParser(json);

                let getURLs = [];
                for (let photoset of jsonObj.photosets.photoset) {
                    let photosetID = photoset.id;
                    getURLs.push('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + API_KEY + '&user_id=' + USER_ID + '&photoset_id=' + photosetID + '&extras=url_o&format=json');
                }

                var jxhr = [];
                $.each(getURLs, function (i, url) {
                    jxhr.push(
                        $.get(url, function (resultjson) {
                            let photosetjsonObj = flickrJsonParser(resultjson);
                            console.log(photosetjsonObj);
                            if (photosetjsonObj.stat == 'ok') {
                                let id = photosetjsonObj.photoset.id,
                                    title = photosetjsonObj.photoset.title,
                                    owner = photosetjsonObj.photoset.ownername,
                                    ownerId = photosetjsonObj.photoset.owner,
                                    length = parseInt(photosetjsonObj.photoset.total);

                                let photosetObj = {
                                    id: id,
                                    title: title,
                                    owner: owner,
                                    ownerId: ownerId,
                                    length: length,
                                    photos: [],
                                    allLoaded: false,
                                }
                                //console.log(photosetObj)
                                for (let photo of photosetjsonObj.photoset.photo) {
                                    photosetObj.photos.push({
                                        id: photo.id,
                                        height: photo.height_o,
                                        width: photo.width_o,
                                        ispublic: photo.ispublic,
                                        title: photo.title,
                                        url: "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg",
                                        loaded: false,
                                    })
                                }
                                photosArr.push(photosetObj);
                            }
                        })
                    );
                });

                $.when.apply($, jxhr).done(function () {
                    console.log('allDone');
                    console.log(jsonObj);
                    console.log(photosArr);
                    if (callback) {
                        callback(photosArr)
                    }
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("ajaxFetchMapValue:" + xhr.status);
                alert(thrownError);
            }
        })
    }

    function flickrJsonParser(text) {
        text = text.replace(/^jsonFlickrApi/, '')
        text = text.substring(1, text.length - 1);
        return JSON.parse(text);
    }

    function getPhoto() {
        return photosArr;
    }

    return {
        fetchPhoto: fetchPhoto,
        getPhoto:getPhoto,
    }
}());
