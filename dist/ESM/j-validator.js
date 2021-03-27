/*!@preserve@license
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：6.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-validator/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-validator/
 */

var version = '6.0.0';

var TypeError$1 = TypeError;

var SyntaxError$1 = SyntaxError;

var RegExp$1 = RegExp;

var test = RegExp.prototype.test;

var bind = Function.prototype.bind;

var Object_is = Object.is;

var UNDEFINED = void 0;

var Object$1 = Object;

var create = Object$1.create || (
	/*! j-globals: Object.create (polyfill) */
	/*#__PURE__*/ function () {
		var NULL;
		if ( document.domain ) {
			try { dom = new ActiveXObject('htmlfile'); }
			catch (error) { }
		}
		if ( dom ) {
			dom.write('<script><\/script>');
			dom.close();
			NULL = dom.parentWindow.Object.prototype;
		}
		else {
			dom = document.createElement('iframe');
			dom.setAttribute('style', 'display:none !important;_display:none;');//dom.style.display = 'none';
			var parent = document.body || document.documentElement;
			parent.appendChild(dom);
			dom.src = 'javascript:';
			NULL = dom.contentWindow.Object.prototype;
			parent.removeChild(dom);
		}
		var dom = null;
		delete NULL.constructor;
		delete NULL.hasOwnProperty;
		delete NULL.isPrototypeOf;
		delete NULL.propertyIsEnumerable;
		delete NULL.toLocaleString;
		delete NULL.toString;
		delete NULL.valueOf;
		var Null = function () {};
		Null.prototype = NULL;
		var constructor = function () {};
		function __PURE__ (o, properties) {
			if ( properties!==UNDEFINED ) { throw TypeError('CAN NOT defineProperties in ES 3 Object.create polyfill'); }
			if ( o===null ) { return new Null; }
			if ( Object$1(o)!==o ) { throw TypeError('Object prototype may only be an Object or null: '+o); }
			constructor.prototype = o;
			var created = new constructor;
			constructor.prototype = NULL;
			return created;
		}
		return function create (o, properties) {
			return /*#__PURE__*/ __PURE__(o, properties);
		};
	}()
	/*¡ j-globals: Object.create (polyfill) */
);

var toString = Object.prototype.toString;

var isArray = (
	/*! j-globals: Array.isArray (polyfill) */
	Array.isArray || function isArray (value) {
		return /*#__PURE__*/ toString.apply(value)==='[object Array]';
	}
	/*¡ j-globals: Array.isArray (polyfill) */
);

var hasOwnProperty = Object.prototype.hasOwnProperty;

var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

var INFINITY = 1/0;

var Null_prototype = (
	/*! j-globals: null.prototype (internal) */
	Object.seal
		? /*#__PURE__*/Object.preventExtensions(Object.create(null))
		: null
	/*¡ j-globals: null.prototype (internal) */
);

var isPrimitive = (
	/*! j-globals: class.isPrimitive (internal) */
	function isPrimitive (argument) {
		return Object$1(argument)!==argument;
	}
	/*¡ j-globals: class.isPrimitive (internal) */
);

var Function_prototype_apply = Function.prototype.apply;

var hasOwn = hasOwnProperty.bind
	? /*#__PURE__*/hasOwnProperty.call.bind(hasOwnProperty)
	: function (object, key) { return /*#__PURE__*/hasOwnProperty.call(object, key); };// && object!=null
var MAX_ARRAY_LENGTH = /*  */4294967295;// 0x00000000FFFFFFFF // 0b00000000000000000000011111111111111111111111111111111 // 0o0000000000037777777777 // 2**32-1
var LIKE_ARRAY_INDEX = /^(?:0|[1-4]\d{0,9}|[5-9]\d{0,8})$/;
function isArrayIndex (key) {
	return LIKE_ARRAY_INDEX.test(key) && key<MAX_ARRAY_LENGTH;
}

var getOwnPropertyNames = (
	/*! j-globals: Object.getOwnPropertyNames (polyfill) */
	/*#__PURE__*/ function () {
		
		var Object_getOwnPropertyNames = Object$1.getOwnPropertyNames;
		if ( Object_getOwnPropertyNames ) {
			try {
				Object_getOwnPropertyNames(0);
				return Object_getOwnPropertyNames;
			}
			catch (error) { }
			return function getOwnPropertyNames (object) {
				return Object_getOwnPropertyNames(object==null ? object : Object$1(object));
			};
		}
		
		var string_noIndex = !'_'.hasOwnProperty(0);
		
		if ( !{ 'toString': null }.propertyIsEnumerable('toString') ) {
			var hasNotEnumOwnButNotNativePrototypeBug = function hasNotEnumOwnButNotNativePrototypeBug (object, name, names) {
				for ( var index = names.length; index--; ) {
					if ( names[index]==='name' ) { return false; }
				}
				return true;
			};
		}
		
		function __PURE__ (object) {
			
			if ( object==null ) { throw TypeError('Cannot convert undefined or null to object'); }
			
			var length,
				index = 0,
				name,
				names = [];
			
			switch ( typeof object ) {
				
				case 'object':
					if ( hasOwnProperty.call(object, 'length') && !propertyIsEnumerable.call(object, 'length') ) {
						if ( toString.apply(object)==='[object Array]' ) {
							for ( name in object ) { if ( hasOwnProperty.call(object, name) && isArrayIndex(name) ) { names[index++] = name; } }
						}
						else {
							if ( string_noIndex && toString.apply(object)==='[object String]' ) { throw TypeError('stringObject\'s index keys have bug in ES3'); }
							for ( length = object.length; index<length; ++index ) { if ( hasOwnProperty.call(object, index) ) { names[index] = ''+index; } }
							for ( name in object ) { if ( hasOwnProperty.call(object, name) && isArrayIndex(name) && name>=length ) { names[index++] = name; } }
							if ( hasOwnProperty.call(object, 'callee') && !propertyIsEnumerable.call(object, 'callee') ) { names[index++] = 'callee'; }
						}
						names[index++] = 'length';
						for ( name in object ) { if ( hasOwnProperty.call(object, name) && !isArrayIndex(name) ) { names[index++] = name; } }
					}
					else {
						for ( name in object ) { if ( hasOwnProperty.call(object, name) ) { names[index++] = name; } }
					}
					break;
				
				case 'function':
					for ( name in object ) { if ( hasOwnProperty.call(object, name) && isArrayIndex(name) ) { names[index++] = name; } }
					if ( hasOwnProperty.call(object, 'prototype') && !propertyIsEnumerable.call(object, 'prototype') ) { names[index++] = 'prototype'; }
					if ( hasOwnProperty.call(object, 'caller') && !propertyIsEnumerable.call(object, 'caller') ) { names[index++] = 'caller'; }
					if ( hasOwnProperty.call(object, 'arguments') && !propertyIsEnumerable.call(object, 'arguments') ) { names[index++] = 'arguments'; }
					if ( hasOwnProperty.call(object, 'length') && !propertyIsEnumerable.call(object, 'length') ) { names[index++] = 'length'; }
					for ( name in object ) { if ( hasOwnProperty.call(object, name) && !isArrayIndex(name) ) { names[index++] = name; } }
					break;
				
				case 'string':
					throw TypeError('string[index] keys have bug in ES3');
				//	for ( length = object.length; index<length; ++index ) { names[index] = ''+index; }
				//	return names;
				default:
					for ( name in object = Object$1(object) ) { if ( hasOwnProperty.call(object, name) ) { names[index++] = name; } }
					break;
			}
			
			if ( hasNotEnumOwnButNotNativePrototypeBug ) {
				if ( hasNotEnumOwnButNotNativePrototypeBug(object, 'toString', names) ) { names[index++] = 'toString'; }
				if ( hasNotEnumOwnButNotNativePrototypeBug(object, 'toLocaleString', names) ) { names[index++] = 'toLocaleString'; }
				if ( hasNotEnumOwnButNotNativePrototypeBug(object, 'valueOf', names) ) { names[index++] = 'valueOf'; }
				if ( hasNotEnumOwnButNotNativePrototypeBug(object, 'hasOwnProperty', names) ) { names[index++] = 'hasOwnProperty'; }
				if ( hasNotEnumOwnButNotNativePrototypeBug(object, 'isPrototypeOf', names) ) { names[index++] = 'isPrototypeOf'; }
				if ( hasNotEnumOwnButNotNativePrototypeBug(object, 'propertyIsEnumerable', names) ) { names[index++] = 'propertyIsEnumerable'; }
				if ( hasNotEnumOwnButNotNativePrototypeBug(object, 'constructor', names) ) { names[index] = 'constructor'; }
			}
			
			return names;
			
		}
		
		return function getOwnPropertyNames (object) {
			return /*#__PURE__*/ __PURE__(object);
		};
		
	}()
	/*¡ j-globals: Object.getOwnPropertyNames (polyfill) */
);

