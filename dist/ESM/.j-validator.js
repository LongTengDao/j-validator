/*!@preserve@license
 * 模块名称：j-validator
 * 模块功能：API 验证相关共享实用程序。从属于“简计划”。
   　　　　　API validating util. Belong to "Plan J".
 * 模块版本：6.0.0
 * 许可条款：LGPL-3.0
 * 所属作者：龙腾道 <LongTengDao@LongTengDao.com> (www.LongTengDao.com)
 * 问题反馈：https://GitHub.com/LongTengDao/j-validator/issues
 * 项目主页：https://GitHub.com/LongTengDao/j-validator/
 */

import TypeError from '.TypeError';
import SyntaxError from '.SyntaxError';
import RegExp from '.RegExp';
import test from '.RegExp.prototype.test';
import bind from '.Function.prototype.bind?';
import Object_is from '.Object.is?';
import create from '.Object.create?=';
import isArray from '.Array.isArray?=';
import ownKeys from '.Reflect.ownKeys?=';
import INFINITY from '.Infinity';
import UNDEFINED from '.undefined';
import Null_prototype from '.null.prototype';
import isRegExp from '.class.isRegExp';
import Default from '.default?=';

var version = '6.0.0';

var test_bind = bind
	? /*#__PURE__*/ bind.bind(test)                                                                       
	: function (            re        ) {
		return function (            string        ) {
			return test.call(re, string);
		};
	};

var _INFINITY = -INFINITY;

function any ()          { return true; }
function never ()          { return false; }

function bigint (value         )          { return typeof value==='bigint'; }
var bigint_ = { '!bigint': function (value         )          { return typeof value!=='bigint'; } }['!bigint'];
function symbol (value         )          { return typeof value==='symbol'; }
var symbol_ = { '!symbol': function (value         )          { return typeof value!=='symbol'; } }['!symbol'];
function string (value         )          { return typeof value==='string'; }
var string_ = { '!string': function (value         )          { return typeof value!=='string'; } }['!string'];
var BOOLEAN = { 'boolean': function (value         )          { return value===true || value===false; } }['boolean'];
var boolean_ = { '!boolean': function (value         )          { return value!==true && value!==false; } }['!boolean'];
function number (value         )          { return typeof value==='number'; }
var number_ = { '!number': function (value         )          { return typeof value!=='number'; } }['!number'];
function undefined$1 (value         )          { return value===UNDEFINED; }
var undefined_ = { '!undefined': function (value         )          { return value!==UNDEFINED; } }['!undefined'];

var NULL = { 'null': function (value         )          { return value===null; } }['null'];
var NULL_ = { '!null': function (value         )          { return value!==null; } }['!null'];
var TRUE = { 'true': function (value         )          { return value===true; } }['true'];
var TRUE_ = { '!true': function (value         )          { return value!==true; } }['!true'];
var FALSE = { 'false': function (value         )          { return value===false; } }['false'];
var FALSE_ = { '!false': function (value         )          { return value!==false; } }['!false'];

function Infinity (value         )          { return value===INFINITY; }
Infinity.valueOf = function (                     )         { return INFINITY; };
var Infinity_ = { '!Infinity': function (value         )          { return value!==INFINITY; } }['!Infinity'];
var _Infinity = { '-Infinity': function (value         )          { return value===_INFINITY; } }['-Infinity'];
var _Infinity_ = { '!-Infinity': function (value         )          { return value!==_INFINITY; } }['!-Infinity'];

function NaN (value         )          { return value!==value; }
var NaN_ = { '!NaN': function (value         )          { return value===value; } }['!NaN'];

var O            = Object_is
	? function O (value         )          { return Object_is (value, 0); }
	: function O (value         )          { return value===0 && 1/value>0; };
var O_            = Object_is
	? function O_ (value         )          { return !Object_is (value, 0); }
	: function O_ (value         )          { return value!==0 || 1/value<0; };
var _O            = Object_is
	? function _O (value         )          { return Object_is (value, -0); }
	: function _O (value         )          { return value===0 && 1/value<0; };
var _O_            = Object_is
	? function _O_ (value         )          { return !Object_is (value, -0); }
	: function _O_ (value         )          { return value!==0 || 1/value>0; };

function StringTester (type        , FALSE         )            {
	if ( type.global ) { type = RegExp(type.source, type.flags ? type.flags.replace('g', '') : ( type.ignoreCase ? 'i' : '' ) + ( type.multiline ? 'm' : '' )); }
	var type_test = test_bind(type);
	return FALSE
		? function tester (value         )          { return typeof value!=='string' || !type_test(value); }
		: function tester (value         )          { return typeof value==='string' && type_test(value); };
}

function OBJECT                   (value         , index        , expectKeys                    , validators                                          )          {
	if ( typeof value!=='object' || !value ) { return false; }
	while ( index ) {
		var key = expectKeys[--index] ;
		if ( !validators[key](( value      )[key]) ) { return false; }
	}
	return true;
}
function OBJECT_STRICT                   (value         , index        , expectKeys                    , validators                                          )          {
	if ( typeof value!=='object' || !value || isArray(value) ) { return false; }
	while ( index ) {
		var key = expectKeys[--index] ;
		if ( !validators[key](( value      )[key]) ) { return false; }
	}
	for ( var keys = ownKeys(value), length         = keys.length; index<length; ++index ) {
		if ( !( keys[index]  in validators ) ) { return false; }
	}
	return true;
}
function ObjectValidator                   (type   , FALSE         , strict         )            {
	var expectKeys = ownKeys(type).reverse();
	var expectLength         = expectKeys.length;
	var validators = create(Null_prototype)                                   ;
	for ( var index         = expectLength; index; ) {
		var key = expectKeys[--index] ;
		validators[key] = is(type[key]);
	}
	return strict
		? FALSE
			? function object (value         )          { return !OBJECT_STRICT   (value, expectLength, expectKeys, validators); }
			: function object (value         )          { return OBJECT_STRICT   (value, expectLength, expectKeys, validators); }
		: FALSE
			? function object (value         )          { return !OBJECT   (value, expectLength, expectKeys, validators); }
			: function object (value         )          { return OBJECT   (value, expectLength, expectKeys, validators); };
}

