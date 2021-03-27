import version from './version?text';
export { version };

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

var test_bind = bind
	? /*#__PURE__*/ bind.bind(test) as (this :void, re :RegExp) => (this :void, string :string) => boolean
	: function (this :void, re :RegExp) {
		return function (this :void, string :string) {
			return test.call(re, string);
		};
	};

var _INFINITY = -INFINITY;

export function any () :boolean { return true; }
export function never () :boolean { return false; }

export function bigint (value :unknown) :boolean { return typeof value==='bigint'; }
var bigint_ = { '!bigint': function (value :unknown) :boolean { return typeof value!=='bigint'; } }['!bigint'];
export function symbol (value :unknown) :boolean { return typeof value==='symbol'; }
var symbol_ = { '!symbol': function (value :unknown) :boolean { return typeof value!=='symbol'; } }['!symbol'];
export function string (value :unknown) :boolean { return typeof value==='string'; }
var string_ = { '!string': function (value :unknown) :boolean { return typeof value!=='string'; } }['!string'];
var BOOLEAN = { 'boolean': function (value :unknown) :boolean { return value===true || value===false; } }['boolean'];
export { BOOLEAN as boolean };
var boolean_ = { '!boolean': function (value :unknown) :boolean { return value!==true && value!==false; } }['!boolean'];
export function number (value :unknown) :boolean { return typeof value==='number'; }
var number_ = { '!number': function (value :unknown) :boolean { return typeof value!=='number'; } }['!number'];
export function undefined (value :unknown) :boolean { return value===UNDEFINED; }
var undefined_ = { '!undefined': function (value :unknown) :boolean { return value!==UNDEFINED; } }['!undefined'];

var NULL = { 'null': function (value :unknown) :boolean { return value===null; } }['null'];
var NULL_ = { '!null': function (value :unknown) :boolean { return value!==null; } }['!null'];
var TRUE = { 'true': function (value :unknown) :boolean { return value===true; } }['true'];
var TRUE_ = { '!true': function (value :unknown) :boolean { return value!==true; } }['!true'];
var FALSE = { 'false': function (value :unknown) :boolean { return value===false; } }['false'];
var FALSE_ = { '!false': function (value :unknown) :boolean { return value!==false; } }['!false'];

export function Infinity (value :unknown) :boolean { return value===INFINITY; }
Infinity.valueOf = function (this :typeof Infinity) :number { return INFINITY; };
var Infinity_ = { '!Infinity': function (value :unknown) :boolean { return value!==INFINITY; } }['!Infinity'];
var _Infinity = { '-Infinity': function (value :unknown) :boolean { return value===_INFINITY; } }['-Infinity'];
var _Infinity_ = { '!-Infinity': function (value :unknown) :boolean { return value!==_INFINITY; } }['!-Infinity'];

export function NaN (value :unknown) :boolean { return value!==value; }
var NaN_ = { '!NaN': function (value :unknown) :boolean { return value===value; } }['!NaN'];

var O :Validator = Object_is
	? function O (value :unknown) :boolean { return Object_is!(value, 0); }
	: function O (value :unknown) :boolean { return value===0 && 1/value>0; };
var O_ :Validator = Object_is
	? function O_ (value :unknown) :boolean { return !Object_is!(value, 0); }
	: function O_ (value :unknown) :boolean { return value!==0 || 1/value<0; };
var _O :Validator = Object_is
	? function _O (value :unknown) :boolean { return Object_is!(value, -0); }
	: function _O (value :unknown) :boolean { return value===0 && 1/value<0; };
var _O_ :Validator = Object_is
	? function _O_ (value :unknown) :boolean { return !Object_is!(value, -0); }
	: function _O_ (value :unknown) :boolean { return value!==0 || 1/value>0; };

function StringTester (type :RegExp, FALSE :boolean) :Validator {
	if ( type.global ) { type = RegExp(type.source, type.flags ? type.flags.replace('g', '') : ( type.ignoreCase ? 'i' : '' ) + ( type.multiline ? 'm' : '' )); }
	var type_test = test_bind(type);
	return FALSE
		? function tester (value :unknown) :boolean { return typeof value!=='string' || !type_test(value); }
		: function tester (value :unknown) :boolean { return typeof value==='string' && type_test(value); };
}

