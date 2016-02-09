var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var __works = [];

function Work() {}

Work.parse = function(path, callback) {
  fs.readFile(path, function(err, data) {
    parser.parseString(data, function (err, result) {
      var planned_roadworks = result.ha_planned_roadworks;
      var raw_works = planned_roadworks.ha_planned_works;
      __works = raw_works.map(function(work) {
        for(var name in work) {
          work[name] = work[name][0];
        }
        return work;
      });
      callback(__works);
    });
  });
}

Work.search = function(filters) {
  var works = __works.slice(0);
  filters.forEach(function(filter) {
    works = Work['searchBy'+filter.type](filter.chars, works); 
  });
  return works;
}

Work.searchByRegion = function(chars, works) {
  return works.filter(function(work) {
    return work.local_authority.indexOf(chars) > -1;
  });
}

Work.searchByRoad = function(chars, works) {
  return works.filter(function(work) {
    return work.road.indexOf(chars) > -1;
  });
}

module.exports = Work;
