var Q        = require('q');

var Github   = require('./support/github');
var CSDN     = require('./support/csdn');
var PR       = require('./support/pagerank');
var Alexa    = require('./support/alexa');
var Zhihu    = require('./support/zhihu');

var github    = new Github();
var csdn  = new CSDN();
var pageRank    = new PR();
var alexa = new Alexa();
var zhihu = new Zhihu();

var Information = function(name, domain){
    'use strict';
    Information.prototype.name = name;
    Information.prototype.domain = domain;
};

var info = Information.prototype;

info.pageRank_get = function(result){
    'use strict';
    return pageRank.get(result, Information.prototype.domain);
};

info.alexa_get = function(result){
    'use strict';
    return alexa.get(result, Information.prototype.domain);
};

info.csdn_get= function (result) {
    'use strict';
    return csdn.get(result, info.name);
};

info.github_get= function (result) {
    'use strict';
    return github.get(result, info.name);
};

info.zhihu_get = function (result) {
    'use strict';
    return zhihu.get(result, info.name);
};

info.initVal = function (result) {
    'use strict';
    result = [];
    return result;
};

Information.prototype.get = function (callback) {
    'use strict';
    Q.fcall(info.initVal)
        .then(info.github_get)
        .then(info.csdn_get)
        .then(info.zhihu_get())
        .then(info.pageRank_get)
        .then(info.alexa_get)
        .then(function (result) {
            callback(result);
        });
};

module.exports = Information;


