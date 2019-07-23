/*!
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：2.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-validator/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-validator/
 */

var version = '2.0.0';

var toString = Object.prototype.toString;

var isArray = (
	/*! j-globals: Array.isArray (polyfill) */
	Array.isArray || function isArray (value) {
		return typeof value==='object' && /*#__PURE__*/ toString.call(value)==='[object Array]';
	}
	/*¡ j-globals: Array.isArray (polyfill) */
);

var Object_is = Object.is;

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

function VOID(value) { return value === VOID; }
function any(value) { return value !== VOID; }
function never(value) { return false; }
function bigint(value) { return typeof value === 'bigint'; }
function symbol(value) { return typeof value === 'symbol'; }
function string(value) { return typeof value === 'string'; }
function boolean(value) { return typeof value === 'boolean'; }
function number(value) { return typeof value === 'number'; }
function undefined$1(value) { return value === UNDEFINED; }
function NULL(value) { return value === null; }
function TRUE(value) { return value === true; }
function FALSE(value) { return value === false; }
function NaN(value) { return value !== value; }
function Infinity(value) { return value === INFINITY; }
Infinity.valueOf = function () { return INFINITY; };
function _Infinity(value) { return value === -INFINITY; }
var O = Object_is
    ? function O(value) { return Object_is(value, 0); }
    : function O(value) { return value === 0 && 1 / value > 0; };
var _O = Object_is
    ? function _O(value) { return Object_is(value, -0); }
    : function _O(value) { return value === 0 && 1 / value < 0; };
function ObjectValidator(type, strict) {
    if (strict && (typeof type !== 'object' || !type || isArray(type))) {
        throw TypeError('Validator.strict(type!object)');
    }
    var expectKeys = ownKeys(type).reverse();
    var expectLength = expectKeys.length;
    var validators = create(null);
    for (var index = expectLength; index;) {
        var key = expectKeys[--index];
        validators[key] = Validator(type[key]);
    }
    return strict
        ? function object(value) {
            if (typeof value !== 'object' || !value || isArray(value)) {
                return false;
            }
            var index = 0;
            for (var keys = ownKeys(value), length = keys.length; index < length; ++index) {
                if (!(keys[index] in validators)) {
                    return false;
                }
            }
            for (index = expectLength; index;) {
                var key = expectKeys[--index];
                if (!validators[key](key in value ? value[key] : VOID)) {
                    return false;
                }
            }
            return true;
        }
        : function object(value) {
            if (typeof value !== 'object' || !value || isArray(value)) {
                return false;
            }
            for (var index = expectLength; index;) {
                var key = expectKeys[--index];
                if (!validators[key](key in value ? value[key] : VOID)) {
                    return false;
                }
            }
            return true;
        };
}
function ArrayValidator(type, like) {
    var length = type.length;
    var validators = [];
    for (var index = 0; index < length; ++index) {
        validators.push(Validator(type[index]));
    }
    return like
        ? function arrayLike(value) {
            if (value.length !== length) {
                return false;
            }
            for (var index = 0; index < length; ++index) {
                if (!validators[index](value[index])) {
                    return false;
                }
            }
            return true;
        }
        : function array(value) {
            if (!isArray(value)) {
                return false;
            }
            if (value.length !== length) {
                return false;
            }
            for (var index = 0; index < length; ++index) {
                if (!validators[index](value[index])) {
                    return false;
                }
            }
            return true;
        };
}
function Validator(type) {
    return typeof type === 'function' ? type :
        undefined$1(type) ? undefined$1 :
            TRUE(type) ? TRUE : FALSE(type) ? FALSE :
                NULL(type) ? NULL :
                    typeof type === 'object' ? /*#__PURE__*/ (isArray(type) ? ArrayValidator : ObjectValidator)(type, false) :
                        O(type) ? O : _O(type) ? _O :
                            NaN(type) ? NaN :
                                /*#__PURE__*/ Infinity(type) ? Infinity : _Infinity(type) ? _Infinity :
                                    function validator(value) { return value === type; };
}
function strict(type) {
    return /*#__PURE__*/ ObjectValidator(type, true);
}
function optional(type) {
    var validator = Validator(type);
    return function optionalValidator(value) { return value === VOID || validator(value); };
}
function or() {
    var types = arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments;
    var length = types.length;
    var validators = [];
    for (var index = 0; index < length; ++index) {
        validators.push(Validator(types[index]));
    }
    return function or(value) {
        for (var index = 0; index < length; ++index) {
            if (validators[index](value)) {
                return true;
            }
        }
        return false;
    };
}
function and() {
    var types = arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments;
    var length = types.length;
    var validators = [];
    for (var index = 0; index < length; ++index) {
        validators.push(Validator(types[index]));
    }
    return function or(value) {
        for (var index = 0; index < length; ++index) {
            if (!validators[index](value)) {
                return false;
            }
        }
        return true;
    };
}
function every(type) {
    var validator = Validator(type);
    return function array(value) {
        if (!isArray(value)) {
            return false;
        }
        for (var length = value.length, index = 0; index < length; ++index) {
            if (!validator(value[index])) {
                return false;
            }
        }
        return true;
    };
}
var comma_repeat = ''.repeat
    ? function comma_repeat(count) { return ','.repeat(count); }
    : function () {
        var commas = [];
        return function comma_repeat(count) {
            commas.length = count + 1;
            return commas.join(',');
        };
    }();
