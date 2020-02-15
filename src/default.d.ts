export = exports;
declare const exports :Readonly<{
	
	version :string,
	
	is (type :any) :Validator,
	is<T> (type :any) :TypedValidator<T>,
	not (type :any) :Validator,
	not<T> (type :any) :TypedValidator<Exclude<any, T>>,
	
	or (types :any[]) :Validator,
	or (...types :any[]) :Validator,
	or<T> (types :any[]) :TypedValidator<T>,
	or<T> (...types :any[]) :TypedValidator<T>,
	and (types :any[]) :Validator,
	and (...types :any[]) :Validator,
	and<T> (types :any[]) :TypedValidator<T>,
	and<T> (...types :any[]) :TypedValidator<T>,
	
	strict :{
		(type :object) :Validator
		<T extends object> (type :object) :TypedValidator<T>
		readonly not :{
			(type :object) :Validator
			<T extends object> (type :object) :TypedValidator<Exclude<any, T>>
		}
	},
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
	
	overload<Args extends Readonly<any[]>, Callback extends (this :any, ...args :Args) => any> (types1 :Args, callback1 :Callback, types2 :Args, callback2 :Callback, ...rest :( Args | Callback )[]) :Callback,
	
	default :typeof exports,
	
}>;

type Validator = (value :any) => boolean;
type TypedValidator<T> = (value :any) => value is T;