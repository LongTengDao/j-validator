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

//# sourceMappingURL=index.mjs.map