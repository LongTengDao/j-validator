export = exports;
declare const exports :Readonly<{
	
	version :'3.0.0',
	
	is (type :any) :Validator,
	is<T> (type :any) :TypedValidator<T>,
	not (type :any) :Validator,
	not<T> (type :any) :TypedValidator<Exclude<any, T>>,
	
	or (...types :any[]) :Validator,
	or<T> (...types :any[]) :TypedValidator<T>,
	and (...types :any[]) :Validator,
	and<T> (...types :any[]) :TypedValidator<T>,
	
	strict (type :object, not? :boolean) :Validator,
	strict<T extends object> (type :object, not? :false) :TypedValidator<T>,
	strict<T extends object> (type :object, not :true) :TypedValidator<Exclude<any, T>>,
	optional (type :any) :Validator,
	optional<T> (type :any) :TypedValidator<T>,
	void (value :any) :boolean,
	
	every (type :any) :Validator,
	every<T> (type :any) :TypedValidator<T[]>,
	
	bigint (value :any) :value is bigint,
	symbol (value :any) :value is symbol,
	string (value :any) :value is string,
	boolean (value :any) :value is boolean,
	number (value :any) :value is number,
	
	undefined (value :any) :value is undefined,
	Infinity (value :any) :boolean,
	NaN (value :any) :boolean,
	
	any (value :any) :boolean,
	never (value :any) :false,
	
	overload<T extends (...args :any[]) => any> (types :any[], callback :T, ...rest :( any[] | T )[]) :T,
	
	default :typeof exports,
	
}>;

type Validator = (value :any) => boolean;
type TypedValidator<T> = (value :any) => value is T;