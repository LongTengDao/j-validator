export const version :string;

export function is (type :any) :Validator;
export function is<T> (type :any) :TypedValidator<T>;
export function not (type :any) :Validator;
export function not<T> (type :any) :TypedValidator<Exclude<any, T>>;

export function or (...types :any[]) :Validator;
export function or<T> (...types :any[]) :TypedValidator<T>;
export function and (...types :any[]) :Validator;
export function and<T> (...types :any[]) :TypedValidator<T>;

export const strict :{
	(type :object) :Validator
	<T extends object> (type :object) :TypedValidator<T>
	readonly not :{
		(type :object) :Validator
		<T extends object> (type :object) :TypedValidator<Exclude<any, T>>
	}
};
export function optional (type :any) :Validator;
export function optional<T> (type :any) :TypedValidator<T>;
export { VOID as void }; declare function VOID (value :any) :boolean;

export function every (type :any) :Validator;
export function every<T> (type :any) :TypedValidator<T[]>;

export function bigint (value :any) :value is bigint;
export function symbol (value :any) :value is symbol;
export function string (value :any) :value is string;
export function boolean (value :any) :value is boolean;
export function number (value :any) :value is number;

export function undefined (value :any) :value is undefined;
export function Infinity (value :any) :boolean;
export function NaN (value :any) :boolean;

export function any (value :any) :boolean;
export function never (value :any) :false;

export function overload<T extends (...args :any[]) => any> (types :any[], callback :T, ...rest :( any[] | T )[]) :T;

export default exports;
declare const exports :Readonly<{
	version :typeof version,
	is :typeof is,
	or :typeof or,
	and :typeof and,
	strict :typeof strict,
	optional :typeof optional,
	void :typeof VOID,
	every :typeof every,
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
	overload :typeof overload,
	default :typeof exports,
}>;

type Validator = (value :any) => boolean;
type TypedValidator<T> = (value :any) => value is T;