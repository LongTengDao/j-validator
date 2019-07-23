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

//# sourceMappingURL=index.mjs.map