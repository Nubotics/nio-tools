'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepMerge = require('deep-merge');

var _deepMerge2 = _interopRequireDefault(_deepMerge);

var _arrayInsertat = require('array-insertat');

var _arrayInsertat2 = _interopRequireDefault(_arrayInsertat);

var _lodash = require('lodash.foreach');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.clone');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.map');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.has');

var _lodash8 = _interopRequireDefault(_lodash7);

var _lodash9 = require('lodash.values');

var _lodash10 = _interopRequireDefault(_lodash9);

var _lodash11 = require('lodash.includes');

var _lodash12 = _interopRequireDefault(_lodash11);

var _lodash13 = require('lodash.startswith');

var _lodash14 = _interopRequireDefault(_lodash13);

var _lodash15 = require('lodash.endswith');

var _lodash16 = _interopRequireDefault(_lodash15);

var _lodash17 = require('lodash.find');

var _lodash18 = _interopRequireDefault(_lodash17);

var _lodash19 = require('lodash.filter');

var _lodash20 = _interopRequireDefault(_lodash19);

var _lodash21 = require('lodash.findindex');

var _lodash22 = _interopRequireDefault(_lodash21);

var _lodash23 = require('lodash.findlastindex');

var _lodash24 = _interopRequireDefault(_lodash23);

var _lodash25 = require('lodash.pluck');

var _lodash26 = _interopRequireDefault(_lodash25);

var _lodash27 = require('lodash.uniq');

var _lodash28 = _interopRequireDefault(_lodash27);

var _lodash29 = require('lodash.omit');

var _lodash30 = _interopRequireDefault(_lodash29);

var _lodash31 = require('lodash.first');

var _lodash32 = _interopRequireDefault(_lodash31);

var _lodash33 = require('lodash.last');

var _lodash34 = _interopRequireDefault(_lodash33);

var _lodash35 = require('lodash.min');

var _lodash36 = _interopRequireDefault(_lodash35);

var _lodash37 = require('lodash.max');

var _lodash38 = _interopRequireDefault(_lodash37);

var _lodash39 = require('lodash.groupby');

var _lodash40 = _interopRequireDefault(_lodash39);

var _lodash41 = require('lodash.orderby');

var _lodash42 = _interopRequireDefault(_lodash41);

var _lodash43 = require('lodash.sortbyorder');

var _lodash44 = _interopRequireDefault(_lodash43);

var _lodash45 = require('lodash.sortby');

var _lodash46 = _interopRequireDefault(_lodash45);

var _lodash47 = require('lodash.camelcase');

var _lodash48 = _interopRequireDefault(_lodash47);

var _lodash49 = require('lodash.snakecase');

var _lodash50 = _interopRequireDefault(_lodash49);

var _lodash51 = require('lodash.isarguments');

var _lodash52 = _interopRequireDefault(_lodash51);

var _lodash53 = require('lodash.isarray');

var _lodash54 = _interopRequireDefault(_lodash53);

var _lodash55 = require('lodash.isdate');

var _lodash56 = _interopRequireDefault(_lodash55);

var _lodash57 = require('lodash.isempty');

var _lodash58 = _interopRequireDefault(_lodash57);

var _lodash59 = require('lodash.isfunction');

var _lodash60 = _interopRequireDefault(_lodash59);

var _lodash61 = require('lodash.isinteger');

var _lodash62 = _interopRequireDefault(_lodash61);

var _lodash63 = require('lodash.isnumber');

var _lodash64 = _interopRequireDefault(_lodash63);

var _lodash65 = require('lodash.isplainobject');

var _lodash66 = _interopRequireDefault(_lodash65);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isNode = require('detect-node');
var isWeb = !isNode;
var env = require('get-env')({
  development: ['development', 'dev', 'local'],
  production: ['production', 'prod', 'live', 'staging']
});

