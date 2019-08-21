/*!
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：3.3.0
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

	var version = '3.3.0';

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

	var TEST = RegExp.prototype.test;

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

	function Test (type        , TRUE         )                   {
		try {
			TEST.call(type, '');
			return TRUE
				? function test (value     )          {
					return TEST.call(type, value);
				}
				: function test (value     )          {
					return !TEST.call(type, value);
				};
		}
		catch (error) {}
	}

	function ObjectValidator                   (type   , strict         , FALSE         )            {
		if ( strict && isArray(type) ) { throw TypeError('Validator.strict(type!object)'); }
		var expectKeys = ownKeys(type).reverse();
		var expectLength         = expectKeys.length;
		var validators = create(null)                                   ;
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
						typeof type==='object' ? /*#__PURE__*/ Test(type, true) || /*#__PURE__*/ ( isArray(type) ? ArrayValidator : ObjectValidator )(type, false, false) :
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
					typeof type==='object' ? /*#__PURE__*/ Test(type, false) || /*#__PURE__*/ ( isArray(type) ? ArrayValidator : ObjectValidator )(type, false, true) :
						type===0 ? O_(type) ? _O_ : O_ :
							type!==type ? NaN_ :
								type===INFINITY ? Infinity_ : type===_INFINITY ? _Infinity_ :
									function notType (value     )          { return value!==type; };
	}

	function strict (type        , not          )            {
		return /*#__PURE__*/ ObjectValidator(type, true, !!not);
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
	function overload                                                                        (types   , callback   ) { return /*#__PURE__*/ Overloaded.apply(null, arguments                       ); }
	function Overloaded                                             (types                 , callback   ) {
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
		return function overloaded (         ) {
			if ( validator(arguments) ) { return apply(callback, this, arguments); }
			for ( var index         = 0; index<length; ++index ) {
				if ( validators[index](arguments) ) { return apply(callbacks[index], this, arguments); }
			}
			if ( fallback ) { return apply(fallback, this, arguments); }
			throw TypeError();
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
		overload: overload,
		version: version
	});

	return _export;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMy4zLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0IGZyb20gJy5PYmplY3QnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz89JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT89JztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgVU5ERUZJTkVEIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IFRFU1QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5cbnZhciBPYmplY3RfaXMgPSAoIE9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5pcztcbnZhciBfSU5GSU5JVFkgPSAtSU5GSU5JVFk7XG5cbnZhciBWT0lEID0geyAndm9pZCc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PVZPSUQ7IH0gfVsndm9pZCddO1xuZXhwb3J0IHsgVk9JRCBhcyB2b2lkIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBhbnkgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09Vk9JRDsgfVxuZXhwb3J0IGZ1bmN0aW9uIG5ldmVyICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiBmYWxzZTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gYmlnaW50ICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nYmlnaW50JzsgfVxudmFyIGJpZ2ludF8gPSB7ICchYmlnaW50JzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSE9PSdiaWdpbnQnOyB9IH1bJyFiaWdpbnQnXTtcbmV4cG9ydCBmdW5jdGlvbiBzeW1ib2wgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzeW1ib2wnOyB9XG52YXIgc3ltYm9sXyA9IHsgJyFzeW1ib2wnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J3N5bWJvbCc7IH0gfVsnIXN5bWJvbCddO1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J3N0cmluZyc7IH1cbnZhciBzdHJpbmdfID0geyAnIXN0cmluZyc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWUhPT0nc3RyaW5nJzsgfSB9Wychc3RyaW5nJ107XG52YXIgQk9PTEVBTiA9IHsgJ2Jvb2xlYW4nOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT10cnVlIHx8IHZhbHVlPT09ZmFsc2U7IH0gfVsnYm9vbGVhbiddO1xuZXhwb3J0IHsgQk9PTEVBTiBhcyBib29sZWFuIH07XG52YXIgYm9vbGVhbl8gPSB7ICchYm9vbGVhbic6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXRydWUgJiYgdmFsdWUhPT1mYWxzZTsgfSB9WychYm9vbGVhbiddO1xuZXhwb3J0IGZ1bmN0aW9uIG51bWJlciAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J251bWJlcic7IH1cbnZhciBudW1iZXJfID0geyAnIW51bWJlcic6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWUhPT0nbnVtYmVyJzsgfSB9WychbnVtYmVyJ107XG5leHBvcnQgZnVuY3Rpb24gdW5kZWZpbmVkICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PVVOREVGSU5FRDsgfVxudmFyIHVuZGVmaW5lZF8gPSB7ICchdW5kZWZpbmVkJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09VU5ERUZJTkVEOyB9IH1bJyF1bmRlZmluZWQnXTtcblxudmFyIE5VTEwgPSB7ICdudWxsJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09bnVsbDsgfSB9WydudWxsJ107XG52YXIgTlVMTF8gPSB7ICchbnVsbCc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PW51bGw7IH0gfVsnIW51bGwnXTtcbnZhciBUUlVFID0geyAndHJ1ZSc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PXRydWU7IH0gfVsndHJ1ZSddO1xudmFyIFRSVUVfID0geyAnIXRydWUnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT10cnVlOyB9IH1bJyF0cnVlJ107XG52YXIgRkFMU0UgPSB7ICdmYWxzZSc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PWZhbHNlOyB9IH1bJ2ZhbHNlJ107XG52YXIgRkFMU0VfID0geyAnIWZhbHNlJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09ZmFsc2U7IH0gfVsnIWZhbHNlJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmZpbml0eSAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1JTkZJTklUWTsgfVxuSW5maW5pdHkudmFsdWVPZiA9IGZ1bmN0aW9uICggICAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gSU5GSU5JVFk7IH07XG52YXIgSW5maW5pdHlfID0geyAnIUluZmluaXR5JzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09SU5GSU5JVFk7IH0gfVsnIUluZmluaXR5J107XG52YXIgX0luZmluaXR5ID0geyAnLUluZmluaXR5JzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09X0lORklOSVRZOyB9IH1bJy1JbmZpbml0eSddO1xudmFyIF9JbmZpbml0eV8gPSB7ICchLUluZmluaXR5JzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09X0lORklOSVRZOyB9IH1bJyEtSW5maW5pdHknXTtcblxuZXhwb3J0IGZ1bmN0aW9uIE5hTiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT12YWx1ZTsgfVxudmFyIE5hTl8gPSB7ICchTmFOJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09dmFsdWU7IH0gfVsnIU5hTiddO1xuXG52YXIgTyAgICAgICAgICAgID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gTyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gT2JqZWN0X2lzICh2YWx1ZSwgMCk7IH1cblx0OiBmdW5jdGlvbiBPICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PTAgJiYgMS92YWx1ZT4wOyB9O1xudmFyIE9fICAgICAgICAgICAgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBPXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gIU9iamVjdF9pcyAodmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gT18gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09MCB8fCAxL3ZhbHVlPDA7IH07XG52YXIgX08gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIF9PICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiBPYmplY3RfaXMgKHZhbHVlLCAtMCk7IH1cblx0OiBmdW5jdGlvbiBfTyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT0wICYmIDEvdmFsdWU8MDsgfTtcbnZhciBfT18gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIF9PXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gIU9iamVjdF9pcyAodmFsdWUsIC0wKTsgfVxuXHQ6IGZ1bmN0aW9uIF9PXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT0wIHx8IDEvdmFsdWU+MDsgfTtcblxuZnVuY3Rpb24gVGVzdCAodHlwZSAgICAgICAgLCBUUlVFICAgICAgICAgKSAgICAgICAgICAgICAgICAgICB7XG5cdHRyeSB7XG5cdFx0VEVTVC5jYWxsKHR5cGUsICcnKTtcblx0XHRyZXR1cm4gVFJVRVxuXHRcdFx0PyBmdW5jdGlvbiB0ZXN0ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRcdHJldHVybiBURVNULmNhbGwodHlwZSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0OiBmdW5jdGlvbiB0ZXN0ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRcdHJldHVybiAhVEVTVC5jYWxsKHR5cGUsIHZhbHVlKTtcblx0XHRcdH07XG5cdH1cblx0Y2F0Y2ggKGVycm9yKSB7fVxufVxuXG5mdW5jdGlvbiBPYmplY3RWYWxpZGF0b3IgICAgICAgICAgICAgICAgICAgKHR5cGUgICAsIHN0cmljdCAgICAgICAgICwgRkFMU0UgICAgICAgICApICAgICAgICAgICAge1xuXHRpZiAoIHN0cmljdCAmJiBpc0FycmF5KHR5cGUpICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1ZhbGlkYXRvci5zdHJpY3QodHlwZSFvYmplY3QpJyk7IH1cblx0dmFyIGV4cGVjdEtleXMgPSBvd25LZXlzKHR5cGUpLnJldmVyc2UoKTtcblx0dmFyIGV4cGVjdExlbmd0aCAgICAgICAgID0gZXhwZWN0S2V5cy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzID0gY3JlYXRlKG51bGwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0dmFsaWRhdG9yc1trZXldID0gaXModHlwZVtrZXldKTtcblx0fVxuXHR2YXIgVFJVRSAgICAgICAgICA9ICFGQUxTRTtcblx0cmV0dXJuIHN0cmljdFxuXHRcdD8gZnVuY3Rpb24gb2JqZWN0ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZSE9PSdvYmplY3QnIHx8ICF2YWx1ZSB8fCBpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHR2YXIgaW5kZXggICAgICAgICA9IDA7XG5cdFx0XHRmb3IgKCB2YXIga2V5cyA9IG93bktleXModmFsdWUpLCBsZW5ndGggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGlmICggISgga2V5c1tpbmRleF0gaW4gdmFsaWRhdG9ycyApICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdH1cblx0XHRcdGZvciAoIGluZGV4ID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBleHBlY3RLZXlzWy0taW5kZXhdO1xuXHRcdFx0XHRpZiAoICF2YWxpZGF0b3JzW2tleV0oa2V5IGluIHZhbHVlID8gdmFsdWVba2V5XSA6IFZPSUQpICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBUUlVFO1xuXHRcdH1cblx0XHQ6IGZ1bmN0aW9uIG9iamVjdCAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWUhPT0nb2JqZWN0JyB8fCAhdmFsdWUgfHwgaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBleHBlY3RMZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0XHRcdGlmICggIXZhbGlkYXRvcnNba2V5XShrZXkgaW4gdmFsdWUgPyB2YWx1ZVtrZXldIDogVk9JRCkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFRSVUU7XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gQXJyYXlWYWxpZGF0b3IgKHR5cGUgICAgICAgLCBsaWtlICAgICAgICAgLCBGQUxTRSAgICAgICAgICkgICAgICAgICAgICB7XG5cdHZhciBsZW5ndGggICAgICAgICA9IHR5cGUubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyAgICAgICAgICAgICAgPSBbXTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IHZhbGlkYXRvcnMucHVzaChpcyh0eXBlW2luZGV4XSkpOyB9XG5cdHZhciBUUlVFICAgICAgICAgID0gIUZBTFNFO1xuXHRyZXR1cm4gbGlrZVxuXHRcdD8gZnVuY3Rpb24gYXJyYXlMaWtlICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRpZiAoIHZhbHVlLmxlbmd0aCE9PWxlbmd0aCApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdFx0aWYgKCAhdmFsaWRhdG9yc1tpbmRleF0odmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gVFJVRTtcblx0XHR9XG5cdFx0OiBmdW5jdGlvbiBhcnJheSAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0aWYgKCAhaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5sZW5ndGghPT1sZW5ndGggKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFRSVUU7XG5cdFx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzICh0eXBlICAgICApICAgICAgICAgICAge1xuXHRyZXR1cm4gdHlwZW9mIHR5cGU9PT0nZnVuY3Rpb24nID8gdHlwZSA6XG5cdFx0dW5kZWZpbmVkKHR5cGUpID8gdW5kZWZpbmVkIDpcblx0XHRcdFRSVUUodHlwZSkgPyBUUlVFIDogRkFMU0UodHlwZSkgPyBGQUxTRSA6XG5cdFx0XHRcdE5VTEwodHlwZSkgPyBOVUxMIDpcblx0XHRcdFx0XHR0eXBlb2YgdHlwZT09PSdvYmplY3QnID8gLyojX19QVVJFX18qLyBUZXN0KHR5cGUsIHRydWUpIHx8IC8qI19fUFVSRV9fKi8gKCBpc0FycmF5KHR5cGUpID8gQXJyYXlWYWxpZGF0b3IgOiBPYmplY3RWYWxpZGF0b3IgKSh0eXBlLCBmYWxzZSwgZmFsc2UpIDpcblx0XHRcdFx0XHRcdE8odHlwZSkgPyBPIDogX08odHlwZSkgPyBfTyA6XG5cdFx0XHRcdFx0XHRcdHR5cGUhPT10eXBlID8gTmFOIDpcblx0XHRcdFx0XHRcdFx0XHR0eXBlPT09SU5GSU5JVFkgPyBJbmZpbml0eSA6IHR5cGU9PT1fSU5GSU5JVFkgPyBfSW5maW5pdHkgOlxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24gaXNUeXBlICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PXR5cGU7IH07XG59XG5leHBvcnQgZnVuY3Rpb24gbm90ICh0eXBlICAgICApICAgICAgICAgICAge1xuXHRpZiAoIHR5cGVvZiB0eXBlPT09J2Z1bmN0aW9uJyApIHtcblx0XHRzd2l0Y2ggKCB0eXBlICkge1xuXHRcdFx0Y2FzZSBiaWdpbnQ6XG5cdFx0XHRcdHJldHVybiBiaWdpbnRfO1xuXHRcdFx0Y2FzZSBzeW1ib2w6XG5cdFx0XHRcdHJldHVybiBzeW1ib2xfO1xuXHRcdFx0Y2FzZSBzdHJpbmc6XG5cdFx0XHRcdHJldHVybiBzdHJpbmdfO1xuXHRcdFx0Y2FzZSBCT09MRUFOOlxuXHRcdFx0XHRyZXR1cm4gYm9vbGVhbl87XG5cdFx0XHRjYXNlIG51bWJlcjpcblx0XHRcdFx0cmV0dXJuIG51bWJlcl87XG5cdFx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZF87XG5cdFx0XHRjYXNlIEluZmluaXR5OlxuXHRcdFx0XHRyZXR1cm4gSW5maW5pdHlfO1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gbm90VHlwZSAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gIXR5cGUodmFsdWUpOyB9O1xuXHR9XG5cdHJldHVybiB0eXBlPT09VU5ERUZJTkVEID8gdW5kZWZpbmVkXyA6XG5cdFx0dHlwZT09PXRydWUgPyBUUlVFXyA6IHR5cGU9PT1mYWxzZSA/IEZBTFNFXyA6XG5cdFx0XHR0eXBlPT09bnVsbCA/IE5VTExfIDpcblx0XHRcdFx0dHlwZW9mIHR5cGU9PT0nb2JqZWN0JyA/IC8qI19fUFVSRV9fKi8gVGVzdCh0eXBlLCBmYWxzZSkgfHwgLyojX19QVVJFX18qLyAoIGlzQXJyYXkodHlwZSkgPyBBcnJheVZhbGlkYXRvciA6IE9iamVjdFZhbGlkYXRvciApKHR5cGUsIGZhbHNlLCB0cnVlKSA6XG5cdFx0XHRcdFx0dHlwZT09PTAgPyBPXyh0eXBlKSA/IF9PXyA6IE9fIDpcblx0XHRcdFx0XHRcdHR5cGUhPT10eXBlID8gTmFOXyA6XG5cdFx0XHRcdFx0XHRcdHR5cGU9PT1JTkZJTklUWSA/IEluZmluaXR5XyA6IHR5cGU9PT1fSU5GSU5JVFkgPyBfSW5maW5pdHlfIDpcblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiBub3RUeXBlICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXR5cGU7IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpY3QgKHR5cGUgICAgICAgICwgbm90ICAgICAgICAgICkgICAgICAgICAgICB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovIE9iamVjdFZhbGlkYXRvcih0eXBlLCB0cnVlLCAhIW5vdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcHRpb25hbCAodHlwZSAgICAgKSAgICAgICAgICAgIHtcblx0dmFyIHZhbGlkYXRvciAgICAgICAgICAgID0gaXModHlwZSk7XG5cdHJldHVybiBmdW5jdGlvbiBvcHRpb25hbFZhbGlkYXRvciAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1WT0lEIHx8IHZhbGlkYXRvcih2YWx1ZSk7IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvciAodHlwZSAgICAgKSAgICAgICAgICAgIHtcblx0dmFyIHR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYXJndW1lbnRzLmxlbmd0aD09PTEgJiYgaXNBcnJheSh0eXBlKSA/IHR5cGUgOiBhcmd1bWVudHM7XG5cdHZhciBsZW5ndGggICAgICAgICA9IHR5cGVzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgICAgICAgICAgICAgID0gW107XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzLnB1c2goaXModHlwZXNbaW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIG9yICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoIHZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlKSApIHsgcmV0dXJuIHRydWU7IH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFuZCAodHlwZSAgICAgKSAgICAgICAgICAgIHtcblx0dmFyIHR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gYXJndW1lbnRzLmxlbmd0aD09PTEgJiYgaXNBcnJheSh0eXBlKSA/IHR5cGUgOiBhcmd1bWVudHM7XG5cdHZhciBsZW5ndGggICAgICAgICA9IHR5cGVzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgICAgICAgICAgICAgID0gW107XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzLnB1c2goaXModHlwZXNbaW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIGFuZCAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yc1tpbmRleF0odmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmVyeSAodHlwZSAgICAgKSAgICAgICAgICAgIHtcblx0dmFyIHZhbGlkYXRvciAgICAgICAgICAgID0gaXModHlwZSk7XG5cdHJldHVybiBmdW5jdGlvbiBhcnJheSAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdGlmICggIWlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgbGVuZ3RoICAgICAgICAgPSB2YWx1ZS5sZW5ndGgsIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoICF2YWxpZGF0b3IodmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG52YXIgY29tbWFfcmVwZWF0ICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gJycucmVwZWF0XG5cdD8gZnVuY3Rpb24gY29tbWFfcmVwZWF0IChjb3VudCAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuICcsJy5yZXBlYXQoY291bnQpOyB9XG5cdDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBjb21tYXMgICAgICAgICAgID0gW107XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGNvbW1hX3JlcGVhdCAoY291bnQgICAgICAgICkgICAgICAgICB7XG5cdFx0XHRjb21tYXMubGVuZ3RoID0gY291bnQrMTtcblx0XHRcdHJldHVybiBjb21tYXMuam9pbignLCcpO1xuXHRcdH07XG5cdH0oKTtcbmV4cG9ydCBmdW5jdGlvbiBvdmVybG9hZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlcyAgICwgY2FsbGJhY2sgICApIHsgcmV0dXJuIC8qI19fUFVSRV9fKi8gT3ZlcmxvYWRlZC5hcHBseShudWxsLCBhcmd1bWVudHMgICAgICAgICAgICAgICAgICAgICAgICk7IH1cbmZ1bmN0aW9uIE92ZXJsb2FkZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZXMgICAgICAgICAgICAgICAgICwgY2FsbGJhY2sgICApIHtcblx0dmFyIHZhbGlkYXRvciAgICAgICAgICAgID0gaXModHlwZXMpO1xuXHRpZiAoIHR5cGVvZiBjYWxsYmFjayE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcignVmFsaWRhdG9yLm92ZXJsb2FkKCxjYWxsYmFjayFmdW5jdGlvbiknKTsgfVxuXHR2YXIgdmFsaWRhdG9ycyAgICAgICAgICAgICA7XG5cdHZhciBjYWxsYmFja3MgICAgIDtcblx0dmFyIGxlbmd0aCAgICAgICAgID0gYXJndW1lbnRzLmxlbmd0aDtcblx0dmFyIGZhbGxiYWNrICAgO1xuXHRpZiAoIGxlbmd0aCUyICkge1xuXHRcdGZhbGxiYWNrID0gYXJndW1lbnRzWy0tbGVuZ3RoXTtcblx0XHRpZiAoIHR5cGVvZiBmYWxsYmFjayE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcignVmFsaWRhdG9yLm92ZXJsb2FkKCcrY29tbWFfcmVwZWF0KGxlbmd0aCkrJ2ZhbGxiYWNrIWZ1bmN0aW9uKScpOyB9XG5cdH1cblx0aWYgKCBsZW5ndGg8MyApIHsgbGVuZ3RoID0gMDsgfVxuXHRlbHNlIHtcblx0XHR2YWxpZGF0b3JzID0gW107XG5cdFx0Y2FsbGJhY2tzID0gW107XG5cdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAyOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHR2YWxpZGF0b3JzLnB1c2goQXJyYXlWYWxpZGF0b3IoYXJndW1lbnRzW2luZGV4XSwgdHJ1ZSwgZmFsc2UpKTtcblx0XHRcdHZhciBjYiAgICA9IGFyZ3VtZW50c1srK2luZGV4XTtcblx0XHRcdGlmICggdHlwZW9mIGNiIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKCdWYWxpZGF0b3Iub3ZlcmxvYWQoJytjb21tYV9yZXBlYXQoaW5kZXgpKydjYWxsYmFjayFmdW5jdGlvbiknKTsgfVxuXHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuXHRcdH1cblx0XHRsZW5ndGggPSB2YWxpZGF0b3JzLmxlbmd0aDtcblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gb3ZlcmxvYWRlZCAoICAgICAgICAgKSB7XG5cdFx0aWYgKCB2YWxpZGF0b3IoYXJndW1lbnRzKSApIHsgcmV0dXJuIGFwcGx5KGNhbGxiYWNrLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoIHZhbGlkYXRvcnNbaW5kZXhdKGFyZ3VtZW50cykgKSB7IHJldHVybiBhcHBseShjYWxsYmFja3NbaW5kZXhdLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0fVxuXHRcdGlmICggZmFsbGJhY2sgKSB7IHJldHVybiBhcHBseShmYWxsYmFjaywgdGhpcywgYXJndW1lbnRzKTsgfVxuXHRcdHRocm93IFR5cGVFcnJvcigpO1xuXHR9O1xufVxuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdD89JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHRpczogaXMsIG5vdDogbm90LFxuXHRhbmQ6IGFuZCwgb3I6IG9yLFxuXHRiaWdpbnQ6IGJpZ2ludCwgc3ltYm9sOiBzeW1ib2wsIHN0cmluZzogc3RyaW5nLCAnYm9vbGVhbic6IEJPT0xFQU4sIG51bWJlcjogbnVtYmVyLFxuXHR1bmRlZmluZWQ6IHVuZGVmaW5lZCwgTmFOOiBOYU4sIEluZmluaXR5OiBJbmZpbml0eSxcblx0ZXZlcnk6IGV2ZXJ5LFxuXHQndm9pZCc6IFZPSUQsIG9wdGlvbmFsOiBvcHRpb25hbCwgc3RyaWN0OiBzdHJpY3QsXG5cdGFueTogYW55LCBuZXZlcjogbmV2ZXIsXG5cdG92ZXJsb2FkOiBvdmVybG9hZCxcblx0dmVyc2lvbjogdmVyc2lvblxufSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIl0sIm5hbWVzIjpbInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxlQUFlLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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LEVBQUUsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7Q0FDN0IsRUFBRTtDQUNGLENBQUMsT0FBTyxTQUFTLFVBQVUsYUFBYTtDQUN4QyxFQUFFLEtBQUssU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFO0NBQzFFLEVBQUUsTUFBTSxJQUFJLEtBQUssV0FBVyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssR0FBRztDQUN2RCxHQUFHLEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFO0NBQzNGLEdBQUc7Q0FDSCxFQUFFLEtBQUssUUFBUSxHQUFHLEVBQUUsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFO0NBQzlELEVBQUUsTUFBTSxTQUFTLEVBQUUsQ0FBQztDQUNwQixFQUFFLENBQUM7Q0FDSCxDQUFDO0FBQ0QsQUFFQSxlQUFlLE9BQU8sQ0FBQztDQUN2QixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUc7Q0FDakIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFO0NBQ2pCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTTtDQUNuRixDQUFDLFNBQVMsRUFBRUEsV0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVE7Q0FDbkQsQ0FBQyxLQUFLLEVBQUUsS0FBSztDQUNiLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNO0NBQ2pELENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSztDQUN2QixDQUFDLFFBQVEsRUFBRSxRQUFRO0NBQ25CLENBQUMsT0FBTyxFQUFFLE9BQU87Q0FDakIsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7OyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvIn0=