function ARRAY (value         , length        , validators                      )          {
	if ( !isArray(value) || value.length!==length ) { return false; }
	for ( var index         = 0; index<length; ++index ) {
		if ( !validators[index] (value[index]) ) { return false; }
	}
	return true;
}
function ArrayValidator (type                    , FALSE         )            {
	var length         = type.length;
	var validators              = [];
	for ( var index         = 0; index<length; ++index ) { validators[index] = is(type[index]); }
	return FALSE
		? function array (value         )          { return !ARRAY(value, length, validators); }
		: function array (value         )          { return ARRAY(value, length, validators); };
}

function is (type         )            {
	return typeof type==='function' ? type              :
		type===UNDEFINED ? undefined$1 :
			type===true ? TRUE : type===false ? FALSE :
				type===null ? NULL :
					typeof type==='object' ?
						/*#__PURE__*/ isArray(type) ? ArrayValidator(type, false) :
						isRegExp(type) ? /*#__PURE__*/ StringTester(type, false) :
							ObjectValidator(type          , false, false) :
						O(type) ? O : _O(type) ? _O :
							type!==type ? NaN :
								type===INFINITY ? Infinity : type===_INFINITY ? _Infinity :
									function isType (value         )          { return value===type; };
}
function not (type         )            {
	if ( typeof type==='function' ) {
		switch ( type ) {
			case undefined$1: return undefined_;
			case undefined_: return undefined$1;
			case bigint: return bigint_;
			case bigint_: return bigint;
			case string: return string_;
			case string_: return string;
			case BOOLEAN: return boolean_;
			case boolean_: return BOOLEAN;
			case TRUE: return TRUE_;
			case TRUE_: return TRUE;
			case FALSE: return FALSE_;
			case FALSE_: return FALSE;
			case NULL: return NULL_;
			case NULL_: return NULL;
			case number: return number_;
			case number_: return number;
			case Infinity: return Infinity_;
			case Infinity_: return Infinity;
			case _Infinity: return _Infinity_;
			case _Infinity_: return _Infinity;
			case O: return O_;
			case O_: return O;
			case _O: return _O_;
			case _O_: return _O;
			case symbol: return symbol_;
			case symbol_: return symbol;
		}
		return function notType (value         )          { return !type(value); };
	}
	return type===UNDEFINED ? undefined_ :
		type===true ? TRUE_ : type===false ? FALSE_ :
			type===null ? NULL_ :
				typeof type==='object' ?
					isArray(type) ? /*#__PURE__*/ ArrayValidator(type, true) :
						isRegExp(type) ? /*#__PURE__*/ StringTester(type, true) :
							/*#__PURE__*/ ObjectValidator(type          , true, false) :
					type===0 ? O_(type) ? _O_ : O_ :
						type!==type ? NaN_ :
							type===INFINITY ? Infinity_ : type===_INFINITY ? _Infinity_ :
								function notType (value         )          { return value!==type; };
}

function strict (type        )            {
	if ( isArray(type) || isRegExp(type) ) { throw TypeError('strict(argument can not be an array or regExp)'); }
	return /*#__PURE__*/ ObjectValidator(type, false, true);
}
strict.not = function strict_not (type        )            {
	if ( isArray(type) || isRegExp(type) ) { throw TypeError('strict.not(argument can not be an array or regExp)'); }
	return /*#__PURE__*/ ObjectValidator(type, true, true);
};

function optional (type         )            {
	var validator            = is(type);
	return function optionalValidator (value         )          { return value===UNDEFINED || validator(value); };
}

function OR (value         , length        , validators                      )          {
	for ( var index         = 0; index<length; ++index ) {
		if ( validators[index] (value) ) { return true; }
	}
	return false;
}
function or (type         )            {
	var types                     = arguments.length===1 && isArray(type) ? type : arguments;
	var length         = types.length;
	var validators              = [];
	for ( var index         = 0; index<length; ++index ) { validators[index] = is(types[index]); }
	return function or (value         )          { return OR(value, length, validators); };
}
function AND (value         , length        , validators                      )          {
	for ( var index         = 0; index<length; ++index ) {
		if ( !validators[index] (value) ) { return false; }
	}
	return true;
}
function and (type         )            {
	var types                     = arguments.length===1 && isArray(type) ? type : arguments;
	var length         = types.length;
	var validators              = [];
	for ( var index         = 0; index<length; ++index ) { validators[index] = is(types[index]); }
	return function and (value         )          { return AND(value, length, validators); };
}

function EVERY (value         , validator           )          {
	if ( !isArray(value) ) { return false; }
	for ( var length         = value.length, index         = 0; index<length; ++index ) {
		if ( !validator(value[index]) ) { return false; }
	}
	return true;
}
function every (type         )            {
	var validator            = is(type);
	return function array (value         )          { return EVERY(value, validator); };
}

                                                     
                                          