var getOwnPropertySymbols = Object.getOwnPropertySymbols;

var push = Array.prototype.push;

var ownKeys = typeof Reflect==='object' ? Reflect.ownKeys : (
	/*! j-globals: Reflect.ownKeys (polyfill) */
	/*#__PURE__*/ function () {
		
		var __PURE__;
		
		var Object_getOwnPropertyNames = Object.getOwnPropertyNames;
		if ( Object_getOwnPropertyNames ) {
			try { Object_getOwnPropertyNames(0); }
			catch (error) {
				if ( getOwnPropertySymbols ) {
					__PURE__ = function ownKeys (object) {
						var keys = Object_getOwnPropertyNames(object);
						push.apply(keys, getOwnPropertySymbols);
						return keys;
					};
				}
				else { return Object_getOwnPropertyNames; }
			}
		}
		else { Object_getOwnPropertyNames = getOwnPropertyNames; }
		
		if ( !__PURE__ ) {
			__PURE__ = getOwnPropertySymbols
				? function ownKeys (object) {
					if ( isPrimitive(object) ) { throw TypeError('Reflect.ownKeys called on non-object'); }
					var keys = Object_getOwnPropertyNames(object);
					push.apply(keys, getOwnPropertySymbols);
					return keys;
				}
				: function ownKeys (object) {
					if ( isPrimitive(object) ) { throw TypeError('Reflect.ownKeys called on non-object'); }
					return Object_getOwnPropertyNames(object);
				};
		}
		
		return function ownKeys (object) {
			return /*#__PURE__*/ __PURE__(object);
		};
		
	}()
	/*¡ j-globals: Reflect.ownKeys (polyfill) */
);

var apply = typeof Reflect==='object' ? Reflect.apply : (
	/*! j-globals: Reflect.apply (polyfill) */
	Function_prototype_apply.bind
		? /*#__PURE__*/Function_prototype_apply.call.bind(Function_prototype_apply)
		: function apply (target, thisArg, args) { return Function_prototype_apply.call(target, thisArg, args); }
	/*¡ j-globals: Reflect.apply (polyfill) */
);

var ARGS = { length: 1, 0: '' };
var isRegExp = (
	/*! j-globals: class.isRegExp (internal) */
	function isRegExp (value) {
		try { apply(test, value, ARGS); }
		catch (error) { return false; }
		return true;
	}
	/*¡ j-globals: class.isRegExp (internal) */
);

var toStringTag = typeof Symbol==='undefined' ? UNDEFINED : Symbol.toStringTag;

var assign = Object.assign;

var freeze = Object.freeze;

var defineProperty = (
	/*! j-globals: Object.defineProperty (fallback) */
	Object.seal && Object.defineProperty
	/*¡ j-globals: Object.defineProperty (fallback) */
);

var Default = (
	/*! j-globals: default (internal) */
	function Default (exports, addOnOrigin) {
		return /*#__PURE__*/ function Module (exports, addOnOrigin) {
			if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(Null_prototype); }
			if ( assign ) { assign(exports, addOnOrigin); }
			else {
				for ( var key in addOnOrigin ) { if ( hasOwn(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } }
				for ( key in { 'toString': null } ) { if ( key==='toString' ) { break; } }
				if ( key!=='toString' ) {
					var keys = [ 'constructor', 'propertyIsEnumerable', 'isPrototypeOf', 'hasOwnProperty', 'valueOf', 'toLocaleString', 'toString' ];
					var index = 7;
					while ( index-- ) { if ( hasOwn(addOnOrigin, key = keys[index]) ) { exports[key] = addOnOrigin[key]; } }
				}
			}
			exports['default'] = exports;
			if ( freeze ) {
				if ( toStringTag ) {
					var descriptor = create(Null_prototype);
					descriptor.value = 'Module';
					defineProperty(exports, toStringTag, descriptor);
				}
				typeof exports==='function' && exports.prototype && freeze(exports.prototype);
				freeze(exports);
			}
			return exports;
		}(exports, addOnOrigin);
	}
	/*¡ j-globals: default (internal) */
);

var test_bind = bind
	? /*#__PURE__*/ bind.bind(test)                                                                       
	: function (            re        ) {
		return function (            string        ) {
			return test.call(re, string);
		};
	};

var _INFINITY = -INFINITY;

function any ()          { return true; }
function never ()          { return false; }

function bigint (value         )          { return typeof value==='bigint'; }
var bigint_ = { '!bigint': function (value         )          { return typeof value!=='bigint'; } }['!bigint'];
function symbol (value         )          { return typeof value==='symbol'; }
var symbol_ = { '!symbol': function (value         )          { return typeof value!=='symbol'; } }['!symbol'];
function string (value         )          { return typeof value==='string'; }
var string_ = { '!string': function (value         )          { return typeof value!=='string'; } }['!string'];
var BOOLEAN = { 'boolean': function (value         )          { return value===true || value===false; } }['boolean'];
var boolean_ = { '!boolean': function (value         )          { return value!==true && value!==false; } }['!boolean'];
function number (value         )          { return typeof value==='number'; }
var number_ = { '!number': function (value         )          { return typeof value!=='number'; } }['!number'];
function undefined$1 (value         )          { return value===UNDEFINED; }
var undefined_ = { '!undefined': function (value         )          { return value!==UNDEFINED; } }['!undefined'];