function overload(types, callback) { return /*#__PURE__*/ Overloaded.apply(null, arguments); }
function Overloaded(types, callback) {
    var validator = Validator(types);
    if (typeof callback !== 'function') {
        throw TypeError('Validator.overload(,callback!function)');
    }
    var validators;
    var callbacks;
    var length = arguments.length;
    var fallback;
    if (length % 2) {
        fallback = arguments[--length];
        if (typeof fallback !== 'function') {
            throw TypeError('Validator.overload(' + comma_repeat(length) + 'fallback!function)');
        }
    }
    if (length < 3) {
        length = 0;
    }
    else {
        validators = [];
        callbacks = [];
        for (var index = 2; index < length; ++index) {
            validators.push(ArrayValidator(arguments[index], true));
            var cb = arguments[++index];
            if (typeof cb !== 'function') {
                throw TypeError('Validator.overload(' + comma_repeat(index) + 'callback!function)');
            }
            callbacks.push(cb);
        }
        length = validators.length;
    }
    return function overloaded() {
        if (validator(arguments)) {
            return apply(callback, this, arguments);
        }
        for (var index = 0; index < length; ++index) {
            if (validators[index](arguments)) {
                return apply(callbacks[index], this, arguments);
            }
        }
        if (fallback) {
            return apply(fallback, this, arguments);
        }
        throw TypeError();
    };
}
var _export = Default(Validator, {
    Validator: Validator,
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
export { Infinity, NaN, Validator, and, any, bigint, boolean, every, never, number, optional, or, overload, strict, string, symbol, undefined$1 as undefined, version, VOID as void };

/*¡ j-validator */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMi4wLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz89JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT89JztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgVU5ERUZJTkVEIGZyb20gJy51bmRlZmluZWQnO1xuXG5mdW5jdGlvbiBWT0lEICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PVZPSUQ7IH1cbmV4cG9ydCB7IFZPSUQgYXMgdm9pZCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gYW55ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZSE9PVZPSUQ7IH1cbmV4cG9ydCBmdW5jdGlvbiBuZXZlciAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpZ2ludCAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J2JpZ2ludCc7IH1cbmV4cG9ydCBmdW5jdGlvbiBzeW1ib2wgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzeW1ib2wnOyB9XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIGJvb2xlYW4gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdib29sZWFuJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlciAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J251bWJlcic7IH1cbmV4cG9ydCBmdW5jdGlvbiB1bmRlZmluZWQgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09VU5ERUZJTkVEOyB9XG5cbmZ1bmN0aW9uIE5VTEwgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09bnVsbDsgfVxuZnVuY3Rpb24gVFJVRSAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT10cnVlOyB9XG5mdW5jdGlvbiBGQUxTRSAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT1mYWxzZTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gTmFOICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZSE9PXZhbHVlOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmZpbml0eSAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT1JTkZJTklUWTsgfVxuSW5maW5pdHkudmFsdWVPZiA9IGZ1bmN0aW9uICh0aGlzIDp0eXBlb2YgSW5maW5pdHkpIDpudW1iZXIgeyByZXR1cm4gSU5GSU5JVFk7IH07XG5mdW5jdGlvbiBfSW5maW5pdHkgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09IC1JTkZJTklUWTsgfVxuXG52YXIgTyA6VmFsaWRhdG9yID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gTyAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gT2JqZWN0X2lzKHZhbHVlLCAwKTsgfVxuXHQ6IGZ1bmN0aW9uIE8gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09MCAmJiAxL3ZhbHVlPjA7IH07XG52YXIgX08gOlZhbGlkYXRvciA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIF9PICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiBPYmplY3RfaXModmFsdWUsIC0wKTsgfVxuXHQ6IGZ1bmN0aW9uIF9PICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PTAgJiYgMS92YWx1ZTwwOyB9O1xuXG5mdW5jdGlvbiBPYmplY3RWYWxpZGF0b3I8VCBleHRlbmRzIG9iamVjdD4gKHR5cGUgOlQsIHN0cmljdCA6Ym9vbGVhbikgOlZhbGlkYXRvciB7XG5cdGlmICggc3RyaWN0ICYmICggdHlwZW9mIHR5cGUhPT0nb2JqZWN0JyB8fCAhdHlwZSB8fCBpc0FycmF5KHR5cGUpICkgKSB7IHRocm93IFR5cGVFcnJvcignVmFsaWRhdG9yLnN0cmljdCh0eXBlIW9iamVjdCknKTsgfVxuXHR2YXIgZXhwZWN0S2V5cyA9IG93bktleXModHlwZSkucmV2ZXJzZSgpO1xuXHR2YXIgZXhwZWN0TGVuZ3RoIDpudW1iZXIgPSBleHBlY3RLZXlzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOnsgW2tleSBpbiBrZXlvZiBUXSA6VmFsaWRhdG9yIH0gPSBjcmVhdGUobnVsbCk7XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0dmFsaWRhdG9yc1trZXldID0gVmFsaWRhdG9yKHR5cGVba2V5XSk7XG5cdH1cblx0cmV0dXJuIHN0cmljdFxuXHRcdD8gZnVuY3Rpb24gb2JqZWN0ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7XG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZSE9PSdvYmplY3QnIHx8ICF2YWx1ZSB8fCBpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR2YXIgaW5kZXggOm51bWJlciA9IDA7XG5cdFx0XHRmb3IgKCB2YXIga2V5cyA9IG93bktleXModmFsdWUpLCBsZW5ndGggOm51bWJlciA9IGtleXMubGVuZ3RoOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGlmICggISgga2V5c1tpbmRleF0gaW4gdmFsaWRhdG9ycyApICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdH1cblx0XHRcdGZvciAoIGluZGV4ID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBleHBlY3RLZXlzWy0taW5kZXhdO1xuXHRcdFx0XHRpZiAoICF2YWxpZGF0b3JzW2tleV0oa2V5IGluIHZhbHVlID8gdmFsdWVba2V5XSA6IFZPSUQpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHQ6IGZ1bmN0aW9uIG9iamVjdCAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWUhPT0nb2JqZWN0JyB8fCAhdmFsdWUgfHwgaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBleHBlY3RMZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0XHRcdGlmICggIXZhbGlkYXRvcnNba2V5XShrZXkgaW4gdmFsdWUgPyB2YWx1ZVtrZXldIDogVk9JRCkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gQXJyYXlWYWxpZGF0b3IgKHR5cGUgOmFueVtdLCBsaWtlIDpib29sZWFuKSA6VmFsaWRhdG9yIHtcblx0dmFyIGxlbmd0aCA6bnVtYmVyID0gdHlwZS5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXSA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlW2luZGV4XSkpOyB9XG5cdHJldHVybiBsaWtlXG5cdFx0PyBmdW5jdGlvbiBhcnJheUxpa2UgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRcdGlmICggdmFsdWUubGVuZ3RoIT09bGVuZ3RoICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0XHRpZiAoICF2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHQ6IGZ1bmN0aW9uIGFycmF5ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7XG5cdFx0XHRpZiAoICFpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRpZiAoIHZhbHVlLmxlbmd0aCE9PWxlbmd0aCApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdFx0aWYgKCAhdmFsaWRhdG9yc1tpbmRleF0odmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVmFsaWRhdG9yICh0eXBlIDphbnkpIDpWYWxpZGF0b3Ige1xuXHRyZXR1cm4gdHlwZW9mIHR5cGU9PT0nZnVuY3Rpb24nID8gdHlwZSA6XG5cdFx0dW5kZWZpbmVkKHR5cGUpID8gdW5kZWZpbmVkIDpcblx0XHRcdFRSVUUodHlwZSkgPyBUUlVFIDogRkFMU0UodHlwZSkgPyBGQUxTRSA6XG5cdFx0XHRcdE5VTEwodHlwZSkgPyBOVUxMIDpcblx0XHRcdFx0XHR0eXBlb2YgdHlwZT09PSdvYmplY3QnID8gLyojX19QVVJFX18qLyAoIGlzQXJyYXkodHlwZSkgPyBBcnJheVZhbGlkYXRvciA6IE9iamVjdFZhbGlkYXRvciApKHR5cGUsIGZhbHNlKSA6XG5cdFx0XHRcdFx0XHRPKHR5cGUpID8gTyA6IF9PKHR5cGUpID8gX08gOlxuXHRcdFx0XHRcdFx0XHROYU4odHlwZSkgPyBOYU4gOlxuXHRcdFx0XHRcdFx0XHRcdC8qI19fUFVSRV9fKi8gSW5maW5pdHkodHlwZSkgPyBJbmZpbml0eSA6IF9JbmZpbml0eSh0eXBlKSA/IF9JbmZpbml0eSA6XG5cdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24gdmFsaWRhdG9yICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PXR5cGU7IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpY3QgKHR5cGUgOm9iamVjdCkgOlZhbGlkYXRvciB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovIE9iamVjdFZhbGlkYXRvcih0eXBlLCB0cnVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wdGlvbmFsICh0eXBlIDphbnkpIDpWYWxpZGF0b3Ige1xuXHR2YXIgdmFsaWRhdG9yIDpWYWxpZGF0b3IgPSBWYWxpZGF0b3IodHlwZSk7XG5cdHJldHVybiBmdW5jdGlvbiBvcHRpb25hbFZhbGlkYXRvciAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT1WT0lEIHx8IHZhbGlkYXRvcih2YWx1ZSk7IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvciAoKSA6VmFsaWRhdG9yIHtcblx0dmFyIHR5cGVzID0gYXJndW1lbnRzLmxlbmd0aD09PTEgJiYgaXNBcnJheShhcmd1bWVudHNbMF0pID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSB0eXBlcy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXSA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlc1tpbmRleF0pKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gb3IgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggdmFsaWRhdG9yc1tpbmRleF0odmFsdWUpICkgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG59XG5leHBvcnQgZnVuY3Rpb24gYW5kICgpIDpWYWxpZGF0b3Ige1xuXHR2YXIgdHlwZXMgPSBhcmd1bWVudHMubGVuZ3RoPT09MSAmJiBpc0FycmF5KGFyZ3VtZW50c1swXSkgPyBhcmd1bWVudHNbMF0gOiBhcmd1bWVudHM7XG5cdHZhciBsZW5ndGggOm51bWJlciA9IHR5cGVzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOlZhbGlkYXRvcltdID0gW107XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9yKHR5cGVzW2luZGV4XSkpOyB9XG5cdHJldHVybiBmdW5jdGlvbiBvciAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yc1tpbmRleF0odmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmVyeSAodHlwZSA6YW55KSA6VmFsaWRhdG9yIHtcblx0dmFyIHZhbGlkYXRvciA6VmFsaWRhdG9yID0gVmFsaWRhdG9yKHR5cGUpO1xuXHRyZXR1cm4gZnVuY3Rpb24gYXJyYXkgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRpZiAoICFpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICggdmFyIGxlbmd0aCA6bnVtYmVyID0gdmFsdWUubGVuZ3RoLCBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxudmFyIGNvbW1hX3JlcGVhdCA6KGNvdW50IDpudW1iZXIpID0+IHN0cmluZyA9ICcnLnJlcGVhdFxuXHQ/IGZ1bmN0aW9uIGNvbW1hX3JlcGVhdCAoY291bnQgOm51bWJlcikgOnN0cmluZyB7IHJldHVybiAnLCcucmVwZWF0KGNvdW50KTsgfVxuXHQ6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgY29tbWFzIDpzdHJpbmdbXSA9IFtdO1xuXHRcdHJldHVybiBmdW5jdGlvbiBjb21tYV9yZXBlYXQgKGNvdW50IDpudW1iZXIpIDpzdHJpbmcge1xuXHRcdFx0Y29tbWFzLmxlbmd0aCA9IGNvdW50KzE7XG5cdFx0XHRyZXR1cm4gY29tbWFzLmpvaW4oJywnKTtcblx0XHR9O1xuXHR9KCk7XG5leHBvcnQgZnVuY3Rpb24gb3ZlcmxvYWQ8VCBleHRlbmRzICguLi5hcmdzIDphbnlbXSkgPT4gYW55PiAodHlwZXMgOmFueVtdLCBjYWxsYmFjayA6VCkgOlQgeyByZXR1cm4gLyojX19QVVJFX18qLyBPdmVybG9hZGVkLmFwcGx5KG51bGwsIGFyZ3VtZW50cyBhcyBhbnkpIGFzIFQ7IH1cbmZ1bmN0aW9uIE92ZXJsb2FkZWQ8VCBleHRlbmRzICguLi5hcmdzIDphbnlbXSkgPT4gYW55PiAodHlwZXMgOmFueVtdLCBjYWxsYmFjayA6VCkgOlQge1xuXHR2YXIgdmFsaWRhdG9yIDpWYWxpZGF0b3IgPSBWYWxpZGF0b3IodHlwZXMpO1xuXHRpZiAoIHR5cGVvZiBjYWxsYmFjayE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcignVmFsaWRhdG9yLm92ZXJsb2FkKCxjYWxsYmFjayFmdW5jdGlvbiknKTsgfVxuXHR2YXIgdmFsaWRhdG9ycyA6VmFsaWRhdG9yW107XG5cdHZhciBjYWxsYmFja3MgOlRbXTtcblx0dmFyIGxlbmd0aCA6bnVtYmVyID0gYXJndW1lbnRzLmxlbmd0aDtcblx0dmFyIGZhbGxiYWNrIDpUO1xuXHRpZiAoIGxlbmd0aCUyICkge1xuXHRcdGZhbGxiYWNrID0gYXJndW1lbnRzWy0tbGVuZ3RoXTtcblx0XHRpZiAoIHR5cGVvZiBmYWxsYmFjayE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcignVmFsaWRhdG9yLm92ZXJsb2FkKCcrY29tbWFfcmVwZWF0KGxlbmd0aCkrJ2ZhbGxiYWNrIWZ1bmN0aW9uKScpOyB9XG5cdH1cblx0aWYgKCBsZW5ndGg8MyApIHsgbGVuZ3RoID0gMDsgfVxuXHRlbHNlIHtcblx0XHR2YWxpZGF0b3JzID0gW107XG5cdFx0Y2FsbGJhY2tzID0gW107XG5cdFx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSAyOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHR2YWxpZGF0b3JzLnB1c2goQXJyYXlWYWxpZGF0b3IoYXJndW1lbnRzW2luZGV4XSwgdHJ1ZSkpO1xuXHRcdFx0dmFyIGNiIDpUID0gYXJndW1lbnRzWysraW5kZXhdO1xuXHRcdFx0aWYgKCB0eXBlb2YgY2IhPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1ZhbGlkYXRvci5vdmVybG9hZCgnK2NvbW1hX3JlcGVhdChpbmRleCkrJ2NhbGxiYWNrIWZ1bmN0aW9uKScpOyB9XG5cdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG5cdFx0fVxuXHRcdGxlbmd0aCA9IHZhbGlkYXRvcnMubGVuZ3RoO1xuXHR9XG5cdHJldHVybiBmdW5jdGlvbiBvdmVybG9hZGVkICh0aGlzIDphbnkpIDpSZXR1cm5UeXBlPFQ+IHtcblx0XHRpZiAoIHZhbGlkYXRvcihhcmd1bWVudHMpICkgeyByZXR1cm4gYXBwbHkoY2FsbGJhY2ssIHRoaXMsIGFyZ3VtZW50cyk7IH1cblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggdmFsaWRhdG9yc1tpbmRleF0oYXJndW1lbnRzKSApIHsgcmV0dXJuIGFwcGx5KGNhbGxiYWNrc1tpbmRleF0sIHRoaXMsIGFyZ3VtZW50cyk7IH1cblx0XHR9XG5cdFx0aWYgKCBmYWxsYmFjayApIHsgcmV0dXJuIGFwcGx5KGZhbGxiYWNrLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0dGhyb3cgVHlwZUVycm9yKCk7XG5cdH0gYXMgVDtcbn1cblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQ/PSc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KFZhbGlkYXRvciwge1xuXHRWYWxpZGF0b3I6IFZhbGlkYXRvcixcblx0YW5kOiBhbmQsIG9yOiBvcixcblx0YmlnaW50OiBiaWdpbnQsIHN5bWJvbDogc3ltYm9sLCBzdHJpbmc6IHN0cmluZywgYm9vbGVhbjogYm9vbGVhbiwgbnVtYmVyOiBudW1iZXIsXG5cdHVuZGVmaW5lZDogdW5kZWZpbmVkLCBOYU46IE5hTiwgSW5maW5pdHk6IEluZmluaXR5LFxuXHRldmVyeTogZXZlcnksXG5cdCd2b2lkJzogVk9JRCwgb3B0aW9uYWw6IG9wdGlvbmFsLCBzdHJpY3Q6IHN0cmljdCxcblx0YW55OiBhbnksIG5ldmVyOiBuZXZlcixcblx0b3ZlcmxvYWQ6IG92ZXJsb2FkLFxuXHR2ZXJzaW9uOiB2ZXJzaW9uXG59KTtcblxudHlwZSBWYWxpZGF0b3IgPSAodmFsdWUgOmFueSkgPT4gYm9vbGVhbjsiXSwibmFtZXMiOlsidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGNBQWUsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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