function OBJECT<T extends object> (value :unknown, index :number, expectKeys :ArrayLike<keyof T>, validators :{ readonly [Key in keyof T] :Validator }) :boolean {
	if ( typeof value!=='object' || !value ) { return false; }
	while ( index ) {
		var key = expectKeys[--index]!;
		if ( !validators[key](( value as T )[key]) ) { return false; }
	}
	return true;
}
function OBJECT_STRICT<T extends object> (value :unknown, index :number, expectKeys :ArrayLike<keyof T>, validators :{ readonly [Key in keyof T] :Validator }) :boolean {
	if ( typeof value!=='object' || !value || isArray(value) ) { return false; }
	while ( index ) {
		var key = expectKeys[--index]!;
		if ( !validators[key](( value as T )[key]) ) { return false; }
	}
	for ( var keys = ownKeys(value), length :number = keys.length; index<length; ++index ) {
		if ( !( keys[index]! in validators ) ) { return false; }
	}
	return true;
}
function ObjectValidator<T extends object> (type :T, FALSE :boolean, strict :boolean) :Validator {
	var expectKeys = ownKeys(type).reverse();
	var expectLength :number = expectKeys.length;
	var validators = create(Null_prototype) as { [key in keyof T] :Validator };
	for ( var index :number = expectLength; index; ) {
		var key = expectKeys[--index]!;
		validators[key] = is(type[key]);
	}
	return strict
		? FALSE
			? function object (value :unknown) :boolean { return !OBJECT_STRICT<T>(value, expectLength, expectKeys, validators); }
			: function object (value :unknown) :boolean { return OBJECT_STRICT<T>(value, expectLength, expectKeys, validators); }
		: FALSE
			? function object (value :unknown) :boolean { return !OBJECT<T>(value, expectLength, expectKeys, validators); }
			: function object (value :unknown) :boolean { return OBJECT<T>(value, expectLength, expectKeys, validators); };
}

function ARRAY (value :unknown, length :number, validators :ArrayLike<Validator>) :boolean {
	if ( !isArray(value) || value.length!==length ) { return false; }
	for ( var index :number = 0; index<length; ++index ) {
		if ( !validators[index]!(value[index]) ) { return false; }
	}
	return true;
}
function ArrayValidator (type :ArrayLike<unknown>, FALSE :boolean) :Validator {
	var length :number = type.length;
	var validators :Validator[] = [];
	for ( var index :number = 0; index<length; ++index ) { validators[index] = is(type[index]); }
	return FALSE
		? function array (value :unknown) :boolean { return !ARRAY(value, length, validators); }
		: function array (value :unknown) :boolean { return ARRAY(value, length, validators); };
}

export function is (type :unknown) :Validator {
	return typeof type==='function' ? type as Validator :
		type===UNDEFINED ? undefined :
			type===true ? TRUE : type===false ? FALSE :
				type===null ? NULL :
					typeof type==='object' ?
						/*#__PURE__*/ isArray(type) ? ArrayValidator(type, false) :
						isRegExp(type) ? /*#__PURE__*/ StringTester(type, false) :
							ObjectValidator(type as object, false, false) :
						O(type) ? O : _O(type) ? _O :
							type!==type ? NaN :
								type===INFINITY ? Infinity : type===_INFINITY ? _Infinity :
									function isType (value :unknown) :boolean { return value===type; };
}
export function not (type :unknown) :Validator {
	if ( typeof type==='function' ) {
		switch ( type ) {
			case undefined: return undefined_;
			case undefined_: return undefined;
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
		return function notType (value :unknown) :boolean { return !type(value); };
	}
	return type===UNDEFINED ? undefined_ :
		type===true ? TRUE_ : type===false ? FALSE_ :
			type===null ? NULL_ :
				typeof type==='object' ?
					isArray(type) ? /*#__PURE__*/ ArrayValidator(type, true) :
						isRegExp(type) ? /*#__PURE__*/ StringTester(type, true) :
							/*#__PURE__*/ ObjectValidator(type as object, true, false) :
					type===0 ? O_(type) ? _O_ : O_ :
						type!==type ? NaN_ :
							type===INFINITY ? Infinity_ : type===_INFINITY ? _Infinity_ :
								function notType (value :unknown) :boolean { return value!==type; };
}

export function strict (type :object) :Validator {
	if ( isArray(type) || isRegExp(type) ) { throw TypeError('strict(argument can not be an array or regExp)'); }
	return /*#__PURE__*/ ObjectValidator(type, false, true);
}
strict.not = function strict_not (type :object) :Validator {
	if ( isArray(type) || isRegExp(type) ) { throw TypeError('strict.not(argument can not be an array or regExp)'); }
	return /*#__PURE__*/ ObjectValidator(type, true, true);
};

export function optional (type :unknown) :Validator {
	var validator :Validator = is(type);
	return function optionalValidator (value :unknown) :boolean { return value===UNDEFINED || validator(value); };
}

function OR (value :unknown, length :number, validators :ArrayLike<Validator>) :boolean {
	for ( var index :number = 0; index<length; ++index ) {
		if ( validators[index]!(value) ) { return true; }
	}
	return false;
}
export function or (type :unknown) :Validator {
	var types :ArrayLike<unknown> = arguments.length===1 && isArray(type) ? type : arguments;
	var length :number = types.length;
	var validators :Validator[] = [];
	for ( var index :number = 0; index<length; ++index ) { validators[index] = is(types[index]); }
	return function or (value :unknown) :boolean { return OR(value, length, validators); };
}
function AND (value :unknown, length :number, validators :ArrayLike<Validator>) :boolean {
	for ( var index :number = 0; index<length; ++index ) {
		if ( !validators[index]!(value) ) { return false; }
	}
	return true;
}
export function and (type :unknown) :Validator {
	var types :ArrayLike<unknown> = arguments.length===1 && isArray(type) ? type : arguments;
	var length :number = types.length;
	var validators :Validator[] = [];
	for ( var index :number = 0; index<length; ++index ) { validators[index] = is(types[index]); }
	return function and (value :unknown) :boolean { return AND(value, length, validators); };
}

function EVERY (value :unknown, validator :Validator) :boolean {
	if ( !isArray(value) ) { return false; }
	for ( var length :number = value.length, index :number = 0; index<length; ++index ) {
		if ( !validator(value[index]) ) { return false; }
	}
	return true;
}
export function every (type :unknown) :Validator {
	var validator :Validator = is(type);
	return function array (value :unknown) :boolean { return EVERY(value, validator); };
}

type Pattern = Validator & { rest: null | Patterns };
type Patterns = [ Pattern, ...Pattern[] ];
function TUPLE (value :unknown, rootPatterns :Patterns) :boolean {
	if ( !isArray(value) ) { return false; }
	var patterns :null | Patterns = rootPatterns;
	var patternIndex :number = patterns.length;
	var subValue :unknown = value[0];
	var subIndex :number = 0;
	for ( ; ; ) {
		var pattern :Pattern = patterns[--patternIndex]!;
		if ( pattern(subValue) ) {
			patterns = pattern.rest;
			if ( !patterns ) { return true; }
			patternIndex = patterns.length;
			subValue = value[++subIndex];
		}
		else if ( !patternIndex ) { return false; }
	}
}
function unshift_call (array :[ any, ...any[] ], item :any) :void {
	var index :number = array.length;
	do { array[index] = array[--index]!; }
	while ( index );
	array[0] = item;
}
export function tuple (template :TemplateStringsArray) {
	var raw :readonly string[] = template.raw;
	var length :number = arguments.length - 1;
	if ( !length ) { throw SyntaxError('tuple'); }
	var s :string = raw[0]!;
	var lastIndexAfterLF :number = s.lastIndexOf('\n') + 1;
	if ( !lastIndexAfterLF ) { throw SyntaxError('tuple'); }
	var LEVEL :number = s.length - lastIndexAfterLF;
	var index :number = 0;
	var allPatterns :Pattern[] = [];
	do { ( allPatterns[index] = is(arguments[++index]) as Pattern ).rest = null; }
	while ( index<length );
	index = 0;
	var rootPatterns :Patterns = [ allPatterns[0]! ];
	var level :number = function callee (patterns :Patterns, LEVEL :number) :number {
		while ( ++index<length ) {
			var s :string = raw[index]!;
			var lastIndexAfterLF = s.lastIndexOf('\n') + 1;
			if ( !lastIndexAfterLF ) { throw SyntaxError('tuple'); }
			var level = s.length - lastIndexAfterLF;
			if ( level<LEVEL ) { return level; }
			if ( level===LEVEL ) { unshift_call(patterns, allPatterns[index]!); }
			else {
				level = callee(patterns[0]!.rest = [ allPatterns[index]! ], level);
				if ( level<LEVEL ) { return level; }
				if ( level!==LEVEL ) { throw SyntaxError('tuple'); }
				unshift_call(patterns, allPatterns[index]!);
			}
		}
		return -1;
	}(rootPatterns, LEVEL);
	if ( 0<=level && level<LEVEL ) { throw SyntaxError('tuple'); }
	return function tuple (value :unknown) :boolean { return TUPLE(value, rootPatterns); };
}

import Default from '.default?=';
export default Default({
	is: is, not: not,
	and: and, or: or,
	bigint: bigint, symbol: symbol, string: string, 'boolean': BOOLEAN, number: number,
	undefined: undefined, NaN: NaN, Infinity: Infinity,
	every: every, tuple: tuple,
	optional: optional, strict: strict,
	any: any, never: never,
	version: version
});

type Validator = (value :unknown) => boolean;