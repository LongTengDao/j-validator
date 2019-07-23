﻿/*!
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：1.1.1
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-validator/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-validator/
 */

import isArray from '.Array.isArray?=';
import Object_is from '.Object.is';
import INFINITY from '.Infinity';
import create from '.Object.create?=';
import ownKeys from '.Reflect.ownKeys?=';
import apply from '.Reflect.apply?=';
import TypeError from '.TypeError';
import UNDEFINED from '.undefined';
import Default from '.default?=';

var version = '1.1.1';

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnMS4xLjEnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0X2lzIGZyb20gJy5PYmplY3QuaXMnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz89JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT89JztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgVU5ERUZJTkVEIGZyb20gJy51bmRlZmluZWQnO1xuXG5mdW5jdGlvbiBWT0lEICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PVZPSUQ7IH1cbmV4cG9ydCB7IFZPSUQgYXMgdm9pZCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gYW55ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZSE9PVZPSUQ7IH1cbmV4cG9ydCBmdW5jdGlvbiBuZXZlciAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpZ2ludCAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J2JpZ2ludCc7IH1cbmV4cG9ydCBmdW5jdGlvbiBzeW1ib2wgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzeW1ib2wnOyB9XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIGJvb2xlYW4gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdib29sZWFuJzsgfVxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlciAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J251bWJlcic7IH1cbmV4cG9ydCBmdW5jdGlvbiB1bmRlZmluZWQgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09VU5ERUZJTkVEOyB9XG5cbmZ1bmN0aW9uIE5VTEwgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09bnVsbDsgfVxuZnVuY3Rpb24gVFJVRSAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT10cnVlOyB9XG5mdW5jdGlvbiBGQUxTRSAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT1mYWxzZTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gTmFOICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZSE9PXZhbHVlOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmZpbml0eSAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT1JTkZJTklUWTsgfVxuSW5maW5pdHkudmFsdWVPZiA9IGZ1bmN0aW9uICh0aGlzIDp0eXBlb2YgSW5maW5pdHkpIDpudW1iZXIgeyByZXR1cm4gSU5GSU5JVFk7IH07XG5mdW5jdGlvbiBfSW5maW5pdHkgKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09IC1JTkZJTklUWTsgfVxuXG52YXIgTyA6VmFsaWRhdG9yID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gTyAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gT2JqZWN0X2lzKHZhbHVlLCAwKTsgfVxuXHQ6IGZ1bmN0aW9uIE8gKHZhbHVlIDphbnkpIDpib29sZWFuIHsgcmV0dXJuIHZhbHVlPT09MCAmJiAxL3ZhbHVlPjA7IH07XG52YXIgX08gOlZhbGlkYXRvciA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIF9PICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiBPYmplY3RfaXModmFsdWUsIC0wKTsgfVxuXHQ6IGZ1bmN0aW9uIF9PICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PTAgJiYgMS92YWx1ZTwwOyB9O1xuXG5mdW5jdGlvbiBPYmplY3RWYWxpZGF0b3I8VCBleHRlbmRzIG9iamVjdD4gKHR5cGUgOlQpIDpWYWxpZGF0b3Ige1xuXHR2YXIgZXhwZWN0S2V5cyA9IG93bktleXModHlwZSkucmV2ZXJzZSgpO1xuXHR2YXIgZXhwZWN0TGVuZ3RoIDpudW1iZXIgPSBleHBlY3RLZXlzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOnsgW2tleSBpbiBrZXlvZiBUXSA6VmFsaWRhdG9yIH0gPSBjcmVhdGUobnVsbCk7XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0dmFsaWRhdG9yc1trZXldID0gVmFsaWRhdG9yKHR5cGVba2V5XSk7XG5cdH1cblx0cmV0dXJuIGZ1bmN0aW9uIG9iamVjdCAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGlmICggLyp0eXBlb2YgdmFsdWUhPT0nb2JqZWN0JyB8fCAhdmFsdWUgfHwgKi9pc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0dmFyIGluZGV4IDpudW1iZXIgPSAwO1xuXHRcdGZvciAoIHZhciBrZXlzID0gb3duS2V5cyh2YWx1ZSksIGxlbmd0aCA6bnVtYmVyID0ga2V5cy5sZW5ndGg7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggISgga2V5c1tpbmRleF0gaW4gdmFsaWRhdG9ycyApICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0Zm9yICggaW5kZXggPSBleHBlY3RMZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdHZhciBrZXkgPSBleHBlY3RLZXlzWy0taW5kZXhdO1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yc1trZXldKGtleSBpbiB2YWx1ZSA/IHZhbHVlW2tleV0gOiBWT0lEKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG5mdW5jdGlvbiBBcnJheVZhbGlkYXRvciAodHlwZSA6YW55W10pIDpWYWxpZGF0b3Ige1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSB0eXBlLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOlZhbGlkYXRvcltdID0gW107XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9yKHR5cGVbaW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIGFycmF5ICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7XG5cdFx0aWYgKCAhaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGlmICggdmFsdWUubGVuZ3RoIT09bGVuZ3RoICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuZnVuY3Rpb24gQXJndW1lbnRzVmFsaWRhdG9yICh0eXBlIDphbnlbXSkgOlZhbGlkYXRvciB7XG5cdHZhciBsZW5ndGggOm51bWJlciA9IHR5cGUubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyA6VmFsaWRhdG9yW10gPSBbXTtcblx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSBsZW5ndGg7IGluZGV4OyApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlWy0taW5kZXhdKSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIEFSR1VNRU5UUyAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGlmICggdmFsdWUubGVuZ3RoIT09bGVuZ3RoICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IGxlbmd0aDsgaW5kZXg7ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yc1stLWluZGV4XSh2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBWYWxpZGF0b3IgKHR5cGUgOmFueSkgOlZhbGlkYXRvciB7XG5cdHJldHVybiB0eXBlb2YgdHlwZT09PSdmdW5jdGlvbicgPyB0eXBlIDpcblx0XHR1bmRlZmluZWQodHlwZSkgPyB1bmRlZmluZWQgOlxuXHRcdFx0VFJVRSh0eXBlKSA/IFRSVUUgOiBGQUxTRSh0eXBlKSA/IEZBTFNFIDpcblx0XHRcdFx0TlVMTCh0eXBlKSA/IE5VTEwgOlxuXHRcdFx0XHRcdHR5cGVvZiB0eXBlPT09J29iamVjdCcgPyAvKiNfX1BVUkVfXyovICggaXNBcnJheSh0eXBlKSA/IEFycmF5VmFsaWRhdG9yIDogT2JqZWN0VmFsaWRhdG9yICkodHlwZSkgOlxuXHRcdFx0XHRcdFx0Tyh0eXBlKSA/IE8gOiBfTyh0eXBlKSA/IF9PIDpcblx0XHRcdFx0XHRcdFx0TmFOKHR5cGUpID8gTmFOIDpcblx0XHRcdFx0XHRcdFx0XHQvKiNfX1BVUkVfXyovIEluZmluaXR5KHR5cGUpID8gSW5maW5pdHkgOiBfSW5maW5pdHkodHlwZSkgPyBfSW5maW5pdHkgOlxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIHZhbGlkYXRvciAodmFsdWUgOmFueSkgOmJvb2xlYW4geyByZXR1cm4gdmFsdWU9PT10eXBlOyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uYWwgKHR5cGUgOmFueSkgOlZhbGlkYXRvciB7XG5cdHZhciB2YWxpZGF0b3IgOlZhbGlkYXRvciA9IFZhbGlkYXRvcih0eXBlKTtcblx0cmV0dXJuIGZ1bmN0aW9uIG9wdGlvbmFsVmFsaWRhdG9yICh2YWx1ZSA6YW55KSA6Ym9vbGVhbiB7IHJldHVybiB2YWx1ZT09PVZPSUQgfHwgdmFsaWRhdG9yKHZhbHVlKTsgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuZCAoKSA6VmFsaWRhdG9yIHtcblx0dmFyIHR5cGVzID0gYXJndW1lbnRzLmxlbmd0aD09PTEgJiYgaXNBcnJheShhcmd1bWVudHNbMF0pID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSB0eXBlcy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXSA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcih0eXBlc1tpbmRleF0pKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gb3IgKHZhbHVlIDphbnkpIDpib29sZWFuIHtcblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9yICgpIDpWYWxpZGF0b3Ige1xuXHR2YXIgdHlwZXMgPSBhcmd1bWVudHMubGVuZ3RoPT09MSAmJiBpc0FycmF5KGFyZ3VtZW50c1swXSkgPyBhcmd1bWVudHNbMF0gOiBhcmd1bWVudHM7XG5cdHZhciBsZW5ndGggOm51bWJlciA9IHR5cGVzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgOlZhbGlkYXRvcltdID0gW107XG5cdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9yKHR5cGVzW2luZGV4XSkpOyB9XG5cdHJldHVybiBmdW5jdGlvbiBvciAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGZvciAoIHZhciBpbmRleCA6bnVtYmVyID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZSkgKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZXJ5ICh0eXBlIDphbnkpIDpWYWxpZGF0b3Ige1xuXHR2YXIgdmFsaWRhdG9yIDpWYWxpZGF0b3IgPSBWYWxpZGF0b3IodHlwZSk7XG5cdHJldHVybiBmdW5jdGlvbiBhcnJheSAodmFsdWUgOmFueSkgOmJvb2xlYW4ge1xuXHRcdGlmICggIWlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKCB2YXIgbGVuZ3RoIDpudW1iZXIgPSB2YWx1ZS5sZW5ndGgsIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoICF2YWxpZGF0b3IodmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3ZlcmxvYWQ8VCBleHRlbmRzICguLi5hcmdzIDphbnlbXSkgPT4gYW55PiAodHlwZXMgOmFueVtdLCBjYWxsYmFjayA6VCkgOlQgeyByZXR1cm4gLyojX19QVVJFX18qLyBPdmVybG9hZGVkLmFwcGx5KG51bGwsIGFyZ3VtZW50cyBhcyBhbnkpIGFzIFQ7IH1cbmZ1bmN0aW9uIE92ZXJsb2FkZWQ8VCBleHRlbmRzICguLi5hcmdzIDphbnlbXSkgPT4gYW55PiAodHlwZXMgOmFueVtdLCBjYWxsYmFjayA6VCkgOlQge1xuXHR2YXIgdmFsaWRhdG9yIDpWYWxpZGF0b3IgPSBWYWxpZGF0b3IodHlwZXMpO1xuXHRpZiAoIHR5cGVvZiBjYWxsYmFjayE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcigpOyB9XG5cdHZhciB2YWxpZGF0b3JzIDpWYWxpZGF0b3JbXTtcblx0dmFyIGNhbGxiYWNrcyA6VFtdO1xuXHR2YXIgbGVuZ3RoIDpudW1iZXIgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRpZiAoIGxlbmd0aDwzICkgeyBsZW5ndGggPSAwOyB9XG5cdGVsc2Uge1xuXHRcdHZhbGlkYXRvcnMgPSBbXTtcblx0XHRjYWxsYmFja3MgPSBbXTtcblx0XHRmb3IgKCB2YXIgaW5kZXggOm51bWJlciA9IDI7IGluZGV4PGxlbmd0aDsgKSB7XG5cdFx0XHR2YWxpZGF0b3JzLnB1c2goQXJndW1lbnRzVmFsaWRhdG9yKGFyZ3VtZW50c1tpbmRleCsrXSkpO1xuXHRcdFx0dmFyIGNiIDpUID0gYXJndW1lbnRzW2luZGV4KytdO1xuXHRcdFx0aWYgKCB0eXBlb2YgY2IhPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoKTsgfVxuXHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuXHRcdH1cblx0XHRsZW5ndGggPSB2YWxpZGF0b3JzLmxlbmd0aDtcblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24gb3ZlcmxvYWRlZCAodGhpcyA6YW55KSA6UmV0dXJuVHlwZTxUPiB7XG5cdFx0aWYgKCB2YWxpZGF0b3IoYXJndW1lbnRzKSApIHsgcmV0dXJuIGFwcGx5KGNhbGxiYWNrLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0Zm9yICggdmFyIGluZGV4IDpudW1iZXIgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoIHZhbGlkYXRvcnNbaW5kZXhdKGFyZ3VtZW50cykgKSB7IHJldHVybiBhcHBseShjYWxsYmFja3NbaW5kZXhdLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0fVxuXHRcdHRocm93IFR5cGVFcnJvcigpO1xuXHR9IGFzIFQ7XG59XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0Pz0nO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdChWYWxpZGF0b3IsIHtcblx0VmFsaWRhdG9yOiBWYWxpZGF0b3IsXG5cdGFuZDogYW5kLCBvcjogb3IsXG5cdGJpZ2ludDogYmlnaW50LCBzeW1ib2w6IHN5bWJvbCwgc3RyaW5nOiBzdHJpbmcsIGJvb2xlYW46IGJvb2xlYW4sIG51bWJlcjogbnVtYmVyLFxuXHR1bmRlZmluZWQ6IHVuZGVmaW5lZCwgTmFOOiBOYU4sIEluZmluaXR5OiBJbmZpbml0eSxcblx0ZXZlcnk6IGV2ZXJ5LFxuXHQndm9pZCc6IFZPSUQsIG9wdGlvbmFsOiBvcHRpb25hbCxcblx0YW55OiBhbnksIG5ldmVyOiBuZXZlcixcblx0b3ZlcmxvYWQ6IG92ZXJsb2FkLFxuXHR2ZXJzaW9uOiB2ZXJzaW9uXG59KTtcblxudHlwZSBWYWxpZGF0b3IgPSAodmFsdWUgOmFueSkgPT4gYm9vbGVhbjsiXSwibmFtZXMiOlsidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxjQUFlLE9BQU87O3NCQUFDLHRCQ1l2QixTQUFTLElBQUksQ0FBRSxLQUFVLElBQWEsT0FBTyxLQUFLLEtBQUcsSUFBSSxDQUFDLEVBQUU7QUFDNUQsU0FFZ0IsR0FBRyxDQUFFLEtBQVUsSUFBYSxPQUFPLEtBQUssS0FBRyxJQUFJLENBQUMsRUFBRTtBQUNsRSxTQUFnQixLQUFLLENBQUUsS0FBVSxJQUFhLE9BQU8sS0FBSyxDQUFDLEVBQUU7QUFFN0QsU0FBZ0IsTUFBTSxDQUFFLEtBQVUsSUFBYSxPQUFPLE9BQU8sS0FBSyxLQUFHLFFBQVEsQ0FBQyxFQUFFO0FBQ2hGLFNBQWdCLE1BQU0sQ0FBRSxLQUFVLElBQWEsT0FBTyxPQUFPLEtBQUssS0FBRyxRQUFRLENBQUMsRUFB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