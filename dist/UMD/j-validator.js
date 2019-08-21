/*!
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：4.0.0
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

	var version = '4.0.0';

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

	function strict (type        )            {
		return /*#__PURE__*/ ObjectValidator(type, true, false);
	}
	strict.not = function strict_not (type        )            {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnNC4wLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0IGZyb20gJy5PYmplY3QnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz89JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT89JztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgVU5ERUZJTkVEIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IFRFU1QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5cbnZhciBPYmplY3RfaXMgPSAoIE9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5pcztcbnZhciBfSU5GSU5JVFkgPSAtSU5GSU5JVFk7XG5cbnZhciBWT0lEID0geyAndm9pZCc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PVZPSUQ7IH0gfVsndm9pZCddO1xuZXhwb3J0IHsgVk9JRCBhcyB2b2lkIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBhbnkgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09Vk9JRDsgfVxuZXhwb3J0IGZ1bmN0aW9uIG5ldmVyICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiBmYWxzZTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gYmlnaW50ICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nYmlnaW50JzsgfVxudmFyIGJpZ2ludF8gPSB7ICchYmlnaW50JzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSE9PSdiaWdpbnQnOyB9IH1bJyFiaWdpbnQnXTtcbmV4cG9ydCBmdW5jdGlvbiBzeW1ib2wgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzeW1ib2wnOyB9XG52YXIgc3ltYm9sXyA9IHsgJyFzeW1ib2wnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J3N5bWJvbCc7IH0gfVsnIXN5bWJvbCddO1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J3N0cmluZyc7IH1cbnZhciBzdHJpbmdfID0geyAnIXN0cmluZyc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWUhPT0nc3RyaW5nJzsgfSB9Wychc3RyaW5nJ107XG52YXIgQk9PTEVBTiA9IHsgJ2Jvb2xlYW4nOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT10cnVlIHx8IHZhbHVlPT09ZmFsc2U7IH0gfVsnYm9vbGVhbiddO1xuZXhwb3J0IHsgQk9PTEVBTiBhcyBib29sZWFuIH07XG52YXIgYm9vbGVhbl8gPSB7ICchYm9vbGVhbic6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXRydWUgJiYgdmFsdWUhPT1mYWxzZTsgfSB9WychYm9vbGVhbiddO1xuZXhwb3J0IGZ1bmN0aW9uIG51bWJlciAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J251bWJlcic7IH1cbnZhciBudW1iZXJfID0geyAnIW51bWJlcic6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWUhPT0nbnVtYmVyJzsgfSB9WychbnVtYmVyJ107XG5leHBvcnQgZnVuY3Rpb24gdW5kZWZpbmVkICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PVVOREVGSU5FRDsgfVxudmFyIHVuZGVmaW5lZF8gPSB7ICchdW5kZWZpbmVkJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09VU5ERUZJTkVEOyB9IH1bJyF1bmRlZmluZWQnXTtcblxudmFyIE5VTEwgPSB7ICdudWxsJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09bnVsbDsgfSB9WydudWxsJ107XG52YXIgTlVMTF8gPSB7ICchbnVsbCc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PW51bGw7IH0gfVsnIW51bGwnXTtcbnZhciBUUlVFID0geyAndHJ1ZSc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PXRydWU7IH0gfVsndHJ1ZSddO1xudmFyIFRSVUVfID0geyAnIXRydWUnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT10cnVlOyB9IH1bJyF0cnVlJ107XG52YXIgRkFMU0UgPSB7ICdmYWxzZSc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PWZhbHNlOyB9IH1bJ2ZhbHNlJ107XG52YXIgRkFMU0VfID0geyAnIWZhbHNlJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09ZmFsc2U7IH0gfVsnIWZhbHNlJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmZpbml0eSAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1JTkZJTklUWTsgfVxuSW5maW5pdHkudmFsdWVPZiA9IGZ1bmN0aW9uICggICAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gSU5GSU5JVFk7IH07XG52YXIgSW5maW5pdHlfID0geyAnIUluZmluaXR5JzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09SU5GSU5JVFk7IH0gfVsnIUluZmluaXR5J107XG52YXIgX0luZmluaXR5ID0geyAnLUluZmluaXR5JzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09X0lORklOSVRZOyB9IH1bJy1JbmZpbml0eSddO1xudmFyIF9JbmZpbml0eV8gPSB7ICchLUluZmluaXR5JzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09X0lORklOSVRZOyB9IH1bJyEtSW5maW5pdHknXTtcblxuZXhwb3J0IGZ1bmN0aW9uIE5hTiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT12YWx1ZTsgfVxudmFyIE5hTl8gPSB7ICchTmFOJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09dmFsdWU7IH0gfVsnIU5hTiddO1xuXG52YXIgTyAgICAgICAgICAgID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gTyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gT2JqZWN0X2lzICh2YWx1ZSwgMCk7IH1cblx0OiBmdW5jdGlvbiBPICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PTAgJiYgMS92YWx1ZT4wOyB9O1xudmFyIE9fICAgICAgICAgICAgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBPXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gIU9iamVjdF9pcyAodmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gT18gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09MCB8fCAxL3ZhbHVlPDA7IH07XG52YXIgX08gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIF9PICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiBPYmplY3RfaXMgKHZhbHVlLCAtMCk7IH1cblx0OiBmdW5jdGlvbiBfTyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT0wICYmIDEvdmFsdWU8MDsgfTtcbnZhciBfT18gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIF9PXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gIU9iamVjdF9pcyAodmFsdWUsIC0wKTsgfVxuXHQ6IGZ1bmN0aW9uIF9PXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT0wIHx8IDEvdmFsdWU+MDsgfTtcblxuZnVuY3Rpb24gVGVzdCAodHlwZSAgICAgICAgLCBUUlVFICAgICAgICAgKSAgICAgICAgICAgICAgICAgICB7XG5cdHRyeSB7XG5cdFx0VEVTVC5jYWxsKHR5cGUsICcnKTtcblx0XHRyZXR1cm4gVFJVRVxuXHRcdFx0PyBmdW5jdGlvbiB0ZXN0ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRcdHJldHVybiBURVNULmNhbGwodHlwZSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0OiBmdW5jdGlvbiB0ZXN0ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRcdHJldHVybiAhVEVTVC5jYWxsKHR5cGUsIHZhbHVlKTtcblx0XHRcdH07XG5cdH1cblx0Y2F0Y2ggKGVycm9yKSB7fVxufVxuXG5mdW5jdGlvbiBPYmplY3RWYWxpZGF0b3IgICAgICAgICAgICAgICAgICAgKHR5cGUgICAsIHN0cmljdCAgICAgICAgICwgRkFMU0UgICAgICAgICApICAgICAgICAgICAge1xuXHRpZiAoIHN0cmljdCAmJiBpc0FycmF5KHR5cGUpICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1ZhbGlkYXRvci5zdHJpY3QodHlwZSFvYmplY3QpJyk7IH1cblx0dmFyIGV4cGVjdEtleXMgPSBvd25LZXlzKHR5cGUpLnJldmVyc2UoKTtcblx0dmFyIGV4cGVjdExlbmd0aCAgICAgICAgID0gZXhwZWN0S2V5cy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzID0gY3JlYXRlKG51bGwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0dmFsaWRhdG9yc1trZXldID0gaXModHlwZVtrZXldKTtcblx0fVxuXHR2YXIgVFJVRSAgICAgICAgICA9ICFGQUxTRTtcblx0cmV0dXJuIHN0cmljdFxuXHRcdD8gZnVuY3Rpb24gb2JqZWN0ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZSE9PSdvYmplY3QnIHx8ICF2YWx1ZSB8fCBpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHR2YXIgaW5kZXggICAgICAgICA9IDA7XG5cdFx0XHRmb3IgKCB2YXIga2V5cyA9IG93bktleXModmFsdWUpLCBsZW5ndGggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGlmICggISgga2V5c1tpbmRleF0gaW4gdmFsaWRhdG9ycyApICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdH1cblx0XHRcdGZvciAoIGluZGV4ID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBleHBlY3RLZXlzWy0taW5kZXhdO1xuXHRcdFx0XHRpZiAoICF2YWxpZGF0b3JzW2tleV0oa2V5IGluIHZhbHVlID8gdmFsdWVba2V5XSA6IFZPSUQpICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBUUlVFO1xuXHRcdH1cblx0XHQ6IGZ1bmN0aW9uIG9iamVjdCAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWUhPT0nb2JqZWN0JyB8fCAhdmFsdWUgfHwgaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBleHBlY3RMZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0XHRcdGlmICggIXZhbGlkYXRvcnNba2V5XShrZXkgaW4gdmFsdWUgPyB2YWx1ZVtrZXldIDogVk9JRCkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFRSVUU7XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gQXJyYXlWYWxpZGF0b3IgKHR5cGUgICAgICAgLCBsaWtlICAgICAgICAgLCBGQUxTRSAgICAgICAgICkgICAgICAgICAgICB7XG5cdHZhciBsZW5ndGggICAgICAgICA9IHR5cGUubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyAgICAgICAgICAgICAgPSBbXTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IHZhbGlkYXRvcnMucHVzaChpcyh0eXBlW2luZGV4XSkpOyB9XG5cdHZhciBUUlVFICAgICAgICAgID0gIUZBTFNFO1xuXHRyZXR1cm4gbGlrZVxuXHRcdD8gZnVuY3Rpb24gYXJyYXlMaWtlICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRpZiAoIHZhbHVlLmxlbmd0aCE9PWxlbmd0aCApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdFx0aWYgKCAhdmFsaWRhdG9yc1tpbmRleF0odmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gVFJVRTtcblx0XHR9XG5cdFx0OiBmdW5jdGlvbiBhcnJheSAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0aWYgKCAhaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5sZW5ndGghPT1sZW5ndGggKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFRSVUU7XG5cdFx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzICh0eXBlICAgICApICAgICAgICAgICAge1xuXHRyZXR1cm4gdHlwZW9mIHR5cGU9PT0nZnVuY3Rpb24nID8gdHlwZSA6XG5cdFx0dW5kZWZpbmVkKHR5cGUpID8gdW5kZWZpbmVkIDpcblx0XHRcdFRSVUUodHlwZSkgPyBUUlVFIDogRkFMU0UodHlwZSkgPyBGQUxTRSA6XG5cdFx0XHRcdE5VTEwodHlwZSkgPyBOVUxMIDpcblx0XHRcdFx0XHR0eXBlb2YgdHlwZT09PSdvYmplY3QnID8gLyojX19QVVJFX18qLyBUZXN0KHR5cGUsIHRydWUpIHx8IC8qI19fUFVSRV9fKi8gKCBpc0FycmF5KHR5cGUpID8gQXJyYXlWYWxpZGF0b3IgOiBPYmplY3RWYWxpZGF0b3IgKSh0eXBlLCBmYWxzZSwgZmFsc2UpIDpcblx0XHRcdFx0XHRcdE8odHlwZSkgPyBPIDogX08odHlwZSkgPyBfTyA6XG5cdFx0XHRcdFx0XHRcdHR5cGUhPT10eXBlID8gTmFOIDpcblx0XHRcdFx0XHRcdFx0XHR0eXBlPT09SU5GSU5JVFkgPyBJbmZpbml0eSA6IHR5cGU9PT1fSU5GSU5JVFkgPyBfSW5maW5pdHkgOlxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24gaXNUeXBlICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PXR5cGU7IH07XG59XG5leHBvcnQgZnVuY3Rpb24gbm90ICh0eXBlICAgICApICAgICAgICAgICAge1xuXHRpZiAoIHR5cGVvZiB0eXBlPT09J2Z1bmN0aW9uJyApIHtcblx0XHRzd2l0Y2ggKCB0eXBlICkge1xuXHRcdFx0Y2FzZSBiaWdpbnQ6XG5cdFx0XHRcdHJldHVybiBiaWdpbnRfO1xuXHRcdFx0Y2FzZSBzeW1ib2w6XG5cdFx0XHRcdHJldHVybiBzeW1ib2xfO1xuXHRcdFx0Y2FzZSBzdHJpbmc6XG5cdFx0XHRcdHJldHVybiBzdHJpbmdfO1xuXHRcdFx0Y2FzZSBCT09MRUFOOlxuXHRcdFx0XHRyZXR1cm4gYm9vbGVhbl87XG5cdFx0XHRjYXNlIG51bWJlcjpcblx0XHRcdFx0cmV0dXJuIG51bWJlcl87XG5cdFx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZF87XG5cdFx0XHRjYXNlIEluZmluaXR5OlxuXHRcdFx0XHRyZXR1cm4gSW5maW5pdHlfO1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gbm90VHlwZSAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gIXR5cGUodmFsdWUpOyB9O1xuXHR9XG5cdHJldHVybiB0eXBlPT09VU5ERUZJTkVEID8gdW5kZWZpbmVkXyA6XG5cdFx0dHlwZT09PXRydWUgPyBUUlVFXyA6IHR5cGU9PT1mYWxzZSA/IEZBTFNFXyA6XG5cdFx0XHR0eXBlPT09bnVsbCA/IE5VTExfIDpcblx0XHRcdFx0dHlwZW9mIHR5cGU9PT0nb2JqZWN0JyA/IC8qI19fUFVSRV9fKi8gVGVzdCh0eXBlLCBmYWxzZSkgfHwgLyojX19QVVJFX18qLyAoIGlzQXJyYXkodHlwZSkgPyBBcnJheVZhbGlkYXRvciA6IE9iamVjdFZhbGlkYXRvciApKHR5cGUsIGZhbHNlLCB0cnVlKSA6XG5cdFx0XHRcdFx0dHlwZT09PTAgPyBPXyh0eXBlKSA/IF9PXyA6IE9fIDpcblx0XHRcdFx0XHRcdHR5cGUhPT10eXBlID8gTmFOXyA6XG5cdFx0XHRcdFx0XHRcdHR5cGU9PT1JTkZJTklUWSA/IEluZmluaXR5XyA6IHR5cGU9PT1fSU5GSU5JVFkgPyBfSW5maW5pdHlfIDpcblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiBub3RUeXBlICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXR5cGU7IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpY3QgKHR5cGUgICAgICAgICkgICAgICAgICAgICB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovIE9iamVjdFZhbGlkYXRvcih0eXBlLCB0cnVlLCBmYWxzZSk7XG59XG5zdHJpY3Qubm90ID0gZnVuY3Rpb24gc3RyaWN0X25vdCAodHlwZSAgICAgICAgKSAgICAgICAgICAgIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi8gT2JqZWN0VmFsaWRhdG9yKHR5cGUsIHRydWUsIHRydWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uYWwgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdHZhciB2YWxpZGF0b3IgICAgICAgICAgICA9IGlzKHR5cGUpO1xuXHRyZXR1cm4gZnVuY3Rpb24gb3B0aW9uYWxWYWxpZGF0b3IgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09Vk9JRCB8fCB2YWxpZGF0b3IodmFsdWUpOyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3IgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdHZhciB0eXBlcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGFyZ3VtZW50cy5sZW5ndGg9PT0xICYmIGlzQXJyYXkodHlwZSkgPyB0eXBlIDogYXJndW1lbnRzO1xuXHR2YXIgbGVuZ3RoICAgICAgICAgPSB0eXBlcy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzICAgICAgICAgICAgICA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKGlzKHR5cGVzW2luZGV4XSkpOyB9XG5cdHJldHVybiBmdW5jdGlvbiBvciAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZSkgKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhbmQgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdHZhciB0eXBlcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGFyZ3VtZW50cy5sZW5ndGg9PT0xICYmIGlzQXJyYXkodHlwZSkgPyB0eXBlIDogYXJndW1lbnRzO1xuXHR2YXIgbGVuZ3RoICAgICAgICAgPSB0eXBlcy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzICAgICAgICAgICAgICA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKGlzKHR5cGVzW2luZGV4XSkpOyB9XG5cdHJldHVybiBmdW5jdGlvbiBhbmQgKHZhbHVlICAgICApICAgICAgICAgIHtcblx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXZlcnkgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdHZhciB2YWxpZGF0b3IgICAgICAgICAgICA9IGlzKHR5cGUpO1xuXHRyZXR1cm4gZnVuY3Rpb24gYXJyYXkgKHZhbHVlICAgICApICAgICAgICAgIHtcblx0XHRpZiAoICFpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gdmFsdWUubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxudmFyIGNvbW1hX3JlcGVhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA9ICcnLnJlcGVhdFxuXHQ/IGZ1bmN0aW9uIGNvbW1hX3JlcGVhdCAoY291bnQgICAgICAgICkgICAgICAgICB7IHJldHVybiAnLCcucmVwZWF0KGNvdW50KTsgfVxuXHQ6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgY29tbWFzICAgICAgICAgICA9IFtdO1xuXHRcdHJldHVybiBmdW5jdGlvbiBjb21tYV9yZXBlYXQgKGNvdW50ICAgICAgICApICAgICAgICAge1xuXHRcdFx0Y29tbWFzLmxlbmd0aCA9IGNvdW50KzE7XG5cdFx0XHRyZXR1cm4gY29tbWFzLmpvaW4oJywnKTtcblx0XHR9O1xuXHR9KCk7XG5leHBvcnQgZnVuY3Rpb24gb3ZlcmxvYWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZXMgICAsIGNhbGxiYWNrICAgKSB7IHJldHVybiAvKiNfX1BVUkVfXyovIE92ZXJsb2FkZWQuYXBwbHkobnVsbCwgYXJndW1lbnRzICAgICAgICAgICAgICAgICAgICAgICApOyB9XG5mdW5jdGlvbiBPdmVybG9hZGVkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVzICAgICAgICAgICAgICAgICAsIGNhbGxiYWNrICAgKSB7XG5cdHZhciB2YWxpZGF0b3IgICAgICAgICAgICA9IGlzKHR5cGVzKTtcblx0aWYgKCB0eXBlb2YgY2FsbGJhY2shPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1ZhbGlkYXRvci5vdmVybG9hZCgsY2FsbGJhY2shZnVuY3Rpb24pJyk7IH1cblx0dmFyIHZhbGlkYXRvcnMgICAgICAgICAgICAgO1xuXHR2YXIgY2FsbGJhY2tzICAgICA7XG5cdHZhciBsZW5ndGggICAgICAgICA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHZhciBmYWxsYmFjayAgIDtcblx0aWYgKCBsZW5ndGglMiApIHtcblx0XHRmYWxsYmFjayA9IGFyZ3VtZW50c1stLWxlbmd0aF07XG5cdFx0aWYgKCB0eXBlb2YgZmFsbGJhY2shPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1ZhbGlkYXRvci5vdmVybG9hZCgnK2NvbW1hX3JlcGVhdChsZW5ndGgpKydmYWxsYmFjayFmdW5jdGlvbiknKTsgfVxuXHR9XG5cdGlmICggbGVuZ3RoPDMgKSB7IGxlbmd0aCA9IDA7IH1cblx0ZWxzZSB7XG5cdFx0dmFsaWRhdG9ycyA9IFtdO1xuXHRcdGNhbGxiYWNrcyA9IFtdO1xuXHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMjsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0dmFsaWRhdG9ycy5wdXNoKEFycmF5VmFsaWRhdG9yKGFyZ3VtZW50c1tpbmRleF0sIHRydWUsIGZhbHNlKSk7XG5cdFx0XHR2YXIgY2IgICAgPSBhcmd1bWVudHNbKytpbmRleF07XG5cdFx0XHRpZiAoIHR5cGVvZiBjYiE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcignVmFsaWRhdG9yLm92ZXJsb2FkKCcrY29tbWFfcmVwZWF0KGluZGV4KSsnY2FsbGJhY2shZnVuY3Rpb24pJyk7IH1cblx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcblx0XHR9XG5cdFx0bGVuZ3RoID0gdmFsaWRhdG9ycy5sZW5ndGg7XG5cdH1cblx0cmV0dXJuIGZ1bmN0aW9uIG92ZXJsb2FkZWQgKCAgICAgICAgICkge1xuXHRcdGlmICggdmFsaWRhdG9yKGFyZ3VtZW50cykgKSB7IHJldHVybiBhcHBseShjYWxsYmFjaywgdGhpcywgYXJndW1lbnRzKTsgfVxuXHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XShhcmd1bWVudHMpICkgeyByZXR1cm4gYXBwbHkoY2FsbGJhY2tzW2luZGV4XSwgdGhpcywgYXJndW1lbnRzKTsgfVxuXHRcdH1cblx0XHRpZiAoIGZhbGxiYWNrICkgeyByZXR1cm4gYXBwbHkoZmFsbGJhY2ssIHRoaXMsIGFyZ3VtZW50cyk7IH1cblx0XHR0aHJvdyBUeXBlRXJyb3IoKTtcblx0fTtcbn1cblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQ/PSc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KHtcblx0aXM6IGlzLCBub3Q6IG5vdCxcblx0YW5kOiBhbmQsIG9yOiBvcixcblx0YmlnaW50OiBiaWdpbnQsIHN5bWJvbDogc3ltYm9sLCBzdHJpbmc6IHN0cmluZywgJ2Jvb2xlYW4nOiBCT09MRUFOLCBudW1iZXI6IG51bWJlcixcblx0dW5kZWZpbmVkOiB1bmRlZmluZWQsIE5hTjogTmFOLCBJbmZpbml0eTogSW5maW5pdHksXG5cdGV2ZXJ5OiBldmVyeSxcblx0J3ZvaWQnOiBWT0lELCBvcHRpb25hbDogb3B0aW9uYWwsIHN0cmljdDogc3RyaWN0LFxuXHRhbnk6IGFueSwgbmV2ZXI6IG5ldmVyLFxuXHRvdmVybG9hZDogb3ZlcmxvYWQsXG5cdHZlcnNpb246IHZlcnNpb25cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICJdLCJuYW1lcyI6WyJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZUFBZSxPQUFPOzs7Ozs7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