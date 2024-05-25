(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("xe-utils"));
	else if(typeof define === 'function' && define.amd)
		define([, "xe-utils"], factory);
	else if(typeof exports === 'object')
		exports["VxeCore"] = factory(require("vue"), require("xe-utils"));
	else
		root["VxeCore"] = factory(root["Vue"], root["XEUtils"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__9274__, __WEBPACK_EXTERNAL_MODULE__8871__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 9274:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9274__;

/***/ }),

/***/ 8871:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8871__;

/***/ }),

/***/ 9306:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(4901);
var tryToString = __webpack_require__(6823);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 8551:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isObject = __webpack_require__(34);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 9617:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIndexedObject = __webpack_require__(5397);
var toAbsoluteIndex = __webpack_require__(5610);
var lengthOfArrayLike = __webpack_require__(6198);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 4527:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var isArray = __webpack_require__(4376);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ 4576:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 7740:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var hasOwn = __webpack_require__(9297);
var ownKeys = __webpack_require__(5031);
var getOwnPropertyDescriptorModule = __webpack_require__(7347);
var definePropertyModule = __webpack_require__(4913);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 6699:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var definePropertyModule = __webpack_require__(4913);
var createPropertyDescriptor = __webpack_require__(6980);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 6980:
/***/ (function(module) {


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 6840:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(4901);
var definePropertyModule = __webpack_require__(4913);
var makeBuiltIn = __webpack_require__(283);
var defineGlobalProperty = __webpack_require__(9433);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 9433:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 3724:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(9039);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ 4055:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);
var isObject = __webpack_require__(34);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 6837:
/***/ (function(module) {


var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 9392:
/***/ (function(module) {


module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ 7388:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);
var userAgent = __webpack_require__(9392);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 8727:
/***/ (function(module) {


// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 6518:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);
var getOwnPropertyDescriptor = (__webpack_require__(7347).f);
var createNonEnumerableProperty = __webpack_require__(6699);
var defineBuiltIn = __webpack_require__(6840);
var defineGlobalProperty = __webpack_require__(9433);
var copyConstructorProperties = __webpack_require__(7740);
var isForced = __webpack_require__(2796);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = global[TARGET] && global[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 9039:
/***/ (function(module) {


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 616:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(9039);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 9565:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_BIND = __webpack_require__(616);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 350:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var hasOwn = __webpack_require__(9297);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 9504:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_BIND = __webpack_require__(616);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 7751:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);
var isCallable = __webpack_require__(4901);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 5966:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aCallable = __webpack_require__(9306);
var isNullOrUndefined = __webpack_require__(4117);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 4475:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 9297:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var toObject = __webpack_require__(8981);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 421:
/***/ (function(module) {


module.exports = {};


/***/ }),

/***/ 5917:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var fails = __webpack_require__(9039);
var createElement = __webpack_require__(4055);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ 7055:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var classof = __webpack_require__(4576);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 3706:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var isCallable = __webpack_require__(4901);
var store = __webpack_require__(7629);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 1181:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_WEAK_MAP = __webpack_require__(8622);
var global = __webpack_require__(4475);
var isObject = __webpack_require__(34);
var createNonEnumerableProperty = __webpack_require__(6699);
var hasOwn = __webpack_require__(9297);
var shared = __webpack_require__(7629);
var sharedKey = __webpack_require__(6119);
var hiddenKeys = __webpack_require__(421);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 4376:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var classof = __webpack_require__(4576);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),

/***/ 4901:
/***/ (function(module) {


// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 2796:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 4117:
/***/ (function(module) {


// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 34:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(4901);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 6395:
/***/ (function(module) {


module.exports = false;


/***/ }),

/***/ 757:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(7751);
var isCallable = __webpack_require__(4901);
var isPrototypeOf = __webpack_require__(1625);
var USE_SYMBOL_AS_UID = __webpack_require__(7040);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 6198:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toLength = __webpack_require__(8014);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 283:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);
var hasOwn = __webpack_require__(9297);
var DESCRIPTORS = __webpack_require__(3724);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(350).CONFIGURABLE);
var inspectSource = __webpack_require__(3706);
var InternalStateModule = __webpack_require__(1181);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 741:
/***/ (function(module) {


var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 4913:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var IE8_DOM_DEFINE = __webpack_require__(5917);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(8686);
var anObject = __webpack_require__(8551);
var toPropertyKey = __webpack_require__(6969);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 7347:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var call = __webpack_require__(9565);
var propertyIsEnumerableModule = __webpack_require__(8773);
var createPropertyDescriptor = __webpack_require__(6980);
var toIndexedObject = __webpack_require__(5397);
var toPropertyKey = __webpack_require__(6969);
var hasOwn = __webpack_require__(9297);
var IE8_DOM_DEFINE = __webpack_require__(5917);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8480:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var internalObjectKeys = __webpack_require__(1828);
var enumBugKeys = __webpack_require__(8727);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 3717:
/***/ (function(__unused_webpack_module, exports) {


// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 1625:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 1828:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var hasOwn = __webpack_require__(9297);
var toIndexedObject = __webpack_require__(5397);
var indexOf = (__webpack_require__(9617).indexOf);
var hiddenKeys = __webpack_require__(421);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 8773:
/***/ (function(__unused_webpack_module, exports) {


var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 4270:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(9565);
var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 5031:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(7751);
var uncurryThis = __webpack_require__(9504);
var getOwnPropertyNamesModule = __webpack_require__(8480);
var getOwnPropertySymbolsModule = __webpack_require__(3717);
var anObject = __webpack_require__(8551);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 7750:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isNullOrUndefined = __webpack_require__(4117);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 6119:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var shared = __webpack_require__(5745);
var uid = __webpack_require__(3392);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 7629:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var IS_PURE = __webpack_require__(6395);
var globalThis = __webpack_require__(4475);
var defineGlobalProperty = __webpack_require__(9433);

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.37.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.37.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 5745:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var store = __webpack_require__(7629);

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ 4495:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7388);
var fails = __webpack_require__(9039);
var global = __webpack_require__(4475);

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 5610:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIntegerOrInfinity = __webpack_require__(1291);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5397:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(7055);
var requireObjectCoercible = __webpack_require__(7750);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 1291:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var trunc = __webpack_require__(741);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 8014:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIntegerOrInfinity = __webpack_require__(1291);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 8981:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var requireObjectCoercible = __webpack_require__(7750);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 2777:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(9565);
var isObject = __webpack_require__(34);
var isSymbol = __webpack_require__(757);
var getMethod = __webpack_require__(5966);
var ordinaryToPrimitive = __webpack_require__(4270);
var wellKnownSymbol = __webpack_require__(8227);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 6969:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toPrimitive = __webpack_require__(2777);
var isSymbol = __webpack_require__(757);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 6823:
/***/ (function(module) {


var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 3392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 7040:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(4495);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 8686:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var fails = __webpack_require__(9039);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ 8622:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);
var isCallable = __webpack_require__(4901);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 8227:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var global = __webpack_require__(4475);
var shared = __webpack_require__(5745);
var hasOwn = __webpack_require__(9297);
var uid = __webpack_require__(3392);
var NATIVE_SYMBOL = __webpack_require__(4495);
var USE_SYMBOL_AS_UID = __webpack_require__(7040);

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 4114:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var toObject = __webpack_require__(8981);
var lengthOfArrayLike = __webpack_require__(6198);
var setArrayLength = __webpack_require__(4527);
var doesNotExceedSafeInteger = __webpack_require__(6837);
var fails = __webpack_require__(9039);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  GLOBAL_EVENT_KEYS: function() { return /* reexport */ GLOBAL_EVENT_KEYS; },
  VxeUI: function() { return /* reexport */ VxeUI; },
  clipboard: function() { return /* reexport */ clipboard; },
  commands: function() { return /* reexport */ commands; },
  coreVersion: function() { return /* reexport */ coreVersion; },
  createEvent: function() { return /* reexport */ createEvent; },
  "default": function() { return /* binding */ entry_lib; },
  formats: function() { return /* reexport */ formats; },
  getConfig: function() { return /* reexport */ getConfig; },
  getI18n: function() { return /* reexport */ getI18n; },
  getIcon: function() { return /* reexport */ getIcon; },
  getTheme: function() { return /* reexport */ getTheme; },
  globalEvents: function() { return /* reexport */ globalEvents; },
  globalResize: function() { return /* reexport */ globalResize; },
  hooks: function() { return /* reexport */ hooks; },
  interceptor: function() { return /* reexport */ interceptor; },
  log: function() { return /* reexport */ log; },
  menus: function() { return /* reexport */ menus; },
  renderer: function() { return /* reexport */ renderer; },
  setConfig: function() { return /* reexport */ setConfig; },
  setI18n: function() { return /* reexport */ setI18n; },
  setIcon: function() { return /* reexport */ setIcon; },
  setLanguage: function() { return /* reexport */ setLanguage; },
  setTheme: function() { return /* reexport */ setTheme; },
  useSize: function() { return /* reexport */ useSize; },
  validators: function() { return /* reexport */ validators; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"root":"XEUtils","commonjs":"xe-utils","commonjs2":"xe-utils","amd":"xe-utils"}
var external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_ = __webpack_require__(8871);
var external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default = /*#__PURE__*/__webpack_require__.n(external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_);
;// CONCATENATED MODULE: ./node_modules/dom-zindex/es/index.esm.js
var storeEl = null;
var storeId = 'z-index-manage';
var storeMainKey = 'm';
var storeSubKey = 's';
var storeData = {
  m: 1000,
  s: 1000
};
function isDocument() {
  return typeof document !== 'undefined';
}
function getDomMaxZIndex() {
  var max = 0;
  if (isDocument()) {
    var allElem = document.body.getElementsByTagName('*');
    for (var i = 0; i < allElem.length; i++) {
      var elem = allElem[i];
      if (elem && elem.style && elem.nodeType === 1) {
        var zIndex = elem.style.zIndex;
        if (zIndex && /^\d+$/.test(zIndex)) {
          max = Math.max(max, Number(zIndex));
        }
      }
    }
  }
  return max;
}
function getDom() {
  if (!storeEl) {
    if (isDocument()) {
      storeEl = document.getElementById(storeId);
      if (!storeEl) {
        storeEl = document.createElement('div');
        storeEl.id = storeId;
        storeEl.style.display = 'none';
        document.body.appendChild(storeEl);
        setCurrent(storeData.m);
        setSubCurrent(storeData.s);
      }
    }
  }
  return storeEl;
}
function createSetHandle(key) {
  return function (value) {
    if (value) {
      value = Number(value);
      storeData[key] = value;
      var doc = getDom();
      if (doc) {
        if (doc.dataset) {
          doc.dataset[key] = value + '';
        } else {
          doc.setAttribute('data-' + key, value + '');
        }
      }
    }
    return storeData[key];
  };
}
var setCurrent = createSetHandle(storeMainKey);
function createGetHandle(key, nextMethod) {
  return function getCurrent(currZindex) {
    var zIndex;
    var doc = getDom();
    if (doc) {
      var domVal = doc.dataset ? doc.dataset[key] : doc.getAttribute('data-' + key);
      if (domVal) {
        zIndex = Number(domVal);
      }
    }
    if (!zIndex) {
      zIndex = storeData[key];
    }
    if (currZindex) {
      if (Number(currZindex) < zIndex) {
        return nextMethod();
      }
      return currZindex;
    }
    return zIndex;
  };
}
var getCurrent = createGetHandle(storeMainKey, getNext);
function getNext() {
  return setCurrent(getCurrent() + 1);
}
var setSubCurrent = createSetHandle(storeSubKey);
var _getSubCurrent = createGetHandle(storeSubKey, getSubNext);
function getSubCurrent() {
  return getCurrent() + _getSubCurrent();
}
function getSubNext() {
  setSubCurrent(_getSubCurrent() + 1);
  return getSubCurrent();
}
/**
 * Web common z-index style management
 */
var DomZIndex = {
  setCurrent: setCurrent,
  getCurrent: getCurrent,
  getNext: getNext,
  setSubCurrent: setSubCurrent,
  getSubCurrent: getSubCurrent,
  getSubNext: getSubNext,
  getMax: getDomMaxZIndex
};
/* harmony default export */ var index_esm = (DomZIndex);
;// CONCATENATED MODULE: ./packages/src/globalStore.ts
const globalConfigStore = {
  authId: '',
  size: '',
  version: 1,
  zIndex: 999,
  resizeInterval: 500,
  i18n: key => key
};
;// CONCATENATED MODULE: ./packages/src/iconStore.ts
const iconConfigStore = {};
;// CONCATENATED MODULE: ./packages/src/themeStore.ts
const themeConfigStore = {
  theme: ''
};
;// CONCATENATED MODULE: ./packages/src/i18nStore.ts
const i18nConfigStore = {
  language: '',
  langMaps: {}
};
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js


function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(4114);
;// CONCATENATED MODULE: ./packages/src/event.ts



const GLOBAL_EVENT_KEYS = {
  F2: 'F2',
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  TAB: 'Tab',
  DELETE: 'Delete',
  BACKSPACE: 'Backspace',
  SPACEBAR: ' ',
  CONTEXT_MENU: 'ContextMenu',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown'
};
const browse = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().browse();
const convertEventKeys = {
  ' ': 'Spacebar',
  Apps: GLOBAL_EVENT_KEYS.CONTEXT_MENU,
  Del: GLOBAL_EVENT_KEYS.DELETE,
  Up: GLOBAL_EVENT_KEYS.ARROW_UP,
  Down: GLOBAL_EVENT_KEYS.ARROW_DOWN,
  Left: GLOBAL_EVENT_KEYS.ARROW_LEFT,
  Right: GLOBAL_EVENT_KEYS.ARROW_RIGHT
};
// 监听全局事件
const wheelName = browse.firefox ? 'DOMMouseScroll' : 'mousewheel';
const eventStore = [];
function triggerEvent(evnt) {
  const isWheel = evnt.type === wheelName;
  eventStore.forEach(({
    type,
    cb
  }) => {
    // 如果被取消冒泡，不再执行
    if (!evnt.cancelBubble) {
      if (type === evnt.type || isWheel && type === 'mousewheel') {
        cb(evnt);
      }
    }
  });
}
const globalEvents = {
  on(comp, type, cb) {
    eventStore.push({
      comp,
      type,
      cb
    });
  },
  off(comp, type) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().remove(eventStore, item => item.comp === comp && item.type === type);
  },
  hasKey(evnt, targetKey) {
    const {
      key
    } = evnt;
    targetKey = targetKey.toLowerCase();
    return key ? targetKey === key.toLowerCase() || !!(convertEventKeys[key] && convertEventKeys[key].toLowerCase() === targetKey) : false;
  }
};
class VxeComponentEvent {
  constructor(evnt, params1, params2) {
    _defineProperty(this, "$event", void 0);
    this.$event = evnt;
    Object.assign(this, params1, params2);
  }
  stopPropagation() {
    const evnt = this.$event;
    if (evnt) {
      evnt.stopPropagation();
    }
  }
  preventDefault() {
    const evnt = this.$event;
    if (evnt) {
      evnt.preventDefault();
    }
  }
}
function createEvent(evnt, params1, params2) {
  return new VxeComponentEvent(evnt, params1, params2);
}
if (browse.isDoc) {
  if (!browse.msie) {
    window.addEventListener('copy', triggerEvent, false);
    window.addEventListener('cut', triggerEvent, false);
    window.addEventListener('paste', triggerEvent, false);
  }
  document.addEventListener('keydown', triggerEvent, false);
  document.addEventListener('contextmenu', triggerEvent, false);
  window.addEventListener('mousedown', triggerEvent, false);
  window.addEventListener('blur', triggerEvent, false);
  window.addEventListener('resize', triggerEvent, false);
  window.addEventListener(wheelName, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().throttle(triggerEvent, 100, {
    leading: true,
    trailing: false
  }), {
    passive: true,
    capture: false
  });
}
;// CONCATENATED MODULE: ./packages/src/resize.ts




/**
 * 监听 resize 事件
 * 如果项目中已使用了 resize-observer-polyfill，那么只需要将方法定义全局，该组件就会自动使用
 */
let resizeTimeout;
/* eslint-disable no-use-before-define */
const resize_eventStore = [];
const defaultInterval = 500;
function eventHandle() {
  if (resize_eventStore.length) {
    resize_eventStore.forEach(item => {
      item.tarList.forEach(observer => {
        const {
          target,
          width,
          heighe
        } = observer;
        const clientWidth = target.clientWidth;
        const clientHeight = target.clientHeight;
        const rWidth = clientWidth && width !== clientWidth;
        const rHeight = clientHeight && heighe !== clientHeight;
        if (rWidth || rHeight) {
          observer.width = clientWidth;
          observer.heighe = clientHeight;
          setTimeout(item.callback);
        }
      });
    });
    /* eslint-disable @typescript-eslint/no-use-before-define */
    eventListener();
  }
}
function eventListener() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(eventHandle, globalConfigStore.resizeInterval || defaultInterval);
}
class XEResizeObserver {
  constructor(callback) {
    _defineProperty(this, "tarList", []);
    _defineProperty(this, "callback", void 0);
    this.callback = callback;
  }
  observe(target) {
    if (target) {
      const {
        tarList
      } = this;
      if (!tarList.some(observer => observer.target === target)) {
        tarList.push({
          target,
          width: target.clientWidth,
          heighe: target.clientHeight
        });
      }
      if (!resize_eventStore.length) {
        eventListener();
      }
      if (!resize_eventStore.some(item => item === this)) {
        resize_eventStore.push(this);
      }
    }
  }
  unobserve(target) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().remove(resize_eventStore, item => item.tarList.some(observer => observer.target === target));
  }
  disconnect() {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().remove(resize_eventStore, item => item === this);
  }
}
const globalResize = {
  create(callback) {
    if (window.ResizeObserver) {
      return new window.ResizeObserver(callback);
    }
    return new XEResizeObserver(callback);
  }
};
;// CONCATENATED MODULE: ./packages/src/i18n.ts


function getI18n(key, args) {
  return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().toFormatString(external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().get(i18nConfigStore.langMaps[i18nConfigStore.language], key), args);
}
;// CONCATENATED MODULE: ./packages/src/log.ts

function createLog(type, name) {
  return function (key, args) {
    const msg = `[${name || 'vxe'} v${"0.9.0"}] ${getI18n(key, args)}`;
    console[type](msg);
    return msg;
  };
}
const log = {
  create: createLog,
  warn: createLog('warn'),
  err: createLog('error')
};
;// CONCATENATED MODULE: ./packages/src/renderer.ts


/**
 * 内置的组件渲染
 */
const renderMap = {};
/**
 * 全局渲染器
 */
const renderer = {
  mixin(opts) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().each(opts, (options, name) => renderer.add(name, options));
    return renderer;
  },
  get(name) {
    return renderMap[name] || null;
  },
  add(name, options) {
    if (name && options) {
      const renders = renderMap[name];
      if (renders) {
        // 检测是否覆盖
        if (true) {
          external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().each(options, (val, key) => {
            if (!external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().eqNull(renders[key]) && renders[key] !== val) {
              log.warn('vxe.error.coverProp', [`Renderer.${name}`, key]);
            }
          });
        }
        Object.assign(renders, options);
      } else {
        renderMap[name] = options;
      }
    }
    return renderer;
  },
  forEach(callback) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().objectEach(renderMap, callback);
    return renderer;
  },
  delete(name) {
    delete renderMap[name];
    return renderer;
  }
};
;// CONCATENATED MODULE: ./packages/src/store.ts



/**
 * 创建数据仓库
 */
class Store {
  constructor() {
    _defineProperty(this, "store", {});
  }
  mixin(options) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().each(options, (item, key) => {
      this.add(key, item);
    });
    return this;
  }
  has(name) {
    return !!this.get(name);
  }
  get(name) {
    return this.store[name];
  }
  add(name, options) {
    const conf = this.store[name];
    // 检测是否覆盖
    if (true) {
      const confKeys = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().keys(conf);
      external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().each(options, (item, key) => {
        if (confKeys.includes(key)) {
          log.warn('vxe.error.coverProp', [name, key]);
        }
      });
    }
    this.store[name] = conf ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().merge(conf, options) : options;
    return this;
  }
  delete(name) {
    delete this.store[name];
  }
  forEach(callback) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().objectEach(this.store, callback);
  }
}
/* harmony default export */ var store = (Store);
;// CONCATENATED MODULE: ./packages/src/validators.ts

const validators = new store();
if (true) {
  Object.assign(validators, {
    _name: 'Validators'
  });
}
;// CONCATENATED MODULE: ./packages/src/menus.ts



class VXEMenusStore {
  constructor() {
    _defineProperty(this, "store", {});
  }
  mixin(options) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().each(options, (item, key) => {
      this.add(key, item);
    });
    return this;
  }
  has(name) {
    return !!this.get(name);
  }
  get(name) {
    return this.store[name];
  }
  add(name, render) {
    const conf = this.store[name];
    // 兼容
    if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().isFunction(render)) {
      if (true) {
        log.warn('vxe.error.delProp', ['menus -> callback', 'menuMethod']);
      }
      render = {
        menuMethod: render
      };
    }
    // 检测是否覆盖
    if (true) {
      const confKeys = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().keys(conf);
      external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().each(render, (item, key) => {
        if (confKeys.includes(key)) {
          log.warn('vxe.error.coverProp', [name, key]);
        }
      });
    }
    this.store[name] = conf ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().merge(conf, render) : render;
    return this;
  }
  delete(name) {
    delete this.store[name];
  }
  forEach(callback) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().objectEach(this.store, callback);
  }
}
const menus = new VXEMenusStore();
if (true) {
  Object.assign(menus, {
    _name: 'Menus'
  });
}
;// CONCATENATED MODULE: ./packages/src/formats.ts



class VXEFormatsStore {
  constructor() {
    _defineProperty(this, "store", {});
  }
  mixin(options) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().each(options, (item, key) => {
      this.add(key, item);
    });
    return this;
  }
  has(name) {
    return !!this.get(name);
  }
  get(name) {
    return this.store[name];
  }
  add(name, render) {
    const conf = this.store[name];
    // 兼容
    if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().isFunction(render)) {
      if (true) {
        log.warn('vxe.error.delProp', ['formats -> callback', 'cellFormatMethod']);
      }
      render = {
        cellFormatMethod: render
      };
    }
    // 检测是否覆盖
    if (true) {
      const confKeys = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().keys(conf);
      external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().each(render, (item, key) => {
        if (confKeys.includes(key)) {
          log.warn('vxe.error.coverProp', [name, key]);
        }
      });
    }
    this.store[name] = conf ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().merge(conf, render) : render;
    return this;
  }
  delete(name) {
    delete this.store[name];
  }
  forEach(callback) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().objectEach(this.store, callback);
  }
}
const formats = new VXEFormatsStore();
if (true) {
  Object.assign(formats, {
    _name: 'Formats'
  });
}
;// CONCATENATED MODULE: ./packages/src/commands.ts



class VXECommandsStore {
  constructor() {
    _defineProperty(this, "store", {});
  }
  mixin(options) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().each(options, (item, key) => {
      this.add(key, item);
    });
    return this;
  }
  has(name) {
    return !!this.get(name);
  }
  get(name) {
    return this.store[name];
  }
  add(name, render) {
    const conf = this.store[name];
    // 兼容
    if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().isFunction(render)) {
      if (true) {
        log.warn('vxe.error.delProp', ['commands -> callback', 'commandMethod']);
      }
      render = {
        commandMethod: render
      };
    }
    // 检测是否覆盖
    if (true) {
      const confKeys = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().keys(conf);
      external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().each(render, (item, key) => {
        if (confKeys.includes(key)) {
          log.warn('vxe.error.coverProp', [name, key]);
        }
      });
    }
    this.store[name] = conf ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().merge(conf, render) : render;
    return this;
  }
  delete(name) {
    delete this.store[name];
  }
  forEach(callback) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().objectEach(this.store, callback);
  }
}
const commands = new VXECommandsStore();
if (true) {
  Object.assign(commands, {
    _name: 'Commands'
  });
}
;// CONCATENATED MODULE: ./packages/src/interceptor.ts



