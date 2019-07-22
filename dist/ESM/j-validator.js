/*!
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：1.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-validator/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-validator/
 */

var version = '1.0.0';

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

var getOwnPropertySymbols = Object.getOwnPropertySymbols;

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

var Function_prototype_apply = Function.prototype.apply;

var apply = typeof Reflect==='object' ? Reflect.apply : (
	/*! j-globals: Reflect.apply (polyfill) */
	function apply (target, thisArg, args) {
		return Function_prototype_apply.call(target, thisArg, args);
	}
	/*¡ j-globals: Reflect.apply (polyfill) */
);

var freeze = Object.freeze;

var assign = Object.assign;

var toStringTag = typeof Symbol!=='undefined' ? Symbol.toStringTag : undefined;

var defineProperty = Object.defineProperty;

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

var VOID = freeze ? /*#__PURE__*/ freeze(function VOID() { }) : function VOID() { };
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
var Infinity = 
/*#__PURE__*/
function () {
    function Infinity(value) { return value === INFINITY; }
    Infinity.valueOf = function () { return INFINITY; };
    freeze && freeze(Infinity);
    return Infinity;
}();
function _Infinity(value) { return value === -INFINITY; }
var O = Object_is
    ? function isZero(value) { return Object_is(value, 0); }
    : function isZero(value) { return value === 0 && 1 / value > 0; };
var _O = Object_is
    ? function isZero(value) { return Object_is(value, -0); }
    : function isZero(value) { return value === 0 && 1 / value < 0; };
