import version from './version?text';
export { version };

import isArray from '.Array.isArray?=';
import Object_is from '.Object.is';
import INFINITY from '.Infinity';
import create from '.Object.create?=';
import ownKeys from '.Reflect.ownKeys?=';
import apply from '.Reflect.apply?=';
import TypeError from '.TypeError';
import UNDEFINED from '.undefined';

function VOID (value :any) :boolean { return value===VOID; }
export { VOID as void };

export function any (value :any) :boolean { return value!==VOID; }
export function never (value :any) :boolean { return false; }

export function bigint (value :any) :boolean { return typeof value==='bigint'; }
export function symbol (value :any) :boolean { return typeof value==='symbol'; }
export function string (value :any) :boolean { return typeof value==='string'; }
export function boolean (value :any) :boolean { return typeof value==='boolean'; }
export function number (value :any) :boolean { return typeof value==='number'; }
export function undefined (value :any) :boolean { return value===UNDEFINED; }

function NULL (value :any) :boolean { return value===null; }
function TRUE (value :any) :boolean { return value===true; }
function FALSE (value :any) :boolean { return value===false; }

export function NaN (value :any) :boolean { return value!==value; }

export function Infinity (value :any) :boolean { return value===INFINITY; }
Infinity.valueOf = function (this :typeof Infinity) :number { return INFINITY; };
function _Infinity (value :any) :boolean { return value=== -INFINITY; }

var O :Validator = Object_is
	? function O (value :any) :boolean { return Object_is(value, 0); }
	: function O (value :any) :boolean { return value===0 && 1/value>0; };
var _O :Validator = Object_is
	? function _O (value :any) :boolean { return Object_is(value, -0); }
	: function _O (value :any) :boolean { return value===0 && 1/value<0; };

function ObjectValidator<T extends object> (type :T, strict :boolean) :Validator {
	if ( strict && ( typeof type!=='object' || !type || isArray(type) ) ) { throw TypeError('Validator.strict(type!object)'); }
	var expectKeys = ownKeys(type).reverse();
	var expectLength :number = expectKeys.length;
	var validators :{ [key in keyof T] :Validator } = create(null);
	for ( var index :number = expectLength; index; ) {
		var key = expectKeys[--index];
		validators[key] = Validator(type[key]);
	}
	return strict
		? function object (value :any) :boolean {
			if ( typeof value!=='object' || !value || isArray(value) ) { return false; }
			var index :number = 0;
			for ( var keys = ownKeys(value), length :number = keys.length; index<length; ++index ) {
				if ( !( keys[index] in validators ) ) { return false; }
			}
			for ( index = expectLength; index; ) {
				var key = expectKeys[--index];
				if ( !validators[key](key in value ? value[key] : VOID) ) { return false; }
			}
			return true;
		}
		: function object (value :any) :boolean {
			if ( typeof value!=='object' || !value || isArray(value) ) { return false; }
			for ( var index :number = expectLength; index; ) {
				var key = expectKeys[--index];
				if ( !validators[key](key in value ? value[key] : VOID) ) { return false; }
			}
			return true;
		};
}

function ArrayValidator (type :any[], like :boolean) :Validator {
	var length :number = type.length;
	var validators :Validator[] = [];
	for ( var index :number = 0; index<length; ++index ) { validators.push(Validator(type[index])); }
	return like
		? function arrayLike (value :any) :boolean {
			if ( value.length!==length ) { return false; }
			for ( var index :number = 0; index<length; ++index ) {
				if ( !validators[index](value[index]) ) { return false; }
			}
			return true;
		}
		: function array (value :any) :boolean {
			if ( !isArray(value) ) { return false; }
			if ( value.length!==length ) { return false; }
			for ( var index :number = 0; index<length; ++index ) {
				if ( !validators[index](value[index]) ) { return false; }
			}
			return true;
		};
}

export function Validator (type :any) :Validator {
	return typeof type==='function' ? type :
		undefined(type) ? undefined :
			TRUE(type) ? TRUE : FALSE(type) ? FALSE :
				NULL(type) ? NULL :
					typeof type==='object' ? /*#__PURE__*/ ( isArray(type) ? ArrayValidator : ObjectValidator )(type, false) :
						O(type) ? O : _O(type) ? _O :
							NaN(type) ? NaN :
								/*#__PURE__*/ Infinity(type) ? Infinity : _Infinity(type) ? _Infinity :
								function validator (value :any) :boolean { return value===type; };
}

export function strict (type :object) :Validator {
	return /*#__PURE__*/ ObjectValidator(type, true);
}

export function optional (type :any) :Validator {
	var validator :Validator = Validator(type);
	return function optionalValidator (value :any) :boolean { return value===VOID || validator(value); };
}

export function or () :Validator {
	var types = arguments.length===1 && isArray(arguments[0]) ? arguments[0] : arguments;
	var length :number = types.length;
	var validators :Validator[] = [];
	for ( var index :number = 0; index<length; ++index ) { validators.push(Validator(types[index])); }
	return function or (value :any) :boolean {
		for ( var index :number = 0; index<length; ++index ) {
			if ( validators[index](value) ) { return true; }
		}
		return false;
	};
}
export function and () :Validator {
	var types = arguments.length===1 && isArray(arguments[0]) ? arguments[0] : arguments;
	var length :number = types.length;
	var validators :Validator[] = [];
	for ( var index :number = 0; index<length; ++index ) { validators.push(Validator(types[index])); }
	return function or (value :any) :boolean {
		for ( var index :number = 0; index<length; ++index ) {
			if ( !validators[index](value) ) { return false; }
		}
		return true;
	};
}

export function every (type :any) :Validator {
	var validator :Validator = Validator(type);
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
export function overload<T extends (...args :any[]) => any> (types :any[], callback :T) :T { return /*#__PURE__*/ Overloaded.apply(null, arguments as any) as T; }
function Overloaded<T extends (...args :any[]) => any> (types :any[], callback :T) :T {
	var validator :Validator = Validator(types);
	if ( typeof callback!=='function' ) { throw TypeError('Validator.overload(,callback!function)'); }
	var validators :Validator[];
	var callbacks :T[];
	var length :number = arguments.length;
	var fallback :T;
	if ( length%2 ) {
		fallback = arguments[--length];
		if ( typeof fallback!=='function' ) { throw TypeError('Validator.overload('+comma_repeat(length)+'fallback!function)'); }
	}
	if ( length<3 ) { length = 0; }
	else {
		validators = [];
		callbacks = [];
		for ( var index :number = 2; index<length; ++index ) {
			validators.push(ArrayValidator(arguments[index], true));
			var cb :T = arguments[++index];
			if ( typeof cb!=='function' ) { throw TypeError('Validator.overload('+comma_repeat(index)+'callback!function)'); }
			callbacks.push(cb);
		}
		length = validators.length;
	}
	return function overloaded (this :any) :ReturnType<T> {
		if ( validator(arguments) ) { return apply(callback, this, arguments); }
		for ( var index :number = 0; index<length; ++index ) {
			if ( validators[index](arguments) ) { return apply(callbacks[index], this, arguments); }
		}
		if ( fallback ) { return apply(fallback, this, arguments); }
		throw TypeError();
	} as T;
}

import Default from '.default?=';
export default Default(Validator, {
	Validator: Validator,
	and: and, or: or,
	bigint: bigint, symbol: symbol, string: string, boolean: boolean, number: number,
	undefined: undefined, NaN: NaN, Infinity: Infinity,
	every: every,
	'void': VOID, optional: optional, strict: strict,
	any: any, never: never,
	overload: overload,
	version: version
});

type Validator = (value :any) => boolean;