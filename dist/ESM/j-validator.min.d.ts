export const version :'6.0.0';

export function is (type :unknown) :Validator;
export function is<T> (type :unknown) :TypedValidator<T>;
export function not (type :unknown) :Validator;
//export function not<T> (type :unknown) :TypedValidatorX<T>;

export function or (types :readonly unknown[]) :Validator;
export function or (...types :unknown[]) :Validator;
export function or<T> (types :readonly unknown[]) :TypedValidator<T>;
export function or<T> (...types :unknown[]) :TypedValidator<T>;
export function and (types :readonly unknown[]) :Validator;
export function and (...types :unknown[]) :Validator;
export function and<T> (types :readonly unknown[]) :TypedValidator<T>;
export function and<T> (...types :unknown[]) :TypedValidator<T>;

export const strict :{
	(type :object) :Validator
	<T extends object> (type :object) :TypedValidator<T>
	readonly not :{
		(type :object) :Validator
		//<T extends object> (type :object) :TypedValidatorX<T>
	}
};
export function optional (type :unknown) :Validator;
export function optional<T> (type :unknown) :TypedValidator<T>;

export function every (type :unknown) :Validator;
export function every<T> (type :unknown) :TypedValidator<T[]>;
export function tuple (template :TemplateStringsArray, ...types :unknown[]) :Validator;
export function tuple<T extends readonly unknown[]> (template :TemplateStringsArray, ...types :unknown[]) :TypedValidator<T>;

export function symbol (value :unknown) :value is symbol;
export function bigint (value :unknown) :value is bigint;
export function string (value :unknown) :value is string;
export function number (value :unknown) :value is number;
export function boolean (value :unknown) :value is boolean;

export function undefined (value :unknown) :value is undefined;
export function Infinity (value :unknown) :boolean;
export function NaN (value :unknown) :boolean;

export function any (value :unknown) :true;
export function never (value :unknown) :false;

export default exports;
declare const exports :Readonly<{
	version :typeof version,
	is :typeof is,
	or :typeof or,
	and :typeof and,
	strict :typeof strict,
	optional :typeof optional,
	every :typeof every,
	tuple :typeof tuple,
	bigint :typeof bigint,
	symbol :typeof symbol,
	string :typeof string,
	boolean :typeof boolean,
	number :typeof number,
	undefined :typeof undefined,
	Infinity :typeof Infinity,
	NaN :typeof NaN,
	any :typeof any,
	never :typeof never,
	default :typeof exports,
}>;

type Validator = (value :unknown) => boolean;
type TypedValidator<T> = (value :unknown) => value is T;
//type TypedValidatorX<T> = (value :unknown) => value is not T;