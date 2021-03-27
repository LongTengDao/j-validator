export = exports;
declare const exports :Readonly<{
	
	version :'6.0.0',
	
	is (type :unknown) :Validator,
	is<T> (type :unknown) :TypedValidator<T>,
	not (type :unknown) :Validator,
	//not<T> (type :unknown) :TypedValidatorX<T>,
	
	or (types :readonly unknown[]) :Validator,
	or (...types :unknown[]) :Validator,
	or<T> (types :readonly unknown[]) :TypedValidator<T>,
	or<T> (...types :unknown[]) :TypedValidator<T>,
	and (types :readonly unknown[]) :Validator,
	and (...types :unknown[]) :Validator,
	and<T> (types :readonly unknown[]) :TypedValidator<T>,
	and<T> (...types :unknown[]) :TypedValidator<T>,
	
	strict :{
		(type :object) :Validator
		<T extends object> (type :object) :TypedValidator<T>
		readonly not :{
			(type :object) :Validator
			//<T extends object> (type :object) :TypedValidatorX<T>
		}
	},
	optional (type :unknown) :Validator,
	optional<T> (type :unknown) :TypedValidator<T>,
	
	every (type :unknown) :Validator,
	every<T> (type :unknown) :TypedValidator<T[]>,
	tuple (template :TemplateStringsArray, ...types :unknown[]) :Validator,
	tuple<T extends readonly unknown[]> (template :TemplateStringsArray, ...types :unknown[]) :TypedValidator<T[]>,
	
	symbol (value :unknown) :value is symbol,
	bigint (value :unknown) :value is bigint,
	string (value :unknown) :value is string,
	number (value :unknown) :value is number,
	boolean (value :unknown) :value is boolean,
	
	undefined (value :unknown) :value is undefined,
	Infinity (value :unknown) :boolean,
	NaN (value :unknown) :boolean,
	
	any (value :unknown) :boolean,
	never (value :unknown) :false,
	
	default :typeof exports,
	
}>;

type Validator = (value :unknown) => boolean;
type TypedValidator<T> = (value :unknown) => value is T;
//type TypedValidatorX<T> = (value :unknown) => value is not T;