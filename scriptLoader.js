var randVersion = Math.floor((Math.random() * 1000) + 1);
document.write(
    '<script src="photoGeter.js?' + randVersion + '"><\/script>' +
    '<script src="photoView.js?' + randVersion + '"><\/script>' +
    '<link rel="stylesheet" href="style.css?' + randVersion + '" />');