var NULL = { 'null': function (value         )          { return value===null; } }['null'];
var NULL_ = { '!null': function (value         )          { return value!==null; } }['!null'];
var TRUE = { 'true': function (value         )          { return value===true; } }['true'];
var TRUE_ = { '!true': function (value         )          { return value!==true; } }['!true'];
var FALSE = { 'false': function (value         )          { return value===false; } }['false'];
var FALSE_ = { '!false': function (value         )          { return value!==false; } }['!false'];

function Infinity (value         )          { return value===INFINITY; }
Infinity.valueOf = function (                     )         { return INFINITY; };
var Infinity_ = { '!Infinity': function (value         )          { return value!==INFINITY; } }['!Infinity'];
var _Infinity = { '-Infinity': function (value         )          { return value===_INFINITY; } }['-Infinity'];
var _Infinity_ = { '!-Infinity': function (value         )          { return value!==_INFINITY; } }['!-Infinity'];

function NaN (value         )          { return value!==value; }
var NaN_ = { '!NaN': function (value         )          { return value===value; } }['!NaN'];

var O            = Object_is
	? function O (value         )          { return Object_is (value, 0); }
	: function O (value         )          { return value===0 && 1/value>0; };
var O_            = Object_is
	? function O_ (value         )          { return !Object_is (value, 0); }
	: function O_ (value         )          { return value!==0 || 1/value<0; };
var _O            = Object_is
	? function _O (value         )          { return Object_is (value, -0); }
	: function _O (value         )          { return value===0 && 1/value<0; };
var _O_            = Object_is
	? function _O_ (value         )          { return !Object_is (value, -0); }
	: function _O_ (value         )          { return value!==0 || 1/value>0; };

function StringTester (type        , FALSE         )            {
	if ( type.global ) { type = RegExp$1(type.source, type.flags ? type.flags.replace('g', '') : ( type.ignoreCase ? 'i' : '' ) + ( type.multiline ? 'm' : '' )); }
	var type_test = test_bind(type);
	return FALSE
		? function tester (value         )          { return typeof value!=='string' || !type_test(value); }
		: function tester (value         )          { return typeof value==='string' && type_test(value); };
}

function OBJECT                   (value         , index        , expectKeys                    , validators                                          )          {
	if ( typeof value!=='object' || !value ) { return false; }
	while ( index ) {
		var key = expectKeys[--index] ;
		if ( !validators[key](( value      )[key]) ) { return false; }
	}
	return true;
}
function OBJECT_STRICT                   (value         , index        , expectKeys                    , validators                                          )          {
	if ( typeof value!=='object' || !value || isArray(value) ) { return false; }
	while ( index ) {
		var key = expectKeys[--index] ;
		if ( !validators[key](( value      )[key]) ) { return false; }
	}
	for ( var keys = ownKeys(value), length         = keys.length; index<length; ++index ) {
		if ( !( keys[index]  in validators ) ) { return false; }
	}
	return true;
}
function ObjectValidator                   (type   , FALSE         , strict         )            {
	var expectKeys = ownKeys(type).reverse();
	var expectLength         = expectKeys.length;
	var validators = create(Null_prototype)                                   ;
	for ( var index         = expectLength; index; ) {
		var key = expectKeys[--index] ;
		validators[key] = is(type[key]);
	}
	return strict
		? FALSE
			? function object (value         )          { return !OBJECT_STRICT   (value, expectLength, expectKeys, validators); }
			: function object (value         )          { return OBJECT_STRICT   (value, expectLength, expectKeys, validators); }
		: FALSE
			? function object (value         )          { return !OBJECT   (value, expectLength, expectKeys, validators); }
			: function object (value         )          { return OBJECT   (value, expectLength, expectKeys, validators); };
}

function ARRAY (value         , length        , validators                      )          {
	if ( !isArray(value) || value.length!==length ) { return false; }
	for ( var index         = 0; index<length; ++index ) {
		if ( !validators[index] (value[index]) ) { return false; }
	}
	return true;
}
function ArrayValidator (type                    , FALSE         )            {
	var length         = type.length;
	var validators              = [];
	for ( var index         = 0; index<length; ++index ) { validators[index] = is(type[index]); }
	return FALSE
		? function array (value         )          { return !ARRAY(value, length, validators); }
		: function array (value         )          { return ARRAY(value, length, validators); };
}

function is (type         )            {
	return typeof type==='function' ? type              :
		type===UNDEFINED ? undefined$1 :
			type===true ? TRUE : type===false ? FALSE :
				type===null ? NULL :
					typeof type==='object' ?
						/*#__PURE__*/ isArray(type) ? ArrayValidator(type, false) :
						isRegExp(type) ? /*#__PURE__*/ StringTester(type, false) :
							ObjectValidator(type          , false, false) :
						O(type) ? O : _O(type) ? _O :
							type!==type ? NaN :
								type===INFINITY ? Infinity : type===_INFINITY ? _Infinity :
									function isType (value         )          { return value===type; };
}
function not (type         )            {
	if ( typeof type==='function' ) {
		switch ( type ) {
			case undefined$1: return undefined_;
			case undefined_: return undefined$1;
			case bigint: return bigint_;
			case bigint_: return bigint;
			case string: return string_;
			case string_: return string;
			case BOOLEAN: return boolean_;
			case boolean_: return BOOLEAN;
			case TRUE: return TRUE_;
			case TRUE_: return TRUE;
			case FALSE: return FALSE_;
			case FALSE_: return FALSE;
			case NULL: return NULL_;
			case NULL_: return NULL;
			case number: return number_;
			case number_: return number;
			case Infinity: return Infinity_;
			case Infinity_: return Infinity;
			case _Infinity: return _Infinity_;
			case _Infinity_: return _Infinity;
			case O: return O_;
			case O_: return O;
			case _O: return _O_;
			case _O_: return _O;
			case symbol: return symbol_;
			case symbol_: return symbol;
		}
		return function notType (value         )          { return !type(value); };
	}
	return type===UNDEFINED ? undefined_ :
		type===true ? TRUE_ : type===false ? FALSE_ :
			type===null ? NULL_ :
				typeof type==='object' ?
					isArray(type) ? /*#__PURE__*/ ArrayValidator(type, true) :
						isRegExp(type) ? /*#__PURE__*/ StringTester(type, true) :
							/*#__PURE__*/ ObjectValidator(type          , true, false) :
					type===0 ? O_(type) ? _O_ : O_ :
						type!==type ? NaN_ :
							type===INFINITY ? Infinity_ : type===_INFINITY ? _Infinity_ :
								function notType (value         )          { return value!==type; };
}

function strict (type        )            {
	if ( isArray(type) || isRegExp(type) ) { throw TypeError$1('strict(argument can not be an array or regExp)'); }
	return /*#__PURE__*/ ObjectValidator(type, false, true);
}
strict.not = function strict_not (type        )            {
	if ( isArray(type) || isRegExp(type) ) { throw TypeError$1('strict.not(argument can not be an array or regExp)'); }
	return /*#__PURE__*/ ObjectValidator(type, true, true);
};

function optional (type         )            {
	var validator            = is(type);
	return function optionalValidator (value         )          { return value===UNDEFINED || validator(value); };
}

