// Generated by CoffeeScript 1.6.3
var api, getUrl, packages, promise, scrape;

promise = require('when');

scrape = require('scrape');

api = 'https://npmjs.org/browse/author/:user/:page';

getUrl = function(user, page) {
  if (user == null) {
    user = '';
  }
  if (page == null) {
    page = 0;
  }
  return (api.replace(':user', user)).replace(':page', page);
};

packages = function(user) {
  var deferred, page, process, request, total;
  deferred = promise.defer();
  page = -1;
  total = 0;
  request = function() {
    var url;
    url = getUrl(user, ++page);
    return scrape.request(url, function(err, $) {
      return process(err, $);
    });
  };
  process = function(err, $) {
    var count, rows;
    if (err) {
      return deferred.reject(err);
    } else {
      rows = $('#package .row');
      count = rows.length;
      if (count > 1) {
        total += count;
        deferred.notify(total);
        return request();
      } else {
        return deferred.resolve(total);
      }
    }
  };
  request();
  return deferred.promise;
};

packages('dominictarr').then(function(total) {
  return console.log(total);
});

module.exports = packages;
