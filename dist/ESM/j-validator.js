﻿/*!
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：3.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-validator/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-validator/
 */

var version = '3.0.0';

var toString = Object.prototype.toString;

var isArray = (
	/*! j-globals: Array.isArray (polyfill) */
	Array.isArray || function isArray (value) {
		return typeof value==='object' && /*#__PURE__*/ toString.call(value)==='[object Array]';
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

var MAX_ARRAY_LENGTH =       4294967295;// 0x00000000FFFFFFFF // 0b00000000000000000000011111111111111111111111111111111 // 0o0000000000037777777777 // 2**32-1
var LIKE_ARRAY_INDEX = /^(?:0|[1-4]\d{0,9}|[5-9]\d{0,8})$/;
function isArrayIndex (key) {
	return LIKE_ARRAY_INDEX.test(key) && key<MAX_ARRAY_LENGTH;
}
//function notThisRealm_and_isBuiltInArrayConstructorOfItsRealm (originalArray_constructor) { }
var TheUndefinedType = 1;
var TheNullType = 2;
var TheBooleanType = 3;
var TheStringType = 4;
var TheSymbolType = 5;
var TheNumberType = 6;
var TheObjectType = 7;
var TheBigIntType = 0;
function Type (argument) {
	switch ( typeof argument ) {
		case 'function':
			return TheObjectType;
		case 'object':
			return argument ? TheObjectType : TheNullType;// null
		case 'undefined':
			return argument===UNDEFINED ? TheUndefinedType : TheObjectType;// document.all
		case 'boolean':
			return TheBooleanType;
		case 'string':
			return TheStringType;
		case 'symbol':
			return TheSymbolType;
		case 'number':
			return TheNumberType;
		case 'bigint':
			return TheBigIntType;
		default:
			return TheObjectType;// unknown date ...
	}
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
					if ( Type(object)!==TheObjectType ) { throw TypeError('Reflect.ownKeys called on non-object'); }
					var keys = Object_getOwnPropertyNames(object);
					push.apply(keys, Object_getOwnPropertySymbols);
					return keys;
				}
				: function ownKeys (object) {
					if ( Type(object)!==TheObjectType ) { throw TypeError('Reflect.ownKeys called on non-object'); }
					return Object_getOwnPropertyNames(object);
				};
		}
		
		return function ownKeys (object) {
			return /*#__PURE__*/ __PURE__(object);
		};
		
	}()
	/*¡ j-globals: Reflect.ownKeys (polyfill) */
);

var Function_prototype_apply = Function.prototype.apply;

var apply = typeof Reflect==='object' ? Reflect.apply : (
	/*! j-globals: Reflect.apply (polyfill) */
	function apply (target, thisArg, args) {
		return Function_prototype_apply.call(target, thisArg, args);
	}
	/*¡ j-globals: Reflect.apply (polyfill) */
);

var assign = Object.assign;

var toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

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

function VOID (value     )          { return value===VOID; }

function any (value     )          { return value!==VOID; }
function never (value     )          { return false; }

function bigint (value     )          { return typeof value==='bigint'; }
function bigint_ (value     )          { return typeof value!=='bigint'; }
function symbol (value     )          { return typeof value==='symbol'; }
function symbol_ (value     )          { return typeof value!=='symbol'; }
function string (value     )          { return typeof value==='string'; }
function string_ (value     )          { return typeof value!=='string'; }
function boolean (value     )          { return typeof value==='boolean'; }
function boolean_ (value     )          { return typeof value!=='boolean'; }
function number (value     )          { return typeof value==='number'; }
function number_ (value     )          { return typeof value!=='number'; }
function undefined$1 (value     )          { return value===UNDEFINED; }
function undefined_ (value     )          { return value!==UNDEFINED; }

function NULL (value     )          { return value===null; }
function NULL_ (value     )          { return value!==null; }
function TRUE (value     )          { return value===true; }
function TRUE_ (value     )          { return value!==true; }
function FALSE (value     )          { return value===false; }
function FALSE_ (value     )          { return value!==false; }

function Infinity (value     )          { return value===INFINITY; }
Infinity.valueOf = function (                     )         { return INFINITY; };
function Infinity_ (value     )          { return value!==INFINITY; }
function _Infinity (value     )          { return value===_INFINITY; }
function _Infinity_ (value     )          { return value!==_INFINITY; }

function NaN (value     )          { return value!==value; }
function NaN_ (value     )          { return value===value; }

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

function ObjectValidator                   (type   , strict         , FALSE         )            {
	if ( strict && isArray(type) ) { throw TypeError('Validator.strict(type!object)'); }
	var expectKeys = ownKeys(type).reverse();
	var expectLength         = expectKeys.length;
	var validators                                  = create(null);
	for ( var index         = expectLength; index; ) {
		var key = expectKeys[--index];
		validators[key] = is(type[key]);
	}
	var TRUE          = !FALSE;
	return strict
		? function object (value     )          {
			if ( typeof value!=='object' || !value || isArray(value) ) { return FALSE; }
			var index         = 0;
			for ( var keys = ownKeys(value), length         = keys.length; index<length; ++index ) {
				if ( !( keys[index] in validators ) ) { return FALSE; }
			}
			for ( index = expectLength; index; ) {
				var key = expectKeys[--index];
				if ( !validators[key](key in value ? value[key] : VOID) ) { return FALSE; }
			}
			return TRUE;
		}
		: function object (value     )          {
			if ( typeof value!=='object' || !value || isArray(value) ) { return FALSE; }
			for ( var index         = expectLength; index; ) {
				var key = expectKeys[--index];
				if ( !validators[key](key in value ? value[key] : VOID) ) { return FALSE; }
			}
			return TRUE;
		};
}