function OR (value         , length        , validators                      )          {
	for ( var index         = 0; index<length; ++index ) {
		if ( validators[index] (value) ) { return true; }
	}
	return false;
}
function or (type         )            {
	var types                     = arguments.length===1 && isArray(type) ? type : arguments;
	var length         = types.length;
	var validators              = [];
	for ( var index         = 0; index<length; ++index ) { validators[index] = is(types[index]); }
	return function or (value         )          { return OR(value, length, validators); };
}
function AND (value         , length        , validators                      )          {
	for ( var index         = 0; index<length; ++index ) {
		if ( !validators[index] (value) ) { return false; }
	}
	return true;
}
function and (type         )            {
	var types                     = arguments.length===1 && isArray(type) ? type : arguments;
	var length         = types.length;
	var validators              = [];
	for ( var index         = 0; index<length; ++index ) { validators[index] = is(types[index]); }
	return function and (value         )          { return AND(value, length, validators); };
}

function EVERY (value         , validator           )          {
	if ( !isArray(value) ) { return false; }
	for ( var length         = value.length, index         = 0; index<length; ++index ) {
		if ( !validator(value[index]) ) { return false; }
	}
	return true;
}
function every (type         )            {
	var validator            = is(type);
	return function array (value         )          { return EVERY(value, validator); };
}

                                                     
                                          
function TUPLE (value         , rootPatterns          )          {
	if ( !isArray(value) ) { return false; }
	var patterns                  = rootPatterns;
	var patternIndex         = patterns.length;
	var subValue          = value[0];
	var subIndex         = 0;
	for ( ; ; ) {
		var pattern          = patterns[--patternIndex] ;
		if ( pattern(subValue) ) {
			patterns = pattern.rest;
			if ( !patterns ) { return true; }
			patternIndex = patterns.length;
			subValue = value[++subIndex];
		}
		else if ( !patternIndex ) { return false; }
	}
}
function unshift_call (array                   , item     )       {
	var index         = array.length;
	do { array[index] = array[--index] ; }
	while ( index );
	array[0] = item;
}
function tuple (template                      ) {
	var raw                    = template.raw;
	var length         = arguments.length - 1;
	if ( !length ) { throw SyntaxError$1('tuple'); }
	var s         = raw[0] ;
	var lastIndexAfterLF         = s.lastIndexOf('\n') + 1;
	if ( !lastIndexAfterLF ) { throw SyntaxError$1('tuple'); }
	var LEVEL         = s.length - lastIndexAfterLF;
	var index         = 0;
	var allPatterns            = [];
	do { ( allPatterns[index] = is(arguments[++index])            ).rest = null; }
	while ( index<length );
	index = 0;
	var rootPatterns           = [ allPatterns[0]  ];
	var level         = function callee (patterns          , LEVEL        )         {
		while ( ++index<length ) {
			var s         = raw[index] ;
			var lastIndexAfterLF = s.lastIndexOf('\n') + 1;
			if ( !lastIndexAfterLF ) { throw SyntaxError$1('tuple'); }
			var level = s.length - lastIndexAfterLF;
			if ( level<LEVEL ) { return level; }
			if ( level===LEVEL ) { unshift_call(patterns, allPatterns[index] ); }
			else {
				level = callee(patterns[0] .rest = [ allPatterns[index]  ], level);
				if ( level<LEVEL ) { return level; }
				if ( level!==LEVEL ) { throw SyntaxError$1('tuple'); }
				unshift_call(patterns, allPatterns[index] );
			}
		}
		return -1;
	}(rootPatterns, LEVEL);
	if ( 0<=level && level<LEVEL ) { throw SyntaxError$1('tuple'); }
	return function tuple (value         )          { return TUPLE(value, rootPatterns); };
}
var _export = Default({
	is: is, not: not,
	and: and, or: or,
	bigint: bigint, symbol: symbol, string: string, 'boolean': BOOLEAN, number: number,
	undefined: undefined$1, NaN: NaN, Infinity: Infinity,
	every: every, tuple: tuple,
	optional: optional, strict: strict,
	any: any, never: never,
	version: version
});

export default _export;
export { Infinity, NaN, and, any, bigint, BOOLEAN as boolean, every, is, never, not, number, optional, or, strict, string, symbol, tuple, undefined$1 as undefined, version };

