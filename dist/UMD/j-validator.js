﻿/*!
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：3.1.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-validator/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-validator/
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Validator = factory());
}(this, function () { 'use strict';

	var version = '3.1.0';

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
	function boolean (value     )          { return value===true || value===false; }
	function boolean_ (value     )          { return value!==true && value!==false; }
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

	return _export;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMy4xLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0IGZyb20gJy5PYmplY3QnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz89JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT89JztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgVU5ERUZJTkVEIGZyb20gJy51bmRlZmluZWQnO1xuXG52YXIgT2JqZWN0X2lzID0gKCBPYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuaXM7XG52YXIgX0lORklOSVRZID0gLUlORklOSVRZO1xuXG5mdW5jdGlvbiBWT0lEICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PVZPSUQ7IH1cbmV4cG9ydCB7IFZPSUQgYXMgdm9pZCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gYW55ICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PVZPSUQ7IH1cbmV4cG9ydCBmdW5jdGlvbiBuZXZlciAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gZmFsc2U7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpZ2ludCAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J2JpZ2ludCc7IH1cbmZ1bmN0aW9uIGJpZ2ludF8gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSE9PSdiaWdpbnQnOyB9XG5leHBvcnQgZnVuY3Rpb24gc3ltYm9sICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nc3ltYm9sJzsgfVxuZnVuY3Rpb24gc3ltYm9sXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J3N5bWJvbCc7IH1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmcgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnOyB9XG5mdW5jdGlvbiBzdHJpbmdfICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWUhPT0nc3RyaW5nJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIGJvb2xlYW4gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09dHJ1ZSB8fCB2YWx1ZT09PWZhbHNlOyB9XG5mdW5jdGlvbiBib29sZWFuXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT10cnVlICYmIHZhbHVlIT09ZmFsc2U7IH1cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXIgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdudW1iZXInOyB9XG5mdW5jdGlvbiBudW1iZXJfICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWUhPT0nbnVtYmVyJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIHVuZGVmaW5lZCAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1VTkRFRklORUQ7IH1cbmZ1bmN0aW9uIHVuZGVmaW5lZF8gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09VU5ERUZJTkVEOyB9XG5cbmZ1bmN0aW9uIE5VTEwgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09bnVsbDsgfVxuZnVuY3Rpb24gTlVMTF8gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09bnVsbDsgfVxuZnVuY3Rpb24gVFJVRSAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT10cnVlOyB9XG5mdW5jdGlvbiBUUlVFXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT10cnVlOyB9XG5mdW5jdGlvbiBGQUxTRSAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1mYWxzZTsgfVxuZnVuY3Rpb24gRkFMU0VfICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PWZhbHNlOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmZpbml0eSAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1JTkZJTklUWTsgfVxuSW5maW5pdHkudmFsdWVPZiA9IGZ1bmN0aW9uICggICAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gSU5GSU5JVFk7IH07XG5mdW5jdGlvbiBJbmZpbml0eV8gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09SU5GSU5JVFk7IH1cbmZ1bmN0aW9uIF9JbmZpbml0eSAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1fSU5GSU5JVFk7IH1cbmZ1bmN0aW9uIF9JbmZpbml0eV8gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09X0lORklOSVRZOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBOYU4gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09dmFsdWU7IH1cbmZ1bmN0aW9uIE5hTl8gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09dmFsdWU7IH1cblxudmFyIE8gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIE8gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIE9iamVjdF9pcyAodmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gTyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT0wICYmIDEvdmFsdWU+MDsgfTtcbnZhciBPXyAgICAgICAgICAgID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gT18gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuICFPYmplY3RfaXMgKHZhbHVlLCAwKTsgfVxuXHQ6IGZ1bmN0aW9uIE9fICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PTAgfHwgMS92YWx1ZTwwOyB9O1xudmFyIF9PICAgICAgICAgICAgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBfTyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gT2JqZWN0X2lzICh2YWx1ZSwgLTApOyB9XG5cdDogZnVuY3Rpb24gX08gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09MCAmJiAxL3ZhbHVlPDA7IH07XG52YXIgX09fICAgICAgICAgICAgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBfT18gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuICFPYmplY3RfaXMgKHZhbHVlLCAtMCk7IH1cblx0OiBmdW5jdGlvbiBfT18gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09MCB8fCAxL3ZhbHVlPjA7IH07XG5cbmZ1bmN0aW9uIE9iamVjdFZhbGlkYXRvciAgICAgICAgICAgICAgICAgICAodHlwZSAgICwgc3RyaWN0ICAgICAgICAgLCBGQUxTRSAgICAgICAgICkgICAgICAgICAgICB7XG5cdGlmICggc3RyaWN0ICYmIGlzQXJyYXkodHlwZSkgKSB7IHRocm93IFR5cGVFcnJvcignVmFsaWRhdG9yLnN0cmljdCh0eXBlIW9iamVjdCknKTsgfVxuXHR2YXIgZXhwZWN0S2V5cyA9IG93bktleXModHlwZSkucmV2ZXJzZSgpO1xuXHR2YXIgZXhwZWN0TGVuZ3RoICAgICAgICAgPSBleHBlY3RLZXlzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBjcmVhdGUobnVsbCk7XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0dmFsaWRhdG9yc1trZXldID0gaXModHlwZVtrZXldKTtcblx0fVxuXHR2YXIgVFJVRSAgICAgICAgICA9ICFGQUxTRTtcblx0cmV0dXJuIHN0cmljdFxuXHRcdD8gZnVuY3Rpb24gb2JqZWN0ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZSE9PSdvYmplY3QnIHx8ICF2YWx1ZSB8fCBpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHR2YXIgaW5kZXggICAgICAgICA9IDA7XG5cdFx0XHRmb3IgKCB2YXIga2V5cyA9IG93bktleXModmFsdWUpLCBsZW5ndGggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGlmICggISgga2V5c1tpbmRleF0gaW4gdmFsaWRhdG9ycyApICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdH1cblx0XHRcdGZvciAoIGluZGV4ID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBleHBlY3RLZXlzWy0taW5kZXhdO1xuXHRcdFx0XHRpZiAoICF2YWxpZGF0b3JzW2tleV0oa2V5IGluIHZhbHVlID8gdmFsdWVba2V5XSA6IFZPSUQpICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBUUlVFO1xuXHRcdH1cblx0XHQ6IGZ1bmN0aW9uIG9iamVjdCAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWUhPT0nb2JqZWN0JyB8fCAhdmFsdWUgfHwgaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBleHBlY3RMZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0XHRcdGlmICggIXZhbGlkYXRvcnNba2V5XShrZXkgaW4gdmFsdWUgPyB2YWx1ZVtrZXldIDogVk9JRCkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFRSVUU7XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gQXJyYXlWYWxpZGF0b3IgKHR5cGUgICAgICAgLCBsaWtlICAgICAgICAgLCBGQUxTRSAgICAgICAgICkgICAgICAgICAgICB7XG5cdHZhciBsZW5ndGggICAgICAgICA9IHR5cGUubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyAgICAgICAgICAgICAgPSBbXTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IHZhbGlkYXRvcnMucHVzaChpcyh0eXBlW2luZGV4XSkpOyB9XG5cdHZhciBUUlVFICAgICAgICAgID0gIUZBTFNFO1xuXHRyZXR1cm4gbGlrZVxuXHRcdD8gZnVuY3Rpb24gYXJyYXlMaWtlICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRpZiAoIHZhbHVlLmxlbmd0aCE9PWxlbmd0aCApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdFx0aWYgKCAhdmFsaWRhdG9yc1tpbmRleF0odmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gVFJVRTtcblx0XHR9XG5cdFx0OiBmdW5jdGlvbiBhcnJheSAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0aWYgKCAhaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5sZW5ndGghPT1sZW5ndGggKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFRSVUU7XG5cdFx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzICh0eXBlICAgICApICAgICAgICAgICAge1xuXHRyZXR1cm4gdHlwZW9mIHR5cGU9PT0nZnVuY3Rpb24nID8gdHlwZSA6XG5cdFx0dW5kZWZpbmVkKHR5cGUpID8gdW5kZWZpbmVkIDpcblx0XHRcdFRSVUUodHlwZSkgPyBUUlVFIDogRkFMU0UodHlwZSkgPyBGQUxTRSA6XG5cdFx0XHRcdE5VTEwodHlwZSkgPyBOVUxMIDpcblx0XHRcdFx0XHR0eXBlb2YgdHlwZT09PSdvYmplY3QnID8gLyojX19QVVJFX18qLyAoIGlzQXJyYXkodHlwZSkgPyBBcnJheVZhbGlkYXRvciA6IE9iamVjdFZhbGlkYXRvciApKHR5cGUsIGZhbHNlLCBmYWxzZSkgOlxuXHRcdFx0XHRcdFx0Tyh0eXBlKSA/IE8gOiBfTyh0eXBlKSA/IF9PIDpcblx0XHRcdFx0XHRcdFx0dHlwZSE9PXR5cGUgPyBOYU4gOlxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9PT1JTkZJTklUWSA/IEluZmluaXR5IDogdHlwZT09PV9JTkZJTklUWSA/IF9JbmZpbml0eSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiBpc1R5cGUgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09dHlwZTsgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBub3QgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdGlmICggdHlwZW9mIHR5cGU9PT0nZnVuY3Rpb24nICkge1xuXHRcdHN3aXRjaCAoIHR5cGUgKSB7XG5cdFx0XHRjYXNlIGJpZ2ludDpcblx0XHRcdFx0cmV0dXJuIGJpZ2ludF87XG5cdFx0XHRjYXNlIHN5bWJvbDpcblx0XHRcdFx0cmV0dXJuIHN5bWJvbF87XG5cdFx0XHRjYXNlIHN0cmluZzpcblx0XHRcdFx0cmV0dXJuIHN0cmluZ187XG5cdFx0XHRjYXNlIGJvb2xlYW46XG5cdFx0XHRcdHJldHVybiBib29sZWFuXztcblx0XHRcdGNhc2UgbnVtYmVyOlxuXHRcdFx0XHRyZXR1cm4gbnVtYmVyXztcblx0XHRcdGNhc2UgdW5kZWZpbmVkOlxuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkXztcblx0XHRcdGNhc2UgSW5maW5pdHk6XG5cdFx0XHRcdHJldHVybiBJbmZpbml0eV87XG5cdFx0fVxuXHRcdHJldHVybiBmdW5jdGlvbiBub3RUeXBlICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiAhdHlwZSh2YWx1ZSk7IH07XG5cdH1cblx0cmV0dXJuIHR5cGU9PT1VTkRFRklORUQgPyB1bmRlZmluZWRfIDpcblx0XHR0eXBlPT09dHJ1ZSA/IFRSVUVfIDogdHlwZT09PWZhbHNlID8gRkFMU0VfIDpcblx0XHRcdHR5cGU9PT1udWxsID8gTlVMTF8gOlxuXHRcdFx0XHR0eXBlb2YgdHlwZT09PSdvYmplY3QnID8gLyojX19QVVJFX18qLyAoIGlzQXJyYXkodHlwZSkgPyBBcnJheVZhbGlkYXRvciA6IE9iamVjdFZhbGlkYXRvciApKHR5cGUsIGZhbHNlLCB0cnVlKSA6XG5cdFx0XHRcdFx0dHlwZT09PTAgPyBPXyh0eXBlKSA/IF9PXyA6IE9fIDpcblx0XHRcdFx0XHRcdHR5cGUhPT10eXBlID8gTmFOXyA6XG5cdFx0XHRcdFx0XHRcdHR5cGU9PT1JTkZJTklUWSA/IEluZmluaXR5XyA6IHR5cGU9PT1fSU5GSU5JVFkgPyBfSW5maW5pdHlfIDpcblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiBub3RUeXBlICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXR5cGU7IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpY3QgKHR5cGUgICAgICAgICwgbm90ICAgICAgICAgKSAgICAgICAgICAgIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi8gT2JqZWN0VmFsaWRhdG9yKHR5cGUsIHRydWUsIG5vdCB8fCBmYWxzZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcHRpb25hbCAodHlwZSAgICAgKSAgICAgICAgICAgIHtcblx0dmFyIHZhbGlkYXRvciAgICAgICAgICAgID0gaXModHlwZSk7XG5cdHJldHVybiBmdW5jdGlvbiBvcHRpb25hbFZhbGlkYXRvciAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1WT0lEIHx8IHZhbGlkYXRvcih2YWx1ZSk7IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvciAodHlwZSAgICAgKSAgICAgICAgICAgIHtcblx0dmFyIHR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYXJndW1lbnRzLmxlbmd0aD09PTEgJiYgaXNBcnJheSh0eXBlKSA/IHR5cGUgOiBhcmd1bWVudHM7XG5cdHZhciBsZW5ndGggICAgICAgICA9IHR5cGVzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgICAgICAgICAgICAgID0gW107XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzLnB1c2goaXModHlwZXNbaW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIG9yICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoIHZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlKSApIHsgcmV0dXJuIHRydWU7IH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFuZCAodHlwZSAgICAgKSAgICAgICAgICAgIHtcblx0dmFyIHR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYXJndW1lbnRzLmxlbmd0aD09PTEgJiYgaXNBcnJheSh0eXBlKSA/IHR5cGUgOiBhcmd1bWVudHM7XG5cdHZhciBsZW5ndGggICAgICAgICA9IHR5cGVzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgICAgICAgICAgICAgID0gW107XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzLnB1c2goaXModHlwZXNbaW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIGFuZCAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yc1tpbmRleF0odmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmVyeSAodHlwZSAgICAgKSAgICAgICAgICAgIHtcblx0dmFyIHZhbGlkYXRvciAgICAgICAgICAgID0gaXModHlwZSk7XG5cdHJldHVybiBmdW5jdGlvbiBhcnJheSAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdGlmICggIWlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSB2YWx1ZS5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoICF2YWxpZGF0b3IodmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG52YXIgY29tbWFfcmVwZWF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gJycucmVwZWF0XG5cdD8gZnVuY3Rpb24gY29tbWFfcmVwZWF0IChjb3VudCAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuICcsJy5yZXBlYXQoY291bnQpOyB9XG5cdDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBjb21tYXMgICAgICAgICAgID0gW107XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNvbW1hX3JlcGVhdCAoY291bnQgICAgICAgICkgICAgICAgICB7XG5cdFx0XHRjb21tYXMubGVuZ3RoID0gY291bnQrMTtcblx0XHRcdHJldHVybiBjb21tYXMuam9pbignLCcpO1xuXHRcdH07XG5cdH0oKTtcbmV4cG9ydCBmdW5jdGlvbiBvdmVybG9hZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlcyAgICAgICAsIGNhbGxiYWNrICAgKSAgICB7IHJldHVybiAvKiNfX1BVUkVfXyovIE92ZXJsb2FkZWQuYXBwbHkobnVsbCwgYXJndW1lbnRzICAgICAgICkgICAgIDsgfVxuZnVuY3Rpb24gT3ZlcmxvYWRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlcyAgICAgICAsIGNhbGxiYWNrICAgKSAgICB7XG5cdHZhciB2YWxpZGF0b3IgICAgICAgICAgICA9IGlzKHR5cGVzKTtcblx0aWYgKCB0eXBlb2YgY2FsbGJhY2shPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1ZhbGlkYXRvci5vdmVybG9hZCgsY2FsbGJhY2shZnVuY3Rpb24pJyk7IH1cblx0dmFyIHZhbGlkYXRvcnMgICAgICAgICAgICAgO1xuXHR2YXIgY2FsbGJhY2tzICAgICA7XG5cdHZhciBsZW5ndGggICAgICAgICA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHZhciBmYWxsYmFjayAgIDtcblx0aWYgKCBsZW5ndGglMiApIHtcblx0XHRmYWxsYmFjayA9IGFyZ3VtZW50c1stLWxlbmd0aF07XG5cdFx0aWYgKCB0eXBlb2YgZmFsbGJhY2shPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1ZhbGlkYXRvci5vdmVybG9hZCgnK2NvbW1hX3JlcGVhdChsZW5ndGgpKydmYWxsYmFjayFmdW5jdGlvbiknKTsgfVxuXHR9XG5cdGlmICggbGVuZ3RoPDMgKSB7IGxlbmd0aCA9IDA7IH1cblx0ZWxzZSB7XG5cdFx0dmFsaWRhdG9ycyA9IFtdO1xuXHRcdGNhbGxiYWNrcyA9IFtdO1xuXHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMjsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0dmFsaWRhdG9ycy5wdXNoKEFycmF5VmFsaWRhdG9yKGFyZ3VtZW50c1tpbmRleF0sIHRydWUsIGZhbHNlKSk7XG5cdFx0XHR2YXIgY2IgICAgPSBhcmd1bWVudHNbKytpbmRleF07XG5cdFx0XHRpZiAoIHR5cGVvZiBjYiE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcignVmFsaWRhdG9yLm92ZXJsb2FkKCcrY29tbWFfcmVwZWF0KGluZGV4KSsnY2FsbGJhY2shZnVuY3Rpb24pJyk7IH1cblx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcblx0XHR9XG5cdFx0bGVuZ3RoID0gdmFsaWRhdG9ycy5sZW5ndGg7XG5cdH1cblx0cmV0dXJuIGZ1bmN0aW9uIG92ZXJsb2FkZWQgKCAgICAgICAgICkgICAgICAgICAgICAgICAge1xuXHRcdGlmICggdmFsaWRhdG9yKGFyZ3VtZW50cykgKSB7IHJldHVybiBhcHBseShjYWxsYmFjaywgdGhpcywgYXJndW1lbnRzKTsgfVxuXHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XShhcmd1bWVudHMpICkgeyByZXR1cm4gYXBwbHkoY2FsbGJhY2tzW2luZGV4XSwgdGhpcywgYXJndW1lbnRzKTsgfVxuXHRcdH1cblx0XHRpZiAoIGZhbGxiYWNrICkgeyByZXR1cm4gYXBwbHkoZmFsbGJhY2ssIHRoaXMsIGFyZ3VtZW50cyk7IH1cblx0XHR0aHJvdyBUeXBlRXJyb3IoKTtcblx0fSAgICAgO1xufVxuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdD89JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHRpczogaXMsIG5vdDogbm90LFxuXHRhbmQ6IGFuZCwgb3I6IG9yLFxuXHRiaWdpbnQ6IGJpZ2ludCwgc3ltYm9sOiBzeW1ib2wsIHN0cmluZzogc3RyaW5nLCBib29sZWFuOiBib29sZWFuLCBudW1iZXI6IG51bWJlcixcblx0dW5kZWZpbmVkOiB1bmRlZmluZWQsIE5hTjogTmFOLCBJbmZpbml0eTogSW5maW5pdHksXG5cdGV2ZXJ5OiBldmVyeSxcblx0J3ZvaWQnOiBWT0lELCBvcHRpb25hbDogb3B0aW9uYWwsIHN0cmljdDogc3RyaWN0LFxuXHRhbnk6IGFueSwgbmV2ZXI6IG5ldmVyLFxuXHRvdmVybG9hZDogb3ZlcmxvYWQsXG5cdHZlcnNpb246IHZlcnNpb25cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICJdLCJuYW1lcyI6WyJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZUFBZSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBQUMs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