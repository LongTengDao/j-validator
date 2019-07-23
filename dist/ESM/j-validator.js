/*!
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：1.1.1
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-validator/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-validator/
 */

var version = '1.1.1';

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
function ObjectValidator(type) {
    var expectKeys = ownKeys(type).reverse();
    var expectLength = expectKeys.length;
    var validators = create(null);
    for (var index = expectLength; index;) {
        var key = expectKeys[--index];
        validators[key] = Validator(type[key]);
    }
    return function object(value) {
        if ( /*typeof value!=='object' || !value || */isArray(value)) {
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
    };
}
function ArrayValidator(type) {
    var length = type.length;
    var validators = [];
    for (var index = 0; index < length; ++index) {
        validators.push(Validator(type[index]));
    }
    return function array(value) {
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
function ArgumentsValidator(type) {
    var length = type.length;
    var validators = [];
    for (var index = length; index;) {
        validators.push(Validator(type[--index]));
    }
    return function ARGUMENTS(value) {
        if (value.length !== length) {
            return false;
        }
        for (var index = length; index;) {
            if (!validators[--index](value[index])) {
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
                    typeof type === 'object' ? /*#__PURE__*/ (isArray(type) ? ArrayValidator : ObjectValidator)(type) :
                        O(type) ? O : _O(type) ? _O :
                            NaN(type) ? NaN :
                                /*#__PURE__*/ Infinity(type) ? Infinity : _Infinity(type) ? _Infinity :
                                    function validator(value) { return value === type; };
}
function optional(type) {
    var validator = Validator(type);
    return function optionalValidator(value) { return value === VOID || validator(value); };
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
function overload(types, callback) { return /*#__PURE__*/ Overloaded.apply(null, arguments); }
function Overloaded(types, callback) {
    var validator = Validator(types);
    if (typeof callback !== 'function') {
        throw TypeError();
    }
    var validators;
    var callbacks;
    var length = arguments.length;
    if (length < 3) {
        length = 0;
    }
    else {
        validators = [];
        callbacks = [];
        for (var index = 2; index < length;) {
            validators.push(ArgumentsValidator(arguments[index++]));
            var cb = arguments[index++];
            if (typeof cb !== 'function') {
                throw TypeError();
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
        throw TypeError();
    };
}
var _export = Default(Validator, {
    Validator: Validator,
    and: and, or: or,
    bigint: bigint, symbol: symbol, string: string, boolean: boolean, number: number,
    undefined: undefined$1, NaN: NaN, Infinity: Infinity,
    every: every,
    'void': VOID, optional: optional,
    any: any, never: never,
    overload: overload,
    version: version
});

export default _export;
export { Infinity, NaN, Validator, and, any, bigint, boolean, every, never, number, optional, or, overload, string, symbol, undefined$1 as undefined, version, VOID as void };

/*¡ j-validator */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMS4xLjEnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz89JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT89JztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgVU5ERUZJTkVEIGZyb20gJy51bmRlZmluZWQnO1xuXG5mdW5jdGlvbiBWT0lEICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PVZPSUQ7IH1cbmV4cG9ydCB7IFZPSUQgYXMgdm9pZCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gYW55ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZSE9PVZPSUQ7IH1cbmV4cG9ydCBmdW5jdGlvbiBuZXZlciAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpZ2ludCAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J2JpZ2ludCc7IH1cbmV4cG9ydCBmdW5jdGlvbiBzeW1ib2wgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzeW1ib2wnOyB9XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIGJvb2xlYW4gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdib29sZWFuJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlciAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J251bWJlcic7IH1cbmV4cG9ydCBmdW5jdGlvbiB1bmRlZmluZWQgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09VU5ERUZJTkVEOyB9XG5cbmZ1bmN0aW9uIE5VTEwgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09bnVsbDsgfVxuZnVuY3Rpb24gVFJVRSAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT10cnVlOyB9XG5mdW5jdGlvbiBGQUxTRSAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT1mYWxzZTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gTmFOICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZSE9PXZhbHVlOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmZpbml0eSAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT1JTkZJTklUWTsgfVxuSW5maW5pdHkudmFsdWVPZiA9IGZ1bmN0aW9uICh0aGlzIDp0eXBlb2YgSW5maW5pdHkpIDpudW1iZXIgeyByZXR1cm4gSU5GSU5JVFk7IH07XG5mdW5jdGlvbiBfSW5maW5pdHkgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09IC1JTkZJTklUWTsgfVxuXG52YXIgTyA6VmFsaWRhdG9yID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gTyAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gT2JqZWN0X2lzKHZhbHVlLCAwKTsgfVxuXHQ6IGZ1bmN0aW9uIE8gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09MCAmJiAxL3ZhbHVlPjA7IH07XG52YXIgX08gOlZhbGlkYXRvciA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIF9PICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiBPYmplY3RfaXModmFsdWUsIC0wKTsgfVxuXHQ6IGZ1bmN0aW9uIF9PICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PTAgJiYgMS92YWx1ZTwwOyB9O1xuXG5mdW5jdGlvbiBPYmplY3RWYWxpZGF0b3I8VCBleHRlbmRzIG9iamVjdD4gKHR5cGUgOlQpIDpWYWxpZGF0b3Ige1xuXHR2YXIgZXhwZWN0S2V5cyA9IG93bktleXModHlwZSkucmV2ZXJzZSgpO1xuXHR2YXIgZXhwZWN0TGVuZ3RoIDpudW1iZXIgPSBleHBlY3RLZXlzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOnsgW2tleSBpbiBrZXlvZiBUXSA6VmFsaWRhdG9yIH0gPSBjcmVhdGUobnVsbCk7XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0dmFsaWRhdG9yc1trZXldID0gVmFsaWRhdG9yKHR5cGVba2V5XSk7XG5cdH1cblx0cmV0dXJuIGZ1bmN0aW9uIG9iamVjdCAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGlmICggLyp0eXBlb2YgdmFsdWUhPT0nb2JqZWN0JyB8fCAhdmFsdWUgfHwgKi9pc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0dmFyIGluZGV4IDpudW1iZXIgPSAwO1xuXHRcdGZvciAoIHZhciBrZXlzID0gb3duS2V5cyh2YWx1ZSksIGxlbmd0aCA6bnVtYmVyID0ga2V5cy5sZW5ndGg7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggISgga2V5c1tpbmRleF0gaW4gdmFsaWRhdG9ycyApICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0Zm9yICggaW5kZXggPSBleHBlY3RMZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdHZhciBrZXkgPSBleHBlY3RLZXlzWy0taW5kZXhdO1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yc1trZXldKGtleSBpbiB2YWx1ZSA/IHZhbHVlW2tleV0gOiBWT0lEKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG5mdW5jdGlvbiBBcnJheVZhbGlkYXRvciAodHlwZSA6YW55W10pIDpWYWxpZGF0b3Ige1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSB0eXBlLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOlZhbGlkYXRvcltdID0gW107XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9yKHR5cGVbaW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIGFycmF5ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7XG5cdFx0aWYgKCAhaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGlmICggdmFsdWUubGVuZ3RoIT09bGVuZ3RoICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuZnVuY3Rpb24gQXJndW1lbnRzVmFsaWRhdG9yICh0eXBlIDphbnlbXSkgOlZhbGlkYXRvciB7XG5cdHZhciBsZW5ndGggOm51bWJlciA9IHR5cGUubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyA6VmFsaWRhdG9yW10gPSBbXTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBsZW5ndGg7IGluZGV4OyApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlWy0taW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIEFSR1VNRU5UUyAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGlmICggdmFsdWUubGVuZ3RoIT09bGVuZ3RoICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yc1stLWluZGV4XSh2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBWYWxpZGF0b3IgKHR5cGUgOmFueSkgOlZhbGlkYXRvciB7XG5cdHJldHVybiB0eXBlb2YgdHlwZT09PSdmdW5jdGlvbicgPyB0eXBlIDpcblx0XHR1bmRlZmluZWQodHlwZSkgPyB1bmRlZmluZWQgOlxuXHRcdFx0VFJVRSh0eXBlKSA/IFRSVUUgOiBGQUxTRSh0eXBlKSA/IEZBTFNFIDpcblx0XHRcdFx0TlVMTCh0eXBlKSA/IE5VTEwgOlxuXHRcdFx0XHRcdHR5cGVvZiB0eXBlPT09J29iamVjdCcgPyAvKiNfX1BVUkVfXyovICggaXNBcnJheSh0eXBlKSA/IEFycmF5VmFsaWRhdG9yIDogT2JqZWN0VmFsaWRhdG9yICkodHlwZSkgOlxuXHRcdFx0XHRcdFx0Tyh0eXBlKSA/IE8gOiBfTyh0eXBlKSA/IF9PIDpcblx0XHRcdFx0XHRcdFx0TmFOKHR5cGUpID8gTmFOIDpcblx0XHRcdFx0XHRcdFx0XHQvKiNfX1BVUkVfXyovIEluZmluaXR5KHR5cGUpID8gSW5maW5pdHkgOiBfSW5maW5pdHkodHlwZSkgPyBfSW5maW5pdHkgOlxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIHZhbGlkYXRvciAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT10eXBlOyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uYWwgKHR5cGUgOmFueSkgOlZhbGlkYXRvciB7XG5cdHZhciB2YWxpZGF0b3IgOlZhbGlkYXRvciA9IFZhbGlkYXRvcih0eXBlKTtcblx0cmV0dXJuIGZ1bmN0aW9uIG9wdGlvbmFsVmFsaWRhdG9yICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PVZPSUQgfHwgdmFsaWRhdG9yKHZhbHVlKTsgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuZCAoKSA6VmFsaWRhdG9yIHtcblx0dmFyIHR5cGVzID0gYXJndW1lbnRzLmxlbmd0aD09PTEgJiYgaXNBcnJheShhcmd1bWVudHNbMF0pID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSB0eXBlcy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXSA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlc1tpbmRleF0pKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gb3IgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9yICgpIDpWYWxpZGF0b3Ige1xuXHR2YXIgdHlwZXMgPSBhcmd1bWVudHMubGVuZ3RoPT09MSAmJiBpc0FycmF5KGFyZ3VtZW50c1swXSkgPyBhcmd1bWVudHNbMF0gOiBhcmd1bWVudHM7XG5cdHZhciBsZW5ndGggOm51bWJlciA9IHR5cGVzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOlZhbGlkYXRvcltdID0gW107XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9yKHR5cGVzW2luZGV4XSkpOyB9XG5cdHJldHVybiBmdW5jdGlvbiBvciAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZSkgKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZXJ5ICh0eXBlIDphbnkpIDpWYWxpZGF0b3Ige1xuXHR2YXIgdmFsaWRhdG9yIDpWYWxpZGF0b3IgPSBWYWxpZGF0b3IodHlwZSk7XG5cdHJldHVybiBmdW5jdGlvbiBhcnJheSAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGlmICggIWlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSB2YWx1ZS5sZW5ndGgsIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoICF2YWxpZGF0b3IodmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3ZlcmxvYWQ8VCBleHRlbmRzICguLi5hcmdzIDphbnlbXSkgPT4gYW55PiAodHlwZXMgOmFueVtdLCBjYWxsYmFjayA6VCkgOlQgeyByZXR1cm4gLyojX19QVVJFX18qLyBPdmVybG9hZGVkLmFwcGx5KG51bGwsIGFyZ3VtZW50cyBhcyBhbnkpIGFzIFQ7IH1cbmZ1bmN0aW9uIE92ZXJsb2FkZWQ8VCBleHRlbmRzICguLi5hcmdzIDphbnlbXSkgPT4gYW55PiAodHlwZXMgOmFueVtdLCBjYWxsYmFjayA6VCkgOlQge1xuXHR2YXIgdmFsaWRhdG9yIDpWYWxpZGF0b3IgPSBWYWxpZGF0b3IodHlwZXMpO1xuXHRpZiAoIHR5cGVvZiBjYWxsYmFjayE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcigpOyB9XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXTtcblx0dmFyIGNhbGxiYWNrcyA6VFtdO1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRpZiAoIGxlbmd0aDwzICkgeyBsZW5ndGggPSAwOyB9XG5cdGVsc2Uge1xuXHRcdHZhbGlkYXRvcnMgPSBbXTtcblx0XHRjYWxsYmFja3MgPSBbXTtcblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDI7IGluZGV4PGxlbmd0aDsgKSB7XG5cdFx0XHR2YWxpZGF0b3JzLnB1c2goQXJndW1lbnRzVmFsaWRhdG9yKGFyZ3VtZW50c1tpbmRleCsrXSkpO1xuXHRcdFx0dmFyIGNiIDpUID0gYXJndW1lbnRzW2luZGV4KytdO1xuXHRcdFx0aWYgKCB0eXBlb2YgY2IhPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoKTsgfVxuXHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuXHRcdH1cblx0XHRsZW5ndGggPSB2YWxpZGF0b3JzLmxlbmd0aDtcblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gb3ZlcmxvYWRlZCAodGhpcyA6YW55KSA6UmV0dXJuVHlwZTxUPiB7XG5cdFx0aWYgKCB2YWxpZGF0b3IoYXJndW1lbnRzKSApIHsgcmV0dXJuIGFwcGx5KGNhbGxiYWNrLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoIHZhbGlkYXRvcnNbaW5kZXhdKGFyZ3VtZW50cykgKSB7IHJldHVybiBhcHBseShjYWxsYmFja3NbaW5kZXhdLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0fVxuXHRcdHRocm93IFR5cGVFcnJvcigpO1xuXHR9IGFzIFQ7XG59XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0Pz0nO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdChWYWxpZGF0b3IsIHtcblx0VmFsaWRhdG9yOiBWYWxpZGF0b3IsXG5cdGFuZDogYW5kLCBvcjogb3IsXG5cdGJpZ2ludDogYmlnaW50LCBzeW1ib2w6IHN5bWJvbCwgc3RyaW5nOiBzdHJpbmcsIGJvb2xlYW46IGJvb2xlYW4sIG51bWJlcjogbnVtYmVyLFxuXHR1bmRlZmluZWQ6IHVuZGVmaW5lZCwgTmFOOiBOYU4sIEluZmluaXR5OiBJbmZpbml0eSxcblx0ZXZlcnk6IGV2ZXJ5LFxuXHQndm9pZCc6IFZPSUQsIG9wdGlvbmFsOiBvcHRpb25hbCxcblx0YW55OiBhbnksIG5ldmVyOiBuZXZlcixcblx0b3ZlcmxvYWQ6IG92ZXJsb2FkLFxuXHR2ZXJzaW9uOiB2ZXJzaW9uXG59KTtcblxudHlwZSBWYWxpZGF0b3IgPSAodmFsdWUgOmFueSkgPT4gYm9vbGVhbjsiXSwibmFtZXMiOlsidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGNBQWUsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JBQUMsdEJDWXZCLFNBQVMsSUFBSSxD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