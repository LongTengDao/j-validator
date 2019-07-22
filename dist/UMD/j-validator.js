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

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Validator = factory());
}(this, function () { 'use strict';

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

	return _export;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMS4wLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlTeW1ib2xzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5pbXBvcnQgaGFzT3duUHJvcGVydHkgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHknO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pz0nO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBVTkRFRklORUQgZnJvbSAnLnVuZGVmaW5lZCc7XG5pbXBvcnQgZnJlZXplIGZyb20gJy5PYmplY3QuZnJlZXplJztcblxudmFyIFZPSUQgPSBmcmVlemUgPyAvKiNfX1BVUkVfXyovIGZyZWV6ZShmdW5jdGlvbiBWT0lEICgpIHt9KSA6IGZ1bmN0aW9uIFZPSUQgKCkge307XG5leHBvcnQgeyBWT0lEIGFzIHZvaWQgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFueSAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWUhPT1WT0lEOyB9XG5leHBvcnQgZnVuY3Rpb24gbmV2ZXIgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBiaWdpbnQgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdiaWdpbnQnOyB9XG5leHBvcnQgZnVuY3Rpb24gc3ltYm9sICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nc3ltYm9sJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZyAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J3N0cmluZyc7IH1cbmV4cG9ydCBmdW5jdGlvbiBib29sZWFuICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nYm9vbGVhbic7IH1cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXIgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdudW1iZXInOyB9XG5leHBvcnQgZnVuY3Rpb24gdW5kZWZpbmVkICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PVVOREVGSU5FRDsgfVxuXG5mdW5jdGlvbiBOVUxMICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PW51bGw7IH1cbmZ1bmN0aW9uIFRSVUUgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09dHJ1ZTsgfVxuZnVuY3Rpb24gRkFMU0UgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09ZmFsc2U7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIE5hTiAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWUhPT12YWx1ZTsgfVxuXG5leHBvcnQgdmFyIEluZmluaXR5IDpWYWxpZGF0b3IgPVxuXHQvKiNfX1BVUkVfXyovXG5cdGZ1bmN0aW9uICgpIDpWYWxpZGF0b3Ige1xuXHRcdGZ1bmN0aW9uIEluZmluaXR5ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PUlORklOSVRZOyB9XG5cdFx0SW5maW5pdHkudmFsdWVPZiA9IGZ1bmN0aW9uICh0aGlzIDp0eXBlb2YgSW5maW5pdHkpIDpudW1iZXIgeyByZXR1cm4gSU5GSU5JVFk7IH07XG5cdFx0ZnJlZXplICYmIGZyZWV6ZShJbmZpbml0eSk7XG5cdFx0cmV0dXJuIEluZmluaXR5O1xuXHR9KCk7XG5mdW5jdGlvbiBfSW5maW5pdHkgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09IC1JTkZJTklUWTsgfVxuXG52YXIgTyA6VmFsaWRhdG9yID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gaXNaZXJvICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiBPYmplY3RfaXModmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gaXNaZXJvICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PTAgJiYgMS92YWx1ZT4wOyB9O1xudmFyIF9PIDpWYWxpZGF0b3IgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBpc1plcm8gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIE9iamVjdF9pcyh2YWx1ZSwgLTApOyB9XG5cdDogZnVuY3Rpb24gaXNaZXJvICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PTAgJiYgMS92YWx1ZTwwOyB9O1xuXG52YXIgRU1QVFkgOmFueSA9IFtdO1xuZnVuY3Rpb24gT2JqZWN0VmFsaWRhdG9yPFQgZXh0ZW5kcyBvYmplY3Q+ICh0eXBlIDpUKSA6VmFsaWRhdG9yIHtcblx0dmFyIHN5bWJvbEtleXMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBnZXRPd25Qcm9wZXJ0eVN5bWJvbHModHlwZSkucmV2ZXJzZSgpIDogRU1QVFkgYXMgKCBzeW1ib2wgJiBrZXlvZiBUIClbXTtcblx0dmFyIGxlbmd0aCA6bnVtYmVyID0gc3ltYm9sS2V5cy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzIDp7IFtrZXkgaW4ga2V5b2YgVF0gOlZhbGlkYXRvciB9ID0gY3JlYXRlKG51bGwpO1xuXHRmb3IgKCB2YXIgc3RyaW5nS2V5IGluIHR5cGUgKSB7XG5cdFx0aWYgKCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHR5cGUsIHN0cmluZ0tleSkgKSB7IHZhbGlkYXRvcnNbc3RyaW5nS2V5XSA9IFZhbGlkYXRvcih0eXBlW3N0cmluZ0tleV0pOyB9XG5cdH1cblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBsZW5ndGg7IGluZGV4OyApIHtcblx0XHR2YXIgc3ltYm9sS2V5ID0gc3ltYm9sS2V5c1stLWluZGV4XTtcblx0XHR2YWxpZGF0b3JzW3N5bWJvbEtleV0gPSBWYWxpZGF0b3IodHlwZVtzeW1ib2xLZXldKTtcblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gb2JqZWN0ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7XG5cdFx0aWYgKCB0eXBlb2YgdmFsdWUhPT0nb2JqZWN0JyB8fCAhdmFsdWUgfHwgaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZvciAoIHZhciBzdHJpbmdLZXkgaW4gdmFsaWRhdG9ycyApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbc3RyaW5nS2V5XShzdHJpbmdLZXkgaW4gdmFsdWUgPyB2YWx1ZVtzdHJpbmdLZXldIDogVk9JRCkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0dmFyIHN5bWJvbEtleSA9IHN5bWJvbEtleXNbLS1pbmRleF07XG5cdFx0XHRpZiAoICF2YWxpZGF0b3JzW3N5bWJvbEtleV0oc3ltYm9sS2V5IGluIHZhbHVlID8gdmFsdWVbc3ltYm9sS2V5XSA6IFZPSUQpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbmZ1bmN0aW9uIEFycmF5VmFsaWRhdG9yICh0eXBlIDphbnlbXSkgOlZhbGlkYXRvciB7XG5cdHZhciBsZW5ndGggOm51bWJlciA9IHR5cGUubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyA6VmFsaWRhdG9yW10gPSBbXTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBsZW5ndGg7IGluZGV4OyApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlWy0taW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIGFycmF5ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7XG5cdFx0aWYgKCAhaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGlmICggdmFsdWUubGVuZ3RoIT09bGVuZ3RoICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yc1stLWluZGV4XSh2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbmZ1bmN0aW9uIEFyZ3VtZW50c1ZhbGlkYXRvciAodHlwZSA6YW55W10pIDpWYWxpZGF0b3Ige1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSB0eXBlLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOlZhbGlkYXRvcltdID0gW107XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gbGVuZ3RoOyBpbmRleDsgKSB7IHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3IodHlwZVstLWluZGV4XSkpOyB9XG5cdHJldHVybiBmdW5jdGlvbiBBUkdVTUVOVFMgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRpZiAoIHZhbHVlLmxlbmd0aCE9PWxlbmd0aCApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBsZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbLS1pbmRleF0odmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVmFsaWRhdG9yICh0eXBlIDphbnkpIDpWYWxpZGF0b3Ige1xuXHRyZXR1cm4gdHlwZW9mIHR5cGU9PT0nZnVuY3Rpb24nID8gdHlwZSA6XG5cdFx0dW5kZWZpbmVkKHR5cGUpID8gdW5kZWZpbmVkIDpcblx0XHRcdFRSVUUodHlwZSkgPyBUUlVFIDogRkFMU0UodHlwZSkgPyBGQUxTRSA6XG5cdFx0XHRcdE5VTEwodHlwZSkgPyBOVUxMIDpcblx0XHRcdFx0XHR0eXBlb2YgdHlwZT09PSdvYmplY3QnID8gLyojX19QVVJFX18qLyAoIGlzQXJyYXkodHlwZSkgPyBBcnJheVZhbGlkYXRvciA6IE9iamVjdFZhbGlkYXRvciApKHR5cGUpIDpcblx0XHRcdFx0XHRcdE8odHlwZSkgPyBPIDogX08odHlwZSkgPyBfTyA6XG5cdFx0XHRcdFx0XHRcdE5hTih0eXBlKSA/IE5hTiA6XG5cdFx0XHRcdFx0XHRcdFx0LyojX19QVVJFX18qLyBJbmZpbml0eSh0eXBlKSA/IEluZmluaXR5IDogX0luZmluaXR5KHR5cGUpID8gX0luZmluaXR5IDpcblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiB2YWxpZGF0b3IgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09dHlwZTsgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wdGlvbmFsICh0eXBlIDphbnkpIDpWYWxpZGF0b3Ige1xuXHR2YXIgdmFsaWRhdG9yIDpWYWxpZGF0b3IgPSBWYWxpZGF0b3IodHlwZSk7XG5cdHJldHVybiBmdW5jdGlvbiBvcHRpb25hbFZhbGlkYXRvciAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT1WT0lEIHx8IHZhbGlkYXRvcih2YWx1ZSk7IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmQgKCkgOlZhbGlkYXRvciB7XG5cdHZhciB0eXBlcyA9IGFyZ3VtZW50cy5sZW5ndGg9PT0xICYmIGlzQXJyYXkoYXJndW1lbnRzWzBdKSA/IGFyZ3VtZW50c1swXSA6IGFyZ3VtZW50cztcblx0dmFyIGxlbmd0aCA6bnVtYmVyID0gdHlwZXMubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyA6VmFsaWRhdG9yW10gPSBbXTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3IodHlwZXNbaW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIG9yICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7XG5cdFx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoICF2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBvciAoKSA6VmFsaWRhdG9yIHtcblx0dmFyIHR5cGVzID0gYXJndW1lbnRzLmxlbmd0aD09PTEgJiYgaXNBcnJheShhcmd1bWVudHNbMF0pID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSB0eXBlcy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXSA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlc1tpbmRleF0pKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gb3IgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggdmFsaWRhdG9yc1tpbmRleF0odmFsdWUpICkgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmVyeSAodHlwZSA6YW55KSA6VmFsaWRhdG9yIHtcblx0dmFyIHZhbGlkYXRvciA6VmFsaWRhdG9yID0gVmFsaWRhdG9yKHR5cGUpO1xuXHRyZXR1cm4gZnVuY3Rpb24gYXJyYXkgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRpZiAoICFpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICggdmFyIGxlbmd0aCA6bnVtYmVyID0gdmFsdWUubGVuZ3RoLCBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG92ZXJsb2FkPFQgZXh0ZW5kcyAoLi4uYXJncyA6YW55W10pID0+IGFueT4gKHR5cGVzIDphbnlbXSwgY2FsbGJhY2sgOlQpIDpUIHsgcmV0dXJuIC8qI19fUFVSRV9fKi8gT3ZlcmxvYWRlZC5hcHBseShudWxsLCBhcmd1bWVudHMgYXMgYW55KSBhcyBUOyB9XG5mdW5jdGlvbiBPdmVybG9hZGVkPFQgZXh0ZW5kcyAoLi4uYXJncyA6YW55W10pID0+IGFueT4gKHR5cGVzIDphbnlbXSwgY2FsbGJhY2sgOlQpIDpUIHtcblx0dmFyIHZhbGlkYXRvciA6VmFsaWRhdG9yID0gVmFsaWRhdG9yKHR5cGVzKTtcblx0aWYgKCB0eXBlb2YgY2FsbGJhY2shPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoKTsgfVxuXHR2YXIgdmFsaWRhdG9ycyA6VmFsaWRhdG9yW107XG5cdHZhciBjYWxsYmFja3MgOlRbXTtcblx0dmFyIGxlbmd0aCA6bnVtYmVyID0gYXJndW1lbnRzLmxlbmd0aDtcblx0aWYgKCBsZW5ndGg8MyApIHsgbGVuZ3RoID0gMDsgfVxuXHRlbHNlIHtcblx0XHR2YWxpZGF0b3JzID0gW107XG5cdFx0Y2FsbGJhY2tzID0gW107XG5cdFx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSAyOyBpbmRleDxsZW5ndGg7ICkge1xuXHRcdFx0dmFsaWRhdG9ycy5wdXNoKEFyZ3VtZW50c1ZhbGlkYXRvcihhcmd1bWVudHNbaW5kZXgrK10pKTtcblx0XHRcdHZhciBjYiA6VCA9IGFyZ3VtZW50c1tpbmRleCsrXTtcblx0XHRcdGlmICggdHlwZW9mIGNiIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKCk7IH1cblx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcblx0XHR9XG5cdFx0bGVuZ3RoID0gdmFsaWRhdG9ycy5sZW5ndGg7XG5cdH1cblx0cmV0dXJuIGZ1bmN0aW9uIG92ZXJsb2FkZWQgKHRoaXMgOmFueSkgOlJldHVyblR5cGU8VD4ge1xuXHRcdGlmICggdmFsaWRhdG9yKGFyZ3VtZW50cykgKSB7IHJldHVybiBhcHBseShjYWxsYmFjaywgdGhpcywgYXJndW1lbnRzKTsgfVxuXHRcdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XShhcmd1bWVudHMpICkgeyByZXR1cm4gYXBwbHkoY2FsbGJhY2tzW2luZGV4XSwgdGhpcywgYXJndW1lbnRzKTsgfVxuXHRcdH1cblx0XHR0aHJvdyBUeXBlRXJyb3IoKTtcblx0fSBhcyBUO1xufVxuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdD89JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoVmFsaWRhdG9yLCB7XG5cdFZhbGlkYXRvcjogVmFsaWRhdG9yLFxuXHRhbmQ6IGFuZCwgb3I6IG9yLFxuXHRiaWdpbnQ6IGJpZ2ludCwgc3ltYm9sOiBzeW1ib2wsIHN0cmluZzogc3RyaW5nLCBib29sZWFuOiBib29sZWFuLCBudW1iZXI6IG51bWJlcixcblx0dW5kZWZpbmVkOiB1bmRlZmluZWQsIE5hTjogTmFOLCBJbmZpbml0eTogSW5maW5pdHksXG5cdGV2ZXJ5OiBldmVyeSxcblx0J3ZvaWQnOiBWT0lELCBvcHRpb25hbDogb3B0aW9uYWwsXG5cdGFueTogYW55LCBuZXZlcjogbmV2ZXIsXG5cdG92ZXJsb2FkOiBvdmVybG9hZCxcblx0dmVyc2lvbjogdmVyc2lvblxufSk7XG5cbmV4cG9ydCB0eXBlIFZhbGlkYXRvciA9ICh2YWx1ZSA6YW55KSA9PiBib29sZWFuOyJdLCJuYW1lcyI6WyJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZUFBZSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBQUMsdEJDY3ZCLElBQUksSUFBSSxHQUFHLE1BQU0saUJBQWlCLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLEdBQUcsU0FBUyxJQUFJLE1BQU0sQ0FBQztBQUNwRixVQUVnQixHQUFHLENBQUUsS0FBVSxJQUFhLE9BQU8sS0FBSyxLQUFHLElBQUksQ0FBQyxFQUFFO0FBQ2xFLFVBQWdCLEtBQUssQ0FBRSxLQUFVLElBQWEsT0FBTyxLQUFLLENBQUMsRUFBRTtBQUU3RCxVQUFnQixNQUFNLENBQUUsS0FBVSxJQUFhLE9BQU8sT0FBTyxLQUFLLEtBQUcsUUFBUSxDQUFDLEVBQUU7QUFDaEYsVUFBZ0IsTUFBTSxDQUFFLEtBQVUsSUFBYSxPQUFPLE9BQU8sS0FBSyxLQUFHLFFBQVEsQ0FBQyxFQUFFO0FBQ2hGLFVBQWdCLE1BQU0sQ0FBRSxLQUFVLElBQWEsT0FBTyxPQUFPLEtBQUssS0FBRyxRQUFRLENBQUMsRUFBRTtBQUNoRixVQUFnQixPQUFPLENBQUUsS0FBVSxJQUFhLE9BQU8sT0FBTyxLQUFLLEtBQUcsU0FBUyxDQUFDLEVBQUU7QUFDbEYsVUFBZ0IsTUFBTSxDQUFFLEtBQVUsSUFBYSxPQUFPLE9BQU8sS0FBSyxLQUFHLFFBQVEsQ0FBQyxFQUFFO0FBQ2hGLFVBQWdCQSxXQUFTLENBQUUs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