function TUPLE (value         , rootPatterns          )          {
	if ( !isArray(value) ) { return false; }
	var patterns                  = rootPatterns;
	var patternIndex         = patterns.length;
	var subValue          = value[0];
	var subIndex         = 0;
	for ( ; ; ) {
		var pattern          = patterns[--patternIndex] ;
		if ( pattern(subValue) ) {
			patterns = pattern.rest;
			if ( !patterns ) { return true; }
			patternIndex = patterns.length;
			subValue = value[++subIndex];
		}
		else if ( !patternIndex ) { return false; }
	}
}
function unshift_call (array                   , item     )       {
	var index         = array.length;
	do { array[index] = array[--index] ; }
	while ( index );
	array[0] = item;
}
function tuple (template                      ) {
	var raw                    = template.raw;
	var length         = arguments.length - 1;
	if ( !length ) { throw SyntaxError('tuple'); }
	var s         = raw[0] ;
	var lastIndexAfterLF         = s.lastIndexOf('\n') + 1;
	if ( !lastIndexAfterLF ) { throw SyntaxError('tuple'); }
	var LEVEL         = s.length - lastIndexAfterLF;
	var index         = 0;
	var allPatterns            = [];
	do { ( allPatterns[index] = is(arguments[++index])            ).rest = null; }
	while ( index<length );
	index = 0;
	var rootPatterns           = [ allPatterns[0]  ];
	var level         = function callee (patterns          , LEVEL        )         {
		while ( ++index<length ) {
			var s         = raw[index] ;
			var lastIndexAfterLF = s.lastIndexOf('\n') + 1;
			if ( !lastIndexAfterLF ) { throw SyntaxError('tuple'); }
			var level = s.length - lastIndexAfterLF;
			if ( level<LEVEL ) { return level; }
			if ( level===LEVEL ) { unshift_call(patterns, allPatterns[index] ); }
			else {
				level = callee(patterns[0] .rest = [ allPatterns[index]  ], level);
				if ( level<LEVEL ) { return level; }
				if ( level!==LEVEL ) { throw SyntaxError('tuple'); }
				unshift_call(patterns, allPatterns[index] );
			}
		}
		return -1;
	}(rootPatterns, LEVEL);
	if ( 0<=level && level<LEVEL ) { throw SyntaxError('tuple'); }
	return function tuple (value         )          { return TUPLE(value, rootPatterns); };
}
var _export = Default({
	is: is, not: not,
	and: and, or: or,
	bigint: bigint, symbol: symbol, string: string, 'boolean': BOOLEAN, number: number,
	undefined: undefined$1, NaN: NaN, Infinity: Infinity,
	every: every, tuple: tuple,
	optional: optional, strict: strict,
	any: any, never: never,
	version: version
});

export default _export;
export { Infinity, NaN, and, any, bigint, BOOLEAN as boolean, every, is, never, not, number, optional, or, strict, string, symbol, tuple, undefined$1 as undefined, version };