const storeMap = {};
const interceptor = {
  mixin(options) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().each(options, (callback, type) => {
      interceptor.add(type, callback);
    });
    return interceptor;
  },
  get(type) {
    return storeMap[type] || [];
  },
  add(type, callback) {
    if (callback) {
      let eList = storeMap[type];
      if (!eList) {
        eList = storeMap[type] = [];
      }
      // 检测重复
      if (true) {
        if (eList.indexOf(callback) > -1) {
          log.warn('vxe.error.coverProp', ['Interceptor', type]);
        }
      }
      eList.push(callback);
    }
    return interceptor;
  },
  delete(type, callback) {
    const eList = storeMap[type];
    if (eList) {
      if (callback) {
        external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().remove(eList, fn => fn === callback);
      } else {
        delete storeMap[type];
      }
    }
  }
};
;// CONCATENATED MODULE: ./packages/src/clipboard.ts
let copyElem;
function handleText(content) {
  if (!copyElem) {
    copyElem = document.createElement('textarea');
    copyElem.id = '$VxeCopy';
    const styles = copyElem.style;
    styles.width = '48px';
    styles.height = '24px';
    styles.position = 'fixed';
    styles.zIndex = '0';
    styles.left = '-500px';
    styles.top = '-500px';
    document.body.appendChild(copyElem);
  }
  copyElem.value = content === null || content === undefined ? '' : '' + content;
}
const clipboard = {
  /**
   * 复制内容到剪贴板
   *
   * @param {String} content Text 内容
   */
  copy(content) {
    let result = false;
    try {
      handleText(content);
      copyElem.select();
      copyElem.setSelectionRange(0, copyElem.value.length);
      result = document.execCommand('copy');
      copyElem.blur();
    } catch (e) {}
    return result;
  }
};
;// CONCATENATED MODULE: ./packages/src/hooks.ts