function ArrayValidator (type       , like         , FALSE         )            {
	var length         = type.length;
	var validators              = [];
	for ( var index         = 0; index<length; ++index ) { validators.push(is(type[index])); }
	var TRUE          = !FALSE;
	return like
		? function arrayLike (value     )          {
			if ( value.length!==length ) { return FALSE; }
			for ( var index         = 0; index<length; ++index ) {
				if ( !validators[index](value[index]) ) { return FALSE; }
			}
			return TRUE;
		}
		: function array (value     )          {
			if ( !isArray(value) ) { return FALSE; }
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
					typeof type==='object' ? /*#__PURE__*/ ( isArray(type) ? ArrayValidator : ObjectValidator )(type, false, false) :
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
			case boolean:
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
				typeof type==='object' ? /*#__PURE__*/ ( isArray(type) ? ArrayValidator : ObjectValidator )(type, false, true) :
					type===0 ? O_(type) ? _O_ : O_ :
						type!==type ? NaN_ :
							type===INFINITY ? Infinity_ : type===_INFINITY ? _Infinity_ :
								function notType (value     )          { return value!==type; };
}

function strict (type        , not         )            {
	return /*#__PURE__*/ ObjectValidator(type, true, not || false);
}

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

var comma_repeat                            = ''.repeat
	? function comma_repeat (count        )         { return ','.repeat(count); }
	: function () {
		var commas           = [];
		return function comma_repeat (count        )         {
			commas.length = count+1;
			return commas.join(',');
		};
	}();
function overload                                    (types       , callback   )    { return /*#__PURE__*/ Overloaded.apply(null, arguments       )     ; }
function Overloaded                                    (types       , callback   )    {
	var validator            = is(types);
	if ( typeof callback!=='function' ) { throw TypeError('Validator.overload(,callback!function)'); }
	var validators             ;
	var callbacks     ;
	var length         = arguments.length;
	var fallback   ;
	if ( length%2 ) {
		fallback = arguments[--length];
		if ( typeof fallback!=='function' ) { throw TypeError('Validator.overload('+comma_repeat(length)+'fallback!function)'); }
	}
	if ( length<3 ) { length = 0; }
	else {
		validators = [];
		callbacks = [];
		for ( var index         = 2; index<length; ++index ) {
			validators.push(ArrayValidator(arguments[index], true, false));
			var cb    = arguments[++index];
			if ( typeof cb!=='function' ) { throw TypeError('Validator.overload('+comma_repeat(index)+'callback!function)'); }
			callbacks.push(cb);
		}
		length = validators.length;
	}
	return function overloaded (         )                {
		if ( validator(arguments) ) { return apply(callback, this, arguments); }
		for ( var index         = 0; index<length; ++index ) {
			if ( validators[index](arguments) ) { return apply(callbacks[index], this, arguments); }
		}
		if ( fallback ) { return apply(fallback, this, arguments); }
		throw TypeError();
	}     ;
}
var _export = Default({
	is: is, not: not,
	and: and, or: or,
	bigint: bigint, symbol: symbol, string: string, boolean: boolean, number: number,
	undefined: undefined$1, NaN: NaN, Infinity: Infinity,
	every: every,
	'void': VOID, optional: optional, strict: strict,
	any: any, never: never,
	overload: overload,
	version: version
});

export default _export;
export { Infinity, NaN, and, any, bigint, boolean, every, is, never, not, number, optional, or, overload, strict, string, symbol, undefined$1 as undefined, version, VOID as void };

/*¡ j-validator */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMy4wLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0IGZyb20gJy5PYmplY3QnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz89JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT89JztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgVU5ERUZJTkVEIGZyb20gJy51bmRlZmluZWQnO1xuXG52YXIgT2JqZWN0X2lzID0gKCBPYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuaXM7XG52YXIgX0lORklOSVRZID0gLUlORklOSVRZO1xuXG5mdW5jdGlvbiBWT0lEICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PVZPSUQ7IH1cbmV4cG9ydCB7IFZPSUQgYXMgdm9pZCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gYW55ICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PVZPSUQ7IH1cbmV4cG9ydCBmdW5jdGlvbiBuZXZlciAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gZmFsc2U7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpZ2ludCAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J2JpZ2ludCc7IH1cbmZ1bmN0aW9uIGJpZ2ludF8gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSE9PSdiaWdpbnQnOyB9XG5leHBvcnQgZnVuY3Rpb24gc3ltYm9sICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nc3ltYm9sJzsgfVxuZnVuY3Rpb24gc3ltYm9sXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J3N5bWJvbCc7IH1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmcgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnOyB9XG5mdW5jdGlvbiBzdHJpbmdfICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWUhPT0nc3RyaW5nJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIGJvb2xlYW4gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdib29sZWFuJzsgfVxuZnVuY3Rpb24gYm9vbGVhbl8gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSE9PSdib29sZWFuJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlciAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J251bWJlcic7IH1cbmZ1bmN0aW9uIG51bWJlcl8gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSE9PSdudW1iZXInOyB9XG5leHBvcnQgZnVuY3Rpb24gdW5kZWZpbmVkICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PVVOREVGSU5FRDsgfVxuZnVuY3Rpb24gdW5kZWZpbmVkXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT1VTkRFRklORUQ7IH1cblxuZnVuY3Rpb24gTlVMTCAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1udWxsOyB9XG5mdW5jdGlvbiBOVUxMXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT1udWxsOyB9XG5mdW5jdGlvbiBUUlVFICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PXRydWU7IH1cbmZ1bmN0aW9uIFRSVUVfICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXRydWU7IH1cbmZ1bmN0aW9uIEZBTFNFICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PWZhbHNlOyB9XG5mdW5jdGlvbiBGQUxTRV8gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09ZmFsc2U7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIEluZmluaXR5ICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PUlORklOSVRZOyB9XG5JbmZpbml0eS52YWx1ZU9mID0gZnVuY3Rpb24gKCAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiBJTkZJTklUWTsgfTtcbmZ1bmN0aW9uIEluZmluaXR5XyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT1JTkZJTklUWTsgfVxuZnVuY3Rpb24gX0luZmluaXR5ICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PV9JTkZJTklUWTsgfVxuZnVuY3Rpb24gX0luZmluaXR5XyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT1fSU5GSU5JVFk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIE5hTiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT12YWx1ZTsgfVxuZnVuY3Rpb24gTmFOXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT12YWx1ZTsgfVxuXG52YXIgTyAgICAgICAgICAgID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gTyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gT2JqZWN0X2lzICh2YWx1ZSwgMCk7IH1cblx0OiBmdW5jdGlvbiBPICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PTAgJiYgMS92YWx1ZT4wOyB9O1xudmFyIE9fICAgICAgICAgICAgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBPXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gIU9iamVjdF9pcyAodmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gT18gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09MCB8fCAxL3ZhbHVlPDA7IH07XG52YXIgX08gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIF9PICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiBPYmplY3RfaXMgKHZhbHVlLCAtMCk7IH1cblx0OiBmdW5jdGlvbiBfTyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT0wICYmIDEvdmFsdWU8MDsgfTtcbnZhciBfT18gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIF9PXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gIU9iamVjdF9pcyAodmFsdWUsIC0wKTsgfVxuXHQ6IGZ1bmN0aW9uIF9PXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT0wIHx8IDEvdmFsdWU+MDsgfTtcblxuZnVuY3Rpb24gT2JqZWN0VmFsaWRhdG9yICAgICAgICAgICAgICAgICAgICh0eXBlICAgLCBzdHJpY3QgICAgICAgICAsIEZBTFNFICAgICAgICAgKSAgICAgICAgICAgIHtcblx0aWYgKCBzdHJpY3QgJiYgaXNBcnJheSh0eXBlKSApIHsgdGhyb3cgVHlwZUVycm9yKCdWYWxpZGF0b3Iuc3RyaWN0KHR5cGUhb2JqZWN0KScpOyB9XG5cdHZhciBleHBlY3RLZXlzID0gb3duS2V5cyh0eXBlKS5yZXZlcnNlKCk7XG5cdHZhciBleHBlY3RMZW5ndGggICAgICAgICA9IGV4cGVjdEtleXMubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGNyZWF0ZShudWxsKTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBleHBlY3RMZW5ndGg7IGluZGV4OyApIHtcblx0XHR2YXIga2V5ID0gZXhwZWN0S2V5c1stLWluZGV4XTtcblx0XHR2YWxpZGF0b3JzW2tleV0gPSBpcyh0eXBlW2tleV0pO1xuXHR9XG5cdHZhciBUUlVFICAgICAgICAgID0gIUZBTFNFO1xuXHRyZXR1cm4gc3RyaWN0XG5cdFx0PyBmdW5jdGlvbiBvYmplY3QgKHZhbHVlICAgICApICAgICAgICAgIHtcblx0XHRcdGlmICggdHlwZW9mIHZhbHVlIT09J29iamVjdCcgfHwgIXZhbHVlIHx8IGlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdHZhciBpbmRleCAgICAgICAgID0gMDtcblx0XHRcdGZvciAoIHZhciBrZXlzID0gb3duS2V5cyh2YWx1ZSksIGxlbmd0aCAgICAgICAgID0ga2V5cy5sZW5ndGg7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdFx0aWYgKCAhKCBrZXlzW2luZGV4XSBpbiB2YWxpZGF0b3JzICkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0fVxuXHRcdFx0Zm9yICggaW5kZXggPSBleHBlY3RMZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0XHRcdGlmICggIXZhbGlkYXRvcnNba2V5XShrZXkgaW4gdmFsdWUgPyB2YWx1ZVtrZXldIDogVk9JRCkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFRSVUU7XG5cdFx0fVxuXHRcdDogZnVuY3Rpb24gb2JqZWN0ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZSE9PSdvYmplY3QnIHx8ICF2YWx1ZSB8fCBpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IGV4cGVjdExlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0XHR2YXIga2V5ID0gZXhwZWN0S2V5c1stLWluZGV4XTtcblx0XHRcdFx0aWYgKCAhdmFsaWRhdG9yc1trZXldKGtleSBpbiB2YWx1ZSA/IHZhbHVlW2tleV0gOiBWT0lEKSApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gVFJVRTtcblx0XHR9O1xufVxuXG5mdW5jdGlvbiBBcnJheVZhbGlkYXRvciAodHlwZSAgICAgICAsIGxpa2UgICAgICAgICAsIEZBTFNFICAgICAgICAgKSAgICAgICAgICAgIHtcblx0dmFyIGxlbmd0aCAgICAgICAgID0gdHlwZS5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzICAgICAgICAgICAgICA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKGlzKHR5cGVbaW5kZXhdKSk7IH1cblx0dmFyIFRSVUUgICAgICAgICAgPSAhRkFMU0U7XG5cdHJldHVybiBsaWtlXG5cdFx0PyBmdW5jdGlvbiBhcnJheUxpa2UgKHZhbHVlICAgICApICAgICAgICAgIHtcblx0XHRcdGlmICggdmFsdWUubGVuZ3RoIT09bGVuZ3RoICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0XHRpZiAoICF2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBUUlVFO1xuXHRcdH1cblx0XHQ6IGZ1bmN0aW9uIGFycmF5ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRpZiAoICFpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHRpZiAoIHZhbHVlLmxlbmd0aCE9PWxlbmd0aCApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdFx0aWYgKCAhdmFsaWRhdG9yc1tpbmRleF0odmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gVFJVRTtcblx0XHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXMgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdHJldHVybiB0eXBlb2YgdHlwZT09PSdmdW5jdGlvbicgPyB0eXBlIDpcblx0XHR1bmRlZmluZWQodHlwZSkgPyB1bmRlZmluZWQgOlxuXHRcdFx0VFJVRSh0eXBlKSA/IFRSVUUgOiBGQUxTRSh0eXBlKSA/IEZBTFNFIDpcblx0XHRcdFx0TlVMTCh0eXBlKSA/IE5VTEwgOlxuXHRcdFx0XHRcdHR5cGVvZiB0eXBlPT09J29iamVjdCcgPyAvKiNfX1BVUkVfXyovICggaXNBcnJheSh0eXBlKSA/IEFycmF5VmFsaWRhdG9yIDogT2JqZWN0VmFsaWRhdG9yICkodHlwZSwgZmFsc2UsIGZhbHNlKSA6XG5cdFx0XHRcdFx0XHRPKHR5cGUpID8gTyA6IF9PKHR5cGUpID8gX08gOlxuXHRcdFx0XHRcdFx0XHR0eXBlIT09dHlwZSA/IE5hTiA6XG5cdFx0XHRcdFx0XHRcdFx0dHlwZT09PUlORklOSVRZID8gSW5maW5pdHkgOiB0eXBlPT09X0lORklOSVRZID8gX0luZmluaXR5IDpcblx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIGlzVHlwZSAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT10eXBlOyB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIG5vdCAodHlwZSAgICAgKSAgICAgICAgICAgIHtcblx0aWYgKCB0eXBlb2YgdHlwZT09PSdmdW5jdGlvbicgKSB7XG5cdFx0c3dpdGNoICggdHlwZSApIHtcblx0XHRcdGNhc2UgYmlnaW50OlxuXHRcdFx0XHRyZXR1cm4gYmlnaW50Xztcblx0XHRcdGNhc2Ugc3ltYm9sOlxuXHRcdFx0XHRyZXR1cm4gc3ltYm9sXztcblx0XHRcdGNhc2Ugc3RyaW5nOlxuXHRcdFx0XHRyZXR1cm4gc3RyaW5nXztcblx0XHRcdGNhc2UgYm9vbGVhbjpcblx0XHRcdFx0cmV0dXJuIGJvb2xlYW5fO1xuXHRcdFx0Y2FzZSBudW1iZXI6XG5cdFx0XHRcdHJldHVybiBudW1iZXJfO1xuXHRcdFx0Y2FzZSB1bmRlZmluZWQ6XG5cdFx0XHRcdHJldHVybiB1bmRlZmluZWRfO1xuXHRcdFx0Y2FzZSBJbmZpbml0eTpcblx0XHRcdFx0cmV0dXJuIEluZmluaXR5Xztcblx0XHR9XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIG5vdFR5cGUgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuICF0eXBlKHZhbHVlKTsgfTtcblx0fVxuXHRyZXR1cm4gdHlwZT09PVVOREVGSU5FRCA/IHVuZGVmaW5lZF8gOlxuXHRcdHR5cGU9PT10cnVlID8gVFJVRV8gOiB0eXBlPT09ZmFsc2UgPyBGQUxTRV8gOlxuXHRcdFx0dHlwZT09PW51bGwgPyBOVUxMXyA6XG5cdFx0XHRcdHR5cGVvZiB0eXBlPT09J29iamVjdCcgPyAvKiNfX1BVUkVfXyovICggaXNBcnJheSh0eXBlKSA/IEFycmF5VmFsaWRhdG9yIDogT2JqZWN0VmFsaWRhdG9yICkodHlwZSwgZmFsc2UsIHRydWUpIDpcblx0XHRcdFx0XHR0eXBlPT09MCA/IE9fKHR5cGUpID8gX09fIDogT18gOlxuXHRcdFx0XHRcdFx0dHlwZSE9PXR5cGUgPyBOYU5fIDpcblx0XHRcdFx0XHRcdFx0dHlwZT09PUlORklOSVRZID8gSW5maW5pdHlfIDogdHlwZT09PV9JTkZJTklUWSA/IF9JbmZpbml0eV8gOlxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIG5vdFR5cGUgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09dHlwZTsgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmljdCAodHlwZSAgICAgICAgLCBub3QgICAgICAgICApICAgICAgICAgICAge1xuXHRyZXR1cm4gLyojX19QVVJFX18qLyBPYmplY3RWYWxpZGF0b3IodHlwZSwgdHJ1ZSwgbm90IHx8IGZhbHNlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wdGlvbmFsICh0eXBlICAgICApICAgICAgICAgICAge1xuXHR2YXIgdmFsaWRhdG9yICAgICAgICAgICAgPSBpcyh0eXBlKTtcblx0cmV0dXJuIGZ1bmN0aW9uIG9wdGlvbmFsVmFsaWRhdG9yICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PVZPSUQgfHwgdmFsaWRhdG9yKHZhbHVlKTsgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9yICh0eXBlICAgICApICAgICAgICAgICAge1xuXHR2YXIgdHlwZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBhcmd1bWVudHMubGVuZ3RoPT09MSAmJiBpc0FycmF5KHR5cGUpID8gdHlwZSA6IGFyZ3VtZW50cztcblx0dmFyIGxlbmd0aCAgICAgICAgID0gdHlwZXMubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyAgICAgICAgICAgICAgPSBbXTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IHZhbGlkYXRvcnMucHVzaChpcyh0eXBlc1tpbmRleF0pKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gb3IgKHZhbHVlICAgICApICAgICAgICAgIHtcblx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggdmFsaWRhdG9yc1tpbmRleF0odmFsdWUpICkgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG59XG5leHBvcnQgZnVuY3Rpb24gYW5kICh0eXBlICAgICApICAgICAgICAgICAge1xuXHR2YXIgdHlwZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBhcmd1bWVudHMubGVuZ3RoPT09MSAmJiBpc0FycmF5KHR5cGUpID8gdHlwZSA6IGFyZ3VtZW50cztcblx0dmFyIGxlbmd0aCAgICAgICAgID0gdHlwZXMubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyAgICAgICAgICAgICAgPSBbXTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IHZhbGlkYXRvcnMucHVzaChpcyh0eXBlc1tpbmRleF0pKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gYW5kICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoICF2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZXJ5ICh0eXBlICAgICApICAgICAgICAgICAge1xuXHR2YXIgdmFsaWRhdG9yICAgICAgICAgICAgPSBpcyh0eXBlKTtcblx0cmV0dXJuIGZ1bmN0aW9uIGFycmF5ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0aWYgKCAhaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IHZhbHVlLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcih2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbnZhciBjb21tYV9yZXBlYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSAnJy5yZXBlYXRcblx0PyBmdW5jdGlvbiBjb21tYV9yZXBlYXQgKGNvdW50ICAgICAgICApICAgICAgICAgeyByZXR1cm4gJywnLnJlcGVhdChjb3VudCk7IH1cblx0OiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGNvbW1hcyAgICAgICAgICAgPSBbXTtcblx0XHRyZXR1cm4gZnVuY3Rpb24gY29tbWFfcmVwZWF0IChjb3VudCAgICAgICAgKSAgICAgICAgIHtcblx0XHRcdGNvbW1hcy5sZW5ndGggPSBjb3VudCsxO1xuXHRcdFx0cmV0dXJuIGNvbW1hcy5qb2luKCcsJyk7XG5cdFx0fTtcblx0fSgpO1xuZXhwb3J0IGZ1bmN0aW9uIG92ZXJsb2FkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVzICAgICAgICwgY2FsbGJhY2sgICApICAgIHsgcmV0dXJuIC8qI19fUFVSRV9fKi8gT3ZlcmxvYWRlZC5hcHBseShudWxsLCBhcmd1bWVudHMgICAgICAgKSAgICAgOyB9XG5mdW5jdGlvbiBPdmVybG9hZGVkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVzICAgICAgICwgY2FsbGJhY2sgICApICAgIHtcblx0dmFyIHZhbGlkYXRvciAgICAgICAgICAgID0gaXModHlwZXMpO1xuXHRpZiAoIHR5cGVvZiBjYWxsYmFjayE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcignVmFsaWRhdG9yLm92ZXJsb2FkKCxjYWxsYmFjayFmdW5jdGlvbiknKTsgfVxuXHR2YXIgdmFsaWRhdG9ycyAgICAgICAgICAgICA7XG5cdHZhciBjYWxsYmFja3MgICAgIDtcblx0dmFyIGxlbmd0aCAgICAgICAgID0gYXJndW1lbnRzLmxlbmd0aDtcblx0dmFyIGZhbGxiYWNrICAgO1xuXHRpZiAoIGxlbmd0aCUyICkge1xuXHRcdGZhbGxiYWNrID0gYXJndW1lbnRzWy0tbGVuZ3RoXTtcblx0XHRpZiAoIHR5cGVvZiBmYWxsYmFjayE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcignVmFsaWRhdG9yLm92ZXJsb2FkKCcrY29tbWFfcmVwZWF0KGxlbmd0aCkrJ2ZhbGxiYWNrIWZ1bmN0aW9uKScpOyB9XG5cdH1cblx0aWYgKCBsZW5ndGg8MyApIHsgbGVuZ3RoID0gMDsgfVxuXHRlbHNlIHtcblx0XHR2YWxpZGF0b3JzID0gW107XG5cdFx0Y2FsbGJhY2tzID0gW107XG5cdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAyOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHR2YWxpZGF0b3JzLnB1c2goQXJyYXlWYWxpZGF0b3IoYXJndW1lbnRzW2luZGV4XSwgdHJ1ZSwgZmFsc2UpKTtcblx0XHRcdHZhciBjYiAgICA9IGFyZ3VtZW50c1srK2luZGV4XTtcblx0XHRcdGlmICggdHlwZW9mIGNiIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKCdWYWxpZGF0b3Iub3ZlcmxvYWQoJytjb21tYV9yZXBlYXQoaW5kZXgpKydjYWxsYmFjayFmdW5jdGlvbiknKTsgfVxuXHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuXHRcdH1cblx0XHRsZW5ndGggPSB2YWxpZGF0b3JzLmxlbmd0aDtcblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gb3ZlcmxvYWRlZCAoICAgICAgICAgKSAgICAgICAgICAgICAgICB7XG5cdFx0aWYgKCB2YWxpZGF0b3IoYXJndW1lbnRzKSApIHsgcmV0dXJuIGFwcGx5KGNhbGxiYWNrLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoIHZhbGlkYXRvcnNbaW5kZXhdKGFyZ3VtZW50cykgKSB7IHJldHVybiBhcHBseShjYWxsYmFja3NbaW5kZXhdLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0fVxuXHRcdGlmICggZmFsbGJhY2sgKSB7IHJldHVybiBhcHBseShmYWxsYmFjaywgdGhpcywgYXJndW1lbnRzKTsgfVxuXHRcdHRocm93IFR5cGVFcnJvcigpO1xuXHR9ICAgICA7XG59XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0Pz0nO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdGlzOiBpcywgbm90OiBub3QsXG5cdGFuZDogYW5kLCBvcjogb3IsXG5cdGJpZ2ludDogYmlnaW50LCBzeW1ib2w6IHN5bWJvbCwgc3RyaW5nOiBzdHJpbmcsIGJvb2xlYW46IGJvb2xlYW4sIG51bWJlcjogbnVtYmVyLFxuXHR1bmRlZmluZWQ6IHVuZGVmaW5lZCwgTmFOOiBOYU4sIEluZmluaXR5OiBJbmZpbml0eSxcblx0ZXZlcnk6IGV2ZXJ5LFxuXHQndm9pZCc6IFZPSUQsIG9wdGlvbmFsOiBvcHRpb25hbCwgc3RyaWN0OiBzdHJpY3QsXG5cdGFueTogYW55LCBuZXZlcjogbmV2ZXIsXG5cdG92ZXJsb2FkOiBvdmVybG9hZCxcblx0dmVyc2lvbjogdmVyc2lvblxufSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIl0sIm5hbWVzIjpbInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxjQUFlLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkFBQyx0QkNZdkIsSUFBSSxTQUFTLEdBQUcsRUFBRSxNQUFNLHdDQUF3QyxFQUFFLENBQUM7QUFDbkUsSUFBSSxTQUFTLEdBQUcsQ0FBQyxRQUFRLENBQUM7O0FBRTFCLFNBQVMsSUFBSSxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUU7QUFDNUQsQUFDQTtBQUNBLEFBQU8sU0FBUyxHQUFHLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRTtBQUNsRSxBQUFPLFNBQVMsS0FBSyxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxLQUFLLENBQUMsRUFBRTs7QUFFN0QsQUFBTyxTQUFTLE1BQU0sRUFBRSxLQUFLLGdCQUFnQixFQUFFLE9BQU8sT0FBTyxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUU7QUFDaEYsU0FBUyxPQUFPLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLE9BQU8sS0FBSyxHQUFHLFFBQVEsQ0FBQyxFQUFFO0FBQzFFLEFBQU8sU0FBUyxNQUFNLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLE9BQU8sS0FBSyxHQUFHLFFBQVEsQ0FBQyxFQUFFO0FBQ2hGLFNBQVMsT0FBTyxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxPQUFPLEtBQUssR0FBRyxRQUFRLENBQUMsRUFBRTtBQUMxRSxBQUFPLFNBQVMsTUFBTSxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxPQUFPLEtBQUssR0FBRyxRQUFRLENBQUMsRUFBRTtBQUNoRixTQUFTLE9BQU8sRUFBRSxLQUFLLGdCQUFnQixFQUFFLE9BQU8sT0FBTyxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUU7QUFDMUUsQUFBTyxTQUFTLE9BQU8sRUFBRSxLQUFLLGdCQUFnQixFQUFFLE9BQU8sT0FBTyxLQUFLLEdBQUcsU0FBUyxDQUFDLEVBQUU7QUFDbEYsU0FBUyxRQUFRLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLE9BQU8sS0FBSyxHQUFHLFNBQVMsQ0FBQyxFQUFFO0FBQzVFLEFBQU8sU0FBUyxNQUFNLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLE9BQU8sS0FBSyxHQUFHLFFBQVEsQ0FBQyxFQUFFO0FBQ2hGLFNBQVMsT0FBTyxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxPQUFPLEtBQUssR0FBRyxRQUFRLENBQUMsRUFBRTtBQUMxRSxBQUFPLFNBQVNBLFdBQVMsRUFBRSxLQUFLLGdCQUFnQixFQUFFLE9BQU8sS0FBSyxHQUFHLFNBQVMsQ0FBQyxFQUFFO0FBQzdFLFNBQVMsVUFBVSxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxLQUFLLEdBQUcsU0FBUyxDQUFDLEVBQUU7O0FBRXZFLFNBQVMsSUFBSSxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUU7QUFDNUQsU0FBUyxLQUFLLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRTtBQUM3RCxTQUFTLElBQUksRUFBRSxLQUFLLGdCQUFnQixFQUFFLE9BQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFO0FBQzVELFNBQVMsS0FBSyxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUU7QUFDN0QsU0FBUyxLQUFLLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRTtBQUM5RCxTQUFTLE1BQU0sRUFBRSxLQUFLLGdCQUFnQixFQUFFLE9BQU8sS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFOztBQUUvRCxBQUFPLFNBQVMsUUFBUSxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUU7QUFDM0UsUUFBUSxDQUFDLE9BQU8sR0FBRyx5Q0FBeUMsRUFBRSxPQUFPLFFBQVEsQ0FBQyxFQUFFLENBQUM7QUFDakYsU0FBUyxTQUFTLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLEtBQUssR0FBRyxRQUFRLENBQUMsRUFBRTtBQUNyRSxTQUFTLFNBQVMsRUFBRSxLQUFLLGdCQUFnQixFQUFFLE9BQU8sS0FBSyxHQUFHLFNBQVMsQ0FBQyxFQUFFO0FBQ3RFLFNBQVMsVUFBVSxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxLQUFLLEdBQUcsU0FBUyxDQUFDLEVBQUU7O0FBRXZFLEFBQU8sU0FBUyxHQUFHLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRTtBQUNuRSxTQUFTLElBQUksRUFBRSxLQUFLLGdCQUFnQixFQUFFLE9BQU8sS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFOztBQUU3RCxJQUFJLENBQUMsY0FBYyxTQUFTO0dBQ3pCLFNBQVMsQ0FBQyxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7R0FDakUsU0FBUyxDQUFDLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3ZFLElBQUksRUFBRSxjQUFjLFNBQVM7R0FDMUIsU0FBUyxFQUFFLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO0dBQ25FLFNBQVMsRUFBRSxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN4RSxJQUFJLEVBQUUsY0FBYyxTQUFTO0dBQzFCLFNBQVMsRUFBRSxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtHQUNuRSxTQUFTLEVBQUUsRUFBRSxLQUFLLGdCQUFnQixFQUFFLE9BQU8sS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDeEUsSUFBSSxHQUFHLGNBQWMsU0FBUztHQUMzQixTQUFTLEdBQUcsRUFBRSxLQUFLLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtHQUNyRSxTQUFTLEdBQUcsRUFBRSxLQUFLLGdCQUFnQixFQUFFLE9BQU8sS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7O0FBRXpFLFNBQVMsZUFBZSxvQkFBb0IsSUFBSSxLQUFLLE1BQU0sV0FBVyxLQUFLLHNCQUFzQjtDQUNoRyxLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLFNBQVMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLEVBQUU7Q0FDcEYsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0NBQ3pDLElBQUksWUFBWSxXQUFXLFVBQVUsQ0FBQyxNQUFNLENBQUM7Q0FDN0MsSUFBSSxVQUFVLG9DQUFvQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDL0QsTUFBTSxJQUFJLEtBQUssV0FBVyxZQUFZLEVBQUUsS0FBSyxJQUFJO0VBQ2hELElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0VBQzlCLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDaEM7Q0FDRCxJQUFJLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQztDQUMzQixPQUFPLE1BQU07SUFDVixTQUFTLE1BQU0sRUFBRSxLQUFLLGdCQUFnQjtHQUN2QyxLQUFLLE9BQU8sS0FBSyxHQUFHLFFBQVEsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEtBQUssQ0FBQyxFQUFFO0dBQzVFLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQztHQUN0QixNQUFNLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLFdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxHQUFHO0lBQ3RGLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksVUFBVSxFQUFFLEdBQUcsRUFBRSxPQUFPLEtBQUssQ0FBQyxFQUFFO0lBQ3ZEO0dBQ0QsTUFBTSxLQUFLLEdBQUcsWUFBWSxFQUFFLEtBQUssSUFBSTtJQUNwQyxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5QixLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxLQUFLLENBQUMsRUFBRTtJQUMzRTtHQUNELE9BQU8sSUFBSSxDQUFDO0dBQ1o7SUFDQyxTQUFTLE1BQU0sRUFBRSxLQUFLLGdCQUFnQjtHQUN2QyxLQUFLLE9BQU8sS0FBSyxHQUFHLFFBQVEsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEtBQUssQ0FBQyxFQUFFO0dBQzVFLE1BQU0sSUFBSSxLQUFLLFdBQVcsWUFBWSxFQUFFLEtBQUssSUFBSTtJQUNoRCxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5QixLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxLQUFLLENBQUMsRUFBRTtJQUMzRTtHQUNELE9BQU8sSUFBSSxDQUFDO0dBQ1osQ0FBQztDQUNIOztBQUVELFNBQVMsY0FBYyxFQUFFLElBQUksU0FBUyxJQUFJLFdBQVcsS0FBSyxzQkFBc0I7Q0FDL0UsSUFBSSxNQUFNLFdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQztDQUNqQyxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsQ0FBQztDQUNqQyxNQUFNLElBQUksS0FBSyxXQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0NBQzFGLElBQUksSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDO0NBQzNCLE9BQU8sSUFBSTtJQUNSLFNBQVMsU0FBUyxFQUFFLEtBQUssZ0JBQWdCO0dBQzFDLEtBQUssS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBRSxPQUFPLEtBQUssQ0FBQyxFQUFFO0dBQzlDLE1BQU0sSUFBSSxLQUFLLFdBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEdBQUc7SUFDcEQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLE9BQU8sS0FBSyxDQUFDLEVBQUU7SUFDekQ7R0FDRCxPQUFPLElBQUksQ0FBQztHQUNaO0lBQ0MsU0FBUyxLQUFLLEVBQUUsS0FBSyxnQkFBZ0I7R0FDdEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sS0FBSyxDQUFDLEVBQUU7R0FDeEMsS0FBSyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxFQUFFLE9BQU8sS0FBSyxDQUFDLEVBQUU7R0FDOUMsTUFBTSxJQUFJLEtBQUssV0FBVyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssR0FBRztJQUNwRCxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxLQUFLLENBQUMsRUFBRTtJQUN6RDtHQUNELE9BQU8sSUFBSSxDQUFDO0dBQ1osQ0FBQztDQUNIOztBQUVELEFBQU8sU0FBUyxFQUFFLEVBQUUsSUFBSSxrQkFBa0I7Q0FDekMsT0FBTyxPQUFPLElBQUksR0FBRyxVQUFVLEdBQUcsSUFBSTtFQUNyQ0EsV0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHQSxXQUFTO0dBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUs7SUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7S0FDaEIsT0FBTyxJQUFJLEdBQUcsUUFBUSxpQkFBaUIsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBYyxHQUFHLGVBQWUsR0FBRyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztNQUM5RyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO09BQzFCLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRztRQUNoQixJQUFJLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsU0FBUyxHQUFHLFNBQVM7U0FDeEQsU0FBUyxNQUFNLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0NBQ3ZFO0FBQ0QsQUFBTyxTQUFTLEdBQUcsRUFBRSxJQUFJLGtCQUFrQjtDQUMxQyxLQUFLLE9BQU8sSUFBSSxHQUFHLFVBQVUsR0FBRztFQUMvQixTQUFTLElBQUk7R0FDWixLQUFLLE1BQU07SUFDVixPQUFPLE9BQU8sQ0FBQztHQUNoQixLQUFLLE1BQU07SUFDVixPQUFPLE9BQU8sQ0FBQztHQUNoQixLQUFLLE1BQU07SUFDVixPQUFPLE9BQU8sQ0FBQztHQUNoQixLQUFLLE9BQU87SUFDWCxPQUFPLFFBQVEsQ0FBQztHQUNqQixLQUFLLE1BQU07SUFDVixPQUFPLE9BQU8sQ0FBQztHQUNoQixLQUFLQSxXQUFTO0lBQ2IsT0FBTyxVQUFVLENBQUM7R0FDbkIsS0FBSyxRQUFRO0lBQ1osT0FBTyxTQUFTLENBQUM7R0FDbEI7RUFDRCxPQUFPLFNBQVMsT0FBTyxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7RUFDdkU7Q0FDRCxPQUFPLElBQUksR0FBRyxTQUFTLEdBQUcsVUFBVTtFQUNuQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLE1BQU07R0FDMUMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0lBQ2xCLE9BQU8sSUFBSSxHQUFHLFFBQVEsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLGNBQWMsR0FBRyxlQUFlLEdBQUcsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7S0FDN0csSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUU7TUFDN0IsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJO09BQ2pCLElBQUksR0FBRyxRQUFRLEdBQUcsU0FBUyxHQUFHLElBQUksR0FBRyxTQUFTLEdBQUcsVUFBVTtRQUMxRCxTQUFTLE9BQU8sRUFBRSxLQUFLLGdCQUFnQixFQUFFLE9BQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7Q0FDdkU7O0FBRUQsQUFBTyxTQUFTLE1BQU0sRUFBRSxJQUFJLFVBQVUsR0FBRyxzQkFBc0I7Q0FDOUQscUJBQXFCLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQztDQUMvRDs7QUFFRCxBQUFPLFNBQVMsUUFBUSxFQUFFLElBQUksa0JBQWtCO0NBQy9DLElBQUksU0FBUyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNwQyxPQUFPLFNBQVMsaUJBQWlCLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLEtBQUssR0FBRyxJQUFJLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUNyRzs7QUFFRCxBQUFPLFNBQVMsRUFBRSxFQUFFLElBQUksa0JBQWtCO0NBQ3pDLElBQUksS0FBSyw2Q0FBNkMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxTQUFTLENBQUM7Q0FDL0csSUFBSSxNQUFNLFdBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQztDQUNsQyxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsQ0FBQztDQUNqQyxNQUFNLElBQUksS0FBSyxXQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0NBQzNGLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSyxnQkFBZ0I7RUFDeEMsTUFBTSxJQUFJLEtBQUssV0FBVyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssR0FBRztHQUNwRCxLQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUU7R0FDaEQ7RUFDRCxPQUFPLEtBQUssQ0FBQztFQUNiLENBQUM7Q0FDRjtBQUNELEFBQU8sU0FBUyxHQUFHLEVBQUUsSUFBSSxrQkFBa0I7Q0FDMUMsSUFBSSxLQUFLLDZDQUE2QyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLFNBQVMsQ0FBQztDQUMvRyxJQUFJLE1BQU0sV0FBVyxLQUFLLENBQUMsTUFBTSxDQUFDO0NBQ2xDLElBQUksVUFBVSxnQkFBZ0IsRUFBRSxDQUFDO0NBQ2pDLE1BQU0sSUFBSSxLQUFLLFdBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEdBQUcsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Q0FDM0YsT0FBTyxTQUFTLEdBQUcsRUFBRSxLQUFLLGdCQUFnQjtFQUN6QyxNQUFNLElBQUksS0FBSyxXQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxHQUFHO0dBQ3BELEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEtBQUssQ0FBQyxFQUFFO0dBQ2xEO0VBQ0QsT0FBTyxJQUFJLENBQUM7RUFDWixDQUFDO0NBQ0Y7O0FBRUQsQUFBTyxTQUFTLEtBQUssRUFBRSxJQUFJLGtCQUFrQjtDQUM1QyxJQUFJLFNBQVMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDcEMsT0FBTyxTQUFTLEtBQUssRUFBRSxLQUFLLGdCQUFnQjtFQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxLQUFLLENBQUMsRUFBRTtFQUN4QyxNQUFNLElBQUksTUFBTSxXQUFXLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxXQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxHQUFHO0dBQ25GLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxPQUFPLEtBQUssQ0FBQyxFQUFFO0dBQ2pEO0VBQ0QsT0FBTyxJQUFJLENBQUM7RUFDWixDQUFDO0NBQ0Y7O0FBRUQsSUFBSSxZQUFZLDhCQUE4QixFQUFFLENBQUMsTUFBTTtHQUNwRCxTQUFTLFlBQVksRUFBRSxLQUFLLGtCQUFrQixFQUFFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0dBQzNFLFlBQVk7RUFDYixJQUFJLE1BQU0sYUFBYSxFQUFFLENBQUM7RUFDMUIsT0FBTyxTQUFTLFlBQVksRUFBRSxLQUFLLGtCQUFrQjtHQUNwRCxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7R0FDeEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ3hCLENBQUM7RUFDRixFQUFFLENBQUM7QUFDTCxBQUFPLFNBQVMsUUFBUSxxQ0FBcUMsS0FBSyxTQUFTLFFBQVEsUUFBUSxFQUFFLHFCQUFxQixVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLFFBQVEsTUFBTSxFQUFFO0FBQ2xLLFNBQVMsVUFBVSxxQ0FBcUMsS0FBSyxTQUFTLFFBQVEsUUFBUTtDQUNyRixJQUFJLFNBQVMsY0FBYyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDckMsS0FBSyxPQUFPLFFBQVEsR0FBRyxVQUFVLEdBQUcsRUFBRSxNQUFNLFNBQVMsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLEVBQUU7Q0FDbEcsSUFBSSxVQUFVLGNBQWM7Q0FDNUIsSUFBSSxTQUFTLE1BQU07Q0FDbkIsSUFBSSxNQUFNLFdBQVcsU0FBUyxDQUFDLE1BQU0sQ0FBQztDQUN0QyxJQUFJLFFBQVEsSUFBSTtDQUNoQixLQUFLLE1BQU0sQ0FBQyxDQUFDLEdBQUc7RUFDZixRQUFRLEdBQUcsU0FBUyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7RUFDL0IsS0FBSyxPQUFPLFFBQVEsR0FBRyxVQUFVLEdBQUcsRUFBRSxNQUFNLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFO0VBQ3pIO0NBQ0QsS0FBSyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFO01BQzFCO0VBQ0osVUFBVSxHQUFHLEVBQUUsQ0FBQztFQUNoQixTQUFTLEdBQUcsRUFBRSxDQUFDO0VBQ2YsTUFBTSxJQUFJLEtBQUssV0FBVyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssR0FBRztHQUNwRCxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7R0FDL0QsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDL0IsS0FBSyxPQUFPLEVBQUUsR0FBRyxVQUFVLEdBQUcsRUFBRSxNQUFNLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFO0dBQ2xILFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7R0FDbkI7RUFDRCxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztFQUMzQjtDQUNELE9BQU8sU0FBUyxVQUFVLDRCQUE0QjtFQUNyRCxLQUFLLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRTtFQUN4RSxNQUFNLElBQUksS0FBSyxXQUFXLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxHQUFHO0dBQ3BELEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFO0dBQ3hGO0VBQ0QsS0FBSyxRQUFRLEdBQUcsRUFBRSxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUU7RUFDNUQsTUFBTSxTQUFTLEVBQUUsQ0FBQztFQUNsQixNQUFNO0NBQ1A7QUFDRCxBQUVBLGNBQWUsT0FBTyxDQUFDO0NBQ3RCLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUc7Q0FDaEIsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRTtDQUNoQixNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNO0NBQ2hGLFNBQVMsRUFBRUEsV0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVE7Q0FDbEQsS0FBSyxFQUFFLEtBQUs7Q0FDWixNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU07Q0FDaEQsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSztDQUN0QixRQUFRLEVBQUUsUUFBUTtDQUNsQixPQUFPLEVBQUUsT0FBTztDQUNoQixDQUFDLENBQUM7Ozs7Ozs7OzsiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyJ9