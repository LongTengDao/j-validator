import version from './version?text';
export { version };

import isArray from '.Array.isArray?=';
import Object from '.Object';
import INFINITY from '.Infinity';
import create from '.Object.create?=';
import ownKeys from '.Reflect.ownKeys?=';
import apply from '.Reflect.apply?=';
import TypeError from '.TypeError';
import UNDEFINED from '.undefined';
import TEST from '.RegExp.prototype.test';

var Object_is = ( Object as { is? (a :any, b :any) :boolean } ).is;
var _INFINITY = -INFINITY;

var VOID = { 'void': function (value :any) :boolean { return value===VOID; } }['void'];
export { VOID as void };

export function any (value :any) :boolean { return value!==VOID; }
export function never (value :any) :boolean { return false; }

export function bigint (value :any) :boolean { return typeof value==='bigint'; }
var bigint_ = { '!bigint': function (value :any) :boolean { return typeof value!=='bigint'; } }['!bigint'];
export function symbol (value :any) :boolean { return typeof value==='symbol'; }
var symbol_ = { '!symbol': function (value :any) :boolean { return typeof value!=='symbol'; } }['!symbol'];
export function string (value :any) :boolean { return typeof value==='string'; }
var string_ = { '!string': function (value :any) :boolean { return typeof value!=='string'; } }['!string'];
var BOOLEAN = { 'boolean': function (value :any) :boolean { return value===true || value===false; } }['boolean'];
export { BOOLEAN as boolean };
var boolean_ = { '!boolean': function (value :any) :boolean { return value!==true && value!==false; } }['!boolean'];
export function number (value :any) :boolean { return typeof value==='number'; }
var number_ = { '!number': function (value :any) :boolean { return typeof value!=='number'; } }['!number'];
export function undefined (value :any) :boolean { return value===UNDEFINED; }
var undefined_ = { '!undefined': function (value :any) :boolean { return value!==UNDEFINED; } }['!undefined'];

var NULL = { 'null': function (value :any) :boolean { return value===null; } }['null'];
var NULL_ = { '!null': function (value :any) :boolean { return value!==null; } }['!null'];
var TRUE = { 'true': function (value :any) :boolean { return value===true; } }['true'];
var TRUE_ = { '!true': function (value :any) :boolean { return value!==true; } }['!true'];
var FALSE = { 'false': function (value :any) :boolean { return value===false; } }['false'];
var FALSE_ = { '!false': function (value :any) :boolean { return value!==false; } }['!false'];

export function Infinity (value :any) :boolean { return value===INFINITY; }
Infinity.valueOf = function (this :typeof Infinity) :number { return INFINITY; };
var Infinity_ = { '!Infinity': function (value :any) :boolean { return value!==INFINITY; } }['!Infinity'];
var _Infinity = { '-Infinity': function (value :any) :boolean { return value===_INFINITY; } }['-Infinity'];
var _Infinity_ = { '!-Infinity': function (value :any) :boolean { return value!==_INFINITY; } }['!-Infinity'];

export function NaN (value :any) :boolean { return value!==value; }
var NaN_ = { '!NaN': function (value :any) :boolean { return value===value; } }['!NaN'];

var O :Validator = Object_is
	? function O (value :any) :boolean { return Object_is!(value, 0); }
	: function O (value :any) :boolean { return value===0 && 1/value>0; };
var O_ :Validator = Object_is
	? function O_ (value :any) :boolean { return !Object_is!(value, 0); }
	: function O_ (value :any) :boolean { return value!==0 || 1/value<0; };
var _O :Validator = Object_is
	? function _O (value :any) :boolean { return Object_is!(value, -0); }
	: function _O (value :any) :boolean { return value===0 && 1/value<0; };
var _O_ :Validator = Object_is
	? function _O_ (value :any) :boolean { return !Object_is!(value, -0); }
	: function _O_ (value :any) :boolean { return value!==0 || 1/value>0; };

function Test (type :RegExp, TRUE :boolean) :Validator | void {
	try {
		TEST.call(type, '');
		return TRUE
			? function test (value :any) :boolean {
				return TEST.call(type, value);
			}
			: function test (value :any) :boolean {
				return !TEST.call(type, value);
			};
	}
	catch (error) {}
}

function ObjectValidator<T extends object> (type :T, strict :boolean, FALSE :boolean) :Validator {
	if ( strict && isArray(type) ) { throw TypeError('Validator.strict(type!object)'); }
	var expectKeys = ownKeys(type).reverse();
	var expectLength :number = expectKeys.length;
	var validators = create(null) as { [key in keyof T] :Validator };
	for ( var index :number = expectLength; index; ) {
		var key = expectKeys[--index];
		validators[key] = is(type[key]);
	}
	var TRUE :boolean = !FALSE;
	return strict
		? function object (value :any) :boolean {
			if ( typeof value!=='object' || !value || isArray(value) ) { return FALSE; }
			var index :number = 0;
			for ( var keys = ownKeys(value), length :number = keys.length; index<length; ++index ) {
				if ( !( keys[index] in validators ) ) { return FALSE; }
			}
			for ( index = expectLength; index; ) {
				var key = expectKeys[--index];
				if ( !validators[key](key in value ? value[key] : VOID) ) { return FALSE; }
			}
			return TRUE;
		}
		: function object (value :any) :boolean {
			if ( typeof value!=='object' || !value || isArray(value) ) { return FALSE; }
			for ( var index :number = expectLength; index; ) {
				var key = expectKeys[--index];
				if ( !validators[key](key in value ? value[key] : VOID) ) { return FALSE; }
			}
			return TRUE;
		};
}

function ArrayValidator (type :any[], like :boolean, FALSE :boolean) :Validator {
	var length :number = type.length;
	var validators :Validator[] = [];
	for ( var index :number = 0; index<length; ++index ) { validators.push(is(type[index])); }
	var TRUE :boolean = !FALSE;
	return like
		? function arrayLike (value :any) :boolean {
			if ( value.length!==length ) { return FALSE; }
			for ( var index :number = 0; index<length; ++index ) {
				if ( !validators[index](value[index]) ) { return FALSE; }
			}
			return TRUE;
		}
		: function array (value :any) :boolean {
			if ( !isArray(value) ) { return FALSE; }
			if ( value.length!==length ) { return FALSE; }
			for ( var index :number = 0; index<length; ++index ) {
				if ( !validators[index](value[index]) ) { return FALSE; }
			}
			return TRUE;
		};
}

export function is (type :any) :Validator {
	return typeof type==='function' ? type :
		undefined(type) ? undefined :
			TRUE(type) ? TRUE : FALSE(type) ? FALSE :
				NULL(type) ? NULL :
					typeof type==='object' ? /*#__PURE__*/ Test(type, true) || /*#__PURE__*/ ( isArray(type) ? ArrayValidator : ObjectValidator )(type, false, false) :
						O(type) ? O : _O(type) ? _O :
							type!==type ? NaN :
								type===INFINITY ? Infinity : type===_INFINITY ? _Infinity :
									function isType (value :any) :boolean { return value===type; };
}
export function not (type :any) :Validator {
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
			case undefined:
				return undefined_;
			case Infinity:
				return Infinity_;
		}
		return function notType (value :any) :boolean { return !type(value); };
	}
	return type===UNDEFINED ? undefined_ :
		type===true ? TRUE_ : type===false ? FALSE_ :
			type===null ? NULL_ :
				typeof type==='object' ? /*#__PURE__*/ Test(type, false) || /*#__PURE__*/ ( isArray(type) ? ArrayValidator : ObjectValidator )(type, false, true) :
					type===0 ? O_(type) ? _O_ : O_ :
						type!==type ? NaN_ :
							type===INFINITY ? Infinity_ : type===_INFINITY ? _Infinity_ :
								function notType (value :any) :boolean { return value!==type; };
}

export function strict (type :object, not? :boolean) :Validator {
	return /*#__PURE__*/ ObjectValidator(type, true, !!not);
}

export function optional (type :any) :Validator {
	var validator :Validator = is(type);
	return function optionalValidator (value :any) :boolean { return value===VOID || validator(value); };
}

export function or (type :any) :Validator {
	var types :{ [index :number] :any, length :number } = arguments.length===1 && isArray(type) ? type : arguments;
	var length :number = types.length;
	var validators :Validator[] = [];
	for ( var index :number = 0; index<length; ++index ) { validators.push(is(types[index])); }
	return function or (value :any) :boolean {
		for ( var index :number = 0; index<length; ++index ) {
			if ( validators[index](value) ) { return true; }
		}
		return false;
	};
}
export function and (type :any) :Validator {
	var types :{ [index :number] :any, length :number } = arguments.length===1 && isArray(type) ? type : arguments;
	var length :number = types.length;
	var validators :Validator[] = [];
	for ( var index :number = 0; index<length; ++index ) { validators.push(is(types[index])); }
	return function and (value :any) :boolean {
		for ( var index :number = 0; index<length; ++index ) {
			if ( !validators[index](value) ) { return false; }
		}
		return true;
	};
}

export function every (type :any) :Validator {
	var validator :Validator = is(type);
	return function array (value :any) :boolean {
		if ( !isArray(value) ) { return false; }
		for ( var length :number = value.length, index :number = 0; index<length; ++index ) {
			if ( !validator(value[index]) ) { return false; }
		}
		return true;
	};
}

var comma_repeat :(count :number) => string = ''.repeat
	? function comma_repeat (count :number) :string { return ','.repeat(count); }
	: function () {
		var commas :string[] = [];
		return function comma_repeat (count :number) :string {
			commas.length = count+1;
			return commas.join(',');
		};
	}();
export function overload<T extends Readonly<any[]>, F extends (this :any, ...args :any) => any> (types :T, callback :T) { return /*#__PURE__*/ Overloaded.apply(null, arguments as unknown as [ T, F ]); }
function Overloaded<F extends (this :any, ...args :any) => any> (types :Readonly<any[]>, callback :F) {
	var validator :Validator = is(types);
	if ( typeof callback!=='function' ) { throw TypeError('Validator.overload(,callback!function)'); }
	var validators :Validator[];
	var callbacks :F[];
	var length :number = arguments.length;
	var fallback :F;
	if ( length%2 ) {
		fallback = arguments[--length];
		if ( typeof fallback!=='function' ) { throw TypeError('Validator.overload('+comma_repeat(length)+'fallback!function)'); }
	}
	if ( length<3 ) { length = 0; }
	else {
		validators = [];
		callbacks = [];
		for ( var index :number = 2; index<length; ++index ) {
			validators.push(ArrayValidator(arguments[index], true, false));
			var cb :F = arguments[++index];
			if ( typeof cb!=='function' ) { throw TypeError('Validator.overload('+comma_repeat(index)+'callback!function)'); }
			callbacks.push(cb);
		}
		length = validators.length;
	}
	return function overloaded (this :any) {
		if ( validator(arguments) ) { return apply(callback, this, arguments); }
		for ( var index :number = 0; index<length; ++index ) {
			if ( validators[index](arguments) ) { return apply(callbacks[index], this, arguments); }
		}
		if ( fallback ) { return apply(fallback, this, arguments); }
		throw TypeError();
	};
}

import Default from '.default?=';
export default Default({
	is: is, not: not,
	and: and, or: or,
	bigint: bigint, symbol: symbol, string: string, 'boolean': BOOLEAN, number: number,
	undefined: undefined, NaN: NaN, Infinity: Infinity,
	every: every,
	'void': VOID, optional: optional, strict: strict,
	any: any, never: never,
	overload: overload,
	version: version
});

type Validator = (value :any) => boolean;