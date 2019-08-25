/*!
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：4.2.0
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
import Null_prototype from '.null.prototype';
import Default from '.default?=';

var version = '4.2.0';

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

function Test (type        , strict         , TRUE         )                   {
	try {
		TEST.call(type, '');
		return strict
			? TRUE
				? function test (value     )          {
					return typeof value==='string' && TEST.call(type, value);
				}
				: function test (value     )          {
					return typeof value!=='string' || !TEST.call(type, value);
				}
			: TRUE
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
	var validators = create(Null_prototype)                                   ;
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

function ArrayValidator (type                 , like         , FALSE         )            {
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
					typeof type==='object' ? /*#__PURE__*/ isArray(type) ? ArrayValidator(type, false, false) : /*#__PURE__*/ Test(type, false, true) || ObjectValidator(type, false, false) :
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
				typeof type==='object' ? isArray(type) ? /*#__PURE__*/ ArrayValidator(type, false, true) : /*#__PURE__*/ Test(type, false, false) || /*#__PURE__*/ ObjectValidator(type, false, true) :
					type===0 ? O_(type) ? _O_ : O_ :
						type!==type ? NaN_ :
							type===INFINITY ? Infinity_ : type===_INFINITY ? _Infinity_ :
								function notType (value     )          { return value!==type; };
}

