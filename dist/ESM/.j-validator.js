﻿/*!
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：1.1.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-validator/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-validator/
 */

import isArray from '.Array.isArray?=';
import Object_is from '.Object.is';
import INFINITY from '.Infinity';
import getOwnPropertySymbols from '.Object.getOwnPropertySymbols';
import create from '.Object.create?=';
import hasOwnProperty from '.Object.prototype.hasOwnProperty';
import apply from '.Reflect.apply?=';
import TypeError from '.TypeError';
import UNDEFINED from '.undefined';
import Default from '.default?=';

var version = '1.1.0';

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

export default _export;
export { Infinity, NaN, Validator, and, any, bigint, boolean, every, never, number, optional, or, overload, string, symbol, undefined$1 as undefined, version, VOID as void };

/*¡ j-validator */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMS4xLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgZ2V0T3duUHJvcGVydHlTeW1ib2xzIGZyb20gJy5PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLk9iamVjdC5jcmVhdGU/PSc7XG5pbXBvcnQgaGFzT3duUHJvcGVydHkgZnJvbSAnLk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHknO1xuaW1wb3J0IGFwcGx5IGZyb20gJy5SZWZsZWN0LmFwcGx5Pz0nO1xuaW1wb3J0IFR5cGVFcnJvciBmcm9tICcuVHlwZUVycm9yJztcbmltcG9ydCBVTkRFRklORUQgZnJvbSAnLnVuZGVmaW5lZCc7XG5cbmZ1bmN0aW9uIFZPSUQgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09Vk9JRDsgfVxuZXhwb3J0IHsgVk9JRCBhcyB2b2lkIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBhbnkgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlIT09Vk9JRDsgfVxuZXhwb3J0IGZ1bmN0aW9uIG5ldmVyICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gYmlnaW50ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nYmlnaW50JzsgfVxuZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbCAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J3N5bWJvbCc7IH1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmcgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnOyB9XG5leHBvcnQgZnVuY3Rpb24gYm9vbGVhbiAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J2Jvb2xlYW4nOyB9XG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nbnVtYmVyJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIHVuZGVmaW5lZCAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT1VTkRFRklORUQ7IH1cblxuZnVuY3Rpb24gTlVMTCAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT1udWxsOyB9XG5mdW5jdGlvbiBUUlVFICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PXRydWU7IH1cbmZ1bmN0aW9uIEZBTFNFICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PWZhbHNlOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBOYU4gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlIT09dmFsdWU7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIEluZmluaXR5ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PUlORklOSVRZOyB9XG5JbmZpbml0eS52YWx1ZU9mID0gZnVuY3Rpb24gKHRoaXMgOnR5cGVvZiBJbmZpbml0eSkgOm51bWJlciB7IHJldHVybiBJTkZJTklUWTsgfTtcbmZ1bmN0aW9uIF9JbmZpbml0eSAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT0gLUlORklOSVRZOyB9XG5cbnZhciBPIDpWYWxpZGF0b3IgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBPICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiBPYmplY3RfaXModmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gTyAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT0wICYmIDEvdmFsdWU+MDsgfTtcbnZhciBfTyA6VmFsaWRhdG9yID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gX08gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIE9iamVjdF9pcyh2YWx1ZSwgLTApOyB9XG5cdDogZnVuY3Rpb24gX08gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09MCAmJiAxL3ZhbHVlPDA7IH07XG5cbnZhciBFTVBUWSA6YW55ID0gW107XG5mdW5jdGlvbiBPYmplY3RWYWxpZGF0b3I8VCBleHRlbmRzIG9iamVjdD4gKHR5cGUgOlQpIDpWYWxpZGF0b3Ige1xuXHR2YXIgc3ltYm9sS2V5cyA9IGdldE93blByb3BlcnR5U3ltYm9scyA/IGdldE93blByb3BlcnR5U3ltYm9scyh0eXBlKS5yZXZlcnNlKCkgOiBFTVBUWSBhcyAoIHN5bWJvbCAmIGtleW9mIFQgKVtdO1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSBzeW1ib2xLZXlzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOnsgW2tleSBpbiBrZXlvZiBUXSA6VmFsaWRhdG9yIH0gPSBjcmVhdGUobnVsbCk7XG5cdGZvciAoIHZhciBzdHJpbmdLZXkgaW4gdHlwZSApIHtcblx0XHRpZiAoIGhhc093blByb3BlcnR5LmNhbGwodHlwZSwgc3RyaW5nS2V5KSApIHsgdmFsaWRhdG9yc1tzdHJpbmdLZXldID0gVmFsaWRhdG9yKHR5cGVbc3RyaW5nS2V5XSk7IH1cblx0fVxuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdHZhciBzeW1ib2xLZXkgPSBzeW1ib2xLZXlzWy0taW5kZXhdO1xuXHRcdHZhbGlkYXRvcnNbc3ltYm9sS2V5XSA9IFZhbGlkYXRvcih0eXBlW3N5bWJvbEtleV0pO1xuXHR9XG5cdHJldHVybiBmdW5jdGlvbiBvYmplY3QgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSE9PSdvYmplY3QnIHx8ICF2YWx1ZSB8fCBpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICggdmFyIHN0cmluZ0tleSBpbiB2YWxpZGF0b3JzICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yc1tzdHJpbmdLZXldKHN0cmluZ0tleSBpbiB2YWx1ZSA/IHZhbHVlW3N0cmluZ0tleV0gOiBWT0lEKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gbGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHR2YXIgc3ltYm9sS2V5ID0gc3ltYm9sS2V5c1stLWluZGV4XTtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbc3ltYm9sS2V5XShzeW1ib2xLZXkgaW4gdmFsdWUgPyB2YWx1ZVtzeW1ib2xLZXldIDogVk9JRCkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuZnVuY3Rpb24gQXJyYXlWYWxpZGF0b3IgKHR5cGUgOmFueVtdKSA6VmFsaWRhdG9yIHtcblx0dmFyIGxlbmd0aCA6bnVtYmVyID0gdHlwZS5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXSA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGxlbmd0aDsgaW5kZXg7ICkgeyB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9yKHR5cGVbLS1pbmRleF0pKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gYXJyYXkgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRpZiAoICFpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0aWYgKCB2YWx1ZS5sZW5ndGghPT1sZW5ndGggKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gbGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRpZiAoICF2YWxpZGF0b3JzWy0taW5kZXhdKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuZnVuY3Rpb24gQXJndW1lbnRzVmFsaWRhdG9yICh0eXBlIDphbnlbXSkgOlZhbGlkYXRvciB7XG5cdHZhciBsZW5ndGggOm51bWJlciA9IHR5cGUubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyA6VmFsaWRhdG9yW10gPSBbXTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBsZW5ndGg7IGluZGV4OyApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlWy0taW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIEFSR1VNRU5UUyAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGlmICggdmFsdWUubGVuZ3RoIT09bGVuZ3RoICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yc1stLWluZGV4XSh2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBWYWxpZGF0b3IgKHR5cGUgOmFueSkgOlZhbGlkYXRvciB7XG5cdHJldHVybiB0eXBlb2YgdHlwZT09PSdmdW5jdGlvbicgPyB0eXBlIDpcblx0XHR1bmRlZmluZWQodHlwZSkgPyB1bmRlZmluZWQgOlxuXHRcdFx0VFJVRSh0eXBlKSA/IFRSVUUgOiBGQUxTRSh0eXBlKSA/IEZBTFNFIDpcblx0XHRcdFx0TlVMTCh0eXBlKSA/IE5VTEwgOlxuXHRcdFx0XHRcdHR5cGVvZiB0eXBlPT09J29iamVjdCcgPyAvKiNfX1BVUkVfXyovICggaXNBcnJheSh0eXBlKSA/IEFycmF5VmFsaWRhdG9yIDogT2JqZWN0VmFsaWRhdG9yICkodHlwZSkgOlxuXHRcdFx0XHRcdFx0Tyh0eXBlKSA/IE8gOiBfTyh0eXBlKSA/IF9PIDpcblx0XHRcdFx0XHRcdFx0TmFOKHR5cGUpID8gTmFOIDpcblx0XHRcdFx0XHRcdFx0XHQvKiNfX1BVUkVfXyovIEluZmluaXR5KHR5cGUpID8gSW5maW5pdHkgOiBfSW5maW5pdHkodHlwZSkgPyBfSW5maW5pdHkgOlxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIHZhbGlkYXRvciAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT10eXBlOyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uYWwgKHR5cGUgOmFueSkgOlZhbGlkYXRvciB7XG5cdHZhciB2YWxpZGF0b3IgOlZhbGlkYXRvciA9IFZhbGlkYXRvcih0eXBlKTtcblx0cmV0dXJuIGZ1bmN0aW9uIG9wdGlvbmFsVmFsaWRhdG9yICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PVZPSUQgfHwgdmFsaWRhdG9yKHZhbHVlKTsgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuZCAoKSA6VmFsaWRhdG9yIHtcblx0dmFyIHR5cGVzID0gYXJndW1lbnRzLmxlbmd0aD09PTEgJiYgaXNBcnJheShhcmd1bWVudHNbMF0pID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSB0eXBlcy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXSA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlc1tpbmRleF0pKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gb3IgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9yICgpIDpWYWxpZGF0b3Ige1xuXHR2YXIgdHlwZXMgPSBhcmd1bWVudHMubGVuZ3RoPT09MSAmJiBpc0FycmF5KGFyZ3VtZW50c1swXSkgPyBhcmd1bWVudHNbMF0gOiBhcmd1bWVudHM7XG5cdHZhciBsZW5ndGggOm51bWJlciA9IHR5cGVzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOlZhbGlkYXRvcltdID0gW107XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9yKHR5cGVzW2luZGV4XSkpOyB9XG5cdHJldHVybiBmdW5jdGlvbiBvciAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZSkgKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZXJ5ICh0eXBlIDphbnkpIDpWYWxpZGF0b3Ige1xuXHR2YXIgdmFsaWRhdG9yIDpWYWxpZGF0b3IgPSBWYWxpZGF0b3IodHlwZSk7XG5cdHJldHVybiBmdW5jdGlvbiBhcnJheSAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGlmICggIWlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSB2YWx1ZS5sZW5ndGgsIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoICF2YWxpZGF0b3IodmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3ZlcmxvYWQ8VCBleHRlbmRzICguLi5hcmdzIDphbnlbXSkgPT4gYW55PiAodHlwZXMgOmFueVtdLCBjYWxsYmFjayA6VCkgOlQgeyByZXR1cm4gLyojX19QVVJFX18qLyBPdmVybG9hZGVkLmFwcGx5KG51bGwsIGFyZ3VtZW50cyBhcyBhbnkpIGFzIFQ7IH1cbmZ1bmN0aW9uIE92ZXJsb2FkZWQ8VCBleHRlbmRzICguLi5hcmdzIDphbnlbXSkgPT4gYW55PiAodHlwZXMgOmFueVtdLCBjYWxsYmFjayA6VCkgOlQge1xuXHR2YXIgdmFsaWRhdG9yIDpWYWxpZGF0b3IgPSBWYWxpZGF0b3IodHlwZXMpO1xuXHRpZiAoIHR5cGVvZiBjYWxsYmFjayE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcigpOyB9XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXTtcblx0dmFyIGNhbGxiYWNrcyA6VFtdO1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRpZiAoIGxlbmd0aDwzICkgeyBsZW5ndGggPSAwOyB9XG5cdGVsc2Uge1xuXHRcdHZhbGlkYXRvcnMgPSBbXTtcblx0XHRjYWxsYmFja3MgPSBbXTtcblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDI7IGluZGV4PGxlbmd0aDsgKSB7XG5cdFx0XHR2YWxpZGF0b3JzLnB1c2goQXJndW1lbnRzVmFsaWRhdG9yKGFyZ3VtZW50c1tpbmRleCsrXSkpO1xuXHRcdFx0dmFyIGNiIDpUID0gYXJndW1lbnRzW2luZGV4KytdO1xuXHRcdFx0aWYgKCB0eXBlb2YgY2IhPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoKTsgfVxuXHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuXHRcdH1cblx0XHRsZW5ndGggPSB2YWxpZGF0b3JzLmxlbmd0aDtcblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gb3ZlcmxvYWRlZCAodGhpcyA6YW55KSA6UmV0dXJuVHlwZTxUPiB7XG5cdFx0aWYgKCB2YWxpZGF0b3IoYXJndW1lbnRzKSApIHsgcmV0dXJuIGFwcGx5KGNhbGxiYWNrLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoIHZhbGlkYXRvcnNbaW5kZXhdKGFyZ3VtZW50cykgKSB7IHJldHVybiBhcHBseShjYWxsYmFja3NbaW5kZXhdLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0fVxuXHRcdHRocm93IFR5cGVFcnJvcigpO1xuXHR9IGFzIFQ7XG59XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0Pz0nO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdChWYWxpZGF0b3IsIHtcblx0VmFsaWRhdG9yOiBWYWxpZGF0b3IsXG5cdGFuZDogYW5kLCBvcjogb3IsXG5cdGJpZ2ludDogYmlnaW50LCBzeW1ib2w6IHN5bWJvbCwgc3RyaW5nOiBzdHJpbmcsIGJvb2xlYW46IGJvb2xlYW4sIG51bWJlcjogbnVtYmVyLFxuXHR1bmRlZmluZWQ6IHVuZGVmaW5lZCwgTmFOOiBOYU4sIEluZmluaXR5OiBJbmZpbml0eSxcblx0ZXZlcnk6IGV2ZXJ5LFxuXHQndm9pZCc6IFZPSUQsIG9wdGlvbmFsOiBvcHRpb25hbCxcblx0YW55OiBhbnksIG5ldmVyOiBuZXZlcixcblx0b3ZlcmxvYWQ6IG92ZXJsb2FkLFxuXHR2ZXJzaW9uOiB2ZXJzaW9uXG59KTtcblxudHlwZSBWYWxpZGF0b3IgPSAodmFsdWUgOmFueSkgPT4gYm9vbGVhbjsiXSwibmFtZXMiOlsidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBZSxPQUFPOztzQkFBQyx0QkNh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LEdBQUcsQ0FBQyxDQUFDO0tBQUU7U0FDMUI7UUFDSixVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixLQUFNLElBQUksS0FBSyxHQUFXLENBQUMsRUFBRSxLQUFLLEdBQUMsTUFBTSxHQUFJO1lBQzVDLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksRUFBRSxHQUFNLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLElBQUssT0FBTyxFQUFFLEtBQUcsVUFBVSxFQUFHO2dCQUFFLE1BQU0sU0FBUyxFQUFFLENBQUM7YUFBRTtZQUNwRCxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25CO1FBQ0QsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7S0FDM0I7SUFDRCxPQUFPLFNBQVMsVUFBVTtRQUN6QixJQUFLLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRztZQUFFLE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FBRTtRQUN4RSxLQUFNLElBQUksS0FBSyxHQUFXLENBQUMsRUFBRSxLQUFLLEdBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFHO1lBQ3BELElBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFHO2dCQUFFLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFBRTtTQUN4RjtRQUNELE1BQU0sU0FBUyxFQUFFLENBQUM7S0FDYixDQUFDO0NBQ1A7QUFFRCxBQUNBLGNBQWUsT0FBTyxDQUFDLFNBQVMsRUFBRTtJQUNqQyxTQUFTLEVBQUUsU0FBUztJQUNwQixHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQ2hCLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU07SUFDaEYsU0FBUyxFQUFFQSxXQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUTtJQUNsRCxLQUFLLEVBQUUsS0FBSztJQUNaLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVE7SUFDaEMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSztJQUN0QixRQUFRLEVBQUUsUUFBUTtJQUNsQixPQUFPLEVBQUUsT0FBTztDQUNoQixDQUFDLENBQUM7Ozs7Ozs7OzsiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyJ9