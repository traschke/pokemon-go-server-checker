/**
 * Created by Timo on 18.07.2016.
 */

var express = require('express');
var latencyHistory = require('./../modules/latency-history');

var router = express.Router();

router.route('/').get(function(req, res, next) {
    res.json(latencyHistory.getGuess());
});

module.exports = router;