var randVersion = Math.floor((Math.random() * 1000) + 1);
document.write(
    '<script src="ext.js?' + randVersion + '"><\/script>' +
    '<script src="lazyloader.js?' + randVersion + '"><\/script>' +
    '<script src="photoGeter.js?' + randVersion + '"><\/script>' +
    '<script src="photoView.js?' + randVersion + '"><\/script>' +
    '<script src="sideNav.js?' + randVersion + '"><\/script>' +
    '<link rel="stylesheet" href="style.css?' + randVersion + '" />');
