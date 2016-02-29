import DeepMerge from 'deep-merge'
import insertAt from 'array-insertat'
let isNode = require('detect-node')
let isWeb = !isNode
const env = require('get-env')({
  development: ['development', 'dev', 'local'],
  production: ['production', 'prod', 'live', 'staging']
})

const merge = DeepMerge(function (target, source, key) {
  if (target instanceof Array) {
    return [].concat(target, source)
  }
  return source
})
const assign = merge

import forEach from 'lodash.foreach'
import clone from 'lodash.clone'
import map from 'lodash.map'
import has from 'lodash.has'
import values from 'lodash.values'
import includes from 'lodash.includes'
import startsWith  from 'lodash.startswith'
import endsWith from 'lodash.endswith'
import find from 'lodash.find'
import filter from 'lodash.filter'
import findIndex from 'lodash.findindex'
import findLastIndex from 'lodash.findlastindex'
import pluck from 'lodash.pluck'
import uniq from 'lodash.uniq'
import omit from 'lodash.omit'
import first from 'lodash.first'
import last from 'lodash.last'
import min from 'lodash.min'
import max from 'lodash.max'
import groupBy from 'lodash.groupby'
import orderBy from 'lodash.orderby'
import sortByOrder from 'lodash.sortbyorder'
import sortBy from 'lodash.sortby'
import camelCase from 'lodash.camelcase'
import snakeCase from 'lodash.snakecase'
import isArguments from 'lodash.isarguments'
import isArray from 'lodash.isarray'
import isDate from 'lodash.isdate'
import isEmpty from 'lodash.isempty'
import isFunction from 'lodash.isfunction'
import isInteger from 'lodash.isinteger'
import isNumber from 'lodash.isnumber'
import isPlainObject from 'lodash.isplainobject'

const eachKey = function (object, cb) {
  forEach(Object.keys(object), (key, i) => {
    cb(key, i)
  })
}

const makeKey = function (key) {
  return _.snakeCase(key)
}
const findValue = function (collection, keys) {
  let result = null
  let item = null
  if (isArray(keys)) {
    result = {}
    forEach(keys, (key)=> {
      item = find(collection, {'key': key})
      if (has(item, 'value')) {
        result = merge(result, {[key]: item.value})
      }
    })
  } else {
    item = find(collection, {'key': keys})
    if (has(item, 'value')) {
      result = {[keys]: item.value}
    }
  }
  return result
}

const makeObjectFromKeyCollection = function (collection, omitPrefix) {
  let result = {}
  forEach(collection, (item) => {
    //console.log('make from collection:', item)
    if (has(item, 'key') && has(item, 'value')) {
      if (!startsWith(item.key), omitPrefix) {
        result = merge(result, {[item.key]: item.value})
      }
    }
  })
  return result
}
const makeObject = makeObjectFromKeyCollection

const findMetaItemByKey = function (metaCollection, key, userId) {
  let query = {key}
  if (userId) {
    query.user = userId
  }
  return find(metaCollection, query)
}

const findOrCreateMetaItem = function (metaCollection, item) {
  let proxyItem = {}
  if (has(item, 'user')) {
    //-> should check if user is object
    let userId = item.user
    let metaItem = findMetaItemByKey(metaCollection, item.key, userId)
    if (metaItem) {
      proxyItem = merge(metaItem, item)
    } else {
      proxyItem = item
    }
  } else {
    proxyItem = item
  }
  return proxyItem
}

const updateMetaCollection = function (ogCollection, newCollection) {
  let updatedCollection = []
  let proxyItem = {}
  forEach(ogCollection, ogItem=> {
    proxyItem = find(newCollection, {key: ogItem.key, user: ogItem.user})
    if (proxyItem) {
      updatedCollection.push(proxyItem)
    } else {
      updatedCollection.push(ogItem)
    }
  })
  forEach(newCollection, newItem=> {
    proxyItem = find(updatedCollection, {key: newItem.key, user: newItem.user})
    if (!proxyItem) {
      updatedCollection.push(newItem)
    }
  })
  return updatedCollection
}

const checkStatusCollection = function (statusCollection, statusKey, valueKey) {
  let result = null
  let foundStatus = find(statusCollection, {key: statusKey})

  if (foundStatus) {

    if (has(foundStatus, 'value')) {
      if (has(foundStatus.value, valueKey)) {
        result = foundStatus.value[valueKey]
      }
    }

  }
  return result
}

const getFileExtension = function (filename) {
  return filename.split('.').pop()
}

const propHasComponent = function (prop) {
  let result = false
  if (isArray(prop)) {
    if (prop.length > 0) {
      result = true
    }
  } else if (!isEmpty(prop)) {
    result = true
  }
  return result
}

const is = function (thing, type) {
  type = type.toLowerCase()

  //-> collection
  if (includes(type, 'collection')) {
    return isArray(thing) || isPlainObject(thing)
  } else

  //-> array
  if (includes(type, 'array') || type === 'arr') {
    return isArray(thing)
  } else

  //-> arguments
  if (type === 'arguments' || type == 'args') {
    return isArguments(thing)
  } else

  //-> date
  if (includes(type, 'date')) {
    return isDate(thing)
  } else

  //-> empty / nothing
  if (type === 'empty' || type === 'nothing') {
    return isEmpty(thing)
  } else

  //-> function
  if (includes(type, 'function') || type === 'func') {
    return isFunction(thing)
  } else

  //-> integer
  if (includes(type, 'integer') || type === 'int') {
    return isInteger(thing)
  } else

  //-> number
  if (includes(type, 'number')) {
    return isNumber(thing)
  } else

  //-> object / plain object
  if (includes(type, 'object')) {
    return isPlainObject(thing)
  } else

  //-> zero length
  if (includes(type, 'zero')) {
    if (has(thing, 'length')) {
      return thing['length'] === 0
    } else {
      return true
    }
  } else

  //-> component
  if (includes(type, 'component')) {
    return propHasComponent(thing)
  } else

  //-> unknown type
  {
    return false
  }

}

const pushChildToTermInCollection = function (categoryCollection, childCollection) {
  let foundChildCollection = []
  return map(categoryCollection, category=> {
    category.childCollection = []
    foundChildCollection = filter(childCollection, {parent: category.id})
    if (isArray(foundChildCollection)) {
      category.childCollection = foundChildCollection
    }
    return category
  })
}

const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const smoosh = merge

//-> export
export default {
  //-> objects / collections
  merge,
  smoosh,
  assign,
  insertAt,

  //-> lightdash
  forEach,
  clone,
  map,
  has, //-> did you know? you can -> has(obj,'thing.that.them.they.something')
  values,
  includes,
  startsWith,
  endsWith,
  find,
  filter,
  findIndex,
  findLastIndex,
  pluck,
  uniq,
  omit,
  first,
  last,
  min,
  max,
  groupBy,
  orderBy: sortByOrder,
  sortBy,
  camelCase,
  snakeCase,
  isArguments,
  isArray,
  isDate,
  isEmpty,
  isFunction,
  isInteger,
  isNumber,
  isPlainObject,
  getRandomInt,

  //-> is -> thing -> type
  is,

  //-> assembler
  eachKey,
  makeKey,
  findValue,
  makeObject,

  //-> meta
  findMetaItemByKey,
  findOrCreateMetaItem,
  updateMetaCollection,
  pushChildToTermInCollection,

  //-> action status
  checkStatusCollection,

  //-> upload
  getFileExtension,

  //-> context
  isNode,
  isWeb,
  env,
}
