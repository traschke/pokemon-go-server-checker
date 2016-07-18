/**
 * Created by Timo on 18.07.2016.
 */
var https = require('https');
var urlParser = require('url-parse');

var getLatency = function(url, timeout) {
    var parsedUrl = urlParser(url, true);
    const options = {
        host: parsedUrl.hostname,
        path: parsedUrl.pathname
    };
    return new Promise(function(resolve, reject) {
        var start_time = new Date().getTime();
        var request = https.get(options, function(res) {
            res.on('data', function(data) {
                var request_time = new Date().getTime() - start_time;
                resolve(request_time);
            });
        });
        request.on('error',function(err){
            console.log('ERROR RECEIVED', err);
            resolve(-1);
        });
        request.setTimeout(timeout, function() {
            console.log('TIMEOUT RECEIVED');
            request.abort();
        });
    });
};

module.exports = getLatency;