var merge = (0, _deepMerge2.default)(function (target, source, key) {
  if (target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});
var assign = merge;

var eachKey = function eachKey(object, cb) {
  (0,

  //-> lightdash
  _lodash2.default)(Object.keys(object), function (key, i) {
    cb(key, i);
  });
};

var makeKey = function makeKey(key) {
  return _.snakeCase(key);
};
var findValue = function findValue(collection, keys) {
  var result = null;
  var item = null;
  if ((0, _lodash54.default)(keys)) {
    result = {};
    (0, _lodash2.default)(keys, function (key) {
      item = (0, _lodash18.default)(collection, { 'key': key });
      if ((0, _lodash8.default)(item, 'value')) {
        result = merge(result, _defineProperty({}, key, item.value));
      }
    });
  } else {
    item = (0, _lodash18.default)(collection, { 'key': keys });
    if ((0, _lodash8.default)(item, 'value')) {
      result = _defineProperty({}, keys, item.value);
    }
  }
  return result;
};

var makeObjectFromKeyCollection = function makeObjectFromKeyCollection(collection, omitPrefix) {
  var result = {};
  (0, _lodash2.default)(collection, function (item) {
    //console.log('make from collection:', item)
    if ((0, _lodash8.default)(item, 'key') && (0, _lodash8.default)(item, 'value')) {
      if (!(0, _lodash14.default)(item.key), omitPrefix) {
        result = merge(result, _defineProperty({}, item.key, item.value));
      }
    }
  });
  return result;
};
var makeObject = makeObjectFromKeyCollection;

var findMetaItemByKey = function findMetaItemByKey(metaCollection, key, userId) {
  var query = { key: key };
  if (userId) {
    query.user = userId;
  }
  return (0, _lodash18.default)(metaCollection, query);
};

var findOrCreateMetaItem = function findOrCreateMetaItem(metaCollection, item) {
  var proxyItem = {};
  if ((0, _lodash8.default)(item, 'user')) {
    //-> should check if user is object
    var userId = item.user;
    var metaItem = findMetaItemByKey(metaCollection, item.key, userId);
    if (metaItem) {
      proxyItem = merge(metaItem, item);
    } else {
      proxyItem = item;
    }
  } else {
    proxyItem = item;
  }
  return proxyItem;
};

var updateMetaCollection = function updateMetaCollection(ogCollection, newCollection) {
  var updatedCollection = [];
  var proxyItem = {};
  (0, _lodash2.default)(ogCollection, function (ogItem) {
    proxyItem = (0, _lodash18.default)(newCollection, { key: ogItem.key, user: ogItem.user });
    if (proxyItem) {
      updatedCollection.push(proxyItem);
    } else {
      updatedCollection.push(ogItem);
    }
  });
  (0, _lodash2.default)(newCollection, function (newItem) {
    proxyItem = (0, _lodash18.default)(updatedCollection, { key: newItem.key, user: newItem.user });
    if (!proxyItem) {
      updatedCollection.push(newItem);
    }
  });
  return updatedCollection;
};

var checkStatusCollection = function checkStatusCollection(statusCollection, statusKey, valueKey) {
  var result = null;
  var foundStatus = (0, _lodash18.default)(statusCollection, { key: statusKey });

  if (foundStatus) {

    if ((0, _lodash8.default)(foundStatus, 'value')) {
      if ((0, _lodash8.default)(foundStatus.value, valueKey)) {
        result = foundStatus.value[valueKey];
      }
    }
  }
  return result;
};

var getFileExtension = function getFileExtension(filename) {
  return filename.split('.').pop();
};

var propHasComponent = function propHasComponent(prop) {
  var result = false;
  if ((0, _lodash54.default)(prop)) {
    if (prop.length > 0) {
      result = true;
    }
  } else if (!(0, _lodash58.default)(prop)) {
    result = true;
  }
  return result;
};

var is = function is(thing, type) {
  type = type.toLowerCase();

  //-> collection
  if ((0, _lodash12.default)(type, 'collection')) {
    return (0, _lodash54.default)(thing) || (0, _lodash66.default)(thing);
  } else

    //-> array
    if ((0, _lodash12.default)(type, 'array') || type === 'arr') {
      return (0, _lodash54.default)(thing);
    } else

      //-> arguments
      if (type === 'arguments' || type == 'args') {
        return (0, _lodash52.default)(thing);
      } else

        //-> date
        if ((0, _lodash12.default)(type, 'date')) {
          return (0, _lodash56.default)(thing);
        } else

          //-> empty / nothing
          if (type === 'empty' || type === 'nothing') {
            return (0, _lodash58.default)(thing);
          } else

            //-> function
            if ((0, _lodash12.default)(type, 'function') || type === 'func') {
              return (0, _lodash60.default)(thing);
            } else

              //-> integer
              if ((0, _lodash12.default)(type, 'integer') || type === 'int') {
                return (0, _lodash62.default)(thing);
              } else

                //-> number
                if ((0, _lodash12.default)(type, 'number')) {
                  return (0, _lodash64.default)(thing);
                } else

                  //-> object / plain object
                  if ((0, _lodash12.default)(type, 'object')) {
                    return (0, _lodash66.default)(thing);
                  } else

                    //-> zero length
                    if ((0, _lodash12.default)(type, 'zero')) {
                      if ((0, _lodash8.default)(thing, 'length')) {
                        return thing['length'] === 0;
                      } else {
                        return true;
                      }
                    } else

                      //-> component
                      if ((0, _lodash12.default)(type, 'component')) {
                        return propHasComponent(thing);
                      } else

                        //-> unknown type
                        {
                          return false;
                        }
};

var pushChildToTermInCollection = function pushChildToTermInCollection(categoryCollection, childCollection) {
  var foundChildCollection = [];
  return (0, _lodash6.default)(categoryCollection, function (category) {
    category.childCollection = [];
    foundChildCollection = (0, _lodash20.default)(childCollection, { parent: category.id });
    if ((0, _lodash54.default)(foundChildCollection)) {
      category.childCollection = foundChildCollection;
    }
    return category;
  });
};

var getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var smoosh = merge;

//-> export
exports.default = {
  //-> objects / collections
  merge: merge,
  smoosh: smoosh,
  assign: assign,
  insertAt: _arrayInsertat2.default, forEach: _lodash2.default,
  clone: _lodash4.default,
  map: _lodash6.default,
  has: _lodash8.default, //-> did you know? you can -> has(obj,'thing.that.them.they.something')
  values: _lodash10.default,
  includes: _lodash12.default,
  startsWith: _lodash14.default,
  endsWith: _lodash16.default,
  find: _lodash18.default,
  filter: _lodash20.default,
  findIndex: _lodash22.default,
  findLastIndex: _lodash24.default,
  pluck: _lodash26.default,
  uniq: _lodash28.default,
  omit: _lodash30.default,
  first: _lodash32.default,
  last: _lodash34.default,
  min: _lodash36.default,
  max: _lodash38.default,
  groupBy: _lodash40.default,
  orderBy: _lodash44.default,
  sortBy: _lodash46.default,
  camelCase: _lodash48.default,
  snakeCase: _lodash50.default,
  isArguments: _lodash52.default,
  isArray: _lodash54.default,
  isDate: _lodash56.default,
  isEmpty: _lodash58.default,
  isFunction: _lodash60.default,
  isInteger: _lodash62.default,
  isNumber: _lodash64.default,
  isPlainObject: _lodash66.default,
  getRandomInt: getRandomInt,

  //-> is -> thing -> type
  is: is,

  //-> assembler
  eachKey: eachKey,
  makeKey: makeKey,
  findValue: findValue,
  makeObject: makeObject,

  //-> meta
  findMetaItemByKey: findMetaItemByKey,
  findOrCreateMetaItem: findOrCreateMetaItem,
  updateMetaCollection: updateMetaCollection,
  pushChildToTermInCollection: pushChildToTermInCollection,

  //-> action status
  checkStatusCollection: checkStatusCollection,

  //-> upload
  getFileExtension: getFileExtension,

  //-> context
  isNode: isNode,
  isWeb: isWeb,
  env: env
};