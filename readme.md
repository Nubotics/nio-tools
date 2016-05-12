# nio tools

## A collection of frequently needed js language tools, based on lodash modules.

nio tools exports an object of all the methods (and some props) we wish were native in js.

Many of these methods are modules I've painstakingly chosen from lodash 4 modules.

```
npm i --save nio-tools
```

Serving suggestion

```javascript

import tools from 'nio-tools'
const { is, has, merge, forEach, map, find, filter, includes, } = tools

```

nio tools is universal, IOW safe for both server and browser use


**Lodash modules included** 

 - forEach
 - clone
 - map
 - has
 - values
 - includes
 - startsWith
 - endsWith
 - find
 - filter
 - findIndex
 - findLastIndex
 - pluck
 - uniq
 - omit
 - first
 - last
 - min
 - max
 - groupBy
 - orderBy -> sortByOrder
 - sortBy
 - camelCase
 - snakeCase
 - trim
 
**Type checking** 

 - isArguments
 - isArray
 - isDate
 - isEmpty
 - isFunction
 - isInteger
 - isNumber
 - isPlainObject


**is( thing: ? , type: string ) -> bool**

is, is a convenience method for sanity sake.

Available type arguments:

 - collection -> array || plain object
 - array | arr
 - arguments | args
 - date
 - empty | nothing
 - function | func
 - integer | int
 - number
 - object
 - zero | zero-len | zero-length
 - component -> React component class


**Methods**

 - **merge(** **destination**: object|array, **override**: object|array **)** -> object|array
 
 - **smoosh** -> merge
 
 - **assign** -> merge
 
 - **insertAt(** **destination**: array, **item**: array-item, **index**: int **)** -> array
 
 - **eachKey(** **object**, **cb**: function( **key**: string, **index**: int ) **)**
 
 - **makeKey(** **value**: string **)** -> snake case sluggified string
 
 - **findValue(** **collection**: array, **keys**: array | string **)** -> array | object
 
 - **makeObject(** **collection**: array **)** -> object
 
 - **findMetaItemByKey(** **metaCollection**: array, **key**: string **)** -> object
 
 - **findOrCreateMetaItem(** **metaCollection**: array, **item**: object **)** -> object
 
 - **updateMetaCollection(** **original**: array, **next**: array **)** -> array
 
 - **getFileExtension(** **filename**: string **)** -> string

 
**Props**
 
 - **isNode** -> bool
 
 - **isWeb** -> bool

 
![nubotics](https://avatars0.githubusercontent.com/u/6399329?v=3&s=200 "nubotics")
