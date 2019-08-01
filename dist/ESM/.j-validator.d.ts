export const version :'2.1.0';

export function Validator (type :any) :Validator;
export function Validator<T> (type :any) :TypedValidator<T>;

export function or (...types :any[]) :Validator;
export function or<T> (...types :any[]) :TypedValidator<T>;
export function and (...types :any[]) :Validator;
export function and<T> (...types :any[]) :TypedValidator<T>;

export function strict (type :object) :Validator;
export function strict<T extends object> (type :object) :TypedValidator<T>;
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
export function NaN (value :any) :boolean;
export function Infinity (value :any) :boolean;

export function any (value :any) :boolean;
export function never (value :any) :false;

export function overload<T extends (...args :any[]) => any> (types :any[], callback :T, ...rest :( any[] | T )[]) :T;

export default exports;
declare const exports :Readonly<typeof Validator & {
	version :typeof version,
	Validator :typeof Validator,
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
	NaN :typeof NaN,
	Infinity :typeof Infinity,
	any :typeof any,
	never :typeof never,
	overload :typeof overload,
	default :typeof exports,
}>;

type Validator = (value :any) => boolean;
type TypedValidator<T> = (value :any) => value is T;