const hooks = new store();
// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(9274);
;// CONCATENATED MODULE: ./packages/src/use.ts

function useSize(props) {
  // 组件尺寸上下文
  const xeSizeInfo = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.inject)('xeSizeInfo', null);
  const computeSize = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.computed)(() => {
    return props.size || (xeSizeInfo ? xeSizeInfo.value : null);
  });
  (0,external_commonjs_vue_commonjs2_vue_root_Vue_.provide)('xeSizeInfo', computeSize);
  return {
    computeSize
  };
}
;// CONCATENATED MODULE: ./packages/src/core.ts


















function setTheme(name) {
  const theme = !name || name === 'default' ? 'light' : name;
  themeConfigStore.theme = theme;
  if (typeof document !== 'undefined') {
    const documentElement = document.documentElement;
    if (documentElement) {
      documentElement.setAttribute('data-vxe-ui-theme', theme);
    }
  }
  return VxeUI;
}
function getTheme() {
  return themeConfigStore.theme;
}
function setLanguage(locale) {
  i18nConfigStore.language = locale;
  return VxeUI;
}
function setI18n(locale, data) {
  i18nConfigStore.language = locale;
  i18nConfigStore.langMaps[i18nConfigStore.language] = data || {};
  return VxeUI;
}
/**
* 全局参数设置
*/
function setConfig(options) {
  if (options) {
    if (options.zIndex) {
      index_esm.setCurrent(options.zIndex);
    }
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().merge(globalConfigStore, options);
  }
  return VxeUI;
}
/**
* 获取全局参数
*/
function getConfig(key, defaultValue) {
  return arguments.length ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().get(globalConfigStore, key, defaultValue) : globalConfigStore;
}
function setIcon(options) {
  if (options) {
    Object.assign(iconConfigStore, options);
  }
  return VxeUI;
}
function getIcon(key) {
  return arguments.length ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default().get(iconConfigStore, key) : iconConfigStore;
}
const coreVersion = "0.9.0";
const VxeUI = {
  coreVersion,
  setTheme,
  getTheme,
  setConfig,
  getConfig: getConfig,
  setIcon,
  getIcon: getIcon,
  setLanguage,
  setI18n,
  getI18n: getI18n,
  globalEvents: globalEvents,
  globalResize: globalResize,
  renderer: renderer,
  validators: validators,
  menus: menus,
  formats: formats,
  commands: commands,
  interceptor: interceptor,
  clipboard: clipboard,
  log: log,
  hooks: hooks
};
setTheme();













