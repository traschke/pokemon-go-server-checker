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
        var start_time = process.hrtime();
        var request = https.get(options, function(res) {
            res.on('data', function(data) {
                var request_time = process.hrtime(start_time);
                var ms = parseInt(request_time[0] * 1000 + request_time[1] * 1e-6);
                resolve(ms);
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