/*¡ j-validator */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCc2LjAuMCc7IiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgYmluZCBmcm9tICcuRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ/JztcbmltcG9ydCBPYmplY3RfaXMgZnJvbSAnLk9iamVjdC5pcz8nO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5Pz0nO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz89JztcbmltcG9ydCBJTkZJTklUWSBmcm9tICcuSW5maW5pdHknO1xuaW1wb3J0IFVOREVGSU5FRCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOdWxsX3Byb3RvdHlwZSBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuaW1wb3J0IGlzUmVnRXhwIGZyb20gJy5jbGFzcy5pc1JlZ0V4cCc7XG5cbnZhciB0ZXN0X2JpbmQgPSBiaW5kXG5cdD8gLyojX19QVVJFX18qLyBiaW5kLmJpbmQodGVzdCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQ6IGZ1bmN0aW9uICggICAgICAgICAgICByZSAgICAgICAgKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzdHJpbmcgICAgICAgICkge1xuXHRcdFx0cmV0dXJuIHRlc3QuY2FsbChyZSwgc3RyaW5nKTtcblx0XHR9O1xuXHR9O1xuXG52YXIgX0lORklOSVRZID0gLUlORklOSVRZO1xuXG5leHBvcnQgZnVuY3Rpb24gYW55ICgpICAgICAgICAgIHsgcmV0dXJuIHRydWU7IH1cbmV4cG9ydCBmdW5jdGlvbiBuZXZlciAoKSAgICAgICAgICB7IHJldHVybiBmYWxzZTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gYmlnaW50ICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J2JpZ2ludCc7IH1cbnZhciBiaWdpbnRfID0geyAnIWJpZ2ludCc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J2JpZ2ludCc7IH0gfVsnIWJpZ2ludCddO1xuZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbCAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzeW1ib2wnOyB9XG52YXIgc3ltYm9sXyA9IHsgJyFzeW1ib2wnOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSE9PSdzeW1ib2wnOyB9IH1bJyFzeW1ib2wnXTtcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmcgKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJzsgfVxudmFyIHN0cmluZ18gPSB7ICchc3RyaW5nJzogZnVuY3Rpb24gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWUhPT0nc3RyaW5nJzsgfSB9Wychc3RyaW5nJ107XG52YXIgQk9PTEVBTiA9IHsgJ2Jvb2xlYW4nOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09dHJ1ZSB8fCB2YWx1ZT09PWZhbHNlOyB9IH1bJ2Jvb2xlYW4nXTtcbmV4cG9ydCB7IEJPT0xFQU4gYXMgYm9vbGVhbiB9O1xudmFyIGJvb2xlYW5fID0geyAnIWJvb2xlYW4nOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09dHJ1ZSAmJiB2YWx1ZSE9PWZhbHNlOyB9IH1bJyFib29sZWFuJ107XG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J251bWJlcic7IH1cbnZhciBudW1iZXJfID0geyAnIW51bWJlcic6IGZ1bmN0aW9uICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J251bWJlcic7IH0gfVsnIW51bWJlciddO1xuZXhwb3J0IGZ1bmN0aW9uIHVuZGVmaW5lZCAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09VU5ERUZJTkVEOyB9XG52YXIgdW5kZWZpbmVkXyA9IHsgJyF1bmRlZmluZWQnOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09VU5ERUZJTkVEOyB9IH1bJyF1bmRlZmluZWQnXTtcblxudmFyIE5VTEwgPSB7ICdudWxsJzogZnVuY3Rpb24gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PW51bGw7IH0gfVsnbnVsbCddO1xudmFyIE5VTExfID0geyAnIW51bGwnOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09bnVsbDsgfSB9WychbnVsbCddO1xudmFyIFRSVUUgPSB7ICd0cnVlJzogZnVuY3Rpb24gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PXRydWU7IH0gfVsndHJ1ZSddO1xudmFyIFRSVUVfID0geyAnIXRydWUnOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09dHJ1ZTsgfSB9WychdHJ1ZSddO1xudmFyIEZBTFNFID0geyAnZmFsc2UnOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09ZmFsc2U7IH0gfVsnZmFsc2UnXTtcbnZhciBGQUxTRV8gPSB7ICchZmFsc2UnOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09ZmFsc2U7IH0gfVsnIWZhbHNlJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmZpbml0eSAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09SU5GSU5JVFk7IH1cbkluZmluaXR5LnZhbHVlT2YgPSBmdW5jdGlvbiAoICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIElORklOSVRZOyB9O1xudmFyIEluZmluaXR5XyA9IHsgJyFJbmZpbml0eSc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT1JTkZJTklUWTsgfSB9WychSW5maW5pdHknXTtcbnZhciBfSW5maW5pdHkgPSB7ICctSW5maW5pdHknOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09X0lORklOSVRZOyB9IH1bJy1JbmZpbml0eSddO1xudmFyIF9JbmZpbml0eV8gPSB7ICchLUluZmluaXR5JzogZnVuY3Rpb24gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PV9JTkZJTklUWTsgfSB9WychLUluZmluaXR5J107XG5cbmV4cG9ydCBmdW5jdGlvbiBOYU4gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXZhbHVlOyB9XG52YXIgTmFOXyA9IHsgJyFOYU4nOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09dmFsdWU7IH0gfVsnIU5hTiddO1xuXG52YXIgTyAgICAgICAgICAgID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gTyAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9iamVjdF9pcyAodmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gTyAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09MCAmJiAxL3ZhbHVlPjA7IH07XG52YXIgT18gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIE9fICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gIU9iamVjdF9pcyAodmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gT18gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PTAgfHwgMS92YWx1ZTwwOyB9O1xudmFyIF9PICAgICAgICAgICAgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBfTyAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9iamVjdF9pcyAodmFsdWUsIC0wKTsgfVxuXHQ6IGZ1bmN0aW9uIF9PICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT0wICYmIDEvdmFsdWU8MDsgfTtcbnZhciBfT18gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIF9PXyAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuICFPYmplY3RfaXMgKHZhbHVlLCAtMCk7IH1cblx0OiBmdW5jdGlvbiBfT18gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PTAgfHwgMS92YWx1ZT4wOyB9O1xuXG5mdW5jdGlvbiBTdHJpbmdUZXN0ZXIgKHR5cGUgICAgICAgICwgRkFMU0UgICAgICAgICApICAgICAgICAgICAge1xuXHRpZiAoIHR5cGUuZ2xvYmFsICkgeyB0eXBlID0gUmVnRXhwKHR5cGUuc291cmNlLCB0eXBlLmZsYWdzID8gdHlwZS5mbGFncy5yZXBsYWNlKCdnJywgJycpIDogKCB0eXBlLmlnbm9yZUNhc2UgPyAnaScgOiAnJyApICsgKCB0eXBlLm11bHRpbGluZSA/ICdtJyA6ICcnICkpOyB9XG5cdHZhciB0eXBlX3Rlc3QgPSB0ZXN0X2JpbmQodHlwZSk7XG5cdHJldHVybiBGQUxTRVxuXHRcdD8gZnVuY3Rpb24gdGVzdGVyICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J3N0cmluZycgfHwgIXR5cGVfdGVzdCh2YWx1ZSk7IH1cblx0XHQ6IGZ1bmN0aW9uIHRlc3RlciAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnICYmIHR5cGVfdGVzdCh2YWx1ZSk7IH07XG59XG5cbmZ1bmN0aW9uIE9CSkVDVCAgICAgICAgICAgICAgICAgICAodmFsdWUgICAgICAgICAsIGluZGV4ICAgICAgICAsIGV4cGVjdEtleXMgICAgICAgICAgICAgICAgICAgICwgdmFsaWRhdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAge1xuXHRpZiAoIHR5cGVvZiB2YWx1ZSE9PSdvYmplY3QnIHx8ICF2YWx1ZSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdHdoaWxlICggaW5kZXggKSB7XG5cdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF0gO1xuXHRcdGlmICggIXZhbGlkYXRvcnNba2V5XSgoIHZhbHVlICAgICAgKVtrZXldKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBPQkpFQ1RfU1RSSUNUICAgICAgICAgICAgICAgICAgICh2YWx1ZSAgICAgICAgICwgaW5kZXggICAgICAgICwgZXhwZWN0S2V5cyAgICAgICAgICAgICAgICAgICAgLCB2YWxpZGF0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7XG5cdGlmICggdHlwZW9mIHZhbHVlIT09J29iamVjdCcgfHwgIXZhbHVlIHx8IGlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0d2hpbGUgKCBpbmRleCApIHtcblx0XHR2YXIga2V5ID0gZXhwZWN0S2V5c1stLWluZGV4XSA7XG5cdFx0aWYgKCAhdmFsaWRhdG9yc1trZXldKCggdmFsdWUgICAgICApW2tleV0pICkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxuXHRmb3IgKCB2YXIga2V5cyA9IG93bktleXModmFsdWUpLCBsZW5ndGggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0aWYgKCAhKCBrZXlzW2luZGV4XSAgaW4gdmFsaWRhdG9ycyApICkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIE9iamVjdFZhbGlkYXRvciAgICAgICAgICAgICAgICAgICAodHlwZSAgICwgRkFMU0UgICAgICAgICAsIHN0cmljdCAgICAgICAgICkgICAgICAgICAgICB7XG5cdHZhciBleHBlY3RLZXlzID0gb3duS2V5cyh0eXBlKS5yZXZlcnNlKCk7XG5cdHZhciBleHBlY3RMZW5ndGggICAgICAgICA9IGV4cGVjdEtleXMubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyA9IGNyZWF0ZShOdWxsX3Byb3RvdHlwZSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBleHBlY3RMZW5ndGg7IGluZGV4OyApIHtcblx0XHR2YXIga2V5ID0gZXhwZWN0S2V5c1stLWluZGV4XSA7XG5cdFx0dmFsaWRhdG9yc1trZXldID0gaXModHlwZVtrZXldKTtcblx0fVxuXHRyZXR1cm4gc3RyaWN0XG5cdFx0PyBGQUxTRVxuXHRcdFx0PyBmdW5jdGlvbiBvYmplY3QgKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiAhT0JKRUNUX1NUUklDVCAgICh2YWx1ZSwgZXhwZWN0TGVuZ3RoLCBleHBlY3RLZXlzLCB2YWxpZGF0b3JzKTsgfVxuXHRcdFx0OiBmdW5jdGlvbiBvYmplY3QgKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPQkpFQ1RfU1RSSUNUICAgKHZhbHVlLCBleHBlY3RMZW5ndGgsIGV4cGVjdEtleXMsIHZhbGlkYXRvcnMpOyB9XG5cdFx0OiBGQUxTRVxuXHRcdFx0PyBmdW5jdGlvbiBvYmplY3QgKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiAhT0JKRUNUICAgKHZhbHVlLCBleHBlY3RMZW5ndGgsIGV4cGVjdEtleXMsIHZhbGlkYXRvcnMpOyB9XG5cdFx0XHQ6IGZ1bmN0aW9uIG9iamVjdCAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9CSkVDVCAgICh2YWx1ZSwgZXhwZWN0TGVuZ3RoLCBleHBlY3RLZXlzLCB2YWxpZGF0b3JzKTsgfTtcbn1cblxuZnVuY3Rpb24gQVJSQVkgKHZhbHVlICAgICAgICAgLCBsZW5ndGggICAgICAgICwgdmFsaWRhdG9ycyAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHtcblx0aWYgKCAhaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoIT09bGVuZ3RoICkgeyByZXR1cm4gZmFsc2U7IH1cblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0aWYgKCAhdmFsaWRhdG9yc1tpbmRleF0gKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gQXJyYXlWYWxpZGF0b3IgKHR5cGUgICAgICAgICAgICAgICAgICAgICwgRkFMU0UgICAgICAgICApICAgICAgICAgICAge1xuXHR2YXIgbGVuZ3RoICAgICAgICAgPSB0eXBlLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgICAgICAgICAgICAgID0gW107XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzW2luZGV4XSA9IGlzKHR5cGVbaW5kZXhdKTsgfVxuXHRyZXR1cm4gRkFMU0Vcblx0XHQ/IGZ1bmN0aW9uIGFycmF5ICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gIUFSUkFZKHZhbHVlLCBsZW5ndGgsIHZhbGlkYXRvcnMpOyB9XG5cdFx0OiBmdW5jdGlvbiBhcnJheSAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIEFSUkFZKHZhbHVlLCBsZW5ndGgsIHZhbGlkYXRvcnMpOyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXMgKHR5cGUgICAgICAgICApICAgICAgICAgICAge1xuXHRyZXR1cm4gdHlwZW9mIHR5cGU9PT0nZnVuY3Rpb24nID8gdHlwZSAgICAgICAgICAgICAgOlxuXHRcdHR5cGU9PT1VTkRFRklORUQgPyB1bmRlZmluZWQgOlxuXHRcdFx0dHlwZT09PXRydWUgPyBUUlVFIDogdHlwZT09PWZhbHNlID8gRkFMU0UgOlxuXHRcdFx0XHR0eXBlPT09bnVsbCA/IE5VTEwgOlxuXHRcdFx0XHRcdHR5cGVvZiB0eXBlPT09J29iamVjdCcgP1xuXHRcdFx0XHRcdFx0LyojX19QVVJFX18qLyBpc0FycmF5KHR5cGUpID8gQXJyYXlWYWxpZGF0b3IodHlwZSwgZmFsc2UpIDpcblx0XHRcdFx0XHRcdGlzUmVnRXhwKHR5cGUpID8gLyojX19QVVJFX18qLyBTdHJpbmdUZXN0ZXIodHlwZSwgZmFsc2UpIDpcblx0XHRcdFx0XHRcdFx0T2JqZWN0VmFsaWRhdG9yKHR5cGUgICAgICAgICAgLCBmYWxzZSwgZmFsc2UpIDpcblx0XHRcdFx0XHRcdE8odHlwZSkgPyBPIDogX08odHlwZSkgPyBfTyA6XG5cdFx0XHRcdFx0XHRcdHR5cGUhPT10eXBlID8gTmFOIDpcblx0XHRcdFx0XHRcdFx0XHR0eXBlPT09SU5GSU5JVFkgPyBJbmZpbml0eSA6IHR5cGU9PT1fSU5GSU5JVFkgPyBfSW5maW5pdHkgOlxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24gaXNUeXBlICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT10eXBlOyB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIG5vdCAodHlwZSAgICAgICAgICkgICAgICAgICAgICB7XG5cdGlmICggdHlwZW9mIHR5cGU9PT0nZnVuY3Rpb24nICkge1xuXHRcdHN3aXRjaCAoIHR5cGUgKSB7XG5cdFx0XHRjYXNlIHVuZGVmaW5lZDogcmV0dXJuIHVuZGVmaW5lZF87XG5cdFx0XHRjYXNlIHVuZGVmaW5lZF86IHJldHVybiB1bmRlZmluZWQ7XG5cdFx0XHRjYXNlIGJpZ2ludDogcmV0dXJuIGJpZ2ludF87XG5cdFx0XHRjYXNlIGJpZ2ludF86IHJldHVybiBiaWdpbnQ7XG5cdFx0XHRjYXNlIHN0cmluZzogcmV0dXJuIHN0cmluZ187XG5cdFx0XHRjYXNlIHN0cmluZ186IHJldHVybiBzdHJpbmc7XG5cdFx0XHRjYXNlIEJPT0xFQU46IHJldHVybiBib29sZWFuXztcblx0XHRcdGNhc2UgYm9vbGVhbl86IHJldHVybiBCT09MRUFOO1xuXHRcdFx0Y2FzZSBUUlVFOiByZXR1cm4gVFJVRV87XG5cdFx0XHRjYXNlIFRSVUVfOiByZXR1cm4gVFJVRTtcblx0XHRcdGNhc2UgRkFMU0U6IHJldHVybiBGQUxTRV87XG5cdFx0XHRjYXNlIEZBTFNFXzogcmV0dXJuIEZBTFNFO1xuXHRcdFx0Y2FzZSBOVUxMOiByZXR1cm4gTlVMTF87XG5cdFx0XHRjYXNlIE5VTExfOiByZXR1cm4gTlVMTDtcblx0XHRcdGNhc2UgbnVtYmVyOiByZXR1cm4gbnVtYmVyXztcblx0XHRcdGNhc2UgbnVtYmVyXzogcmV0dXJuIG51bWJlcjtcblx0XHRcdGNhc2UgSW5maW5pdHk6IHJldHVybiBJbmZpbml0eV87XG5cdFx0XHRjYXNlIEluZmluaXR5XzogcmV0dXJuIEluZmluaXR5O1xuXHRcdFx0Y2FzZSBfSW5maW5pdHk6IHJldHVybiBfSW5maW5pdHlfO1xuXHRcdFx0Y2FzZSBfSW5maW5pdHlfOiByZXR1cm4gX0luZmluaXR5O1xuXHRcdFx0Y2FzZSBPOiByZXR1cm4gT187XG5cdFx0XHRjYXNlIE9fOiByZXR1cm4gTztcblx0XHRcdGNhc2UgX086IHJldHVybiBfT187XG5cdFx0XHRjYXNlIF9PXzogcmV0dXJuIF9PO1xuXHRcdFx0Y2FzZSBzeW1ib2w6IHJldHVybiBzeW1ib2xfO1xuXHRcdFx0Y2FzZSBzeW1ib2xfOiByZXR1cm4gc3ltYm9sO1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gbm90VHlwZSAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuICF0eXBlKHZhbHVlKTsgfTtcblx0fVxuXHRyZXR1cm4gdHlwZT09PVVOREVGSU5FRCA/IHVuZGVmaW5lZF8gOlxuXHRcdHR5cGU9PT10cnVlID8gVFJVRV8gOiB0eXBlPT09ZmFsc2UgPyBGQUxTRV8gOlxuXHRcdFx0dHlwZT09PW51bGwgPyBOVUxMXyA6XG5cdFx0XHRcdHR5cGVvZiB0eXBlPT09J29iamVjdCcgP1xuXHRcdFx0XHRcdGlzQXJyYXkodHlwZSkgPyAvKiNfX1BVUkVfXyovIEFycmF5VmFsaWRhdG9yKHR5cGUsIHRydWUpIDpcblx0XHRcdFx0XHRcdGlzUmVnRXhwKHR5cGUpID8gLyojX19QVVJFX18qLyBTdHJpbmdUZXN0ZXIodHlwZSwgdHJ1ZSkgOlxuXHRcdFx0XHRcdFx0XHQvKiNfX1BVUkVfXyovIE9iamVjdFZhbGlkYXRvcih0eXBlICAgICAgICAgICwgdHJ1ZSwgZmFsc2UpIDpcblx0XHRcdFx0XHR0eXBlPT09MCA/IE9fKHR5cGUpID8gX09fIDogT18gOlxuXHRcdFx0XHRcdFx0dHlwZSE9PXR5cGUgPyBOYU5fIDpcblx0XHRcdFx0XHRcdFx0dHlwZT09PUlORklOSVRZID8gSW5maW5pdHlfIDogdHlwZT09PV9JTkZJTklUWSA/IF9JbmZpbml0eV8gOlxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIG5vdFR5cGUgKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXR5cGU7IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpY3QgKHR5cGUgICAgICAgICkgICAgICAgICAgICB7XG5cdGlmICggaXNBcnJheSh0eXBlKSB8fCBpc1JlZ0V4cCh0eXBlKSApIHsgdGhyb3cgVHlwZUVycm9yKCdzdHJpY3QoYXJndW1lbnQgY2FuIG5vdCBiZSBhbiBhcnJheSBvciByZWdFeHApJyk7IH1cblx0cmV0dXJuIC8qI19fUFVSRV9fKi8gT2JqZWN0VmFsaWRhdG9yKHR5cGUsIGZhbHNlLCB0cnVlKTtcbn1cbnN0cmljdC5ub3QgPSBmdW5jdGlvbiBzdHJpY3Rfbm90ICh0eXBlICAgICAgICApICAgICAgICAgICAge1xuXHRpZiAoIGlzQXJyYXkodHlwZSkgfHwgaXNSZWdFeHAodHlwZSkgKSB7IHRocm93IFR5cGVFcnJvcignc3RyaWN0Lm5vdChhcmd1bWVudCBjYW4gbm90IGJlIGFuIGFycmF5IG9yIHJlZ0V4cCknKTsgfVxuXHRyZXR1cm4gLyojX19QVVJFX18qLyBPYmplY3RWYWxpZGF0b3IodHlwZSwgdHJ1ZSwgdHJ1ZSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uYWwgKHR5cGUgICAgICAgICApICAgICAgICAgICAge1xuXHR2YXIgdmFsaWRhdG9yICAgICAgICAgICAgPSBpcyh0eXBlKTtcblx0cmV0dXJuIGZ1bmN0aW9uIG9wdGlvbmFsVmFsaWRhdG9yICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1VTkRFRklORUQgfHwgdmFsaWRhdG9yKHZhbHVlKTsgfTtcbn1cblxuZnVuY3Rpb24gT1IgKHZhbHVlICAgICAgICAgLCBsZW5ndGggICAgICAgICwgdmFsaWRhdG9ycyAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XSAodmFsdWUpICkgeyByZXR1cm4gdHJ1ZTsgfVxuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBvciAodHlwZSAgICAgICAgICkgICAgICAgICAgICB7XG5cdHZhciB0eXBlcyAgICAgICAgICAgICAgICAgICAgID0gYXJndW1lbnRzLmxlbmd0aD09PTEgJiYgaXNBcnJheSh0eXBlKSA/IHR5cGUgOiBhcmd1bWVudHM7XG5cdHZhciBsZW5ndGggICAgICAgICA9IHR5cGVzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgICAgICAgICAgICAgID0gW107XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzW2luZGV4XSA9IGlzKHR5cGVzW2luZGV4XSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIG9yICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT1IodmFsdWUsIGxlbmd0aCwgdmFsaWRhdG9ycyk7IH07XG59XG5mdW5jdGlvbiBBTkQgKHZhbHVlICAgICAgICAgLCBsZW5ndGggICAgICAgICwgdmFsaWRhdG9ycyAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0aWYgKCAhdmFsaWRhdG9yc1tpbmRleF0gKHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5leHBvcnQgZnVuY3Rpb24gYW5kICh0eXBlICAgICAgICAgKSAgICAgICAgICAgIHtcblx0dmFyIHR5cGVzICAgICAgICAgICAgICAgICAgICAgPSBhcmd1bWVudHMubGVuZ3RoPT09MSAmJiBpc0FycmF5KHR5cGUpID8gdHlwZSA6IGFyZ3VtZW50cztcblx0dmFyIGxlbmd0aCAgICAgICAgID0gdHlwZXMubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyAgICAgICAgICAgICAgPSBbXTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IHZhbGlkYXRvcnNbaW5kZXhdID0gaXModHlwZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gYW5kICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gQU5EKHZhbHVlLCBsZW5ndGgsIHZhbGlkYXRvcnMpOyB9O1xufVxuXG5mdW5jdGlvbiBFVkVSWSAodmFsdWUgICAgICAgICAsIHZhbGlkYXRvciAgICAgICAgICAgKSAgICAgICAgICB7XG5cdGlmICggIWlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gdmFsdWUubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdGlmICggIXZhbGlkYXRvcih2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBldmVyeSAodHlwZSAgICAgICAgICkgICAgICAgICAgICB7XG5cdHZhciB2YWxpZGF0b3IgICAgICAgICAgICA9IGlzKHR5cGUpO1xuXHRyZXR1cm4gZnVuY3Rpb24gYXJyYXkgKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBFVkVSWSh2YWx1ZSwgdmFsaWRhdG9yKTsgfTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZnVuY3Rpb24gVFVQTEUgKHZhbHVlICAgICAgICAgLCByb290UGF0dGVybnMgICAgICAgICAgKSAgICAgICAgICB7XG5cdGlmICggIWlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0dmFyIHBhdHRlcm5zICAgICAgICAgICAgICAgICAgPSByb290UGF0dGVybnM7XG5cdHZhciBwYXR0ZXJuSW5kZXggICAgICAgICA9IHBhdHRlcm5zLmxlbmd0aDtcblx0dmFyIHN1YlZhbHVlICAgICAgICAgID0gdmFsdWVbMF07XG5cdHZhciBzdWJJbmRleCAgICAgICAgID0gMDtcblx0Zm9yICggOyA7ICkge1xuXHRcdHZhciBwYXR0ZXJuICAgICAgICAgID0gcGF0dGVybnNbLS1wYXR0ZXJuSW5kZXhdIDtcblx0XHRpZiAoIHBhdHRlcm4oc3ViVmFsdWUpICkge1xuXHRcdFx0cGF0dGVybnMgPSBwYXR0ZXJuLnJlc3Q7XG5cdFx0XHRpZiAoICFwYXR0ZXJucyApIHsgcmV0dXJuIHRydWU7IH1cblx0XHRcdHBhdHRlcm5JbmRleCA9IHBhdHRlcm5zLmxlbmd0aDtcblx0XHRcdHN1YlZhbHVlID0gdmFsdWVbKytzdWJJbmRleF07XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCAhcGF0dGVybkluZGV4ICkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxufVxuZnVuY3Rpb24gdW5zaGlmdF9jYWxsIChhcnJheSAgICAgICAgICAgICAgICAgICAsIGl0ZW0gICAgICkgICAgICAge1xuXHR2YXIgaW5kZXggICAgICAgICA9IGFycmF5Lmxlbmd0aDtcblx0ZG8geyBhcnJheVtpbmRleF0gPSBhcnJheVstLWluZGV4XSA7IH1cblx0d2hpbGUgKCBpbmRleCApO1xuXHRhcnJheVswXSA9IGl0ZW07XG59XG5leHBvcnQgZnVuY3Rpb24gdHVwbGUgKHRlbXBsYXRlICAgICAgICAgICAgICAgICAgICAgICkge1xuXHR2YXIgcmF3ICAgICAgICAgICAgICAgICAgICA9IHRlbXBsYXRlLnJhdztcblx0dmFyIGxlbmd0aCAgICAgICAgID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG5cdGlmICggIWxlbmd0aCApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ3R1cGxlJyk7IH1cblx0dmFyIHMgICAgICAgICA9IHJhd1swXSA7XG5cdHZhciBsYXN0SW5kZXhBZnRlckxGICAgICAgICAgPSBzLmxhc3RJbmRleE9mKCdcXG4nKSArIDE7XG5cdGlmICggIWxhc3RJbmRleEFmdGVyTEYgKSB7IHRocm93IFN5bnRheEVycm9yKCd0dXBsZScpOyB9XG5cdHZhciBMRVZFTCAgICAgICAgID0gcy5sZW5ndGggLSBsYXN0SW5kZXhBZnRlckxGO1xuXHR2YXIgaW5kZXggICAgICAgICA9IDA7XG5cdHZhciBhbGxQYXR0ZXJucyAgICAgICAgICAgID0gW107XG5cdGRvIHsgKCBhbGxQYXR0ZXJuc1tpbmRleF0gPSBpcyhhcmd1bWVudHNbKytpbmRleF0pICAgICAgICAgICAgKS5yZXN0ID0gbnVsbDsgfVxuXHR3aGlsZSAoIGluZGV4PGxlbmd0aCApO1xuXHRpbmRleCA9IDA7XG5cdHZhciByb290UGF0dGVybnMgICAgICAgICAgID0gWyBhbGxQYXR0ZXJuc1swXSAgXTtcblx0dmFyIGxldmVsICAgICAgICAgPSBmdW5jdGlvbiBjYWxsZWUgKHBhdHRlcm5zICAgICAgICAgICwgTEVWRUwgICAgICAgICkgICAgICAgICB7XG5cdFx0d2hpbGUgKCArK2luZGV4PGxlbmd0aCApIHtcblx0XHRcdHZhciBzICAgICAgICAgPSByYXdbaW5kZXhdIDtcblx0XHRcdHZhciBsYXN0SW5kZXhBZnRlckxGID0gcy5sYXN0SW5kZXhPZignXFxuJykgKyAxO1xuXHRcdFx0aWYgKCAhbGFzdEluZGV4QWZ0ZXJMRiApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ3R1cGxlJyk7IH1cblx0XHRcdHZhciBsZXZlbCA9IHMubGVuZ3RoIC0gbGFzdEluZGV4QWZ0ZXJMRjtcblx0XHRcdGlmICggbGV2ZWw8TEVWRUwgKSB7IHJldHVybiBsZXZlbDsgfVxuXHRcdFx0aWYgKCBsZXZlbD09PUxFVkVMICkgeyB1bnNoaWZ0X2NhbGwocGF0dGVybnMsIGFsbFBhdHRlcm5zW2luZGV4XSApOyB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGV2ZWwgPSBjYWxsZWUocGF0dGVybnNbMF0gLnJlc3QgPSBbIGFsbFBhdHRlcm5zW2luZGV4XSAgXSwgbGV2ZWwpO1xuXHRcdFx0XHRpZiAoIGxldmVsPExFVkVMICkgeyByZXR1cm4gbGV2ZWw7IH1cblx0XHRcdFx0aWYgKCBsZXZlbCE9PUxFVkVMICkgeyB0aHJvdyBTeW50YXhFcnJvcigndHVwbGUnKTsgfVxuXHRcdFx0XHR1bnNoaWZ0X2NhbGwocGF0dGVybnMsIGFsbFBhdHRlcm5zW2luZGV4XSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH0ocm9vdFBhdHRlcm5zLCBMRVZFTCk7XG5cdGlmICggMDw9bGV2ZWwgJiYgbGV2ZWw8TEVWRUwgKSB7IHRocm93IFN5bnRheEVycm9yKCd0dXBsZScpOyB9XG5cdHJldHVybiBmdW5jdGlvbiB0dXBsZSAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIFRVUExFKHZhbHVlLCByb290UGF0dGVybnMpOyB9O1xufVxuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdD89JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHRpczogaXMsIG5vdDogbm90LFxuXHRhbmQ6IGFuZCwgb3I6IG9yLFxuXHRiaWdpbnQ6IGJpZ2ludCwgc3ltYm9sOiBzeW1ib2wsIHN0cmluZzogc3RyaW5nLCAnYm9vbGVhbic6IEJPT0xFQU4sIG51bWJlcjogbnVtYmVyLFxuXHR1bmRlZmluZWQ6IHVuZGVmaW5lZCwgTmFOOiBOYU4sIEluZmluaXR5OiBJbmZpbml0eSxcblx0ZXZlcnk6IGV2ZXJ5LCB0dXBsZTogdHVwbGUsXG5cdG9wdGlvbmFsOiBvcHRpb25hbCwgc3RyaWN0OiBzdHJpY3QsXG5cdGFueTogYW55LCBuZXZlcjogbmV2ZXIsXG5cdHZlcnNpb246IHZlcnNpb25cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiXSwibmFtZXMiOlsidW5kZWZpbmVkIiwiUmVnRXhwIiwiVHlwZUVycm9yIiwiU3ludGF4RXJyb3Ii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