var EMPTY = [];
function ObjectValidator(type) {
    var symbolKeys = getOwnPropertySymbols ? getOwnPropertySymbols(type).reverse() : EMPTY;
    var length = symbolKeys.length;
    var validators = create(null);
    for (var stringKey in type) {
        if (hasOwnProperty.call(type, stringKey)) {
            validators[stringKey] = Validator(type[stringKey]);
        }
    }
    for (var index = length; index;) {
        var symbolKey = symbolKeys[--index];
        validators[symbolKey] = Validator(type[symbolKey]);
    }
    return function object(value) {
        if (typeof value !== 'object' || !value || isArray(value)) {
            return false;
        }
        for (var stringKey in validators) {
            if (!validators[stringKey](stringKey in value ? value[stringKey] : VOID)) {
                return false;
            }
        }
        for (var index = length; index;) {
            var symbolKey = symbolKeys[--index];
            if (!validators[symbolKey](symbolKey in value ? value[symbolKey] : VOID)) {
                return false;
            }
        }
        return true;
    };
}
function ArrayValidator(type) {
    var length = type.length;
    var validators = [];
    for (var index = length; index;) {
        validators.push(Validator(type[--index]));
    }
    return function array(value) {
        if (!isArray(value)) {
            return false;
        }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMS4wLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlTeW1ib2xzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5pbXBvcnQgaGFzT3duUHJvcGVydHkgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHknO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pz0nO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBVTkRFRklORUQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcblxudmFyIFZPSUQgPSBmcmVlemUgPyAvKiNfX1BVUkVfXyovIGZyZWV6ZShmdW5jdGlvbiBWT0lEICgpIHt9KSA6IGZ1bmN0aW9uIFZPSUQgKCkge307XG5leHBvcnQgeyBWT0lEIGFzIHZvaWQgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFueSAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWUhPT1WT0lEOyB9XG5leHBvcnQgZnVuY3Rpb24gbmV2ZXIgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBiaWdpbnQgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdiaWdpbnQnOyB9XG5leHBvcnQgZnVuY3Rpb24gc3ltYm9sICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nc3ltYm9sJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZyAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J3N0cmluZyc7IH1cbmV4cG9ydCBmdW5jdGlvbiBib29sZWFuICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nYm9vbGVhbic7IH1cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXIgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdudW1iZXInOyB9XG5leHBvcnQgZnVuY3Rpb24gdW5kZWZpbmVkICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PVVOREVGSU5FRDsgfVxuXG5mdW5jdGlvbiBOVUxMICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PW51bGw7IH1cbmZ1bmN0aW9uIFRSVUUgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09dHJ1ZTsgfVxuZnVuY3Rpb24gRkFMU0UgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09ZmFsc2U7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIE5hTiAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWUhPT12YWx1ZTsgfVxuXG5leHBvcnQgdmFyIEluZmluaXR5IDpWYWxpZGF0b3IgPVxuXHQvKiNfX1BVUkVfXyovXG5cdGZ1bmN0aW9uICgpIDpWYWxpZGF0b3Ige1xuXHRcdGZ1bmN0aW9uIEluZmluaXR5ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PUlORklOSVRZOyB9XG5cdFx0SW5maW5pdHkudmFsdWVPZiA9IGZ1bmN0aW9uICh0aGlzIDp0eXBlb2YgSW5maW5pdHkpIDpudW1iZXIgeyByZXR1cm4gSU5GSU5JVFk7IH07XG5cdFx0ZnJlZXplICYmIGZyZWV6ZShJbmZpbml0eSk7XG5cdFx0cmV0dXJuIEluZmluaXR5O1xuXHR9KCk7XG5mdW5jdGlvbiBfSW5maW5pdHkgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09IC1JTkZJTklUWTsgfVxuXG52YXIgTyA6VmFsaWRhdG9yID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gaXNaZXJvICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiBPYmplY3RfaXModmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gaXNaZXJvICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PTAgJiYgMS92YWx1ZT4wOyB9O1xudmFyIF9PIDpWYWxpZGF0b3IgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBpc1plcm8gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIE9iamVjdF9pcyh2YWx1ZSwgLTApOyB9XG5cdDogZnVuY3Rpb24gaXNaZXJvICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PTAgJiYgMS92YWx1ZTwwOyB9O1xuXG52YXIgRU1QVFkgOmFueSA9IFtdO1xuZnVuY3Rpb24gT2JqZWN0VmFsaWRhdG9yPFQgZXh0ZW5kcyBvYmplY3Q+ICh0eXBlIDpUKSA6VmFsaWRhdG9yIHtcblx0dmFyIHN5bWJvbEtleXMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBnZXRPd25Qcm9wZXJ0eVN5bWJvbHModHlwZSkucmV2ZXJzZSgpIDogRU1QVFkgYXMgKCBzeW1ib2wgJiBrZXlvZiBUIClbXTtcblx0dmFyIGxlbmd0aCA6bnVtYmVyID0gc3ltYm9sS2V5cy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzIDp7IFtrZXkgaW4ga2V5b2YgVF0gOlZhbGlkYXRvciB9ID0gY3JlYXRlKG51bGwpO1xuXHRmb3IgKCB2YXIgc3RyaW5nS2V5IGluIHR5cGUgKSB7XG5cdFx0aWYgKCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHR5cGUsIHN0cmluZ0tleSkgKSB7IHZhbGlkYXRvcnNbc3RyaW5nS2V5XSA9IFZhbGlkYXRvcih0eXBlW3N0cmluZ0tleV0pOyB9XG5cdH1cblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBsZW5ndGg7IGluZGV4OyApIHtcblx0XHR2YXIgc3ltYm9sS2V5ID0gc3ltYm9sS2V5c1stLWluZGV4XTtcblx0XHR2YWxpZGF0b3JzW3N5bWJvbEtleV0gPSBWYWxpZGF0b3IodHlwZVtzeW1ib2xLZXldKTtcblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gb2JqZWN0ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7XG5cdFx0aWYgKCB0eXBlb2YgdmFsdWUhPT0nb2JqZWN0JyB8fCAhdmFsdWUgfHwgaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZvciAoIHZhciBzdHJpbmdLZXkgaW4gdmFsaWRhdG9ycyApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbc3RyaW5nS2V5XShzdHJpbmdLZXkgaW4gdmFsdWUgPyB2YWx1ZVtzdHJpbmdLZXldIDogVk9JRCkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0dmFyIHN5bWJvbEtleSA9IHN5bWJvbEtleXNbLS1pbmRleF07XG5cdFx0XHRpZiAoICF2YWxpZGF0b3JzW3N5bWJvbEtleV0oc3ltYm9sS2V5IGluIHZhbHVlID8gdmFsdWVbc3ltYm9sS2V5XSA6IFZPSUQpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbmZ1bmN0aW9uIEFycmF5VmFsaWRhdG9yICh0eXBlIDphbnlbXSkgOlZhbGlkYXRvciB7XG5cdHZhciBsZW5ndGggOm51bWJlciA9IHR5cGUubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyA6VmFsaWRhdG9yW10gPSBbXTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBsZW5ndGg7IGluZGV4OyApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlWy0taW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIGFycmF5ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7XG5cdFx0aWYgKCAhaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGlmICggdmFsdWUubGVuZ3RoIT09bGVuZ3RoICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yc1stLWluZGV4XSh2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbmZ1bmN0aW9uIEFyZ3VtZW50c1ZhbGlkYXRvciAodHlwZSA6YW55W10pIDpWYWxpZGF0b3Ige1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSB0eXBlLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOlZhbGlkYXRvcltdID0gW107XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gbGVuZ3RoOyBpbmRleDsgKSB7IHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3IodHlwZVstLWluZGV4XSkpOyB9XG5cdHJldHVybiBmdW5jdGlvbiBBUkdVTUVOVFMgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRpZiAoIHZhbHVlLmxlbmd0aCE9PWxlbmd0aCApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBsZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbLS1pbmRleF0odmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVmFsaWRhdG9yICh0eXBlIDphbnkpIDpWYWxpZGF0b3Ige1xuXHRyZXR1cm4gdHlwZW9mIHR5cGU9PT0nZnVuY3Rpb24nID8gdHlwZSA6XG5cdFx0dW5kZWZpbmVkKHR5cGUpID8gdW5kZWZpbmVkIDpcblx0XHRcdFRSVUUodHlwZSkgPyBUUlVFIDogRkFMU0UodHlwZSkgPyBGQUxTRSA6XG5cdFx0XHRcdE5VTEwodHlwZSkgPyBOVUxMIDpcblx0XHRcdFx0XHR0eXBlb2YgdHlwZT09PSdvYmplY3QnID8gLyojX19QVVJFX18qLyAoIGlzQXJyYXkodHlwZSkgPyBBcnJheVZhbGlkYXRvciA6IE9iamVjdFZhbGlkYXRvciApKHR5cGUpIDpcblx0XHRcdFx0XHRcdE8odHlwZSkgPyBPIDogX08odHlwZSkgPyBfTyA6XG5cdFx0XHRcdFx0XHRcdE5hTih0eXBlKSA/IE5hTiA6XG5cdFx0XHRcdFx0XHRcdFx0LyojX19QVVJFX18qLyBJbmZpbml0eSh0eXBlKSA/IEluZmluaXR5IDogX0luZmluaXR5KHR5cGUpID8gX0luZmluaXR5IDpcblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiB2YWxpZGF0b3IgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09dHlwZTsgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wdGlvbmFsICh0eXBlIDphbnkpIDpWYWxpZGF0b3Ige1xuXHR2YXIgdmFsaWRhdG9yIDpWYWxpZGF0b3IgPSBWYWxpZGF0b3IodHlwZSk7XG5cdHJldHVybiBmdW5jdGlvbiBvcHRpb25hbFZhbGlkYXRvciAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT1WT0lEIHx8IHZhbGlkYXRvcih2YWx1ZSk7IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmQgKCkgOlZhbGlkYXRvciB7XG5cdHZhciB0eXBlcyA9IGFyZ3VtZW50cy5sZW5ndGg9PT0xICYmIGlzQXJyYXkoYXJndW1lbnRzWzBdKSA/IGFyZ3VtZW50c1swXSA6IGFyZ3VtZW50cztcblx0dmFyIGxlbmd0aCA6bnVtYmVyID0gdHlwZXMubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyA6VmFsaWRhdG9yW10gPSBbXTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3IodHlwZXNbaW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIG9yICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7XG5cdFx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoICF2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBvciAoKSA6VmFsaWRhdG9yIHtcblx0dmFyIHR5cGVzID0gYXJndW1lbnRzLmxlbmd0aD09PTEgJiYgaXNBcnJheShhcmd1bWVudHNbMF0pID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSB0eXBlcy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXSA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlc1tpbmRleF0pKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gb3IgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggdmFsaWRhdG9yc1tpbmRleF0odmFsdWUpICkgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmVyeSAodHlwZSA6YW55KSA6VmFsaWRhdG9yIHtcblx0dmFyIHZhbGlkYXRvciA6VmFsaWRhdG9yID0gVmFsaWRhdG9yKHR5cGUpO1xuXHRyZXR1cm4gZnVuY3Rpb24gYXJyYXkgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRpZiAoICFpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICggdmFyIGxlbmd0aCA6bnVtYmVyID0gdmFsdWUubGVuZ3RoLCBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG92ZXJsb2FkPFQgZXh0ZW5kcyAoLi4uYXJncyA6YW55W10pID0+IGFueT4gKHR5cGVzIDphbnlbXSwgY2FsbGJhY2sgOlQpIDpUIHsgcmV0dXJuIC8qI19fUFVSRV9fKi8gT3ZlcmxvYWRlZC5hcHBseShudWxsLCBhcmd1bWVudHMgYXMgYW55KSBhcyBUOyB9XG5mdW5jdGlvbiBPdmVybG9hZGVkPFQgZXh0ZW5kcyAoLi4uYXJncyA6YW55W10pID0+IGFueT4gKHR5cGVzIDphbnlbXSwgY2FsbGJhY2sgOlQpIDpUIHtcblx0dmFyIHZhbGlkYXRvciA6VmFsaWRhdG9yID0gVmFsaWRhdG9yKHR5cGVzKTtcblx0aWYgKCB0eXBlb2YgY2FsbGJhY2shPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoKTsgfVxuXHR2YXIgdmFsaWRhdG9ycyA6VmFsaWRhdG9yW107XG5cdHZhciBjYWxsYmFja3MgOlRbXTtcblx0dmFyIGxlbmd0aCA6bnVtYmVyID0gYXJndW1lbnRzLmxlbmd0aDtcblx0aWYgKCBsZW5ndGg8MyApIHsgbGVuZ3RoID0gMDsgfVxuXHRlbHNlIHtcblx0XHR2YWxpZGF0b3JzID0gW107XG5cdFx0Y2FsbGJhY2tzID0gW107XG5cdFx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSAyOyBpbmRleDxsZW5ndGg7ICkge1xuXHRcdFx0dmFsaWRhdG9ycy5wdXNoKEFyZ3VtZW50c1ZhbGlkYXRvcihhcmd1bWVudHNbaW5kZXgrK10pKTtcblx0XHRcdHZhciBjYiA6VCA9IGFyZ3VtZW50c1tpbmRleCsrXTtcblx0XHRcdGlmICggdHlwZW9mIGNiIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKCk7IH1cblx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcblx0XHR9XG5cdFx0bGVuZ3RoID0gdmFsaWRhdG9ycy5sZW5ndGg7XG5cdH1cblx0cmV0dXJuIGZ1bmN0aW9uIG92ZXJsb2FkZWQgKHRoaXMgOmFueSkgOlJldHVyblR5cGU8VD4ge1xuXHRcdGlmICggdmFsaWRhdG9yKGFyZ3VtZW50cykgKSB7IHJldHVybiBhcHBseShjYWxsYmFjaywgdGhpcywgYXJndW1lbnRzKTsgfVxuXHRcdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XShhcmd1bWVudHMpICkgeyByZXR1cm4gYXBwbHkoY2FsbGJhY2tzW2luZGV4XSwgdGhpcywgYXJndW1lbnRzKTsgfVxuXHRcdH1cblx0XHR0aHJvdyBUeXBlRXJyb3IoKTtcblx0fSBhcyBUO1xufVxuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdD89JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoVmFsaWRhdG9yLCB7XG5cdFZhbGlkYXRvcjogVmFsaWRhdG9yLFxuXHRhbmQ6IGFuZCwgb3I6IG9yLFxuXHRiaWdpbnQ6IGJpZ2ludCwgc3ltYm9sOiBzeW1ib2wsIHN0cmluZzogc3RyaW5nLCBib29sZWFuOiBib29sZWFuLCBudW1iZXI6IG51bWJlcixcblx0dW5kZWZpbmVkOiB1bmRlZmluZWQsIE5hTjogTmFOLCBJbmZpbml0eTogSW5maW5pdHksXG5cdGV2ZXJ5OiBldmVyeSxcblx0J3ZvaWQnOiBWT0lELCBvcHRpb25hbDogb3B0aW9uYWwsXG5cdGFueTogYW55LCBuZXZlcjogbmV2ZXIsXG5cdG92ZXJsb2FkOiBvdmVybG9hZCxcblx0dmVyc2lvbjogdmVyc2lvblxufSk7XG5cbmV4cG9ydCB0eXBlIFZhbGlkYXRvciA9ICh2YWx1ZSA6YW55KSA9PiBib29sZWFuOyJdLCJuYW1lcyI6WyJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsY0FBZSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JBQUMsbEJDY25CLElBQUksR0FBRyxNQUFNLGlCQUFpQixNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxHQUFHLFNBQVMsSUFBSSxNQUFNLENBQUM7QUFDcEYsU0FFZ0IsR0FBRyxDQUFFLEtBQVUsSUFBYSxPQUFPLEtBQUssS0FBRyxJQUFJLENBQUMsRUFBRTtBQUNsRSxTQUFnQixLQUFLLENBQUUsS0FBVSxJQUFhLE9BQU8sS0FBSyxDQUFDLEVBQUU7QUFFN0QsU0FBZ0IsTUFBTSxDQUFFLEtBQVUsSUFBYSxPQUFPLE9BQU8sS0FBSyxLQUFHLFFBQVEsQ0FBQyxFQUFFO0FBQ2hGLFNBQWdCLE1BQU0sQ0FBRSxLQUFVLElBQWEsT0FBTyxPQUFPLEtBQUssS0FBRyxRQUFRLENBQUMsRUFBRTtBQUNoRixTQUFnQixNQUFNLENBQUUsS0FBVSxJQUFhLE9BQU8sT0FBTyxLQUFLLEtBQUcsUUFBUSxDQUFDLEVBQUU7QUFDaEYsU0FBZ0IsT0FBTyxDQUFFLEtBQVUsSUFBYSxPQUFPLE9BQU8sS0FBSyxLQUFHLFNBQVMsQ0FBQyxFQUFFO0FBQ2xGLFNBQWdCLE1BQU0sQ0FBRSxLQUFVLElBQWEsT0FBTyxPQUFPLEtBQUssS0FBRyxRQUFRLENBQUMsRUFBRTtBQUNoRixTQUFnQkEsV0FBUyxDQUFFLEtBQVUsSUFBYSxP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