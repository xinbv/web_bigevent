$.ajaxPrefilter(function(options) {
    console.log(options.url)
    options = 'http://www.liulongbin.top:3007' + options.url;
})