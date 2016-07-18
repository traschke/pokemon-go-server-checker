/**
 * Created by Timo on 18.07.2016.
 */

var latency = require('./latency');

var timer = 60000;
var maxElements = 10;
var history = [];
var lastGuess = undefined;

var checker = function () {
    function check() {
        console.log('Checking latency...');
        latency('https://pgorelease.nianticlabs.com/plfe/', 3000).then(function (time) {
            console.log('Finished. Latency is', time, 'ms');
            var resObject = {
                status: time != -1 ? 'up' : 'down',
                latency: time != -1 ? time : 0
            };
            // Keep history only up to x values
            if (history.length >= maxElements) {
                history.splice(0, 1);
            }
            history.push(resObject);
            guess();
            console.log('History', history);
        }, function (err) {
            console.log('ERRROROROORORORORO');
        });
        return setTimeout(check, timer);
    }
    return check();
};

var guess = function () {
    var upRate = 0;
    for (var i = 0; i < history.length; i++) {
        if (history[i].status == 'up') {
            upRate++;
        }
    }
    var upPercentage = upRate / history.length;
    console.log(upRate + ' out of ' + history.length + ' requests reported up. Thats ' + upPercentage * 100 + '%');
    lastGuess = {
        status: upPercentage >= 0.8 ? 'online' : upPercentage >= 0.2 ? 'unstable' : 'offline',
        latency: getAverageLatency()
    };
};

var getAverageLatency = function () {
    if (history.length == 0) {
        return 0;
    }
    var sum = 0;
    var counter = 0;
    for (var i = 0; i < history.length; i++) {
        if (history[i].latency > 0) {
            sum += history[i].latency;
            counter++;
        }
    }
    return parseInt(sum / counter);
};

var timeout = checker();

var latencyHistory = {
    startChecking: function() {
        if (timeout != undefined) {
            timeout = checker();
        }
    },
    getLastTimeout: function () {
        return history[history.length - 1];
    },
    getGuess: function () {
        return lastGuess;
    },
    stopChecking: function () {
        clearTimeout(timeout);
        timeout = undefined;
    }
};

module.exports = latencyHistory;