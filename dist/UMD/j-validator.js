/*!
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：1.1.0
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

	var version = '1.1.0';

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMS4xLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlTeW1ib2xzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5pbXBvcnQgaGFzT3duUHJvcGVydHkgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHknO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pz0nO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBVTkRFRklORUQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmZ1bmN0aW9uIFZPSUQgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09Vk9JRDsgfVxuZXhwb3J0IHsgVk9JRCBhcyB2b2lkIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBhbnkgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlIT09Vk9JRDsgfVxuZXhwb3J0IGZ1bmN0aW9uIG5ldmVyICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gYmlnaW50ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nYmlnaW50JzsgfVxuZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbCAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J3N5bWJvbCc7IH1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmcgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnOyB9XG5leHBvcnQgZnVuY3Rpb24gYm9vbGVhbiAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J2Jvb2xlYW4nOyB9XG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nbnVtYmVyJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIHVuZGVmaW5lZCAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT1VTkRFRklORUQ7IH1cblxuZnVuY3Rpb24gTlVMTCAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT1udWxsOyB9XG5mdW5jdGlvbiBUUlVFICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PXRydWU7IH1cbmZ1bmN0aW9uIEZBTFNFICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PWZhbHNlOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBOYU4gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlIT09dmFsdWU7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIEluZmluaXR5ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PUlORklOSVRZOyB9XG5JbmZpbml0eS52YWx1ZU9mID0gZnVuY3Rpb24gKHRoaXMgOnR5cGVvZiBJbmZpbml0eSkgOm51bWJlciB7IHJldHVybiBJTkZJTklUWTsgfTtcbmZ1bmN0aW9uIF9JbmZpbml0eSAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT0gLUlORklOSVRZOyB9XG5cbnZhciBPIDpWYWxpZGF0b3IgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBPICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiBPYmplY3RfaXModmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gTyAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT0wICYmIDEvdmFsdWU+MDsgfTtcbnZhciBfTyA6VmFsaWRhdG9yID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gX08gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIE9iamVjdF9pcyh2YWx1ZSwgLTApOyB9XG5cdDogZnVuY3Rpb24gX08gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09MCAmJiAxL3ZhbHVlPDA7IH07XG5cbnZhciBFTVBUWSA6YW55ID0gW107XG5mdW5jdGlvbiBPYmplY3RWYWxpZGF0b3I8VCBleHRlbmRzIG9iamVjdD4gKHR5cGUgOlQpIDpWYWxpZGF0b3Ige1xuXHR2YXIgc3ltYm9sS2V5cyA9IGdldE93blByb3BlcnR5U3ltYm9scyA/IGdldE93blByb3BlcnR5U3ltYm9scyh0eXBlKS5yZXZlcnNlKCkgOiBFTVBUWSBhcyAoIHN5bWJvbCAmIGtleW9mIFQgKVtdO1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSBzeW1ib2xLZXlzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOnsgW2tleSBpbiBrZXlvZiBUXSA6VmFsaWRhdG9yIH0gPSBjcmVhdGUobnVsbCk7XG5cdGZvciAoIHZhciBzdHJpbmdLZXkgaW4gdHlwZSApIHtcblx0XHRpZiAoIGhhc093blByb3BlcnR5LmNhbGwodHlwZSwgc3RyaW5nS2V5KSApIHsgdmFsaWRhdG9yc1tzdHJpbmdLZXldID0gVmFsaWRhdG9yKHR5cGVbc3RyaW5nS2V5XSk7IH1cblx0fVxuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdHZhciBzeW1ib2xLZXkgPSBzeW1ib2xLZXlzWy0taW5kZXhdO1xuXHRcdHZhbGlkYXRvcnNbc3ltYm9sS2V5XSA9IFZhbGlkYXRvcih0eXBlW3N5bWJvbEtleV0pO1xuXHR9XG5cdHJldHVybiBmdW5jdGlvbiBvYmplY3QgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSE9PSdvYmplY3QnIHx8ICF2YWx1ZSB8fCBpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICggdmFyIHN0cmluZ0tleSBpbiB2YWxpZGF0b3JzICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yc1tzdHJpbmdLZXldKHN0cmluZ0tleSBpbiB2YWx1ZSA/IHZhbHVlW3N0cmluZ0tleV0gOiBWT0lEKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gbGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHR2YXIgc3ltYm9sS2V5ID0gc3ltYm9sS2V5c1stLWluZGV4XTtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbc3ltYm9sS2V5XShzeW1ib2xLZXkgaW4gdmFsdWUgPyB2YWx1ZVtzeW1ib2xLZXldIDogVk9JRCkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuZnVuY3Rpb24gQXJyYXlWYWxpZGF0b3IgKHR5cGUgOmFueVtdKSA6VmFsaWRhdG9yIHtcblx0dmFyIGxlbmd0aCA6bnVtYmVyID0gdHlwZS5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXSA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGxlbmd0aDsgaW5kZXg7ICkgeyB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9yKHR5cGVbLS1pbmRleF0pKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gYXJyYXkgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRpZiAoICFpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0aWYgKCB2YWx1ZS5sZW5ndGghPT1sZW5ndGggKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gbGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRpZiAoICF2YWxpZGF0b3JzWy0taW5kZXhdKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuZnVuY3Rpb24gQXJndW1lbnRzVmFsaWRhdG9yICh0eXBlIDphbnlbXSkgOlZhbGlkYXRvciB7XG5cdHZhciBsZW5ndGggOm51bWJlciA9IHR5cGUubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyA6VmFsaWRhdG9yW10gPSBbXTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBsZW5ndGg7IGluZGV4OyApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlWy0taW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIEFSR1VNRU5UUyAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGlmICggdmFsdWUubGVuZ3RoIT09bGVuZ3RoICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yc1stLWluZGV4XSh2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBWYWxpZGF0b3IgKHR5cGUgOmFueSkgOlZhbGlkYXRvciB7XG5cdHJldHVybiB0eXBlb2YgdHlwZT09PSdmdW5jdGlvbicgPyB0eXBlIDpcblx0XHR1bmRlZmluZWQodHlwZSkgPyB1bmRlZmluZWQgOlxuXHRcdFx0VFJVRSh0eXBlKSA/IFRSVUUgOiBGQUxTRSh0eXBlKSA/IEZBTFNFIDpcblx0XHRcdFx0TlVMTCh0eXBlKSA/IE5VTEwgOlxuXHRcdFx0XHRcdHR5cGVvZiB0eXBlPT09J29iamVjdCcgPyAvKiNfX1BVUkVfXyovICggaXNBcnJheSh0eXBlKSA/IEFycmF5VmFsaWRhdG9yIDogT2JqZWN0VmFsaWRhdG9yICkodHlwZSkgOlxuXHRcdFx0XHRcdFx0Tyh0eXBlKSA/IE8gOiBfTyh0eXBlKSA/IF9PIDpcblx0XHRcdFx0XHRcdFx0TmFOKHR5cGUpID8gTmFOIDpcblx0XHRcdFx0XHRcdFx0XHQvKiNfX1BVUkVfXyovIEluZmluaXR5KHR5cGUpID8gSW5maW5pdHkgOiBfSW5maW5pdHkodHlwZSkgPyBfSW5maW5pdHkgOlxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIHZhbGlkYXRvciAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT10eXBlOyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uYWwgKHR5cGUgOmFueSkgOlZhbGlkYXRvciB7XG5cdHZhciB2YWxpZGF0b3IgOlZhbGlkYXRvciA9IFZhbGlkYXRvcih0eXBlKTtcblx0cmV0dXJuIGZ1bmN0aW9uIG9wdGlvbmFsVmFsaWRhdG9yICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PVZPSUQgfHwgdmFsaWRhdG9yKHZhbHVlKTsgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuZCAoKSA6VmFsaWRhdG9yIHtcblx0dmFyIHR5cGVzID0gYXJndW1lbnRzLmxlbmd0aD09PTEgJiYgaXNBcnJheShhcmd1bWVudHNbMF0pID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSB0eXBlcy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXSA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlc1tpbmRleF0pKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gb3IgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9yICgpIDpWYWxpZGF0b3Ige1xuXHR2YXIgdHlwZXMgPSBhcmd1bWVudHMubGVuZ3RoPT09MSAmJiBpc0FycmF5KGFyZ3VtZW50c1swXSkgPyBhcmd1bWVudHNbMF0gOiBhcmd1bWVudHM7XG5cdHZhciBsZW5ndGggOm51bWJlciA9IHR5cGVzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOlZhbGlkYXRvcltdID0gW107XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9yKHR5cGVzW2luZGV4XSkpOyB9XG5cdHJldHVybiBmdW5jdGlvbiBvciAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZSkgKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZXJ5ICh0eXBlIDphbnkpIDpWYWxpZGF0b3Ige1xuXHR2YXIgdmFsaWRhdG9yIDpWYWxpZGF0b3IgPSBWYWxpZGF0b3IodHlwZSk7XG5cdHJldHVybiBmdW5jdGlvbiBhcnJheSAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGlmICggIWlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSB2YWx1ZS5sZW5ndGgsIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoICF2YWxpZGF0b3IodmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3ZlcmxvYWQ8VCBleHRlbmRzICguLi5hcmdzIDphbnlbXSkgPT4gYW55PiAodHlwZXMgOmFueVtdLCBjYWxsYmFjayA6VCkgOlQgeyByZXR1cm4gLyojX19QVVJFX18qLyBPdmVybG9hZGVkLmFwcGx5KG51bGwsIGFyZ3VtZW50cyBhcyBhbnkpIGFzIFQ7IH1cbmZ1bmN0aW9uIE92ZXJsb2FkZWQ8VCBleHRlbmRzICguLi5hcmdzIDphbnlbXSkgPT4gYW55PiAodHlwZXMgOmFueVtdLCBjYWxsYmFjayA6VCkgOlQge1xuXHR2YXIgdmFsaWRhdG9yIDpWYWxpZGF0b3IgPSBWYWxpZGF0b3IodHlwZXMpO1xuXHRpZiAoIHR5cGVvZiBjYWxsYmFjayE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcigpOyB9XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXTtcblx0dmFyIGNhbGxiYWNrcyA6VFtdO1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRpZiAoIGxlbmd0aDwzICkgeyBsZW5ndGggPSAwOyB9XG5cdGVsc2Uge1xuXHRcdHZhbGlkYXRvcnMgPSBbXTtcblx0XHRjYWxsYmFja3MgPSBbXTtcblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDI7IGluZGV4PGxlbmd0aDsgKSB7XG5cdFx0XHR2YWxpZGF0b3JzLnB1c2goQXJndW1lbnRzVmFsaWRhdG9yKGFyZ3VtZW50c1tpbmRleCsrXSkpO1xuXHRcdFx0dmFyIGNiIDpUID0gYXJndW1lbnRzW2luZGV4KytdO1xuXHRcdFx0aWYgKCB0eXBlb2YgY2IhPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoKTsgfVxuXHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuXHRcdH1cblx0XHRsZW5ndGggPSB2YWxpZGF0b3JzLmxlbmd0aDtcblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gb3ZlcmxvYWRlZCAodGhpcyA6YW55KSA6UmV0dXJuVHlwZTxUPiB7XG5cdFx0aWYgKCB2YWxpZGF0b3IoYXJndW1lbnRzKSApIHsgcmV0dXJuIGFwcGx5KGNhbGxiYWNrLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoIHZhbGlkYXRvcnNbaW5kZXhdKGFyZ3VtZW50cykgKSB7IHJldHVybiBhcHBseShjYWxsYmFja3NbaW5kZXhdLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0fVxuXHRcdHRocm93IFR5cGVFcnJvcigpO1xuXHR9IGFzIFQ7XG59XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0Pz0nO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdChWYWxpZGF0b3IsIHtcblx0VmFsaWRhdG9yOiBWYWxpZGF0b3IsXG5cdGFuZDogYW5kLCBvcjogb3IsXG5cdGJpZ2ludDogYmlnaW50LCBzeW1ib2w6IHN5bWJvbCwgc3RyaW5nOiBzdHJpbmcsIGJvb2xlYW46IGJvb2xlYW4sIG51bWJlcjogbnVtYmVyLFxuXHR1bmRlZmluZWQ6IHVuZGVmaW5lZCwgTmFOOiBOYU4sIEluZmluaXR5OiBJbmZpbml0eSxcblx0ZXZlcnk6IGV2ZXJ5LFxuXHQndm9pZCc6IFZPSUQsIG9wdGlvbmFsOiBvcHRpb25hbCxcblx0YW55OiBhbnksIG5ldmVyOiBuZXZlcixcblx0b3ZlcmxvYWQ6IG92ZXJsb2FkLFxuXHR2ZXJzaW9uOiB2ZXJzaW9uXG59KTtcblxudHlwZSBWYWxpZGF0b3IgPSAodmFsdWUgOmFueSkgPT4gYm9vbGVhbjsiXSwibmFtZXMiOlsidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGVBQWUsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7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