/*¡ j-validator */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnNpb24/dGV4dCIsImV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCc2LjAuMCc7IiwiaW1wb3J0IHZlcnNpb24gZnJvbSAnLi92ZXJzaW9uP3RleHQnO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG5pbXBvcnQgVHlwZUVycm9yIGZyb20gJy5UeXBlRXJyb3InO1xuaW1wb3J0IFN5bnRheEVycm9yIGZyb20gJy5TeW50YXhFcnJvcic7XG5pbXBvcnQgUmVnRXhwIGZyb20gJy5SZWdFeHAnO1xuaW1wb3J0IHRlc3QgZnJvbSAnLlJlZ0V4cC5wcm90b3R5cGUudGVzdCc7XG5pbXBvcnQgYmluZCBmcm9tICcuRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ/JztcbmltcG9ydCBPYmplY3RfaXMgZnJvbSAnLk9iamVjdC5pcz8nO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuT2JqZWN0LmNyZWF0ZT89JztcbmltcG9ydCBpc0FycmF5IGZyb20gJy5BcnJheS5pc0FycmF5Pz0nO1xuaW1wb3J0IG93bktleXMgZnJvbSAnLlJlZmxlY3Qub3duS2V5cz89JztcbmltcG9ydCBJTkZJTklUWSBmcm9tICcuSW5maW5pdHknO1xuaW1wb3J0IFVOREVGSU5FRCBmcm9tICcudW5kZWZpbmVkJztcbmltcG9ydCBOdWxsX3Byb3RvdHlwZSBmcm9tICcubnVsbC5wcm90b3R5cGUnO1xuaW1wb3J0IGlzUmVnRXhwIGZyb20gJy5jbGFzcy5pc1JlZ0V4cCc7XG5cbnZhciB0ZXN0X2JpbmQgPSBiaW5kXG5cdD8gLyojX19QVVJFX18qLyBiaW5kLmJpbmQodGVzdCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHQ6IGZ1bmN0aW9uICggICAgICAgICAgICByZSAgICAgICAgKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggICAgICAgICAgICBzdHJpbmcgICAgICAgICkge1xuXHRcdFx0cmV0dXJuIHRlc3QuY2FsbChyZSwgc3RyaW5nKTtcblx0XHR9O1xuXHR9O1xuXG52YXIgX0lORklOSVRZID0gLUlORklOSVRZO1xuXG5leHBvcnQgZnVuY3Rpb24gYW55ICgpICAgICAgICAgIHsgcmV0dXJuIHRydWU7IH1cbmV4cG9ydCBmdW5jdGlvbiBuZXZlciAoKSAgICAgICAgICB7IHJldHVybiBmYWxzZTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gYmlnaW50ICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J2JpZ2ludCc7IH1cbnZhciBiaWdpbnRfID0geyAnIWJpZ2ludCc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J2JpZ2ludCc7IH0gfVsnIWJpZ2ludCddO1xuZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbCAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzeW1ib2wnOyB9XG52YXIgc3ltYm9sXyA9IHsgJyFzeW1ib2wnOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSE9PSdzeW1ib2wnOyB9IH1bJyFzeW1ib2wnXTtcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmcgKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWU9PT0nc3RyaW5nJzsgfVxudmFyIHN0cmluZ18gPSB7ICchc3RyaW5nJzogZnVuY3Rpb24gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB0eXBlb2YgdmFsdWUhPT0nc3RyaW5nJzsgfSB9Wychc3RyaW5nJ107XG52YXIgQk9PTEVBTiA9IHsgJ2Jvb2xlYW4nOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09dHJ1ZSB8fCB2YWx1ZT09PWZhbHNlOyB9IH1bJ2Jvb2xlYW4nXTtcbmV4cG9ydCB7IEJPT0xFQU4gYXMgYm9vbGVhbiB9O1xudmFyIGJvb2xlYW5fID0geyAnIWJvb2xlYW4nOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09dHJ1ZSAmJiB2YWx1ZSE9PWZhbHNlOyB9IH1bJyFib29sZWFuJ107XG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlPT09J251bWJlcic7IH1cbnZhciBudW1iZXJfID0geyAnIW51bWJlcic6IGZ1bmN0aW9uICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J251bWJlcic7IH0gfVsnIW51bWJlciddO1xuZXhwb3J0IGZ1bmN0aW9uIHVuZGVmaW5lZCAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09VU5ERUZJTkVEOyB9XG52YXIgdW5kZWZpbmVkXyA9IHsgJyF1bmRlZmluZWQnOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09VU5ERUZJTkVEOyB9IH1bJyF1bmRlZmluZWQnXTtcblxudmFyIE5VTEwgPSB7ICdudWxsJzogZnVuY3Rpb24gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PW51bGw7IH0gfVsnbnVsbCddO1xudmFyIE5VTExfID0geyAnIW51bGwnOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09bnVsbDsgfSB9WychbnVsbCddO1xudmFyIFRSVUUgPSB7ICd0cnVlJzogZnVuY3Rpb24gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZT09PXRydWU7IH0gfVsndHJ1ZSddO1xudmFyIFRSVUVfID0geyAnIXRydWUnOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09dHJ1ZTsgfSB9WychdHJ1ZSddO1xudmFyIEZBTFNFID0geyAnZmFsc2UnOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09ZmFsc2U7IH0gfVsnZmFsc2UnXTtcbnZhciBGQUxTRV8gPSB7ICchZmFsc2UnOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlIT09ZmFsc2U7IH0gfVsnIWZhbHNlJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmZpbml0eSAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09SU5GSU5JVFk7IH1cbkluZmluaXR5LnZhbHVlT2YgPSBmdW5jdGlvbiAoICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgIHsgcmV0dXJuIElORklOSVRZOyB9O1xudmFyIEluZmluaXR5XyA9IHsgJyFJbmZpbml0eSc6IGZ1bmN0aW9uICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWUhPT1JTkZJTklUWTsgfSB9WychSW5maW5pdHknXTtcbnZhciBfSW5maW5pdHkgPSB7ICctSW5maW5pdHknOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09X0lORklOSVRZOyB9IH1bJy1JbmZpbml0eSddO1xudmFyIF9JbmZpbml0eV8gPSB7ICchLUluZmluaXR5JzogZnVuY3Rpb24gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PV9JTkZJTklUWTsgfSB9WychLUluZmluaXR5J107XG5cbmV4cG9ydCBmdW5jdGlvbiBOYU4gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXZhbHVlOyB9XG52YXIgTmFOXyA9IHsgJyFOYU4nOiBmdW5jdGlvbiAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09dmFsdWU7IH0gfVsnIU5hTiddO1xuXG52YXIgTyAgICAgICAgICAgID0gT2JqZWN0X2lzXG5cdD8gZnVuY3Rpb24gTyAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9iamVjdF9pcyAodmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gTyAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHZhbHVlPT09MCAmJiAxL3ZhbHVlPjA7IH07XG52YXIgT18gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIE9fICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gIU9iamVjdF9pcyAodmFsdWUsIDApOyB9XG5cdDogZnVuY3Rpb24gT18gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PTAgfHwgMS92YWx1ZTwwOyB9O1xudmFyIF9PICAgICAgICAgICAgPSBPYmplY3RfaXNcblx0PyBmdW5jdGlvbiBfTyAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9iamVjdF9pcyAodmFsdWUsIC0wKTsgfVxuXHQ6IGZ1bmN0aW9uIF9PICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT0wICYmIDEvdmFsdWU8MDsgfTtcbnZhciBfT18gICAgICAgICAgICA9IE9iamVjdF9pc1xuXHQ/IGZ1bmN0aW9uIF9PXyAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuICFPYmplY3RfaXMgKHZhbHVlLCAtMCk7IH1cblx0OiBmdW5jdGlvbiBfT18gKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PTAgfHwgMS92YWx1ZT4wOyB9O1xuXG5mdW5jdGlvbiBTdHJpbmdUZXN0ZXIgKHR5cGUgICAgICAgICwgRkFMU0UgICAgICAgICApICAgICAgICAgICAge1xuXHRpZiAoIHR5cGUuZ2xvYmFsICkgeyB0eXBlID0gUmVnRXhwKHR5cGUuc291cmNlLCB0eXBlLmZsYWdzID8gdHlwZS5mbGFncy5yZXBsYWNlKCdnJywgJycpIDogKCB0eXBlLmlnbm9yZUNhc2UgPyAnaScgOiAnJyApICsgKCB0eXBlLm11bHRpbGluZSA/ICdtJyA6ICcnICkpOyB9XG5cdHZhciB0eXBlX3Rlc3QgPSB0ZXN0X2JpbmQodHlwZSk7XG5cdHJldHVybiBGQUxTRVxuXHRcdD8gZnVuY3Rpb24gdGVzdGVyICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdHlwZW9mIHZhbHVlIT09J3N0cmluZycgfHwgIXR5cGVfdGVzdCh2YWx1ZSk7IH1cblx0XHQ6IGZ1bmN0aW9uIHRlc3RlciAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZT09PSdzdHJpbmcnICYmIHR5cGVfdGVzdCh2YWx1ZSk7IH07XG59XG5cbmZ1bmN0aW9uIE9CSkVDVCAgICAgICAgICAgICAgICAgICAodmFsdWUgICAgICAgICAsIGluZGV4ICAgICAgICAsIGV4cGVjdEtleXMgICAgICAgICAgICAgICAgICAgICwgdmFsaWRhdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgICAgICAgICAge1xuXHRpZiAoIHR5cGVvZiB2YWx1ZSE9PSdvYmplY3QnIHx8ICF2YWx1ZSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdHdoaWxlICggaW5kZXggKSB7XG5cdFx0dmFyIGtleSA9IGV4cGVjdEtleXNbLS1pbmRleF0gO1xuXHRcdGlmICggIXZhbGlkYXRvcnNba2V5XSgoIHZhbHVlICAgICAgKVtrZXldKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBPQkpFQ1RfU1RSSUNUICAgICAgICAgICAgICAgICAgICh2YWx1ZSAgICAgICAgICwgaW5kZXggICAgICAgICwgZXhwZWN0S2V5cyAgICAgICAgICAgICAgICAgICAgLCB2YWxpZGF0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAgICAgICAgICB7XG5cdGlmICggdHlwZW9mIHZhbHVlIT09J29iamVjdCcgfHwgIXZhbHVlIHx8IGlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0d2hpbGUgKCBpbmRleCApIHtcblx0XHR2YXIga2V5ID0gZXhwZWN0S2V5c1stLWluZGV4XSA7XG5cdFx0aWYgKCAhdmFsaWRhdG9yc1trZXldKCggdmFsdWUgICAgICApW2tleV0pICkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxuXHRmb3IgKCB2YXIga2V5cyA9IG93bktleXModmFsdWUpLCBsZW5ndGggICAgICAgICA9IGtleXMubGVuZ3RoOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0aWYgKCAhKCBrZXlzW2luZGV4XSAgaW4gdmFsaWRhdG9ycyApICkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIE9iamVjdFZhbGlkYXRvciAgICAgICAgICAgICAgICAgICAodHlwZSAgICwgRkFMU0UgICAgICAgICAsIHN0cmljdCAgICAgICAgICkgICAgICAgICAgICB7XG5cdHZhciBleHBlY3RLZXlzID0gb3duS2V5cyh0eXBlKS5yZXZlcnNlKCk7XG5cdHZhciBleHBlY3RMZW5ndGggICAgICAgICA9IGV4cGVjdEtleXMubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyA9IGNyZWF0ZShOdWxsX3Byb3RvdHlwZSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSBleHBlY3RMZW5ndGg7IGluZGV4OyApIHtcblx0XHR2YXIga2V5ID0gZXhwZWN0S2V5c1stLWluZGV4XSA7XG5cdFx0dmFsaWRhdG9yc1trZXldID0gaXModHlwZVtrZXldKTtcblx0fVxuXHRyZXR1cm4gc3RyaWN0XG5cdFx0PyBGQUxTRVxuXHRcdFx0PyBmdW5jdGlvbiBvYmplY3QgKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiAhT0JKRUNUX1NUUklDVCAgICh2YWx1ZSwgZXhwZWN0TGVuZ3RoLCBleHBlY3RLZXlzLCB2YWxpZGF0b3JzKTsgfVxuXHRcdFx0OiBmdW5jdGlvbiBvYmplY3QgKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBPQkpFQ1RfU1RSSUNUICAgKHZhbHVlLCBleHBlY3RMZW5ndGgsIGV4cGVjdEtleXMsIHZhbGlkYXRvcnMpOyB9XG5cdFx0OiBGQUxTRVxuXHRcdFx0PyBmdW5jdGlvbiBvYmplY3QgKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiAhT0JKRUNUICAgKHZhbHVlLCBleHBlY3RMZW5ndGgsIGV4cGVjdEtleXMsIHZhbGlkYXRvcnMpOyB9XG5cdFx0XHQ6IGZ1bmN0aW9uIG9iamVjdCAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIE9CSkVDVCAgICh2YWx1ZSwgZXhwZWN0TGVuZ3RoLCBleHBlY3RLZXlzLCB2YWxpZGF0b3JzKTsgfTtcbn1cblxuZnVuY3Rpb24gQVJSQVkgKHZhbHVlICAgICAgICAgLCBsZW5ndGggICAgICAgICwgdmFsaWRhdG9ycyAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHtcblx0aWYgKCAhaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoIT09bGVuZ3RoICkgeyByZXR1cm4gZmFsc2U7IH1cblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0aWYgKCAhdmFsaWRhdG9yc1tpbmRleF0gKHZhbHVlW2luZGV4XSkgKSB7IHJldHVybiBmYWxzZTsgfVxuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gQXJyYXlWYWxpZGF0b3IgKHR5cGUgICAgICAgICAgICAgICAgICAgICwgRkFMU0UgICAgICAgICApICAgICAgICAgICAge1xuXHR2YXIgbGVuZ3RoICAgICAgICAgPSB0eXBlLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgICAgICAgICAgICAgID0gW107XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzW2luZGV4XSA9IGlzKHR5cGVbaW5kZXhdKTsgfVxuXHRyZXR1cm4gRkFMU0Vcblx0XHQ/IGZ1bmN0aW9uIGFycmF5ICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gIUFSUkFZKHZhbHVlLCBsZW5ndGgsIHZhbGlkYXRvcnMpOyB9XG5cdFx0OiBmdW5jdGlvbiBhcnJheSAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIEFSUkFZKHZhbHVlLCBsZW5ndGgsIHZhbGlkYXRvcnMpOyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXMgKHR5cGUgICAgICAgICApICAgICAgICAgICAge1xuXHRyZXR1cm4gdHlwZW9mIHR5cGU9PT0nZnVuY3Rpb24nID8gdHlwZSAgICAgICAgICAgICAgOlxuXHRcdHR5cGU9PT1VTkRFRklORUQgPyB1bmRlZmluZWQgOlxuXHRcdFx0dHlwZT09PXRydWUgPyBUUlVFIDogdHlwZT09PWZhbHNlID8gRkFMU0UgOlxuXHRcdFx0XHR0eXBlPT09bnVsbCA/IE5VTEwgOlxuXHRcdFx0XHRcdHR5cGVvZiB0eXBlPT09J29iamVjdCcgP1xuXHRcdFx0XHRcdFx0LyojX19QVVJFX18qLyBpc0FycmF5KHR5cGUpID8gQXJyYXlWYWxpZGF0b3IodHlwZSwgZmFsc2UpIDpcblx0XHRcdFx0XHRcdGlzUmVnRXhwKHR5cGUpID8gLyojX19QVVJFX18qLyBTdHJpbmdUZXN0ZXIodHlwZSwgZmFsc2UpIDpcblx0XHRcdFx0XHRcdFx0T2JqZWN0VmFsaWRhdG9yKHR5cGUgICAgICAgICAgLCBmYWxzZSwgZmFsc2UpIDpcblx0XHRcdFx0XHRcdE8odHlwZSkgPyBPIDogX08odHlwZSkgPyBfTyA6XG5cdFx0XHRcdFx0XHRcdHR5cGUhPT10eXBlID8gTmFOIDpcblx0XHRcdFx0XHRcdFx0XHR0eXBlPT09SU5GSU5JVFkgPyBJbmZpbml0eSA6IHR5cGU9PT1fSU5GSU5JVFkgPyBfSW5maW5pdHkgOlxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24gaXNUeXBlICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT10eXBlOyB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIG5vdCAodHlwZSAgICAgICAgICkgICAgICAgICAgICB7XG5cdGlmICggdHlwZW9mIHR5cGU9PT0nZnVuY3Rpb24nICkge1xuXHRcdHN3aXRjaCAoIHR5cGUgKSB7XG5cdFx0XHRjYXNlIHVuZGVmaW5lZDogcmV0dXJuIHVuZGVmaW5lZF87XG5cdFx0XHRjYXNlIHVuZGVmaW5lZF86IHJldHVybiB1bmRlZmluZWQ7XG5cdFx0XHRjYXNlIGJpZ2ludDogcmV0dXJuIGJpZ2ludF87XG5cdFx0XHRjYXNlIGJpZ2ludF86IHJldHVybiBiaWdpbnQ7XG5cdFx0XHRjYXNlIHN0cmluZzogcmV0dXJuIHN0cmluZ187XG5cdFx0XHRjYXNlIHN0cmluZ186IHJldHVybiBzdHJpbmc7XG5cdFx0XHRjYXNlIEJPT0xFQU46IHJldHVybiBib29sZWFuXztcblx0XHRcdGNhc2UgYm9vbGVhbl86IHJldHVybiBCT09MRUFOO1xuXHRcdFx0Y2FzZSBUUlVFOiByZXR1cm4gVFJVRV87XG5cdFx0XHRjYXNlIFRSVUVfOiByZXR1cm4gVFJVRTtcblx0XHRcdGNhc2UgRkFMU0U6IHJldHVybiBGQUxTRV87XG5cdFx0XHRjYXNlIEZBTFNFXzogcmV0dXJuIEZBTFNFO1xuXHRcdFx0Y2FzZSBOVUxMOiByZXR1cm4gTlVMTF87XG5cdFx0XHRjYXNlIE5VTExfOiByZXR1cm4gTlVMTDtcblx0XHRcdGNhc2UgbnVtYmVyOiByZXR1cm4gbnVtYmVyXztcblx0XHRcdGNhc2UgbnVtYmVyXzogcmV0dXJuIG51bWJlcjtcblx0XHRcdGNhc2UgSW5maW5pdHk6IHJldHVybiBJbmZpbml0eV87XG5cdFx0XHRjYXNlIEluZmluaXR5XzogcmV0dXJuIEluZmluaXR5O1xuXHRcdFx0Y2FzZSBfSW5maW5pdHk6IHJldHVybiBfSW5maW5pdHlfO1xuXHRcdFx0Y2FzZSBfSW5maW5pdHlfOiByZXR1cm4gX0luZmluaXR5O1xuXHRcdFx0Y2FzZSBPOiByZXR1cm4gT187XG5cdFx0XHRjYXNlIE9fOiByZXR1cm4gTztcblx0XHRcdGNhc2UgX086IHJldHVybiBfT187XG5cdFx0XHRjYXNlIF9PXzogcmV0dXJuIF9PO1xuXHRcdFx0Y2FzZSBzeW1ib2w6IHJldHVybiBzeW1ib2xfO1xuXHRcdFx0Y2FzZSBzeW1ib2xfOiByZXR1cm4gc3ltYm9sO1xuXHRcdH1cblx0XHRyZXR1cm4gZnVuY3Rpb24gbm90VHlwZSAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuICF0eXBlKHZhbHVlKTsgfTtcblx0fVxuXHRyZXR1cm4gdHlwZT09PVVOREVGSU5FRCA/IHVuZGVmaW5lZF8gOlxuXHRcdHR5cGU9PT10cnVlID8gVFJVRV8gOiB0eXBlPT09ZmFsc2UgPyBGQUxTRV8gOlxuXHRcdFx0dHlwZT09PW51bGwgPyBOVUxMXyA6XG5cdFx0XHRcdHR5cGVvZiB0eXBlPT09J29iamVjdCcgP1xuXHRcdFx0XHRcdGlzQXJyYXkodHlwZSkgPyAvKiNfX1BVUkVfXyovIEFycmF5VmFsaWRhdG9yKHR5cGUsIHRydWUpIDpcblx0XHRcdFx0XHRcdGlzUmVnRXhwKHR5cGUpID8gLyojX19QVVJFX18qLyBTdHJpbmdUZXN0ZXIodHlwZSwgdHJ1ZSkgOlxuXHRcdFx0XHRcdFx0XHQvKiNfX1BVUkVfXyovIE9iamVjdFZhbGlkYXRvcih0eXBlICAgICAgICAgICwgdHJ1ZSwgZmFsc2UpIDpcblx0XHRcdFx0XHR0eXBlPT09MCA/IE9fKHR5cGUpID8gX09fIDogT18gOlxuXHRcdFx0XHRcdFx0dHlwZSE9PXR5cGUgPyBOYU5fIDpcblx0XHRcdFx0XHRcdFx0dHlwZT09PUlORklOSVRZID8gSW5maW5pdHlfIDogdHlwZT09PV9JTkZJTklUWSA/IF9JbmZpbml0eV8gOlxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIG5vdFR5cGUgKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiB2YWx1ZSE9PXR5cGU7IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpY3QgKHR5cGUgICAgICAgICkgICAgICAgICAgICB7XG5cdGlmICggaXNBcnJheSh0eXBlKSB8fCBpc1JlZ0V4cCh0eXBlKSApIHsgdGhyb3cgVHlwZUVycm9yKCdzdHJpY3QoYXJndW1lbnQgY2FuIG5vdCBiZSBhbiBhcnJheSBvciByZWdFeHApJyk7IH1cblx0cmV0dXJuIC8qI19fUFVSRV9fKi8gT2JqZWN0VmFsaWRhdG9yKHR5cGUsIGZhbHNlLCB0cnVlKTtcbn1cbnN0cmljdC5ub3QgPSBmdW5jdGlvbiBzdHJpY3Rfbm90ICh0eXBlICAgICAgICApICAgICAgICAgICAge1xuXHRpZiAoIGlzQXJyYXkodHlwZSkgfHwgaXNSZWdFeHAodHlwZSkgKSB7IHRocm93IFR5cGVFcnJvcignc3RyaWN0Lm5vdChhcmd1bWVudCBjYW4gbm90IGJlIGFuIGFycmF5IG9yIHJlZ0V4cCknKTsgfVxuXHRyZXR1cm4gLyojX19QVVJFX18qLyBPYmplY3RWYWxpZGF0b3IodHlwZSwgdHJ1ZSwgdHJ1ZSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uYWwgKHR5cGUgICAgICAgICApICAgICAgICAgICAge1xuXHR2YXIgdmFsaWRhdG9yICAgICAgICAgICAgPSBpcyh0eXBlKTtcblx0cmV0dXJuIGZ1bmN0aW9uIG9wdGlvbmFsVmFsaWRhdG9yICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gdmFsdWU9PT1VTkRFRklORUQgfHwgdmFsaWRhdG9yKHZhbHVlKTsgfTtcbn1cblxuZnVuY3Rpb24gT1IgKHZhbHVlICAgICAgICAgLCBsZW5ndGggICAgICAgICwgdmFsaWRhdG9ycyAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0aWYgKCB2YWxpZGF0b3JzW2luZGV4XSAodmFsdWUpICkgeyByZXR1cm4gdHJ1ZTsgfVxuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBvciAodHlwZSAgICAgICAgICkgICAgICAgICAgICB7XG5cdHZhciB0eXBlcyAgICAgICAgICAgICAgICAgICAgID0gYXJndW1lbnRzLmxlbmd0aD09PTEgJiYgaXNBcnJheSh0eXBlKSA/IHR5cGUgOiBhcmd1bWVudHM7XG5cdHZhciBsZW5ndGggICAgICAgICA9IHR5cGVzLmxlbmd0aDtcblx0dmFyIHZhbGlkYXRvcnMgICAgICAgICAgICAgID0gW107XG5cdGZvciAoIHZhciBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkgeyB2YWxpZGF0b3JzW2luZGV4XSA9IGlzKHR5cGVzW2luZGV4XSk7IH1cblx0cmV0dXJuIGZ1bmN0aW9uIG9yICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gT1IodmFsdWUsIGxlbmd0aCwgdmFsaWRhdG9ycyk7IH07XG59XG5mdW5jdGlvbiBBTkQgKHZhbHVlICAgICAgICAgLCBsZW5ndGggICAgICAgICwgdmFsaWRhdG9ycyAgICAgICAgICAgICAgICAgICAgICApICAgICAgICAgIHtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7XG5cdFx0aWYgKCAhdmFsaWRhdG9yc1tpbmRleF0gKHZhbHVlKSApIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5leHBvcnQgZnVuY3Rpb24gYW5kICh0eXBlICAgICAgICAgKSAgICAgICAgICAgIHtcblx0dmFyIHR5cGVzICAgICAgICAgICAgICAgICAgICAgPSBhcmd1bWVudHMubGVuZ3RoPT09MSAmJiBpc0FycmF5KHR5cGUpID8gdHlwZSA6IGFyZ3VtZW50cztcblx0dmFyIGxlbmd0aCAgICAgICAgID0gdHlwZXMubGVuZ3RoO1xuXHR2YXIgdmFsaWRhdG9ycyAgICAgICAgICAgICAgPSBbXTtcblx0Zm9yICggdmFyIGluZGV4ICAgICAgICAgPSAwOyBpbmRleDxsZW5ndGg7ICsraW5kZXggKSB7IHZhbGlkYXRvcnNbaW5kZXhdID0gaXModHlwZXNbaW5kZXhdKTsgfVxuXHRyZXR1cm4gZnVuY3Rpb24gYW5kICh2YWx1ZSAgICAgICAgICkgICAgICAgICAgeyByZXR1cm4gQU5EKHZhbHVlLCBsZW5ndGgsIHZhbGlkYXRvcnMpOyB9O1xufVxuXG5mdW5jdGlvbiBFVkVSWSAodmFsdWUgICAgICAgICAsIHZhbGlkYXRvciAgICAgICAgICAgKSAgICAgICAgICB7XG5cdGlmICggIWlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0Zm9yICggdmFyIGxlbmd0aCAgICAgICAgID0gdmFsdWUubGVuZ3RoLCBpbmRleCAgICAgICAgID0gMDsgaW5kZXg8bGVuZ3RoOyArK2luZGV4ICkge1xuXHRcdGlmICggIXZhbGlkYXRvcih2YWx1ZVtpbmRleF0pICkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBldmVyeSAodHlwZSAgICAgICAgICkgICAgICAgICAgICB7XG5cdHZhciB2YWxpZGF0b3IgICAgICAgICAgICA9IGlzKHR5cGUpO1xuXHRyZXR1cm4gZnVuY3Rpb24gYXJyYXkgKHZhbHVlICAgICAgICAgKSAgICAgICAgICB7IHJldHVybiBFVkVSWSh2YWx1ZSwgdmFsaWRhdG9yKTsgfTtcbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZnVuY3Rpb24gVFVQTEUgKHZhbHVlICAgICAgICAgLCByb290UGF0dGVybnMgICAgICAgICAgKSAgICAgICAgICB7XG5cdGlmICggIWlzQXJyYXkodmFsdWUpICkgeyByZXR1cm4gZmFsc2U7IH1cblx0dmFyIHBhdHRlcm5zICAgICAgICAgICAgICAgICAgPSByb290UGF0dGVybnM7XG5cdHZhciBwYXR0ZXJuSW5kZXggICAgICAgICA9IHBhdHRlcm5zLmxlbmd0aDtcblx0dmFyIHN1YlZhbHVlICAgICAgICAgID0gdmFsdWVbMF07XG5cdHZhciBzdWJJbmRleCAgICAgICAgID0gMDtcblx0Zm9yICggOyA7ICkge1xuXHRcdHZhciBwYXR0ZXJuICAgICAgICAgID0gcGF0dGVybnNbLS1wYXR0ZXJuSW5kZXhdIDtcblx0XHRpZiAoIHBhdHRlcm4oc3ViVmFsdWUpICkge1xuXHRcdFx0cGF0dGVybnMgPSBwYXR0ZXJuLnJlc3Q7XG5cdFx0XHRpZiAoICFwYXR0ZXJucyApIHsgcmV0dXJuIHRydWU7IH1cblx0XHRcdHBhdHRlcm5JbmRleCA9IHBhdHRlcm5zLmxlbmd0aDtcblx0XHRcdHN1YlZhbHVlID0gdmFsdWVbKytzdWJJbmRleF07XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCAhcGF0dGVybkluZGV4ICkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxufVxuZnVuY3Rpb24gdW5zaGlmdF9jYWxsIChhcnJheSAgICAgICAgICAgICAgICAgICAsIGl0ZW0gICAgICkgICAgICAge1xuXHR2YXIgaW5kZXggICAgICAgICA9IGFycmF5Lmxlbmd0aDtcblx0ZG8geyBhcnJheVtpbmRleF0gPSBhcnJheVstLWluZGV4XSA7IH1cblx0d2hpbGUgKCBpbmRleCApO1xuXHRhcnJheVswXSA9IGl0ZW07XG59XG5leHBvcnQgZnVuY3Rpb24gdHVwbGUgKHRlbXBsYXRlICAgICAgICAgICAgICAgICAgICAgICkge1xuXHR2YXIgcmF3ICAgICAgICAgICAgICAgICAgICA9IHRlbXBsYXRlLnJhdztcblx0dmFyIGxlbmd0aCAgICAgICAgID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG5cdGlmICggIWxlbmd0aCApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ3R1cGxlJyk7IH1cblx0dmFyIHMgICAgICAgICA9IHJhd1swXSA7XG5cdHZhciBsYXN0SW5kZXhBZnRlckxGICAgICAgICAgPSBzLmxhc3RJbmRleE9mKCdcXG4nKSArIDE7XG5cdGlmICggIWxhc3RJbmRleEFmdGVyTEYgKSB7IHRocm93IFN5bnRheEVycm9yKCd0dXBsZScpOyB9XG5cdHZhciBMRVZFTCAgICAgICAgID0gcy5sZW5ndGggLSBsYXN0SW5kZXhBZnRlckxGO1xuXHR2YXIgaW5kZXggICAgICAgICA9IDA7XG5cdHZhciBhbGxQYXR0ZXJucyAgICAgICAgICAgID0gW107XG5cdGRvIHsgKCBhbGxQYXR0ZXJuc1tpbmRleF0gPSBpcyhhcmd1bWVudHNbKytpbmRleF0pICAgICAgICAgICAgKS5yZXN0ID0gbnVsbDsgfVxuXHR3aGlsZSAoIGluZGV4PGxlbmd0aCApO1xuXHRpbmRleCA9IDA7XG5cdHZhciByb290UGF0dGVybnMgICAgICAgICAgID0gWyBhbGxQYXR0ZXJuc1swXSAgXTtcblx0dmFyIGxldmVsICAgICAgICAgPSBmdW5jdGlvbiBjYWxsZWUgKHBhdHRlcm5zICAgICAgICAgICwgTEVWRUwgICAgICAgICkgICAgICAgICB7XG5cdFx0d2hpbGUgKCArK2luZGV4PGxlbmd0aCApIHtcblx0XHRcdHZhciBzICAgICAgICAgPSByYXdbaW5kZXhdIDtcblx0XHRcdHZhciBsYXN0SW5kZXhBZnRlckxGID0gcy5sYXN0SW5kZXhPZignXFxuJykgKyAxO1xuXHRcdFx0aWYgKCAhbGFzdEluZGV4QWZ0ZXJMRiApIHsgdGhyb3cgU3ludGF4RXJyb3IoJ3R1cGxlJyk7IH1cblx0XHRcdHZhciBsZXZlbCA9IHMubGVuZ3RoIC0gbGFzdEluZGV4QWZ0ZXJMRjtcblx0XHRcdGlmICggbGV2ZWw8TEVWRUwgKSB7IHJldHVybiBsZXZlbDsgfVxuXHRcdFx0aWYgKCBsZXZlbD09PUxFVkVMICkgeyB1bnNoaWZ0X2NhbGwocGF0dGVybnMsIGFsbFBhdHRlcm5zW2luZGV4XSApOyB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGV2ZWwgPSBjYWxsZWUocGF0dGVybnNbMF0gLnJlc3QgPSBbIGFsbFBhdHRlcm5zW2luZGV4XSAgXSwgbGV2ZWwpO1xuXHRcdFx0XHRpZiAoIGxldmVsPExFVkVMICkgeyByZXR1cm4gbGV2ZWw7IH1cblx0XHRcdFx0aWYgKCBsZXZlbCE9PUxFVkVMICkgeyB0aHJvdyBTeW50YXhFcnJvcigndHVwbGUnKTsgfVxuXHRcdFx0XHR1bnNoaWZ0X2NhbGwocGF0dGVybnMsIGFsbFBhdHRlcm5zW2luZGV4XSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH0ocm9vdFBhdHRlcm5zLCBMRVZFTCk7XG5cdGlmICggMDw9bGV2ZWwgJiYgbGV2ZWw8TEVWRUwgKSB7IHRocm93IFN5bnRheEVycm9yKCd0dXBsZScpOyB9XG5cdHJldHVybiBmdW5jdGlvbiB0dXBsZSAodmFsdWUgICAgICAgICApICAgICAgICAgIHsgcmV0dXJuIFRVUExFKHZhbHVlLCByb290UGF0dGVybnMpOyB9O1xufVxuXG5pbXBvcnQgRGVmYXVsdCBmcm9tICcuZGVmYXVsdD89JztcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHQoe1xuXHRpczogaXMsIG5vdDogbm90LFxuXHRhbmQ6IGFuZCwgb3I6IG9yLFxuXHRiaWdpbnQ6IGJpZ2ludCwgc3ltYm9sOiBzeW1ib2wsIHN0cmluZzogc3RyaW5nLCAnYm9vbGVhbic6IEJPT0xFQU4sIG51bWJlcjogbnVtYmVyLFxuXHR1bmRlZmluZWQ6IHVuZGVmaW5lZCwgTmFOOiBOYU4sIEluZmluaXR5OiBJbmZpbml0eSxcblx0ZXZlcnk6IGV2ZXJ5LCB0dXBsZTogdHVwbGUsXG5cdG9wdGlvbmFsOiBvcHRpb25hbCwgc3RyaWN0OiBzdHJpY3QsXG5cdGFueTogYW55LCBuZXZlcjogbmV2ZXIsXG5cdHZlcnNpb246IHZlcnNpb25cbn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAiXSwibmFtZXMiOlsidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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