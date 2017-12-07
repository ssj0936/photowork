var API_KEY = 'ee5075e9d4a5a59568858f65f6195527',
    USER_ID = '27389068@N08',
    photoURL = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=' + API_KEY + '&user_id=' + USER_ID + '&format=json';


var photoGeter = (function () {
    var photosArr = [];

    function getExif(photometa, callback) {
        var exifURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=' + API_KEY + '&photo_id=' + photometa.id + '&secret=' + photometa.secret + '&format=json';

        $.ajax({
            url: exifURL,
            method: 'GET',
            dataType: 'text',
            success: function (json) {
                //                console.log(exifURL);
                //                console.log(photometa);
                var jsonObj = flickrJsonParser(json);
                var exif = {};
                exif.camera = jsonObj.photo.camera;

                for (var obj of jsonObj.photo.exif) {
                    exif[obj.tag] = obj.raw._content;
                }

                if (callback) {
                    callback(exif);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("getExif:" + xhr.status);
                alert(thrownError);
            }
        });
    }

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
                                        //                                        height: photo.height_o,
                                        //                                        width: photo.width_o,
                                        ispublic: photo.ispublic,
                                        title: photo.title,
                                        farm: photo.farm,
                                        server: photo.server,
                                        secret: photo.secret,
                                        url_o: photo.url_o,
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
                    //                    console.log(jsonObj);
                    //                    console.log(photosArr);
                    photosArr.sort(function (a, b) {
                        return b.photos.length - a.photos.length;
                    })
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

    function getPhotoUrl(meta, size) {
        let sizetag = (size == "Thumbnail") ? '_t' :
            (size == "Small") ? '_t' :
            (size == "Small 320") ? '_n     ' :
            (size == "Medium") ? '' :
            (size == "Medium 640") ? '_z' :
            (size == "Medium 800") ? '_c' :
            (size == "Large") ? '_b' : '';

        return "https://farm" + meta.farm + ".staticflickr.com/" + meta.server + "/" + meta.id + "_" + meta.secret + sizetag + ".jpg";

    }

    function flickrJsonParser(text) {
        text = text.replace(/^jsonFlickrApi/, '')
        text = text.substring(1, text.length - 1);
        return JSON.parse(text);
    }

    function getPhotos() {
        return photosArr;
    }

    function getPhoto(id) {
        for (var album of photosArr) {
            for (var photo of album.photos) {
                if (photo.id == '' + id) {
                    return photo;
                }
            }
        }
        return null;
    }
    
    function getNextPhoto(id) {
        let found = false;
        for (var album of photosArr) {
            for (var photo of album.photos) {
                if(found){
                    return photo;
                }
                
                if (photo.id == '' + id) {
                    found = true;
                }
            }
        }
        return null;
    }
    
    function getPrevPhoto(id) {
        let prev = null;
        for (var album of photosArr) {
            for (var photo of album.photos) {
                if (photo.id == '' + id) {
                    return prev;
                }
                prev = photo;
            }
        }
        return null;
    }

    return {
        getExif: getExif,
        getPhotoUrl: getPhotoUrl,
        fetchPhoto: fetchPhoto,
        getPhotos: getPhotos,
        getPhoto: getPhoto,
        getNextPhoto:getNextPhoto,
        getPrevPhoto:getPrevPhoto,
    }
}());
