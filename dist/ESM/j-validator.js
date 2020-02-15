/*!
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：5.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-validator/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-validator/
 */

var version = '5.0.0';

var toString = Object.prototype.toString;

var isArray = (
	/*! j-globals: Array.isArray (polyfill) */
	Array.isArray || function isArray (value) {
		return /*#__PURE__*/ toString.call(value)==='[object Array]';
	}
	/*¡ j-globals: Array.isArray (polyfill) */
);

var INFINITY = 1/0;

var UNDEFINED = void 0;

var create = Object.create || (
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
			if ( typeof o!=='object' && typeof o!=='function' ) { throw TypeError('Object prototype may only be an Object or null: '+o); }
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

var hasOwnProperty = Object.prototype.hasOwnProperty;

var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

var Null_prototype = (
	/*! j-globals: null.prototype (internal) */
	Object.create
		? /*#__PURE__*/ Object.preventExtensions(Object.create(null))
		: null
	/*¡ j-globals: null.prototype (internal) */
);

var isPrimitive = (
	/*! j-globals: class.isPrimitive (internal) */
	function isPrimitive (argument) {
		return Object(argument)!==argument;
	}
	/*¡ j-globals: class.isPrimitive (internal) */
);

var MAX_ARRAY_LENGTH = /*  */4294967295;// 0x00000000FFFFFFFF // 0b00000000000000000000011111111111111111111111111111111 // 0o0000000000037777777777 // 2**32-1
var LIKE_ARRAY_INDEX = /^(?:0|[1-4]\d{0,9}|[5-9]\d{0,8})$/;
function isArrayIndex (key) {
	return LIKE_ARRAY_INDEX.test(key) && key<MAX_ARRAY_LENGTH;
}

var getOwnPropertyNames = (
	/*! j-globals: Object.getOwnPropertyNames (polyfill) */
	/*#__PURE__*/ function () {
		
		var Object_getOwnPropertyNames = Object.getOwnPropertyNames;
		if ( Object_getOwnPropertyNames ) {
			try {
				Object_getOwnPropertyNames(0);
				return Object_getOwnPropertyNames;
			}
			catch (error) { }
			return function getOwnPropertyNames (object) {
				return Object_getOwnPropertyNames(object==null ? object : Object(object));
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
						if ( toString.call(object)==='[object Array]' ) {
							for ( name in object ) { if ( hasOwnProperty.call(object, name) && isArrayIndex(name) ) { names[index++] = name; } }
						}
						else {
							if ( string_noIndex && toString.call(object)==='[object String]' ) { throw TypeError('stringObject\'s index keys have bug in ES3'); }
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
					for ( name in object = Object(object) ) { if ( hasOwnProperty.call(object, name) ) { names[index++] = name; } }
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

var push = Array.prototype.push;

var ownKeys = typeof Reflect==='object' ? Reflect.ownKeys : (
	/*! j-globals: Reflect.ownKeys (polyfill) */
	/*#__PURE__*/ function () {
		
		var __PURE__;
		
		var Object_getOwnPropertySymbols = Object.getOwnPropertySymbols;
		
		var Object_getOwnPropertyNames = Object.getOwnPropertyNames;
		if ( Object_getOwnPropertyNames ) {
			try { Object_getOwnPropertyNames(0); }
			catch (error) {
				if ( Object_getOwnPropertySymbols ) {
					__PURE__ = function ownKeys (object) {
						var keys = Object_getOwnPropertyNames(object);
						push.apply(keys, Object_getOwnPropertySymbols);
						return keys;
					};
				}
				else { return Object_getOwnPropertyNames; }
			}
		}
		else { Object_getOwnPropertyNames = getOwnPropertyNames; }
		
		if ( !__PURE__ ) {
			__PURE__ = Object_getOwnPropertySymbols
				? function ownKeys (object) {
					if ( isPrimitive(object) ) { throw TypeError('Reflect.ownKeys called on non-object'); }
					var keys = Object_getOwnPropertyNames(object);
					push.apply(keys, Object_getOwnPropertySymbols);
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

var test = RegExp.prototype.test;

var throwStackOverflowErrorEarly = (
	/*! j-globals: void.KEEP (internal) */
	/*#__PURE__*/ function () {
		try { return Function('"use strict";return function(){}')(); }
		catch (error) {}
		return function KEEP () {};
	}()
	/*¡ j-globals: void.KEEP (internal) */
);

var isRegExp = (
	/*! j-globals: class.isRegExp (internal) */
	function () {
		function __PURE__ (value) {
			throwStackOverflowErrorEarly();
			try { test.call(value, ''); }
			catch (error) { return false; }
			return true;
		}
		return function isRegExp (value) {
			return /*#__PURE__*/ __PURE__(value);
		};
	}()
	/*¡ j-globals: class.isRegExp (internal) */
);

var toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

var assign = Object.assign;
var defineProperty = Object.defineProperty;
var freeze = Object.freeze;
var seal = Object.seal;
var Default = (
	/*! j-globals: default (internal) */
	function Default (exports, addOnOrigin) {
		return /*#__PURE__*/ function Module (exports, addOnOrigin) {
			if ( !addOnOrigin ) { addOnOrigin = exports; exports = create(null); }
			if ( assign ) { assign(exports, addOnOrigin); }
			else {
				for ( var key in addOnOrigin ) { if ( hasOwnProperty.call(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } }
				if ( !{ 'toString': null }.propertyIsEnumerable('toString') ) {
					var keys = [ 'constructor', 'propertyIsEnumerable', 'isPrototypeOf', 'hasOwnProperty', 'valueOf', 'toLocaleString', 'toString' ];
					while ( key = keys.pop() ) { if ( hasOwnProperty.call(addOnOrigin, key) ) { exports[key] = addOnOrigin[key]; } }
				}
			}
			exports['default'] = exports;
			if ( seal ) {
				typeof exports==='function' && exports.prototype && seal(exports.prototype);
				if ( toStringTag ) {
					var descriptor = create(null);
					descriptor.value = 'Module';
					defineProperty(exports, toStringTag, descriptor);
				}
				freeze(exports);
			}
			return exports;
		}(exports, addOnOrigin);
	}
	/*¡ j-globals: default (internal) */
);

var Object_is = ( Object                                      ).is;
var _INFINITY = -INFINITY;

var VOID = { 'void': function (value     )          { return value===VOID; } }['void'];

function any (value     )          { return value!==VOID; }
function never (value     )          { return false; }

function bigint (value     )          { return typeof value==='bigint'; }
var bigint_ = { '!bigint': function (value     )          { return typeof value!=='bigint'; } }['!bigint'];
function symbol (value     )          { return typeof value==='symbol'; }
var symbol_ = { '!symbol': function (value     )          { return typeof value!=='symbol'; } }['!symbol'];
function string (value     )          { return typeof value==='string'; }
var string_ = { '!string': function (value     )          { return typeof value!=='string'; } }['!string'];
var BOOLEAN = { 'boolean': function (value     )          { return value===true || value===false; } }['boolean'];
var boolean_ = { '!boolean': function (value     )          { return value!==true && value!==false; } }['!boolean'];
function number (value     )          { return typeof value==='number'; }
var number_ = { '!number': function (value     )          { return typeof value!=='number'; } }['!number'];
function undefined$1 (value     )          { return value===UNDEFINED; }
var undefined_ = { '!undefined': function (value     )          { return value!==UNDEFINED; } }['!undefined'];

var NULL = { 'null': function (value     )          { return value===null; } }['null'];
var NULL_ = { '!null': function (value     )          { return value!==null; } }['!null'];
var TRUE = { 'true': function (value     )          { return value===true; } }['true'];
var TRUE_ = { '!true': function (value     )          { return value!==true; } }['!true'];
var FALSE = { 'false': function (value     )          { return value===false; } }['false'];
var FALSE_ = { '!false': function (value     )          { return value!==false; } }['!false'];

function Infinity (value     )          { return value===INFINITY; }
Infinity.valueOf = function (                     )         { return INFINITY; };
var Infinity_ = { '!Infinity': function (value     )          { return value!==INFINITY; } }['!Infinity'];
var _Infinity = { '-Infinity': function (value     )          { return value===_INFINITY; } }['-Infinity'];
var _Infinity_ = { '!-Infinity': function (value     )          { return value!==_INFINITY; } }['!-Infinity'];

function NaN (value     )          { return value!==value; }
var NaN_ = { '!NaN': function (value     )          { return value===value; } }['!NaN'];

var O            = Object_is
	? function O (value     )          { return Object_is (value, 0); }
	: function O (value     )          { return value===0 && 1/value>0; };
var O_            = Object_is
	? function O_ (value     )          { return !Object_is (value, 0); }
	: function O_ (value     )          { return value!==0 || 1/value<0; };
var _O            = Object_is
	? function _O (value     )          { return Object_is (value, -0); }
	: function _O (value     )          { return value===0 && 1/value<0; };
var _O_            = Object_is
	? function _O_ (value     )          { return !Object_is (value, -0); }
	: function _O_ (value     )          { return value!==0 || 1/value>0; };

function StringTester (type        , strict         , TRUE         )            {
	return strict
		? TRUE
			? function tester (value     )          { return typeof value==='string' && test.call(type, value); }
			: function tester (value     )          { return typeof value!=='string' || !test.call(type, value); }
		: TRUE
			? function tester (value     )          { return test.call(type, value); }
			: function tester (value     )          { return !test.call(type, value); };
}

function ObjectValidator                   (type   , strict         , FALSE         )            {
	var expectKeys = ownKeys(type).reverse();
	var expectLength         = expectKeys.length;
	var validators = create(Null_prototype)                                   ;
	for ( var index         = expectLength; index; ) {
		var key = expectKeys[--index];
		validators[key] = is(type[key]);
	}
	var TRUE          = !FALSE;
	return function object (value     )          {
		if ( typeof value!=='object' || !value || isArray(value) ) { return FALSE; }
		for ( var index         = expectLength; index; ) {
			var key = expectKeys[--index];
			if ( !validators[key](key in value ? value[key] : VOID) ) { return FALSE; }
		}
		if ( strict ) {
			index = 0;
			for ( var keys = ownKeys(value), length         = keys.length; index<length; ++index ) {
				if ( !( keys[index] in validators ) ) { return FALSE; }
			}
		}
		return TRUE;
	};
}

function ArrayValidator (type                 , like         , FALSE         )            {
	var length         = type.length;
	var validators              = [];
	for ( var index         = 0; index<length; ++index ) { validators.push(is(type[index])); }
	var TRUE          = !FALSE;
	return function array (value     )          {
		if ( !like && !isArray(value) ) { return FALSE; }
		if ( value.length!==length ) { return FALSE; }
		for ( var index         = 0; index<length; ++index ) {
			if ( !validators[index](value[index]) ) { return FALSE; }
		}
		return TRUE;
	};
}

function is (type     )            {
	return typeof type==='function' ? type :
		undefined$1(type) ? undefined$1 :
			TRUE(type) ? TRUE : FALSE(type) ? FALSE :
				NULL(type) ? NULL :
					typeof type==='object' ?
						/*#__PURE__*/ isArray(type) ? ArrayValidator(type, false, false) :
						isRegExp(type) ? /*#__PURE__*/ StringTester(type, false, true) :
							ObjectValidator(type, false, false) :
						O(type) ? O : _O(type) ? _O :
							type!==type ? NaN :
								type===INFINITY ? Infinity : type===_INFINITY ? _Infinity :
									function isType (value     )          { return value===type; };
}
function not (type     )            {
	if ( typeof type==='function' ) {
		switch ( type ) {
			case bigint:
				return bigint_;
			case symbol:
				return symbol_;
			case string:
				return string_;
			case BOOLEAN:
				return boolean_;
			case number:
				return number_;
			case undefined$1:
				return undefined_;
			case Infinity:
				return Infinity_;
		}
		return function notType (value     )          { return !type(value); };
	}
	return type===UNDEFINED ? undefined_ :
		type===true ? TRUE_ : type===false ? FALSE_ :
			type===null ? NULL_ :
				typeof type==='object' ?
					isArray(type) ? /*#__PURE__*/ ArrayValidator(type, false, true) :
						isRegExp(type) ? /*#__PURE__*/ StringTester(type, false, false) :
							/*#__PURE__*/ ObjectValidator(type, false, true) :
					type===0 ? O_(type) ? _O_ : O_ :
						type!==type ? NaN_ :
							type===INFINITY ? Infinity_ : type===_INFINITY ? _Infinity_ :
								function notType (value     )          { return value!==type; };
}

function strict (type        )            {
	if ( isRegExp(type) ) { return /*#__PURE__*/ StringTester(type, true, true); }
	if ( isArray(type) ) { throw TypeError('strict(argument can not be an array)'); }
	return /*#__PURE__*/ ObjectValidator(type, true, false);
}
strict.not = function strict_not (type        )            {
	if ( isRegExp(type) ) { return /*#__PURE__*/ StringTester(type, true, false); }
	if ( isArray(type) ) { throw TypeError('strict.not(argument can not be an array)'); }
	return /*#__PURE__*/ ObjectValidator(type, true, true);
};

function optional (type     )            {
	var validator            = is(type);
	return function optionalValidator (value     )          { return value===VOID || validator(value); };
}

function or (type     )            {
	var types                                           = arguments.length===1 && isArray(type) ? type : arguments;
	var length         = types.length;
	var validators              = [];
	for ( var index         = 0; index<length; ++index ) { validators.push(is(types[index])); }
	return function or (value     )          {
		for ( var index         = 0; index<length; ++index ) {
			if ( validators[index](value) ) { return true; }
		}
		return false;
	};
}
function and (type     )            {
	var types                                           = arguments.length===1 && isArray(type) ? type : arguments;
	var length         = types.length;
	var validators              = [];
	for ( var index         = 0; index<length; ++index ) { validators.push(is(types[index])); }
	return function and (value     )          {
		for ( var index         = 0; index<length; ++index ) {
			if ( !validators[index](value) ) { return false; }
		}
		return true;
	};
}

function every (type     )            {
	var validator            = is(type);
	return function array (value     )          {
		if ( !isArray(value) ) { return false; }
		for ( var length         = value.length, index         = 0; index<length; ++index ) {
			if ( !validator(value[index]) ) { return false; }
		}
		return true;
	};
}
var _export = Default({
	is: is, not: not,
	and: and, or: or,
	bigint: bigint, symbol: symbol, string: string, 'boolean': BOOLEAN, number: number,
	undefined: undefined$1, NaN: NaN, Infinity: Infinity,
	every: every,
	'void': VOID, optional: optional, strict: strict,
	any: any, never: never,
	version: version
});

export default _export;
export { Infinity, NaN, and, any, bigint, BOOLEAN as boolean, every, is, never, not, number, optional, or, strict, string, symbol, undefined$1 as undefined, version, VOID as void };

/*¡ j-validator */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnNS4wLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0IGZyb20gJy5PYmplY3QnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz89JztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgVU5ERUZJTkVEIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgaXNSZWdFeHAgZnJvbSAnLmNsYXNzLmlzUmVnRXhwJztcbmltcG9ydCBOdWxsX3Byb3RvdHlwZSBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuXG52YXIgT2JqZWN0X2lzID0gKCBPYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuaXM7XG52YXIgX0lORklOSVRZID0gLUlORklOSVRZO1xuXG52YXIgVk9JRCA9IHsgJ3ZvaWQnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1WT0lEOyB9IH1bJ3ZvaWQnXTtcbmV4cG9ydCB7IFZPSUQgYXMgdm9pZCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gYW55ICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PVZPSUQ7IH1cbmV4cG9ydCBmdW5jdGlvbiBuZXZlciAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gZmFsc2U7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpZ2ludCAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J2JpZ2ludCc7IH1cbnZhciBiaWdpbnRfID0geyAnIWJpZ2ludCc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWUhPT0nYmlnaW50JzsgfSB9WychYmlnaW50J107XG5leHBvcnQgZnVuY3Rpb24gc3ltYm9sICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nc3ltYm9sJzsgfVxudmFyIHN5bWJvbF8gPSB7ICchc3ltYm9sJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSE9PSdzeW1ib2wnOyB9IH1bJyFzeW1ib2wnXTtcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmcgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnOyB9XG52YXIgc3RyaW5nXyA9IHsgJyFzdHJpbmcnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J3N0cmluZyc7IH0gfVsnIXN0cmluZyddO1xudmFyIEJPT0xFQU4gPSB7ICdib29sZWFuJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09dHJ1ZSB8fCB2YWx1ZT09PWZhbHNlOyB9IH1bJ2Jvb2xlYW4nXTtcbmV4cG9ydCB7IEJPT0xFQU4gYXMgYm9vbGVhbiB9O1xudmFyIGJvb2xlYW5fID0geyAnIWJvb2xlYW4nOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT10cnVlICYmIHZhbHVlIT09ZmFsc2U7IH0gfVsnIWJvb2xlYW4nXTtcbmV4cG9ydCBmdW5jdGlvbiBudW1iZXIgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdudW1iZXInOyB9XG52YXIgbnVtYmVyXyA9IHsgJyFudW1iZXInOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J251bWJlcic7IH0gfVsnIW51bWJlciddO1xuZXhwb3J0IGZ1bmN0aW9uIHVuZGVmaW5lZCAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1VTkRFRklORUQ7IH1cbnZhciB1bmRlZmluZWRfID0geyAnIXVuZGVmaW5lZCc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PVVOREVGSU5FRDsgfSB9WychdW5kZWZpbmVkJ107XG5cbnZhciBOVUxMID0geyAnbnVsbCc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PW51bGw7IH0gfVsnbnVsbCddO1xudmFyIE5VTExfID0geyAnIW51bGwnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT1udWxsOyB9IH1bJyFudWxsJ107XG52YXIgVFJVRSA9IHsgJ3RydWUnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT10cnVlOyB9IH1bJ3RydWUnXTtcbnZhciBUUlVFXyA9IHsgJyF0cnVlJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09dHJ1ZTsgfSB9WychdHJ1ZSddO1xudmFyIEZBTFNFID0geyAnZmFsc2UnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1mYWxzZTsgfSB9WydmYWxzZSddO1xudmFyIEZBTFNFXyA9IHsgJyFmYWxzZSc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PWZhbHNlOyB9IH1bJyFmYWxzZSddO1xuXG5leHBvcnQgZnVuY3Rpb24gSW5maW5pdHkgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09SU5GSU5JVFk7IH1cbkluZmluaXR5LnZhbHVlT2YgPSBmdW5jdGlvbiAoICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIElORklOSVRZOyB9O1xudmFyIEluZmluaXR5XyA9IHsgJyFJbmZpbml0eSc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PUlORklOSVRZOyB9IH1bJyFJbmZpbml0eSddO1xudmFyIF9JbmZpbml0eSA9IHsgJy1JbmZpbml0eSc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PV9JTkZJTklUWTsgfSB9WyctSW5maW5pdHknXTtcbnZhciBfSW5maW5pdHlfID0geyAnIS1JbmZpbml0eSc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PV9JTkZJTklUWTsgfSB9WychLUluZmluaXR5J107XG5cbmV4cG9ydCBmdW5jdGlvbiBOYU4gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09dmFsdWU7IH1cbnZhciBOYU5fID0geyAnIU5hTic6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PXZhbHVlOyB9IH1bJyFOYU4nXTtcblxudmFyIE8gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIE8gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIE9iamVjdF9pcyAodmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gTyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT0wICYmIDEvdmFsdWU+MDsgfTtcbnZhciBPXyAgICAgICAgICAgID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gT18gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuICFPYmplY3RfaXMgKHZhbHVlLCAwKTsgfVxuXHQ6IGZ1bmN0aW9uIE9fICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PTAgfHwgMS92YWx1ZTwwOyB9O1xudmFyIF9PICAgICAgICAgICAgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBfTyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gT2JqZWN0X2lzICh2YWx1ZSwgLTApOyB9XG5cdDogZnVuY3Rpb24gX08gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09MCAmJiAxL3ZhbHVlPDA7IH07XG52YXIgX09fICAgICAgICAgICAgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBfT18gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuICFPYmplY3RfaXMgKHZhbHVlLCAtMCk7IH1cblx0OiBmdW5jdGlvbiBfT18gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09MCB8fCAxL3ZhbHVlPjA7IH07XG5cbmZ1bmN0aW9uIFN0cmluZ1Rlc3RlciAodHlwZSAgICAgICAgLCBzdHJpY3QgICAgICAgICAsIFRSVUUgICAgICAgICApICAgICAgICAgICAge1xuXHRyZXR1cm4gc3RyaWN0XG5cdFx0PyBUUlVFXG5cdFx0XHQ/IGZ1bmN0aW9uIHRlc3RlciAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J3N0cmluZycgJiYgdGVzdC5jYWxsKHR5cGUsIHZhbHVlKTsgfVxuXHRcdFx0OiBmdW5jdGlvbiB0ZXN0ZXIgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSE9PSdzdHJpbmcnIHx8ICF0ZXN0LmNhbGwodHlwZSwgdmFsdWUpOyB9XG5cdFx0OiBUUlVFXG5cdFx0XHQ/IGZ1bmN0aW9uIHRlc3RlciAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdGVzdC5jYWxsKHR5cGUsIHZhbHVlKTsgfVxuXHRcdFx0OiBmdW5jdGlvbiB0ZXN0ZXIgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuICF0ZXN0LmNhbGwodHlwZSwgdmFsdWUpOyB9O1xufVxuXG5mdW5jdGlvbiBPYmplY3RWYWxpZGF0b3IgICAgICAgICAgICAgICAgICAgKHR5cGUgICAsIHN0cmljdCAgICAgICAgICwgRkFMU0UgICAgICAgICApICAgICAgICAgICAge1xuXHR2YXIgZXhwZWN0S2V5cyA9IG93bktleXModHlwZSkucmV2ZXJzZSgpO1xuXHR2YXIgZXhwZWN0TGVuZ3RoICAgICAgICAgPSBleHBlY3RLZXlzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgPSBjcmVhdGUoTnVsbF9wcm90b3R5cGUpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0dmFsaWRhdG9yc1trZXldID0gaXModHlwZVtrZXldKTtcblx0fVxuXHR2YXIgVFJVRSAgICAgICAgICA9ICFGQUxTRTtcblx0cmV0dXJuIGZ1bmN0aW9uIG9iamVjdCAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdGlmICggdHlwZW9mIHZhbHVlIT09J29iamVjdCcgfHwgIXZhbHVlIHx8IGlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGV4cGVjdExlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0XHRpZiAoICF2YWxpZGF0b3JzW2tleV0oa2V5IGluIHZhbHVlID8gdmFsdWVba2V5XSA6IFZPSUQpICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHR9XG5cdFx0aWYgKCBzdHJpY3QgKSB7XG5cdFx0XHRpbmRleCA9IDA7XG5cdFx0XHRmb3IgKCB2YXIga2V5cyA9IG93bktleXModmFsdWUpLCBsZW5ndGggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGlmICggISgga2V5c1tpbmRleF0gaW4gdmFsaWRhdG9ycyApICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIFRSVUU7XG5cdH07XG59XG5cbmZ1bmN0aW9uIEFycmF5VmFsaWRhdG9yICh0eXBlICAgICAgICAgICAgICAgICAsIGxpa2UgICAgICAgICAsIEZBTFNFICAgICAgICAgKSAgICAgICAgICAgIHtcblx0dmFyIGxlbmd0aCAgICAgICAgID0gdHlwZS5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzICAgICAgICAgICAgICA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKGlzKHR5cGVbaW5kZXhdKSk7IH1cblx0dmFyIFRSVUUgICAgICAgICAgPSAhRkFMU0U7XG5cdHJldHVybiBmdW5jdGlvbiBhcnJheSAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdGlmICggIWxpa2UgJiYgIWlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRpZiAoIHZhbHVlLmxlbmd0aCE9PWxlbmd0aCApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoICF2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIFRSVUU7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpcyAodHlwZSAgICAgKSAgICAgICAgICAgIHtcblx0cmV0dXJuIHR5cGVvZiB0eXBlPT09J2Z1bmN0aW9uJyA/IHR5cGUgOlxuXHRcdHVuZGVmaW5lZCh0eXBlKSA/IHVuZGVmaW5lZCA6XG5cdFx0XHRUUlVFKHR5cGUpID8gVFJVRSA6IEZBTFNFKHR5cGUpID8gRkFMU0UgOlxuXHRcdFx0XHROVUxMKHR5cGUpID8gTlVMTCA6XG5cdFx0XHRcdFx0dHlwZW9mIHR5cGU9PT0nb2JqZWN0JyA/XG5cdFx0XHRcdFx0XHQvKiNfX1BVUkVfXyovIGlzQXJyYXkodHlwZSkgPyBBcnJheVZhbGlkYXRvcih0eXBlLCBmYWxzZSwgZmFsc2UpIDpcblx0XHRcdFx0XHRcdGlzUmVnRXhwKHR5cGUpID8gLyojX19QVVJFX18qLyBTdHJpbmdUZXN0ZXIodHlwZSwgZmFsc2UsIHRydWUpIDpcblx0XHRcdFx0XHRcdFx0T2JqZWN0VmFsaWRhdG9yKHR5cGUsIGZhbHNlLCBmYWxzZSkgOlxuXHRcdFx0XHRcdFx0Tyh0eXBlKSA/IE8gOiBfTyh0eXBlKSA/IF9PIDpcblx0XHRcdFx0XHRcdFx0dHlwZSE9PXR5cGUgPyBOYU4gOlxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9PT1JTkZJTklUWSA/IEluZmluaXR5IDogdHlwZT09PV9JTkZJTklUWSA/IF9JbmZpbml0eSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiBpc1R5cGUgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09dHlwZTsgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBub3QgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdGlmICggdHlwZW9mIHR5cGU9PT0nZnVuY3Rpb24nICkge1xuXHRcdHN3aXRjaCAoIHR5cGUgKSB7XG5cdFx0XHRjYXNlIGJpZ2ludDpcblx0XHRcdFx0cmV0dXJuIGJpZ2ludF87XG5cdFx0XHRjYXNlIHN5bWJvbDpcblx0XHRcdFx0cmV0dXJuIHN5bWJvbF87XG5cdFx0XHRjYXNlIHN0cmluZzpcblx0XHRcdFx0cmV0dXJuIHN0cmluZ187XG5cdFx0XHRjYXNlIEJPT0xFQU46XG5cdFx0XHRcdHJldHVybiBib29sZWFuXztcblx0XHRcdGNhc2UgbnVtYmVyOlxuXHRcdFx0XHRyZXR1cm4gbnVtYmVyXztcblx0XHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkXztcblx0XHRcdGNhc2UgSW5maW5pdHk6XG5cdFx0XHRcdHJldHVybiBJbmZpbml0eV87XG5cdFx0fVxuXHRcdHJldHVybiBmdW5jdGlvbiBub3RUeXBlICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiAhdHlwZSh2YWx1ZSk7IH07XG5cdH1cblx0cmV0dXJuIHR5cGU9PT1VTkRFRklORUQgPyB1bmRlZmluZWRfIDpcblx0XHR0eXBlPT09dHJ1ZSA/IFRSVUVfIDogdHlwZT09PWZhbHNlID8gRkFMU0VfIDpcblx0XHRcdHR5cGU9PT1udWxsID8gTlVMTF8gOlxuXHRcdFx0XHR0eXBlb2YgdHlwZT09PSdvYmplY3QnID9cblx0XHRcdFx0XHRpc0FycmF5KHR5cGUpID8gLyojX19QVVJFX18qLyBBcnJheVZhbGlkYXRvcih0eXBlLCBmYWxzZSwgdHJ1ZSkgOlxuXHRcdFx0XHRcdFx0aXNSZWdFeHAodHlwZSkgPyAvKiNfX1BVUkVfXyovIFN0cmluZ1Rlc3Rlcih0eXBlLCBmYWxzZSwgZmFsc2UpIDpcblx0XHRcdFx0XHRcdFx0LyojX19QVVJFX18qLyBPYmplY3RWYWxpZGF0b3IodHlwZSwgZmFsc2UsIHRydWUpIDpcblx0XHRcdFx0XHR0eXBlPT09MCA/IE9fKHR5cGUpID8gX09fIDogT18gOlxuXHRcdFx0XHRcdFx0dHlwZSE9PXR5cGUgPyBOYU5fIDpcblx0XHRcdFx0XHRcdFx0dHlwZT09PUlORklOSVRZID8gSW5maW5pdHlfIDogdHlwZT09PV9JTkZJTklUWSA/IF9JbmZpbml0eV8gOlxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIG5vdFR5cGUgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09dHlwZTsgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmljdCAodHlwZSAgICAgICAgKSAgICAgICAgICAgIHtcblx0aWYgKCBpc1JlZ0V4cCh0eXBlKSApIHsgcmV0dXJuIC8qI19fUFVSRV9fKi8gU3RyaW5nVGVzdGVyKHR5cGUsIHRydWUsIHRydWUpOyB9XG5cdGlmICggaXNBcnJheSh0eXBlKSApIHsgdGhyb3cgVHlwZUVycm9yKCdzdHJpY3QoYXJndW1lbnQgY2FuIG5vdCBiZSBhbiBhcnJheSknKTsgfVxuXHRyZXR1cm4gLyojX19QVVJFX18qLyBPYmplY3RWYWxpZGF0b3IodHlwZSwgdHJ1ZSwgZmFsc2UpO1xufVxuc3RyaWN0Lm5vdCA9IGZ1bmN0aW9uIHN0cmljdF9ub3QgKHR5cGUgICAgICAgICkgICAgICAgICAgICB7XG5cdGlmICggaXNSZWdFeHAodHlwZSkgKSB7IHJldHVybiAvKiNfX1BVUkVfXyovIFN0cmluZ1Rlc3Rlcih0eXBlLCB0cnVlLCBmYWxzZSk7IH1cblx0aWYgKCBpc0FycmF5KHR5cGUpICkgeyB0aHJvdyBUeXBlRXJyb3IoJ3N0cmljdC5ub3QoYXJndW1lbnQgY2FuIG5vdCBiZSBhbiBhcnJheSknKTsgfVxuXHRyZXR1cm4gLyojX19QVVJFX18qLyBPYmplY3RWYWxpZGF0b3IodHlwZSwgdHJ1ZSwgdHJ1ZSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uYWwgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdHZhciB2YWxpZGF0b3IgICAgICAgICAgICA9IGlzKHR5cGUpO1xuXHRyZXR1cm4gZnVuY3Rpb24gb3B0aW9uYWxWYWxpZGF0b3IgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09Vk9JRCB8fCB2YWxpZGF0b3IodmFsdWUpOyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3IgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdHZhciB0eXBlcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGFyZ3VtZW50cy5sZW5ndGg9PT0xICYmIGlzQXJyYXkodHlwZSkgPyB0eXBlIDogYXJndW1lbnRzO1xuXHR2YXIgbGVuZ3RoICAgICAgICAgPSB0eXBlcy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzICAgICAgICAgICAgICA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKGlzKHR5cGVzW2luZGV4XSkpOyB9XG5cdHJldHVybiBmdW5jdGlvbiBvciAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZSkgKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhbmQgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdHZhciB0eXBlcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGFyZ3VtZW50cy5sZW5ndGg9PT0xICYmIGlzQXJyYXkodHlwZSkgPyB0eXBlIDogYXJndW1lbnRzO1xuXHR2YXIgbGVuZ3RoICAgICAgICAgPSB0eXBlcy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzICAgICAgICAgICAgICA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKGlzKHR5cGVzW2luZGV4XSkpOyB9XG5cdHJldHVybiBmdW5jdGlvbiBhbmQgKHZhbHVlICAgICApICAgICAgICAgIHtcblx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXZlcnkgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdHZhciB2YWxpZGF0b3IgICAgICAgICAgICA9IGlzKHR5cGUpO1xuXHRyZXR1cm4gZnVuY3Rpb24gYXJyYXkgKHZhbHVlICAgICApICAgICAgICAgIHtcblx0XHRpZiAoICFpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gdmFsdWUubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQ/PSc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KHtcblx0aXM6IGlzLCBub3Q6IG5vdCxcblx0YW5kOiBhbmQsIG9yOiBvcixcblx0YmlnaW50OiBiaWdpbnQsIHN5bWJvbDogc3ltYm9sLCBzdHJpbmc6IHN0cmluZywgJ2Jvb2xlYW4nOiBCT09MRUFOLCBudW1iZXI6IG51bWJlcixcblx0dW5kZWZpbmVkOiB1bmRlZmluZWQsIE5hTjogTmFOLCBJbmZpbml0eTogSW5maW5pdHksXG5cdGV2ZXJ5OiBldmVyeSxcblx0J3ZvaWQnOiBWT0lELCBvcHRpb25hbDogb3B0aW9uYWwsIHN0cmljdDogc3RyaWN0LFxuXHRhbnk6IGFueSwgbmV2ZXI6IG5ldmVyLFxuXHR2ZXJzaW9uOiB2ZXJzaW9uXG59KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiXSwibmFtZXMiOlsidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGNBQWUsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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