/* harmony default export */ var core = (VxeUI);
;// CONCATENATED MODULE: ./packages/language/zh-CN.ts
/* harmony default export */ var zh_CN = ({
  vxe: {
    base: {
      pleaseInput: '请输入',
      pleaseSelect: '请选择'
    },
    loading: {
      text: '加载中...'
    },
    error: {
      groupFixed: '如果使用分组表头，冻结列必须按组设置',
      groupMouseRange: '分组表头与 "{0}" 不能同时使用，这可能会出现错误',
      groupTag: '分组列头应该使用 "{0}" 而不是 "{1}"，这可能会出现错误',
      scrollErrProp: '启用虚拟滚动后不支持该参数 "{0}"',
      errConflicts: '参数 "{0}" 与 "{1}" 有冲突',
      unableInsert: '无法插入到指定位置，请检查参数是否正确',
      useErr: '安装 "{0}" 模块时发生错误，可能顺序不正确，依赖的模块需要在 Table 之前安装',
      barUnableLink: '工具栏无法关联表格',
      expandContent: '展开行的插槽应该是 "content"，请检查是否正确',
      reqModule: '缺少 "{0}" 模块',
      reqProp: '缺少必要的 "{0}" 参数，这可能会导致出现错误',
      emptyProp: '参数 "{0}" 不允许为空',
      errProp: '不支持的参数 "{0}"，可能为 "{1}"',
      colRepet: 'column.{0}="{1}" 重复了，这可能会导致某些功能无法使用',
      notFunc: '方法 "{0}" 不存在',
      errFunc: '参数 "{0}" 不是一个方法',
      notValidators: '全局校验 "{0}" 不存在',
      notFormats: '全局格式化 "{0}" 不存在',
      notCommands: '全局指令 "{0}" 不存在',
      notSlot: '插槽 "{0}" 不存在',
      noTree: '树结构不支持 "{0}"',
      notProp: '不支持的参数 "{0}"',
      checkProp: '当数据量过大时可能会导致复选框卡顿，建议设置参数 "{0}" 提升渲染速度',
      coverProp: '"{0}" 的参数 "{1}" 重复定义，这可能会出现错误',
      delFunc: '方法 "{0}" 已废弃，请使用 "{1}"',
      delProp: '参数 "{0}" 已废弃，请使用 "{1}"',
      delEvent: '事件 "{0}" 已废弃，请使用 "{1}"',
      removeProp: '参数 "{0}" 已废弃，不建议使用，这可能会导致出现错误',
      errFormat: '全局的格式化内容应该使用 "VXETable.formats" 定义，挂载 "formatter={0}" 的方式已不建议使用',
      notType: '不支持的文件类型 "{0}"',
      notExp: '该浏览器不支持导入/导出功能',
      impFields: '导入失败，请检查字段名和数据格式是否正确',
      treeNotImp: '树表格不支持导入'
    },
    table: {
      emptyText: '暂无数据',
      allTitle: '全选/取消',
      seqTitle: '#',
      confirmFilter: '筛选',
      resetFilter: '重置',
      allFilter: '全部',
      sortAsc: '升序：最低到最高',
      sortDesc: '降序：最高到最低',
      filter: '对所选的列启用筛选',
      impSuccess: '成功导入 {0} 条记录',
      expLoading: '正在导出中',
      expSuccess: '导出成功',
      expFilename: '导出_{0}',
      expOriginFilename: '导出_源_{0}',
      customTitle: '列设置',
      customAll: '全部',
      customConfirm: '确认',
      customRestore: '重置',
      maxFixedCol: '最大冻结列的数量不能超过 {0} 个'
    },
    grid: {
      selectOneRecord: '请至少选择一条记录！',
      deleteSelectRecord: '您确定要删除所选记录吗？',
      removeSelectRecord: '您确定要移除所选记录吗？',
      dataUnchanged: '数据未改动！',
      delSuccess: '成功删除所选记录！',
      saveSuccess: '保存成功！',
      operError: '发生错误，操作失败！'
    },
    select: {
      search: '搜索',
      loadingText: '加载中',
      emptyText: '暂无数据'
    },
    pager: {
      goto: '前往',
      pagesize: '{0}条/页',
      total: '共 {0} 条记录',
      pageClassifier: '页',
      homePage: '首页',
      homePageTitle: '首页',
      prevPage: '上一页',
      prevPageTitle: '上一页',
      nextPage: '下一页',
      nextPageTitle: '下一页',
      prevJump: '向上跳页',
      prevJumpTitle: '向上跳页',
      nextJump: '向下跳页',
      nextJumpTitle: '向下跳页',
      endPage: '末页',
      endPageTitle: '末页'
    },
    alert: {
      title: '系统提示'
    },
    button: {
      confirm: '确认',
      cancel: '取消'
    },
    filter: {
      search: '搜索'
    },
    custom: {
      cstmTitle: '列设置',
      cstmRestore: '恢复默认',
      cstmCancel: '取消',
      cstmConfirm: '确定',
      cstmConfirmRestore: '请确认是否恢复成默认列配置？',
      cstmDragTarget: '移动目标：{0}',
      setting: {
        colSort: '排序',
        sortHelpTip: '点击并拖动图标可以调整列的排序',
        colTitle: '标题',
        colVisible: '是否显示',
        colFixed: '冻结列（最多 {0} 列）',
        fixedLeft: '左侧',
        fixedUnset: '不设置',
        fixedRight: '右侧'
      }
    },
    import: {
      modes: {
        covering: '覆盖',
        insert: '新增'
      },
      impTitle: '导入数据',
      impFile: '文件名',
      impSelect: '选择文件',
      impType: '文件类型',
      impOpts: '参数设置',
      impConfirm: '导入',
      impCancel: '取消'
    },
    export: {
      types: {
        csv: 'CSV (逗号分隔)(*.csv)',
        html: '网页(*.html)',
        xml: 'XML 数据(*.xml)',
        txt: '文本文件(制表符分隔)(*.txt)',
        xls: 'Excel 97-2003 工作簿(*.xls)',
        xlsx: 'Excel 工作簿(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: '当前数据（当前页的数据）',
        selected: '选中数据（当前页选中的数据）',
        all: '全量数据（包括所有分页的数据）'
      },
      printTitle: '打印数据',
      expTitle: '导出数据',
      expName: '文件名',
      expNamePlaceholder: '请输入文件名',
      expSheetName: '标题',
      expSheetNamePlaceholder: '请输入标题',
      expType: '保存类型',
      expMode: '选择数据',
      expCurrentColumn: '全部字段',
      expColumn: '选择字段',
      expOpts: '参数设置',
      expOptHeader: '表头',
      expHeaderTitle: '是否需要表头',
      expOptFooter: '表尾',
      expFooterTitle: '是否需要表尾',
      expOptColgroup: '分组表头',
      expColgroupTitle: '如果存在，则支持带有分组结构的表头',
      expOptMerge: '合并',
      expMergeTitle: '如果存在，则支持带有合并结构的单元格',
      expOptAllExpand: '展开层级',
      expAllExpandTitle: '如果存在，则支持将带有层级结构的数据全部展开',
      expOptUseStyle: '样式',
      expUseStyleTitle: '如果存在，则支持带样式的单元格',
      expOptOriginal: '源数据',
      expOriginalTitle: '如果为源数据，则支持导入到表格中',
      expPrint: '打印',
      expConfirm: '导出',
      expCancel: '取消'
    },
    modal: {
      zoomIn: '最大化',
      zoomOut: '还原',
      close: '关闭'
    },
    drawer: {
      close: '关闭'
    },
    form: {
      folding: '收起',
      unfolding: '展开'
    },
    toolbar: {
      import: '导入',
      export: '导出',
      print: '打印',
      refresh: '刷新',
      zoomIn: '全屏',
      zoomOut: '还原',
      custom: '列设置',
      customAll: '全部',
      customConfirm: '确认',
      customRestore: '重置',
      fixedLeft: '冻结在左侧',
      fixedRight: '冻结在右侧',
      cancelFixed: '取消冻结列'
    },
    input: {
      date: {
        m1: '01 月',
        m2: '02 月',
        m3: '03 月',
        m4: '04 月',
        m5: '05 月',
        m6: '06 月',
        m7: '07 月',
        m8: '08 月',
        m9: '09 月',
        m10: '10 月',
        m11: '11 月',
        m12: '12 月',
        quarterLabel: '{0} 年',
        monthLabel: '{0} 年',
        dayLabel: '{0} 年 {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'yyyy 年第 WW 周',
          month: 'yyyy-MM',
          quarter: 'yyyy 年第 q 季度',
          year: 'yyyy'
        },
        weeks: {
          w: '周',
          w0: '周日',
          w1: '周一',
          w2: '周二',
          w3: '周三',
          w4: '周四',
          w5: '周五',
          w6: '周六'
        },
        months: {
          m0: '一月',
          m1: '二月',
          m2: '三月',
          m3: '四月',
          m4: '五月',
          m5: '六月',
          m6: '七月',
          m7: '八月',
          m8: '九月',
          m9: '十月',
          m10: '十一月',
          m11: '十二月'
        },
        quarters: {
          q1: '第一季度',
          q2: '第二季度',
          q3: '第三季度',
          q4: '第四季度'
        }
      }
    },
    formDesign: {
      widget: {
        baseGroup: '基础控件',
        layoutGroup: '布局控件',
        advancedGroup: '高级控件',
        copyTitle: '副本_{0}',
        component: {
          input: '输入框',
          textarea: '文本域',
          select: '下拉框',
          row: '一行多列'
        }
      }
    },
    /**
     * 扩展插件
     */
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: '无法对合并单元格进行该操作',
          multiErr: '无法对多重选择区域进行该操作',
          extendErr: '如果延伸的区域包含被合并的单元格，所有合并的单元格需大小相同',
          pasteMultiErr: '无法粘贴，需要相同大小的复制的区域和粘贴的区域才能执行此操作',
          cpInvalidErr: '该操作无法进行，您选择的区域中存在被禁止的列（{0}）'
        },
        fnr: {
          title: '查找和替换',
          findLabel: '查找',
          replaceLabel: '替换',
          findTitle: '查找内容：',
          replaceTitle: '替换为：',
          tabs: {
            find: '查找',
            replace: '替换'
          },
          filter: {
            re: '正则表达式',
            whole: '全词匹配',
            sensitive: '区分大小写'
          },
          btns: {
            findNext: '查找下一个',
            findAll: '查找全部',
            replace: '替换',
            replaceAll: '替换全部',
            cancel: '取消'
          },
          header: {
            seq: '#',
            cell: '单元格',
            value: '值'
          },
          empty: '(空值)',
          reError: '无效的正则表达式',
          recordCount: '已找到 {0} 个单元格',
          notCell: '找不到匹配的单元格',
          replaceSuccess: '成功替换 {0} 个单元格'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: '冻结列',
          fixedGroup: '冻结分组',
          cancelFixed: '取消冻结',
          fixedLeft: '冻结左侧',
          fixedRight: '冻结右侧'
        },
        cases: {
          equal: '等于',
          gt: '大于',
          lt: '小于',
          begin: '开头是',
          endin: '结尾是',
          include: '包含',
          isSensitive: '区分大小写'
        }
      },
      filterCombination: {
        menus: {
          clearSort: '清除排序',
          sortAsc: '升序',
          sortDesc: '降序',
          fixedColumn: '冻结列',
          fixedGroup: '冻结分组',
          cancelFixed: '取消冻结',
          fixedLeft: '冻结左侧',
          fixedRight: '冻结右侧',
          clearFilter: '清除筛选',
          textOption: '文本筛选',
          numberOption: '数值筛选'
        },
        popup: {
          title: '自定义筛选的方式',
          currColumnTitle: '当前列：',
          and: '与',
          or: '或',
          describeHtml: '可用 ? 代表单个字符<br/>用 * 代表任意多个字符'
        },
        cases: {
          equal: '等于',
          unequal: '不等于',
          gt: '大于',
          ge: '大于或等于',
          lt: '小于',
          le: '小于或等于',
          begin: '开头是',
          notbegin: '开头不是',
          endin: '结尾是',
          notendin: '结尾不是',
          include: '包含',
          exclude: '不包含',
          between: '介于',
          custom: '自定义筛选',
          insensitive: '不区分大小写',
          isSensitive: '区分大小写'
        },
        empty: '(空白)',
        notData: '无匹配项'
      }
    },
    /**
     * 以下废弃
     * @deprecated
     */
    pro: {
      area: {
        mergeErr: '无法对合并单元格进行该操作',
        multiErr: '无法对多重选择区域进行该操作',
        extendErr: '如果延伸的区域包含被合并的单元格，所有合并的单元格需大小相同',
        pasteMultiErr: '无法粘贴，需要相同大小的复制的区域和粘贴的区域才能执行此操作'
      },
      fnr: {
        title: '查找和替换',
        findLabel: '查找',
        replaceLabel: '替换',
        findTitle: '查找内容：',
        replaceTitle: '替换为：',
        tabs: {
          find: '查找',
          replace: '替换'
        },
        filter: {
          re: '正则表达式',
          whole: '全词匹配',
          sensitive: '区分大小写'
        },
        btns: {
          findNext: '查找下一个',
          findAll: '查找全部',
          replace: '替换',
          replaceAll: '替换全部',
          cancel: '取消'
        },
        header: {
          seq: '#',
          cell: '单元格',
          value: '值'
        },
        empty: '(空值)',
        reError: '无效的正则表达式',
        recordCount: '已找到 {0} 个单元格',
        notCell: '找不到匹配的单元格',
        replaceSuccess: '成功替换 {0} 个单元格'
      }
    },
    renderer: {
      search: '搜索',
      cases: {
        equal: '等于',
        unequal: '不等于',
        gt: '大于',
        ge: '大于或等于',
        lt: '小于',
        le: '小于或等于',
        begin: '开头是',
        notbegin: '开头不是',
        endin: '结尾是',
        notendin: '结尾不是',
        include: '包含',
        exclude: '不包含',
        between: '介于',
        custom: '自定义筛选',
        insensitive: '不区分大小写',
        isSensitive: '区分大小写'
      },
      combination: {
        menus: {
          clearSort: '清除排序',
          sortAsc: '升序',
          sortDesc: '降序',
          fixedColumn: '锁定列',
          fixedGroup: '锁定组',
          cancelFixed: '取消锁定',
          fixedLeft: '锁定左侧',
          fixedRight: '锁定右侧',
          clearFilter: '清除筛选',
          textOption: '文本筛选',
          numberOption: '数值筛选'
        },
        popup: {
          title: '自定义筛选的方式',
          currColumnTitle: '当前列：',
          and: '与',
          or: '或',
          describeHtml: '可用 ? 代表单个字符<br/>用 * 代表任意多个字符'
        },
        empty: '(空白)',
        notData: '无匹配项'
      }
    }
  }
});
;// CONCATENATED MODULE: ./packages/index.ts


// 默认中文
setI18n('zh-CN', zh_CN);
setTheme('light');

/* harmony default export */ var packages_0 = (core);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (packages_0);


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});