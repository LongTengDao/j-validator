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

import isArray from '.Array.isArray?=';
import Object from '.Object';
import INFINITY from '.Infinity';
import create from '.Object.create?=';
import ownKeys from '.Reflect.ownKeys?=';
import apply from '.Reflect.apply?=';
import TypeError from '.TypeError';
import UNDEFINED from '.undefined';
import TEST from '.RegExp.prototype.test';
import Default from '.default?=';

var version = '4.0.0';

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

export default _export;
export { Infinity, NaN, and, any, bigint, BOOLEAN as boolean, every, is, never, not, number, optional, or, overload, strict, string, symbol, undefined$1 as undefined, version, VOID as void };

/*¡ j-validator */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnNC4wLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0IGZyb20gJy5PYmplY3QnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz89JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT89JztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgVU5ERUZJTkVEIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IFRFU1QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5cbnZhciBPYmplY3RfaXMgPSAoIE9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5pcztcbnZhciBfSU5GSU5JVFkgPSAtSU5GSU5JVFk7XG5cbnZhciBWT0lEID0geyAndm9pZCc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PVZPSUQ7IH0gfVsndm9pZCddO1xuZXhwb3J0IHsgVk9JRCBhcyB2b2lkIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBhbnkgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09Vk9JRDsgfVxuZXhwb3J0IGZ1bmN0aW9uIG5ldmVyICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiBmYWxzZTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gYmlnaW50ICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nYmlnaW50JzsgfVxudmFyIGJpZ2ludF8gPSB7ICchYmlnaW50JzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSE9PSdiaWdpbnQnOyB9IH1bJyFiaWdpbnQnXTtcbmV4cG9ydCBmdW5jdGlvbiBzeW1ib2wgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzeW1ib2wnOyB9XG52YXIgc3ltYm9sXyA9IHsgJyFzeW1ib2wnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J3N5bWJvbCc7IH0gfVsnIXN5bWJvbCddO1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J3N0cmluZyc7IH1cbnZhciBzdHJpbmdfID0geyAnIXN0cmluZyc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWUhPT0nc3RyaW5nJzsgfSB9Wychc3RyaW5nJ107XG52YXIgQk9PTEVBTiA9IHsgJ2Jvb2xlYW4nOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT10cnVlIHx8IHZhbHVlPT09ZmFsc2U7IH0gfVsnYm9vbGVhbiddO1xuZXhwb3J0IHsgQk9PTEVBTiBhcyBib29sZWFuIH07XG52YXIgYm9vbGVhbl8gPSB7ICchYm9vbGVhbic6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXRydWUgJiYgdmFsdWUhPT1mYWxzZTsgfSB9WychYm9vbGVhbiddO1xuZXhwb3J0IGZ1bmN0aW9uIG51bWJlciAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J251bWJlcic7IH1cbnZhciBudW1iZXJfID0geyAnIW51bWJlcic6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWUhPT0nbnVtYmVyJzsgfSB9WychbnVtYmVyJ107XG5leHBvcnQgZnVuY3Rpb24gdW5kZWZpbmVkICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PVVOREVGSU5FRDsgfVxudmFyIHVuZGVmaW5lZF8gPSB7ICchdW5kZWZpbmVkJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09VU5ERUZJTkVEOyB9IH1bJyF1bmRlZmluZWQnXTtcblxudmFyIE5VTEwgPSB7ICdudWxsJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09bnVsbDsgfSB9WydudWxsJ107XG52YXIgTlVMTF8gPSB7ICchbnVsbCc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PW51bGw7IH0gfVsnIW51bGwnXTtcbnZhciBUUlVFID0geyAndHJ1ZSc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PXRydWU7IH0gfVsndHJ1ZSddO1xudmFyIFRSVUVfID0geyAnIXRydWUnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT10cnVlOyB9IH1bJyF0cnVlJ107XG52YXIgRkFMU0UgPSB7ICdmYWxzZSc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PWZhbHNlOyB9IH1bJ2ZhbHNlJ107XG52YXIgRkFMU0VfID0geyAnIWZhbHNlJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09ZmFsc2U7IH0gfVsnIWZhbHNlJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmZpbml0eSAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1JTkZJTklUWTsgfVxuSW5maW5pdHkudmFsdWVPZiA9IGZ1bmN0aW9uICggICAgICAgICAgICAgICAgICAgICApICAgICAgICAgeyByZXR1cm4gSU5GSU5JVFk7IH07XG52YXIgSW5maW5pdHlfID0geyAnIUluZmluaXR5JzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09SU5GSU5JVFk7IH0gfVsnIUluZmluaXR5J107XG52YXIgX0luZmluaXR5ID0geyAnLUluZmluaXR5JzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09X0lORklOSVRZOyB9IH1bJy1JbmZpbml0eSddO1xudmFyIF9JbmZpbml0eV8gPSB7ICchLUluZmluaXR5JzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09X0lORklOSVRZOyB9IH1bJyEtSW5maW5pdHknXTtcblxuZXhwb3J0IGZ1bmN0aW9uIE5hTiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT12YWx1ZTsgfVxudmFyIE5hTl8gPSB7ICchTmFOJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09dmFsdWU7IH0gfVsnIU5hTiddO1xuXG52YXIgTyAgICAgICAgICAgID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gTyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gT2JqZWN0X2lzICh2YWx1ZSwgMCk7IH1cblx0OiBmdW5jdGlvbiBPICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PTAgJiYgMS92YWx1ZT4wOyB9O1xudmFyIE9fICAgICAgICAgICAgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBPXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gIU9iamVjdF9pcyAodmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gT18gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09MCB8fCAxL3ZhbHVlPDA7IH07XG52YXIgX08gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIF9PICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiBPYmplY3RfaXMgKHZhbHVlLCAtMCk7IH1cblx0OiBmdW5jdGlvbiBfTyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT0wICYmIDEvdmFsdWU8MDsgfTtcbnZhciBfT18gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIF9PXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gIU9iamVjdF9pcyAodmFsdWUsIC0wKTsgfVxuXHQ6IGZ1bmN0aW9uIF9PXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT0wIHx8IDEvdmFsdWU+MDsgfTtcblxuZnVuY3Rpb24gVGVzdCAodHlwZSAgICAgICAgLCBUUlVFICAgICAgICAgKSAgICAgICAgICAgICAgICAgICB7XG5cdHRyeSB7XG5cdFx0VEVTVC5jYWxsKHR5cGUsICcnKTtcblx0XHRyZXR1cm4gVFJVRVxuXHRcdFx0PyBmdW5jdGlvbiB0ZXN0ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRcdHJldHVybiBURVNULmNhbGwodHlwZSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdFx0OiBmdW5jdGlvbiB0ZXN0ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRcdHJldHVybiAhVEVTVC5jYWxsKHR5cGUsIHZhbHVlKTtcblx0XHRcdH07XG5cdH1cblx0Y2F0Y2ggKGVycm9yKSB7fVxufVxuXG5mdW5jdGlvbiBPYmplY3RWYWxpZGF0b3IgICAgICAgICAgICAgICAgICAgKHR5cGUgICAsIHN0cmljdCAgICAgICAgICwgRkFMU0UgICAgICAgICApICAgICAgICAgICAge1xuXHRpZiAoIHN0cmljdCAmJiBpc0FycmF5KHR5cGUpICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1ZhbGlkYXRvci5zdHJpY3QodHlwZSFvYmplY3QpJyk7IH1cblx0dmFyIGV4cGVjdEtleXMgPSBvd25LZXlzKHR5cGUpLnJldmVyc2UoKTtcblx0dmFyIGV4cGVjdExlbmd0aCAgICAgICAgID0gZXhwZWN0S2V5cy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzID0gY3JlYXRlKG51bGwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0dmFsaWRhdG9yc1trZXldID0gaXModHlwZVtrZXldKTtcblx0fVxuXHR2YXIgVFJVRSAgICAgICAgICA9ICFGQUxTRTtcblx0cmV0dXJuIHN0cmljdFxuXHRcdD8gZnVuY3Rpb24gb2JqZWN0ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZSE9PSdvYmplY3QnIHx8ICF2YWx1ZSB8fCBpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHR2YXIgaW5kZXggICAgICAgICA9IDA7XG5cdFx0XHRmb3IgKCB2YXIga2V5cyA9IG93bktleXModmFsdWUpLCBsZW5ndGggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGlmICggISgga2V5c1tpbmRleF0gaW4gdmFsaWRhdG9ycyApICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdH1cblx0XHRcdGZvciAoIGluZGV4ID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBleHBlY3RLZXlzWy0taW5kZXhdO1xuXHRcdFx0XHRpZiAoICF2YWxpZGF0b3JzW2tleV0oa2V5IGluIHZhbHVlID8gdmFsdWVba2V5XSA6IFZPSUQpICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBUUlVFO1xuXHRcdH1cblx0XHQ6IGZ1bmN0aW9uIG9iamVjdCAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWUhPT0nb2JqZWN0JyB8fCAhdmFsdWUgfHwgaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBleHBlY3RMZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0XHRcdGlmICggIXZhbGlkYXRvcnNba2V5XShrZXkgaW4gdmFsdWUgPyB2YWx1ZVtrZXldIDogVk9JRCkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFRSVUU7XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gQXJyYXlWYWxpZGF0b3IgKHR5cGUgICAgICAgLCBsaWtlICAgICAgICAgLCBGQUxTRSAgICAgICAgICkgICAgICAgICAgICB7XG5cdHZhciBsZW5ndGggICAgICAgICA9IHR5cGUubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyAgICAgICAgICAgICAgPSBbXTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IHZhbGlkYXRvcnMucHVzaChpcyh0eXBlW2luZGV4XSkpOyB9XG5cdHZhciBUUlVFICAgICAgICAgID0gIUZBTFNFO1xuXHRyZXR1cm4gbGlrZVxuXHRcdD8gZnVuY3Rpb24gYXJyYXlMaWtlICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRpZiAoIHZhbHVlLmxlbmd0aCE9PWxlbmd0aCApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdFx0aWYgKCAhdmFsaWRhdG9yc1tpbmRleF0odmFsdWVbaW5kZXhdKSApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gVFJVRTtcblx0XHR9XG5cdFx0OiBmdW5jdGlvbiBhcnJheSAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0aWYgKCAhaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0aWYgKCB2YWx1ZS5sZW5ndGghPT1sZW5ndGggKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFRSVUU7XG5cdFx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzICh0eXBlICAgICApICAgICAgICAgICAge1xuXHRyZXR1cm4gdHlwZW9mIHR5cGU9PT0nZnVuY3Rpb24nID8gdHlwZSA6XG5cdFx0dW5kZWZpbmVkKHR5cGUpID8gdW5kZWZpbmVkIDpcblx0XHRcdFRSVUUodHlwZSkgPyBUUlVFIDogRkFMU0UodHlwZSkgPyBGQUxTRSA6XG5cdFx0XHRcdE5VTEwodHlwZSkgPyBOVUxMIDpcblx0XHRcdFx0XHR0eXBlb2YgdHlwZT09PSdvYmplY3QnID8gLyojX19QVVJFX18qLyBUZXN0KHR5cGUsIHRydWUpIHx8IC8qI19fUFVSRV9fKi8gKCBpc0FycmF5KHR5cGUpID8gQXJyYXlWYWxpZGF0b3IgOiBPYmplY3RWYWxpZGF0b3IgKSh0eXBlLCBmYWxzZSwgZmFsc2UpIDpcblx0XHRcdFx0XHRcdE8odHlwZSkgPyBPIDogX08odHlwZSkgPyBfTyA6XG5cdFx0XHRcdFx0XHRcdHR5cGUhPT10eXBlID8gTmFOIDpcblx0XHRcdFx0XHRcdFx0XHR0eXBlPT09SU5GSU5JVFkgPyBJbmZpbml0eSA6IHR5cGU9PT1fSU5GSU5JVFkgPyBfSW5maW5pdHkgOlxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24gaXNUeXBlICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PXR5cGU7IH07XG59XG5leHBvcnQgZnVuY3Rpb24gbm90ICh0eXBlICAgICApICAgICAgICAgICAge1xuXHRpZiAoIHR5cGVvZiB0eXBlPT09J2Z1bmN0aW9uJyApIHtcblx0XHRzd2l0Y2ggKCB0eXBlICkge1xuXHRcdFx0Y2FzZSBiaWdpbnQ6XG5cdFx0XHRcdHJldHVybiBiaWdpbnRfO1xuXHRcdFx0Y2FzZSBzeW1ib2w6XG5cdFx0XHRcdHJldHVybiBzeW1ib2xfO1xuXHRcdFx0Y2FzZSBzdHJpbmc6XG5cdFx0XHRcdHJldHVybiBzdHJpbmdfO1xuXHRcdFx0Y2FzZSBCT09MRUFOOlxuXHRcdFx0XHRyZXR1cm4gYm9vbGVhbl87XG5cdFx0XHRjYXNlIG51bWJlcjpcblx0XHRcdFx0cmV0dXJuIG51bWJlcl87XG5cdFx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZF87XG5cdFx0XHRjYXNlIEluZmluaXR5OlxuXHRcdFx0XHRyZXR1cm4gSW5maW5pdHlfO1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gbm90VHlwZSAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gIXR5cGUodmFsdWUpOyB9O1xuXHR9XG5cdHJldHVybiB0eXBlPT09VU5ERUZJTkVEID8gdW5kZWZpbmVkXyA6XG5cdFx0dHlwZT09PXRydWUgPyBUUlVFXyA6IHR5cGU9PT1mYWxzZSA/IEZBTFNFXyA6XG5cdFx0XHR0eXBlPT09bnVsbCA/IE5VTExfIDpcblx0XHRcdFx0dHlwZW9mIHR5cGU9PT0nb2JqZWN0JyA/IC8qI19fUFVSRV9fKi8gVGVzdCh0eXBlLCBmYWxzZSkgfHwgLyojX19QVVJFX18qLyAoIGlzQXJyYXkodHlwZSkgPyBBcnJheVZhbGlkYXRvciA6IE9iamVjdFZhbGlkYXRvciApKHR5cGUsIGZhbHNlLCB0cnVlKSA6XG5cdFx0XHRcdFx0dHlwZT09PTAgPyBPXyh0eXBlKSA/IF9PXyA6IE9fIDpcblx0XHRcdFx0XHRcdHR5cGUhPT10eXBlID8gTmFOXyA6XG5cdFx0XHRcdFx0XHRcdHR5cGU9PT1JTkZJTklUWSA/IEluZmluaXR5XyA6IHR5cGU9PT1fSU5GSU5JVFkgPyBfSW5maW5pdHlfIDpcblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiBub3RUeXBlICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXR5cGU7IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpY3QgKHR5cGUgICAgICAgICkgICAgICAgICAgICB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovIE9iamVjdFZhbGlkYXRvcih0eXBlLCB0cnVlLCBmYWxzZSk7XG59XG5zdHJpY3Qubm90ID0gZnVuY3Rpb24gc3RyaWN0X25vdCAodHlwZSAgICAgICAgKSAgICAgICAgICAgIHtcblx0cmV0dXJuIC8qI19fUFVSRV9fKi8gT2JqZWN0VmFsaWRhdG9yKHR5cGUsIHRydWUsIHRydWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uYWwgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdHZhciB2YWxpZGF0b3IgICAgICAgICAgICA9IGlzKHR5cGUpO1xuXHRyZXR1cm4gZnVuY3Rpb24gb3B0aW9uYWxWYWxpZGF0b3IgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09Vk9JRCB8fCB2YWxpZGF0b3IodmFsdWUpOyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3IgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdHZhciB0eXBlcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGFyZ3VtZW50cy5sZW5ndGg9PT0xICYmIGlzQXJyYXkodHlwZSkgPyB0eXBlIDogYXJndW1lbnRzO1xuXHR2YXIgbGVuZ3RoICAgICAgICAgPSB0eXBlcy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzICAgICAgICAgICAgICA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKGlzKHR5cGVzW2luZGV4XSkpOyB9XG5cdHJldHVybiBmdW5jdGlvbiBvciAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZSkgKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhbmQgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdHZhciB0eXBlcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGFyZ3VtZW50cy5sZW5ndGg9PT0xICYmIGlzQXJyYXkodHlwZSkgPyB0eXBlIDogYXJndW1lbnRzO1xuXHR2YXIgbGVuZ3RoICAgICAgICAgPSB0eXBlcy5sZW5ndGg7XG5cdHZhciB2YWxpZGF0b3JzICAgICAgICAgICAgICA9IFtdO1xuXHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHsgdmFsaWRhdG9ycy5wdXNoKGlzKHR5cGVzW2luZGV4XSkpOyB9XG5cdHJldHVybiBmdW5jdGlvbiBhbmQgKHZhbHVlICAgICApICAgICAgICAgIHtcblx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXZlcnkgKHR5cGUgICAgICkgICAgICAgICAgICB7XG5cdHZhciB2YWxpZGF0b3IgICAgICAgICAgICA9IGlzKHR5cGUpO1xuXHRyZXR1cm4gZnVuY3Rpb24gYXJyYXkgKHZhbHVlICAgICApICAgICAgICAgIHtcblx0XHRpZiAoICFpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gdmFsdWUubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCAhdmFsaWRhdG9yKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxudmFyIGNvbW1hX3JlcGVhdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA9ICcnLnJlcGVhdFxuXHQ/IGZ1bmN0aW9uIGNvbW1hX3JlcGVhdCAoY291bnQgICAgICAgICkgICAgICAgICB7IHJldHVybiAnLCcucmVwZWF0KGNvdW50KTsgfVxuXHQ6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgY29tbWFzICAgICAgICAgICA9IFtdO1xuXHRcdHJldHVybiBmdW5jdGlvbiBjb21tYV9yZXBlYXQgKGNvdW50ICAgICAgICApICAgICAgICAge1xuXHRcdFx0Y29tbWFzLmxlbmd0aCA9IGNvdW50KzE7XG5cdFx0XHRyZXR1cm4gY29tbWFzLmpvaW4oJywnKTtcblx0XHR9O1xuXHR9KCk7XG5leHBvcnQgZnVuY3Rpb24gb3ZlcmxvYWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZXMgICAsIGNhbGxiYWNrICAgKSB7IHJldHVybiAvKiNfX1BVUkVfXyovIE92ZXJsb2FkZWQuYXBwbHkobnVsbCwgYXJndW1lbnRzICAgICAgICAgICAgICAgICAgICAgICApOyB9XG5mdW5jdGlvbiBPdmVybG9hZGVkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVzICAgICAgICAgICAgICAgICAsIGNhbGxiYWNrICAgKSB7XG5cdHZhciB2YWxpZGF0b3IgICAgICAgICAgICA9IGlzKHR5cGVzKTtcblx0aWYgKCB0eXBlb2YgY2FsbGJhY2shPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1ZhbGlkYXRvci5vdmVybG9hZCgsY2FsbGJhY2shZnVuY3Rpb24pJyk7IH1cblx0dmFyIHZhbGlkYXRvcnMgICAgICAgICAgICAgO1xuXHR2YXIgY2FsbGJhY2tzICAgICA7XG5cdHZhciBsZW5ndGggICAgICAgICA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdHZhciBmYWxsYmFjayAgIDtcblx0aWYgKCBsZW5ndGglMiApIHtcblx0XHRmYWxsYmFjayA9IGFyZ3VtZW50c1stLWxlbmd0aF07XG5cdFx0aWYgKCB0eXBlb2YgZmFsbGJhY2shPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1ZhbGlkYXRvci5vdmVybG9hZCgnK2NvbW1hX3JlcGVhdChsZW5ndGgpKydmYWxsYmFjayFmdW5jdGlvbiknKTsgfVxuXHR9XG5cdGlmICggbGVuZ3RoPDMgKSB7IGxlbmd0aCA9IDA7IH1cblx0ZWxzZSB7XG5cdFx0dmFsaWRhdG9ycyA9IFtdO1xuXHRcdGNhbGxiYWNrcyA9IFtdO1xuXHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMjsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0dmFsaWRhdG9ycy5wdXNoKEFycmF5VmFsaWRhdG9yKGFyZ3VtZW50c1tpbmRleF0sIHRydWUsIGZhbHNlKSk7XG5cdFx0XHR2YXIgY2IgICAgPSBhcmd1bWVudHNbKytpbmRleF07XG5cdFx0XHRpZiAoIHR5cGVvZiBjYiE9PSdmdW5jdGlvbicgKSB7IHRocm93IFR5cGVFcnJvcignVmFsaWRhdG9yLm92ZXJsb2FkKCcrY29tbWFfcmVwZWF0KGluZGV4KSsnY2FsbGJhY2shZnVuY3Rpb24pJyk7IH1cblx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcblx0XHR9XG5cdFx0bGVuZ3RoID0gdmFsaWRhdG9ycy5sZW5ndGg7XG5cdH1cblx0cmV0dXJuIGZ1bmN0aW9uIG92ZXJsb2FkZWQgKCAgICAgICAgICkge1xuXHRcdGlmICggdmFsaWRhdG9yKGFyZ3VtZW50cykgKSB7IHJldHVybiBhcHBseShjYWxsYmFjaywgdGhpcywgYXJndW1lbnRzKTsgfVxuXHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XShhcmd1bWVudHMpICkgeyByZXR1cm4gYXBwbHkoY2FsbGJhY2tzW2luZGV4XSwgdGhpcywgYXJndW1lbnRzKTsgfVxuXHRcdH1cblx0XHRpZiAoIGZhbGxiYWNrICkgeyByZXR1cm4gYXBwbHkoZmFsbGJhY2ssIHRoaXMsIGFyZ3VtZW50cyk7IH1cblx0XHR0aHJvdyBUeXBlRXJyb3IoKTtcblx0fTtcbn1cblxuaW1wb3J0IERlZmF1bHQgZnJvbSAnLmRlZmF1bHQ/PSc7XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0KHtcblx0aXM6IGlzLCBub3Q6IG5vdCxcblx0YW5kOiBhbmQsIG9yOiBvcixcblx0YmlnaW50OiBiaWdpbnQsIHN5bWJvbDogc3ltYm9sLCBzdHJpbmc6IHN0cmluZywgJ2Jvb2xlYW4nOiBCT09MRUFOLCBudW1iZXI6IG51bWJlcixcblx0dW5kZWZpbmVkOiB1bmRlZmluZWQsIE5hTjogTmFOLCBJbmZpbml0eTogSW5maW5pdHksXG5cdGV2ZXJ5OiBldmVyeSxcblx0J3ZvaWQnOiBWT0lELCBvcHRpb25hbDogb3B0aW9uYWwsIHN0cmljdDogc3RyaWN0LFxuXHRhbnk6IGFueSwgbmV2ZXI6IG5ldmVyLFxuXHRvdmVybG9hZDogb3ZlcmxvYWQsXG5cdHZlcnNpb246IHZlcnNpb25cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICJdLCJuYW1lcyI6WyJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxjQUFlLE9BQU87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