function strict (type        )            {
	return /*#__PURE__*/ Test(type, true, true) || /*#__PURE__*/ ObjectValidator(type, true, false);
}
strict.not = function strict_not (type        )            {
	return /*#__PURE__*/ Test(type, true, false) || /*#__PURE__*/ ObjectValidator(type, true, true);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAnNC4yLjAnOyIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdmVyc2lvbj90ZXh0JztcbmV4cG9ydCB7IHZlcnNpb24gfTtcblxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLkFycmF5LmlzQXJyYXk/PSc7XG5pbXBvcnQgT2JqZWN0IGZyb20gJy5PYmplY3QnO1xuaW1wb3J0IElORklOSVRZIGZyb20gJy5JbmZpbml0eSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy5PYmplY3QuY3JlYXRlPz0nO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz89JztcbmltcG9ydCBhcHBseSBmcm9tICcuUmVmbGVjdC5hcHBseT89JztcbmltcG9ydCBUeXBlRXJyb3IgZnJvbSAnLlR5cGVFcnJvcic7XG5pbXBvcnQgVU5ERUZJTkVEIGZyb20gJy51bmRlZmluZWQnO1xuaW1wb3J0IFRFU1QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgTnVsbF9wcm90b3R5cGUgZnJvbSAnLm51bGwucHJvdG90eXBlJztcblxudmFyIE9iamVjdF9pcyA9ICggT2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmlzO1xudmFyIF9JTkZJTklUWSA9IC1JTkZJTklUWTtcblxudmFyIFZPSUQgPSB7ICd2b2lkJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09Vk9JRDsgfSB9Wyd2b2lkJ107XG5leHBvcnQgeyBWT0lEIGFzIHZvaWQgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFueSAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT1WT0lEOyB9XG5leHBvcnQgZnVuY3Rpb24gbmV2ZXIgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIGZhbHNlOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBiaWdpbnQgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdiaWdpbnQnOyB9XG52YXIgYmlnaW50XyA9IHsgJyFiaWdpbnQnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J2JpZ2ludCc7IH0gfVsnIWJpZ2ludCddO1xuZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbCAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J3N5bWJvbCc7IH1cbnZhciBzeW1ib2xfID0geyAnIXN5bWJvbCc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWUhPT0nc3ltYm9sJzsgfSB9Wychc3ltYm9sJ107XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJzsgfVxudmFyIHN0cmluZ18gPSB7ICchc3RyaW5nJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSE9PSdzdHJpbmcnOyB9IH1bJyFzdHJpbmcnXTtcbnZhciBCT09MRUFOID0geyAnYm9vbGVhbic6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PXRydWUgfHwgdmFsdWU9PT1mYWxzZTsgfSB9Wydib29sZWFuJ107XG5leHBvcnQgeyBCT09MRUFOIGFzIGJvb2xlYW4gfTtcbnZhciBib29sZWFuXyA9IHsgJyFib29sZWFuJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09dHJ1ZSAmJiB2YWx1ZSE9PWZhbHNlOyB9IH1bJyFib29sZWFuJ107XG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nbnVtYmVyJzsgfVxudmFyIG51bWJlcl8gPSB7ICchbnVtYmVyJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSE9PSdudW1iZXInOyB9IH1bJyFudW1iZXInXTtcbmV4cG9ydCBmdW5jdGlvbiB1bmRlZmluZWQgKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09VU5ERUZJTkVEOyB9XG52YXIgdW5kZWZpbmVkXyA9IHsgJyF1bmRlZmluZWQnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT1VTkRFRklORUQ7IH0gfVsnIXVuZGVmaW5lZCddO1xuXG52YXIgTlVMTCA9IHsgJ251bGwnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1udWxsOyB9IH1bJ251bGwnXTtcbnZhciBOVUxMXyA9IHsgJyFudWxsJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09bnVsbDsgfSB9WychbnVsbCddO1xudmFyIFRSVUUgPSB7ICd0cnVlJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09dHJ1ZTsgfSB9Wyd0cnVlJ107XG52YXIgVFJVRV8gPSB7ICchdHJ1ZSc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXRydWU7IH0gfVsnIXRydWUnXTtcbnZhciBGQUxTRSA9IHsgJ2ZhbHNlJzogZnVuY3Rpb24gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09ZmFsc2U7IH0gfVsnZmFsc2UnXTtcbnZhciBGQUxTRV8gPSB7ICchZmFsc2UnOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT1mYWxzZTsgfSB9WychZmFsc2UnXTtcblxuZXhwb3J0IGZ1bmN0aW9uIEluZmluaXR5ICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PUlORklOSVRZOyB9XG5JbmZpbml0eS52YWx1ZU9mID0gZnVuY3Rpb24gKCAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICB7IHJldHVybiBJTkZJTklUWTsgfTtcbnZhciBJbmZpbml0eV8gPSB7ICchSW5maW5pdHknOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT1JTkZJTklUWTsgfSB9WychSW5maW5pdHknXTtcbnZhciBfSW5maW5pdHkgPSB7ICctSW5maW5pdHknOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1fSU5GSU5JVFk7IH0gfVsnLUluZmluaXR5J107XG52YXIgX0luZmluaXR5XyA9IHsgJyEtSW5maW5pdHknOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT1fSU5GSU5JVFk7IH0gfVsnIS1JbmZpbml0eSddO1xuXG5leHBvcnQgZnVuY3Rpb24gTmFOICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXZhbHVlOyB9XG52YXIgTmFOXyA9IHsgJyFOYU4nOiBmdW5jdGlvbiAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT12YWx1ZTsgfSB9WychTmFOJ107XG5cbnZhciBPICAgICAgICAgICAgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBPICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiBPYmplY3RfaXMgKHZhbHVlLCAwKTsgfVxuXHQ6IGZ1bmN0aW9uIE8gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09MCAmJiAxL3ZhbHVlPjA7IH07XG52YXIgT18gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIE9fICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiAhT2JqZWN0X2lzICh2YWx1ZSwgMCk7IH1cblx0OiBmdW5jdGlvbiBPXyAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT0wIHx8IDEvdmFsdWU8MDsgfTtcbnZhciBfTyAgICAgICAgICAgID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gX08gKHZhbHVlICAgICApICAgICAgICAgIHsgcmV0dXJuIE9iamVjdF9pcyAodmFsdWUsIC0wKTsgfVxuXHQ6IGZ1bmN0aW9uIF9PICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PTAgJiYgMS92YWx1ZTwwOyB9O1xudmFyIF9PXyAgICAgICAgICAgID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gX09fICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiAhT2JqZWN0X2lzICh2YWx1ZSwgLTApOyB9XG5cdDogZnVuY3Rpb24gX09fICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PTAgfHwgMS92YWx1ZT4wOyB9O1xuXG5mdW5jdGlvbiBUZXN0ICh0eXBlICAgICAgICAsIHN0cmljdCAgICAgICAgICwgVFJVRSAgICAgICAgICkgICAgICAgICAgICAgICAgICAge1xuXHR0cnkge1xuXHRcdFRFU1QuY2FsbCh0eXBlLCAnJyk7XG5cdFx0cmV0dXJuIHN0cmljdFxuXHRcdFx0PyBUUlVFXG5cdFx0XHRcdD8gZnVuY3Rpb24gdGVzdCAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJyAmJiBURVNULmNhbGwodHlwZSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdDogZnVuY3Rpb24gdGVzdCAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUhPT0nc3RyaW5nJyB8fCAhVEVTVC5jYWxsKHR5cGUsIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0OiBUUlVFXG5cdFx0XHRcdD8gZnVuY3Rpb24gdGVzdCAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0XHRcdHJldHVybiBURVNULmNhbGwodHlwZSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdDogZnVuY3Rpb24gdGVzdCAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0XHRcdHJldHVybiAhVEVTVC5jYWxsKHR5cGUsIHZhbHVlKTtcblx0XHRcdFx0fTtcblx0fVxuXHRjYXRjaCAoZXJyb3IpIHt9XG59XG5cbmZ1bmN0aW9uIE9iamVjdFZhbGlkYXRvciAgICAgICAgICAgICAgICAgICAodHlwZSAgICwgc3RyaWN0ICAgICAgICAgLCBGQUxTRSAgICAgICAgICkgICAgICAgICAgICB7XG5cdGlmICggc3RyaWN0ICYmIGlzQXJyYXkodHlwZSkgKSB7IHRocm93IFR5cGVFcnJvcignVmFsaWRhdG9yLnN0cmljdCh0eXBlIW9iamVjdCknKTsgfVxuXHR2YXIgZXhwZWN0S2V5cyA9IG93bktleXModHlwZSkucmV2ZXJzZSgpO1xuXHR2YXIgZXhwZWN0TGVuZ3RoICAgICAgICAgPSBleHBlY3RLZXlzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgPSBjcmVhdGUoTnVsbF9wcm90b3R5cGUpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0dmFsaWRhdG9yc1trZXldID0gaXModHlwZVtrZXldKTtcblx0fVxuXHR2YXIgVFJVRSAgICAgICAgICA9ICFGQUxTRTtcblx0cmV0dXJuIHN0cmljdFxuXHRcdD8gZnVuY3Rpb24gb2JqZWN0ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZSE9PSdvYmplY3QnIHx8ICF2YWx1ZSB8fCBpc0FycmF5KHZhbHVlKSApIHsgcmV0dXJuIEZBTFNFOyB9XG5cdFx0XHR2YXIgaW5kZXggICAgICAgICA9IDA7XG5cdFx0XHRmb3IgKCB2YXIga2V5cyA9IG93bktleXModmFsdWUpLCBsZW5ndGggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGlmICggISgga2V5c1tpbmRleF0gaW4gdmFsaWRhdG9ycyApICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdH1cblx0XHRcdGZvciAoIGluZGV4ID0gZXhwZWN0TGVuZ3RoOyBpbmRleDsgKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBleHBlY3RLZXlzWy0taW5kZXhdO1xuXHRcdFx0XHRpZiAoICF2YWxpZGF0b3JzW2tleV0oa2V5IGluIHZhbHVlID8gdmFsdWVba2V5XSA6IFZPSUQpICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBUUlVFO1xuXHRcdH1cblx0XHQ6IGZ1bmN0aW9uIG9iamVjdCAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWUhPT0nb2JqZWN0JyB8fCAhdmFsdWUgfHwgaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBleHBlY3RMZW5ndGg7IGluZGV4OyApIHtcblx0XHRcdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF07XG5cdFx0XHRcdGlmICggIXZhbGlkYXRvcnNba2V5XShrZXkgaW4gdmFsdWUgPyB2YWx1ZVtrZXldIDogVk9JRCkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFRSVUU7XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gQXJyYXlWYWxpZGF0b3IgKHR5cGUgICAgICAgICAgICAgICAgICwgbGlrZSAgICAgICAgICwgRkFMU0UgICAgICAgICApICAgICAgICAgICAge1xuXHR2YXIgbGVuZ3RoICAgICAgICAgPSB0eXBlLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgICAgICAgICAgICAgID0gW107XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzLnB1c2goaXModHlwZVtpbmRleF0pKTsgfVxuXHR2YXIgVFJVRSAgICAgICAgICA9ICFGQUxTRTtcblx0cmV0dXJuIGxpa2Vcblx0XHQ/IGZ1bmN0aW9uIGFycmF5TGlrZSAodmFsdWUgICAgICkgICAgICAgICAge1xuXHRcdFx0aWYgKCB2YWx1ZS5sZW5ndGghPT1sZW5ndGggKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRcdGlmICggIXZhbGlkYXRvcnNbaW5kZXhdKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBGQUxTRTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFRSVUU7XG5cdFx0fVxuXHRcdDogZnVuY3Rpb24gYXJyYXkgKHZhbHVlICAgICApICAgICAgICAgIHtcblx0XHRcdGlmICggIWlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdGlmICggdmFsdWUubGVuZ3RoIT09bGVuZ3RoICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdFx0XHRpZiAoICF2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gRkFMU0U7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBUUlVFO1xuXHRcdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpcyAodHlwZSAgICAgKSAgICAgICAgICAgIHtcblx0cmV0dXJuIHR5cGVvZiB0eXBlPT09J2Z1bmN0aW9uJyA/IHR5cGUgOlxuXHRcdHVuZGVmaW5lZCh0eXBlKSA/IHVuZGVmaW5lZCA6XG5cdFx0XHRUUlVFKHR5cGUpID8gVFJVRSA6IEZBTFNFKHR5cGUpID8gRkFMU0UgOlxuXHRcdFx0XHROVUxMKHR5cGUpID8gTlVMTCA6XG5cdFx0XHRcdFx0dHlwZW9mIHR5cGU9PT0nb2JqZWN0JyA/IC8qI19fUFVSRV9fKi8gaXNBcnJheSh0eXBlKSA/IEFycmF5VmFsaWRhdG9yKHR5cGUsIGZhbHNlLCBmYWxzZSkgOiAvKiNfX1BVUkVfXyovIFRlc3QodHlwZSwgZmFsc2UsIHRydWUpIHx8IE9iamVjdFZhbGlkYXRvcih0eXBlLCBmYWxzZSwgZmFsc2UpIDpcblx0XHRcdFx0XHRcdE8odHlwZSkgPyBPIDogX08odHlwZSkgPyBfTyA6XG5cdFx0XHRcdFx0XHRcdHR5cGUhPT10eXBlID8gTmFOIDpcblx0XHRcdFx0XHRcdFx0XHR0eXBlPT09SU5GSU5JVFkgPyBJbmZpbml0eSA6IHR5cGU9PT1fSU5GSU5JVFkgPyBfSW5maW5pdHkgOlxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24gaXNUeXBlICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PXR5cGU7IH07XG59XG5leHBvcnQgZnVuY3Rpb24gbm90ICh0eXBlICAgICApICAgICAgICAgICAge1xuXHRpZiAoIHR5cGVvZiB0eXBlPT09J2Z1bmN0aW9uJyApIHtcblx0XHRzd2l0Y2ggKCB0eXBlICkge1xuXHRcdFx0Y2FzZSBiaWdpbnQ6XG5cdFx0XHRcdHJldHVybiBiaWdpbnRfO1xuXHRcdFx0Y2FzZSBzeW1ib2w6XG5cdFx0XHRcdHJldHVybiBzeW1ib2xfO1xuXHRcdFx0Y2FzZSBzdHJpbmc6XG5cdFx0XHRcdHJldHVybiBzdHJpbmdfO1xuXHRcdFx0Y2FzZSBCT09MRUFOOlxuXHRcdFx0XHRyZXR1cm4gYm9vbGVhbl87XG5cdFx0XHRjYXNlIG51bWJlcjpcblx0XHRcdFx0cmV0dXJuIG51bWJlcl87XG5cdFx0XHRjYXNlIHVuZGVmaW5lZDpcblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZF87XG5cdFx0XHRjYXNlIEluZmluaXR5OlxuXHRcdFx0XHRyZXR1cm4gSW5maW5pdHlfO1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gbm90VHlwZSAodmFsdWUgICAgICkgICAgICAgICAgeyByZXR1cm4gIXR5cGUodmFsdWUpOyB9O1xuXHR9XG5cdHJldHVybiB0eXBlPT09VU5ERUZJTkVEID8gdW5kZWZpbmVkXyA6XG5cdFx0dHlwZT09PXRydWUgPyBUUlVFXyA6IHR5cGU9PT1mYWxzZSA/IEZBTFNFXyA6XG5cdFx0XHR0eXBlPT09bnVsbCA/IE5VTExfIDpcblx0XHRcdFx0dHlwZW9mIHR5cGU9PT0nb2JqZWN0JyA/IGlzQXJyYXkodHlwZSkgPyAvKiNfX1BVUkVfXyovIEFycmF5VmFsaWRhdG9yKHR5cGUsIGZhbHNlLCB0cnVlKSA6IC8qI19fUFVSRV9fKi8gVGVzdCh0eXBlLCBmYWxzZSwgZmFsc2UpIHx8IC8qI19fUFVSRV9fKi8gT2JqZWN0VmFsaWRhdG9yKHR5cGUsIGZhbHNlLCB0cnVlKSA6XG5cdFx0XHRcdFx0dHlwZT09PTAgPyBPXyh0eXBlKSA/IF9PXyA6IE9fIDpcblx0XHRcdFx0XHRcdHR5cGUhPT10eXBlID8gTmFOXyA6XG5cdFx0XHRcdFx0XHRcdHR5cGU9PT1JTkZJTklUWSA/IEluZmluaXR5XyA6IHR5cGU9PT1fSU5GSU5JVFkgPyBfSW5maW5pdHlfIDpcblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiBub3RUeXBlICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXR5cGU7IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpY3QgKHR5cGUgICAgICAgICkgICAgICAgICAgICB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovIFRlc3QodHlwZSwgdHJ1ZSwgdHJ1ZSkgfHwgLyojX19QVVJFX18qLyBPYmplY3RWYWxpZGF0b3IodHlwZSwgdHJ1ZSwgZmFsc2UpO1xufVxuc3RyaWN0Lm5vdCA9IGZ1bmN0aW9uIHN0cmljdF9ub3QgKHR5cGUgICAgICAgICkgICAgICAgICAgICB7XG5cdHJldHVybiAvKiNfX1BVUkVfXyovIFRlc3QodHlwZSwgdHJ1ZSwgZmFsc2UpIHx8IC8qI19fUFVSRV9fKi8gT2JqZWN0VmFsaWRhdG9yKHR5cGUsIHRydWUsIHRydWUpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9wdGlvbmFsICh0eXBlICAgICApICAgICAgICAgICAge1xuXHR2YXIgdmFsaWRhdG9yICAgICAgICAgICAgPSBpcyh0eXBlKTtcblx0cmV0dXJuIGZ1bmN0aW9uIG9wdGlvbmFsVmFsaWRhdG9yICh2YWx1ZSAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PVZPSUQgfHwgdmFsaWRhdG9yKHZhbHVlKTsgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9yICh0eXBlICAgICApICAgICAgICAgICAge1xuXHR2YXIgdHlwZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBhcmd1bWVudHMubGVuZ3RoPT09MSAmJiBpc0FycmF5KHR5cGUpID8gdHlwZSA6IGFyZ3VtZW50cztcblx0dmFyIGxlbmd0aCAgICAgICAgID0gdHlwZXMubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyAgICAgICAgICAgICAgPSBbXTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IHZhbGlkYXRvcnMucHVzaChpcyh0eXBlc1tpbmRleF0pKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gb3IgKHZhbHVlICAgICApICAgICAgICAgIHtcblx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggdmFsaWRhdG9yc1tpbmRleF0odmFsdWUpICkgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG59XG5leHBvcnQgZnVuY3Rpb24gYW5kICh0eXBlICAgICApICAgICAgICAgICAge1xuXHR2YXIgdHlwZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBhcmd1bWVudHMubGVuZ3RoPT09MSAmJiBpc0FycmF5KHR5cGUpID8gdHlwZSA6IGFyZ3VtZW50cztcblx0dmFyIGxlbmd0aCAgICAgICAgID0gdHlwZXMubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyAgICAgICAgICAgICAgPSBbXTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IHZhbGlkYXRvcnMucHVzaChpcyh0eXBlc1tpbmRleF0pKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gYW5kICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0XHRpZiAoICF2YWxpZGF0b3JzW2luZGV4XSh2YWx1ZSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZXJ5ICh0eXBlICAgICApICAgICAgICAgICAge1xuXHR2YXIgdmFsaWRhdG9yICAgICAgICAgICAgPSBpcyh0eXBlKTtcblx0cmV0dXJuIGZ1bmN0aW9uIGFycmF5ICh2YWx1ZSAgICAgKSAgICAgICAgICB7XG5cdFx0aWYgKCAhaXNBcnJheSh2YWx1ZSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZvciAoIHZhciBsZW5ndGggICAgICAgICA9IHZhbHVlLmxlbmd0aCwgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggIXZhbGlkYXRvcih2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbnZhciBjb21tYV9yZXBlYXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSAnJy5yZXBlYXRcblx0PyBmdW5jdGlvbiBjb21tYV9yZXBlYXQgKGNvdW50ICAgICAgICApICAgICAgICAgeyByZXR1cm4gJywnLnJlcGVhdChjb3VudCk7IH1cblx0OiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGNvbW1hcyAgICAgICAgICAgPSBbXTtcblx0XHRyZXR1cm4gZnVuY3Rpb24gY29tbWFfcmVwZWF0IChjb3VudCAgICAgICAgKSAgICAgICAgIHtcblx0XHRcdGNvbW1hcy5sZW5ndGggPSBjb3VudCsxO1xuXHRcdFx0cmV0dXJuIGNvbW1hcy5qb2luKCcsJyk7XG5cdFx0fTtcblx0fSgpO1xuZXhwb3J0IGZ1bmN0aW9uIG92ZXJsb2FkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVzICAgLCBjYWxsYmFjayAgICkgeyByZXR1cm4gLyojX19QVVJFX18qLyBPdmVybG9hZGVkLmFwcGx5KG51bGwsIGFyZ3VtZW50cyAgICAgICAgICAgICAgICAgICAgICAgKTsgfVxuZnVuY3Rpb24gT3ZlcmxvYWRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlcyAgICAgICAgICAgICAgICAgLCBjYWxsYmFjayAgICkge1xuXHR2YXIgdmFsaWRhdG9yICAgICAgICAgICAgPSBpcyh0eXBlcyk7XG5cdGlmICggdHlwZW9mIGNhbGxiYWNrIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKCdWYWxpZGF0b3Iub3ZlcmxvYWQoLGNhbGxiYWNrIWZ1bmN0aW9uKScpOyB9XG5cdHZhciB2YWxpZGF0b3JzICAgICAgICAgICAgIDtcblx0dmFyIGNhbGxiYWNrcyAgICAgO1xuXHR2YXIgbGVuZ3RoICAgICAgICAgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHR2YXIgZmFsbGJhY2sgICA7XG5cdGlmICggbGVuZ3RoJTIgKSB7XG5cdFx0ZmFsbGJhY2sgPSBhcmd1bWVudHNbLS1sZW5ndGhdO1xuXHRcdGlmICggdHlwZW9mIGZhbGxiYWNrIT09J2Z1bmN0aW9uJyApIHsgdGhyb3cgVHlwZUVycm9yKCdWYWxpZGF0b3Iub3ZlcmxvYWQoJytjb21tYV9yZXBlYXQobGVuZ3RoKSsnZmFsbGJhY2shZnVuY3Rpb24pJyk7IH1cblx0fVxuXHRpZiAoIGxlbmd0aDwzICkgeyBsZW5ndGggPSAwOyB9XG5cdGVsc2Uge1xuXHRcdHZhbGlkYXRvcnMgPSBbXTtcblx0XHRjYWxsYmFja3MgPSBbXTtcblx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDI7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdHZhbGlkYXRvcnMucHVzaChBcnJheVZhbGlkYXRvcihhcmd1bWVudHNbaW5kZXhdLCB0cnVlLCBmYWxzZSkpO1xuXHRcdFx0dmFyIGNiICAgID0gYXJndW1lbnRzWysraW5kZXhdO1xuXHRcdFx0aWYgKCB0eXBlb2YgY2IhPT0nZnVuY3Rpb24nICkgeyB0aHJvdyBUeXBlRXJyb3IoJ1ZhbGlkYXRvci5vdmVybG9hZCgnK2NvbW1hX3JlcGVhdChpbmRleCkrJ2NhbGxiYWNrIWZ1bmN0aW9uKScpOyB9XG5cdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG5cdFx0fVxuXHRcdGxlbmd0aCA9IHZhbGlkYXRvcnMubGVuZ3RoO1xuXHR9XG5cdHJldHVybiBmdW5jdGlvbiBvdmVybG9hZGVkICggICAgICAgICApIHtcblx0XHRpZiAoIHZhbGlkYXRvcihhcmd1bWVudHMpICkgeyByZXR1cm4gYXBwbHkoY2FsbGJhY2ssIHRoaXMsIGFyZ3VtZW50cyk7IH1cblx0XHRmb3IgKCB2YXIgaW5kZXggICAgICAgICA9IDA7IGluZGV4PGxlbmd0aDsgKytpbmRleCApIHtcblx0XHRcdGlmICggdmFsaWRhdG9yc1tpbmRleF0oYXJndW1lbnRzKSApIHsgcmV0dXJuIGFwcGx5KGNhbGxiYWNrc1tpbmRleF0sIHRoaXMsIGFyZ3VtZW50cyk7IH1cblx0XHR9XG5cdFx0aWYgKCBmYWxsYmFjayApIHsgcmV0dXJuIGFwcGx5KGZhbGxiYWNrLCB0aGlzLCBhcmd1bWVudHMpOyB9XG5cdFx0dGhyb3cgVHlwZUVycm9yKCk7XG5cdH07XG59XG5cbmltcG9ydCBEZWZhdWx0IGZyb20gJy5kZWZhdWx0Pz0nO1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdCh7XG5cdGlzOiBpcywgbm90OiBub3QsXG5cdGFuZDogYW5kLCBvcjogb3IsXG5cdGJpZ2ludDogYmlnaW50LCBzeW1ib2w6IHN5bWJvbCwgc3RyaW5nOiBzdHJpbmcsICdib29sZWFuJzogQk9PTEVBTiwgbnVtYmVyOiBudW1iZXIsXG5cdHVuZGVmaW5lZDogdW5kZWZpbmVkLCBOYU46IE5hTiwgSW5maW5pdHk6IEluZmluaXR5LFxuXHRldmVyeTogZXZlcnksXG5cdCd2b2lkJzogVk9JRCwgb3B0aW9uYWw6IG9wdGlvbmFsLCBzdHJpY3Q6IHN0cmljdCxcblx0YW55OiBhbnksIG5ldmVyOiBuZXZlcixcblx0b3ZlcmxvYWQ6IG92ZXJsb2FkLFxuXHR2ZXJzaW9uOiB2ZXJzaW9uXG59KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiXSwibmFtZXMiOlsidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWUsT0FBTzs7c0JBQUMsdEJDY3ZCLElBQUksU0FBUyxHQUFHLEVBQUUsTUFBTSx3Q0FBd0MsRUFBRSxDQUFDO0FBQ25FLElBQUksU0FBUyxHQUFHLENBQUMsUUFBUSxDQUFDOztBQUUxQixBQUFHLElBQUMsSUFBSSxHQUFHLEVBQUUsTUFBTSxFQUFFLFVBQVUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdkYsQUFDQTtBQUNBLEFBQU8sU0FBUyxHQUFHLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRSxPQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRTtBQUNsRSxBQUFPLFNBQVMsS0FBSyxFQUFFLEtBQUssZ0JBQWdCLEVBQUUsT0FBTyxLQUFLLENBQUMsRUFBRTs7QUFFN0QsQUFBTyxTQUFT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